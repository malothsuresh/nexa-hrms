import React, { useState } from 'react';
import { EMPLOYEES, DEPARTMENTS, COUNTRIES } from '../../data/mockData';
import { Card, PageHeader, Badge, Table, Button, AvatarCircle, Modal, Input, Select, PageWrapper } from '../layout/UI';
import { useAuth } from '../../context/AuthContext';

const COUNTRY_FLAGS = { UK: '🇬🇧', IN: '🇮🇳', MY: '🇲🇾' };
const CURRENCY_SYMBOLS = { UK: '£', IN: '₹', MY: 'RM' };

function EmployeeCard({ emp, onClick }) {
  const dept = DEPARTMENTS.find(d => d.id === emp.department);
  return (
    <div onClick={() => onClick(emp)} style={{
      background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 14, padding: 18, cursor: 'pointer', transition: 'all 0.15s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.background = 'rgba(99,102,241,0.05)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(30,41,59,0.7)'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <AvatarCircle name={`${emp.firstName} ${emp.lastName}`} size={44} />
        <div>
          <div style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 14 }}>{emp.firstName} {emp.lastName}</div>
          <div style={{ color: '#64748b', fontSize: 12 }}>{emp.designation}</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 22 }}>{COUNTRY_FLAGS[emp.country]}</div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', padding: '3px 10px', borderRadius: 6, fontSize: 11 }}>{dept?.name || emp.department}</span>
        <Badge status={emp.status} />
      </div>
      <div style={{ marginTop: 10, color: '#475569', fontSize: 12 }}>{emp.id} · {emp.workLocation}</div>
    </div>
  );
}

