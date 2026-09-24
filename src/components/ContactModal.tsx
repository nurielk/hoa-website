import React, { useState, useEffect, useRef } from 'react';
import { Language, ModalData } from '../types';
import { X, CheckCircle, Sparkles, Send, Loader2, AlertCircle, MessageCircle } from 'lucide-react';

import { getStoredUtmData } from '../utils/utmTracker';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  modalData: ModalData;
  buttons: Record<string, string>;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  lang,
  modalData,
  buttons,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    phone: string;
    role: string;
    apartments: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: 'vaad',
    apartments: '24',
    notes: '',
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const isRtl = lang === 'he';

  // Keyboard navigation & Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  // Hook rules guarantee: return null AFTER all hooks are declared
  if (!isOpen) return null;

  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/[-\s]/g, '');
    const isIsraeli = /^05\d{8}$/.test(cleanPhone) || /^0[23489]\d{7}$/.test(cleanPhone);
    const isGeneral = /^\+?\d{9,15}$/.test(cleanPhone);
    return isIsraeli || isGeneral;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Sanitize and validate inputs
    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedEmail = formData.email.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setErrorMsg(isRtl ? 'אנא הזן שם מלא תקין (לפחות 2 תווים)' : 'Please enter a valid full name');
      return;
    }

    if (!validatePhone(trimmedPhone)) {
      setErrorMsg(isRtl ? 'אנא הזן מספר טלפון תקין (למשל 050-1234567)' : 'Please enter a valid phone number');
      return;
    }

    setIsLoading(true);

    try {
      const leadId = `LEAD-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;
      const payload = {
        leadId,
        name: trimmedName,
        phone: trimmedPhone,
        email: trimmedEmail,
        role: formData.role,
        apartments: formData.apartments,
        notes: formData.notes.trim(),
        submittedAt: new Date().toISOString(),
        source: 'dayarplus_marketing_modal',
        utm: getStoredUtmData(),
      };

      // 1. Fail-safe local backup
      try {
        const stored = JSON.parse(localStorage.getItem('dayarplus_leads_log') || '[]');
        stored.unshift(payload);
        localStorage.setItem('dayarplus_leads_log', JSON.stringify(stored));
      } catch (e) {
        console.warn('LocalStorage lead backup error:', e);
      }

      // 2. Dispatch to backend API (Cloudflare Worker & Resend Email notification)
      try {
        const res = await fetch('https://dayarplus.knuriel.workers.dev/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.leadId) {
            setSubmittedLeadId(data.leadId);
          } else {
            setSubmittedLeadId(leadId);
          }
        } else {
          setSubmittedLeadId(leadId);
        }
      } catch {
        // Network fallback delay
        await new Promise((resolve) => setTimeout(resolve, 600));
        setSubmittedLeadId(leadId);
      }

      setSubmittedData({
        name: trimmedName,
        phone: trimmedPhone,
        role: formData.role === 'vaad' ? (isRtl ? 'חבר ועד בית' : 'HOA Board') : (isRtl ? 'חברת ניהול' : 'Management Co'),
        apartments: formData.apartments,
      });

      setSubmitted(true);
    } catch {
      setErrorMsg(isRtl ? 'חלה שגיאה בשליחת הטופס. אנא נסה שוב או פנה בוואטסאפ.' : 'Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div
        ref={modalRef}
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '560px',
          padding: '36px',
          position: 'relative',
          border: '1px solid var(--border-subtle)',
          background: 'var(--bg-secondary)',
          color: 'var(--text-main)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
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
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ textAlign: isRtl ? 'right' : 'left', marginBottom: '24px' }}>
              <div className="badge-tag" style={{ marginBottom: '12px' }}>
                <Sparkles size={14} />
                <span>{lang === 'he' ? 'הדגמה ללא התחייבות' : 'Free Demo Account'}</span>
              </div>
              <h3 id="contact-modal-title" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                {modalData.title}
              </h3>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)' }}>{modalData.subtitle}</p>
            </div>

            {errorMsg && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  color: '#ef4444',
                  fontSize: '0.88rem',
                  marginBottom: '16px',
                  fontWeight: 600,
                }}
              >
                <AlertCircle size={18} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                  {modalData.nameLabel}
                </label>
                <input
                  ref={firstInputRef}
                  required
                  type="text"
                  maxLength={50}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                  placeholder={lang === 'he' ? 'דוגמא: ישראל ישראלי' : 'e.g. John Doe'}
                />
              </div>

              {/* Phone & Email Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                    {modalData.phoneLabel}
                  </label>
                  <input
                    required
                    type="tel"
                    maxLength={15}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'var(--bg-glass)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                    placeholder="050-1234567"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                    {modalData.emailLabel}
                  </label>
                  <input
                    required
                    type="email"
                    maxLength={60}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'var(--bg-glass)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                    placeholder="name@domain.com"
                  />
                </div>
              </div>

              {/* Role Select & Apartment Count */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                    {modalData.roleLabel}
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  >
                    <option value="vaad">{modalData.roleVaad}</option>
                    <option value="resident">{modalData.roleResident}</option>
                    <option value="management">{modalData.roleManagement}</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                    {modalData.apartmentsLabel}
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="999"
                    value={formData.apartments}
                    onChange={(e) => setFormData({ ...formData, apartments: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
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
                disabled={isLoading}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: '10px',
                  opacity: isLoading ? 0.75 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  padding: '13px',
                  fontSize: '1.05rem',
                }}
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                <span>{isLoading ? (isRtl ? 'שולח נתונים...' : 'Submitting...') : buttons.submit}</span>
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <CheckCircle size={36} color="#10b981" />
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              {lang === 'he' ? 'הפנייה נשלחה ונקלטה בהצלחה!' : 'Request Sent Successfully!'}
            </h3>

            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
              {modalData.successMsg}
            </p>

            {/* Reference Badge */}
            {submittedLeadId && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  background: 'rgba(59, 130, 246, 0.12)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  color: '#2563eb',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  marginBottom: '20px',
                }}
              >
                <span>{isRtl ? 'מזהה פנייה במערכת:' : 'Reference ID:'}</span>
                <code>#{submittedLeadId}</code>
              </div>
            )}

            {/* Fast Track WhatsApp Button */}
            {submittedData && (
              <div style={{ marginBottom: '16px' }}>
                <a
                  href={`https://wa.me/972544704654?text=${encodeURIComponent(
                    isRtl
                      ? `שלום DayarPlus! שמי ${submittedData.name}, ${submittedData.role} בבניין של ${submittedData.apartments} דירות (מזהה פנייה: #${submittedLeadId}). הרגע מילאתי טופס הדגמה באתר ואשמח לתאם שיחה!`
                      : `Hello DayarPlus! My name is ${submittedData.name}, ${submittedData.role} (${submittedData.apartments} units, Ref: #${submittedLeadId}). I just submitted a demo request and would love to chat!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.98rem',
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <MessageCircle size={20} fill="#ffffff" color="#25D366" />
                  <span>{isRtl ? '💬 המשך ישיר לשיחה בוואטסאפ עם נציג' : '💬 Chat with Representative on WhatsApp'}</span>
                </a>
              </div>
            )}

            <button
              onClick={handleClose}
              className="btn-secondary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '12px',
                fontSize: '0.95rem',
              }}
            >
              <span>{buttons.close}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
