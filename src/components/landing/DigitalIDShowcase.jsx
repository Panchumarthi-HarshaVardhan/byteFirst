import React, { useState, useRef } from 'react';
import { CreditCard, ShieldCheck, QrCode, RotateCw, MapPin, Phone, Calendar, Heart } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function DigitalIDShowcase() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 30 });
  const [isHovered, setIsHovered] = useState(false);
  const stageRef = useRef(null);

  // Subtle, smooth mouse tilt interaction (-5deg to +5deg conceptual range)
  const handlePointerMove = (e) => {
    if (!stageRef.current) return;
    if (window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = stageRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    // Keep rotation range strictly within -5deg to +5deg for maximum readability
    const targetTiltY = Math.max(-5, Math.min(5, nx * 10));
    const targetTiltX = Math.max(-5, Math.min(5, -ny * 10));

    setTilt({ x: targetTiltX, y: targetTiltY });
    setGlarePos({
      x: Math.min(100, Math.max(0, 50 + nx * 40)),
      y: Math.min(100, Math.max(0, 30 + ny * 40))
    });
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlarePos({ x: 50, y: 30 });
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const currentRotY = isFlipped ? 180 - tilt.y : tilt.y;
  const currentRotX = tilt.x;

  // Multi-layered depth parallax for floating peripheral elements
  const badge1Parallax = `translate3d(${tilt.y * 1.4}px, ${-tilt.x * 1.4}px, 0)`;
  const badge2Parallax = `translate3d(${-tilt.y * 1.1}px, ${tilt.x * 1.1}px, 0)`;
  const badge3Parallax = `translate3d(${tilt.y * 0.9}px, ${tilt.x * 0.9}px, 0)`;

  return (
    <div className="showcase-3d-stage-wrapper">
      <div
        ref={stageRef}
        className={`showcase-3d-stage ${isHovered ? 'is-hovered' : ''}`}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {/* Subtle Ambient Sky Lighting with organic breath */}
        <div className="showcase-stage-ambient"></div>

        {/* Floating Peripheral Element 1: Realistic Student Credential Badge */}
        <div
          className="floating-badge-element badge-verification"
          style={{ transform: badge1Parallax }}
        >
          <div className="badge-icon-wrap">
            <ShieldCheck size={16} className="badge-check-icon" />
          </div>
          <div className="badge-info">
            <span className="badge-primary-text">Official Student Credential</span>
            <span className="badge-secondary-text">Status: Active Enrollment</span>
          </div>
        </div>

        {/* Floating Peripheral Element 2: Small Campus Meta Panel */}
        <div
          className="floating-badge-element badge-metadata"
          style={{ transform: badge2Parallax }}
        >
          <div className="meta-dot"></div>
          <div className="meta-text-col">
            <span className="meta-title">CAMPUS PRIVILEGES</span>
            <span className="meta-value">FULL LAB & LIBRARY ACCESS</span>
          </div>
        </div>

        {/* Floating Peripheral Element 3: Scannable Validation Box */}
        <div
          className="floating-badge-element badge-qr-quick"
          style={{ transform: badge3Parallax }}
        >
          <div className="qr-mini-frame">
            <QRCodeSVG
              value="https://digitalid.app/verify/DID-2026-001"
              size={40}
              level="L"
              bgColor="#ffffff"
              fgColor="#0369a1"
            />
          </div>
          <span className="qr-mini-tag">QUICK SCAN</span>
        </div>

        {/* Floating Rig providing subtle, continuous up-down floating over 5 seconds */}
        <div className="showcase-floating-rig">
          {/* Soft Dynamic Drop Shadow */}
          <div className="showcase-card-shadow" aria-hidden="true"></div>

          {/* ========================================================
              3D CARD FLIPPER (Front and Back Faces with Smooth Tilt)
              ======================================================== */}
          <div
            className={`showcase-card-3d-flipper ${isHovered ? 'is-hovered' : ''} ${isFlipped ? 'is-flipped' : ''}`}
            style={{
              transform: `perspective(1200px) rotateY(${currentRotY}deg) rotateX(${currentRotX}deg)`
            }}
          >
            {/* Dynamic Light Sheen Overlay */}
            <div
              className="card-glare-overlay"
              style={{
                background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%)`
              }}
            ></div>

          {/* ====================================================
              1. CARD FRONT FACE
              ==================================================== */}
          <div className="showcase-card-face showcase-face-front">
            {/* Top Lanyard Slot */}
            <div className="card-top-slot">
              <span className="slot-pill"></span>
            </div>

            {/* Header */}
            <div className="showcase-card-header">
              <div className="header-brand-group">
                <div className="header-icon-box">
                  <CreditCard size={16} />
                </div>
                <div>
                  <div className="card-brand-title">DIGITAL UNIVERSITY</div>
                  <div className="card-brand-sub">INSTITUTE OF TECHNOLOGY</div>
                </div>
              </div>

              <div className="card-smart-chip">
                <div className="chip-micro-lines"></div>
              </div>
            </div>

            {/* Ribbon */}
            <div className="showcase-card-ribbon">
              <span className="ribbon-student-lbl">STUDENT IDENTITY CARD</span>
              <span className="ribbon-session">2026–2030</span>
            </div>

            {/* Body */}
            <div className="showcase-card-body">
              {/* Photo Box */}
              <div className="showcase-photo-col">
                <div className="showcase-photo-box">
                  <div className="photo-placeholder-graphic">
                    <span className="photo-initials">AM</span>
                    <div className="photo-corner-accent"></div>
                  </div>
                  <div className="photo-auth-badge">
                    <ShieldCheck size={11} />
                    <span>VERIFIED</span>
                  </div>
                </div>
              </div>

              {/* Information Column */}
              <div className="showcase-info-col">
                <div className="student-name-box">
                  <h3 className="student-name-text">ALEX MORGAN</h3>
                  <div className="student-id-pill">
                    <span className="id-label">ID:</span>
                    <span className="id-val">DID-2026-001</span>
                  </div>
                </div>

                <div className="student-details-matrix">
                  <div className="matrix-row">
                    <span className="matrix-lbl">MAJOR</span>
                    <span className="matrix-val">Computer Science</span>
                  </div>
                  <div className="matrix-row">
                    <span className="matrix-lbl">LEVEL</span>
                    <span className="matrix-val">3rd Year • Semester 6</span>
                  </div>
                  <div className="matrix-row">
                    <span className="matrix-lbl">ISSUER</span>
                    <span className="matrix-val">Academic Registrar Office</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="showcase-card-footer">
              <div className="footer-qr-container">
                <div className="footer-qr-box">
                  <QRCodeSVG
                    value="https://digitalid.app/verify/DID-2026-001"
                    size={46}
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#0369a1"
                  />
                </div>
                <span className="qr-validate-lbl">SCAN TO VALIDATE</span>
              </div>

              <div className="footer-auth-container">
                <div className="auth-signature">Alex Morgan</div>
                <div className="auth-line"></div>
                <span className="auth-title">Authorized Registrar</span>
              </div>
            </div>

            <div className="showcase-holo-line"></div>
          </div>

          {/* ====================================================
              2. CARD BACK FACE (Seen when rotating around)
              ==================================================== */}
          <div className="showcase-card-face showcase-face-back">
            <div className="card-top-slot">
              <span className="slot-pill"></span>
            </div>

            <div className="showcase-card-header back-header">
              <div className="card-brand-title" style={{ textAlign: 'center', width: '100%', fontSize: '0.6875rem' }}>
                INSTITUTIONAL DIRECTIVES & EMERGENCY INFO
              </div>
            </div>

            <div className="showcase-card-body back-body">
              <div className="back-data-rows">
                <div className="back-data-item">
                  <Heart size={12} className="back-data-icon text-danger" />
                  <div>
                    <span className="back-data-label">Medical / Blood Group:</span>
                    <span className="back-data-value text-blood">BLOOD GRP: <strong>O+</strong></span>
                  </div>
                </div>

                <div className="back-data-item">
                  <MapPin size={12} className="back-data-icon" />
                  <div>
                    <span className="back-data-label">Campus Address:</span>
                    <span className="back-data-value">Tech Innovation Campus, Ridge Way</span>
                  </div>
                </div>

                <div className="back-data-item">
                  <Phone size={12} className="back-data-icon" />
                  <div>
                    <span className="back-data-label">Emergency Contact:</span>
                    <span className="back-data-value">+1 (800) 555-0199</span>
                  </div>
                </div>

                <div className="back-data-item">
                  <Calendar size={12} className="back-data-icon" />
                  <div>
                    <span className="back-data-label">Card Validity:</span>
                    <span className="back-data-value">Issued: Aug 2026 • Valid Thru: Jun 2030</span>
                  </div>
                </div>
              </div>

              {/* Exact Standard Institutional Terms */}
              <div className="back-guidelines-box">
                <span className="guidelines-caption">TERMS & CONDITIONS</span>
                <ol className="guidelines-ordered">
                  <li>Non-transferable and remains property of Digital University.</li>
                  <li>Report loss immediately to Academic Registrar.</li>
                  <li>Mandatory for campus, library, and lab entry.</li>
                </ol>
              </div>

              {/* Barcode representation */}
              <div className="back-barcode-box">
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
                  <div className="bar b-thin"></div>
                  <div className="bar b-thick"></div>
                  <div className="bar b-thin"></div>
                  <div className="bar b-thick"></div>
                  <div className="bar b-med"></div>
                </div>
                <span className="barcode-code-text">*DID-2026-001*</span>
              </div>
            </div>

            <div className="showcase-holo-line"></div>
          </div>
        </div>
      </div>
    </div>

      {/* Interactive 3D Flip Controls */}
      <div className="showcase-controls-bar">
        <button
          type="button"
          className="ctrl-pill-btn"
          onClick={handleFlip}
          title={isFlipped ? "Flip to view front side" : "Flip to view back side"}
        >
          <RotateCw size={13} className={isFlipped ? "rotate-flipped" : ""} />
          <span>{isFlipped ? 'View Front Side' : 'View Back Side'}</span>
        </button>
      </div>

      <div className="showcase-interaction-hint">
        <span>💡 Move mouse over card to inspect in 3D</span>
      </div>
    </div>
  );
}

