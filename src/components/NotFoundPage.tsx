import React from 'react';
import { Language } from '../types';
import { Building2, Home, ArrowLeft, ArrowRight } from 'lucide-react';

interface NotFoundPageProps {
  lang: Language;
  onGoHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ lang, onGoHome }) => {
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0b0f19',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        color: '#ffffff',
        textAlign: 'center',
      }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '540px',
          width: '100%',
          padding: '48px 36px',
          borderRadius: '24px',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
          }}
        >
          <Building2 size={32} color="#ffffff" />
        </div>

        <div
          style={{
            fontSize: '5rem',
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: '12px',
            letterSpacing: '-0.03em',
          }}
          className="text-gradient"
        >
          404
        </div>

        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '12px' }}>
          {isRtl ? 'העמוד שחיפשת לא נמצא' : 'Page Not Found'}
        </h1>

        <p style={{ color: '#9ca3af', fontSize: '1rem', lineHeight: 1.6, marginBottom: '32px' }}>
          {isRtl
            ? 'נראה שהכתובת שגויה או שהעמוד הועבר. אל דאגה, דלת הכניסה הראשית לבניין עדיין פתוחה.'
            : 'The page you are looking for might have been moved, deleted, or does not exist. The front entrance is still open.'}
        </p>

        <button
          onClick={onGoHome}
          className="btn-primary"
          style={{
            width: '100%',
            justifyContent: 'center',
            padding: '12px 24px',
            fontSize: '1rem',
          }}
        >
          <Home size={18} />
          <span>{isRtl ? 'חזרה לדף הבית' : 'Back to Home'}</span>
          <ArrowIcon size={16} />
        </button>
      </div>
    </div>
  );
};
