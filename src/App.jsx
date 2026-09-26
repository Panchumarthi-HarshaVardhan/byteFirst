import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AgentProvider } from './context/AgentContext';
import DigitalIDAgent from './components/agent/DigitalIDAgent';
import Home from './pages/Home';
import CreateID from './pages/CreateID';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AgentProvider>
          <Routes>
            {/* 1. Landing Page (Pure showcase & presentation) */}
            <Route path="/" element={<Home />} />

            {/* 2. ID Creation Experience (Student Form, Preview, Customization & Download) */}
            <Route path="/create" element={<CreateID />} />

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