function EmployeeDetail({ emp, onClose }) {
  const dept = DEPARTMENTS.find(d => d.id === emp.department);
  const sym = CURRENCY_SYMBOLS[emp.country];
  const tabs = ['Overview', 'Personal', 'Bank & Docs', 'Benefits'];
  const [tab, setTab] = useState('Overview');

  return (
    <div style={{ color: '#f1f5f9' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: '20px', background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))', borderRadius: 14, border: '1px solid rgba(99,102,241,0.2)' }}>
        <AvatarCircle name={`${emp.firstName} ${emp.lastName}`} size={64} />
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700 }}>{emp.firstName} {emp.lastName}</h2>
          <p style={{ margin: '0 0 8px', color: '#94a3b8', fontSize: 14 }}>{emp.designation} · {dept?.name}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Badge status={emp.status} />
            <span style={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8', padding: '3px 10px', borderRadius: 6, fontSize: 12 }}>{COUNTRY_FLAGS[emp.country]} {emp.country}</span>
            <span style={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8', padding: '3px 10px', borderRadius: 6, fontSize: 12 }}>{emp.employmentType}</span>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ color: '#6366f1', fontSize: 20, fontWeight: 700 }}>{sym}{emp.salary.toLocaleString()}</div>
          <div style={{ color: '#475569', fontSize: 11 }}>Annual Salary ({emp.currency})</div>
          <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{emp.id}</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 4 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer',
            background: tab === t ? 'rgba(99,102,241,0.2)' : 'transparent',
            color: tab === t ? '#818cf8' : '#64748b',
            fontWeight: tab === t ? 600 : 400, fontSize: 13, fontFamily: "'DM Sans', sans-serif",
          }}>{t}</button>
        ))}
      </div>

      {tab === 'Overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            ['Email', emp.email], ['Phone', emp.phone], ['Department', dept?.name],
            ['Work Location', emp.workLocation], ['Joining Date', emp.joiningDate],
            ['Manager', emp.manager || 'None'], ['Employment Type', emp.employmentType],
            ['Country', COUNTRIES[emp.country]?.name],
          ].map(([k, v]) => (
            <div key={k} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{k}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14 }}>{v}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Personal' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            ['Date of Birth', emp.dob], ['Gender', emp.gender], ['Address', emp.address],
            ['Emergency Contact', `${emp.emergencyContact.name} (${emp.emergencyContact.relation})`],
            ['Emergency Phone', emp.emergencyContact.phone],
            ['Right to Work', emp.rightToWork.type],
            ['RTW Verified', emp.rightToWork.verified ? '✅ Yes' : '❌ No'],
            ['RTW Expiry', emp.rightToWork.expiry || 'N/A (No expiry)'],
          ].map(([k, v]) => (
            <div key={k} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{k}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14 }}>{v}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Bank & Docs' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            ['Bank', emp.bankDetails.bank],
            ['Account Number', emp.bankDetails.account],
            ['Sort Code', emp.bankDetails.sortCode || 'N/A'],
          ].map(([k, v]) => (
            <div key={k} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{k}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14 }}>{v}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Benefits' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            ['Pension Enrolled', emp.pension.enrolled ? '✅ Yes' : '❌ No'],
            ['Employee Contribution', `${emp.pension.contribution}%`],
            ['Employer Contribution', `${emp.pension.employer}%`],
            ['Annual Leave Balance', `${emp.leaveBalance.annual} days`],
            ['Sick Leave Balance', `${emp.leaveBalance.sick} days`],
            ['Unpaid Leave Used', `${emp.leaveBalance.unpaid} days`],
          ].map(([k, v]) => (
            <div key={k} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{k}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14 }}>{v}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Employees() {
  const { currentUser } = useAuth();
  const [search, setSearch] = useState('');
  const [filterCountry, setFilterCountry] = useState('ALL');
  const [filterDept, setFilterDept] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid');
  const [selected, setSelected] = useState(null);

  const filtered = EMPLOYEES.filter(emp => {
    const name = `${emp.firstName} ${emp.lastName}`.toLowerCase();
    const matchSearch = !search || name.includes(search.toLowerCase()) || emp.id.toLowerCase().includes(search.toLowerCase());
    const matchCountry = filterCountry === 'ALL' || emp.country === filterCountry;
    const matchDept = filterDept === 'ALL' || emp.department === filterDept;
    return matchSearch && matchCountry && matchDept;
  });

  return (
    <PageWrapper>
      <PageHeader
        title="Employee Management"
        subtitle={`${EMPLOYEES.length} employees across UK, India & Malaysia`}
        action={currentUser?.role !== 'employee' && <Button icon="➕" onClick={() => {}}>Add Employee</Button>}
      />

      {/* Filters */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            placeholder="🔍 Search employees..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 200, padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f1f5f9', fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: 'none' }}
          />
          <select value={filterCountry} onChange={e => setFilterCountry(e.target.value)} style={{ padding: '10px 14px', background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f1f5f9', fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: 'none' }}>
            <option value="ALL">All Countries</option>
            <option value="UK">🇬🇧 United Kingdom</option>
            <option value="IN">🇮🇳 India</option>
            <option value="MY">🇲🇾 Malaysia</option>
          </select>
          <select value={filterDept} onChange={e => setFilterDept(e.target.value)} style={{ padding: '10px 14px', background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f1f5f9', fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: 'none' }}>
            <option value="ALL">All Departments</option>
            {DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 4 }}>
            {['grid', 'list'].map(m => (
              <button key={m} onClick={() => setViewMode(m)} style={{ padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', background: viewMode === m ? 'rgba(99,102,241,0.2)' : 'transparent', color: viewMode === m ? '#818cf8' : '#64748b', fontFamily: "'DM Sans', sans-serif" }}>
                {m === 'grid' ? '⊞' : '☰'}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Results */}
      <p style={{ color: '#475569', fontSize: 13, marginBottom: 12 }}>{filtered.length} employee{filtered.length !== 1 ? 's' : ''} found</p>

      {viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {filtered.map(emp => <EmployeeCard key={emp.id} emp={emp} onClick={setSelected} />)}
        </div>
      ) : (
        <Card>
          <Table
            columns={[
              { key: 'name', label: 'Employee', render: (_, row) => <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><AvatarCircle name={`${row.firstName} ${row.lastName}`} size={32} /><div><div style={{ color: '#f1f5f9', fontWeight: 500 }}>{row.firstName} {row.lastName}</div><div style={{ color: '#64748b', fontSize: 12 }}>{row.id}</div></div></div> },
              { key: 'designation', label: 'Role', render: (_, row) => row.designation },
              { key: 'department', label: 'Dept', render: (_, row) => DEPARTMENTS.find(d => d.id === row.department)?.name },
              { key: 'country', label: 'Country', render: (_, row) => `${COUNTRY_FLAGS[row.country]} ${row.country}` },
              { key: 'status', label: 'Status', render: (_, row) => <Badge status={row.status} /> },
              { key: 'action', label: '', render: (_, row) => <Button size="sm" variant="secondary" onClick={() => setSelected(row)}>View</Button> },
            ]}
            data={filtered}
          />
        </Card>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Employee Profile" width={620}>
        {selected && <EmployeeDetail emp={selected} onClose={() => setSelected(null)} />}
      </Modal>
    </PageWrapper>
  );
}
