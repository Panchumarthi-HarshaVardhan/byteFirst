import React from 'react';
import { UserCheck, Sliders, ArrowDownToLine, ChevronRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Enter Details',
      description: 'Add your personal and academic information.',
      icon: UserCheck,
      details: ['Controlled form inputs', 'Instant live reflection', 'Photo upload with preview']
    },
    {
      number: '02',
      title: 'Preview & Customize',
      description: 'See your ID card update in real time and customize its appearance.',
      icon: Sliders,
      details: ['6 university palettes', 'Vertical badge or horizontal card', 'Front & Back flip view']
    },
    {
      number: '03',
      title: 'Generate & Download',
      description: 'Generate your final ID card and download it.',
      icon: ArrowDownToLine,
      details: ['Scannable verification QR', 'High-DPI 300dpi PNG', 'Direct print support']
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="section-container">
        
        <div className="section-header text-center">
          <div className="section-subtitle-pill">
            <span>Seamless Workflow</span>
          </div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-desc">
            Three straightforward steps from blank form to a finished, verifiable student credential.
          </p>
        </div>

        <div className="steps-container">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="step-card-wrapper">
                <div className="step-card">
                  <div className="step-number-header">
                    <span className="step-number">{step.number}</span>
                    <div className="step-icon-bubble">
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>

                  <div className="step-checklist">
                    {step.details.map((item, i) => (
                      <div key={i} className="step-check-item">
                        <span className="step-bullet">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {idx < steps.length - 1 && (
                  <div className="step-connector" aria-hidden="true">
                    <ChevronRight size={28} className="connector-arrow" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
