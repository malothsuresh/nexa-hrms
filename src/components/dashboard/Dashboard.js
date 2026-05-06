import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatCard, Card, PageHeader, Badge, AvatarCircle, PageWrapper } from '../layout/UI';
import { EMPLOYEES, LEAVE_REQUESTS, ATTENDANCE, ANNOUNCEMENTS, PAYROLL, ASSETS } from '../../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const ATTENDANCE_DATA = [
  { day: 'Mon', present: 45, absent: 3, wfh: 8 },
  { day: 'Tue', present: 48, absent: 2, wfh: 6 },
  { day: 'Wed', present: 44, absent: 4, wfh: 8 },
  { day: 'Thu', present: 47, absent: 3, wfh: 6 },
  { day: 'Fri', present: 42, absent: 5, wfh: 9 },
];

const COUNTRY_DATA = [
  { name: 'UK', value: 3, color: '#6366f1' },
  { name: 'India', value: 2, color: '#10b981' },
  { name: 'Malaysia', value: 1, color: '#f59e0b' },
];

const HEADCOUNT_DATA = [
  { month: 'Feb', count: 48 },
  { month: 'Mar', count: 50 },
  { month: 'Apr', count: 52 },
  { month: 'May', count: 53 },
  { month: 'Jun', count: 55 },
  { month: 'Jul', count: 56 },
];

