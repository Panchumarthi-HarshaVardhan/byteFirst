import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handleAiDesignRequest } from './server/api/ai-design.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from .env
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY

  return {
    plugins: [
      react(),
      {
        name: 'groq-ai-design-api',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.originalUrl || req.url || '';
            if (url.includes('/api/ai/design')) {
              handleAiDesignRequest(req, res, apiKey);
            } else {
              next();
            }
          });
        }
      }
    ],
    server: {
      port: 5173,
      host: true
    }
  }
})
