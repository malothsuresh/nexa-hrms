import React, { useState } from 'react';
import { PAYROLL, EMPLOYEES } from '../../data/mockData';
import { Card, PageHeader, Badge, Table, Button, AvatarCircle, PageWrapper, StatCard } from '../layout/UI';
import { useAuth } from '../../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SYMBOLS = { GBP: '£', INR: '₹', MYR: 'RM' };

function PayslipModal({ payroll, employee, onClose }) {
  const sym = SYMBOLS[payroll.currency] || '£';
  return (
    <div style={{ color: '#f1f5f9' }}>
      <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))', borderRadius: 12, padding: 20, marginBottom: 20, border: '1px solid rgba(99,102,241,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{employee?.firstName} {employee?.lastName}</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>{employee?.designation} · {employee?.id}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#818cf8', fontWeight: 700, fontSize: 22 }}>{sym}{payroll.netPay.toLocaleString()}</div>
            <div style={{ color: '#475569', fontSize: 12 }}>Net Pay · {payroll.month}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <h4 style={{ color: '#10b981', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Earnings</h4>
          {[['Basic Salary', payroll.basic], ['Allowances', payroll.allowances], ['Bonus', payroll.bonus]].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{k}</span>
              <span style={{ color: '#f1f5f9', fontWeight: 500 }}>{sym}{v.toLocaleString()}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: '1px solid rgba(16,185,129,0.3)', marginTop: 4 }}>
            <span style={{ color: '#6ee7b7', fontWeight: 600 }}>Gross Pay</span>
            <span style={{ color: '#6ee7b7', fontWeight: 700 }}>{sym}{payroll.grossPay.toLocaleString()}</span>
          </div>
        </div>
        <div>
          <h4 style={{ color: '#ef4444', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Deductions</h4>
          {[
            ['Income Tax', payroll.taxDeduction],
            ...(payroll.niDeduction > 0 ? [['National Insurance', payroll.niDeduction]] : []),
            ['Pension', payroll.pensionDeduction],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{k}</span>
              <span style={{ color: '#fca5a5', fontWeight: 500 }}>-{sym}{v.toLocaleString()}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: '1px solid rgba(239,68,68,0.3)', marginTop: 4 }}>
            <span style={{ color: '#fca5a5', fontWeight: 600 }}>Total Deductions</span>
            <span style={{ color: '#fca5a5', fontWeight: 700 }}>-{sym}{(payroll.grossPay - payroll.netPay).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 10, padding: '14px 20px', marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#a5b4fc', fontWeight: 600, fontSize: 15 }}>NET PAY</span>
        <span style={{ color: '#818cf8', fontWeight: 800, fontSize: 22 }}>{sym}{payroll.netPay.toLocaleString()}</span>
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 16 }}>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button icon="⬇" onClick={() => alert('Download functionality — connect to PDF service')}>Download Payslip</Button>
      </div>
    </div>
  );
}

export default function Payroll() {
  const { currentUser, currentEmployee } = useAuth();
  const role = currentUser?.role;
  const isHROrAdmin = role === 'hr' || role === 'admin';
  const [selected, setSelected] = useState(null);

  const myPayroll = isHROrAdmin ? PAYROLL : PAYROLL.filter(p => p.employeeId === currentEmployee?.id);

  const chartData = isHROrAdmin ? PAYROLL.map(p => {
    const emp = EMPLOYEES.find(e => e.id === p.employeeId);
    return {
      name: emp ? `${emp.firstName} ${emp.lastName[0]}.` : p.employeeId,
      gross: p.grossPay,
      net: p.netPay,
    };
  }) : [];

  const totalGross = myPayroll.reduce((a, p) => a + p.grossPay, 0);
  const totalNet = myPayroll.reduce((a, p) => a + p.netPay, 0);

  return (
    <PageWrapper>
      <PageHeader
        title={isHROrAdmin ? 'Payroll Management' : 'My Payslips'}
        subtitle={isHROrAdmin ? 'Manage salary records and payslips across all countries' : 'View your payslips and salary breakdown'}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
        {isHROrAdmin ? (
          <>
            <StatCard icon="💷" label="UK Payroll" value="£10,459" sub="June 2025" color="#6366f1" />
            <StatCard icon="₹" label="India Payroll" value="₹2,75,000" sub="June 2025" color="#10b981" />
            <StatCard icon="💰" label="Malaysia Payroll" value="RM 8,083" sub="June 2025" color="#f59e0b" />
            <StatCard icon="✅" label="Processed" value={PAYROLL.filter(p => p.status === 'processed').length} sub="This month" color="#8b5cf6" />
          </>
        ) : (
          <>
            <StatCard icon="💰" label="Latest Net Pay" value={myPayroll[0] ? `${SYMBOLS[myPayroll[0].currency]}${myPayroll[0].netPay.toLocaleString()}` : 'N/A'} sub={myPayroll[0]?.month} color="#6366f1" />
            <StatCard icon="📋" label="Payslips" value={myPayroll.length} sub="Available" color="#10b981" />
          </>
        )}
      </div>

      {isHROrAdmin && (
        <Card style={{ marginBottom: 20 }}>
          <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, margin: '0 0 20px' }}>Payroll Comparison (June 2025)</h3>
          <p style={{ color: '#64748b', fontSize: 12, margin: '-12px 0 16px' }}>Note: Values shown in local currency — not directly comparable across countries</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f1f5f9' }} />
              <Bar dataKey="gross" name="Gross" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="net" name="Net" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      <Card>
        <Table
          columns={[
            ...(isHROrAdmin ? [{
              key: 'employee', label: 'Employee', render: (_, row) => {
                const emp = EMPLOYEES.find(e => e.id === row.employeeId);
                return <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <AvatarCircle name={`${emp?.firstName} ${emp?.lastName}`} size={32} />
                  <div>
                    <div style={{ color: '#f1f5f9', fontWeight: 500 }}>{emp?.firstName} {emp?.lastName}</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>{emp?.country}</div>
                  </div>
                </div>;
              }
            }] : []),
            { key: 'month', label: 'Period', render: (_, row) => row.month },
            { key: 'grossPay', label: 'Gross Pay', render: (_, row) => <span style={{ color: '#6ee7b7', fontWeight: 600 }}>{SYMBOLS[row.currency]}{row.grossPay.toLocaleString()}</span> },
            { key: 'tax', label: 'Tax', render: (_, row) => <span style={{ color: '#fca5a5' }}>-{SYMBOLS[row.currency]}{row.taxDeduction.toLocaleString()}</span> },
            { key: 'netPay', label: 'Net Pay', render: (_, row) => <span style={{ color: '#818cf8', fontWeight: 700 }}>{SYMBOLS[row.currency]}{row.netPay.toLocaleString()}</span> },
            { key: 'status', label: 'Status', render: (_, row) => <Badge status={row.status} /> },
            { key: 'action', label: '', render: (_, row) => <Button size="sm" variant="secondary" onClick={() => setSelected(row)}>View Payslip</Button> },
          ]}
          data={myPayroll}
        />
      </Card>

      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }} onClick={() => setSelected(null)}>
          <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 28, width: '100%', maxWidth: 520 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ color: '#f1f5f9', fontSize: 18, fontWeight: 700, margin: 0 }}>Payslip — {selected.month}</h2>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 20 }}>✕</button>
            </div>
            <PayslipModal payroll={selected} employee={EMPLOYEES.find(e => e.id === selected.employeeId)} onClose={() => setSelected(null)} />
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
