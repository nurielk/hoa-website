import React, { useState } from 'react';
import { Language } from '../types';
import {
  Building2,
  CreditCard,
  Wrench,
  Vote,
  LogOut,
  Plus,
  ShieldCheck,
  LayoutDashboard,
  FileSpreadsheet,
  CheckCircle2,
  Download,
} from 'lucide-react';

interface AppPortalDashboardProps {
  lang: Language;
  userRole: 'resident' | 'vaad' | 'management';
  buildingName: string;
  onLogout: () => void;
}

export const AppPortalDashboard: React.FC<AppPortalDashboardProps> = ({
  lang,
  userRole,
  buildingName,
  onLogout,
}) => {
  const isRtl = lang === 'he';

  const [activeTab, setActiveTab] = useState<'overview' | 'dues' | 'tickets' | 'voting' | 'reports'>('overview');
  const [duesPaid, setDuesPaid] = useState(false);
  const [tickets, setTickets] = useState([
    { id: 1, title: isRtl ? 'תאורת חירום תקולה בקומה 3' : 'Emergency lighting issue floor 3', status: isRtl ? 'בטיפול ספק' : 'In Progress', date: '31/07/2026' },
    { id: 2, title: isRtl ? 'נזילת מים קלה בחדר משאבות' : 'Minor leak in pump room', status: isRtl ? 'חדש - הועבר לטיפול' : 'New Dispatch', date: '30/07/2026' },
  ]);
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [showAddTicket, setShowAddTicket] = useState(false);
  const [selectedVote, setSelectedVote] = useState<'yes' | 'no' | null>(null);

  const handlePayDues = () => {
    setDuesPaid(true);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketTitle.trim()) return;
    setTickets([
      { id: Date.now(), title: newTicketTitle, status: isRtl ? 'חדש - בבדיקה' : 'New', date: '31/07/2026' },
      ...tickets,
    ]);
    setNewTicketTitle('');
    setShowAddTicket(false);
  };

  const roleTitle =
    userRole === 'vaad'
      ? (isRtl ? 'מנהל ועד בית' : 'Building Board Admin')
      : userRole === 'management'
      ? (isRtl ? 'נציג חברת ניהול' : 'Property Manager')
      : (isRtl ? 'דייר מאומת (דירה 14)' : 'Verified Resident (Apt 14)');

  const tabs = [
    { id: 'overview', label: isRtl ? 'סקירה כללית' : 'Overview', icon: LayoutDashboard },
    { id: 'dues', label: isRtl ? 'דמי ועד וגבייה' : 'Dues & Fees', icon: CreditCard },
    { id: 'tickets', label: isRtl ? 'קריאות שירות' : 'Tickets', icon: Wrench },
    { id: 'voting', label: isRtl ? 'הצבעות דיירים' : 'Voting', icon: Vote },
    { id: 'reports', label: isRtl ? 'דוחות כספיים' : 'Reports', icon: FileSpreadsheet },
  ] as const;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-main)',
        paddingBottom: '80px',
      }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Top Header Bar */}
      <header
        style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '16px 24px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(16px)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
              }}
            >
              <Building2 size={24} color="#ffffff" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{buildingName}</h1>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: 'rgba(52, 211, 153, 0.15)',
                    color: '#34d399',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  {isRtl ? 'מערכת פעילה' : 'Active System'}
                </span>
              </div>
              <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{roleTitle}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={onLogout}
              className="btn-secondary"
              style={{
                padding: '8px 16px',
                fontSize: '0.85rem',
                gap: '6px',
              }}
            >
              <LogOut size={16} />
              <span>{isRtl ? 'יציאה מהמערכת' : 'Log Out'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div
          className="container"
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '16px',
            overflowX: 'auto',
            paddingBottom: '4px',
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: isActive ? '1px solid rgba(59, 130, 246, 0.6)' : '1px solid var(--border-subtle)',
                  background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-glass)',
                  color: isActive ? '#2563eb' : 'var(--text-muted)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main App Portal Dashboard Content */}
      <main className="container" style={{ marginTop: '30px' }}>
        {/* Banner Alert */}
        <div
          style={{
            padding: '16px 20px',
            background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.25)',
            borderRadius: '16px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={24} color="#10b981" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                {isRtl ? 'ברוך הבא לפורטל הניהול הישיר של הבניין!' : 'Welcome to Your Direct Building Portal!'}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {isRtl
                  ? 'אתה מחובר כעת ישירות למערכת DayarPlus. כל הנתונים, הגבייה והתקלות מסונכרנים בזמן אמת.'
                  : 'You are directly connected into the live DayarPlus system. All dues, issues, and voting are synced.'}
              </div>
            </div>
          </div>
        </div>

        {/* Tab 1: Overview or Dues */}
        {(activeTab === 'overview' || activeTab === 'dues') && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '18px',
              marginBottom: '32px',
            }}
          >
            {/* Card 1: Dues */}
            <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{isRtl ? 'סטטוס תשלום ועד חודשי' : 'Monthly Dues Status'}</span>
                <CreditCard size={20} color="#3b82f6" />
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: duesPaid ? '#10b981' : '#f59e0b', marginBottom: '4px' }}>
                {duesPaid ? (isRtl ? 'שולם בהצלחה (₪450)' : 'Paid ($150)') : (isRtl ? 'ממתין לתשלום (₪450)' : 'Pending ($150)')}
              </div>
              {!duesPaid ? (
                <button
                  onClick={handlePayDues}
                  className="btn-primary"
                  style={{ width: '100%', padding: '8px', marginTop: '10px', fontSize: '0.85rem', justifyContent: 'center' }}
                >
                  <span>{isRtl ? 'שלם עכשיו באשראי / ביט' : 'Pay Now via Credit/Bit'}</span>
                </button>
              ) : (
                <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 600, display: 'block', marginTop: '8px' }}>
                  ✓ {isRtl ? 'קבלה 2026-9988 נשלחה לנייד' : 'Receipt #2026-9988 issued'}
                </span>
              )}
            </div>

            {/* Card 2: Tickets */}
            <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{isRtl ? 'תקלות פתוחות בבניין' : 'Open Building Tickets'}</span>
                <Wrench size={20} color="#f59e0b" />
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                {tickets.length} {isRtl ? 'קריאות פעילות' : 'Active Tickets'}
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {isRtl ? 'ספק מעליות בדרך למתחם' : 'Vendor assigned'}
              </span>
            </div>

            {/* Card 3: Polls */}
            <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{isRtl ? 'הצבעה פעילה לבניין' : 'Active Building Poll'}</span>
                <Vote size={20} color="#8b5cf6" />
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                {isRtl ? 'עמדות טעינה לרכב חשמלי' : 'EV Charging Station Installation'}
              </div>
              <span style={{ fontSize: '0.8rem', color: '#10b981' }}>
                {selectedVote ? (isRtl ? '✓ הצבעתך נקלטה במערכת' : '✓ Vote Recorded') : (isRtl ? 'טרם הצבעת (נותרו 2 ימים)' : 'Voting Open')}
              </span>
            </div>
          </div>
        )}

        {/* Dynamic Section Areas */}
        {(activeTab === 'overview' || activeTab === 'tickets') && (
          <div style={{ marginBottom: '32px' }}>
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '14px',
                }}
              >
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{isRtl ? 'תקלות וקריאות שירות' : 'Building Maintenance Tickets'}</h2>
                <button
                  onClick={() => setShowAddTicket(!showAddTicket)}
                  className="btn-primary"
                  style={{ padding: '7px 14px', fontSize: '0.85rem' }}
                >
                  <Plus size={16} />
                  <span>{isRtl ? 'דווח על תקלה חדשה' : 'Report New Issue'}</span>
                </button>
              </div>

              {showAddTicket && (
                <form
                  onSubmit={handleCreateTicket}
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '16px',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                  }}
                >
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                    {isRtl ? 'תיאור התקלה / הבעיה:' : 'Issue Description:'}
                  </label>
                  <input
                    required
                    type="text"
                    value={newTicketTitle}
                    onChange={(e) => setNewTicketTitle(e.target.value)}
                    placeholder={isRtl ? 'דוגמא: נורה שרופה בלובי כניסה' : 'e.g. Broken light bulb in main lobby'}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'var(--bg-glass)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-main)',
                      marginBottom: '12px',
                      outline: 'none',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={() => setShowAddTicket(false)}
                      className="btn-secondary"
                      style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                    >
                      {isRtl ? 'ביטול' : 'Cancel'}
                    </button>
                    <button type="submit" className="btn-primary" style={{ padding: '6px 16px', fontSize: '0.85rem' }}>
                      {isRtl ? 'שלח דיווח' : 'Submit Ticket'}
                    </button>
                  </div>
                </form>
              )}

              {/* Tickets List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {tickets.map((t) => (
                  <div
                    key={t.id}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '12px',
                      background: 'var(--bg-glass)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '4px' }}>
                        {t.title}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.date}</div>
                    </div>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        background: 'rgba(245, 158, 11, 0.15)',
                        color: '#f59e0b',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                      }}
                    >
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Voting */}
        {(activeTab === 'overview' || activeTab === 'voting') && (
          <div style={{ marginBottom: '32px' }}>
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Vote size={22} color="#8b5cf6" />
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {isRtl ? 'הצבעת דיירים פעילה' : 'Active Digital Poll'}
                </h2>
              </div>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                {isRtl
                  ? 'האם לאשר התקנת תשתית טעינה לרכבים חשמליים בחניון התת-קרקעי (עלות מוערכת ₪15,000 מקופת הבניין)?'
                  : 'Approve EV charging station infrastructure deployment in the underground parking lot?'}
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setSelectedVote('yes')}
                  className={selectedVote === 'yes' ? 'btn-primary' : 'btn-secondary'}
                  style={{
                    flex: 1,
                    minWidth: '140px',
                    justifyContent: 'center',
                    background: selectedVote === 'yes' ? '#10b981' : undefined,
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>{isRtl ? 'בעד האישור' : 'Vote Yes'}</span>
                </button>
                <button
                  onClick={() => setSelectedVote('no')}
                  className={selectedVote === 'no' ? 'btn-primary' : 'btn-secondary'}
                  style={{
                    flex: 1,
                    minWidth: '140px',
                    justifyContent: 'center',
                    background: selectedVote === 'no' ? '#ef4444' : undefined,
                  }}
                >
                  <LogOut size={16} />
                  <span>{isRtl ? 'נגד האישור' : 'Vote No'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Reports */}
        {(activeTab === 'reports') && (
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {isRtl ? 'דוחות כספיים ומאזן שנתי' : 'Financial Ledger & P&L Reports'}
              </h2>
              <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                <Download size={16} />
                <span>{isRtl ? 'ייצוא לאקסל' : 'Export to Excel'}</span>
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '12px', textAlign: isRtl ? 'right' : 'left' }}>{isRtl ? 'חודש' : 'Month'}</th>
                    <th style={{ padding: '12px', textAlign: isRtl ? 'right' : 'left' }}>{isRtl ? 'הכנסות גבייה' : 'Collection'}</th>
                    <th style={{ padding: '12px', textAlign: isRtl ? 'right' : 'left' }}>{isRtl ? 'הוצאות ואחזקה' : 'Expenses'}</th>
                    <th style={{ padding: '12px', textAlign: isRtl ? 'right' : 'left' }}>{isRtl ? 'יתרת קופה' : 'Balance'}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { month: 'יולי 2026', income: '₪14,400', expense: '₪8,250', balance: '₪42,150' },
                    { month: 'יוני 2026', income: '₪14,400', expense: '₪6,100', balance: '₪36,000' },
                    { month: 'מאי 2026', income: '₪14,400', expense: '₪11,300', balance: '₪27,700' },
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{row.month}</td>
                      <td style={{ padding: '12px', color: '#10b981' }}>{row.income}</td>
                      <td style={{ padding: '12px', color: '#ef4444' }}>{row.expense}</td>
                      <td style={{ padding: '12px', fontWeight: 700 }}>{row.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
