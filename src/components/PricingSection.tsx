import React, { useState } from 'react';
import { Language, PricingPlan } from '../types';
import { Check } from 'lucide-react';

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

  return (
    <section id="pricing" style={{ padding: '90px 0', background: 'rgba(17, 24, 39, 0.4)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '16px' }}>
            {pricingData.title}
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#9ca3af' }}>{pricingData.subtitle}</p>
        </div>

        {/* Monthly / Yearly Billing Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '50px',
          }}
        >
          <span
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: !isYearly ? '#ffffff' : '#9ca3af',
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
              width: '60px',
              height: '32px',
              borderRadius: '16px',
              background: isYearly ? '#3b82f6' : 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              padding: '4px',
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
              fontSize: '1rem',
              fontWeight: 700,
              color: isYearly ? '#34d399' : '#9ca3af',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {pricingData.yearly}
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid-responsive-3">
          {pricingData.plans.map((plan) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                className="glass-panel"
                style={{
                  padding: '36px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  border: plan.isPopular
                    ? '2px solid #3b82f6'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  background: plan.isPopular
                    ? 'linear-gradient(180deg, rgba(30, 58, 138, 0.3) 0%, rgba(17, 24, 39, 0.8) 100%)'
                    : 'var(--bg-card)',
                  boxShadow: plan.isPopular ? '0 0 30px rgba(59, 130, 246, 0.25)' : 'none',
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
                    ⭐ {lang === 'he' ? 'המסלול מומלץ לועד בית' : 'MOST POPULAR'}
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                    {plan.name}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '24px', height: '40px' }}>
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div style={{ marginBottom: '28px' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff' }}>
                      {price}
                    </span>
                    {price.includes('₪') || price.includes('$') ? (
                      <span style={{ fontSize: '0.9rem', color: '#9ca3af', marginInlineStart: '6px' }}>
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
                          <Check size={12} color={plan.isPopular ? '#60a5fa' : '#34d399'} />
                        </div>
                        <span style={{ fontSize: '0.92rem', color: '#d1d5db' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onOpenDemoModal}
                  className={plan.isPopular ? 'btn-primary' : 'btn-secondary'}
                  style={{ width: '100%', justifyContent: 'center' }}
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
