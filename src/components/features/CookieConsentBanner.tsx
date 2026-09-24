import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Check, Settings2, X } from 'lucide-react';
import { Language } from '../../types';

interface CookieConsentBannerProps {
  lang: Language;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ lang }) => {
  const [consentGiven, setConsentGiven] = useState(true); // default true until checked
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);
  const isRtl = lang === 'he';

  useEffect(() => {
    const saved = localStorage.getItem('dayarplus_cookie_consent');
    if (!saved) {
      setConsentGiven(false);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      'dayarplus_cookie_consent',
      JSON.stringify({ essential: true, analytics: true, timestamp: Date.now() })
    );
    setConsentGiven(true);
    setShowSettings(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem(
      'dayarplus_cookie_consent',
      JSON.stringify({ essential: true, analytics: false, timestamp: Date.now() })
    );
    setConsentGiven(true);
    setShowSettings(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem(
      'dayarplus_cookie_consent',
      JSON.stringify({ essential: true, analytics: analyticsAllowed, timestamp: Date.now() })
    );
    setConsentGiven(true);
    setShowSettings(false);
  };

  return (
    <>
      {/* Floating Discrete Cookie Badge to reopen settings anytime */}
      {consentGiven && !showSettings && (
        <button
          onClick={() => setShowSettings(true)}
          className="cookie-badge no-print"
          title={isRtl ? 'הגדרות פרטיות ועוגיות' : 'Cookie Preferences'}
          aria-label={isRtl ? 'הגדרות פרטיות ועוגיות' : 'Cookie Preferences'}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: isRtl ? 'auto' : '150px',
            left: isRtl ? '150px' : 'auto',
            zIndex: 970,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            color: '#fbbf24',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(8px)',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Cookie size={18} />
        </button>
      )}

      {/* Main Cookie Consent Banner */}
      {!consentGiven && (
        <div
          className="cookie-banner no-print"
          role="region"
          aria-label={isRtl ? 'הודעת עוגיות ופרטיות' : 'Cookie and Privacy Notice'}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: isRtl ? '20px' : 'auto',
            left: isRtl ? 'auto' : '20px',
            zIndex: 9990,
            maxWidth: '460px',
            width: 'calc(100% - 40px)',
            background: 'var(--bg-secondary)',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(16px)',
            animation: 'toastSlideIn 0.3s ease',
            direction: isRtl ? 'rtl' : 'ltr',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fbbf24',
                flexShrink: 0,
              }}
            >
              <Cookie size={20} />
            </div>

            <div>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                {isRtl ? 'הגדרות עוגיות ופרטיות' : 'Cookie & Privacy Choices'}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {isRtl
                  ? 'אנו משתמשים בעוגיות כדי לשפר את חווית הגלישה, לנתח תנועה ולאבטח את הפעילות באתר בהתאם לתקן המחמיר ביותר.'
                  : 'We use cookies to enhance navigation, analyze site usage, and ensure bank-grade security.'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={handleAcceptAll}
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.85rem', flex: 1, justifyContent: 'center' }}
            >
              <Check size={14} />
              <span>{isRtl ? 'קבל הכל' : 'Accept All'}</span>
            </button>
            <button
              onClick={handleAcceptEssential}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            >
              <span>{isRtl ? 'רק הכרחיים' : 'Essential Only'}</span>
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="btn-secondary"
              style={{ padding: '8px 10px', fontSize: '0.85rem' }}
              title={isRtl ? 'הגדרות' : 'Preferences'}
            >
              <Settings2 size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Cookie Custom Settings Modal */}
      {showSettings && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowSettings(false)}
        >
          <div
            className="glass-panel"
            style={{
              maxWidth: '480px',
              width: '100%',
              padding: '28px',
              borderRadius: '20px',
              background: 'var(--bg-secondary)',
              direction: isRtl ? 'rtl' : 'ltr',
              textAlign: isRtl ? 'right' : 'left',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Shield size={20} color="#3b82f6" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {isRtl ? 'העדפות קובצי עוגיות' : 'Cookie Preferences'}
                </h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {isRtl ? 'עוגיות הכרחיות' : 'Essential Cookies'}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {isRtl ? 'נדרשות לתפקוד תקין, אבטחה וכניסה לחשבון' : 'Required for core site operation and security'}
                  </p>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399' }}>
                  {isRtl ? 'תמיד פעיל' : 'Always Active'}
                </span>
              </div>

              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {isRtl ? 'עוגיות ביצועים ומדידה' : 'Analytics & Performance'}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {isRtl ? 'מסייעות לנו לשפר את האתר על ידי ניתוח אנונימי' : 'Helps improve website through anonymous telemetry'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsAllowed}
                  onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#3b82f6', cursor: 'pointer' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleSaveCustom}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center', padding: '10px' }}
              >
                {isRtl ? 'שמור העדפות' : 'Save Preferences'}
              </button>
              <button
                onClick={handleAcceptAll}
                className="btn-secondary"
                style={{ padding: '10px 16px' }}
              >
                {isRtl ? 'אשר הכל' : 'Allow All'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
