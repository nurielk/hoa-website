import React from 'react';
import { Language } from '../types';
import { Building2, Phone, Mail, ShieldCheck } from 'lucide-react';

interface FooterProps {
  lang: Language;
  footerData: any;
  buttons: Record<string, string>;
  onOpenDemoModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  footerData,
  buttons,
  onOpenDemoModal,
}) => {
  return (
    <footer
      style={{
        background: '#070a12',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '70px 0 30px',
        position: 'relative',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Building2 size={20} color="#ffffff" />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>
                DayarPlus<span style={{ color: '#3b82f6' }}>.SYSTEM</span>
              </span>
            </div>

            <p style={{ fontSize: '0.95rem', color: '#9ca3af', lineHeight: 1.6, marginBottom: '20px' }}>
              {footerData.tagline}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontSize: '0.85rem', fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>{lang === 'he' ? 'עומד בתקן אבטחת תשלומים PCI-DSS' : 'Certified PCI-DSS Payment Security'}</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '18px' }}>
              {lang === 'he' ? 'ניווט מהיר' : 'Quick Navigation'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem' }}>
              <a href="#features" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                {lang === 'he' ? 'תכונות הפלטפורמה' : 'Features'}
              </a>
              <a href="#solutions" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                {lang === 'he' ? 'פתרונות לועד בית וחברות ניהול' : 'Solutions'}
              </a>
              <a href="#calculator" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                {lang === 'he' ? 'מחשבון חיסכון' : 'ROI Calculator'}
              </a>
              <a href="#pricing" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                {lang === 'he' ? 'מסלולים ומחירים' : 'Pricing'}
              </a>
              <a href="#faq" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                {lang === 'he' ? 'שאלות נפוצות' : 'FAQ'}
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '18px' }}>
              {lang === 'he' ? 'יצירת קשר ותמיכה' : 'Contact & Support'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.92rem', color: '#9ca3af' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="#60a5fa" />
                <span>{footerData.contactPhone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="#60a5fa" />
                <span>{footerData.contactEmail}</span>
              </div>
              <button
                onClick={onOpenDemoModal}
                className="btn-secondary"
                style={{ marginTop: '10px', padding: '8px 16px', fontSize: '0.85rem', width: 'fit-content' }}
              >
                {buttons.scheduleDemo}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Legal */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.85rem',
            color: '#6b7280',
          }}
        >
          <div>{footerData.rights}</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>
              {footerData.accessibility}
            </a>
            <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>
              {footerData.privacy}
            </a>
            <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>
              {footerData.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
