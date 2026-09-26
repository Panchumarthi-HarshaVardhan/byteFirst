import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import { handleAiDesignRequest } from './server/api/ai-design.js'

// Load .env into process.env for local development
try {
  if (fs.existsSync('.env')) {
    const envFile = fs.readFileSync('.env', 'utf-8');
    envFile.split('\n').forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = match[2] || '';
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        process.env[key] = val.trim();
      }
    });
  }
} catch (_) {}

function apiDevServerPlugin(apiKey) {
  return {
    name: 'api-dev-server-plugin',
    configureServer(server) {
      // 1. AI Studio Design Endpoint
      server.middlewares.use((req, res, next) => {
        const url = req.originalUrl || req.url || '';
        if (url.includes('/api/ai/design')) {
          handleAiDesignRequest(req, res, apiKey);
        } else {
          next();
        }
      });

      // 2. AuntyID Agent & Chat Endpoints
      const handleApiRequest = (endpoint, modulePath) => {
        server.middlewares.use(endpoint, async (req, res, next) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => { body += chunk; });
            req.on('end', async () => {
              try {
                req.body = JSON.parse(body || '{}');
                const { default: handler } = await import(modulePath);
                await handler(req, res);
              } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message }));
              }
            });
            return;
          }
          next();
        });
      };

      handleApiRequest('/api/agent', './api/agent.js');
      handleApiRequest('/api/chat', './api/chat.js');
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY;

  // Determine base path based on deployment environment:
  // - Vercel sets VERCEL=1 -> base: '/'
  // - GitHub Pages / GitHub Actions (GITHUB_ACTIONS=true, GITHUB_PAGES=true, or DEPLOY_TARGET=gh-pages) -> base: '/byteFirst/'
  // - Custom override via VITE_BASE_PATH or BASE_PATH
  // - Normal production / local development: '/'
  const isGitHubPages = Boolean(
    env.GITHUB_PAGES === 'true' ||
    process.env.GITHUB_PAGES === 'true' ||
    process.env.DEPLOY_TARGET === 'gh-pages' ||
    (process.env.GITHUB_ACTIONS === 'true' && !process.env.VERCEL)
  );
  const base = env.VITE_BASE_PATH || process.env.VITE_BASE_PATH || process.env.BASE_PATH || (isGitHubPages ? '/byteFirst/' : '/');

  return {
    base,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    plugins: [react(), apiDevServerPlugin(apiKey)],
    server: {
      port: 5173,
      host: true
    }
  };
});
