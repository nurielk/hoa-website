import React, { useEffect } from 'react';
import { AlertTriangle, Info, X } from 'lucide-react';
import { Language } from '../../types';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: 'warning' | 'danger' | 'info';
  lang?: Language;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel,
  cancelLabel,
  type = 'warning',
  lang = 'he',
}) => {
  const isRtl = lang === 'he';

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter') {
        onConfirm();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onConfirm]);

  if (!isOpen) return null;

  const defaultConfirmText = confirmLabel || (isRtl ? 'אישור' : 'Confirm');
  const defaultCancelText = cancelLabel || (isRtl ? 'ביטול' : 'Cancel');

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <AlertTriangle size={24} color="#ef4444" />;
      case 'info':
        return <Info size={24} color="#3b82f6" />;
      case 'warning':
      default:
        return <AlertTriangle size={24} color="#f59e0b" />;
    }
  };

  const getButtonBg = () => {
    switch (type) {
      case 'danger':
        return 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)';
      case 'info':
        return 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
      case 'warning':
      default:
        return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10050,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
      role="alertdialog"
      aria-modal="true"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '460px',
          width: '100%',
          padding: '28px',
          borderRadius: '20px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
          animation: 'toastSlideIn 0.25s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '18px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {getIcon()}
          </div>

          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
              {title}
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {message}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label={isRtl ? 'סגור' : 'Close'}
            style={{
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '24px' }}>
          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '9px 18px', fontSize: '0.9rem' }}
          >
            {defaultCancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="btn-primary"
            style={{
              background: getButtonBg(),
              padding: '9px 20px',
              fontSize: '0.9rem',
            }}
          >
            {defaultConfirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
