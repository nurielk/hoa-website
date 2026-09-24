import React, { useState, useMemo } from 'react';
import { FaqItem } from '../types';
import { ChevronDown, ChevronUp, HelpCircle, Search, X, Copy, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { LastUpdatedBadge } from './features/LastUpdatedBadge';

interface FaqSectionProps {
  faqData: {
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  lang?: 'he' | 'en';
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqData, lang = 'he' }) => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { copyToClipboard } = useToast();
  const isRtl = lang === 'he';

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    if (openIds.length === faqData.items.length) {
      setOpenIds([]);
    } else {
      setOpenIds(faqData.items.map((i) => i.id));
    }
  };

  const handleCopyQuestion = async (item: FaqItem) => {
    const textToCopy = `${item.question}\n\n${item.answer}`;
    await copyToClipboard(
      textToCopy,
      isRtl ? 'תשובה הועתקה ללוח בהצלחה!' : 'FAQ answer copied to clipboard!'
    );
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = [
    { id: 'all', label: isRtl ? 'כל השאלות' : 'All Topics' },
    { id: 'general', label: isRtl ? 'כללי והקמה' : 'General' },
    { id: 'payments', label: isRtl ? 'תשלומים וסליקה' : 'Payments' },
    { id: 'vaad', label: isRtl ? 'ועד בית' : 'HOA Committee' },
    { id: 'management', label: isRtl ? 'חברות ניהול' : 'Management' },
  ];

  const filteredItems = useMemo(() => {
    let result = faqData.items;

    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
      );
    }

    return result;
  }, [faqData.items, selectedCategory, searchQuery]);

  return (
    <section id="faq" style={{ padding: '90px 0', background: 'var(--bg-glass)' }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div className="badge-tag">
              <HelpCircle size={14} />
              <span>FAQ</span>
            </div>
            <LastUpdatedBadge lang={lang} />
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)' }}>
            {faqData.title}
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{faqData.subtitle}</p>
        </div>

        {/* Dynamic FAQ Search Input */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: isRtl ? '16px' : 'auto',
              left: isRtl ? 'auto' : '16px',
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
            placeholder={
              isRtl
                ? 'חיפוש מהיר בשאלות נפוצות (לדוגמה: אשראי, דוחות, ביטול)...'
                : 'Search FAQ (e.g. credit card, cancel, security, reports)...'
            }
            aria-label={isRtl ? 'חיפוש בשאלות נפוצות' : 'Search FAQ'}
            style={{
              width: '100%',
              padding: isRtl ? '14px 44px 14px 18px' : '14px 18px 14px 44px',
              borderRadius: '14px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
              fontSize: '1rem',
              outline: 'none',
              boxShadow: 'var(--shadow-card)',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label={isRtl ? 'נקה חיפוש' : 'Clear search'}
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                left: isRtl ? '16px' : 'auto',
                right: isRtl ? 'auto' : '16px',
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

        {/* Categories Bar & Expand All */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '28px',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}
                style={{
                  padding: '6px 14px',
                  fontSize: '0.82rem',
                  borderRadius: '9999px',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleExpandAll}
            className="btn-secondary"
            style={{ padding: '6px 14px', fontSize: '0.82rem', borderRadius: '9999px' }}
          >
            {openIds.length === faqData.items.length
              ? (isRtl ? 'כווץ הכל' : 'Collapse All')
              : (isRtl ? 'פתח הכל' : 'Expand All')}
          </button>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <p>{isRtl ? 'לא נמצאו שאלות התואמות לחיפוש.' : 'No matching questions found.'}</p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isOpen = openIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="glass-panel"
                  style={{
                    borderRadius: '16px',
                    border: isOpen
                      ? '1px solid rgba(59, 130, 246, 0.4)'
                      : '1px solid var(--border-subtle)',
                    overflow: 'hidden',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-main)',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      textAlign: isRtl ? 'right' : 'left',
                      cursor: 'pointer',
                      gap: '16px',
                    }}
                  >
                    <span style={{ flex: 1 }}>{item.question}</span>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: isOpen ? 'rgba(59, 130, 246, 0.2)' : 'var(--bg-glass)',
                        color: isOpen ? '#60a5fa' : 'var(--text-muted)',
                        transition: 'all 0.2s ease',
                        flexShrink: 0,
                      }}
                    >
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 24px 22px',
                        color: 'var(--text-muted)',
                        fontSize: '0.98rem',
                        lineHeight: 1.7,
                        borderTop: '1px solid var(--border-subtle)',
                        paddingTop: '16px',
                      }}
                    >
                      <p>{item.answer}</p>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          marginTop: '12px',
                        }}
                      >
                        <button
                          onClick={() => handleCopyQuestion(item)}
                          className="btn-secondary"
                          style={{
                            padding: '4px 10px',
                            fontSize: '0.78rem',
                            gap: '4px',
                          }}
                          title={isRtl ? 'העתק תשובה ללוח' : 'Copy answer'}
                        >
                          {copiedId === item.id ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                          <span>{copiedId === item.id ? (isRtl ? 'הועתק!' : 'Copied!') : (isRtl ? 'העתק תשובה' : 'Copy')}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
