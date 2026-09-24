import React, { useState, useEffect, Suspense } from 'react';
import { Language } from './types';
import { contentData } from './data/contentData';

import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { initUtmTracker } from './utils/utmTracker';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeatureGrid } from './components/FeatureGrid';
import { StatsSection } from './components/StatsSection';
import { SolutionsToggle } from './components/SolutionsToggle';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

// Requested Feature Components
import { TopAnnouncementBar } from './components/features/TopAnnouncementBar';
import { ScrollProgressBar } from './components/features/ScrollProgressBar';
import { BackToTop } from './components/features/BackToTop';
import { GlobalSearchModal } from './components/features/GlobalSearchModal';
import { FloatingContactHub } from './components/features/FloatingContactHub';
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
const CheckoutModal = React.lazy(() =>
  import('./components/CheckoutModal').then((m) => ({ default: m.CheckoutModal }))
);
import { PlanTier, SubscriptionType, BillingCycle } from './services/provisioningService';

export const AppContent: React.FC = () => {
  const [lang, setLang] = useState<Language>('he');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [checkoutPlanTier, setCheckoutPlanTier] = useState<PlanTier>('PRO');
  const [checkoutSubType, setCheckoutSubType] = useState<SubscriptionType>('TRIAL');
  const [checkoutBillingCycle, setCheckoutBillingCycle] = useState<BillingCycle>('MONTHLY');
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

  // Check URL pathname for onboarding token / dashboard direct access or 404 detection
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const building = urlParams.get('building');
    const onboard = urlParams.get('onboard');
    const path = window.location.pathname;

    // Seamless handoff: If redirected to /onboard or has token/building params, load dashboard directly
    if (token || onboard || path.includes('/onboard') || path.includes('/dashboard')) {
      const resolvedBuilding = building
        ? (isRtl ? `בניין #${building}` : `Building #${building}`)
        : (isRtl ? 'בניין מגורים חדש' : 'New Residential Building');
      setUserSession({
        userRole: 'vaad',
        buildingName: resolvedBuilding,
      });
      // Replace URL without reload so browser history stays clean
      window.history.replaceState(null, '', '/');
      setIs404(false);
      return;
    }

    if (path !== '/' && path !== '' && path !== '/index.html') {
      setIs404(true);
    }
  }, [isRtl]);

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

  const handleOpenCheckout = (
    tier: PlanTier = 'PRO',
    subType: SubscriptionType = 'TRIAL',
    cycle: BillingCycle = 'MONTHLY'
  ) => {
    setCheckoutPlanTier(tier);
    setCheckoutSubType(subType);
    setCheckoutBillingCycle(cycle);
    setIsCheckoutModalOpen(true);
  };

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
        onOpenDemo={() => handleOpenCheckout('PRO', 'TRIAL', 'MONTHLY')}
      />

      {/* Navigation Header (Feature 1: Dark Mode, Feature 2: Slim Header, Feature 3: Mobile Menu, Feature 8: Search Trigger) */}
      <Navbar
        lang={lang}
        onLanguageToggle={toggleLanguage}
        onOpenDemoModal={() => handleOpenCheckout('PRO', 'TRIAL', 'MONTHLY')}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        navItems={currentContent.nav}
        buttons={currentContent.buttons}
      />

      {/* Main Content Landmark */}
      <main id="main-content" tabIndex={-1} style={{ flex: 1, outline: 'none' }}>
        {/* 1. Hero Section */}
        <HeroSection
          lang={lang}
          heroData={currentContent.hero}
          onOpenDemoModal={() => handleOpenCheckout('PRO', 'TRIAL', 'MONTHLY')}
        />

        {/* 2. Complete Product Feature Grid ("כל מה שהבניין שלך צריך - במקום אחד") - Moved ABOVE StatsSection per user request */}
        <FeatureGrid featuresData={currentContent.features} />

        {/* 3. Key Impact Statistics Banner (550+ בניינים, 99.2% גבייה, 18h שעות שנחסכו, 4.9/5) */}
        <StatsSection stats={currentContent.hero.stats} />

        {/* 4. Target Audience Segment Toggle (Vaad Bayit vs Management Co) */}
        <SolutionsToggle
          lang={lang}
          solutionsData={currentContent.solutions}
          onOpenDemoModal={() => setIsDemoModalOpen(true)}
        />

        {/* 5. Transparent Tier Pricing & Plan Comparison with 30-Day Free Trial & Immediate Paid options */}
        <PricingSection
          lang={lang}
          pricingData={currentContent.pricing}
          onOpenDemoModal={() => setIsDemoModalOpen(true)}
          onOpenCheckoutModal={handleOpenCheckout}
        />

        {/* 6. Customer Reviews & Social Proof */}
        <TestimonialsSection testimonialsData={currentContent.testimonials} />

        {/* 7. Frequently Asked Questions (Feature 11: FAQ Accordion with Categories & Search) */}
        <FaqSection faqData={currentContent.faq} lang={lang} />
      </main>

      {/* 8. Footer (Feature 14: Interactive Counter, Feature 19: Print Routine, Feature 21: Copy Phone/Email, Feature 22: Last Updated) */}
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

      {/* Automated Checkout & User Provisioning Modal */}
      {isCheckoutModalOpen && (
        <Suspense fallback={null}>
          <CheckoutModal
            isOpen={isCheckoutModalOpen}
            onClose={() => setIsCheckoutModalOpen(false)}
            lang={lang}
            initialPlanTier={checkoutPlanTier}
            initialSubscriptionType={checkoutSubType}
            initialBillingCycle={checkoutBillingCycle}
            onEnterDashboard={(role, buildingName) => {
              setUserSession({
                userRole: role,
                buildingName: buildingName || (isRtl ? 'בניין מגורים חדש' : 'New Residential Building'),
              });
              setIsCheckoutModalOpen(false);
            }}
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
