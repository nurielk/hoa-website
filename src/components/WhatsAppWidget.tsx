import React, { useState } from 'react';
import { Language } from '../types';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppWidgetProps {
  lang: Language;
  phoneNumber?: string;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  lang,
  phoneNumber = '972544704654',
}) => {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const isRtl = lang === 'he';

  const defaultMessage = isRtl
    ? encodeURIComponent('שלום, אשמח לקבל פרטים נוספים והדגמה על מערכת DayarPlus לניהול הבניין.')
    : encodeURIComponent('Hello, I would like more information and a demo of DayarPlus building management platform.');

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: isRtl ? '24px' : 'auto',
        right: isRtl ? 'auto' : '24px',
        zIndex: 990,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexDirection: isRtl ? 'row-reverse' : 'row',
      }}
    >
      {/* Floating Prompt Tooltip */}
      {!tooltipDismissed && (
        <div
          className="glass-panel"
          style={{
            padding: '10px 14px',
            borderRadius: '12px',
            border: '1px solid rgba(52, 211, 153, 0.4)',
            background: 'rgba(6, 78, 59, 0.85)',
            backdropFilter: 'blur(10px)',
            color: '#ffffff',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
            animation: 'fadeIn 0.4s ease',
          }}
        >
          <span>{isRtl ? 'צריכים עזרה? דברו איתנו בוואטסאפ' : 'Need help? Chat with us on WhatsApp'}</span>
          <button
            onClick={() => setTooltipDismissed(true)}
            aria-label={isRtl ? 'סגור הודעה' : 'Dismiss'}
            style={{
              background: 'none',
              border: 'none',
              color: '#d1fae5',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Floating WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isRtl ? 'פתח שיחת WhatsApp עם נציג DayarPlus' : 'Chat on WhatsApp with DayarPlus'}
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
          transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(37, 211, 102, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.45)';
        }}
      >
        <MessageCircle size={30} fill="#ffffff" color="#25D366" />
      </a>
    </div>
  );
};
