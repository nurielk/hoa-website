import React, { useState } from 'react';
import { FaqItem } from '../types';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  faqData: {
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqData }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" style={{ padding: '90px 0', background: 'rgba(17, 24, 39, 0.4)' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge-tag" style={{ marginBottom: '16px' }}>
            <HelpCircle size={14} />
            <span>FAQ</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '16px' }}>
            {faqData.title}
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#9ca3af' }}>{faqData.subtitle}</p>
        </div>

        {/* Accordion Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqData.items.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="glass-panel"
                style={{
                  padding: '20px 24px',
                  cursor: 'pointer',
                  border: isOpen ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                }}
                onClick={() => toggleOpen(item.id)}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
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
                </div>

                {isOpen && (
                  <p
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
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
