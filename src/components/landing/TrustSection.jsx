import React from 'react';
import { Zap, ShieldCheck, Award, Share2 } from 'lucide-react';

export default function TrustSection() {
  const trustItems = [
    {
      icon: Zap,
      title: 'Instant Creation',
      description: 'Generate complete credentials in seconds without unnecessary friction.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Identity',
      description: 'Tamper-evident formatting with embedded validation payloads.'
    },
    {
      icon: Award,
      title: 'Professional Design',
      description: 'Accredited collegiate typography and ISO/IEC standard layouts.'
    },
    {
      icon: Share2,
      title: 'Easy Sharing',
      description: 'Export directly to high-fidelity image formats ready for any device.'
    }
  ];

  return (
    <section className="trust-section">
      <div className="landing-container">
        <div className="trust-header">
          <span className="trust-subtitle">BUILT FOR THE NEXT GENERATION OF DIGITAL IDENTITY</span>
        </div>

        <div className="trust-grid">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="trust-card">
                <div className="trust-icon-box">
                  <Icon size={20} />
                </div>
                <div className="trust-card-body">
                  <h3 className="trust-card-title">{item.title}</h3>
                  <p className="trust-card-desc">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
