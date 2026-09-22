import React, { useState } from 'react';
import { CreditCard, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Create ID', href: '#generator' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <a href="#home" className="brand-logo" onClick={(e) => handleLinkClick(e, '#home')}>
          <div className="logo-icon-wrap">
            <CreditCard className="logo-icon" size={22} />
          </div>
          <span className="brand-text">
            Digital<span className="brand-accent">ID</span>
          </span>
          <span className="brand-tag">v1.0</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="nav-link"
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Action Button */}
        <div className="navbar-actions">
          <a
            href="#generator"
            className="btn btn-primary btn-sm nav-cta"
            onClick={(e) => handleLinkClick(e, '#generator')}
          >
            <Sparkles size={16} />
            <span>Create Your ID</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mobile-cta-item">
              <a
                href="#generator"
                className="btn btn-primary btn-block"
                onClick={(e) => handleLinkClick(e, '#generator')}
              >
                <Sparkles size={16} />
                <span>Create Your ID</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
