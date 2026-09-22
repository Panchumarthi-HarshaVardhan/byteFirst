import React from 'react';
import { Eye, Award, Palette, Download, Sparkles } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Eye,
      title: 'Instant Preview',
      description: 'See your ID card update instantly as you enter your information.',
      badge: 'Live Sync',
      color: '#2563eb'
    },
    {
      icon: Award,
      title: 'Professional Design',
      description: 'Generate a clean and professional college identity card.',
      badge: 'Accredited Layout',
      color: '#4f46e5'
    },
    {
      icon: Palette,
      title: 'Customizable',
      description: 'Choose themes and personalize your digital ID.',
      badge: '6 Color Schemes',
      color: '#059669'
    },
    {
      icon: Download,
      title: 'Downloadable',
      description: 'Download your completed ID card as an image.',
      badge: 'High-Res PNG',
      color: '#9333ea'
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-subtitle-pill">
            <Sparkles size={14} />
            <span>Key Capabilities</span>
          </div>
          <h2 className="section-title">Everything You Need For College Identity</h2>
          <p className="section-desc">
            A frictionless, browser-first identity generator engineered with modern React patterns.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="features-grid">
          {features.map((feature, idx) => {
            const IconComp = feature.icon;
            return (
              <div key={idx} className="feature-card">
                <div className="feature-top">
                  <div className="feature-icon-wrapper" style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                    <IconComp size={24} />
                  </div>
                  <span className="feature-badge">{feature.badge}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
