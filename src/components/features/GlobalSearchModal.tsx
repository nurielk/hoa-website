import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, ArrowLeft, ArrowRight, Zap, HelpCircle, Layers, Tag, Calculator } from 'lucide-react';
import { Language } from '../../types';
import { contentData } from '../../data/contentData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  targetId: string;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const currentContent = contentData[lang];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K & Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Index searchable items
  const allSearchableItems = useMemo<SearchResultItem[]>(() => {
    const items: SearchResultItem[] = [];

    // Features
    currentContent.features.items.forEach((f) => {
      items.push({
        id: `feat-${f.id}`,
        title: f.title,
        description: f.description,
        category: isRtl ? 'תכונה' : 'Feature',
        icon: <Zap size={16} color="#60a5fa" />,
        targetId: 'features',
      });
    });

    // FAQs
    currentContent.faq.items.forEach((faq) => {
      items.push({
        id: faq.id,
        title: faq.question,
        description: faq.answer,
        category: isRtl ? 'שאלות ותשובות' : 'FAQ',
        icon: <HelpCircle size={16} color="#34d399" />,
        targetId: 'faq',
      });
    });

    // Solutions
    items.push({
      id: 'sol-vaad',
      title: currentContent.solutions.vaad.title,
      description: currentContent.solutions.vaad.subtitle,
      category: isRtl ? 'פתרונות' : 'Solutions',
      icon: <Layers size={16} color="#a78bfa" />,
      targetId: 'solutions',
    });
    items.push({
      id: 'sol-management',
      title: currentContent.solutions.management.title,
      description: currentContent.solutions.management.subtitle,
      category: isRtl ? 'פתרונות' : 'Solutions',
      icon: <Layers size={16} color="#a78bfa" />,
      targetId: 'solutions',
    });

    // Pricing
    currentContent.pricing.plans.forEach((plan) => {
      items.push({
        id: `price-${plan.id}`,
        title: plan.name,
        description: `${plan.tagline} - ${plan.priceMonthly}`,
        category: isRtl ? 'מחירון' : 'Pricing',
        icon: <Tag size={16} color="#fbbf24" />,
        targetId: 'pricing',
      });
    });

    // Calculator
    items.push({
      id: 'calc-savings',
      title: currentContent.calculator.title,
      description: currentContent.calculator.subtitle,
      category: isRtl ? 'כלים' : 'Tools',
      icon: <Calculator size={16} color="#06b6d4" />,
      targetId: 'calculator',
    });

    return items;
  }, [currentContent, isRtl]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return allSearchableItems.slice(0, 5); // top suggestions
    }
    const q = query.toLowerCase().trim();
    return allSearchableItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query, allSearchableItems]);

  const handleSelect = (targetId: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.style.transition = 'box-shadow 0.4s ease';
        el.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.6)';
        setTimeout(() => {
          el.style.boxShadow = '';
        }, 1800);
      }
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'rgba(5, 8, 16, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px 20px 20px',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '650px',
          width: '100%',
          borderRadius: '20px',
          overflow: 'hidden',
          background: 'var(--bg-secondary)',
          border: '1px solid rgba(59, 130, 246, 0.35)',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6)',
          animation: 'toastSlideIn 0.25s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <Search size={20} color="#60a5fa" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isRtl
                ? 'חיפוש באתר (תכונות, שאלות נפוצות, מחירון, מחשבון)...'
                : 'Search DayarPlus (features, FAQ, pricing, calculator)...'
            }
            aria-label={isRtl ? 'חיפוש גלובלי' : 'Global search'}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              fontSize: '1.05rem',
              outline: 'none',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                display: 'flex',
                padding: '4px',
              }}
            >
              <X size={18} />
            </button>
          )}
          <kbd
            style={{
              padding: '3px 8px',
              fontSize: '0.75rem',
              borderRadius: '6px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#9ca3af',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          style={{
            maxHeight: '380px',
            overflowY: 'auto',
            padding: '12px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {filteredResults.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 20px', color: '#9ca3af' }}>
              <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                {isRtl ? 'לא נמצאו תוצאות לחיפוש זה' : 'No results found'}
              </p>
              <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>
                {isRtl
                  ? 'נסו לחפש מילות מפתח אחרות כמו: גבייה, אפליקציה, מחיר, אשראי'
                  : 'Try searching for keywords like: payments, app, pricing, support'}
              </p>
            </div>
          ) : (
            filteredResults.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.targetId)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'transparent',
                  border: '1px solid transparent',
                  cursor: 'pointer',
                  textAlign: isRtl ? 'right' : 'left',
                  width: '100%',
                  color: 'inherit',
                  transition: 'background 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      {item.title}
                    </span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: '#9ca3af',
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-muted)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                <ArrowIcon size={16} color="#60a5fa" />
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div
          style={{
            padding: '10px 20px',
            background: 'rgba(0, 0, 0, 0.2)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.78rem',
            color: '#9ca3af',
          }}
        >
          <span>{isRtl ? 'לחצו על תוצאה לגלילה מהירה למקטע' : 'Click to jump to section'}</span>
          <span>{isRtl ? 'DayarPlus Search v2.4' : 'DayarPlus Search v2.4'}</span>
        </div>
      </div>
    </div>
  );
};
