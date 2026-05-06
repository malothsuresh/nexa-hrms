import React, { useState } from 'react';
import { ASSETS, TRAININGS, EMPLOYEES, PAYROLL, LEAVE_REQUESTS } from '../../data/mockData';
import { Card, PageHeader, Badge, Table, Button, AvatarCircle, PageWrapper, StatCard } from '../layout/UI';
import { useAuth } from '../../context/AuthContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// ======================== ASSETS ========================
export function Assets() {
  const { currentUser, currentEmployee } = useAuth();
  const isHROrAdmin = currentUser?.role === 'hr' || currentUser?.role === 'admin';
  const myAssets = isHROrAdmin ? ASSETS : ASSETS.filter(a => a.assignedTo === currentEmployee?.id);

  const assignedCount = ASSETS.filter(a => a.status === 'Assigned').length;
  const availableCount = ASSETS.filter(a => a.status === 'Available').length;
  const typeBreakdown = Object.entries(ASSETS.reduce((acc, a) => { acc[a.type] = (acc[a.type] || 0) + 1; return acc; }, {}));

  return (
    <PageWrapper>
      <PageHeader
        title={isHROrAdmin ? "Asset Management" : "My Assets"}
        subtitle={isHROrAdmin ? "Track and manage all company assets" : "View your assigned equipment"}
      />
      {isHROrAdmin && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 24 }}>
          <StatCard icon="💻" label="Total Assets" value={ASSETS.length} color="#6366f1" />
          <StatCard icon="✅" label="Assigned" value={assignedCount} color="#10b981" />
          <StatCard icon="📦" label="Available" value={availableCount} color="#f59e0b" />
          {typeBreakdown.map(([type, count]) => (
            <StatCard key={type} icon={type === 'Laptop' ? '💻' : type === 'Mobile' ? '📱' : '🖥'} label={type} value={count} color="#8b5cf6" />
          ))}
        </div>
      )}
      <Card>
        <Table
          columns={[
            { key: 'code', label: 'Asset Code', render: (_, row) => <span style={{ color: '#818cf8', fontWeight: 600, fontSize: 13 }}>{row.code}</span> },
            { key: 'type', label: 'Type', render: (_, row) => row.type },
            { key: 'brand', label: 'Brand / Model', render: (_, row) => row.brand },
            { key: 'serial', label: 'Serial No.', render: (_, row) => <span style={{ color: '#64748b', fontSize: 12 }}>{row.serial}</span> },
            ...(isHROrAdmin ? [{
              key: 'assignedTo', label: 'Assigned To', render: (_, row) => {
                if (!row.assignedTo) return <span style={{ color: '#475569' }}>Unassigned</span>;
                const emp = EMPLOYEES.find(e => e.id === row.assignedTo);
                return <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><AvatarCircle name={`${emp?.firstName} ${emp?.lastName}`} size={28} /><span style={{ color: '#f1f5f9', fontSize: 13 }}>{emp?.firstName} {emp?.lastName}</span></div>;
              }
            }] : []),
            { key: 'issueDate', label: 'Issued', render: (_, row) => row.issueDate || '—' },
            { key: 'status', label: 'Status', render: (_, row) => <Badge status={row.status.toLowerCase()} /> },
            { key: 'condition', label: 'Condition', render: (_, row) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{row.condition}</span> },
          ]}
          data={myAssets}
          emptyMessage="No assets assigned"
        />
      </Card>
    </PageWrapper>
  );
}

