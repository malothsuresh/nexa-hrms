import React, { useState } from 'react';
import { TIMESHEETS, PROJECTS, EMPLOYEES, DEPARTMENTS } from '../../data/mockData';
import { Card, PageHeader, Badge, Table, Button, AvatarCircle, PageWrapper, StatCard, Modal, Input, Select } from '../layout/UI';
import { useAuth } from '../../context/AuthContext';

// ======================== NEW JOINER ========================
export function NewJoiner() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', dob: '',
    gender: 'Male', department: '', designation: '', country: 'UK',
    joiningDate: '', employmentType: 'Full-Time', salary: '', currency: 'GBP',
    manager: '', workLocation: '',
  });

  const f = (key) => (v) => setForm(prev => ({ ...prev, [key]: v }));

  const totalSteps = 3;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    const newId = `EMP-${String(EMPLOYEES.length + 1).padStart(3, '0')}`;
    return (
      <PageWrapper>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
          <h2 style={{ color: '#f1f5f9', fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>Onboarding Complete!</h2>
          <p style={{ color: '#64748b', fontSize: 16, margin: '0 0 8px' }}>{form.firstName} {form.lastName} has been successfully added.</p>
          <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 12, padding: '16px 32px', margin: '16px 0' }}>
            <div style={{ color: '#a5b4fc', fontSize: 13, marginBottom: 4 }}>Employee ID Generated</div>
            <div style={{ color: '#818cf8', fontSize: 28, fontWeight: 800 }}>{newId}</div>
          </div>
          <p style={{ color: '#475569', fontSize: 13, marginBottom: 24 }}>Login credentials sent to {form.email}</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="secondary" onClick={() => { setSubmitted(false); setStep(1); setForm({ firstName: '', lastName: '', email: '', phone: '', dob: '', gender: 'Male', department: '', designation: '', country: 'UK', joiningDate: '', employmentType: 'Full-Time', salary: '', currency: 'GBP', manager: '', workLocation: '' }); }}>Add Another</Button>
            <Button>View Employee</Button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <PageHeader title="New Joiner Onboarding" subtitle="Create a new employee record and set up access" />

      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 32 }}>
        {['Personal Info', 'Employment Details', 'Review & Submit'].map((label, i) => (
          <React.Fragment key={label}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: step > i + 1 ? '#10b981' : step === i + 1 ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.08)',
                color: step >= i + 1 ? 'white' : '#475569', fontWeight: 700, fontSize: 14,
                boxShadow: step === i + 1 ? '0 0 20px rgba(99,102,241,0.4)' : 'none',
              }}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span style={{ color: step === i + 1 ? '#818cf8' : '#475569', fontSize: 12, fontWeight: step === i + 1 ? 600 : 400, whiteSpace: 'nowrap' }}>{label}</span>
            </div>
            {i < 2 && <div style={{ flex: 1, height: 2, background: step > i + 1 ? '#10b981' : 'rgba(255,255,255,0.08)', margin: '0 8px', marginBottom: 20 }} />}
          </React.Fragment>
        ))}
      </div>

      <Card style={{ maxWidth: 640 }}>
        {step === 1 && (
          <>
            <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, margin: '0 0 20px' }}>Step 1 — Personal Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Input label="First Name" value={form.firstName} onChange={f('firstName')} placeholder="e.g. Sarah" required />
              <Input label="Last Name" value={form.lastName} onChange={f('lastName')} placeholder="e.g. Mitchell" required />
              <Input label="Email Address" type="email" value={form.email} onChange={f('email')} placeholder="sarah@company.com" required />
              <Input label="Phone Number" value={form.phone} onChange={f('phone')} placeholder="+44 7700 000000" />
              <Input label="Date of Birth" type="date" value={form.dob} onChange={f('dob')} />
              <Select label="Gender" value={form.gender} onChange={f('gender')} options={['Male', 'Female', 'Non-binary', 'Prefer not to say'].map(g => ({ value: g, label: g }))} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
              <Button onClick={() => setStep(2)} disabled={!form.firstName || !form.lastName || !form.email}>Next →</Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, margin: '0 0 20px' }}>Step 2 — Employment Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Select label="Country" value={form.country} onChange={v => { f('country')(v); f('currency')(v === 'UK' ? 'GBP' : v === 'IN' ? 'INR' : 'MYR')(); }}
                options={[{ value: 'UK', label: '🇬🇧 United Kingdom' }, { value: 'IN', label: '🇮🇳 India' }, { value: 'MY', label: '🇲🇾 Malaysia' }]} />
              <Select label="Department" value={form.department} onChange={f('department')}
                options={[{ value: '', label: 'Select Department' }, ...DEPARTMENTS.map(d => ({ value: d.id, label: d.name }))]} required />
              <Input label="Designation / Job Title" value={form.designation} onChange={f('designation')} placeholder="e.g. Software Engineer" required />
              <Input label="Work Location" value={form.workLocation} onChange={f('workLocation')} placeholder="e.g. London HQ" />
              <Input label="Joining Date" type="date" value={form.joiningDate} onChange={f('joiningDate')} required />
              <Select label="Employment Type" value={form.employmentType} onChange={f('employmentType')}
                options={['Full-Time', 'Part-Time', 'Contract', 'Intern'].map(t => ({ value: t, label: t }))} />
              <Input label={`Annual Salary (${form.currency})`} type="number" value={form.salary} onChange={f('salary')} placeholder="e.g. 45000" />
              <Select label="Reporting Manager" value={form.manager} onChange={f('manager')}
                options={[{ value: '', label: 'No Manager' }, ...EMPLOYEES.filter(e => e.status === 'Active').map(e => ({ value: e.id, label: `${e.firstName} ${e.lastName}` }))]} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <Button variant="secondary" onClick={() => setStep(1)}>← Back</Button>
              <Button onClick={() => setStep(3)} disabled={!form.department || !form.designation || !form.joiningDate}>Next →</Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, margin: '0 0 20px' }}>Step 3 — Review & Submit</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {[
                ['Full Name', `${form.firstName} ${form.lastName}`],
                ['Email', form.email],
                ['Country', { UK: '🇬🇧 United Kingdom', IN: '🇮🇳 India', MY: '🇲🇾 Malaysia' }[form.country]],
                ['Department', DEPARTMENTS.find(d => d.id === form.department)?.name || '—'],
                ['Designation', form.designation],
                ['Work Location', form.workLocation || '—'],
                ['Joining Date', form.joiningDate],
                ['Employment', form.employmentType],
                ['Salary', form.salary ? `${form.currency} ${Number(form.salary).toLocaleString()}` : '—'],
                ['Gender', form.gender],
              ].map(([k, v]) => (
                <div key={k} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{k}</div>
                  <div style={{ color: '#cbd5e1', fontSize: 13, fontWeight: 500 }}>{v || '—'}</div>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 10, padding: '14px', marginBottom: 20 }}>
              <div style={{ color: '#a5b4fc', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>✅ What will be auto-created:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Employee ID', 'Login Credentials', 'Leave Policy', 'System Access', 'Welcome Email'].map(item => (
                  <span key={item} style={{ background: 'rgba(16,185,129,0.1)', color: '#6ee7b7', padding: '4px 10px', borderRadius: 6, fontSize: 12 }}>✓ {item}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="secondary" onClick={() => setStep(2)}>← Back</Button>
              <Button onClick={handleSubmit}>🚀 Create Employee</Button>
            </div>
          </>
        )}
      </Card>
    </PageWrapper>
  );
}

