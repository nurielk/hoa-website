import React from 'react';
import { Clock } from 'lucide-react';
import { Language } from '../../types';

interface LastUpdatedBadgeProps {
  lang: Language;
  date?: string;
  showIcon?: boolean;
  prefix?: string;
  style?: React.CSSProperties;
}

export const LastUpdatedBadge: React.FC<LastUpdatedBadgeProps> = ({
  lang,
  date,
  showIcon = true,
  prefix,
  style,
}) => {
  const isRtl = lang === 'he';

  const defaultDateText = isRtl ? 'ספטמבר 2026' : 'September 2026';
  const displayDate = date || defaultDateText;
  const label = prefix || (isRtl ? 'עודכן לאחרונה:' : 'Last updated:');

  return (
    <div
      className="badge-tag"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.8rem',
        padding: '3px 10px',
        background: 'rgba(59, 130, 246, 0.08)',
        borderColor: 'rgba(59, 130, 246, 0.2)',
        color: '#60a5fa',
        ...style,
      }}
      title={`${label} ${displayDate}`}
    >
      {showIcon && <Clock size={12} />}
      <span>
        {label} <strong>{displayDate}</strong>
      </span>
    </div>
  );
};
