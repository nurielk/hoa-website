import React from 'react';
import { FeatureItem } from '../types';
import {
  CreditCard,
  PieChart,
  Wrench,
  Vote,
  Gift,
  CalendarCheck,
  Check,
  Sparkles,
} from 'lucide-react';

interface FeatureGridProps {
  featuresData: {
    title: string;
    subtitle: string;
    items: FeatureItem[];
  };
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'CreditCard':
      return <CreditCard size={28} color="#60a5fa" />;
    case 'PieChart':
      return <PieChart size={28} color="#34d399" />;
    case 'Wrench':
      return <Wrench size={28} color="#fbbf24" />;
    case 'Vote':
      return <Vote size={28} color="#a78bfa" />;
    case 'Gift':
      return <Gift size={28} color="#f472b6" />;
    case 'CalendarCheck':
      return <CalendarCheck size={28} color="#38bdf8" />;
    default:
      return <Sparkles size={28} color="#60a5fa" />;
  }
};

export const FeatureGrid: React.FC<FeatureGridProps> = ({ featuresData }) => {
  return (
    <section id="features" style={{ padding: '90px 0', background: 'rgba(17, 24, 39, 0.4)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px' }}>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 800,
              marginBottom: '16px',
            }}
          >
            {featuresData.title}
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#9ca3af' }}>{featuresData.subtitle}</p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid-responsive-3">
          {featuresData.items.map((feature) => (
            <div
              key={feature.id}
              className="glass-panel"
              style={{
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Header with Icon & Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {getIcon(feature.iconName)}
                  </div>

                  {feature.badge && (
                    <span className="badge-tag">{feature.badge}</span>
                  )}
                </div>

                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '12px',
                  }}
                >
                  {feature.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.98rem',
                    color: '#9ca3af',
                    lineHeight: 1.6,
                    marginBottom: '24px',
                  }}
                >
                  {feature.description}
                </p>
              </div>

              {/* Benefits list */}
              <div
                style={{
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {feature.benefits.map((benefit, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={14} color="#3b82f6" />
                    <span style={{ fontSize: '0.88rem', color: '#d1d5db', fontWeight: 600 }}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