// ======================== TIMESHEET ========================
export function Timesheet() {
  const { currentEmployee, currentUser } = useAuth();
  const isHROrAdmin = currentUser?.role === 'hr' || currentUser?.role === 'admin';
  const [form, setForm] = useState({ week: '', project: '', task: '', hours: '' });
  const [timesheets, setTimesheets] = useState(TIMESHEETS);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const myTimesheets = isHROrAdmin ? timesheets : timesheets.filter(t => t.employeeId === currentEmployee?.id);

  const handleSubmit = () => {
    const newTS = {
      id: `TS-${String(timesheets.length + 1).padStart(3, '0')}`,
      employeeId: currentEmployee?.id,
      week: form.week,
      project: form.project,
      task: form.task,
      hours: Number(form.hours),
      status: 'submitted',
      submittedOn: new Date().toISOString().split('T')[0],
    };
    setTimesheets(prev => [...prev, newTS]);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); setForm({ week: '', project: '', task: '', hours: '' }); }, 1500);
  };

  const totalHours = myTimesheets.reduce((a, t) => a + t.hours, 0);

  return (
    <PageWrapper>
      <PageHeader
        title={isHROrAdmin ? "Timesheet Review" : "My Timesheets"}
        subtitle={isHROrAdmin ? "Review submitted timesheets" : "Submit and track your weekly timesheets"}
        action={!isHROrAdmin && <Button icon="➕" onClick={() => setShowForm(true)}>Submit Timesheet</Button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 24 }}>
        <StatCard icon="📋" label="Total Sheets" value={myTimesheets.length} color="#6366f1" />
        <StatCard icon="⏱" label="Total Hours" value={totalHours} sub="All time" color="#10b981" />
        <StatCard icon="⏳" label="Pending" value={myTimesheets.filter(t => t.status === 'submitted').length} color="#f59e0b" />
        <StatCard icon="✅" label="Approved" value={myTimesheets.filter(t => t.status === 'approved').length} color="#8b5cf6" />
      </div>

      <Card>
        <Table
          columns={[
            ...(isHROrAdmin ? [{
              key: 'employee', label: 'Employee', render: (_, row) => {
                const emp = EMPLOYEES.find(e => e.id === row.employeeId);
                return <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><AvatarCircle name={`${emp?.firstName} ${emp?.lastName}`} size={28} /><span style={{ color: '#f1f5f9', fontSize: 13 }}>{emp?.firstName} {emp?.lastName}</span></div>;
              }
            }] : []),
            { key: 'week', label: 'Week', render: (_, row) => <span style={{ color: '#818cf8', fontSize: 12 }}>{row.week}</span> },
            { key: 'project', label: 'Project', render: (_, row) => row.project },
            { key: 'task', label: 'Task', render: (_, row) => <span style={{ color: '#94a3b8', fontSize: 13 }}>{row.task}</span> },
            { key: 'hours', label: 'Hours', render: (_, row) => <span style={{ color: '#f1f5f9', fontWeight: 700 }}>{row.hours}h</span> },
            { key: 'submittedOn', label: 'Submitted', render: (_, row) => <span style={{ color: '#64748b', fontSize: 12 }}>{row.submittedOn || 'Draft'}</span> },
            { key: 'status', label: 'Status', render: (_, row) => <Badge status={row.status} /> },
            ...(isHROrAdmin ? [{
              key: 'action', label: '', render: (_, row) => row.status === 'submitted' ? (
                <Button size="sm" variant="success" onClick={() => setTimesheets(prev => prev.map(t => t.id === row.id ? { ...t, status: 'approved' } : t))}>Approve</Button>
              ) : null
            }] : []),
          ]}
          data={myTimesheets}
          emptyMessage="No timesheets found"
        />
      </Card>

      <Modal open={showForm} onClose={() => setShowForm(false)} title="Submit Timesheet">
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <div style={{ color: '#6ee7b7', fontSize: 18, fontWeight: 600 }}>Timesheet submitted!</div>
          </div>
        ) : (
          <>
            <Input label="Week (e.g. 2025-W28)" value={form.week} onChange={v => setForm(f => ({ ...f, week: v }))} placeholder="2025-W28" required />
            <Input label="Project" value={form.project} onChange={v => setForm(f => ({ ...f, project: v }))} placeholder="Project Alpha" required />
            <Input label="Task Description" value={form.task} onChange={v => setForm(f => ({ ...f, task: v }))} placeholder="API development" required />
            <Input label="Hours Worked" type="number" value={form.hours} onChange={v => setForm(f => ({ ...f, hours: v }))} placeholder="40" required />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button onClick={handleSubmit} disabled={!form.week || !form.project || !form.hours}>Submit</Button>
            </div>
          </>
        )}
      </Modal>
    </PageWrapper>
  );
}

