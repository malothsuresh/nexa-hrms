import React, { useState } from 'react';
import { USERS, EMPLOYEES, AUDIT_LOGS, DEPARTMENTS, COUNTRIES, PUBLIC_HOLIDAYS } from '../../data/mockData';
import { Card, PageHeader, Badge, Table, Button, AvatarCircle, PageWrapper, StatCard, Modal, Input, Select } from '../layout/UI';

// ======================== USER MANAGEMENT ========================
export function UserManagement() {
  const [users, setUsers] = useState(USERS);
  const [addModal, setAddModal] = useState(false);
  const [form, setForm] = useState({ email: '', role: 'employee', employeeId: '' });

  const handleToggle = (userId) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  };

  const handleChangeRole = (userId, newRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  return (
    <PageWrapper>
      <PageHeader
        title="User Management"
        subtitle="Manage system access, roles, and permissions"
        action={<Button icon="➕" onClick={() => setAddModal(true)}>Create User</Button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 24 }}>
        <StatCard icon="👤" label="Total Users" value={users.length} color="#6366f1" />
        <StatCard icon="✅" label="Active" value={users.filter(u => u.status === 'active').length} color="#10b981" />
        <StatCard icon="🔒" label="Admin" value={users.filter(u => u.role === 'admin').length} color="#8b5cf6" />
        <StatCard icon="👥" label="HR Users" value={users.filter(u => u.role === 'hr').length} color="#f59e0b" />
      </div>

      <Card>
        <Table
          columns={[
            {
              key: 'user', label: 'User', render: (_, row) => {
                const emp = EMPLOYEES.find(e => e.id === row.employeeId);
                return (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <AvatarCircle name={`${emp?.firstName} ${emp?.lastName}`} size={36} />
                    <div>
                      <div style={{ color: '#f1f5f9', fontWeight: 500 }}>{emp?.firstName} {emp?.lastName}</div>
                      <div style={{ color: '#64748b', fontSize: 12 }}>{row.email}</div>
                    </div>
                  </div>
                );
              }
            },
            { key: 'employeeId', label: 'Emp ID', render: (_, row) => <span style={{ color: '#818cf8', fontSize: 12 }}>{row.employeeId}</span> },
            {
              key: 'role', label: 'Role', render: (_, row) => (
                <select
                  value={row.role}
                  onChange={e => handleChangeRole(row.id, e.target.value)}
                  style={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: '#f1f5f9', padding: '4px 8px', fontSize: 12, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer' }}
                >
                  <option value="employee">Employee</option>
                  <option value="hr">HR Manager</option>
                  <option value="admin">Admin</option>
                </select>
              )
            },
            { key: 'lastLogin', label: 'Last Login', render: (_, row) => <span style={{ color: '#64748b', fontSize: 12 }}>{row.lastLogin}</span> },
            { key: 'status', label: 'Status', render: (_, row) => <Badge status={row.status} /> },
            {
              key: 'actions', label: 'Actions', render: (_, row) => (
                <div style={{ display: 'flex', gap: 6 }}>
                  <Button size="sm" variant={row.status === 'active' ? 'danger' : 'success'} onClick={() => handleToggle(row.id)}>
                    {row.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => alert('Reset password email sent')}>Reset PWD</Button>
                </div>
              )
            },
          ]}
          data={users}
        />
      </Card>

      <Modal open={addModal} onClose={() => setAddModal(false)} title="Create New User">
        <Select label="Employee" value={form.employeeId} onChange={v => setForm(f => ({ ...f, employeeId: v }))}
          options={[{ value: '', label: 'Select Employee' }, ...EMPLOYEES.map(e => ({ value: e.id, label: `${e.firstName} ${e.lastName} (${e.id})` }))]} required />
        <Input label="Email" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} required />
        <Select label="Role" value={form.role} onChange={v => setForm(f => ({ ...f, role: v }))}
          options={[{ value: 'employee', label: 'Employee' }, { value: 'hr', label: 'HR Manager' }, { value: 'admin', label: 'Admin' }]} />
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
          <Button variant="secondary" onClick={() => setAddModal(false)}>Cancel</Button>
          <Button onClick={() => { alert('User created! (connect to backend)'); setAddModal(false); }}>Create User</Button>
        </div>
      </Modal>
    </PageWrapper>
  );
}

