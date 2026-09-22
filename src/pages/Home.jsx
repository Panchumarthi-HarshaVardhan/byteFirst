import React from 'react';
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
  return (
    <div className="landing-page-root">
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
