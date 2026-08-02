import React, { useState } from 'react';
import { Language } from '../types';
import {
  Building2,
  CreditCard,
  Wrench,
  Vote,
  LogOut,
  Bell,
  CheckCircle2,
  Plus,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  FileText,
  User,
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
      ? (isRtl ? 'מנהל ועד בית' : 'HOA Board Admin')
      : userRole === 'management'
      ? (isRtl ? 'נציג חברת ניהול' : 'Property Manager')
      : (isRtl ? 'דייר מאומת (דירה 14)' : 'Verified Resident (Apt 14)');

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0b0f19',
        color: '#ffffff',
        paddingBottom: '80px',
      }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Top Header Bar */}
      <header
        style={{
          background: 'rgba(17, 24, 39, 0.9)',
          borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
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
                  {isRtl ? 'מערכת פעילה' : 'Active HOA'}
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
      </header>

      {/* Main App Portal Dashboard Content */}
      <main className="container" style={{ marginTop: '30px' }}>
        {/* Banner Alert */}
        <div
          style={{
            padding: '16px 20px',
            background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
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
            <ShieldCheck size={24} color="#34d399" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#ffffff' }}>
                {isRtl ? 'ברוך הבא לפורטל הניהול הישיר של הבניין!' : 'Welcome to Your Direct Building Portal!'}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
                {isRtl
                  ? 'אתה מחובר כעת ישירות למערכת HOA. כל הנתונים, הגבייה והתקלות מסונכרנים בזמן אמת.'
                  : 'You are directly connected into the live HOA system. All dues, issues, and voting are synced.'}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Dashboard Stat Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '18px',
            marginBottom: '32px',
          }}
        >
          {/* Card 1: Dues */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{isRtl ? 'סטטוס תשלום ועד חודשי' : 'Monthly Dues Status'}</span>
              <CreditCard size={20} color="#60a5fa" />
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: duesPaid ? '#34d399' : '#fbbf24', marginBottom: '4px' }}>
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
              <span style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 600, display: 'block', marginTop: '8px' }}>
                ✓ {isRtl ? 'קבלה 2026-9988 נשלחה לנייד' : 'Receipt #2026-9988 issued'}
              </span>
            )}
          </div>

          {/* Card 2: Tickets */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{isRtl ? 'תקלות פתוחות בבניין' : 'Open Building Tickets'}</span>
              <Wrench size={20} color="#f59e0b" />
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
              {tickets.length} {isRtl ? 'קריאות פעילות' : 'Active Tickets'}
            </div>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
              {isRtl ? 'ספק מעליות בדרך למתחם' : 'Vendor assigned'}
            </span>
          </div>

          {/* Card 3: Polls */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{isRtl ? 'הצבעה פעילה לבניין' : 'Active Building Poll'}</span>
              <Vote size={20} color="#a855f7" />
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
              {isRtl ? 'עמדות טעינה לרכב חשמלי' : 'EV Charging Station Installation'}
            </div>
            <span style={{ fontSize: '0.8rem', color: '#34d399' }}>
              {selectedVote ? (isRtl ? '✓ הצבעתך נקלטה במערכת' : '✓ Vote Recorded') : (isRtl ? 'טרם הצבעת (נותרו 2 ימים)' : 'Voting Open')}
            </span>
          </div>
        </div>

        {/* Interactive Sections */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }} className="portal-grid">
          {/* Main Work Area */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
            <div
              style={{
                display: 'flex',
                justify: 'space-between',
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
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px' }}>
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
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
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
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff', marginBottom: '4px' }}>
                      {t.title}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#9ca3af' }}>{t.date}</div>
                  </div>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      background: 'rgba(245, 158, 11, 0.15)',
                      color: '#fbbf24',
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

          {/* Voting Box */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>
              {isRtl ? 'סקר בניין פעיל' : 'Active Community Poll'}
            </h2>
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                padding: '16px',
                borderRadius: '14px',
              }}
            >
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#93c5fd', marginBottom: '8px' }}>
                {isRtl ? 'התקנת עמדות טעינה בחניה התת-קרקעית' : 'EV Chargers Installation in Garage'}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#d1d5db', marginBottom: '14px' }}>
                {isRtl ? 'האם אתה תומך בבחירת חברת "EV-Charge" לביצוע התשתית?' : 'Do you approve EV-Charge Corp for infrastructure setup?'}
              </p>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setSelectedVote('yes')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '8px',
                    border: 'none',
                    background: selectedVote === 'yes' ? '#10b981' : 'rgba(16, 185, 129, 0.2)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  {isRtl ? 'בעד 👍' : 'YES 👍'}
                </button>
                <button
                  onClick={() => setSelectedVote('no')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '8px',
                    border: 'none',
                    background: selectedVote === 'no' ? '#ef4444' : 'rgba(239, 68, 68, 0.2)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  {isRtl ? 'נגד 👎' : 'NO 👎'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 900px) {
          .portal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
