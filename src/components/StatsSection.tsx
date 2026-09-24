import React from 'react';

interface StatsSectionProps {
  stats: Array<{ label: string; value: string }>;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <section
      style={{
        padding: '36px 0',
        background: 'var(--bg-glass)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            textAlign: 'center',
          }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} style={{ padding: '12px' }}>
              <div
                className="text-gradient-blue"
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  marginBottom: '4px',
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
