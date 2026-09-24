import React, { useState, useEffect } from 'react';
import { Sparkles, Phone, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { Language } from '../../types';

interface TopAnnouncementBarProps {
  lang: Language;
  onOpenDemo: () => void;
}

export const TopAnnouncementBar: React.FC<TopAnnouncementBarProps> = ({
  lang,
  onOpenDemo,
}) => {
  const [visible, setVisible] = useState(true);
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('dayarplus_announcement_dismissed');
    if (isDismissed === 'true') {
      setVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem('dayarplus_announcement_dismissed', 'true');
  };

  if (!visible) return null;

  return (
    <aside
      className="top-announcement-bar"
      role="banner"
      aria-label={isRtl ? 'הודעת מערכת חשובה' : 'Important system notice'}
      style={{
        background: 'linear-gradient(90deg, #1e3a8a 0%, #2563eb 50%, #0284c7 100%)',
        color: '#ffffff',
        padding: '8px 16px',
        fontSize: '0.85rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 110,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          textAlign: 'center',
          padding: '0 30px',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={15} color="#fde047" />
          <span>
            {isRtl
              ? 'מבצע שנת 2026: חודשיים חינם + ליווי אישי בהקמת הבניין!'
              : '2026 Special Offer: 2 months free + dedicated onboarding for new HOAs!'}
          </span>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onOpenDemo}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              color: '#ffffff',
              padding: '3px 10px',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
          >
            <span>{isRtl ? 'לפרטים והצטרפות' : 'Claim Offer'}</span>
            <ArrowIcon size={12} />
          </button>

          <a
            href="tel:0771234567"
            style={{
              color: '#fef08a',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.8rem',
              marginLeft: '8px',
            }}
          >
            <Phone size={12} />
            <span>077-1234567</span>
          </a>
        </div>
      </div>

      <button
        onClick={handleDismiss}
        aria-label={isRtl ? 'סגור הודעה' : 'Close announcement'}
        style={{
          position: 'absolute',
          left: isRtl ? '12px' : 'auto',
          right: isRtl ? 'auto' : '12px',
          background: 'none',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.8)',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '4px',
        }}
      >
        <X size={16} />
      </button>
    </aside>
  );
};
