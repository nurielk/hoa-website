import React from 'react';
import { Language, AppMockupData } from '../types';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
  heroData: {
    badge: string;
    title: string;
    subtitle: string;
    highlights: string[];
  };
  mockupData?: AppMockupData;
  onOpenDemoModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  heroData,
  onOpenDemoModal,
}) => {
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section style={{ padding: '70px 0 60px', position: 'relative' }}>
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '75%',
          height: '520px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.16) 0%, rgba(139, 92, 246, 0.06) 50%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '960px' }}>
        {/* Main Hero Copy - Centered & Highly Impactful */}
        <div style={{ textAlign: 'center', margin: '0 auto' }}>
          <div className="badge-tag" style={{ marginBottom: '20px', padding: '6px 16px' }}>
            <Sparkles size={15} />
            <span>{heroData.badge}</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: '24px',
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
            }}
          >
            {heroData.title.split(' ').map((word, idx) => {
              if (word.includes('החכמה') || word.includes('Smart') || word.includes('הפשוטה') || word.includes('Simple')) {
                return (
                  <span key={idx} className="text-gradient">
                    {word}{' '}
                  </span>
                );
              }
              return word + ' ';
            })}
          </h1>

          <p
            style={{
              fontSize: '1.25rem',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              marginBottom: '36px',
              maxWidth: '750px',
              margin: '0 auto 36px',
            }}
          >
            {heroData.subtitle}
          </p>

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '16px',
              marginBottom: '40px',
            }}
          >
            <button
              id="hero-start-trial-btn"
              onClick={onOpenDemoModal}
              className="btn-primary"
              style={{ padding: '14px 32px', fontSize: '1.05rem' }}
            >
              <span>{lang === 'he' ? 'התחל ניסיון חינם ל-14 יום' : 'Start 14-Day Free Trial'}</span>
              <ArrowIcon size={18} />
            </button>

            <a
              href="#features"
              className="btn-secondary"
              style={{ padding: '14px 28px', fontSize: '1.05rem' }}
            >
              <Zap size={18} color="#3b82f6" />
              <span>{lang === 'he' ? 'צפייה בכל התכונות' : 'Explore All Features'}</span>
            </a>
          </div>

          {/* Highlights List Banner */}
          <div
            className="glass-panel"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              padding: '18px 24px',
              borderRadius: '16px',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {heroData.highlights.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} color="#34d399" />
                <span style={{ fontSize: '0.92rem', color: 'var(--text-main)', fontWeight: 600 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
