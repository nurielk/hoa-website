import React, { useState, useMemo } from 'react';
import { FaqItem } from '../types';
import { ChevronDown, HelpCircle, Search, X } from 'lucide-react';

interface FaqSectionProps {
  faqData: {
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqData }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return faqData.items;
    const q = searchQuery.toLowerCase().trim();
    return faqData.items.filter(
      (item) =>
        item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
    );
  }, [faqData.items, searchQuery]);

  return (
    <section id="faq" style={{ padding: '90px 0', background: 'rgba(17, 24, 39, 0.4)' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge-tag" style={{ marginBottom: '16px' }}>
            <HelpCircle size={14} />
            <span>FAQ</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '16px' }}>
            {faqData.title}
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#9ca3af' }}>{faqData.subtitle}</p>
        </div>

        {/* Dynamic FAQ Search Input */}
        <div style={{ position: 'relative', marginBottom: '32px' }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: '16px',
              color: '#60a5fa',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="חיפוש מהיר בשאלות נפוצות (לדוגמה: אשראי, דוחות, ביטול)..."
            aria-label="חיפוש בשאלות נפוצות"
            style={{
              width: '100%',
              padding: '14px 44px 14px 18px',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#ffffff',
              fontSize: '1rem',
              outline: 'none',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="נקה חיפוש"
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                left: '16px',
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Accordion Items */}
        {filteredItems.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#9ca3af',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '16px',
              border: '1px dashed rgba(255, 255, 255, 0.1)',
            }}
          >
            לא נמצאו שאלות התואמות לחיפוש "{searchQuery}". נסו מילות מפתח אחרות.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredItems.map((item) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  className="glass-panel"
                  style={{
                    padding: '20px 24px',
                    border: isOpen ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  <button
                    type="button"
                    id={`faq-btn-${item.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    onClick={() => toggleOpen(item.id)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: 'inherit',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      textAlign: 'inherit',
                      outline: 'none',
                    }}
                  >
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                      {item.question}
                    </h3>
                    <div
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        flexShrink: 0,
                      }}
                    >
                      <ChevronDown size={20} color="#60a5fa" />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${item.id}`}
                      style={{
                        marginTop: '16px',
                        paddingTop: '16px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        fontSize: '1rem',
                        color: '#9ca3af',
                        lineHeight: 1.6,
                      }}
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
