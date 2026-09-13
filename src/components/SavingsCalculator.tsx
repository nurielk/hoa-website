import React, { useState } from 'react';
import { Language } from '../types';
import { Calculator, ArrowRight, ArrowLeft } from 'lucide-react';

interface SavingsCalculatorProps {
  lang: Language;
  calcData: any;
  onOpenDemoModal: () => void;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({
  lang,
  calcData,
  onOpenDemoModal,
}) => {
  const [apartments, setApartments] = useState<number>(36);
  const [dues, setDues] = useState<number>(450);

  const currencySymbol = lang === 'he' ? '₪' : '$';
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const monthlyPotential = apartments * dues;
  const recoveredMonthly = Math.round(monthlyPotential * 0.15);
  const hoursSaved = Math.max(6, Math.round(apartments * 0.45));
  const yearlyBenefit = (recoveredMonthly * 12) + (hoursSaved * 100 * 12);

  return (
    <section id="calculator" style={{ padding: '90px 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px' }}>
          <div className="badge-tag-amber" style={{ marginBottom: '16px' }}>
            <Calculator size={14} />
            <span>{lang === 'he' ? 'סימולטור חיסכון אינטראקטיבי' : 'Interactive ROI Calculator'}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '16px' }}>
            {calcData.title}
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#9ca3af' }}>{calcData.subtitle}</p>
        </div>

        {/* Calculator Main Box */}
        <div
          className="glass-panel"
          style={{
            padding: '40px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
            }}
          >
            {/* Sliders Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Slider 1: Apartments Count */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <label style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f3f4f6' }}>
                    {calcData.apartmentsLabel}
                  </label>
                  <span
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: '#60a5fa',
                      background: 'rgba(59, 130, 246, 0.15)',
                      padding: '2px 14px',
                      borderRadius: '8px',
                    }}
                  >
                    {apartments} {lang === 'he' ? 'דירות' : 'units'}
                  </span>
                </div>
                <input
                  id="calc-apartments-slider"
                  type="range"
                  min="6"
                  max="150"
                  step="2"
                  value={apartments}
                  onChange={(e) => setApartments(Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '4px',
                    outline: 'none',
                    accentColor: '#3b82f6',
                    cursor: 'pointer',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#6b7280', marginTop: '6px' }}>
                  <span>6</span>
                  <span>75</span>
                  <span>150+</span>
                </div>
              </div>

              {/* Slider 2: Monthly Dues */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <label style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f3f4f6' }}>
                    {calcData.duesLabel}
                  </label>
                  <span
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: '#34d399',
                      background: 'rgba(16, 185, 129, 0.15)',
                      padding: '2px 14px',
                      borderRadius: '8px',
                    }}
                  >
                    {currencySymbol}{dues}
                  </span>
                </div>
                <input
                  id="calc-dues-slider"
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={dues}
                  onChange={(e) => setDues(Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '4px',
                    outline: 'none',
                    accentColor: '#10b981',
                    cursor: 'pointer',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#6b7280', marginTop: '6px' }}>
                  <span>{currencySymbol}100</span>
                  <span>{currencySymbol}1,000</span>
                  <span>{currencySymbol}2,000</span>
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '0.9rem',
                  color: '#9ca3af',
                  lineHeight: 1.5,
                }}
              >
                💡 {lang === 'he' ? 'חישוב הרווחים מתבסס על נתוני הגבייה של 550+ בניינים ב-DayarPlus, עם שיפור ממוצע של 15%-25% בגבייה בזמן.' : 'ROI estimates based on live telemetry across 550+ DayarPlus buildings showing a 15-25% improvement in on-time dues.'}
              </div>
            </div>

            {/* Results Output Box */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(17, 24, 39, 0.8) 100%)',
                borderRadius: '16px',
                padding: '28px',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '20px' }}>
                  {calcData.resultsTitle}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '24px' }}>
                  {/* Metric 1 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.95rem', color: '#d1d5db' }}>{calcData.monthlyRevenue}</span>
                    <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f3f4f6' }}>
                      {currencySymbol}{monthlyPotential.toLocaleString()}
                    </span>
                  </div>

                  {/* Metric 2 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.95rem', color: '#34d399', fontWeight: 600 }}>
                      {calcData.recoveredRevenue}
                    </span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399' }}>
                      +{currencySymbol}{recoveredMonthly.toLocaleString()}
                    </span>
                  </div>

                  {/* Metric 3 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.95rem', color: '#fbbf24', fontWeight: 600 }}>
                      {calcData.hoursSaved}
                    </span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fbbf24' }}>
                      {hoursSaved} {lang === 'he' ? 'שעות/חודש' : 'hrs/mo'}
                    </span>
                  </div>
                </div>

                {/* Total Yearly Benefit Banner */}
                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    borderRadius: '12px',
                    padding: '16px',
                    textAlign: 'center',
                    marginBottom: '24px',
                  }}
                >
                  <span style={{ fontSize: '0.85rem', color: '#a7f3d0', display: 'block', marginBottom: '4px' }}>
                    {calcData.yearlySavings}
                  </span>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399' }}>
                    {currencySymbol}{yearlyBenefit.toLocaleString()}
                  </div>
                </div>
              </div>

              <button onClick={onOpenDemoModal} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <span>{lang === 'he' ? 'ממש את החיסכון בבניין שלך' : 'Unlock Savings For Your Building'}</span>
                <ArrowIcon size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
