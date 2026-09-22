import React, { useState, useRef, useEffect } from 'react';
import { CreditCard, ShieldCheck, QrCode, RotateCw, Pause, Play, MapPin, Phone, Calendar, Heart } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function DigitalIDShowcase() {
  const [rotY, setRotY] = useState(15);
  const [rotX, setRotX] = useState(-5);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 30 });

  const dragStartRef = useRef({ x: 0, y: 0, initialRotY: 0, initialRotX: 0 });
  const animFrameRef = useRef(null);

  // Continuous auto-rotation around itself in 3D
  useEffect(() => {
    if (!isAutoRotating || isDragging) return;

    let lastTime = performance.now();
    const animate = (currentTime) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setRotY((prev) => (prev + delta * 28) % 360);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isAutoRotating, isDragging]);

  // Pointer drag controls (mouse & touch)
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialRotY: rotY,
      initialRotX: rotX
    };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    setRotY((dragStartRef.current.initialRotY + deltaX * 0.75) % 360);
    // Constrain pitch to -25 to +25 deg for realistic perspective
    const newRotX = Math.max(-25, Math.min(25, dragStartRef.current.initialRotX - deltaY * 0.4));
    setRotX(newRotX);

    // Update light glare position
    setGlarePos({
      x: Math.min(100, Math.max(0, 50 + deltaX * 0.2)),
      y: Math.min(100, Math.max(0, 30 + deltaY * 0.2))
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Quick 180° flip to back or front
  const handleFlip180 = () => {
    setIsAutoRotating(false);
    setRotY((prev) => (prev + 180) % 360);
  };

  const toggleAutoRotate = () => {
    setIsAutoRotating((prev) => !prev);
  };

  // Determine which side is facing user (for label indicator)
  const normalizedY = ((rotY % 360) + 360) % 360;
  const isBackSide = normalizedY > 90 && normalizedY < 270;

  return (
    <div className="showcase-3d-stage-wrapper">
      <div
        className={`showcase-3d-stage ${isDragging ? 'is-dragging' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Subtle Ambient Sky Lighting */}
        <div className="showcase-stage-ambient"></div>

        {/* Floating Peripheral Element 1: Realistic Student Credential Badge */}
        <div className="floating-badge-element badge-verification">
          <div className="badge-icon-wrap">
            <ShieldCheck size={16} className="badge-check-icon" />
          </div>
          <div className="badge-info">
            <span className="badge-primary-text">Official Student Credential</span>
            <span className="badge-secondary-text">Status: Active Enrollment</span>
          </div>
        </div>

        {/* Floating Peripheral Element 2: Small Campus Meta Panel */}
        <div className="floating-badge-element badge-metadata">
          <div className="meta-dot"></div>
          <div className="meta-text-col">
            <span className="meta-title">CAMPUS PRIVILEGES</span>
            <span className="meta-value">FULL LAB & LIBRARY ACCESS</span>
          </div>
        </div>

        {/* Floating Peripheral Element 3: Scannable Validation Box */}
        <div className="floating-badge-element badge-qr-quick">
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

        {/* ========================================================
            3D ROTATING CARD (With True Front and Back Faces)
            ======================================================== */}
        <div
          className="showcase-card-3d-flipper"
          style={{
            transform: `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg)`
          }}
        >
          {/* Dynamic Light Sheen Overlay */}
          <div
            className="card-glare-overlay"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 70%)`
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

      {/* Interactive 3D Rotation Controls */}
      <div className="showcase-controls-bar">
        <button
          type="button"
          className="ctrl-pill-btn"
          onClick={handleFlip180}
          title="Flip 180 degrees to view other side"
        >
          <RotateCw size={13} />
          <span>{isBackSide ? 'View Front Side' : 'View Back Side'}</span>
        </button>

        <button
          type="button"
          className="ctrl-pill-btn"
          onClick={toggleAutoRotate}
          title={isAutoRotating ? 'Pause auto-rotation' : 'Resume auto-rotation'}
        >
          {isAutoRotating ? <Pause size={13} /> : <Play size={13} />}
          <span>{isAutoRotating ? 'Auto-Rotate ON' : 'Auto-Rotate PAUSED'}</span>
        </button>
      </div>

      <div className="showcase-interaction-hint">
        <span>💡 Drag with mouse to freely inspect in 3D</span>
      </div>
    </div>
  );
}
