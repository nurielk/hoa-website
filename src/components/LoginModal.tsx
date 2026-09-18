import React, { useState } from 'react';
import { Language } from '../types';
import { X, Lock, Phone, ArrowLeft, ArrowRight, ShieldCheck, Building2, CheckCircle2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onLoginSuccess: (userRole: 'resident' | 'vaad' | 'management', buildingName: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  lang,
  onLoginSuccess,
}) => {
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [role, setRole] = useState<'resident' | 'vaad' | 'management'>('vaad');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Keyboard Escape listener
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Hook rules guarantee: return null AFTER all hooks
  if (!isOpen) return null;

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      setError(isRtl ? 'אנא הזן מספר טלפון או דוא"ל' : 'Please enter phone or email');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpCode('1234');
      setStep('otp');
    }, 600);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(role, isRtl ? 'בניין רוטשילד 45, תל אביב' : 'Rothschild 45 Tower, Tel Aviv');
      onClose();
    }, 800);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '36px',
          position: 'relative',
          border: '1px solid rgba(59, 130, 246, 0.4)',
          background: '#111827',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            left: isRtl ? '20px' : 'auto',
            right: isRtl ? 'auto' : '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#ffffff',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: isRtl ? 'right' : 'left', marginBottom: '24px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              borderRadius: '20px',
              background: 'rgba(59, 130, 246, 0.15)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#60a5fa',
              fontSize: '0.82rem',
              fontWeight: 700,
              marginBottom: '14px',
            }}
          >
            <ShieldCheck size={16} />
            <span>{isRtl ? 'כניסה מאובטחת למערכת' : 'Secure System Login'}</span>
          </div>

          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
            {isRtl ? 'התחברות לאפליקציית DayarPlus' : 'Login to DayarPlus App'}
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
            {isRtl
              ? 'הזן את פרטי הגישה שלך לכניסה ישירה לדשבורד הבניין'
              : 'Enter your credentials to access your building dashboard directly'}
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '4px',
            borderRadius: '12px',
            marginBottom: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <button
            type="button"
            onClick={() => setRole('vaad')}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: '8px',
              border: 'none',
              background: role === 'vaad' ? 'var(--accent-blue)' : 'transparent',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {isRtl ? 'ועד בית' : 'Building Board'}
          </button>

          <button
            type="button"
            onClick={() => setRole('resident')}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: '8px',
              border: 'none',
              background: role === 'resident' ? 'var(--accent-blue)' : 'transparent',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {isRtl ? 'דייר בבניין' : 'Resident'}
          </button>

          <button
            type="button"
            onClick={() => setRole('management')}
            style={{
              flex: 1,
              padding: '9px 12px',
              borderRadius: '8px',
              border: 'none',
              background: role === 'management' ? 'var(--accent-blue)' : 'transparent',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {isRtl ? 'חברת ניהול' : 'Management'}
          </button>
        </div>

        {error && (
          <div
            style={{
              padding: '10px 14px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '10px',
              color: '#fca5a5',
              fontSize: '0.88rem',
              marginBottom: '16px',
            }}
          >
            {error}
          </div>
        )}

        {step === 'credentials' ? (
          <form onSubmit={handleCredentialsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#d1d5db', marginBottom: '6px' }}>
                {isRtl ? 'מספר טלפון / נייד:' : 'Phone Number or Email:'}
              </label>
              <div style={{ position: 'relative' }}>
                <Phone
                  size={18}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    right: isRtl ? '14px' : 'auto',
                    left: isRtl ? 'auto' : '14px',
                    color: '#9ca3af',
                  }}
                />
                <input
                  required
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    paddingRight: isRtl ? '42px' : '16px',
                    paddingLeft: isRtl ? '16px' : '42px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                  placeholder={isRtl ? 'דוגמא: 050-1234567' : 'e.g. 050-1234567'}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#d1d5db', marginBottom: '6px' }}>
                {isRtl ? 'סיסמה / קוד דירה:' : 'Password or Unit Pin:'}
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={18}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    right: isRtl ? '14px' : 'auto',
                    left: isRtl ? 'auto' : '14px',
                    color: '#9ca3af',
                  }}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    paddingRight: isRtl ? '42px' : '16px',
                    paddingLeft: isRtl ? '16px' : '42px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
            >
              <span>{loading ? (isRtl ? 'שולח קוד אימות...' : 'Sending Code...') : (isRtl ? 'המשך להתחברות' : 'Continue to Login')}</span>
              <ArrowIcon size={18} />
            </button>

            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <span
                onClick={() => {
                  setIdentifier('050-9876543');
                  setPassword('demo123');
                }}
                style={{
                  fontSize: '0.82rem',
                  color: '#60a5fa',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                {isRtl ? '💡 לחץ כאן למילוי פרטי דמו מהיר' : '💡 Click here for instant demo login'}
              </span>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '0.9rem', color: '#34d399', fontWeight: 600, marginBottom: '4px' }}>
                <CheckCircle2 size={20} style={{ verticalAlign: 'middle', marginInlineEnd: '6px' }} />
                {isRtl ? 'קוד אימות נשלח ב-SMS' : 'Verification code sent via SMS'}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{identifier}</div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#d1d5db', marginBottom: '6px', textAlign: 'center' }}>
                {isRtl ? 'הזן קוד חד-פעמי (SMS):' : 'Enter 4-digit SMS OTP Code:'}
              </label>
              <input
                required
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(59, 130, 246, 0.5)',
                  color: '#ffffff',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  letterSpacing: '0.4em',
                  textAlign: 'center',
                  outline: 'none',
                }}
                placeholder="1234"
              />
              <div style={{ textAlign: 'center', marginTop: '6px' }}>
                <span style={{ fontSize: '0.82rem', color: '#60a5fa', fontWeight: 600 }}>
                  {isRtl ? '💡 מצב דמו: הקוד 1234 מולא אוטומטית (לחץ כניסה למעבר לפורטל)' : '💡 Demo mode: Code 1234 pre-filled (click Enter to proceed)'}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
            >
              <span>{loading ? (isRtl ? 'מתחבר למערכת...' : 'Logging in...') : (isRtl ? 'כניסה למערכת DayarPlus' : 'Enter DayarPlus App Portal')}</span>
              <Building2 size={18} />
            </button>

            <button
              type="button"
              onClick={() => setStep('credentials')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#9ca3af',
                fontSize: '0.85rem',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              {isRtl ? 'חזור לשלב הקודם' : 'Back to credentials'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
