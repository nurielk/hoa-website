import React, { useState } from 'react';
import { Language, AppMockupData, MockupTransaction } from '../types';
import {
  Sparkles,
  Building,
  CreditCard,
  Wrench,
  Zap,
  CheckCircle2,
  Vote,
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
  mockupData: AppMockupData;
  onOpenDemoModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  heroData,
  mockupData,
  onOpenDemoModal,
}) => {
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [activeTab, setActiveTab] = useState<'dues' | 'tickets' | 'voting'>('dues');

  return (
    <section style={{ padding: '60px 0 90px', position: 'relative' }}>
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '50px',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Main Hero Copy */}
          <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
            <div className="badge-tag" style={{ marginBottom: '20px' }}>
              <Sparkles size={14} />
              <span>{heroData.badge}</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: '20px',
                letterSpacing: '-0.02em',
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
                fontSize: '1.2rem',
                color: '#9ca3af',
                lineHeight: 1.6,
                marginBottom: '32px',
                maxWidth: '620px',
              }}
            >
              {heroData.subtitle}
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '36px',
              }}
            >
              <button
                id="hero-start-trial-btn"
                onClick={onOpenDemoModal}
                className="btn-primary"
              >
                <span>{lang === 'he' ? 'התחל ניסיון חינם ל-14 יום' : 'Start 14-Day Free Trial'}</span>
                <ArrowIcon size={18} />
              </button>

              <a
                href="#calculator"
                className="btn-secondary"
              >
                <Zap size={18} color="#f59e0b" />
                <span>{lang === 'he' ? 'מחשבון חיסכון לבניין' : 'Calculate Savings'}</span>
              </a>
            </div>

            {/* Highlights List */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {heroData.highlights.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#34d399" />
                  <span style={{ fontSize: '0.9rem', color: '#d1d5db', fontWeight: 600 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Live App Mockup Card */}
          <div style={{ position: 'relative' }}>
            <div
              className="glass-panel animate-float"
              style={{
                padding: '24px',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(59, 130, 246, 0.25)',
              }}
            >
              {/* Mockup Header Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '16px',
                  marginBottom: '20px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Building size={20} color="#3b82f6" />
                  <div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                      {mockupData.title}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{mockupData.month}</span>
                  </div>
                </div>
                <span className="badge-tag-emerald">{mockupData.collectionPercentage} גבייה</span>
              </div>

              {/* Mockup Quick Tabs */}
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  marginBottom: '20px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '4px',
                  borderRadius: '10px',
                }}
              >
                <button
                  onClick={() => setActiveTab('dues')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: activeTab === 'dues' ? 'var(--accent-blue)' : 'transparent',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <CreditCard size={14} />
                  <span>{lang === 'he' ? 'גביית ועד' : 'Dues'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('tickets')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: activeTab === 'tickets' ? 'var(--accent-blue)' : 'transparent',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Wrench size={14} />
                  <span>{lang === 'he' ? 'תקלות (2)' : 'Tickets (2)'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('voting')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: activeTab === 'voting' ? 'var(--accent-blue)' : 'transparent',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Vote size={14} />
                  <span>{lang === 'he' ? 'סקרים' : 'Votes'}</span>
                </button>
              </div>

              {/* Tab Content 1: Dues Tracker */}
              {activeTab === 'dues' && (
                <div>
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      padding: '16px',
                      borderRadius: '12px',
                      marginBottom: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
                        {lang === 'he' ? 'סה"כ נגבה החודש:' : 'Collected This Month:'}
                      </span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>
                        {mockupData.duesCollected}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div
                      style={{
                        height: '10px',
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '5px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: '100%',
                          background: 'linear-gradient(90deg, #34d399 0%, #10b981 100%)',
                          borderRadius: '5px',
                        }}
                      />
                    </div>
                  </div>

                  {/* Transactions Ticker */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {mockupData.recentTransactions.map((tx: MockupTransaction, idx: number) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          borderRadius: '10px',
                          fontSize: '0.88rem',
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 600, color: '#f3f4f6' }}>{tx.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{tx.time}</div>
                        </div>
                        <div style={{ textAlign: isRtl ? 'left' : 'right' }}>
                          <div
                            style={{
                              fontWeight: 700,
                              color: tx.amount.startsWith('-') ? '#f87171' : '#34d399',
                            }}
                          >
                            {tx.amount}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{tx.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab Content 2: Active Tickets */}
              {activeTab === 'tickets' && (
                <div style={{ padding: '10px 0' }}>
                  <div
                    style={{
                      background: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      padding: '16px',
                      borderRadius: '12px',
                      marginBottom: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <Wrench size={18} color="#fbbf24" />
                      <span style={{ fontWeight: 700, color: '#fef08a' }}>
                        {mockupData.activeTicketTitle}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#d1d5db', marginBottom: '8px' }}>
                      {mockupData.activeTicketStatus}
                    </p>
                    <span className="badge-tag-amber">{lang === 'he' ? 'בטיפול מול חברת חשמל/ספק' : 'Work Order Active'}</span>
                  </div>
                </div>
              )}

              {/* Tab Content 3: Active Voting */}
              {activeTab === 'voting' && (
                <div style={{ padding: '10px 0' }}>
                  <div
                    style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      padding: '16px',
                      borderRadius: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <Vote size={18} color="#60a5fa" />
                      <span style={{ fontWeight: 700, color: '#93c5fd' }}>
                        {mockupData.activeVoteTitle}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#d1d5db', marginBottom: '10px' }}>
                      {mockupData.activeVoteStatus}
                    </p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        style={{
                          flex: 1,
                          padding: '6px',
                          background: '#10b981',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {lang === 'he' ? 'בעד 👍' : 'YES 👍'}
                      </button>
                      <button
                        style={{
                          flex: 1,
                          padding: '6px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {lang === 'he' ? 'נגד 👎' : 'NO 👎'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
      `}</style>
    </section>
  );
};
