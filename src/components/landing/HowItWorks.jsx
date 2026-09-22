import React from 'react';
import { UserCheck, Sliders, ArrowDownToLine } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Enter Your Details',
      description: 'Add your academic and personal information.',
      icon: UserCheck
    },
    {
      number: '02',
      title: 'Customize Your ID',
      description: 'Choose your preferred ID design.',
      icon: Sliders
    },
    {
      number: '03',
      title: 'Generate & Download',
      description: 'Get your professional digital identity card.',
      icon: ArrowDownToLine
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works-landing">
      <div className="landing-container">
        
        <div className="section-head-center">
          <span className="section-eyebrow">WORKFLOW</span>
          <h2 className="section-headline">How It Works</h2>
          <p className="section-description">
            Three simple steps to transition from academic raw data to a verified, high-resolution digital identity card.
          </p>
        </div>

        <div className="steps-flow-container">
          {/* Background Connecting Line */}
          <div className="flow-connecting-line" aria-hidden="true"></div>

          <div className="steps-cards-row">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="step-flow-card">
                  <div className="step-flow-badge-wrap">
                    <span className="step-flow-number">{step.number}</span>
                    <div className="step-flow-icon-circle">
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className="step-flow-title">{step.title}</h3>
                  <p className="step-flow-desc">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
