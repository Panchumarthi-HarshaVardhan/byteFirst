import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="final-cta-section">
      <div className="landing-container">
        <div className="final-cta-card">
          <div className="cta-glow-ambient"></div>

          <div className="final-cta-content">
            <div className="cta-subtitle-pill">
              <Sparkles size={14} />
              <span>Get Started Now</span>
            </div>

            <h2 className="final-cta-heading">Ready to create your digital identity?</h2>
            <p className="final-cta-subheading">
              Generate your professional college ID in just a few steps.
            </p>

            <div className="final-cta-btn-wrap">
              <button
                type="button"
                className="final-cta-primary-btn"
                onClick={() => navigate('/create')}
              >
                <span>Create Your Digital ID</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
