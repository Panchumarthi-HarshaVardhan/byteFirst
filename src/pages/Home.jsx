import React, { useEffect, useState } from 'react';
import LandingNavbar from '../components/landing/Navbar';
import LandingHero from '../components/landing/Hero';
import TrustSection from '../components/landing/TrustSection';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import SecuritySection from '../components/landing/SecuritySection';
import FinalCTA from '../components/landing/FinalCTA';
import LandingFooter from '../components/landing/Footer';
import '../components/landing/Landing.css';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 1. Dynamic Scroll Progress Bar
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. High-Performance IntersectionObserver for Scroll-Reveal Animations
    const revealSelectors = [
      '.trust-header',
      '.trust-card',
      '.landing-features-section .section-head-center',
      '.feature-tile',
      '.how-it-works-landing .section-head-center',
      '.flow-connecting-line',
      '.step-flow-card',
      '.security-narrative',
      '.security-point-item',
      '.stylized-scanner-card',
      '.final-cta-card'
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-in-view');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    // Give DOM a tick to ensure children are mounted
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll(revealSelectors.join(', '));
      elements.forEach((el) => observer.observe(el));
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="landing-page-root">
      {/* Dynamic Luminous Scroll Progress Indicator */}
      <div
        className="landing-scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* 1. Transparent / Blurred Sticky Navbar */}
      <LandingNavbar />

      <main>
        {/* 2 & 3. Dramatic Hero with 3D Digital ID Showcase */}
        <LandingHero />

        {/* 4. Trust & Benefits Section */}
        <TrustSection />

        {/* 5. 6-Feature Capabilities Section */}
        <Features />

        {/* 6. 3-Step Visual Journey with Connecting Line */}
        <HowItWorks />

        {/* 7. Factual Digital Security & Verification Section */}
        <SecuritySection />

        {/* 8. Conversion Final CTA */}
        <FinalCTA />
      </main>

      {/* 9. Brand Footer */}
      <LandingFooter />
    </div>
  );
}

