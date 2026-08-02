import React, { useState } from 'react';
import { Language, TargetAudience } from '../types';
import { Building2, Building, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

interface SolutionsToggleProps {
  lang: Language;
  solutionsData: {
    title: string;
    subtitle: string;
    tabVaad: string;
    tabManagement: string;
    vaad: TargetAudience;
    management: TargetAudience;
  };
  onOpenDemoModal: () => void;
}

export const SolutionsToggle: React.FC<SolutionsToggleProps> = ({
  lang,
  solutionsData,
  onOpenDemoModal,
}) => {
  const [activeAudience, setActiveAudience] = useState<'vaad' | 'management'>('vaad');
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const currentAudience = activeAudience === 'vaad' ? solutionsData.vaad : solutionsData.management;

  return (
    <section id="solutions" style={{ padding: '90px 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 48px' }}>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 800,
              marginBottom: '16px',
            }}
          >
            {solutionsData.title}
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#9ca3af' }}>{solutionsData.subtitle}</p>
        </div>

        {/* Tab Switchers */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <button
            onClick={() => setActiveAudience('vaad')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
              borderRadius: '16px',
              border: activeAudience === 'vaad' ? '2px solid #3b82f6' : '1px solid rgba(255,255,255,0.1)',
              background: activeAudience === 'vaad' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.03)',
              color: activeAudience === 'vaad' ? '#ffffff' : '#9ca3af',
              fontWeight: 700,
              fontSize: '1.05rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <Building2 size={22} color={activeAudience === 'vaad' ? '#60a5fa' : '#9ca3af'} />
            <span>{solutionsData.tabVaad}</span>
          </button>

          <button
            onClick={() => setActiveAudience('management')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
              borderRadius: '16px',
              border: activeAudience === 'management' ? '2px solid #3b82f6' : '1px solid rgba(255,255,255,0.1)',
              background: activeAudience === 'management' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.03)',
              color: activeAudience === 'management' ? '#ffffff' : '#9ca3af',
              fontWeight: 700,
              fontSize: '1.05rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <Building size={22} color={activeAudience === 'management' ? '#60a5fa' : '#9ca3af'} />
            <span>{solutionsData.tabManagement}</span>
          </button>
        </div>

        {/* Tab Content Display Card */}
        <div
          className="glass-panel"
          style={{
            padding: '40px',
            border: '1px solid rgba(59, 130, 246, 0.25)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  marginBottom: '14px',
                  color: '#ffffff',
                }}
              >
                {currentAudience.title}
              </h3>

              <p
                style={{
                  fontSize: '1.05rem',
                  color: '#9ca3af',
                  marginBottom: '28px',
                  lineHeight: 1.6,
                }}
              >
                {currentAudience.subtitle}
              </p>

              <button onClick={onOpenDemoModal} className="btn-primary">
                <span>{currentAudience.ctaText}</span>
                <ArrowIcon size={18} />
              </button>
            </div>

            {/* Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {currentAudience.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    padding: '14px 18px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircle size={18} color="#34d399" />
                  </div>
                  <span style={{ fontSize: '0.98rem', color: '#e5e7eb', fontWeight: 600 }}>
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
