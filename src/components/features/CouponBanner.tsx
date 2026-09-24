import React, { useState, useEffect } from 'react';
import { Copy, Check, X, Gift } from 'lucide-react';
import { Language } from '../../types';
import { useToast } from '../../context/ToastContext';

interface CouponBannerProps {
  lang: Language;
}

export const CouponBanner: React.FC<CouponBannerProps> = ({ lang }) => {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const { copyToClipboard } = useToast();
  const isRtl = lang === 'he';

  const couponCode = 'DAYAR2026';

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('dayarplus_coupon_dismissed');
    if (!isDismissed) {
      // Show shortly after landing
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCopy = async () => {
    const successMsg = isRtl
      ? `קוד קופון ${couponCode} הועתק! קבלו 20% הנחה על המנוי.`
      : `Coupon code ${couponCode} copied! Enjoy 20% off your subscription.`;
    await copyToClipboard(couponCode, successMsg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem('dayarplus_coupon_dismissed', 'true');
  };

  if (!visible) return null;

  return (
    <div
      className="coupon-banner no-print"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 950,
        maxWidth: '560px',
        width: 'calc(100% - 32px)',
        background: 'linear-gradient(135deg, rgba(20, 24, 38, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(245, 158, 11, 0.45)',
        borderRadius: '16px',
        padding: '14px 18px',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6), 0 0 20px rgba(245, 158, 11, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        animation: 'toastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        direction: isRtl ? 'rtl' : 'ltr',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
          }}
        >
          <Gift size={20} />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff' }}>
              {isRtl ? 'הטבת השקה בלעדית לבניינים חדשים!' : 'Exclusive HOA Launch Offer!'}
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                background: 'rgba(245, 158, 11, 0.18)',
                color: '#fbbf24',
                border: '1px solid rgba(245, 158, 11, 0.3)',
              }}
            >
              20% OFF
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '2px' }}>
            {isRtl
              ? '20% הנחה לשנה שלמה בהזנת קוד קופון בהרשמה'
              : '20% off for 12 months with code at sign up'}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={handleCopy}
          className="btn-secondary"
          style={{
            padding: '8px 14px',
            fontSize: '0.85rem',
            fontWeight: 700,
            borderRadius: '10px',
            background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
            borderColor: copied ? 'rgba(52, 211, 153, 0.5)' : 'rgba(255, 255, 255, 0.15)',
            color: copied ? '#34d399' : '#ffffff',
            gap: '6px',
            whiteSpace: 'nowrap',
          }}
          title={isRtl ? 'העתק קוד קופון' : 'Copy promo code'}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? (isRtl ? 'הועתק!' : 'Copied!') : couponCode}</span>
        </button>

        <button
          onClick={handleDismiss}
          aria-label={isRtl ? 'סגור באנר' : 'Dismiss banner'}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#9ca3af',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            borderRadius: '6px',
          }}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