// ======================== AUDIT LOGS ========================
export function AuditLogs() {
  const [filter, setFilter] = useState('');

  const filtered = AUDIT_LOGS.filter(log =>
    !filter || log.action.toLowerCase().includes(filter.toLowerCase()) || log.user.toLowerCase().includes(filter.toLowerCase())
  );

  const ACTION_COLORS = {
    'Employee Created': '#10b981',
    'Leave Approved': '#6366f1',
    'User Role Changed': '#f59e0b',
    'Asset Assigned': '#8b5cf6',
    'Payroll Processed': '#10b981',
    'Login': '#64748b',
  };

  return (
    <PageWrapper>
      <PageHeader title="Audit Logs" subtitle="Full system activity trail for compliance and security" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 24 }}>
        <StatCard icon="📜" label="Total Events" value={AUDIT_LOGS.length} color="#6366f1" />
        <StatCard icon="🔐" label="Login Events" value={AUDIT_LOGS.filter(l => l.action === 'Login').length} color="#8b5cf6" />
        <StatCard icon="✏️" label="Changes" value={AUDIT_LOGS.filter(l => l.action !== 'Login').length} color="#f59e0b" />
      </div>

      <Card style={{ marginBottom: 16 }}>
        <input
          placeholder="🔍 Filter by action or user..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f1f5f9', fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: 'none', boxSizing: 'border-box' }}
        />
      </Card>

      <Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {filtered.map((log, i) => (
            <div key={log.id} style={{
              display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0',
              borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: `${ACTION_COLORS[log.action] || '#6366f1'}20`,
                border: `1px solid ${ACTION_COLORS[log.action] || '#6366f1'}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
              }}>
                {log.action === 'Login' ? '🔑' : log.action.includes('Created') ? '➕' : log.action.includes('Approved') ? '✅' : log.action.includes('Changed') ? '✏️' : '⚡'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: ACTION_COLORS[log.action] || '#f1f5f9', fontWeight: 600, fontSize: 13 }}>{log.action}</span>
                  {log.target && <span style={{ color: '#475569', fontSize: 11 }}>→ {log.target}</span>}
                </div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{log.user} · IP: {log.ip}</div>
              </div>
              <div style={{ color: '#334155', fontSize: 12, whiteSpace: 'nowrap' }}>{log.timestamp}</div>
            </div>
          ))}
        </div>
      </Card>
    </PageWrapper>
  );
}

// ======================== SETTINGS / COUNTRY CONFIG ========================
export function Settings() {
  const [activeTab, setActiveTab] = useState('countries');

  const tabs = [
    { key: 'countries', label: 'Countries', icon: '🌍' },
    { key: 'holidays', label: 'Public Holidays', icon: '📅' },
    { key: 'departments', label: 'Departments', icon: '🏢' },
    { key: 'leave-policy', label: 'Leave Policy', icon: '🌴' },
    { key: 'system', label: 'System', icon: '⚙️' },
  ];

  const leavePolicies = {
    UK: { annual: 28, sick: 'Self-certified up to 7 days', maternity: '52 weeks', paternity: '2 weeks', notes: 'Includes 8 bank holidays. Statutory minimum.' },
    IN: { annual: 21, sick: 12, maternity: '26 weeks', paternity: '15 days', notes: 'Per Shops & Establishments Act. Varies by state.' },
    MY: { annual: 16, sick: 18, maternity: '60 days', paternity: 'N/A', notes: 'Per Employment Act 1955. Varies with tenure.' },
  };

  return (
    <PageWrapper>
      <PageHeader title="System Settings" subtitle="Configure country settings, policies, and system preferences" />

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ width: 200, flexShrink: 0 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 10, border: 'none',
              cursor: 'pointer', width: '100%', textAlign: 'left', marginBottom: 4,
              background: activeTab === t.key ? 'rgba(99,102,241,0.15)' : 'rgba(30,41,59,0.7)',
              color: activeTab === t.key ? '#818cf8' : '#94a3b8',
              fontWeight: activeTab === t.key ? 600 : 400, fontSize: 13, fontFamily: "'DM Sans', sans-serif",
              borderLeft: activeTab === t.key ? '2px solid #6366f1' : '2px solid transparent',
            }}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          {activeTab === 'countries' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {Object.values(COUNTRIES).map(country => (
                <Card key={country.code}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ fontSize: 36 }}>{country.flag}</span>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700, margin: '0 0 4px' }}>{country.name}</h3>
                      <div style={{ display: 'flex', gap: 20, color: '#64748b', fontSize: 13 }}>
                        <span>Currency: <span style={{ color: '#94a3b8', fontWeight: 500 }}>{country.currency} ({country.symbol})</span></span>
                        <span>Timezone: <span style={{ color: '#94a3b8', fontWeight: 500 }}>{country.timezone}</span></span>
                      </div>
                    </div>
                    <Badge status="active" />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'holidays' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {Object.entries(PUBLIC_HOLIDAYS).map(([country, holidays]) => (
                <Card key={country}>
                  <h3 style={{ color: '#f1f5f9', fontSize: 15, fontWeight: 600, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{{ UK: '🇬🇧', IN: '🇮🇳', MY: '🇲🇾' }[country]}</span> {COUNTRIES[country]?.name} Public Holidays 2025
                    <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: 12, fontWeight: 400 }}>{holidays.length} holidays</span>
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 8 }}>
                    {holidays.map(h => (
                      <div key={h.date} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                        <span style={{ color: '#94a3b8', fontSize: 13 }}>{h.name}</span>
                        <span style={{ color: '#64748b', fontSize: 12 }}>{h.date}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'departments' && (
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, margin: 0 }}>Departments</h3>
                <Button size="sm" icon="➕">Add Department</Button>
              </div>
              <Table
                columns={[
                  { key: 'id', label: 'ID', render: (_, row) => <span style={{ color: '#818cf8', fontSize: 12 }}>{row.id}</span> },
                  { key: 'name', label: 'Department Name', render: (_, row) => <span style={{ color: '#f1f5f9', fontWeight: 500 }}>{row.name}</span> },
                  { key: 'headCount', label: 'Headcount', render: (_, row) => <span style={{ color: '#94a3b8' }}>{row.headCount}</span> },
                  { key: 'actions', label: '', render: () => <Button size="sm" variant="secondary">Edit</Button> },
                ]}
                data={DEPARTMENTS}
              />
            </Card>
          )}

          {activeTab === 'leave-policy' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {Object.entries(leavePolicies).map(([country, policy]) => (
                <Card key={country}>
                  <h3 style={{ color: '#f1f5f9', fontSize: 15, fontWeight: 600, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{{ UK: '🇬🇧', IN: '🇮🇳', MY: '🇲🇾' }[country]}</span> {COUNTRIES[country]?.name} Leave Policy
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 12 }}>
                    {[
                      ['Annual Leave', `${policy.annual} days`],
                      ['Sick Leave', `${policy.sick} ${typeof policy.sick === 'number' ? 'days' : ''}`],
                      ['Maternity Leave', policy.maternity],
                      ['Paternity Leave', policy.paternity],
                    ].map(([k, v]) => (
                      <div key={k} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '10px 14px' }}>
                        <div style={{ color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{k}</div>
                        <div style={{ color: '#cbd5e1', fontSize: 14, fontWeight: 500 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8, padding: '10px 14px', color: '#94a3b8', fontSize: 12 }}>
                    📋 {policy.notes}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'system' && (
            <Card>
              <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, margin: '0 0 20px' }}>System Configuration</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'System Name', value: 'NeXa HR', desc: 'Display name across all interfaces' },
                  { label: 'GDPR Compliance Mode', value: '✅ Enabled', desc: 'Enforces data retention and deletion policies' },
                  { label: 'Audit Logging', value: '✅ Enabled', desc: 'All user actions are logged' },
                  { label: 'Multi-Factor Authentication', value: '⚠️ Optional', desc: 'Recommended for HR and Admin roles' },
                  { label: 'Session Timeout', value: '8 hours', desc: 'Auto-logout after inactivity' },
                  { label: 'Password Policy', value: 'Strong (8+ chars)', desc: 'Minimum requirements enforced' },
                  { label: 'Data Backup', value: 'Daily (AWS S3)', desc: 'Automated nightly backups' },
                  { label: 'API Version', value: 'v1.2.0', desc: 'REST API with JWT authentication' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
                    <div>
                      <div style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 500 }}>{item.label}</div>
                      <div style={{ color: '#475569', fontSize: 12 }}>{item.desc}</div>
                    </div>
                    <span style={{ color: '#818cf8', fontWeight: 600, fontSize: 13, background: 'rgba(99,102,241,0.1)', padding: '4px 12px', borderRadius: 6 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