// ======================== PROJECTS ========================
export function Projects() {
  const { currentEmployee, currentUser } = useAuth();
  const isHROrAdmin = currentUser?.role === 'hr' || currentUser?.role === 'admin';
  const myProjects = isHROrAdmin ? PROJECTS : PROJECTS.filter(p => p.assignedEmployees.includes(currentEmployee?.id));
  const FLAGS = { UK: '🇬🇧', IN: '🇮🇳', MY: '🇲🇾' };

  return (
    <PageWrapper>
      <PageHeader
        title={isHROrAdmin ? "Project Management" : "My Projects"}
        subtitle={isHROrAdmin ? "Track all active projects and assignments" : "View your current project assignments"}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 24 }}>
        <StatCard icon="💼" label="Total Projects" value={myProjects.length} color="#6366f1" />
        <StatCard icon="✅" label="Active" value={myProjects.filter(p => p.status === 'Active').length} color="#10b981" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {myProjects.map(proj => (
          <Card key={proj.id} style={{ borderColor: proj.status === 'Active' ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <h3 style={{ color: '#f1f5f9', fontSize: 15, fontWeight: 700, margin: '0 0 4px' }}>{proj.name}</h3>
                <span style={{ color: '#64748b', fontSize: 12 }}>{proj.id} · {proj.client}</span>
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ fontSize: 18 }}>{FLAGS[proj.country]}</span>
                <Badge status={proj.status.toLowerCase()} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, color: '#64748b', fontSize: 12, marginBottom: 12 }}>
              <span>📅 Start: {proj.startDate}</span>
              <span>🏁 End: {proj.endDate}</span>
            </div>
            <div>
              <div style={{ color: '#475569', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Assigned Team</div>
              <div style={{ display: 'flex', gap: -8 }}>
                {proj.assignedEmployees.map(empId => {
                  const emp = EMPLOYEES.find(e => e.id === empId);
                  return emp ? (
                    <div key={empId} title={`${emp.firstName} ${emp.lastName}`} style={{ marginRight: -8 }}>
                      <AvatarCircle name={`${emp.firstName} ${emp.lastName}`} size={30} />
                    </div>
                  ) : null;
                })}
                <span style={{ color: '#64748b', fontSize: 12, marginLeft: 16, alignSelf: 'center' }}>
                  {proj.assignedEmployees.length} member(s)
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}
