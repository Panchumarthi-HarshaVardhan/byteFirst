import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import DigitalIDShowcase from './DigitalIDShowcase';

export default function LandingHero() {
  const navigate = useNavigate();

  const scrollToFeatures = (e) => {
    e.preventDefault();
    const el = document.querySelector('#features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="landing-hero-section">
      {/* Background Ambience: Faint Grid, Subtle Blue/Indigo Glow */}
      <div className="hero-grid-pattern"></div>
      <div className="hero-radial-glow-primary"></div>
      <div className="hero-radial-glow-secondary"></div>

      <div className="landing-container hero-inner-grid">
        {/* Left Column: Hero Text & CTAs */}
        <div className="hero-text-block">
          <div className="hero-announcement-pill">
            <span className="pill-dot"></span>
            <span className="pill-text">The New Standard in Academic Credentials</span>
          </div>

          <h1 className="hero-headline">
            Your Identity. <br />
            <span className="headline-gradient">Digitally Reimagined.</span>
          </h1>

          <p className="hero-lead-text">
            Create a professional digital college identity in seconds — designed for the modern student.
          </p>

          <div className="hero-action-buttons">
            <button
              type="button"
              className="hero-primary-btn"
              onClick={() => navigate('/create')}
            >
              <span>Create Your Digital ID</span>
              <ArrowRight size={18} />
            </button>

            <a
              href="#features"
              onClick={scrollToFeatures}
              className="hero-secondary-btn"
            >
              <span>Explore Features</span>
              <ChevronRight size={17} />
            </a>
          </div>

          {/* Quick value signals */}
          <div className="hero-signals-row">
            <div className="signal-item">
              <CheckCircle2 size={16} className="signal-icon" />
              <span>Instant Generation</span>
            </div>
            <div className="signal-item">
              <CheckCircle2 size={16} className="signal-icon" />
              <span>Scannable Verification</span>
            </div>
            <div className="signal-item">
              <CheckCircle2 size={16} className="signal-icon" />
              <span>Zero Account Required</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Digital ID Showcase */}
        <div className="hero-showcase-block">
          <DigitalIDShowcase />
        </div>
      </div>
    </section>
  );
}
