import React, { useState, useEffect, Suspense } from 'react';
import { Language } from './types';
import { contentData } from './data/contentData';

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
import { WhatsAppWidget } from './components/WhatsAppWidget';

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

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('he');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [is404, setIs404] = useState<boolean>(false);
  const [userSession, setUserSession] = useState<{
    userRole: 'resident' | 'vaad' | 'management';
    buildingName: string;
  } | null>(null);

  const currentContent = contentData[lang];
  const isRtl = lang === 'he';

  // Check URL pathname for 404 detection
  useEffect(() => {
    const path = window.location.pathname;
    if (path !== '/' && path !== '' && path !== '/index.html') {
      setIs404(true);
    }
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
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0b0f19' }} />}>
        <NotFoundPage lang={lang} onGoHome={handleGoHome} />
      </Suspense>
    );
  }

  // If logged in to Portal Dashboard
  if (userSession) {
    return (
      <div dir={isRtl ? 'rtl' : 'ltr'}>
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0b0f19' }} />}>
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Navigation Header */}
      <Navbar
        lang={lang}
        onLanguageToggle={toggleLanguage}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        navItems={currentContent.nav}
        buttons={currentContent.buttons}
      />

      <main style={{ flex: 1 }}>
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

        {/* 5. Interactive ROI & Time Savings Calculator */}
        <SavingsCalculator
          lang={lang}
          calcData={currentContent.calculator}
          onOpenDemoModal={() => setIsDemoModalOpen(true)}
        />

        {/* 6. Transparent Tier Pricing & Plan Comparison */}
        <PricingSection
          lang={lang}
          pricingData={currentContent.pricing}
          onOpenDemoModal={() => setIsDemoModalOpen(true)}
        />

        {/* 7. Customer Reviews & Social Proof */}
        <TestimonialsSection testimonialsData={currentContent.testimonials} />

        {/* 8. Frequently Asked Questions (FAQ Accordion with Dynamic Search) */}
        <FaqSection faqData={currentContent.faq} />
      </main>

      {/* 9. Footer & Accessibility links */}
      <Footer
        lang={lang}
        footerData={currentContent.footer}
        buttons={currentContent.buttons}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
      />

      {/* 10. WhatsApp Quick Chat Floating Widget */}
      <WhatsAppWidget lang={lang} />

      {/* 11. Lazy Loaded Lead Capture Demo Modal */}
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

      {/* 12. Lazy Loaded Secure Login Modal */}
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

export default App;
