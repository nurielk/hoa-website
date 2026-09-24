import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
  copyToClipboard: (text: string, successMessage?: string) => Promise<boolean>;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 3500);
  }, [removeToast]);

  const copyToClipboard = useCallback(
    async (text: string, successMessage = 'הועתק ללוח בהצלחה!') => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        showToast(successMessage, 'success');
        return true;
      } catch (err) {
        showToast('שגיאה בהעתקה ללוח', 'error');
        return false;
      }
    },
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, copyToClipboard }}>
      {children}
      {/* Toast Notification Container */}
      <div
        aria-live="polite"
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="toast-notification"
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              borderRadius: '12px',
              background:
                toast.type === 'success'
                  ? 'rgba(6, 78, 59, 0.95)'
                  : toast.type === 'error'
                  ? 'rgba(153, 27, 27, 0.95)'
                  : 'rgba(30, 58, 138, 0.95)',
              border:
                toast.type === 'success'
                  ? '1px solid rgba(52, 211, 153, 0.5)'
                  : toast.type === 'error'
                  ? '1px solid rgba(248, 113, 113, 0.5)'
                  : '1px solid rgba(96, 165, 250, 0.5)',
              color: '#ffffff',
              boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(12px)',
              fontSize: '0.92rem',
              fontWeight: 600,
              minWidth: '260px',
              animation: 'toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {toast.type === 'success' && <CheckCircle2 size={18} color="#34d399" />}
            {toast.type === 'error' && <AlertCircle size={18} color="#f87171" />}
            {toast.type === 'info' && <Info size={18} color="#60a5fa" />}
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              aria-label="סגור הודעה"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                display: 'flex',
                padding: '2px',
              }}
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
