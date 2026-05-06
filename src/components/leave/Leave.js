import React, { useState } from 'react';
import { LEAVE_REQUESTS, EMPLOYEES } from '../../data/mockData';
import { Card, PageHeader, Badge, Table, Button, AvatarCircle, Modal, Input, Select, PageWrapper, StatCard } from '../layout/UI';
import { useAuth } from '../../context/AuthContext';

const LEAVE_TYPES = ['Annual Leave', 'Sick Leave', 'Maternity Leave', 'Paternity Leave', 'Unpaid Leave', 'Emergency Leave'];

export default function Leave() {
  const { currentUser, currentEmployee } = useAuth();
  const role = currentUser?.role;
  const [applyModal, setApplyModal] = useState(false);
  const [form, setForm] = useState({ type: LEAVE_TYPES[0], startDate: '', endDate: '', reason: '' });
  const [submitted, setSubmitted] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState(LEAVE_REQUESTS);

  const isHROrAdmin = role === 'hr' || role === 'admin';

  const myRequests = isHROrAdmin ? leaveRequests : leaveRequests.filter(l => l.employeeId === currentEmployee?.id);

  const pending = leaveRequests.filter(l => l.status === 'pending');
  const approved = leaveRequests.filter(l => l.status === 'approved');

  const handleApprove = (id) => {
    setLeaveRequests(prev => prev.map(l => l.id === id ? { ...l, status: 'approved', approvedBy: currentEmployee?.id, approvedOn: new Date().toISOString().split('T')[0] } : l));
  };

  const handleReject = (id) => {
    setLeaveRequests(prev => prev.map(l => l.id === id ? { ...l, status: 'rejected' } : l));
  };

  const handleSubmit = () => {
    if (!form.startDate || !form.endDate || !form.reason) return;
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const days = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1);
    const newReq = {
      id: `LV-${String(leaveRequests.length + 1).padStart(3, '0')}`,
      employeeId: currentEmployee?.id,
      type: form.type,
      startDate: form.startDate,
      endDate: form.endDate,
      days,
      reason: form.reason,
      status: 'pending',
      appliedOn: new Date().toISOString().split('T')[0],
      approvedBy: null, approvedOn: null,
    };
    setLeaveRequests(prev => [...prev, newReq]);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setApplyModal(false); setForm({ type: LEAVE_TYPES[0], startDate: '', endDate: '', reason: '' }); }, 1500);
  };

  const columns = isHROrAdmin ? [
    {
      key: 'employee', label: 'Employee', render: (_, row) => {
        const emp = EMPLOYEES.find(e => e.id === row.employeeId);
        return <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <AvatarCircle name={`${emp?.firstName} ${emp?.lastName}`} size={32} />
          <div>
            <div style={{ color: '#f1f5f9', fontWeight: 500 }}>{emp?.firstName} {emp?.lastName}</div>
            <div style={{ color: '#64748b', fontSize: 12 }}>{emp?.id}</div>
          </div>
        </div>;
      }
    },
    { key: 'type', label: 'Type', render: (_, row) => row.type },
    { key: 'dates', label: 'Dates', render: (_, row) => <span style={{ color: '#94a3b8', fontSize: 13 }}>{row.startDate} → {row.endDate}</span> },
    { key: 'days', label: 'Days', render: (_, row) => <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{row.days}</span> },
    { key: 'status', label: 'Status', render: (_, row) => <Badge status={row.status} /> },
    {
      key: 'actions', label: 'Actions', render: (_, row) => row.status === 'pending' ? (
        <div style={{ display: 'flex', gap: 6 }}>
          <Button size="sm" variant="success" onClick={() => handleApprove(row.id)}>✓ Approve</Button>
          <Button size="sm" variant="danger" onClick={() => handleReject(row.id)}>✗ Reject</Button>
        </div>
      ) : <span style={{ color: '#475569', fontSize: 12 }}>{row.approvedOn || '-'}</span>
    },
  ] : [
    { key: 'type', label: 'Leave Type', render: (_, row) => row.type },
    { key: 'startDate', label: 'Start', render: (_, row) => row.startDate },
    { key: 'endDate', label: 'End', render: (_, row) => row.endDate },
    { key: 'days', label: 'Days', render: (_, row) => <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{row.days}</span> },
    { key: 'reason', label: 'Reason', render: (_, row) => <span style={{ color: '#94a3b8', fontSize: 13 }}>{row.reason}</span> },
    { key: 'status', label: 'Status', render: (_, row) => <Badge status={row.status} /> },
  ];

  return (
    <PageWrapper>
      <PageHeader
        title={isHROrAdmin ? 'Leave Management' : 'My Leave'}
        subtitle={isHROrAdmin ? 'Approve and manage all leave requests' : 'View and apply for leave'}
        action={!isHROrAdmin && <Button icon="➕" onClick={() => setApplyModal(true)}>Apply for Leave</Button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
        {isHROrAdmin ? (
          <>
            <StatCard icon="⏳" label="Pending" value={pending.length} sub="Awaiting approval" color="#f59e0b" />
            <StatCard icon="✅" label="Approved" value={approved.length} sub="This year" color="#10b981" />
            <StatCard icon="❌" label="Rejected" value={leaveRequests.filter(l => l.status === 'rejected').length} color="#ef4444" />
            <StatCard icon="📋" label="Total Requests" value={leaveRequests.length} color="#6366f1" />
          </>
        ) : (
          <>
            <StatCard icon="🌴" label="Annual Leave" value={`${currentEmployee?.leaveBalance?.annual || 0} days`} sub="Remaining" color="#10b981" />
            <StatCard icon="🤒" label="Sick Leave" value={`${currentEmployee?.leaveBalance?.sick || 0} days`} sub="Remaining" color="#f59e0b" />
            <StatCard icon="📋" label="My Requests" value={myRequests.length} sub="All time" color="#6366f1" />
          </>
        )}
      </div>

      {/* Leave policy info for UK */}
      {(currentEmployee?.country === 'UK' || isHROrAdmin) && (
        <Card style={{ marginBottom: 20, borderColor: 'rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.05)' }}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 20 }}>🇬🇧</span>
            <div>
              <div style={{ color: '#a5b4fc', fontWeight: 600, fontSize: 13 }}>UK Statutory Leave Entitlement</div>
              <div style={{ color: '#64748b', fontSize: 12 }}>Full-time employees: 28 days (including bank holidays) · Carried over: up to 8 days · Pension auto-enrolment applies</div>
            </div>
          </div>
        </Card>
      )}

      <Card>
        <Table columns={columns} data={myRequests} emptyMessage="No leave requests found" />
      </Card>

      {/* Apply Leave Modal */}
      <Modal open={applyModal} onClose={() => setApplyModal(false)} title="Apply for Leave">
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <div style={{ color: '#6ee7b7', fontSize: 18, fontWeight: 600 }}>Leave request submitted!</div>
            <div style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>Your manager will review your request.</div>
          </div>
        ) : (
          <>
            <Select
              label="Leave Type" required
              value={form.type}
              onChange={v => setForm(f => ({ ...f, type: v }))}
              options={LEAVE_TYPES.map(t => ({ value: t, label: t }))}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Input label="Start Date" type="date" value={form.startDate} onChange={v => setForm(f => ({ ...f, startDate: v }))} required />
              <Input label="End Date" type="date" value={form.endDate} onChange={v => setForm(f => ({ ...f, endDate: v }))} required />
            </div>
            {form.startDate && form.endDate && (
              <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, color: '#a5b4fc', fontSize: 13 }}>
                📅 Duration: {Math.max(1, Math.round((new Date(form.endDate) - new Date(form.startDate)) / (1000 * 60 * 60 * 24)) + 1)} working day(s)
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, fontWeight: 500, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Reason *</label>
              <textarea
                value={form.reason}
                onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
                placeholder="Brief reason for leave..."
                rows={3}
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f1f5f9', fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: 'none', resize: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setApplyModal(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>Submit Request</Button>
            </div>
          </>
        )}
      </Modal>
    </PageWrapper>
  );
}
