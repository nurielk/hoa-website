import React, { useState } from 'react';
import { MessageCircle, Phone, Calendar, X } from 'lucide-react';
import { Language } from '../../types';

interface FloatingContactHubProps {
  lang: Language;
  onOpenDemoModal: () => void;
  phoneNumber?: string;
}

export const FloatingContactHub: React.FC<FloatingContactHubProps> = ({
  lang,
  onOpenDemoModal,
  phoneNumber = '972544704654',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isRtl = lang === 'he';

  const defaultWaMessage = isRtl
    ? encodeURIComponent('שלום, אשמח לקבל פרטים נוספים והדגמה על מערכת DayarPlus לניהול הבניין.')
    : encodeURIComponent('Hello, I would like more information and a demo of DayarPlus building management platform.');

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultWaMessage}`;

  return (
    <div
      className="floating-contact-hub no-print"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: isRtl ? '24px' : 'auto',
        right: isRtl ? 'auto' : '24px',
        zIndex: 990,
        display: 'flex',
        flexDirection: 'column',
        alignItems: isRtl ? 'flex-start' : 'flex-end',
        gap: '12px',
      }}
    >
      {/* Speed Dial Options */}
      {isOpen && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: isRtl ? 'flex-start' : 'flex-end',
            animation: 'toastSlideIn 0.25s ease',
          }}
        >
          {/* 1. Schedule Demo */}
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenDemoModal();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 16px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(37, 99, 235, 0.4)',
              fontSize: '0.88rem',
              fontWeight: 700,
              flexDirection: isRtl ? 'row-reverse' : 'row',
            }}
          >
            <span>{isRtl ? 'תיאום הדגמה וניסיון חינם' : 'Schedule Demo'}</span>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Calendar size={16} />
            </div>
          </button>

          {/* 2. Direct WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 16px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              color: '#ffffff',
              textDecoration: 'none',
              boxShadow: '0 6px 18px rgba(37, 211, 102, 0.4)',
              fontSize: '0.88rem',
              fontWeight: 700,
              flexDirection: isRtl ? 'row-reverse' : 'row',
            }}
          >
            <span>{isRtl ? 'שיחה ישירה בוואטסאפ' : 'WhatsApp Chat'}</span>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MessageCircle size={16} />
            </div>
          </a>

          {/* 3. Phone Call */}
          <a
            href="tel:0771234567"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 16px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#ffffff',
              textDecoration: 'none',
              boxShadow: '0 6px 18px rgba(245, 158, 11, 0.4)',
              fontSize: '0.88rem',
              fontWeight: 700,
              flexDirection: isRtl ? 'row-reverse' : 'row',
            }}
          >
            <span>{isRtl ? 'חיוג מהיר למוקד: 077-1234567' : 'Call Support: 077-1234567'}</span>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Phone size={16} />
            </div>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isRtl ? 'פתח תפריט יצירת קשר מהיר' : 'Open quick contact menu'}
        aria-expanded={isOpen}
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: isOpen
            ? '#ef4444'
            : 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          color: '#ffffff',
          border: 'none',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};
