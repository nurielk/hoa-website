import React, { useState } from 'react';
import { Language, CalculatorData } from '../types';
import { Calculator, ArrowRight, ArrowLeft, RotateCcw, Copy, Check } from 'lucide-react';
import { ConfirmModal } from './features/ConfirmModal';
import { useToast } from '../context/ToastContext';

interface SavingsCalculatorProps {
  lang: Language;
  calcData: CalculatorData;
  onOpenDemoModal: () => void;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({
  lang,
  calcData,
  onOpenDemoModal,
}) => {
  const [apartments, setApartments] = useState<number>(36);
  const [dues, setDues] = useState<number>(450);
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { copyToClipboard } = useToast();
  const currencySymbol = lang === 'he' ? '₪' : '$';
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const monthlyPotential = apartments * dues;
  const recoveredMonthly = Math.round(monthlyPotential * 0.15);
  const hoursSaved = Math.max(6, Math.round(apartments * 0.45));
  const yearlyBenefit = (recoveredMonthly * 12) + (hoursSaved * 100 * 12);

  const handleResetConfirm = () => {
    setApartments(36);
    setDues(450);
  };

  const handleCopySummary = async () => {
    const text = isRtl
      ? `חישוב חיסכון ב-DayarPlus לבניין בן ${apartments} דירות:
• הכנסות ועד חודשיות: ${currencySymbol}${monthlyPotential.toLocaleString()}
• חיסכון באובדן גבייה: +${currencySymbol}${recoveredMonthly.toLocaleString()}/חודש
• שעות עבודה שנחסכות לוועד: ${hoursSaved} שעות/חודש
• תועלת שנתית כוללת מוערכת: ${currencySymbol}${yearlyBenefit.toLocaleString()}
לפרטים: https://dayarplus.co.il`
      : `DayarPlus Savings estimate for a ${apartments}-unit building:
• Monthly collected dues: ${currencySymbol}${monthlyPotential.toLocaleString()}
• Reduced bad debt recovery: +${currencySymbol}${recoveredMonthly.toLocaleString()}/mo
• HOA committee time saved: ${hoursSaved} hrs/mo
• Estimated total yearly benefit: ${currencySymbol}${yearlyBenefit.toLocaleString()}
Learn more: https://dayarplus.co.il`;

    await copyToClipboard(text, isRtl ? 'סיכום החישוב הועתק ללוח!' : 'Savings summary copied to clipboard!');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="calculator" style={{ padding: '90px 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
          <div className="badge-tag" style={{ marginBottom: '16px' }}>
            <Calculator size={14} />
            <span>ROI Calculator</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)' }}>
            {calcData.title}
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{calcData.subtitle}</p>
        </div>

        {/* Calculator Main Box */}
        <div
          className="glass-panel"
          style={{
            padding: '40px',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '24px',
            boxShadow: 'var(--shadow-card)',
            background: 'var(--bg-card)',
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
                  <label htmlFor="calc-apartments-slider" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
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
                  aria-label={calcData.apartmentsLabel}
                  aria-valuemin={6}
                  aria-valuemax={150}
                  aria-valuenow={apartments}
                  aria-valuetext={`${apartments} ${lang === 'he' ? 'דירות' : 'units'}`}
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
              </div>

              {/* Slider 2: Monthly Dues */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <label htmlFor="calc-dues-slider" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
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
                  max="2500"
                  step="50"
                  value={dues}
                  aria-label={calcData.duesLabel}
                  aria-valuemin={100}
                  aria-valuemax={2500}
                  aria-valuenow={dues}
                  aria-valuetext={`${currencySymbol}${dues}`}
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
              </div>

              {/* Utility Action Buttons: Reset & Copy */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsConfirmResetOpen(true)}
                  className="btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                  title={isRtl ? 'אפס מחשבון' : 'Reset calculator'}
                >
                  <RotateCcw size={14} />
                  <span>{isRtl ? 'איפוס ערכים' : 'Reset'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                  title={isRtl ? 'העתק תוצאות חישוב' : 'Copy summary'}
                >
                  {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                  <span>{copied ? (isRtl ? 'הועתק!' : 'Copied!') : (isRtl ? 'העתק חישוב' : 'Copy Results')}</span>
                </button>
              </div>
            </div>

            {/* Results Output Panel */}
            <div
              style={{
                background: 'var(--bg-glass)',
                borderRadius: '16px',
                padding: '28px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '20px' }}>
                  {calcData.resultsTitle}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '24px' }}>
                  {/* Metric 1 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{calcData.monthlyRevenue}</span>
                    <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
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

      {/* Feature 17: Confirm Reset Modal */}
      <ConfirmModal
        isOpen={isConfirmResetOpen}
        onClose={() => setIsConfirmResetOpen(false)}
        onConfirm={handleResetConfirm}
        title={isRtl ? 'איפוס נתוני מחשבון החיסכון' : 'Reset Calculator Values'}
        message={
          isRtl
            ? 'האם ברצונך לאפס את מספר הדירות וגובה דמי הוועד לערכי ברירת המחדל?'
            : 'Are you sure you want to reset the apartment count and dues to default values?'
        }
        confirmLabel={isRtl ? 'אפס נתונים' : 'Reset'}
        cancelLabel={isRtl ? 'ביטול' : 'Cancel'}
        type="warning"
        lang={lang}
      />
    </section>
  );
};
