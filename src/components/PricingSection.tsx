import React, { useState } from 'react';
import { Language, PricingPlan } from '../types';
import { Check, Printer, ShieldCheck } from 'lucide-react';
import { LastUpdatedBadge } from './features/LastUpdatedBadge';

interface PricingSectionProps {
  lang: Language;
  pricingData: {
    title: string;
    subtitle: string;
    monthly: string;
    yearly: string;
    plans: PricingPlan[];
  };
  onOpenDemoModal: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  lang,
  pricingData,
  onOpenDemoModal,
}) => {
  const [isYearly, setIsYearly] = useState<boolean>(true);
  const isRtl = lang === 'he';

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="pricing" style={{ padding: '90px 0', background: 'var(--bg-glass)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 30px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div className="badge-tag">
              <ShieldCheck size={14} />
              <span>{isRtl ? 'מחירים שקופים' : 'Transparent Pricing'}</span>
            </div>
            <LastUpdatedBadge lang={lang} prefix={isRtl ? 'מחירון בתוקף:' : 'Valid as of:'} />
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)' }}>
            {pricingData.title}
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{pricingData.subtitle}</p>
        </div>

        {/* Controls: Monthly / Yearly Billing Toggle + Print Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '50px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <span
              style={{
                fontSize: '0.95rem',
                fontWeight: 600,
                color: !isYearly ? 'var(--text-main)' : 'var(--text-muted)',
              }}
            >
              {pricingData.monthly}
            </span>

            <button
              type="button"
              role="switch"
              aria-checked={isYearly}
              aria-label={lang === 'he' ? 'החלף למסלול שנתי מוזל' : 'Toggle yearly billing discount'}
              onClick={() => setIsYearly(!isYearly)}
              style={{
                width: '56px',
                height: '30px',
                borderRadius: '15px',
                background: isYearly ? '#3b82f6' : 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                padding: '3px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isYearly ? 'flex-end' : 'flex-start',
                transition: 'all 0.3s ease',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                }}
              />
            </button>

            <span
              style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: isYearly ? '#34d399' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {pricingData.yearly}
            </span>
          </div>

          {/* Feature 19: Print Routine Button */}
          <button
            onClick={handlePrint}
            className="btn-secondary print-allow"
            style={{
              padding: '7px 16px',
              fontSize: '0.85rem',
              borderRadius: '9999px',
            }}
            title={isRtl ? 'הדפס מחירון / שמור כ-PDF' : 'Print pricing table'}
          >
            <Printer size={15} />
            <span>{isRtl ? 'הדפס מחירון' : 'Print Pricing'}</span>
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid-responsive-3">
          {pricingData.plans.map((plan) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                className="glass-panel hover-card-lift"
                style={{
                  padding: '36px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  border: plan.isPopular
                    ? '2px solid #3b82f6'
                    : '1px solid var(--border-subtle)',
                  background: plan.isPopular
                    ? 'linear-gradient(180deg, rgba(30, 58, 138, 0.3) 0%, var(--bg-card) 100%)'
                    : 'var(--bg-card)',
                  boxShadow: plan.isPopular ? '0 0 35px rgba(59, 130, 246, 0.25)' : 'var(--shadow-card)',
                }}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-16px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      color: '#ffffff',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      padding: '4px 16px',
                      borderRadius: '9999px',
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
                    }}
                  >
                    ⭐ {lang === 'he' ? 'המסלול המומלץ לועד בית' : 'MOST POPULAR'}
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
                    {plan.name}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px', height: '40px' }}>
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div style={{ marginBottom: '28px' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {price}
                    </span>
                    {price.includes('₪') || price.includes('$') ? (
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginInlineStart: '6px' }}>
                        /{lang === 'he' ? 'חודש' : 'month'}
                      </span>
                    ) : null}
                  </div>

                  {/* Features List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: plan.isPopular ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Check size={12} color="#34d399" />
                        </div>
                        <span style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Action CTA */}
                <button
                  onClick={onOpenDemoModal}
                  className={plan.isPopular ? 'btn-primary' : 'btn-secondary'}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '12px 24px',
                    fontSize: '1rem',
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
