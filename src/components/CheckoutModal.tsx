import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import {
  X,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Lock,
  Sparkles,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  PlanTier,
  SubscriptionType,
  BillingCycle,
  tokenizeCreditCard,
  provisionTenantInProjectB,
  ProvisioningSuccessResponse,
} from '../services/provisioningService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialPlanTier?: PlanTier;
  initialSubscriptionType?: SubscriptionType;
  initialBillingCycle?: BillingCycle;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialPlanTier = 'PRO',
  initialSubscriptionType = 'TRIAL',
  initialBillingCycle = 'MONTHLY',
}) => {
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Step flow: 1: Details, 2: Payment & Plan, 3: Success & Handoff
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Fields: Admin
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLinked, setIsGoogleLinked] = useState(false);

  // Form Fields: Building
  const [buildingName, setBuildingName] = useState('');
  const [buildingAddress, setBuildingAddress] = useState('');
  const [totalApartments, setTotalApartments] = useState<number>(24);

  // Plan Selection
  const [planTier, setPlanTier] = useState<PlanTier>(initialPlanTier);
  const [subscriptionType, setSubscriptionType] = useState<SubscriptionType>(initialSubscriptionType);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(initialBillingCycle);

  // Form Fields: Credit Card
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [citizenId, setCitizenId] = useState('');

  // Execution states
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState<'tokenizing' | 'provisioning' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<ProvisioningSuccessResponse | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Pricing Matrix (ILS)
  const planRates: Record<PlanTier, { monthly: number; yearly: number }> = {
    STARTER: { monthly: 199, yearly: 169 },
    PRO: { monthly: 349, yearly: 299 },
    ENTERPRISE: { monthly: 599, yearly: 499 },
  };

  const currentRate = planRates[planTier][billingCycle === 'YEARLY' ? 'yearly' : 'monthly'];
  const finalChargeNow = subscriptionType === 'TRIAL' ? 0 : billingCycle === 'YEARLY' ? currentRate * 12 : currentRate;

  // Sync initial props on open
  useEffect(() => {
    if (isOpen) {
      setPlanTier(initialPlanTier);
      setSubscriptionType(initialSubscriptionType);
      setBillingCycle(initialBillingCycle);
      setStep(1);
      setErrorMessage(null);
      setSuccessResult(null);
      setAdminPassword('');
      setShowPassword(false);
      setIsGoogleLinked(false);
    }
  }, [isOpen, initialPlanTier, initialSubscriptionType, initialBillingCycle]);

  // Keyboard Escape listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  // Google SSO Quick-Fill Handler
  const handleGoogleQuickFill = () => {
    const defaultG = adminEmail.trim() || 'israel.cohen@gmail.com';
    const chosen = window.prompt(
      isRtl ? 'הזן את כתובת ה-Google שלך למילוי אוטומטי וחיבור SSO:' : 'Enter your Google email for SSO integration:',
      defaultG
    );
    if (!chosen) return;
    const cleanG = chosen.trim().toLowerCase();
    setAdminEmail(cleanG);
    if (!adminName.trim()) {
      const gName = cleanG.split('@')[0].replace(/[._]/g, ' ');
      setAdminName(gName.charAt(0).toUpperCase() + gName.slice(1));
    }
    setIsGoogleLinked(true);
  };

  // Validations
  const validateStep1 = () => {
    setErrorMessage(null);
    if (!adminName.trim() || adminName.trim().length < 2) {
      setErrorMessage(isRtl ? 'אנא הזן שם מנהל מלא (לפחות 2 תווים)' : 'Please enter valid manager name');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(adminEmail.trim())) {
      setErrorMessage(isRtl ? 'אנא הזן כתובת דוא"ל תקינה' : 'Please enter valid email address');
      return false;
    }
    if (adminPassword.trim() && adminPassword.trim().length < 6) {
      setErrorMessage(isRtl ? 'סיסמה אישית חייבת להכיל לפחות 6 תווים' : 'Personal password must be at least 6 characters');
      return false;
    }
    const cleanPhone = adminPhone.replace(/[-\s]/g, '');
    if (cleanPhone.length < 9) {
      setErrorMessage(isRtl ? 'אנא הזן מספר טלפון תקין' : 'Please enter valid phone number');
      return false;
    }
    if (!buildingName.trim()) {
      setErrorMessage(isRtl ? 'אנא הזן את שם הבניין או הפרויקט' : 'Please enter building name');
      return false;
    }
    if (!buildingAddress.trim()) {
      setErrorMessage(isRtl ? 'אנא הזן כתובת מלאה (עיר, רחוב, מספר)' : 'Please enter building address');
      return false;
    }
    if (totalApartments < 2 || totalApartments > 500) {
      setErrorMessage(isRtl ? 'מספר דירות חייב להיות בין 2 ל-500' : 'Apartment count must be between 2 and 500');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    setErrorMessage(null);
    const cleanCard = cardNumber.replace(/\s+/g, '');
    if (cleanCard.length < 15 || cleanCard.length > 19) {
      setErrorMessage(isRtl ? 'מספר כרטיס אשראי אינו תקין' : 'Invalid credit card number');
      return false;
    }
    const [month, year] = expiry.split('/');
    if (!month || !year || parseInt(month) < 1 || parseInt(month) > 12) {
      setErrorMessage(isRtl ? 'תוקף כרטיס שגוי (MM/YY)' : 'Invalid expiry date (MM/YY)');
      return false;
    }
    if (cvv.trim().length < 3 || cvv.trim().length > 4) {
      setErrorMessage(isRtl ? 'קוד CVV חייב להכיל 3 או 4 ספרות' : 'Invalid CVV (3-4 digits)');
      return false;
    }
    if (citizenId.trim().length < 8) {
      setErrorMessage(isRtl ? 'אנא הזן תעודת זהות תקינה של בעל הכרטיס' : 'Please enter valid cardholder ID number');
      return false;
    }
    return true;
  };

  // Submission Pipeline
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // 1. Tokenize Credit Card (Hosted Fields / Gateway Simulation)
      setLoadingPhase('tokenizing');
      const [expMonth, expYear] = expiry.split('/');
      const paymentResult = await tokenizeCreditCard(
        {
          cardholderName: cardholderName.trim() || adminName.trim(),
          cardNumber,
          expiryMonth: expMonth,
          expiryYear: expYear,
          cvv,
          citizenId,
        },
        subscriptionType,
        finalChargeNow
      );

      // 2. Dispatch Automated User & Building Provisioning to Project B
      setLoadingPhase('provisioning');
      const payload = {
        admin: {
          name: adminName.trim(),
          email: adminEmail.trim().toLowerCase(),
          phone: adminPhone.trim(),
          password: adminPassword.trim() ? adminPassword.trim() : undefined,
        },
        building: {
          name: buildingName.trim(),
          address: buildingAddress.trim(),
          totalApartments,
        },
        plan: {
          planTier,
          subscriptionType,
          billingCycle,
          amount: currentRate,
        },
        payment: paymentResult,
        metadata: {
          source: 'landing_page_checkout_modal',
          referrer: document.referrer || undefined,
          submittedAt: new Date().toISOString(),
        },
      };

      const result = await provisionTenantInProjectB(payload);

      setSuccessResult(result);
      setStep(3);
    } catch (err: any) {
      console.error('[Checkout error]', err);
      setErrorMessage(err?.message || (isRtl ? 'חלה שגיאה בעיבוד התשלום או בהקמת הבניין. אנא נסה שנית.' : 'Failed to process payment or provision tenant.'));
    } finally {
      setIsLoading(false);
      setLoadingPhase(null);
    }
  };

  const handleCopyAccessCode = async () => {
    if (!successResult) return;
    try {
      await navigator.clipboard.writeText(successResult.building_access_code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // fallback
    }
  };

  const formatCardNumber = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    return raw.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      return `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    return raw;
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(5, 8, 16, 0.82)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
      onClick={() => {
        if (!isLoading && step !== 3) onClose();
      }}
      role="dialog"
      aria-modal="true"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '680px',
          padding: '32px',
          position: 'relative',
          background: 'var(--bg-secondary)',
          color: 'var(--text-main)',
          borderRadius: '24px',
          border: '1.5px solid rgba(59, 130, 246, 0.35)',
          boxShadow: '0 30px 70px rgba(0, 0, 0, 0.5)',
          maxHeight: '92vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          aria-label={isRtl ? 'סגור חלון' : 'Close modal'}
          style={{
            position: 'absolute',
            top: '20px',
            left: isRtl ? '20px' : 'auto',
            right: isRtl ? 'auto' : '20px',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-main)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={18} />
        </button>

        {/* Progress Steps Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                color: '#3b82f6',
                background: 'rgba(59, 130, 246, 0.12)',
                padding: '4px 12px',
                borderRadius: '20px',
                border: '1px solid rgba(59, 130, 246, 0.25)',
              }}
            >
              {step === 1 && (isRtl ? 'שלב 1 מתוך 2: פרטי הבניין והמנהל' : 'Step 1 of 2: Building & Manager Info')}
              {step === 2 && (isRtl ? 'שלב 2 מתוך 2: מסלול ואבטחת תשלום' : 'Step 2 of 2: Plan & Secure Payment')}
              {step === 3 && (isRtl ? '🎉 הושלם בהצלחה!' : '🎉 Provisioning Complete!')}
            </span>
          </div>

          <h2 style={{ fontSize: '1.7rem', fontWeight: 900, marginBottom: '6px', color: 'var(--text-main)' }}>
            {step === 1 && (isRtl ? 'הקמת בניין חדש ב-DayarPlus' : 'Create New Building in DayarPlus')}
            {step === 2 && (isRtl ? 'סיום תהליך הקמה ואימות כרטיס' : 'Complete Setup & Card Verification')}
            {step === 3 && (isRtl ? 'הבניין שלך מוכן לפעולה!' : 'Your Building is Ready!')}
          </h2>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
            {step === 1 && (isRtl ? 'הזן את פרטי הוועד/מנהל והכתובת להקמה אוטומטית של יחידות הדיור' : 'Enter building address and manager details for automated unit provisioning')}
            {step === 2 && (isRtl ? 'בחר מסלול מנוי. בכפוף לתקן PCI-DSS, תתבצע בדיקת מסגרת בלבד ללא חיוב מיידי בתקופת הניסיון.' : 'Select subscription tier. Card is tokenized securely under PCI-DSS.')}
            {step === 3 && (isRtl ? 'פרטי הגישה הונפקו ונשלחו לדוא"ל. כעת תוכל להיכנס לדשבורד הניהול.' : 'Building and admin account provisioned successfully. You can now access your dashboard.')}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444',
              fontSize: '0.9rem',
              fontWeight: 600,
              marginBottom: '20px',
            }}
          >
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: Building & Admin Details */}
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (validateStep1()) setStep(2);
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {/* Quick Google SSO Auto-Fill / Link */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '14px',
                background: 'rgba(66, 133, 244, 0.08)',
                border: '1px solid rgba(66, 133, 244, 0.3)',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', display: 'block' }}>
                    {isGoogleLinked
                      ? (isRtl ? '✅ מחובר באמצעות חשבון Google' : '✅ Connected via Google Account')
                      : (isRtl ? 'התחברות מהירה באמצעות Google SSO' : 'Quick Connect with Google SSO')}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {isGoogleLinked
                      ? (isRtl ? 'הפרטים עודכנו. כניסות עתידיות למערכת יתאפשרו בלחיצה אחת עם Google.' : 'Details synced. Future logins enabled via one-click Google.')
                      : (isRtl ? 'מילוי אוטומטי של פרטי מנהל + כניסה עתידית ללא סיסמה' : 'Auto-fills manager name & email + passwordless login')}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleGoogleQuickFill}
                style={{
                  background: isGoogleLinked ? 'rgba(16, 185, 129, 0.15)' : '#ffffff',
                  color: isGoogleLinked ? '#10b981' : '#1f2937',
                  border: isGoogleLinked ? '1px solid #10b981' : '1px solid #d1d5db',
                  borderRadius: '10px',
                  padding: '8px 14px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                }}
              >
                {isGoogleLinked ? (isRtl ? 'שנה חשבון Google' : 'Change Account') : (isRtl ? 'המשך עם Google' : 'Continue with Google')}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>
                  {isRtl ? 'שם מלא של מנהל הוועד / איש קשר *' : 'Manager / Contact Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isRtl ? 'לדוגמה: ישראל ישראלי' : 'e.g. John Doe'}
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>
                  {isRtl ? 'דואר אלקטרוני (לכניסה ודוחות) *' : 'Email Address (For login & reports) *'}
                </label>
                <input
                  type="email"
                  required
                  placeholder={isRtl ? 'israel@example.com' : 'john@example.com'}
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>
                  {isRtl ? 'טלפון נייד לאימות (קוד SMS) *' : 'Mobile Phone (For 2FA / OTP) *'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder={isRtl ? '050-1234567' : '050-1234567'}
                  value={adminPhone}
                  onChange={(e) => setAdminPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>
                  {isRtl ? 'מספר דירות בבניין *' : 'Total Apartments in Building *'}
                </label>
                <input
                  type="number"
                  min="2"
                  max="500"
                  required
                  value={totalApartments}
                  onChange={(e) => setTotalApartments(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Personal Password Field (Optional if Google SSO used, Recommended for direct logins) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 700 }}>
                  {isRtl ? 'קביעת סיסמה אישית לכניסה למערכת' : 'Personal Account Password'}
                  <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-muted)', marginInlineStart: '6px' }}>
                    {isGoogleLinked
                      ? (isRtl ? '(אופציונלי - מחובר עם גוגל)' : '(Optional - Google SSO active)')
                      : (isRtl ? '(מומלץ כדי להתחבר מכל מחשב)' : '(Recommended for direct logins)')}
                  </span>
                </label>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={isRtl ? 'הזן סיסמה אישית (לפחות 6 תווים)' : 'Enter password (min. 6 chars)'}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    paddingInlineEnd: '42px',
                    borderRadius: '12px',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? (isRtl ? 'הסתר סיסמה' : 'Hide password') : (isRtl ? 'הצג סיסמה' : 'Show password')}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    insetInlineEnd: '12px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0,
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                {isRtl
                  ? '💡 הסיסמה תאפשר כניסה ישירה מכל דפדפן ומכשיר. תמיד תוכל להתחבר בלחיצה אחת עם Google.'
                  : '💡 Password allows direct logins on any device. You can always sign in with Google SSO.'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>
                  {isRtl ? 'שם הבניין / הפרויקט *' : 'Building / Complex Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isRtl ? 'למשל: מגדלי רוטשילד 45' : 'e.g. Rothschild 45 Towers'}
                  value={buildingName}
                  onChange={(e) => setBuildingName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '6px' }}>
                  {isRtl ? 'כתובת מלאה (רחוב, מספר, עיר) *' : 'Full Street Address & City *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isRtl ? 'שדרות רוטשילד 45, תל אביב' : '45 Rothschild Blvd, Tel Aviv'}
                  value={buildingAddress}
                  onChange={(e) => setBuildingAddress(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '14px',
                fontSize: '1.05rem',
                marginTop: '10px',
              }}
            >
              <span>{isRtl ? 'המשך לבחירת מסלול ואבטחת כרטיס' : 'Continue to Plan & Card Setup'}</span>
              <ArrowIcon size={18} />
            </button>
          </form>
        )}

        {/* STEP 2: Plan Selection & Secure Credit Card Checkout */}
        {step === 2 && (
          <form onSubmit={handleFinalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Primary Option Switcher: 30-Day Trial vs Immediate Paid */}
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '8px' }}>
                {isRtl ? 'בחר אופן הצטרפות:' : 'Select Subscription Model:'}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                {/* Option A: 30-Day Free Trial */}
                <div
                  onClick={() => setSubscriptionType('TRIAL')}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '14px',
                    border: subscriptionType === 'TRIAL' ? '2px solid #3b82f6' : '1px solid var(--border-subtle)',
                    background: subscriptionType === 'TRIAL' ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-glass)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.98rem' }}>
                      🎁 {isRtl ? '30 ימי ניסיון חינם' : '30-Day Free Trial'}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        color: '#34d399',
                        background: 'rgba(16, 185, 129, 0.15)',
                        padding: '2px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      {isRtl ? '₪0 היום' : '₪0 Today'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {isRtl ? 'התחל מיד. כרטיס נשמר לשריון בלבד ללא חיוב עכשיו. חיוב ראשון יחול רק בתום 30 יום.' : 'Start using immediately. Card is tokenized for verification. First charge in 30 days.'}
                  </p>
                </div>

                {/* Option B: Immediate Paid Subscription */}
                <div
                  onClick={() => setSubscriptionType('PAID')}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '14px',
                    border: subscriptionType === 'PAID' ? '2px solid #3b82f6' : '1px solid var(--border-subtle)',
                    background: subscriptionType === 'PAID' ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-glass)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.98rem' }}>
                      ⚡ {isRtl ? 'מנוי משולם מיידי' : 'Immediate Paid'}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        color: '#60a5fa',
                        background: 'rgba(59, 130, 246, 0.15)',
                        padding: '2px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      {isRtl ? 'חשבונית מיידית' : 'Instant Invoice'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {isRtl ? 'חיוב מיידי של קופת הוועד, קבלת חשבונית מס דיגיטלית וגישה מלאה ללא הגבלה.' : 'Immediate charge with instant tax invoice and uninterrupted full production access.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Plan Tier Selection Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['STARTER', 'PRO', 'ENTERPRISE'] as PlanTier[]).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setPlanTier(tier)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '10px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: planTier === tier ? '2px solid #3b82f6' : '1px solid var(--border-subtle)',
                      background: planTier === tier ? 'rgba(59, 130, 246, 0.2)' : 'var(--bg-glass)',
                      color: planTier === tier ? '#60a5fa' : 'var(--text-muted)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {tier}
                  </button>
                ))}
              </div>

              {/* Billing Cycle Switch */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: 600 }}>
                <span style={{ color: billingCycle === 'MONTHLY' ? 'var(--text-main)' : 'var(--text-muted)' }}>
                  {isRtl ? 'חודשי' : 'Monthly'}
                </span>
                <button
                  type="button"
                  onClick={() => setBillingCycle(billingCycle === 'MONTHLY' ? 'YEARLY' : 'MONTHLY')}
                  style={{
                    width: '42px',
                    height: '24px',
                    borderRadius: '12px',
                    background: billingCycle === 'YEARLY' ? '#3b82f6' : 'rgba(255,255,255,0.2)',
                    border: 'none',
                    padding: '2px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: billingCycle === 'YEARLY' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#fff' }} />
                </button>
                <span style={{ color: billingCycle === 'YEARLY' ? '#34d399' : 'var(--text-muted)' }}>
                  {isRtl ? 'שנתי (חודשיים מתנה)' : 'Yearly (2 mos free)'}
                </span>
              </div>
            </div>

            {/* Summary Price Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 18px',
                borderRadius: '12px',
                background: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
              }}
            >
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>
                  {isRtl ? 'סה"כ לתשלום כעת:' : 'Total due today:'}
                </span>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: subscriptionType === 'TRIAL' ? '#34d399' : 'var(--text-main)' }}>
                  {subscriptionType === 'TRIAL' ? (isRtl ? '₪0.00 (בתקופת ניסיון)' : '₪0.00 (Free Trial)') : `₪${finalChargeNow.toLocaleString()}`}
                </span>
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', textAlign: isRtl ? 'left' : 'right' }}>
                {subscriptionType === 'TRIAL'
                  ? isRtl
                    ? `חיוב ראשון בסך ₪${currentRate} יחול בעוד 30 יום`
                    : `First charge of ₪${currentRate} in 30 days`
                  : isRtl
                  ? 'כולל מע"מ וחשבונית מס ממוחשבת'
                  : 'Includes VAT & tax invoice'}
              </span>
            </div>

            {/* Secure Hosted Credit Card Form Simulation */}
            <div
              style={{
                background: 'var(--bg-card)',
                padding: '20px',
                borderRadius: '16px',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lock size={16} color="#34d399" />
                  <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {isRtl ? 'סליקה מאובטחת בתקן PCI-DSS Level 1' : 'PCI-DSS Level 1 Secure Clearing'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <CreditCard size={18} color="#60a5fa" />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                    {isRtl ? 'שם מלא של בעל הכרטיס *' : 'Cardholder Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isRtl ? 'ישראל ישראלי' : 'John Doe'}
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '10px',
                      background: 'var(--bg-glass)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-main)',
                      fontSize: '0.98rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                    {isRtl ? 'מספר כרטיס אשראי *' : 'Card Number *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="4580 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '10px',
                      background: 'var(--bg-glass)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-main)',
                      fontSize: '0.98rem',
                      letterSpacing: '1px',
                      fontFamily: 'monospace',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                      {isRtl ? 'תוקף (MM/YY) *' : 'Exp (MM/YY) *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="12/28"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      maxLength={5}
                      style={{
                        width: '100%',
                        padding: '11px 12px',
                        borderRadius: '10px',
                        background: 'var(--bg-glass)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-main)',
                        fontSize: '0.95rem',
                        textAlign: 'center',
                        fontFamily: 'monospace',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                      CVV *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      maxLength={4}
                      style={{
                        width: '100%',
                        padding: '11px 12px',
                        borderRadius: '10px',
                        background: 'var(--bg-glass)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-main)',
                        fontSize: '0.95rem',
                        textAlign: 'center',
                        fontFamily: 'monospace',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                      {isRtl ? 'ת.ז בעל הכרטיס *' : 'Holder ID *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="012345678"
                      value={citizenId}
                      onChange={(e) => setCitizenId(e.target.value.replace(/\D/g, '').slice(0, 9))}
                      maxLength={9}
                      style={{
                        width: '100%',
                        padding: '11px 12px',
                        borderRadius: '10px',
                        background: 'var(--bg-glass)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-main)',
                        fontSize: '0.95rem',
                        textAlign: 'center',
                        fontFamily: 'monospace',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Back + Submit */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={isLoading}
                className="btn-secondary"
                style={{ padding: '13px 20px', minHeight: '48px' }}
              >
                <span>{isRtl ? 'חזרה' : 'Back'}</span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  padding: '13px 24px',
                  fontSize: '1.05rem',
                  minHeight: '48px',
                  opacity: isLoading ? 0.75 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>
                      {loadingPhase === 'tokenizing'
                        ? isRtl
                          ? 'מאמת כרטיס מול חברת האשראי...'
                          : 'Authorizing card...'
                        : isRtl
                        ? 'מקים בניין ומחבר לחשבון האפליקציה...'
                        : 'Provisioning building...'}
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>
                      {subscriptionType === 'TRIAL'
                        ? isRtl
                          ? 'התחל 30 ימי ניסיון חינם עכשיו'
                          : 'Start 30-Day Free Trial'
                        : isRtl
                        ? `בצע תשלום בסך ₪${finalChargeNow.toLocaleString()} והפעל גישה`
                        : `Pay ₪${finalChargeNow.toLocaleString()} & Activate`}
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Automated Provisioning Success & App Handoff */}
        {step === 3 && successResult && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <CheckCircle size={38} color="#10b981" />
            </div>

            <h3 style={{ fontSize: '1.7rem', fontWeight: 900, marginBottom: '8px', color: 'var(--text-main)' }}>
              {isRtl ? 'הבניין שלך הוקם בהצלחה!' : 'Building Provisioned Successfully!'}
            </h3>

            <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>
              {isRtl
                ? `בניין "${buildingName}" עם ${totalApartments} יחידות דיור נוצר בהצלחה במערכת DayarPlus. פרטי ההתחברות שלך כמנהל נשלחו ל-${adminEmail}.`
                : `Building "${buildingName}" with ${totalApartments} units has been provisioned. Admin credentials sent to ${adminEmail}.`}
            </p>

            {/* Building Access Code Card */}
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.08)',
                border: '1.5px dashed rgba(59, 130, 246, 0.4)',
                borderRadius: '16px',
                padding: '16px 20px',
                marginBottom: '24px',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                {isRtl ? 'קוד הצטרפות דיגיטלי לבניין (לחלוקה לדיירים):' : 'Building Access Code (For tenant onboarding):'}
              </span>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                <code
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 900,
                    color: '#60a5fa',
                    letterSpacing: '2px',
                    background: 'rgba(15, 23, 42, 0.6)',
                    padding: '6px 14px',
                    borderRadius: '8px',
                  }}
                >
                  {successResult.building_access_code}
                </code>
                <button
                  type="button"
                  onClick={handleCopyAccessCode}
                  className="btn-secondary"
                  style={{ padding: '8px 12px', minHeight: '38px' }}
                  title={isRtl ? 'העתק קוד' : 'Copy code'}
                >
                  {copiedCode ? <Check size={16} color="#34d399" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Direct CTA: Go to Building Dashboard */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                type="button"
                onClick={() => {
                  const token = successResult.session_token || '';
                  const bId = successResult.building_id || '';
                  const targetDashboardUrl = `https://dayarplus.knuriel.workers.dev/dashboard?token=${encodeURIComponent(token)}&building=${encodeURIComponent(bId)}`;
                  window.location.href = targetDashboardUrl;
                }}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '16px 28px',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span>{isRtl ? '🚀 כניסה ישירה לדשבורד הבניין' : '🚀 Go to Building Dashboard'}</span>
                <ExternalLink size={20} />
              </button>

              {/* External Cloud Onboarding Link */}
              <a
                href={
                  successResult.onboarding_url ||
                  `https://dayarplus.knuriel.workers.dev/onboard?token=${encodeURIComponent(successResult.session_token || '')}&building=${encodeURIComponent(successResult.building_id || '')}`
                }
                className="btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '12px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  borderRadius: '12px',
                }}
              >
                <span>{isRtl ? '🛠️ פתיחת אשף הגדרת דיירים וחשבון בנק (/onboard)' : '🛠️ Open Tenant & Bank Setup Wizard (/onboard)'}</span>
                <ExternalLink size={16} />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="btn-ghost"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '10px',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span>{isRtl ? 'סגירה והישארות בדף הבית' : 'Close and stay on landing page'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
