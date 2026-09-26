import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AgentProvider } from './context/AgentContext';
import DigitalIDAgent from './components/agent/DigitalIDAgent';
import Home from './pages/Home';
import CreateID from './pages/CreateID';
import DesignEditor from './pages/DesignEditor';

/**
 * Dynamically resolves the router basename:
 * - On GitHub Pages (e.g. /byteFirst/...), uses '/byteFirst'
 * - On Vercel or standard root deployments (e.g. /), uses '/'
 */
function getBasename() {
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/byteFirst')) {
    return '/byteFirst';
  }
  const base = import.meta.env.BASE_URL;
  if (base && base !== '/' && base !== './') {
    return base.endsWith('/') ? base.slice(0, -1) : base;
  }
  return '/';
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={getBasename()}>
        <AgentProvider>
          <Routes>
            {/* 1. Landing Page (Pure showcase & presentation) */}
            <Route path="/" element={<Home />} />

            {/* 2. ID Creation Experience (Student Form, Preview, Customization & Download) */}
            <Route path="/create" element={<CreateID />} />

            {/* 3. Professional Canvas ID Card Designer (Canva / Figma style) */}
            <Route path="/editor" element={<DesignEditor />} />
            <Route path="/design" element={<DesignEditor />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* AuntyID — Friendly AI-Powered Identity Assistant */}
          <DigitalIDAgent />
        </AgentProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
