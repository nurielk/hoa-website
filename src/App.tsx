import React, { useState, useEffect } from 'react';
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
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('he');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);

  const currentContent = contentData[lang];
  const isRtl = lang === 'he';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.title = currentContent.siteTitle;
  }, [lang, currentContent.siteTitle, isRtl]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'he' ? 'en' : 'he'));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Navigation Header */}
      <Navbar
        lang={lang}
        onLanguageToggle={toggleLanguage}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        onOpenLoginModal={() => {
          window.open('http://localhost:5174', '_blank');
        }}
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

        {/* 8. Frequently Asked Questions (FAQ Accordion) */}
        <FaqSection faqData={currentContent.faq} />
      </main>

      {/* 9. Footer & Accessibility links */}
      <Footer
        lang={lang}
        footerData={currentContent.footer}
        buttons={currentContent.buttons}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
      />

      {/* 10. Lead Capture Demo Modal */}
      <ContactModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        lang={lang}
        modalData={currentContent.modal}
        buttons={currentContent.buttons}
      />
    </div>
  );
};

export default App;
