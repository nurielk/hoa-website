import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Language } from '../../types';
import { useToast } from '../../context/ToastContext';

interface InteractiveCounterProps {
  lang: Language;
  initialCount?: number;
  style?: React.CSSProperties;
}

export const InteractiveCounter: React.FC<InteractiveCounterProps> = ({
  lang,
  initialCount = 1248,
  style,
}) => {
  const [count, setCount] = useState(initialCount);
  const [hasVoted, setHasVoted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const { showToast } = useToast();
  const isRtl = lang === 'he';

  useEffect(() => {
    const savedCount = localStorage.getItem('dayarplus_community_likes');
    const voted = localStorage.getItem('dayarplus_has_liked');
    if (savedCount) {
      setCount(parseInt(savedCount, 10));
    }
    if (voted === 'true') {
      setHasVoted(true);
    }
  }, []);

  const handleIncrement = () => {
    if (hasVoted) {
      showToast(isRtl ? 'כבר תמכת בפרויקט! תודה רבה על האמון.' : 'You already supported! Thank you.', 'info');
      return;
    }

    const nextCount = count + 1;
    setCount(nextCount);
    setHasVoted(true);
    setAnimating(true);

    localStorage.setItem('dayarplus_community_likes', nextCount.toString());
    localStorage.setItem('dayarplus_has_liked', 'true');

    showToast(isRtl ? 'תודה על תמיכתך במערכת DayarPlus! 🎉' : 'Thank you for supporting DayarPlus! 🎉', 'success');

    setTimeout(() => setAnimating(false), 800);
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 16px',
        borderRadius: '9999px',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        ...style,
      }}
    >
      <button
        onClick={handleIncrement}
        disabled={hasVoted}
        aria-label={isRtl ? 'הצבע לתמיכה במערכת' : 'Support DayarPlus'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: hasVoted
            ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
            : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          color: '#ffffff',
          border: 'none',
          padding: '6px 14px',
          borderRadius: '9999px',
          fontSize: '0.85rem',
          fontWeight: 700,
          cursor: hasVoted ? 'default' : 'pointer',
          boxShadow: hasVoted
            ? '0 4px 14px rgba(239, 68, 68, 0.4)'
            : '0 4px 14px rgba(59, 130, 246, 0.4)',
          transform: animating ? 'scale(1.2)' : 'scale(1)',
          transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <Heart size={16} fill={hasVoted ? '#ffffff' : 'none'} />
        <span>{hasVoted ? (isRtl ? 'אהבתי' : 'Supported') : (isRtl ? 'תמיכה במערכת' : 'Support App')}</span>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span
          style={{
            fontSize: '1rem',
            fontWeight: 800,
            color: 'var(--text-main)',
            minWidth: '45px',
          }}
        >
          {count.toLocaleString()}
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {isRtl ? 'דיירים וועדים מרוצים' : 'happy residents'}
        </span>
      </div>

      {animating && (
        <span
          style={{
            position: 'absolute',
            top: '-20px',
            right: isRtl ? '30px' : 'auto',
            left: isRtl ? 'auto' : '30px',
            color: '#ef4444',
            fontWeight: 800,
            fontSize: '0.9rem',
            animation: 'floatUp 0.8s ease forwards',
          }}
        >
          +1 ❤️
        </span>
      )}

      <style>{`
        @keyframes floatUp {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-24px); }
        }
      `}</style>
    </div>
  );
};
