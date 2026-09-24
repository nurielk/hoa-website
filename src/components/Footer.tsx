import React, { useState, useEffect } from 'react';
import { Language, FooterData } from '../types';
import { Building2, Phone, Mail, ShieldCheck, X, Copy, Check, Printer } from 'lucide-react';
import { NewsletterForm } from './features/NewsletterForm';
import { InteractiveCounter } from './features/InteractiveCounter';
import { LastUpdatedBadge } from './features/LastUpdatedBadge';
import { useToast } from '../context/ToastContext';

interface FooterProps {
  lang: Language;
  footerData: FooterData;
  buttons: Record<string, string>;
  onOpenDemoModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  footerData,
  buttons,
  onOpenDemoModal,
}) => {
  const [activeLegalModal, setActiveLegalModal] = useState<'accessibility' | 'privacy' | 'terms' | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { copyToClipboard } = useToast();
  const isRtl = lang === 'he';

  useEffect(() => {
    if (!activeLegalModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLegalModal(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLegalModal]);

  const handleCopyPhone = async () => {
    await copyToClipboard(footerData.contactPhone, isRtl ? 'מספר טלפון הועתק ללוח!' : 'Phone number copied!');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = async () => {
    await copyToClipboard(footerData.contactEmail, isRtl ? 'כתובת מייל הועתקה ללוח!' : 'Email copied!');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const getLegalContent = () => {
    switch (activeLegalModal) {
      case 'accessibility':
        return {
          title: isRtl ? 'הצהרת נגישות' : 'Accessibility Statement',
          content: isRtl ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', lineHeight: 1.7 }}>
              <p>
                מערכת <strong>DayarPlus</strong> מחויבת להענקת חווית שימוש שוויונית, נגישה ונוחה לכלל הדיירים והמשתמשים, לרבות אנשים עם מוגבלות.
              </p>
              <h4 style={{ color: '#60a5fa', fontWeight: 700 }}>עמידה בתקנים והתאמות</h4>
              <p>
                האתר והמערכת הותאמו בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), תשע"ג-2013, ועל פי המלצות תקן נגישות ישראלי ת"י 5568 ברמה AA (בהתבסס על הנחיות WCAG 2.1).
              </p>
              <ul style={{ paddingRight: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>תמיכה בניווט מלא באמצעות מקלדת (Tab, Enter, חיצים).</li>
                <li>קישור ישיר "דלג לתוכן מרכזי" לקוראי מסך.</li>
                <li>ניגודיות צבעים מותאמת ועמידה ביחסי קונטרסט תקניים במצב כהה ובהיר.</li>
                <li>התאמה לקוראי מסך מודרניים (NVDA, JAWS, VoiceOver).</li>
                <li>עיצוב רספונסיבי המאפשר הגדלת טקסטים עד 200% ללא פגיעה במבנה.</li>
              </ul>
              <h4 style={{ color: '#60a5fa', fontWeight: 700 }}>רכז נגישות ופניות</h4>
              <p>
                אם נתקלתם בקושי או בעיית נגישות באתר, אנא פנו לרכז הנגישות שלנו:
                <br />
                דוא"ל: accessibility@dayarplus.co.il | טלפון: 077-9988770
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', lineHeight: 1.7 }}>
              <p>
                <strong>DayarPlus</strong> is dedicated to providing an accessible, barrier-free digital environment for all users, conforming to WCAG 2.1 Level AA standards.
              </p>
              <p>For any accessibility inquiries or support, please contact accessibility@dayarplus.co.il.</p>
            </div>
          ),
        };
      case 'privacy':
        return {
          title: isRtl ? 'מדיניות פרטיות' : 'Privacy Policy',
          content: isRtl ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', lineHeight: 1.7 }}>
              <p>
                אנו ב-<strong>DayarPlus</strong> מכבדים את פרטיותכם ורואים באבטחת המידע שלכם ושל ועד הבית ערך עליון.
              </p>
              <h4 style={{ color: '#60a5fa', fontWeight: 700 }}>איסוף ושימוש במידע</h4>
              <p>
                המידע שנאסף (פרטי דירה, טלפון, תשלומים) משמש אך ורק לצורך ניהול שוטף של ענייני הבניין, הפקת קבלות, דיווח תקלות ותקשורת דיירים.
              </p>
              <h4 style={{ color: '#60a5fa', fontWeight: 700 }}>אבטחת מידע ותשלומים</h4>
              <p>
                פרטי כרטיסי האשראי מעובדים ישירות בסביבת סליקה מוגנת ומאובטחת לפי תקן <strong>PCI-DSS Level 1</strong> ואינם נשמרים בשרתי המערכת. כלל התעבורה מוצפנת בפרוטוקול SSL/TLS מתקדם.
              </p>
              <h4 style={{ color: '#60a5fa', fontWeight: 700 }}>אי-העברת מידע לצדדים שלישיים</h4>
              <p>
                איננו מוכרים, משכירים או מוסרים את פרטי הדיירים או נתוני הבניין לאף גורם מסחרי או צד שלישי שאינו מורשה.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', lineHeight: 1.7 }}>
              <p>
                DayarPlus adheres to strict privacy standards and encrypts all communication end-to-end. Payment data is processed under PCI-DSS Level 1 certification. We do not sell or disclose tenant data to third parties.
              </p>
            </div>
          ),
        };
      case 'terms':
        return {
          title: isRtl ? 'תנאי שימוש' : 'Terms of Service',
          content: isRtl ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', lineHeight: 1.7 }}>
              <p>
                ברוכים הבאים לפלטפורמת <strong>DayarPlus</strong>. השימוש באתר ובשירותי המערכת כפוף לתנאים המפורטים להלן.
              </p>
              <h4 style={{ color: '#60a5fa', fontWeight: 700 }}>רישיון שימוש והרשאות</h4>
              <p>
                השירות מוענק לוועדי בית, חברות ניהול ולדיירי הבניין ברישיון שימוש מוגבל, בהתאם לחבילת המנוי הנבחרת (Starter, Pro, Enterprise).
              </p>
              <h4 style={{ color: '#60a5fa', fontWeight: 700 }}>אחריות המשתמש</h4>
              <p>
                המשתמש אחראי לשמירה על סודיות פרטי הכניסה שלו ולנכונות הדיווחים המועלים למערכת (דיווח תקלות, העלאת קבצים או ביצוע הצבעות).
              </p>
              <h4 style={{ color: '#60a5fa', fontWeight: 700 }}>חידוש וביטול מנוי</h4>
              <p>
                המנוי החודשי מתחדש אוטומטית וניתן לביטול בכל עת בהודעה של 30 יום מראש ללא קנסות או עמלות יציאה.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', lineHeight: 1.7 }}>
              <p>
                Use of the DayarPlus platform is granted under a recurring subscription license. Subscriptions can be canceled at any time with no lock-in contracts.
              </p>
            </div>
          ),
        };
      default:
        return null;
    }
  };

  const modalContent = getLegalContent();

  return (
    <footer
      style={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '70px 0 30px',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Feature 13: Newsletter Form */}
        <NewsletterForm lang={lang} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            margin: '50px 0',
          }}
        >
          {/* Brand Info */}
          <div>
            <a
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
                textDecoration: 'none',
              }}
            >
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
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                DayarPlus<span style={{ color: '#3b82f6' }}>.SYSTEM</span>
              </span>
            </a>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              {footerData.tagline}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontSize: '0.85rem', fontWeight: 600, marginBottom: '16px' }}>
              <ShieldCheck size={16} />
              <span>{lang === 'he' ? 'עומד בתקן אבטחת תשלומים PCI-DSS' : 'Certified PCI-DSS Payment Security'}</span>
            </div>

            {/* Feature 14: Interactive Counter */}
            <InteractiveCounter lang={lang} />
          </div>

          {/* Quick Nav */}
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '18px' }}>
              {lang === 'he' ? 'ניווט מהיר' : 'Quick Navigation'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem' }}>
              <a href="#features" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                {lang === 'he' ? 'תכונות הפלטפורמה' : 'Features'}
              </a>
              <a href="#solutions" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                {lang === 'he' ? 'פתרונות לועד בית וחברות ניהול' : 'Solutions'}
              </a>
              <a href="#calculator" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                {lang === 'he' ? 'מחשבון חיסכון' : 'ROI Calculator'}
              </a>
              <a href="#pricing" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                {lang === 'he' ? 'מסלולים ומחירים' : 'Pricing'}
              </a>
              <a href="#announcements" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                {lang === 'he' ? 'לוח הודעות ועדכונים' : 'Bulletins'}
              </a>
              <a href="#faq" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                {lang === 'he' ? 'שאלות נפוצות' : 'FAQ'}
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '18px' }}>
              {lang === 'he' ? 'יצירת קשר ותמיכה' : 'Contact & Support'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
              {/* Phone with click-to-copy */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="#60a5fa" />
                <a href={`tel:${footerData.contactPhone.replace(/-/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {footerData.contactPhone}
                </a>
                <button
                  onClick={handleCopyPhone}
                  aria-label={isRtl ? 'העתק מספר טלפון' : 'Copy phone'}
                  style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '2px' }}
                >
                  {copiedPhone ? <Check size={13} color="#34d399" /> : <Copy size={13} />}
                </button>
              </div>

              {/* Email with click-to-copy */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="#60a5fa" />
                <a href={`mailto:${footerData.contactEmail}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {footerData.contactEmail}
                </a>
                <button
                  onClick={handleCopyEmail}
                  aria-label={isRtl ? 'העתק כתובת מייל' : 'Copy email'}
                  style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '2px' }}
                >
                  {copiedEmail ? <Check size={13} color="#34d399" /> : <Copy size={13} />}
                </button>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={onOpenDemoModal}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  {buttons.scheduleDemo}
                </button>

                {/* Print page button */}
                <button
                  onClick={handlePrint}
                  className="btn-secondary print-allow"
                  style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                  title={isRtl ? 'הדפס עמוד זה' : 'Print this page'}
                >
                  <Printer size={15} />
                  <span>{isRtl ? 'הדפסה' : 'Print'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Legal */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.85rem',
            color: 'var(--text-dim)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span>{footerData.rights}</span>
            <LastUpdatedBadge lang={lang} />
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <button
              onClick={() => setActiveLegalModal('accessibility')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                padding: 0,
                textDecoration: 'underline',
              }}
            >
              {footerData.accessibility}
            </button>
            <button
              onClick={() => setActiveLegalModal('privacy')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                padding: 0,
                textDecoration: 'underline',
              }}
            >
              {footerData.privacy}
            </button>
            <button
              onClick={() => setActiveLegalModal('terms')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                padding: 0,
                textDecoration: 'underline',
              }}
            >
              {footerData.terms}
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modal Dialog */}
      {modalContent && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setActiveLegalModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="glass-panel"
            style={{
              maxWidth: '650px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '36px',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              direction: isRtl ? 'rtl' : 'ltr',
              textAlign: isRtl ? 'right' : 'left',
              background: 'var(--bg-secondary)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLegalModal(null)}
              aria-label={isRtl ? 'סגור' : 'Close'}
              style={{
                position: 'absolute',
                top: '20px',
                left: isRtl ? '20px' : 'auto',
                right: isRtl ? 'auto' : '20px',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '20px' }}>
              {modalContent.title}
            </h3>

            <div style={{ color: 'var(--text-muted)', fontSize: '0.98rem' }}>
              {modalContent.content}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