// ======================== TRAINING ========================
export function Training() {
  const { currentUser, currentEmployee } = useAuth();
  const isHROrAdmin = currentUser?.role === 'hr' || currentUser?.role === 'admin';

  const myTrainings = isHROrAdmin ? TRAININGS : TRAININGS.filter(t => t.assignedTo.includes(currentEmployee?.id));
  const completed = myTrainings.filter(t => t.completions[currentEmployee?.id]);

  return (
    <PageWrapper>
      <PageHeader
        title={isHROrAdmin ? "Training Management" : "My Training"}
        subtitle={isHROrAdmin ? "Manage training programs and compliance" : "View and complete your assigned training"}
      />
      {!isHROrAdmin && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
          <StatCard icon="📚" label="Assigned" value={myTrainings.length} color="#6366f1" />
          <StatCard icon="✅" label="Completed" value={completed.length} color="#10b981" />
          <StatCard icon="⏳" label="Pending" value={myTrainings.length - completed.length} color="#f59e0b" />
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {myTrainings.map(t => {
          const empCompleted = isHROrAdmin ? Object.keys(t.completions).length : (t.completions[currentEmployee?.id] ? 1 : 0);
          const total = isHROrAdmin ? t.assignedTo.length : 1;
          const isMyCompleted = !isHROrAdmin && !!t.completions[currentEmployee?.id];
          return (
            <Card key={t.id} style={{ borderColor: isMyCompleted ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <h3 style={{ color: '#f1f5f9', fontSize: 15, fontWeight: 600, margin: 0 }}>{t.title}</h3>
                    {t.type === 'Mandatory' && <span style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>Mandatory</span>}
                    {t.type === 'Optional' && <span style={{ background: 'rgba(99,102,241,0.1)', color: '#a5b4fc', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>Optional</span>}
                  </div>
                  <div style={{ display: 'flex', gap: 16, color: '#64748b', fontSize: 12 }}>
                    <span>📅 {t.startDate}</span>
                    <span>🏢 {t.provider}</span>
                    <span>🌍 {t.country}</span>
                    {isHROrAdmin && <span>👥 {empCompleted}/{total} completed</span>}
                  </div>
                  {isHROrAdmin && (
                    <div style={{ marginTop: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 6, height: 6, overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: 'linear-gradient(135deg, #10b981, #6366f1)', width: `${(empCompleted / total) * 100}%`, borderRadius: 6, transition: 'width 0.5s' }} />
                    </div>
                  )}
                </div>
                {!isHROrAdmin && (
                  isMyCompleted ? (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#6ee7b7', fontWeight: 600, fontSize: 13 }}>✅ Completed</div>
                      <div style={{ color: '#475569', fontSize: 11 }}>{t.completions[currentEmployee.id]}</div>
                    </div>
                  ) : (
                    <Button size="sm" onClick={() => alert('Mark as complete — connect to backend')}>Mark Complete</Button>
                  )
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </PageWrapper>
  );
}

// ======================== REPORTS ========================
export function Reports() {
  const [activeReport, setActiveReport] = useState('headcount');

  const countryData = [
    { name: '🇬🇧 UK', value: 3, color: '#6366f1' },
    { name: '🇮🇳 India', value: 2, color: '#10b981' },
    { name: '🇲🇾 Malaysia', value: 1, color: '#f59e0b' },
  ];
  const leaveData = [
    { type: 'Annual', count: 3, color: '#6366f1' },
    { type: 'Sick', count: 2, color: '#10b981' },
    { type: 'Maternity', count: 0, color: '#f59e0b' },
  ];
  const deptData = [
    { name: 'Engineering', count: 2 },
    { name: 'HR', count: 1 },
    { name: 'Finance', count: 1 },
    { name: 'Marketing', count: 1 },
    { name: 'Operations', count: 1 },
  ];

  const reports = [
    { key: 'headcount', label: 'Headcount Report', icon: '👥' },
    { key: 'leave', label: 'Leave Summary', icon: '🌴' },
    { key: 'payroll', label: 'Payroll Summary', icon: '💷' },
    { key: 'training', label: 'Training Compliance', icon: '🎓' },
  ];

  return (
    <PageWrapper>
      <PageHeader title="Reports & Analytics" subtitle="Generate and export HR reports" action={<Button icon="⬇">Export All</Button>} />

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {reports.map(r => (
            <button key={r.key} onClick={() => setActiveReport(r.key)} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', textAlign: 'left',
              background: activeReport === r.key ? 'rgba(99,102,241,0.15)' : 'rgba(30,41,59,0.7)',
              color: activeReport === r.key ? '#818cf8' : '#94a3b8',
              fontWeight: activeReport === r.key ? 600 : 400, fontFamily: "'DM Sans', sans-serif", fontSize: 13,
              borderLeft: activeReport === r.key ? '2px solid #6366f1' : '2px solid transparent',
            }}>
              <span>{r.icon}</span> {r.label}
            </button>
          ))}
        </div>

        <div>
          {activeReport === 'headcount' && (
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, margin: 0 }}>Headcount Report — July 2025</h3>
                <Button size="sm" variant="secondary" icon="⬇">Export CSV</Button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <h4 style={{ color: '#94a3b8', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>By Country</h4>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={countryData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                        {countryData.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f1f5f9' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h4 style={{ color: '#94a3b8', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>By Department</h4>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={deptData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis type="number" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} />
                      <YAxis dataKey="name" type="category" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} width={80} />
                      <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f1f5f9' }} />
                      <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <Table
                columns={[
                  { key: 'name', label: 'Employee', render: (_, row) => <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><AvatarCircle name={`${row.firstName} ${row.lastName}`} size={30} /><span style={{ color: '#f1f5f9' }}>{row.firstName} {row.lastName}</span></div> },
                  { key: 'designation', label: 'Role', render: (_, row) => row.designation },
                  { key: 'country', label: 'Country', render: (_, row) => ({ UK: '🇬🇧 UK', IN: '🇮🇳 India', MY: '🇲🇾 Malaysia' })[row.country] },
                  { key: 'joiningDate', label: 'Joined', render: (_, row) => row.joiningDate },
                  { key: 'status', label: 'Status', render: (_, row) => <Badge status={row.status} /> },
                ]}
                data={EMPLOYEES}
              />
            </Card>
          )}

          {activeReport === 'leave' && (
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, margin: 0 }}>Leave Summary — 2025</h3>
                <Button size="sm" variant="secondary" icon="⬇">Export PDF</Button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
                {[
                  { label: 'Total Requests', value: LEAVE_REQUESTS.length, color: '#6366f1' },
                  { label: 'Approved', value: LEAVE_REQUESTS.filter(l => l.status === 'approved').length, color: '#10b981' },
                  { label: 'Pending', value: LEAVE_REQUESTS.filter(l => l.status === 'pending').length, color: '#f59e0b' },
                ].map(s => (
                  <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '14px', textAlign: 'center' }}>
                    <div style={{ color: s.color, fontSize: 24, fontWeight: 700 }}>{s.value}</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <Table
                columns={[
                  { key: 'employee', label: 'Employee', render: (_, row) => { const emp = EMPLOYEES.find(e => e.id === row.employeeId); return `${emp?.firstName} ${emp?.lastName}`; } },
                  { key: 'type', label: 'Type', render: (_, row) => row.type },
                  { key: 'dates', label: 'Period', render: (_, row) => `${row.startDate} → ${row.endDate}` },
                  { key: 'days', label: 'Days', render: (_, row) => row.days },
                  { key: 'status', label: 'Status', render: (_, row) => <Badge status={row.status} /> },
                ]}
                data={LEAVE_REQUESTS}
              />
            </Card>
          )}

          {activeReport === 'payroll' && (
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, margin: 0 }}>Payroll Summary — June 2025</h3>
                <Button size="sm" variant="secondary" icon="⬇">Export PDF</Button>
              </div>
              <Table
                columns={[
                  { key: 'emp', label: 'Employee', render: (_, row) => { const emp = EMPLOYEES.find(e => e.id === row.employeeId); return `${emp?.firstName} ${emp?.lastName}`; } },
                  { key: 'country', label: 'Country', render: (_, row) => { const emp = EMPLOYEES.find(e => e.id === row.employeeId); return ({ UK: '🇬🇧', IN: '🇮🇳', MY: '🇲🇾' })[emp?.country]; } },
                  { key: 'currency', label: 'Currency', render: (_, row) => row.currency },
                  { key: 'gross', label: 'Gross', render: (_, row) => row.grossPay.toLocaleString() },
                  { key: 'deductions', label: 'Deductions', render: (_, row) => (row.grossPay - row.netPay).toLocaleString() },
                  { key: 'net', label: 'Net Pay', render: (_, row) => <span style={{ color: '#818cf8', fontWeight: 700 }}>{row.netPay.toLocaleString()}</span> },
                  { key: 'status', label: 'Status', render: (_, row) => <Badge status={row.status} /> },
                ]}
                data={PAYROLL}
              />
            </Card>
          )}

          {activeReport === 'training' && (
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, margin: 0 }}>Training Compliance Report</h3>
                <Button size="sm" variant="secondary" icon="⬇">Export</Button>
              </div>
              {TRAININGS.map(t => (
                <div key={t.id} style={{ marginBottom: 16, padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div>
                      <span style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 14 }}>{t.title}</span>
                      {t.type === 'Mandatory' && <span style={{ marginLeft: 8, background: 'rgba(239,68,68,0.1)', color: '#fca5a5', padding: '2px 8px', borderRadius: 4, fontSize: 11 }}>Mandatory</span>}
                    </div>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>{Math.round((Object.keys(t.completions).length / t.assignedTo.length) * 100)}% complete</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 6, height: 8, overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: 'linear-gradient(135deg, #10b981, #6366f1)', width: `${(Object.keys(t.completions).length / t.assignedTo.length) * 100}%`, borderRadius: 6 }} />
                  </div>
                  <div style={{ color: '#64748b', fontSize: 12, marginTop: 6 }}>{Object.keys(t.completions).length} / {t.assignedTo.length} employees completed</div>
                </div>
              ))}
            </Card>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

// ======================== PROFILE ========================
export function Profile() {
  const { currentEmployee } = useAuth();
  const SYMBOLS = { UK: '£', IN: '₹', MY: 'RM' };
  const FLAGS = { UK: '🇬🇧', IN: '🇮🇳', MY: '🇲🇾' };

  if (!currentEmployee) return null;
  const sym = SYMBOLS[currentEmployee.country];

  return (
    <PageWrapper>
      <PageHeader title="My Profile" subtitle="Your personal and employment information" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
        <Card style={{ alignSelf: 'flex-start' }}>
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%', margin: '0 auto 16px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 800, fontSize: 28,
              boxShadow: '0 8px 30px rgba(99,102,241,0.4)',
            }}>
              {currentEmployee.firstName[0]}{currentEmployee.lastName[0]}
            </div>
            <h2 style={{ color: '#f1f5f9', fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>{currentEmployee.firstName} {currentEmployee.lastName}</h2>
            <p style={{ color: '#64748b', fontSize: 13, margin: '0 0 16px' }}>{currentEmployee.designation}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['Employee ID', currentEmployee.id],
                ['Country', `${FLAGS[currentEmployee.country]} ${currentEmployee.country}`],
                ['Employment', currentEmployee.employmentType],
                ['Joined', currentEmployee.joiningDate],
                ['Salary', `${sym}${currentEmployee.salary.toLocaleString()} ${currentEmployee.currency}`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
                  <span style={{ color: '#475569', fontSize: 12 }}>{k}</span>
                  <span style={{ color: '#94a3b8', fontSize: 12, fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <h3 style={{ color: '#f1f5f9', fontSize: 15, fontWeight: 600, margin: '0 0 16px' }}>Contact Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                ['Email', currentEmployee.email],
                ['Phone', currentEmployee.phone],
                ['Address', currentEmployee.address],
                ['Work Location', currentEmployee.workLocation],
              ].map(([k, v]) => (
                <div key={k} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{k}</div>
                  <div style={{ color: '#cbd5e1', fontSize: 13 }}>{v}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 style={{ color: '#f1f5f9', fontSize: 15, fontWeight: 600, margin: '0 0 16px' }}>Emergency Contact</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {[
                ['Name', currentEmployee.emergencyContact.name],
                ['Relation', currentEmployee.emergencyContact.relation],
                ['Phone', currentEmployee.emergencyContact.phone],
              ].map(([k, v]) => (
                <div key={k} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{k}</div>
                  <div style={{ color: '#cbd5e1', fontSize: 13 }}>{v}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 style={{ color: '#f1f5f9', fontSize: 15, fontWeight: 600, margin: '0 0 16px' }}>Leave Balances</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[
                { label: 'Annual Leave', value: currentEmployee.leaveBalance.annual, color: '#10b981' },
                { label: 'Sick Leave', value: currentEmployee.leaveBalance.sick, color: '#f59e0b' },
                { label: 'Unpaid Used', value: currentEmployee.leaveBalance.unpaid, color: '#ef4444' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '16px 10px' }}>
                  <div style={{ color, fontSize: 26, fontWeight: 800 }}>{value}</div>
                  <div style={{ color: '#64748b', fontSize: 11, marginTop: 4 }}>{label} days</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
