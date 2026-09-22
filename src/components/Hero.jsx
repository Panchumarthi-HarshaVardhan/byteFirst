import React, { useState } from 'react';
import { ArrowRight, Play, ShieldCheck, CheckCircle2, QrCode, MapPin, Phone, Calendar, Pause, Play as PlayIcon } from 'lucide-react';

export default function Hero() {
  const [isRotating, setIsRotating] = useState(true);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-backdrop-glow"></div>
      <div className="section-container hero-container">
        
        {/* Left: Hero Copy & CTA */}
        <div className="hero-content">
          <h1 className="hero-title">
            Create Your <span className="text-gradient">Digital College ID</span>
          </h1>

          <p className="hero-subtitle">
            Generate a professional digital identity card in seconds. Enter your details, customize your card, and download it instantly.
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => scrollTo('#generator')}
            >
              <span>Create Your ID</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="btn btn-outline btn-lg"
              onClick={() => scrollTo('#how-it-works')}
            >
              <Play size={16} fill="currentColor" />
              <span>How It Works</span>
            </button>
          </div>

          {/* Value props bullets */}
          <div className="hero-stats">
            <div className="hero-stat-item">
              <CheckCircle2 size={16} className="stat-check" />
              <span>Real-time Live Preview</span>
            </div>
            <div className="hero-stat-item">
              <CheckCircle2 size={16} className="stat-check" />
              <span>High-Res PNG Export</span>
            </div>
            <div className="hero-stat-item">
              <CheckCircle2 size={16} className="stat-check" />
              <span>Customizable Color Schemes</span>
            </div>
          </div>
        </div>

        {/* Right: 3D Continuously Rotating Sample ID Card */}
        <div className="hero-visual">
          <div className="sample-card-wrapper">
            <div className="sample-card-glow"></div>

            {/* 3D Perspective Card Container with Self-Rotation */}
            <div className="sample-card-rotating-wrapper">
              <div className={`sample-card-3d-flipper ${!isRotating ? 'rotation-paused' : ''}`}>
                
                {/* 1. FRONT FACE */}
                <div className="sample-id-card sample-card-face-front">
                  {/* Lanyard Clip Slot */}
                  <div className="card-lanyard-slot">
                    <span className="lanyard-hole"></span>
                  </div>

                  {/* Card Header */}
                  <div className="sample-card-header">
                    <div className="sample-college-emblem">
                      <span className="emblem-glyph">🏛️</span>
                    </div>
                    <div className="sample-college-info">
                      <div className="sample-college-name">METROPOLITAN INSTITUTE</div>
                      <div className="sample-card-sublabel">CAMPUS STUDENT IDENTITY</div>
                    </div>
                    <div className="sample-chip-icon">
                      <div className="smart-chip">
                        <div className="chip-lines"></div>
                      </div>
                    </div>
                  </div>

                  {/* Student Identification Banner */}
                  <div className="sample-ribbon">
                    <span>STUDENT ID CARD • 2024-2028</span>
                  </div>

                  {/* Card Body */}
                  <div className="sample-card-body">
                    {/* Photo & Badge */}
                    <div className="sample-photo-col">
                      <div className="sample-photo-box">
                        <div className="sample-photo-avatar">
                          <span className="avatar-letter">H</span>
                        </div>
                        <div className="sample-verified-pill">
                          <ShieldCheck size={12} />
                          <span>VERIFIED</span>
                        </div>
                      </div>
                    </div>

                    {/* Information Details */}
                    <div className="sample-details-col">
                      <div className="sample-student-name">HARSHAVARDHAN P.</div>
                      <div className="sample-roll-pill">ID: 21B91A0582</div>

                      <div className="sample-meta-grid">
                        <div className="meta-item">
                          <span className="meta-lbl">MAJOR</span>
                          <span className="meta-val">Comp. Science & Eng.</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-lbl">YEAR / SEC</span>
                          <span className="meta-val">4th Year • Sec A</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-lbl">BLOOD GRP</span>
                          <span className="meta-val highlight-blood">O+</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-lbl">VALID THRU</span>
                          <span className="meta-val">06 / 2028</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="sample-card-footer">
                    <div className="sample-qr-mock">
                      <QrCode size={40} className="sample-qr-icon" />
                      <span className="qr-caption">SCAN TO VERIFY</span>
                    </div>

                    <div className="sample-auth-sign">
                      <div className="signature-scribble">Registrar Auth.</div>
                      <div className="signature-line">Dean of Academics</div>
                    </div>
                  </div>

                  {/* Security Holographic Foil Accent */}
                  <div className="sample-holo-strip"></div>
                </div>

                {/* 2. BACK FACE (Shown during 360 rotation) */}
                <div className="sample-id-card sample-card-face-back">
                  <div className="card-lanyard-slot">
                    <span className="lanyard-hole"></span>
                  </div>

                  <div className="sample-card-header" style={{ background: '#0f172a' }}>
                    <div className="sample-college-name" style={{ textAlign: 'center', width: '100%', fontSize: '0.6875rem' }}>
                      CAMPUS DIRECTIVES & EMERGENCY INFO
                    </div>
                  </div>

                  <div className="sample-card-body-back">
                    <div className="sample-back-details">
                      <div className="sample-back-row">
                        <MapPin size={12} className="back-icon" />
                        <div>
                          <span className="back-key">Campus Address:</span>
                          <span className="back-val">University Tech Park, Hyderabad</span>
                        </div>
                      </div>
                      <div className="sample-back-row">
                        <Phone size={12} className="back-icon" />
                        <div>
                          <span className="back-key">Emergency Helpline:</span>
                          <span className="back-val">+91 98480 22338</span>
                        </div>
                      </div>
                      <div className="sample-back-row">
                        <Calendar size={12} className="back-icon" />
                        <div>
                          <span className="back-key">Valid Period:</span>
                          <span className="back-val">Aug 2024 – Jun 2028</span>
                        </div>
                      </div>
                    </div>

                    <div className="sample-guidelines">
                      <span className="guidelines-head">TERMS OF USE</span>
                      <p>Property of Metropolitan Institute. Must be presented upon request by campus security.</p>
                    </div>

                    <div className="sample-barcode-wrap">
                      <div className="barcode-bars">
                        <div className="bar b-thick"></div>
                        <div className="bar b-thin"></div>
                        <div className="bar b-med"></div>
                        <div className="bar b-thick"></div>
                        <div className="bar b-thin"></div>
                        <div className="bar b-med"></div>
                        <div className="bar b-thick"></div>
                        <div className="bar b-thin"></div>
                        <div className="bar b-thick"></div>
                        <div className="bar b-med"></div>
                        <div className="bar b-thick"></div>
                      </div>
                      <span className="barcode-number">*21B91A0582*</span>
                    </div>
                  </div>

                  <div className="sample-holo-strip"></div>
                </div>

              </div>
            </div>

            {/* Rotation Controls Pill */}
            <div className="rotation-control-pill">
              <button
                type="button"
                className="rotation-toggle-btn"
                onClick={() => setIsRotating(!isRotating)}
                title={isRotating ? 'Pause card 3D rotation' : 'Resume card 3D rotation'}
              >
                {isRotating ? <Pause size={12} /> : <PlayIcon size={12} />}
                <span>{isRotating ? '360° Rotating Card (Click to Pause)' : 'Rotation Paused (Click to Play)'}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
