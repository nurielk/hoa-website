import React, { useState } from 'react';
import { Bell, ChevronDown, ChevronUp, Share2, Printer } from 'lucide-react';
import { Language } from '../../types';
import { LastUpdatedBadge } from './LastUpdatedBadge';
import { useToast } from '../../context/ToastContext';

interface AnnouncementItem {
  id: string;
  title: string;
  category: 'feature' | 'security' | 'guide';
  date: string;
  badge: string;
  summary: string;
  fullText: string;
}

interface AnnouncementsSectionProps {
  lang: Language;
}

export const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'feature' | 'security' | 'guide'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { copyToClipboard } = useToast();
  const isRtl = lang === 'he';

  const announcements: AnnouncementItem[] = isRtl
    ? [
        {
          id: 'ann-1',
          title: 'גרסה 2.4 הושקה: תשלום בלחיצה ב-Apple Pay ו-Google Pay',
          category: 'feature',
          date: '20 בספטמבר 2026',
          badge: 'עדכון מערכת',
          summary: 'מהיום הדיירים בבניין שלכם יכולים לשלם את מסי הוועד ודמי האחזקה ב-Apple Pay ו-Google Pay ישירות מהסמארטפון.',
          fullText: 'השדרוג כולל ממשק תשלום אולטרה-מהיר ללא צורך בהקלדת מספר כרטיס אשראי. קבלות דיגיטליות מונפקות מיד ומתועדות בספר החשבונות של הבניין בזמן אמת. בנוסף, נתוני הסליקה מועברים ישירות לחשבון הבנק של הבניין ללא עיכובים.',
        },
        {
          id: 'ann-2',
          title: 'הנחיות בטיחות ובדיקת מעליות תקופתית לחורף',
          category: 'guide',
          date: '15 בספטמבר 2026',
          badge: 'מדריך לועד',
          summary: 'רשימת צ׳ק-ליסט מומלצת לוועדי בתים לקראת עונת החורף: תקינות משאבות ניקוז, בדיקת מעליות ואיטום גגות.',
          fullText: 'המערכת הוסיפה תבניות בדיקה מוכנות למנהלי ועד בית. תוכלו ליצור קריאת שירות מרוכזת לחברת המעליות ולאנשי איטום, לקבל הצעות מחיר ישירות לפורטל ולהחתים את הדיירים בסקר דיגיטלי על תקציב מיוחד.',
        },
        {
          id: 'ann-3',
          title: 'עמידה מחודשת בתקן אבטחת מידע PCI-DSS Level 1 ו-ISO 27001',
          category: 'security',
          date: '02 בספטמבר 2026',
          badge: 'אבטחת מידע',
          summary: 'פלטפורמת DayarPlus השלימה בהצלחה את ביקורת האבטחה השנתית המחמירה לתשתיות ענן וסליקה בנקאית.',
          fullText: 'כל הנתונים, פרטי הדיירים ומסמכי הוועד מוצפנים בהצפנת AES-256 במנוחה ובמעבר. פרוטוקול ההרשאות המתקדם מגן על פרטיות כל דייר בבניין ומונע גישה לא מורשית למסמכים פיננסיים.',
        },
      ]
    : [
        {
          id: 'ann-1',
          title: 'Release v2.4: Instant Apple Pay & Google Pay Dues Collection',
          category: 'feature',
          date: 'September 20, 2026',
          badge: 'Product Update',
          summary: 'Tenants can now settle monthly HOA fees and special assessments via 1-click Apple Pay and Google Pay on their phones.',
          fullText: 'Eliminating manual card entry leads to even faster payment resolution. Tax-compliant digital receipts are instantly dispatched and logged into the building accounting ledger in real-time.',
        },
        {
          id: 'ann-2',
          title: 'Winter Preparation & Elevator Maintenance Checklist',
          category: 'guide',
          date: 'September 15, 2026',
          badge: 'HOA Guide',
          summary: 'Actionable preventive maintenance guide for building committees: drainage pumps, elevator inspection, and roof waterproofing.',
          fullText: 'Utilize pre-configured maintenance ticket templates in DayarPlus to solicit contractor proposals and conduct digital resident votes for seasonal budget allocations.',
        },
        {
          id: 'ann-3',
          title: 'Annual PCI-DSS Level 1 & ISO 27001 Security Audit Passed',
          category: 'security',
          date: 'September 02, 2026',
          badge: 'Security Audit',
          summary: 'DayarPlus has re-certified its cloud infrastructure under strict global financial and data privacy standards.',
          fullText: 'All resident data, payment processing tokens, and HOA documents remain secured under AES-256 end-to-end encryption.',
        },
      ];

  const filtered = activeCategory === 'all'
    ? announcements
    : announcements.filter((a) => a.category === activeCategory);

  const handleShare = (item: AnnouncementItem) => {
    const url = `${window.location.origin}/#announcements`;
    copyToClipboard(
      `${item.title} - ${url}`,
      isRtl ? 'קישור להודעה הועתק ללוח!' : 'Announcement link copied!'
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section
      id="announcements"
      style={{
        padding: '90px 0',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div className="badge-tag">
              <Bell size={14} />
              <span>{isRtl ? 'לוח הודעות ועדכוני מערכת' : 'System Bulletins & Updates'}</span>
            </div>
            <LastUpdatedBadge lang={lang} />
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)' }}>
            {isRtl ? 'חדשות, עדכונים ומדריכים שוטפים' : 'Latest News & HOA Bulletins'}
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto' }}>
            {isRtl
              ? 'הישארו מעודכנים בכל התכונות החדשות, שינויי רגולציה וטיפים לניהול תקין של הבניין'
              : 'Stay in the loop with fresh platform releases, HOA regulations, and building management best practices'}
          </p>
        </div>

        {/* Filter Controls & Print Routine Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: isRtl ? 'כל ההודעות' : 'All Updates' },
              { id: 'feature', label: isRtl ? 'חידושים במערכת' : 'Features' },
              { id: 'guide', label: isRtl ? 'מדריכים לוועד' : 'Guides' },
              { id: 'security', label: isRtl ? 'אבטחה ורגולציה' : 'Security' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={activeCategory === tab.id ? 'btn-primary' : 'btn-secondary'}
                style={{
                  padding: '7px 16px',
                  fontSize: '0.85rem',
                  borderRadius: '9999px',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Print routine button (Feature 19) */}
          <button
            onClick={handlePrint}
            className="btn-secondary print-allow"
            style={{
              padding: '7px 16px',
              fontSize: '0.85rem',
              borderRadius: '9999px',
            }}
            title={isRtl ? 'הדפס הודעות ולוח מודעות' : 'Print notices'}
          >
            <Printer size={15} />
            <span>{isRtl ? 'הדפס לוח מודעות' : 'Print Bulletins'}</span>
          </button>
        </div>

        {/* Announcements List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filtered.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <article
                key={item.id}
                className="glass-panel hover-card-lift"
                style={{
                  padding: '24px 28px',
                  borderRadius: '18px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: '6px',
                        background:
                          item.category === 'feature'
                            ? 'rgba(59, 130, 246, 0.15)'
                            : item.category === 'security'
                            ? 'rgba(16, 185, 129, 0.15)'
                            : 'rgba(245, 158, 11, 0.15)',
                        color:
                          item.category === 'feature'
                            ? '#60a5fa'
                            : item.category === 'security'
                            ? '#34d399'
                            : '#fbbf24',
                      }}
                    >
                      {item.badge}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                      {item.date}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => handleShare(item)}
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      title={isRtl ? 'העתק קישור להודעה' : 'Copy link'}
                    >
                      <Share2 size={13} />
                      <span>{isRtl ? 'שיתוף' : 'Share'}</span>
                    </button>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    marginBottom: '8px',
                  }}
                >
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '14px' }}>
                  {item.summary}
                </p>

                {isExpanded && (
                  <div
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      background: 'var(--bg-glass)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.92rem',
                      color: 'var(--text-main)',
                      lineHeight: 1.7,
                      marginBottom: '14px',
                      animation: 'toastSlideIn 0.25s ease',
                    }}
                  >
                    {item.fullText}
                  </div>
                )}

                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#60a5fa',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: 0,
                  }}
                >
                  <span>{isExpanded ? (isRtl ? 'הסתר פירוט' : 'Show less') : (isRtl ? 'קרא עוד' : 'Read more')}</span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
