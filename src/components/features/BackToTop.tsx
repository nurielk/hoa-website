import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Language } from '../../types';

interface BackToTopProps {
  lang: Language;
}

export const BackToTop: React.FC<BackToTopProps> = ({ lang }) => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isRtl = lang === 'he';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 280);

      const maxScroll =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (maxScroll > 0) {
        setScrollProgress((scrollY / maxScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="back-to-top-btn"
      aria-label={isRtl ? 'חזרה לראש העמוד' : 'Back to top of page'}
      title={isRtl ? 'חזרה לראש העמוד' : 'Back to top'}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: isRtl ? 'auto' : '96px',
        left: isRtl ? '96px' : 'auto',
        zIndex: 980,
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        background: 'var(--bg-card)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(59, 130, 246, 0.4)',
        color: '#60a5fa',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        padding: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.08)';
        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.background = 'var(--bg-card)';
      }}
    >
      {/* Circular Progress border SVG */}
      <svg
        width="46"
        height="46"
        viewBox="0 0 46 46"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'rotate(-90deg)',
          pointerEvents: 'none',
        }}
      >
        <circle
          cx="23"
          cy="23"
          r="20"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="2.5"
          fill="none"
        />
        <circle
          cx="23"
          cy="23"
          r="20"
          stroke="#3b82f6"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray="125.6"
          strokeDashoffset={125.6 - (125.6 * scrollProgress) / 100}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
        />
      </svg>
      <ArrowUp size={20} />
    </button>
  );
};
