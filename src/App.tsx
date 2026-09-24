import React, { useState, useEffect, Suspense } from 'react';
import { Language } from './types';
import { contentData } from './data/contentData';

import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { initUtmTracker } from './utils/utmTracker';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { SolutionsToggle } from './components/SolutionsToggle';
import { FeatureGrid } from './components/FeatureGrid';
import { SavingsCalculator } from './components/SavingsCalculator';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

// 22 Requested Feature Components
import { TopAnnouncementBar } from './components/features/TopAnnouncementBar';
import { ScrollProgressBar } from './components/features/ScrollProgressBar';
import { BackToTop } from './components/features/BackToTop';
import { GlobalSearchModal } from './components/features/GlobalSearchModal';
import { FloatingContactHub } from './components/features/FloatingContactHub';
import { AnnouncementsSection } from './components/features/AnnouncementsSection';
import { CouponBanner } from './components/features/CouponBanner';
import { CookieConsentBanner } from './components/features/CookieConsentBanner';

// Code-Splitting: Lazy load heavy interactive modals, dashboard, and 404
const ContactModal = React.lazy(() =>
  import('./components/ContactModal').then((m) => ({ default: m.ContactModal }))
);
const LoginModal = React.lazy(() =>
  import('./components/LoginModal').then((m) => ({ default: m.LoginModal }))
);
const AppPortalDashboard = React.lazy(() =>
  import('./components/AppPortalDashboard').then((m) => ({ default: m.AppPortalDashboard }))
);
const NotFoundPage = React.lazy(() =>
  import('./components/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

export const AppContent: React.FC = () => {
  const [lang, setLang] = useState<Language>('he');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [is404, setIs404] = useState<boolean>(false);
  const [userSession, setUserSession] = useState<{
    userRole: 'resident' | 'vaad' | 'management';
    buildingName: string;
  } | null>(null);

  const currentContent = contentData[lang];
  const isRtl = lang === 'he';

  // Feature 20: Initialize UTM tracker on page mount
  useEffect(() => {
    initUtmTracker();
  }, []);

  // Check URL pathname for 404 detection
  useEffect(() => {
    const path = window.location.pathname;
    if (path !== '/' && path !== '' && path !== '/index.html') {
      setIs404(true);
    }
  }, []);

  // Global Ctrl+K / Cmd+K search shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.title = currentContent.siteTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    const descriptionText =
      lang === 'he'
        ? 'DayarPlus – האפליקציה המתקדמת לניהול הבניין, ניהול גבייה ותשלומים באשראי, מעקב פיננסי, תקלות, ספקים ותקשורת עם הדיירים – הכל במקום אחד.'
        : 'DayarPlus – The smart, simple & secure cloud platform for building management, HOA dues collection, financial accounting, maintenance dispatch, and tenant communication.';

    if (metaDescription) {
      metaDescription.setAttribute('content', descriptionText);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descriptionText;
      document.head.appendChild(meta);
    }
  }, [lang, currentContent.siteTitle, isRtl]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'he' ? 'en' : 'he'));
  };

  const handleGoHome = () => {
    window.history.pushState(null, '', '/');
    setIs404(false);
  };

  // If 404 path is accessed
  if (is404) {
    return (
      <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }} />}>
        <NotFoundPage lang={lang} onGoHome={handleGoHome} />
      </Suspense>
    );
  }

  // If logged in to Portal Dashboard
  if (userSession) {
    return (
      <div dir={isRtl ? 'rtl' : 'ltr'}>
        <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }} />}>
          <AppPortalDashboard
            lang={lang}
            userRole={userSession.userRole}
            buildingName={userSession.buildingName}
            onLogout={() => setUserSession(null)}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        background: 'var(--bg-primary)',
        color: 'var(--text-main)',
      }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Feature 9: Accessible Skip to Content Link */}
      <a href="#main-content" className="skip-to-content">
        {isRtl ? 'דלג לתוכן המרכזי' : 'Skip to main content'}
      </a>

      {/* Feature 5: Smooth Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Feature 2: Slim Top Announcement Bar */}
      <TopAnnouncementBar
        lang={lang}
        onOpenDemo={() => setIsDemoModalOpen(true)}
      />

      {/* Navigation Header (Feature 1: Dark Mode, Feature 2: Slim Header, Feature 3: Mobile Menu, Feature 8: Search Trigger) */}
      <Navbar
        lang={lang}
        onLanguageToggle={toggleLanguage}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        navItems={currentContent.nav}
        buttons={currentContent.buttons}
      />

      {/* Main Content Landmark */}
      <main id="main-content" tabIndex={-1} style={{ flex: 1, outline: 'none' }}>
        {/* 1. Hero Section with Interactive Live App Preview */}
        <HeroSection
          lang={lang}
          heroData={currentContent.hero}
          mockupData={currentContent.appMockup}
          onOpenDemoModal={() => setIsDemoModalOpen(true)}
        />

        {/* 2. Key Impact Statistics Banner */}
        <StatsSection stats={currentContent.hero.stats} />

        {/* 3. Target Audience Segment Toggle (Vaad Bayit vs Management Co) */}
        <SolutionsToggle
          lang={lang}
          solutionsData={currentContent.solutions}
          onOpenDemoModal={() => setIsDemoModalOpen(true)}
        />

        {/* 4. Complete Product Feature Grid */}
        <FeatureGrid featuresData={currentContent.features} />

        {/* 5. Interactive ROI & Time Savings Calculator (Feature 17: Confirm modal, Feature 21: Copy summary) */}
        <SavingsCalculator
          lang={lang}
          calcData={currentContent.calculator}
          onOpenDemoModal={() => setIsDemoModalOpen(true)}
        />

        {/* 6. Transparent Tier Pricing & Plan Comparison (Feature 19: Print routine, Feature 22: Last updated badge) */}
        <PricingSection
          lang={lang}
          pricingData={currentContent.pricing}
          onOpenDemoModal={() => setIsDemoModalOpen(true)}
        />

        {/* 7. Customer Reviews & Social Proof */}
        <TestimonialsSection testimonialsData={currentContent.testimonials} />

        {/* 8. System Announcements & Bulletins Section (Feature 12) */}
        <AnnouncementsSection lang={lang} />

        {/* 9. Frequently Asked Questions (Feature 11: FAQ Accordion with Categories & Search) */}
        <FaqSection faqData={currentContent.faq} lang={lang} />
      </main>

      {/* 10. Footer (Feature 13: Newsletter, Feature 14: Interactive Counter, Feature 19: Print Routine, Feature 21: Copy Phone/Email, Feature 22: Last Updated) */}
      <Footer
        lang={lang}
        footerData={currentContent.footer}
        buttons={currentContent.buttons}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
      />

      {/* Feature 6: Back to Top Button */}
      <BackToTop lang={lang} />

      {/* Feature 10: Multi-Channel Floating Contact Hub */}
      <FloatingContactHub
        lang={lang}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
      />

      {/* Feature 15: Promotional Coupon Banner */}
      <CouponBanner lang={lang} />

      {/* Feature 16: Cookie Consent Banner & Badge */}
      <CookieConsentBanner lang={lang} />

      {/* Feature 8: Global Live Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        lang={lang}
      />

      {/* Feature 20: Lead Capture Demo Modal with UTM Tracker */}
      {isDemoModalOpen && (
        <Suspense fallback={null}>
          <ContactModal
            isOpen={isDemoModalOpen}
            onClose={() => setIsDemoModalOpen(false)}
            lang={lang}
            modalData={currentContent.modal}
            buttons={currentContent.buttons}
          />
        </Suspense>
      )}

      {/* Secure Login Modal */}
      {isLoginModalOpen && (
        <Suspense fallback={null}>
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            lang={lang}
            onLoginSuccess={(role, buildingName) => {
              setUserSession({ userRole: role, buildingName });
              setIsLoginModalOpen(false);
            }}
          />
        </Suspense>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
