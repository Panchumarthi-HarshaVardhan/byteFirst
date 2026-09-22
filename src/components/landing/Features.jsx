import React from 'react';
import { Zap, Eye, Palette, QrCode, Download, Smartphone } from 'lucide-react';

export default function Features() {
  const featureList = [
    {
      icon: Zap,
      title: 'Instant Creation',
      description: 'Create your digital ID in minutes.',
      tag: 'Fast & Effortless',
      accent: '#2563eb'
    },
    {
      icon: Eye,
      title: 'Live Preview',
      description: 'See every change instantly.',
      tag: 'Real-time Sync',
      accent: '#3b82f6'
    },
    {
      icon: Palette,
      title: 'Personalized Design',
      description: 'Customize the appearance of your ID.',
      tag: 'Collegiate Themes',
      accent: '#4f46e5'
    },
    {
      icon: QrCode,
      title: 'Digital Verification',
      description: 'Use a QR code for quick identity verification.',
      tag: 'Scannable Cryptography',
      accent: '#059669'
    },
    {
      icon: Download,
      title: 'Download Anywhere',
      description: 'Export your ID and keep it accessible.',
      tag: '300 DPI High-Res',
      accent: '#7c3aed'
    },
    {
      icon: Smartphone,
      title: 'Mobile Ready',
      description: 'Designed for desktop and mobile.',
      tag: 'Responsive Standard',
      accent: '#0284c7'
    }
  ];

  return (
    <section id="features" className="landing-features-section">
      <div className="landing-container">
        
        {/* Section Header */}
        <div className="section-head-center">
          <span className="section-eyebrow">CAPABILITIES</span>
          <h2 className="section-headline">Everything you need for a digital identity.</h2>
          <p className="section-description">
            A cohesive identity suite built from the ground up to render, personalize, and authenticate collegiate credentials effortlessly.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="features-showcase-grid">
          {featureList.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="feature-tile">
                <div className="tile-hover-glow"></div>
                <div className="tile-top-row">
                  <div className="tile-icon-bubble">
                    <Icon size={22} className="tile-icon" />
                  </div>
                  <span className="tile-tag">{f.tag}</span>
                </div>
                <h3 className="tile-title">{f.title}</h3>
                <p className="tile-desc">{f.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
