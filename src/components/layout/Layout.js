import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = {
  employee: [
    { key: 'dashboard', label: 'Dashboard', icon: '⊞' },
    { key: 'profile', label: 'My Profile', icon: '👤' },
    { key: 'attendance', label: 'Attendance', icon: '🕐' },
    { key: 'timesheet', label: 'Timesheet', icon: '📋' },
    { key: 'leave', label: 'My Leave', icon: '🌴' },
    { key: 'projects', label: 'My Projects', icon: '💼' },
    { key: 'training', label: 'Training', icon: '🎓' },
    { key: 'assets', label: 'My Assets', icon: '💻' },
    { key: 'payroll', label: 'Payslips', icon: '💷' },
  ],
  hr: [
    { key: 'dashboard', label: 'Dashboard', icon: '⊞' },
    { key: 'employees', label: 'Employees', icon: '👥' },
    { key: 'new-joiner', label: 'New Joiner', icon: '➕' },
    { key: 'attendance', label: 'Attendance', icon: '🕐' },
    { key: 'leave', label: 'Leave Approval', icon: '🌴' },
    { key: 'payroll', label: 'Payroll', icon: '💷' },
    { key: 'assets', label: 'Assets', icon: '💻' },
    { key: 'training', label: 'Training', icon: '🎓' },
    { key: 'reports', label: 'Reports', icon: '📊' },
  ],
  admin: [
    { key: 'dashboard', label: 'Dashboard', icon: '⊞' },
    { key: 'employees', label: 'Employees', icon: '👥' },
    { key: 'users', label: 'User Management', icon: '🔐' },
    { key: 'leave', label: 'Leave', icon: '🌴' },
    { key: 'payroll', label: 'Payroll', icon: '💷' },
    { key: 'assets', label: 'Assets', icon: '💻' },
    { key: 'training', label: 'Training', icon: '🎓' },
    { key: 'reports', label: 'Reports', icon: '📊' },
    { key: 'audit', label: 'Audit Logs', icon: '📜' },
    { key: 'settings', label: 'Settings', icon: '⚙️' },
  ],
};

export default function Layout({ children, activePage, onNavigate }) {
  const { currentUser, currentEmployee, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const role = currentUser?.role || 'employee';
  const navItems = NAV_ITEMS[role] || NAV_ITEMS.employee;

  const COUNTRY_FLAGS = { UK: '🇬🇧', IN: '🇮🇳', MY: '🇲🇾' };

  const roleBadgeStyle = {
    admin: { bg: '#312e81', color: '#a5b4fc', label: 'Admin' },
    hr: { bg: '#064e3b', color: '#6ee7b7', label: 'HR Manager' },
    employee: { bg: '#1e3a5f', color: '#93c5fd', label: 'Employee' },
  }[role];

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0f172a', fontFamily: "'DM Sans', system-ui, sans-serif", overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 16px; border-radius: 10px; cursor: pointer; transition: all 0.15s; color: #64748b; font-size: 14px; font-weight: 500; border: none; background: none; width: 100%; text-align: left; }
        .nav-item:hover { background: rgba(99,102,241,0.1); color: #c7d2fe; }
        .nav-item.active { background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15)); color: #818cf8; border-left: 2px solid #6366f1; }
        .content-scroll { flex: 1; overflow-y: auto; }
        .content-scroll::-webkit-scrollbar { width: 6px; }
        .content-scroll::-webkit-scrollbar-track { background: transparent; }
        .content-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>

      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 240 : 64, minWidth: sidebarOpen ? 240 : 64,
        background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column', transition: 'all 0.25s ease', zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, boxShadow: '0 4px 15px rgba(99,102,241,0.3)',
            }}>⚡</div>
            {sidebarOpen && <span style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 18, letterSpacing: '-0.02em' }}>NeXa <span style={{ color: '#818cf8' }}>HR</span></span>}
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          {navItems.map(item => (
            <button
              key={item.key}
              className={`nav-item ${activePage === item.key ? 'active' : ''}`}
              onClick={() => onNavigate(item.key)}
              title={!sidebarOpen ? item.label : ''}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User card */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {sidebarOpen && currentEmployee && (
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 700, fontSize: 14,
                }}>
                  {currentEmployee.firstName[0]}{currentEmployee.lastName[0]}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {currentEmployee.firstName} {currentEmployee.lastName}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <span style={{ fontSize: 12 }}>{COUNTRY_FLAGS[currentEmployee.country]}</span>
                    <span style={{ background: roleBadgeStyle.bg, color: roleBadgeStyle.color, fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 4 }}>
                      {roleBadgeStyle.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={logout}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px', borderRadius: 8, cursor: 'pointer', color: '#ef4444', background: 'none', border: 'none', width: '100%', fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}
          >
            <span>🚪</span>
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <div style={{
          height: 60, background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', flexShrink: 0,
        }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 20, padding: 4 }}>☰</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ color: '#475569', fontSize: 13 }}>
              {currentEmployee && `${COUNTRY_FLAGS[currentEmployee.country]} ${currentEmployee.workLocation}`}
            </span>
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)' }} />
            <span style={{ color: '#64748b', fontSize: 13 }}>
              {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Page content */}
        <div className="content-scroll" style={{ flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