function AdminDashboard() {
  const activeEmployees = EMPLOYEES.filter(e => e.status === 'Active').length;
  const pendingLeave = LEAVE_REQUESTS.filter(l => l.status === 'pending').length;
  const totalAssets = ASSETS.length;
  const announcements = ANNOUNCEMENTS;

  return (
    <>
      <PageHeader title="Admin Dashboard" subtitle="System-wide overview across all countries" />

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        <StatCard icon="👥" label="Total Employees" value={activeEmployees} sub="Across 3 countries" color="#6366f1" trend={3.7} />
        <StatCard icon="🌴" label="Pending Leave" value={pendingLeave} sub="Awaiting approval" color="#f59e0b" />
        <StatCard icon="💻" label="Company Assets" value={totalAssets} sub="Tracked globally" color="#10b981" />
        <StatCard icon="🌍" label="Countries" value={3} sub="UK • India • Malaysia" color="#8b5cf6" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Attendance chart */}
        <Card>
          <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, margin: '0 0 20px' }}>Weekly Attendance Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ATTENDANCE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f1f5f9' }} />
              <Bar dataKey="present" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="wfh" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Country split */}
        <Card>
          <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, margin: '0 0 20px' }}>Headcount by Country</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={COUNTRY_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value">
                {COUNTRY_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f1f5f9' }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 8 }}>
            {COUNTRY_DATA.map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.color }} />
                <span style={{ color: '#94a3b8', fontSize: 12 }}>{c.name} ({c.value})</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Headcount trend */}
        <Card>
          <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, margin: '0 0 20px' }}>Headcount Trend</h3>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={HEADCOUNT_DATA}>
              <defs>
                <linearGradient id="hcGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} domain={[45, 60]} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f1f5f9' }} />
              <Area type="monotone" dataKey="count" stroke="#6366f1" fill="url(#hcGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Announcements */}
        <Card>
          <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, margin: '0 0 16px' }}>Announcements</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {announcements.map(ann => (
              <div key={ann.id} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, borderLeft: `3px solid ${ann.priority === 'high' ? '#f59e0b' : '#6366f1'}` }}>
                <div style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{ann.title}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>{ann.body.slice(0, 80)}...</div>
                <div style={{ color: '#334155', fontSize: 11, marginTop: 4 }}>{ann.date} • {ann.country}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function HRDashboard() {
  const pendingLeave = LEAVE_REQUESTS.filter(l => l.status === 'pending');
  const recentEmployees = EMPLOYEES.slice(0, 4);

  return (
    <>
      <PageHeader title="HR Dashboard" subtitle="Manage your people operations" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        <StatCard icon="👥" label="Active Employees" value={EMPLOYEES.filter(e => e.status === 'Active').length} color="#6366f1" />
        <StatCard icon="⏳" label="Pending Approvals" value={pendingLeave.length} sub="Leave requests" color="#f59e0b" />
        <StatCard icon="📋" label="Timesheets Due" value={2} sub="This week" color="#8b5cf6" />
        <StatCard icon="🎓" label="Training Compliance" value="78%" sub="Overall rate" color="#10b981" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Pending Leave */}
        <Card>
          <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, margin: '0 0 16px' }}>Pending Leave Requests</h3>
          {pendingLeave.length === 0 ? (
            <p style={{ color: '#475569', fontSize: 14 }}>No pending requests 🎉</p>
          ) : pendingLeave.map(req => {
            const emp = EMPLOYEES.find(e => e.id === req.employeeId);
            return (
              <div key={req.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <AvatarCircle name={`${emp?.firstName} ${emp?.lastName}`} size={36} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 500 }}>{emp?.firstName} {emp?.lastName}</div>
                  <div style={{ color: '#64748b', fontSize: 12 }}>{req.type} · {req.days} day(s) · {req.startDate}</div>
                </div>
                <Badge status="pending" />
              </div>
            );
          })}
        </Card>

        {/* Recent employees */}
        <Card>
          <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, margin: '0 0 16px' }}>Employee Snapshot</h3>
          {recentEmployees.map(emp => (
            <div key={emp.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <AvatarCircle name={`${emp.firstName} ${emp.lastName}`} size={36} />
              <div style={{ flex: 1 }}>
                <div style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 500 }}>{emp.firstName} {emp.lastName}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>{emp.designation} · {emp.department}</div>
              </div>
              <div style={{ color: '#64748b', fontSize: 14 }}>
                {{ UK: '🇬🇧', IN: '🇮🇳', MY: '🇲🇾' }[emp.country]}
              </div>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}

function EmployeeDashboard() {
  const { currentEmployee } = useAuth();
  const myLeave = LEAVE_REQUESTS.filter(l => l.employeeId === currentEmployee?.id);
  const myPayroll = PAYROLL.find(p => p.employeeId === currentEmployee?.id);
  const COUNTRY_SYMBOLS = { UK: '£', IN: '₹', MY: 'RM' };
  const sym = COUNTRY_SYMBOLS[currentEmployee?.country] || '£';

  return (
    <>
      <PageHeader
        title={`Welcome back, ${currentEmployee?.firstName} 👋`}
        subtitle={`${currentEmployee?.designation} · ${currentEmployee?.workLocation}`}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
        <StatCard icon="🌴" label="Annual Leave" value={`${currentEmployee?.leaveBalance?.annual} days`} sub="Remaining" color="#10b981" />
        <StatCard icon="🤒" label="Sick Leave" value={`${currentEmployee?.leaveBalance?.sick} days`} sub="Remaining" color="#f59e0b" />
        <StatCard icon="💰" label="Net Pay" value={myPayroll ? `${sym}${myPayroll.netPay.toLocaleString()}` : 'N/A'} sub="Last month" color="#6366f1" />
        <StatCard icon="📋" label="Leave Requests" value={myLeave.length} sub="All time" color="#8b5cf6" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, margin: '0 0 16px' }}>My Leave History</h3>
          {myLeave.length === 0 ? <p style={{ color: '#475569', fontSize: 14 }}>No leave requests yet.</p>
            : myLeave.map(req => (
              <div key={req.id} style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 500 }}>{req.type}</span>
                  <Badge status={req.status} />
                </div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>{req.startDate} → {req.endDate} ({req.days} days)</div>
              </div>
            ))}
        </Card>

        <Card>
          <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, margin: '0 0 16px' }}>Announcements</h3>
          {ANNOUNCEMENTS.filter(a => a.country === 'ALL' || a.country === currentEmployee?.country).map(ann => (
            <div key={ann.id} style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, marginBottom: 8, borderLeft: `3px solid ${ann.priority === 'high' ? '#f59e0b' : '#6366f1'}` }}>
              <div style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 600 }}>{ann.title}</div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{ann.date}</div>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}

export default function Dashboard() {
  const { currentUser } = useAuth();
  const role = currentUser?.role;
  return (
    <PageWrapper>
      {role === 'admin' && <AdminDashboard />}
      {role === 'hr' && <HRDashboard />}
      {role === 'employee' && <EmployeeDashboard />}
    </PageWrapper>
  );
}
