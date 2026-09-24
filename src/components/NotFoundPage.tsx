import React, { useState } from 'react';
import { Language } from '../types';
import { Building2, Home, ArrowLeft, ArrowRight, Search, ShieldCheck, HelpCircle, Sparkles } from 'lucide-react';

interface NotFoundPageProps {
  lang: Language;
  onGoHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ lang, onGoHome }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      onGoHome();
      return;
    }
    // Navigate home and trigger search
    onGoHome();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 20px',
        color: 'var(--text-main)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="glass-panel"
        style={{
          maxWidth: '600px',
          width: '100%',
          padding: '48px 36px',
          borderRadius: '28px',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          boxShadow: '0 30px 70px rgba(0, 0, 0, 0.6)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.45)',
          }}
        >
          <Building2 size={36} color="#ffffff" />
        </div>

        <div
          style={{
            fontSize: '5.5rem',
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: '12px',
            letterSpacing: '-0.03em',
          }}
          className="text-gradient"
        >
          404
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '12px', color: 'var(--text-main)' }}>
          {isRtl ? 'הדירה או העמוד שחיפשת לא נמצאו' : 'Apartment or Page Not Found'}
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '28px' }}>
          {isRtl
            ? 'נראה שהכתובת שגויה או שהעמוד הועבר. אל דאגה – דלת הכניסה הראשית לבניין עדיין פתוחה ומוכנה.'
            : 'The page you are looking for might have moved or does not exist. The main lobby is still open.'}
        </p>

        {/* 404 Quick Search */}
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search
              size={18}
              color="#60a5fa"
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: isRtl ? '14px' : 'auto',
                left: isRtl ? 'auto' : '14px',
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isRtl ? 'חיפוש נושא (מחירון, תכונות, שאלות)...' : 'Search topics (pricing, features)...'}
              style={{
                width: '100%',
                padding: isRtl ? '12px 40px 12px 14px' : '12px 14px 12px 40px',
                borderRadius: '12px',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-main)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>
          <button type="submit" className="btn-secondary" style={{ padding: '12px 18px' }}>
            <span>{isRtl ? 'חפש' : 'Search'}</span>
          </button>
        </form>

        {/* Quick helpful links */}
        <div style={{ marginBottom: '32px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'block', marginBottom: '12px' }}>
            {isRtl ? 'קישורים מהירים למעבר מהיר:' : 'Quick links to popular destinations:'}
          </span>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={onGoHome}
              className="btn-secondary"
              style={{ padding: '6px 14px', fontSize: '0.85rem' }}
            >
              <Sparkles size={14} color="#60a5fa" />
              <span>{isRtl ? 'תכונות המוצר' : 'Features'}</span>
            </button>
            <button
              onClick={onGoHome}
              className="btn-secondary"
              style={{ padding: '6px 14px', fontSize: '0.85rem' }}
            >
              <HelpCircle size={14} color="#34d399" />
              <span>{isRtl ? 'שאלות ותשובות' : 'FAQ'}</span>
            </button>
            <button
              onClick={onGoHome}
              className="btn-secondary"
              style={{ padding: '6px 14px', fontSize: '0.85rem' }}
            >
              <ShieldCheck size={14} color="#fbbf24" />
              <span>{isRtl ? 'מסלולים ומחירים' : 'Pricing'}</span>
            </button>
          </div>
        </div>

        {/* Primary Back Button */}
        <button
          onClick={onGoHome}
          className="btn-primary"
          style={{
            width: '100%',
            justifyContent: 'center',
            padding: '14px 28px',
            fontSize: '1.05rem',
          }}
        >
          <Home size={18} />
          <span>{isRtl ? 'חזרה לדף הבית של DayarPlus' : 'Back to DayarPlus Homepage'}</span>
          <ArrowIcon size={16} />
        </button>
      </div>
    </div>
  );
};
