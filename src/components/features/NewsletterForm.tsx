import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { Language } from '../../types';
import { useToast } from '../../context/ToastContext';
import { Spinner } from './SkeletonLoader';

interface NewsletterFormProps {
  lang: Language;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ lang }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      showToast(isRtl ? 'אנא הזן כתובת אימייל תקינה' : 'Please enter a valid email address', 'error');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);

      // Save to localStorage
      try {
        const existing = JSON.parse(localStorage.getItem('dayarplus_subscribers') || '[]');
        if (!existing.includes(cleanEmail)) {
          existing.push(cleanEmail);
          localStorage.setItem('dayarplus_subscribers', JSON.stringify(existing));
        }
      } catch {
        // ignore
      }

      showToast(
        isRtl
          ? 'נרשמת בהצלחה לעלון המקצועי של DayarPlus! נעדכן אותך בחידושים וטיפים.'
          : 'Successfully subscribed to DayarPlus newsletter!',
        'success'
      );
    }, 600);
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '36px 30px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.2) 0%, rgba(17, 24, 39, 0.8) 100%)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
        margin: '50px 0 20px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        <div>
          <div className="badge-tag" style={{ marginBottom: '12px' }}>
            <Mail size={14} />
            <span>{isRtl ? 'עלון מקצועי חודשי' : 'Monthly Industry Digest'}</span>
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
            {isRtl
              ? 'הצטרפו לקהילת ניהול הבתים והוועדים בישראל'
              : 'Join the Leading HOA & Building Management Community'}
          </h3>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {isRtl
              ? 'טיפים משפטיים לוועדי בית, עדכוני חקיקה, מדריכי חיסכון בהוצאות חשמל ומעליות וחידושים טכנולוגיים ישירות לתיבת המייל.'
              : 'HOA legal advice, cost-saving building maintenance guides, and technology updates straight to your inbox.'}
          </p>
        </div>

        <div>
          {subscribed ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 20px',
                borderRadius: '14px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#34d399',
              }}
            >
              <CheckCircle2 size={24} />
              <div>
                <strong style={{ display: 'block', fontSize: '1rem', color: '#ffffff' }}>
                  {isRtl ? 'תודה על ההרשמה!' : 'Thank you for subscribing!'}
                </strong>
                <span style={{ fontSize: '0.85rem' }}>
                  {isRtl
                    ? 'העלון הראשון ישלח אליך בתחילת החודש הקרוב.'
                    : 'The next digest will arrive at the start of next month.'}
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isRtl ? 'הזינו כתובת דוא"ל...' : 'Enter your email...'}
                  required
                  aria-label={isRtl ? 'כתובת אימייל להרשמה לעלון' : 'Email for newsletter'}
                  style={{
                    width: '100%',
                    padding: '13px 18px',
                    borderRadius: '12px',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.6)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  padding: '12px 24px',
                  fontSize: '0.95rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {loading ? (
                  <Spinner size={18} />
                ) : (
                  <>
                    <span>{isRtl ? 'הרשמה לעלון' : 'Subscribe'}</span>
                    <ArrowIcon size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '8px' }}>
            {isRtl
              ? '🔒 איננו שולחים ספאם, וניתן להסיר את עצמך בכל עת בלחיצה אחת.'
              : '🔒 We respect your privacy. Unsubscribe at any time with one click.'}
          </p>
        </div>
      </div>
    </div>
  );
};
