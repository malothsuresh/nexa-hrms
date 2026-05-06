import React from 'react';

export const Card = ({ children, style = {} }) => (
  <div style={{
    background: 'rgba(30,41,59,0.7)', backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16,
    padding: 24, ...style,
  }}>
    {children}
  </div>
);

export const StatCard = ({ icon, label, value, sub, color = '#6366f1', trend }) => (
  <div style={{
    background: 'rgba(30,41,59,0.7)', backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16,
    padding: 20, position: 'relative', overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `${color}15` }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <p style={{ color: '#64748b', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' }}>{label}</p>
        <p style={{ color: '#f1f5f9', fontSize: 28, fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.02em' }}>{value}</p>
        {sub && <p style={{ color: '#475569', fontSize: 12, margin: 0 }}>{sub}</p>}
        {trend !== undefined && (
          <p style={{ color: trend >= 0 ? '#10b981' : '#ef4444', fontSize: 12, margin: '4px 0 0', fontWeight: 500 }}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last month
          </p>
        )}
      </div>
      <div style={{ fontSize: 28 }}>{icon}</div>
    </div>
  </div>
);

export const Badge = ({ status }) => {
  const styles = {
    active: { bg: '#064e3b', color: '#6ee7b7', text: 'Active' },
    pending: { bg: '#78350f', color: '#fcd34d', text: 'Pending' },
    approved: { bg: '#064e3b', color: '#6ee7b7', text: 'Approved' },
    rejected: { bg: '#7f1d1d', color: '#fca5a5', text: 'Rejected' },
    submitted: { bg: '#1e3a5f', color: '#93c5fd', text: 'Submitted' },
    draft: { bg: '#1e293b', color: '#94a3b8', text: 'Draft' },
    assigned: { bg: '#064e3b', color: '#6ee7b7', text: 'Assigned' },
    available: { bg: '#1e3a5f', color: '#93c5fd', text: 'Available' },
    processed: { bg: '#064e3b', color: '#6ee7b7', text: 'Processed' },
    inactive: { bg: '#1e293b', color: '#64748b', text: 'Inactive' },
    present: { bg: '#064e3b', color: '#6ee7b7', text: 'Present' },
    absent: { bg: '#7f1d1d', color: '#fca5a5', text: 'Absent' },
    leave: { bg: '#78350f', color: '#fcd34d', text: 'Leave' },
    wfh: { bg: '#312e81', color: '#a5b4fc', text: 'WFH' },
  };
  const s = styles[status?.toLowerCase()] || styles.draft;
  return (
    <span style={{ background: s.bg, color: s.color, padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
      {s.text}
    </span>
  );
};

export const PageHeader = ({ title, subtitle, action }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
    <div>
      <h1 style={{ color: '#f1f5f9', fontSize: 24, fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.02em' }}>{title}</h1>
      {subtitle && <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>{subtitle}</p>}
    </div>
    {action}
  </div>
);

export const Table = ({ columns, data, emptyMessage = 'No data found' }) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key} style={{
              padding: '12px 16px', color: '#475569', fontSize: 11, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left',
              borderBottom: '1px solid rgba(255,255,255,0.06)', whiteSpace: 'nowrap',
            }}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr><td colSpan={columns.length} style={{ textAlign: 'center', padding: '40px 16px', color: '#475569', fontSize: 14 }}>{emptyMessage}</td></tr>
        ) : data.map((row, i) => (
          <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {columns.map(col => (
              <td key={col.key} style={{ padding: '12px 16px', color: '#cbd5e1', fontSize: 14 }}>
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const Button = ({ children, onClick, variant = 'primary', size = 'md', disabled, icon, style: extraStyle = {} }) => {
  const variants = {
    primary: { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none' },
    secondary: { background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' },
    danger: { background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)' },
    success: { background: 'rgba(16,185,129,0.1)', color: '#6ee7b7', border: '1px solid rgba(16,185,129,0.3)' },
  };
  const sizes = { sm: { padding: '6px 14px', fontSize: 12 }, md: { padding: '10px 20px', fontSize: 14 }, lg: { padding: '13px 28px', fontSize: 15 } };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      ...variants[variant], ...sizes[size],
      borderRadius: 10, cursor: disabled ? 'not-allowed' : 'pointer',
      fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
      display: 'inline-flex', alignItems: 'center', gap: 6,
      opacity: disabled ? 0.5 : 1, transition: 'all 0.15s',
      ...extraStyle,
    }}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export const Input = ({ label, value, onChange, type = 'text', placeholder, required, style: extraStyle = {} }) => (
  <div style={{ marginBottom: 16, ...extraStyle }}>
    {label && <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, fontWeight: 500, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}{required && ' *'}</label>}
    <input
      type={type} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} required={required}
      style={{
        width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
        color: '#f1f5f9', fontSize: 14, fontFamily: "'DM Sans', sans-serif",
        outline: 'none', boxSizing: 'border-box',
      }}
    />
  </div>
);

export const Select = ({ label, value, onChange, options, required, style: extraStyle = {} }) => (
  <div style={{ marginBottom: 16, ...extraStyle }}>
    {label && <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, fontWeight: 500, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}{required && ' *'}</label>}
    <select
      value={value} onChange={e => onChange(e.target.value)} required={required}
      style={{
        width: '100%', padding: '10px 14px', background: 'rgba(15,23,42,0.9)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
        color: '#f1f5f9', fontSize: 14, fontFamily: "'DM Sans', sans-serif",
        outline: 'none', boxSizing: 'border-box',
      }}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export const Modal = ({ open, onClose, title, children, width = 540 }) => {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }} onClick={onClose}>
      <div style={{
        background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 20, padding: 28, width: '100%', maxWidth: width,
        maxHeight: '90vh', overflowY: 'auto',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ color: '#f1f5f9', fontSize: 18, fontWeight: 700, margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 20 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export const AvatarCircle = ({ name, size = 36, color = '#6366f1' }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%', flexShrink: 0,
    background: `linear-gradient(135deg, ${color}, #8b5cf6)`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'white', fontWeight: 700, fontSize: size * 0.35,
  }}>
    {name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
  </div>
);

export const PageWrapper = ({ children }) => (
  <div style={{ padding: 28, minHeight: '100%' }}>
    {children}
  </div>
);
