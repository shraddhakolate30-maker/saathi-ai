/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustIndicators from './components/TrustIndicators';
import SafetyCheckSection from './components/SafetyCheckSection';
import SafetyFeatures, { FeatureItem } from './components/SafetyFeatures';
import HowItWorks from './components/HowItWorks';
import MissionSection from './components/MissionSection';
import SupportSection from './components/SupportSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import {
  AuthModal,
  FeatureDetailModal,
  SafetyResourcesModal,
  ConfidentialReportingModal,
  MissionModal,
  PrivacyModal,
  ContactModal,
} from './components/Modals';
import ModelTransparencyModal from './components/ModelTransparencyModal';
import ConfidentialHelpRequestModal from './components/ConfidentialHelpRequestModal';
import HumanReviewDashboardModal from './components/HumanReviewDashboardModal';
import QuickExit from './components/QuickExit';

export default function App() {
  // Modal states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);
  const [safetyResourcesOpen, setSafetyResourcesOpen] = useState(false);
  const [confidentialReportingOpen, setConfidentialReportingOpen] = useState(false);
  const [helpRequestModalOpen, setHelpRequestModalOpen] = useState(false);
  const [reviewDashboardOpen, setReviewDashboardOpen] = useState(false);
  const [modelTransparencyOpen, setModelTransparencyOpen] = useState(false);
  const [missionModalOpen, setMissionModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Quick Safety Exit Handler
  const handleQuickExit = useCallback(() => {
    try {
      window.sessionStorage.clear();
    } catch {
      // ignore
    }
    window.location.replace('https://www.google.com/search?q=weather+today');
  }, []);

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleScrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6FC] text-[#301047] selection:bg-[#C8B5FF] selection:text-[#301047] relative">
      {/* 1. Header & Navigation */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onOpenSafetyResources={() => setSafetyResourcesOpen(true)}
        onQuickExit={handleQuickExit}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onExploreFeatures={() => handleScrollTo('#safety-check')}
          onGetSupport={() => handleScrollTo('#support')}
        />

        {/* 3. Trust Indicators */}
        <TrustIndicators />

        {/* 4. Live Core Feature: AI Safety Check */}
        <SafetyCheckSection
          onOpenHelplineModal={() => setSafetyResourcesOpen(true)}
          onOpenModelTransparency={() => setModelTransparencyOpen(true)}
          onQuickExit={handleQuickExit}
        />

        {/* 5. Safety Features Overview */}
        <SafetyFeatures
          onSelectFeature={(feat) => setSelectedFeature(feat)}
          onLaunchSafetyCheck={() => handleScrollTo('#safety-check')}
          onOpenHelpRequest={() => setHelpRequestModalOpen(true)}
          onOpenReviewDashboard={() => setReviewDashboardOpen(true)}
          onOpenSafetyResources={() => setSafetyResourcesOpen(true)}
        />

        {/* 6. How It Works Timeline */}
        <HowItWorks />

        {/* 7. Mission Section */}
        <MissionSection onOpenMissionModal={() => setMissionModalOpen(true)} />

        {/* 8. Support Section */}
        <SupportSection
          onOpenSafetyResources={() => setSafetyResourcesOpen(true)}
          onOpenConfidentialReporting={() => setHelpRequestModalOpen(true)}
        />

        {/* 9. About Us */}
        <AboutSection />
      </main>

      {/* 10. Footer */}
      <Footer
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
        onOpenModelTransparency={() => setModelTransparencyOpen(true)}
        onOpenReviewDashboard={() => setReviewDashboardOpen(true)}
        onQuickExit={handleQuickExit}
      />

      {/* 11. Persistent Quick Safety Exit Button */}
      <QuickExit onTrigger={handleQuickExit} />

      {/* Modals & Dialogs */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
      />

      <FeatureDetailModal
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />

      <SafetyResourcesModal
        isOpen={safetyResourcesOpen}
        onClose={() => setSafetyResourcesOpen(false)}
        onQuickExit={handleQuickExit}
      />

      <ConfidentialReportingModal
        isOpen={confidentialReportingOpen}
        onClose={() => setConfidentialReportingOpen(false)}
      />

      <ConfidentialHelpRequestModal
        isOpen={helpRequestModalOpen}
        onClose={() => setHelpRequestModalOpen(false)}
        onOpenHelplines={() => {
          setHelpRequestModalOpen(false);
          setSafetyResourcesOpen(true);
        }}
      />

      <HumanReviewDashboardModal
        isOpen={reviewDashboardOpen}
        onClose={() => setReviewDashboardOpen(false)}
      />

      <ModelTransparencyModal
        isOpen={modelTransparencyOpen}
        onClose={() => setModelTransparencyOpen(false)}
      />

      <MissionModal
        isOpen={missionModalOpen}
        onClose={() => setMissionModalOpen(false)}
      />

      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}
