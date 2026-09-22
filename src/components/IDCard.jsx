import React, { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, Phone, Mail, MapPin, Calendar, Heart, GraduationCap } from 'lucide-react';

const IDCard = forwardRef(function IDCard(
  {
    student,
    theme,
    orientation = 'vertical', // 'vertical' | 'horizontal'
    isFlipped = false
  },
  ref
) {
  const {
    fullName,
    rollNumber,
    collegeName,
    branch,
    year,
    section,
    email,
    phone,
    dob,
    bloodGroup,
    address,
    photoUrl
  } = student;

  // Formatted uppercase name
  const displayName = fullName && fullName.trim() ? fullName.toUpperCase() : 'STUDENT NAME';
  const displayCollege = collegeName && collegeName.trim() ? collegeName.toUpperCase() : 'NATIONAL INSTITUTE OF TECHNOLOGY';
  const displayRoll = rollNumber && rollNumber.trim() ? rollNumber.toUpperCase() : 'ROLL NUMBER';
  const displayBranch = branch || 'Department / Major';
  const displayYear = year || 'Academic Year';
  const displaySection = section ? `Sec ${section.toUpperCase()}` : 'Sec A';
  const displayBlood = bloodGroup || 'O+';
  const displayEmail = email || 'student@college.edu';
  const displayPhone = phone || '+91 00000 00000';

  // Format initials for default avatar
  const initials = fullName
    ? fullName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'ID';

  // QR Code payload - verified digital credentials
  const qrPayload = JSON.stringify({
    name: displayName,
    id: displayRoll,
    inst: displayCollege,
    branch: displayBranch,
    blood: displayBlood,
    valid: '2028-06-30'
  });

  const cardStyleVars = {
    '--theme-primary': theme.primary,
    '--theme-secondary': theme.secondary,
    '--theme-accent': theme.accent,
    '--theme-header-bg': theme.headerBg,
    '--theme-light-bg': theme.lightBg,
    '--theme-badge-bg': theme.badgeBg,
    '--theme-border': theme.borderColor,
  };

  const isHorizontal = orientation === 'horizontal';

  return (
    <div className={`id-card-perspective-container orientation-${orientation}`}>
      <div
        ref={ref}
        id="printable-id-card"
        className={`id-card-root ${orientation} ${isFlipped ? 'is-flipped' : ''}`}
        style={cardStyleVars}
      >
        {/* ========================================================
            CARD FRONT FACE
            ======================================================== */}
        <div className={`id-card-face id-card-front ${isHorizontal ? 'face-horizontal' : ''}`}>
          {/* Lanyard Punch Slot */}
          <div className="lanyard-hole-container">
            <span className="lanyard-pill"></span>
          </div>

          {/* College Header */}
          <div className="card-header-banner">
            <div className="college-emblem-wrap">
              <div className="college-emblem-icon">
                <GraduationCap size={20} className="emblem-svg" />
              </div>
            </div>
            <div className="college-title-block">
              <h2 className="college-title">{displayCollege}</h2>
              <span className="college-subtitle">ACCREDITED AUTONOMOUS INSTITUTION</span>
            </div>
            <div className="card-chip-badge">
              <div className="smart-chip-gold">
                <span className="chip-pattern"></span>
              </div>
            </div>
          </div>

          {/* Ribbon Tag */}
          <div className="student-status-ribbon">
            <span className="ribbon-text">STUDENT IDENTITY CARD</span>
            <span className="ribbon-year">2024–2028</span>
          </div>

          {/* Main Card Body */}
          <div className={`card-front-body ${isHorizontal ? 'body-horizontal' : ''}`}>
            
            {/* 1. Photo Column (Clean: Blood Group moved to Back face) */}
            <div className="student-photo-wrapper">
              <div className="student-photo-frame">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={displayName}
                    className="student-actual-img"
                  />
                ) : (
                  <div className="student-photo-fallback">
                    <span className="avatar-initials">{initials}</span>
                    <span className="avatar-placeholder-label">PHOTO</span>
                  </div>
                )}
                {/* Verified Hologram Tag */}
                <div className="photo-hologram-seal">
                  <ShieldCheck size={12} className="seal-icon" />
                  <span>VERIFIED</span>
                </div>
              </div>
            </div>

            {/* 2. Information Details Column */}
            <div className="student-info-section">
              <div className="name-and-roll-block">
                <h3 className="student-display-name">{displayName}</h3>
                <div className="roll-number-badge">
                  <span className="roll-label">ROLL NO:</span>
                  <span className="roll-val">{displayRoll}</span>
                </div>
              </div>

              <div className="card-data-grid">
                <div className="data-row">
                  <span className="data-key">BRANCH</span>
                  <span className="data-val text-truncate">{displayBranch}</span>
                </div>

                <div className="data-cols-2">
                  <div className="data-row">
                    <span className="data-key">YEAR</span>
                    <span className="data-val">{displayYear}</span>
                  </div>
                  <div className="data-row">
                    <span className="data-key">SECTION</span>
                    <span className="data-val">{displaySection}</span>
                  </div>
                </div>

                <div className="data-row">
                  <span className="data-key">EMAIL</span>
                  <span className="data-val text-truncate text-small">{displayEmail}</span>
                </div>

                <div className="data-row">
                  <span className="data-key">PHONE</span>
                  <span className="data-val text-small">{displayPhone}</span>
                </div>
              </div>
            </div>

            {/* 3. In HORIZONTAL mode: QR Code & Signature column directly in body */}
            {isHorizontal && (
              <div className="horizontal-qr-sign-col">
                <div className="qr-code-section">
                  <div className="qr-wrapper">
                    <QRCodeSVG
                      value={qrPayload}
                      size={60}
                      level="M"
                      bgColor="#ffffff"
                      fgColor="#0f172a"
                    />
                  </div>
                  <span className="qr-scan-label">SCAN TO VERIFY</span>
                </div>

                <div className="auth-signature-block">
                  <div className="signature-art">
                    <span className="scribble-text">H. Vardhan</span>
                  </div>
                  <div className="signature-rule"></div>
                  <span className="signature-title">Authorized Signatory</span>
                </div>
              </div>
            )}
          </div>

          {/* In VERTICAL mode: Footer with QR Code & Authorized Signature */}
          {!isHorizontal && (
            <div className="card-front-footer">
              <div className="qr-code-section">
                <div className="qr-wrapper">
                  <QRCodeSVG
                    value={qrPayload}
                    size={52}
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#0f172a"
                  />
                </div>
                <span className="qr-scan-label">SCAN TO VERIFY</span>
              </div>

              <div className="auth-signature-block">
                <div className="signature-art">
                  <span className="scribble-text">H. Vardhan</span>
                </div>
                <div className="signature-rule"></div>
                <span className="signature-title">Authorized Signatory</span>
              </div>
            </div>
          )}

          {/* Bottom decorative color bar */}
          <div className="card-bottom-accent-bar"></div>
        </div>

        {/* ========================================================
            CARD BACK FACE (Includes Blood Group & Exact Requested Terms)
            ======================================================== */}
        <div className={`id-card-face id-card-back ${isHorizontal ? 'face-horizontal' : ''}`}>
          <div className="lanyard-hole-container">
            <span className="lanyard-pill"></span>
          </div>

          <div className="back-card-header">
            <h4>INSTITUTIONAL DIRECTIVES & EMERGENCY INFO</h4>
          </div>

          {/* Vertical Back Layout */}
          {!isHorizontal ? (
            <div className="back-card-body">
              <div className="back-info-block">
                {/* Blood Group Row */}
                <div className="back-info-row">
                  <Heart size={13} className="back-icon text-danger" />
                  <div>
                    <span className="back-label">Medical / Blood Group:</span>
                    <p className="back-value highlight-blood">BLOOD GRP: <strong>{displayBlood}</strong></p>
                  </div>
                </div>

                <div className="back-info-row">
                  <MapPin size={13} className="back-icon" />
                  <div>
                    <span className="back-label">Permanent Campus Address:</span>
                    <p className="back-value">{address || 'University Campus, Academic Ridge, India'}</p>
                  </div>
                </div>

                <div className="back-info-row">
                  <Phone size={13} className="back-icon" />
                  <div>
                    <span className="back-label">Emergency Helpline / Guardian:</span>
                    <p className="back-value">{displayPhone}</p>
                  </div>
                </div>

                <div className="back-info-row">
                  <Calendar size={13} className="back-icon" />
                  <div>
                    <span className="back-label">Card Validity:</span>
                    <p className="back-value">Issued: Aug 2024 • Valid Thru: Jun 2028</p>
                  </div>
                </div>
              </div>

              {/* Exact Terms and Conditions */}
              <div className="card-guidelines">
                <span className="guidelines-title">TERMS & CONDITIONS</span>
                <ol className="guidelines-list">
                  <li>Non-transferable and remains property of {displayCollege}.</li>
                  <li>Report loss immediately to Academic Registrar.</li>
                  <li>Mandatory for campus, library, and lab entry.</li>
                </ol>
              </div>

              {/* Barcode representation */}
              <div className="back-barcode-section">
                <div className="barcode-bars">
                  <div className="bar b-thick"></div>
                  <div className="bar b-thin"></div>
                  <div className="bar b-med"></div>
                  <div className="bar b-thick"></div>
                  <div className="bar b-thin"></div>
                  <div className="bar b-thin"></div>
                  <div className="bar b-thick"></div>
                  <div className="bar b-med"></div>
                  <div className="bar b-thin"></div>
                  <div className="bar b-thick"></div>
                  <div className="bar b-med"></div>
                  <div className="bar b-thin"></div>
                  <div className="bar b-thick"></div>
                  <div className="bar b-thin"></div>
                  <div className="bar b-med"></div>
                  <div className="bar b-thick"></div>
                  <div className="bar b-thin"></div>
                  <div className="bar b-med"></div>
                  <div className="bar b-thick"></div>
                  <div className="bar b-thin"></div>
                  <div className="bar b-thick"></div>
                </div>
                <span className="barcode-number">*{displayRoll}*</span>
              </div>
            </div>
          ) : (
            /* Horizontal Back Layout (Two Columns) */
            <div className="back-card-body horizontal-back-body">
              <div className="back-col-left">
                <div className="back-info-block">
                  {/* Blood Group Row */}
                  <div className="back-info-row">
                    <Heart size={13} className="back-icon text-danger" />
                    <div>
                      <span className="back-label">Medical / Blood Group:</span>
                      <p className="back-value highlight-blood">BLOOD GRP: <strong>{displayBlood}</strong></p>
                    </div>
                  </div>

                  <div className="back-info-row">
                    <MapPin size={13} className="back-icon" />
                    <div>
                      <span className="back-label">Campus Address:</span>
                      <p className="back-value text-truncate">{address || 'University Campus, India'}</p>
                    </div>
                  </div>

                  <div className="back-info-row">
                    <Phone size={13} className="back-icon" />
                    <div>
                      <span className="back-label">Emergency Helpline:</span>
                      <p className="back-value">{displayPhone}</p>
                    </div>
                  </div>

                  <div className="back-info-row">
                    <Calendar size={13} className="back-icon" />
                    <div>
                      <span className="back-label">Card Validity:</span>
                      <p className="back-value">Issued: Aug 2024 • Valid: Jun 2028</p>
                    </div>
                  </div>
                </div>

                {/* Exact Terms and Conditions in Horizontal Mode */}
                <div className="card-guidelines compact-guidelines">
                  <span className="guidelines-title">TERMS & CONDITIONS</span>
                  <ol className="guidelines-list">
                    <li>Non-transferable and remains property of {displayCollege}.</li>
                    <li>Report loss immediately to Academic Registrar.</li>
                    <li>Mandatory for campus, library, and lab entry.</li>
                  </ol>
                </div>
              </div>

              <div className="back-col-right">
                <div className="back-barcode-section">
                  <span className="barcode-scan-hint">SCAN STUDENT BARCODE</span>
                  <div className="barcode-bars barcode-bars-large">
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
                    <div className="bar b-med"></div>
                    <div className="bar b-thick"></div>
                    <div className="bar b-thin"></div>
                    <div className="bar b-thick"></div>
                  </div>
                  <span className="barcode-number">*{displayRoll}*</span>
                </div>
              </div>
            </div>
          )}

          <div className="card-bottom-accent-bar"></div>
        </div>
      </div>
    </div>
  );
});

export default IDCard;
