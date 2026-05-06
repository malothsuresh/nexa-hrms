import React, { useState } from 'react';
import { ATTENDANCE, EMPLOYEES } from '../../data/mockData';
import { Card, PageHeader, Badge, Table, Button, AvatarCircle, PageWrapper, StatCard } from '../layout/UI';
import { useAuth } from '../../context/AuthContext';

export default function Attendance() {
  const { currentUser, currentEmployee } = useAuth();
  const isHROrAdmin = currentUser?.role === 'hr' || currentUser?.role === 'admin';
  const [clockedIn, setClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState(null);

  const myAttendance = isHROrAdmin ? ATTENDANCE : ATTENDANCE.filter(a => a.employeeId === currentEmployee?.id);

  const handleClockIn = () => {
    if (!clockedIn) {
      setClockedIn(true);
      setClockTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    } else {
      setClockedIn(false);
    }
  };

  const present = myAttendance.filter(a => a.status === 'Present').length;
  const absent = myAttendance.filter(a => a.status === 'Absent').length;
  const wfh = myAttendance.filter(a => a.workLocation === 'WFH').length;

  return (
    <PageWrapper>
      <PageHeader
        title="Attendance"
        subtitle={isHROrAdmin ? "Monitor attendance across all employees" : "Track your daily attendance"}
      />

      {!isHROrAdmin && (
        <Card style={{ marginBottom: 20, borderColor: clockedIn ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 18, margin: '0 0 4px' }}>
                {clockedIn ? `⏱ Clocked In — ${clockTime}` : '⏸ Not Clocked In'}
              </h3>
              <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>
                {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
            <Button
              onClick={handleClockIn}
              variant={clockedIn ? 'danger' : 'success'}
              size="lg"
            >
              {clockedIn ? '⏹ Clock Out' : '▶ Clock In'}
            </Button>
          </div>
          {clockedIn && (
            <div style={{ marginTop: 16, display: 'flex', gap: 16 }}>
              {['Office', 'Work From Home'].map(loc => (
                <label key={loc} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', color: '#94a3b8', fontSize: 13 }}>
                  <input type="radio" name="location" style={{ accentColor: '#6366f1' }} />
                  {loc}
                </label>
              ))}
            </div>
          )}
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 24 }}>
        <StatCard icon="✅" label="Present" value={present} color="#10b981" />
        <StatCard icon="❌" label="Absent" value={absent} color="#ef4444" />
        <StatCard icon="🏠" label="WFH" value={wfh} color="#8b5cf6" />
        <StatCard icon="📊" label="Attendance Rate" value={`${myAttendance.length > 0 ? Math.round((present / myAttendance.length) * 100) : 0}%`} color="#6366f1" />
      </div>

      <Card>
        <Table
          columns={[
            ...(isHROrAdmin ? [{
              key: 'employee', label: 'Employee', render: (_, row) => {
                const emp = EMPLOYEES.find(e => e.id === row.employeeId);
                return <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <AvatarCircle name={`${emp?.firstName} ${emp?.lastName}`} size={30} />
                  <span style={{ color: '#f1f5f9', fontSize: 13 }}>{emp?.firstName} {emp?.lastName}</span>
                </div>;
              }
            }] : []),
            { key: 'date', label: 'Date', render: (_, row) => row.date },
            { key: 'clockIn', label: 'Clock In', render: (_, row) => <span style={{ color: row.clockIn ? '#6ee7b7' : '#64748b' }}>{row.clockIn || '—'}</span> },
            { key: 'clockOut', label: 'Clock Out', render: (_, row) => <span style={{ color: row.clockOut ? '#93c5fd' : '#64748b' }}>{row.clockOut || '—'}</span> },
            { key: 'hours', label: 'Hours', render: (_, row) => <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{row.hours > 0 ? `${row.hours}h` : '—'}</span> },
            { key: 'workLocation', label: 'Location', render: (_, row) => row.workLocation ? <span style={{ color: '#94a3b8', fontSize: 12 }}>{row.workLocation}</span> : '—' },
            { key: 'status', label: 'Status', render: (_, row) => <Badge status={row.status.toLowerCase()} /> },
          ]}
          data={myAttendance}
          emptyMessage="No attendance records found"
        />
      </Card>
    </PageWrapper>
  );
}
