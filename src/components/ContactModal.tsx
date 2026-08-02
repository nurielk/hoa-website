import React, { useState } from 'react';
import { Language } from '../types';
import { X, CheckCircle, Sparkles, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  modalData: any;
  buttons: Record<string, string>;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  lang,
  modalData,
  buttons,
}) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: 'vaad',
    apartments: '24',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after 3 seconds
    }, 3000);
  };

  const isRtl = lang === 'he';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '560px',
          padding: '36px',
          position: 'relative',
          border: '1px solid rgba(59, 130, 246, 0.4)',
          background: '#111827',
          borderRadius: '24px',
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

        {!submitted ? (
          <div>
            <div style={{ textAlign: isRtl ? 'right' : 'left', marginBottom: '24px' }}>
              <div className="badge-tag" style={{ marginBottom: '12px' }}>
                <Sparkles size={14} />
                <span>{lang === 'he' ? 'הדגמה ללא התחייבות' : 'Free Demo Account'}</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                {modalData.title}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#9ca3af' }}>{modalData.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#d1d5db', marginBottom: '6px' }}>
                  {modalData.nameLabel}
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                  placeholder={lang === 'he' ? 'דוגמא: ישראל ישראלי' : 'e.g. John Doe'}
                />
              </div>

              {/* Phone & Email Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#d1d5db', marginBottom: '6px' }}>
                    {modalData.phoneLabel}
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                    placeholder="050-1234567"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#d1d5db', marginBottom: '6px' }}>
                    {modalData.emailLabel}
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                    placeholder="name@domain.com"
                  />
                </div>
              </div>

              {/* Role Select & Apartment Count */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#d1d5db', marginBottom: '6px' }}>
                    {modalData.roleLabel}
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: '#1f2937',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
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
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#d1d5db', marginBottom: '6px' }}>
                    {modalData.apartmentsLabel}
                  </label>
                  <input
                    type="number"
                    value={formData.apartments}
                    onChange={(e) => setFormData({ ...formData, apartments: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                <Send size={18} />
                <span>{buttons.submit}</span>
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <CheckCircle size={36} color="#34d399" />
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
              {lang === 'he' ? 'הפנייה נשלחה בהצלחה!' : 'Request Sent Successfully!'}
            </h3>
            <p style={{ fontSize: '1.05rem', color: '#9ca3af', marginBottom: '24px' }}>
              {modalData.successMsg}
            </p>
            <button onClick={onClose} className="btn-secondary">
              {buttons.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
