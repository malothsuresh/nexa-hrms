// ============================================================
// MOCK DATA - Full HRMS Dataset
// ============================================================

export const COUNTRIES = {
  UK: { code: 'UK', name: 'United Kingdom', currency: 'GBP', symbol: '£', timezone: 'Europe/London', flag: '🇬🇧' },
  IN: { code: 'IN', name: 'India', currency: 'INR', symbol: '₹', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  MY: { code: 'MY', name: 'Malaysia', currency: 'MYR', symbol: 'RM', timezone: 'Asia/Kuala_Lumpur', flag: '🇲🇾' },
};

export const DEPARTMENTS = [
  { id: 'dep-1', name: 'Engineering', headCount: 12 },
  { id: 'dep-2', name: 'Human Resources', headCount: 5 },
  { id: 'dep-3', name: 'Finance', headCount: 7 },
  { id: 'dep-4', name: 'Marketing', headCount: 6 },
  { id: 'dep-5', name: 'Operations', headCount: 9 },
  { id: 'dep-6', name: 'Sales', headCount: 11 },
];

export const EMPLOYEES = [
  {
    id: 'EMP-001', firstName: 'Sarah', lastName: 'Mitchell', email: 'sarah.mitchell@nexahr.com',
    phone: '+44 7911 123456', gender: 'Female', dob: '1990-03-15', country: 'UK',
    department: 'dep-2', designation: 'HR Manager', employmentType: 'Full-Time',
    joiningDate: '2020-01-10', salary: 52000, currency: 'GBP',
    manager: 'EMP-003', status: 'Active', role: 'hr',
    avatar: null, workLocation: 'London HQ', leaveBalance: { annual: 18, sick: 8, unpaid: 0 },
    address: '12 Baker Street, London, W1U 6TN',
    emergencyContact: { name: 'James Mitchell', relation: 'Spouse', phone: '+44 7911 654321' },
    bankDetails: { account: '****4521', sortCode: '20-45-67', bank: 'Barclays' },
    rightToWork: { type: 'British Passport', expiry: null, verified: true },
    pension: { enrolled: true, contribution: 5, employer: 8 },
  },
  {
    id: 'EMP-002', firstName: 'James', lastName: 'Thornton', email: 'james.thornton@nexahr.com',
    phone: '+44 7922 234567', gender: 'Male', dob: '1988-07-22', country: 'UK',
    department: 'dep-1', designation: 'Senior Engineer', employmentType: 'Full-Time',
    joiningDate: '2019-06-15', salary: 68000, currency: 'GBP',
    manager: 'EMP-003', status: 'Active', role: 'employee',
    avatar: null, workLocation: 'London HQ', leaveBalance: { annual: 12, sick: 10, unpaid: 0 },
    address: '45 Oxford Road, Manchester, M1 5GE',
    emergencyContact: { name: 'Emily Thornton', relation: 'Partner', phone: '+44 7922 345678' },
    bankDetails: { account: '****7832', sortCode: '09-01-50', bank: 'HSBC' },
    rightToWork: { type: 'British Passport', expiry: null, verified: true },
    pension: { enrolled: true, contribution: 5, employer: 8 },
  },
  {
    id: 'EMP-003', firstName: 'Robert', lastName: 'Hargreaves', email: 'robert.hargreaves@nexahr.com',
    phone: '+44 7933 345678', gender: 'Male', dob: '1982-11-05', country: 'UK',
    department: 'dep-1', designation: 'Engineering Director', employmentType: 'Full-Time',
    joiningDate: '2017-03-01', salary: 95000, currency: 'GBP',
    manager: null, status: 'Active', role: 'admin',
    avatar: null, workLocation: 'London HQ', leaveBalance: { annual: 22, sick: 10, unpaid: 0 },
    address: '8 Kensington Gardens, London, W8 4PT',
    emergencyContact: { name: 'Claire Hargreaves', relation: 'Spouse', phone: '+44 7933 456789' },
    bankDetails: { account: '****2341', sortCode: '60-00-01', bank: 'NatWest' },
    rightToWork: { type: 'British Passport', expiry: null, verified: true },
    pension: { enrolled: true, contribution: 8, employer: 10 },
  },
  {
    id: 'EMP-004', firstName: 'Priya', lastName: 'Sharma', email: 'priya.sharma@nexahr.com',
    phone: '+91 98765 43210', gender: 'Female', dob: '1993-05-28', country: 'IN',
    department: 'dep-1', designation: 'Full Stack Developer', employmentType: 'Full-Time',
    joiningDate: '2021-08-01', salary: 1200000, currency: 'INR',
    manager: 'EMP-003', status: 'Active', role: 'employee',
    avatar: null, workLocation: 'Bengaluru Office', leaveBalance: { annual: 15, sick: 7, unpaid: 2 },
    address: 'Flat 204, Brigade Gateway, Bengaluru 560055',
    emergencyContact: { name: 'Raj Sharma', relation: 'Father', phone: '+91 98765 11111' },
    bankDetails: { account: '****8901', sortCode: null, bank: 'HDFC Bank' },
    rightToWork: { type: 'Indian Passport', expiry: '2030-06-15', verified: true },
    pension: { enrolled: true, contribution: 12, employer: 12 },
  },
  {
    id: 'EMP-005', firstName: 'Amir', lastName: 'Razak', email: 'amir.razak@nexahr.com',
    phone: '+60 12 345 6789', gender: 'Male', dob: '1991-09-10', country: 'MY',
    department: 'dep-4', designation: 'Marketing Manager', employmentType: 'Full-Time',
    joiningDate: '2020-11-15', salary: 85000, currency: 'MYR',
    manager: 'EMP-003', status: 'Active', role: 'employee',
    avatar: null, workLocation: 'Kuala Lumpur Office', leaveBalance: { annual: 14, sick: 9, unpaid: 0 },
    address: 'Unit 15-3, KLCC Residences, Kuala Lumpur 50450',
    emergencyContact: { name: 'Faridah Razak', relation: 'Mother', phone: '+60 12 555 6789' },
    bankDetails: { account: '****3456', sortCode: null, bank: 'Maybank' },
    rightToWork: { type: 'Malaysian IC', expiry: null, verified: true },
    pension: { enrolled: true, contribution: 11, employer: 13 },
  },
  {
    id: 'EMP-006', firstName: 'Charlotte', lastName: 'Davies', email: 'charlotte.davies@nexahr.com',
    phone: '+44 7944 456789', gender: 'Female', dob: '1995-02-14', country: 'UK',
    department: 'dep-3', designation: 'Finance Analyst', employmentType: 'Full-Time',
    joiningDate: '2022-03-07', salary: 42000, currency: 'GBP',
    manager: 'EMP-003', status: 'Active', role: 'employee',
    avatar: null, workLocation: 'London HQ', leaveBalance: { annual: 20, sick: 10, unpaid: 0 },
    address: '33 Victoria Street, Bristol, BS1 6AY',
    emergencyContact: { name: 'Mark Davies', relation: 'Father', phone: '+44 7944 567890' },
    bankDetails: { account: '****5672', sortCode: '40-47-84', bank: 'Lloyds' },
    rightToWork: { type: 'British Passport', expiry: null, verified: true },
    pension: { enrolled: true, contribution: 5, employer: 8 },
  },
  {
    id: 'EMP-007', firstName: 'Vikram', lastName: 'Nair', email: 'vikram.nair@nexahr.com',
    phone: '+91 87654 32109', gender: 'Male', dob: '1989-12-01', country: 'IN',
    department: 'dep-5', designation: 'Operations Lead', employmentType: 'Full-Time',
    joiningDate: '2018-09-20', salary: 1500000, currency: 'INR',
    manager: 'EMP-003', status: 'Active', role: 'employee',
    avatar: null, workLocation: 'Mumbai Office', leaveBalance: { annual: 10, sick: 5, unpaid: 0 },
    address: 'Flat 501, Lodha Altamount, Mumbai 400026',
    emergencyContact: { name: 'Meena Nair', relation: 'Spouse', phone: '+91 87654 22222' },
    bankDetails: { account: '****7012', sortCode: null, bank: 'ICICI Bank' },
    rightToWork: { type: 'Indian Passport', expiry: '2028-11-20', verified: true },
    pension: { enrolled: true, contribution: 12, employer: 12 },
  },
];

export const LEAVE_REQUESTS = [
  {
    id: 'LV-001', employeeId: 'EMP-002', type: 'Annual Leave', startDate: '2025-07-14',
    endDate: '2025-07-18', days: 5, reason: 'Family holiday to Spain', status: 'approved',
    appliedOn: '2025-06-28', approvedBy: 'EMP-001', approvedOn: '2025-06-30',
  },
  {
    id: 'LV-002', employeeId: 'EMP-006', type: 'Sick Leave', startDate: '2025-07-03',
    endDate: '2025-07-04', days: 2, reason: 'Unwell - GP signed off', status: 'approved',
    appliedOn: '2025-07-03', approvedBy: 'EMP-001', approvedOn: '2025-07-03',
  },
  {
    id: 'LV-003', employeeId: 'EMP-004', type: 'Annual Leave', startDate: '2025-08-01',
    endDate: '2025-08-07', days: 5, reason: 'Wedding ceremony', status: 'pending',
    appliedOn: '2025-07-01', approvedBy: null, approvedOn: null,
  },
  {
    id: 'LV-004', employeeId: 'EMP-005', type: 'Annual Leave', startDate: '2025-07-21',
    endDate: '2025-07-25', days: 5, reason: 'Visiting parents', status: 'pending',
    appliedOn: '2025-07-05', approvedBy: null, approvedOn: null,
  },
  {
    id: 'LV-005', employeeId: 'EMP-007', type: 'Sick Leave', startDate: '2025-06-25',
    endDate: '2025-06-25', days: 1, reason: 'Fever', status: 'approved',
    appliedOn: '2025-06-25', approvedBy: 'EMP-001', approvedOn: '2025-06-25',
  },
];

export const ATTENDANCE = [
  { id: 'AT-001', employeeId: 'EMP-002', date: '2025-07-07', clockIn: '08:55', clockOut: '17:30', status: 'Present', workLocation: 'Office', hours: 8.58 },
  { id: 'AT-002', employeeId: 'EMP-002', date: '2025-07-08', clockIn: '09:02', clockOut: '17:45', status: 'Present', workLocation: 'WFH', hours: 8.72 },
  { id: 'AT-003', employeeId: 'EMP-002', date: '2025-07-09', clockIn: null, clockOut: null, status: 'Absent', workLocation: null, hours: 0 },
  { id: 'AT-004', employeeId: 'EMP-006', date: '2025-07-07', clockIn: '09:15', clockOut: '17:00', status: 'Present', workLocation: 'Office', hours: 7.75 },
  { id: 'AT-005', employeeId: 'EMP-006', date: '2025-07-08', clockIn: '09:00', clockOut: '18:00', status: 'Present', workLocation: 'Office', hours: 9.0 },
  { id: 'AT-006', employeeId: 'EMP-004', date: '2025-07-07', clockIn: '09:30', clockOut: '18:30', status: 'Present', workLocation: 'Office', hours: 9.0 },
  { id: 'AT-007', employeeId: 'EMP-005', date: '2025-07-07', clockIn: '08:30', clockOut: '17:30', status: 'Present', workLocation: 'Office', hours: 9.0 },
];

export const TIMESHEETS = [
  { id: 'TS-001', employeeId: 'EMP-002', week: '2025-W27', project: 'Project Alpha', task: 'API Integration', hours: 32, status: 'submitted', submittedOn: '2025-07-06' },
  { id: 'TS-002', employeeId: 'EMP-002', week: '2025-W28', project: 'Project Beta', task: 'Frontend UI', hours: 38, status: 'draft', submittedOn: null },
  { id: 'TS-003', employeeId: 'EMP-004', week: '2025-W27', project: 'Project Alpha', task: 'Database Schema', hours: 40, status: 'approved', submittedOn: '2025-07-05' },
  { id: 'TS-004', employeeId: 'EMP-006', week: '2025-W27', project: 'Finance Audit', task: 'Q2 Reconciliation', hours: 35, status: 'approved', submittedOn: '2025-07-06' },
];

export const ASSETS = [
  { id: 'AST-001', code: 'LAP-UK-001', type: 'Laptop', brand: 'Apple MacBook Pro 14"', serial: 'C02XG1234', assignedTo: 'EMP-002', issueDate: '2019-06-15', returnDate: null, status: 'Assigned', condition: 'Good' },
  { id: 'AST-002', code: 'MON-UK-001', type: 'Monitor', brand: 'Dell 27" 4K', serial: 'DL2734567', assignedTo: 'EMP-002', issueDate: '2020-01-10', returnDate: null, status: 'Assigned', condition: 'Good' },
  { id: 'AST-003', code: 'LAP-UK-002', type: 'Laptop', brand: 'Dell XPS 15', serial: 'D02XG5678', assignedTo: 'EMP-006', issueDate: '2022-03-07', returnDate: null, status: 'Assigned', condition: 'Good' },
  { id: 'AST-004', code: 'LAP-IN-001', type: 'Laptop', brand: 'Lenovo ThinkPad X1', serial: 'LN01234567', assignedTo: 'EMP-004', issueDate: '2021-08-01', returnDate: null, status: 'Assigned', condition: 'Good' },
  { id: 'AST-005', code: 'LAP-MY-001', type: 'Laptop', brand: 'HP EliteBook 840', serial: 'HP8407890', assignedTo: 'EMP-005', issueDate: '2020-11-15', returnDate: null, status: 'Assigned', condition: 'Good' },
  { id: 'AST-006', code: 'LAP-UK-003', type: 'Laptop', brand: 'Apple MacBook Air M2', serial: 'C02YR9012', assignedTo: null, issueDate: null, returnDate: null, status: 'Available', condition: 'New' },
  { id: 'AST-007', code: 'PHN-UK-001', type: 'Mobile', brand: 'iPhone 15 Pro', serial: 'IP15P3456', assignedTo: 'EMP-003', issueDate: '2023-10-01', returnDate: null, status: 'Assigned', condition: 'Good' },
];

export const TRAININGS = [
  { id: 'TRN-001', title: 'GDPR Compliance 2025', type: 'Mandatory', provider: 'Internal', startDate: '2025-07-15', endDate: '2025-07-15', country: 'UK', assignedTo: ['EMP-002', 'EMP-006', 'EMP-003'], completions: { 'EMP-003': '2025-07-15' } },
  { id: 'TRN-002', title: 'Unconscious Bias Awareness', type: 'Mandatory', provider: 'External', startDate: '2025-08-01', endDate: '2025-08-01', country: 'ALL', assignedTo: ['EMP-002', 'EMP-004', 'EMP-005', 'EMP-006', 'EMP-007'], completions: {} },
  { id: 'TRN-003', title: 'React Advanced Patterns', type: 'Optional', provider: 'Udemy', startDate: '2025-07-01', endDate: '2025-09-30', country: 'ALL', assignedTo: ['EMP-002', 'EMP-004'], completions: { 'EMP-004': '2025-07-20' } },
  { id: 'TRN-004', title: 'Financial Regulations UK', type: 'Mandatory', provider: 'FCA', startDate: '2025-06-01', endDate: '2025-06-01', country: 'UK', assignedTo: ['EMP-006'], completions: { 'EMP-006': '2025-06-01' } },
];

export const PAYROLL = [
  { id: 'PAY-001', employeeId: 'EMP-002', month: '2025-06', basic: 5667, allowances: 500, bonus: 0, grossPay: 6167, niDeduction: 492, taxDeduction: 1087, pensionDeduction: 308, netPay: 4280, currency: 'GBP', status: 'processed' },
  { id: 'PAY-002', employeeId: 'EMP-006', month: '2025-06', basic: 3500, allowances: 200, bonus: 0, grossPay: 3700, niDeduction: 196, taxDeduction: 540, pensionDeduction: 185, netPay: 2779, currency: 'GBP', status: 'processed' },
  { id: 'PAY-003', employeeId: 'EMP-004', month: '2025-06', basic: 100000, allowances: 15000, bonus: 5000, grossPay: 120000, niDeduction: 0, taxDeduction: 30000, pensionDeduction: 12000, netPay: 78000, currency: 'INR', status: 'processed' },
  { id: 'PAY-004', employeeId: 'EMP-005', month: '2025-06', basic: 7083, allowances: 1000, bonus: 0, grossPay: 8083, niDeduction: 0, taxDeduction: 970, pensionDeduction: 888, netPay: 6225, currency: 'MYR', status: 'processed' },
  { id: 'PAY-005', employeeId: 'EMP-007', month: '2025-06', basic: 125000, allowances: 20000, bonus: 10000, grossPay: 155000, niDeduction: 0, taxDeduction: 38750, pensionDeduction: 15000, netPay: 101250, currency: 'INR', status: 'processed' },
];

export const PROJECTS = [
  { id: 'PRJ-001', name: 'Project Alpha', client: 'TechCorp UK', startDate: '2025-01-01', endDate: '2025-12-31', status: 'Active', country: 'UK', assignedEmployees: ['EMP-002', 'EMP-004'] },
  { id: 'PRJ-002', name: 'Project Beta', client: 'StartupX', startDate: '2025-05-01', endDate: '2025-11-30', status: 'Active', country: 'UK', assignedEmployees: ['EMP-002'] },
  { id: 'PRJ-003', name: 'Finance Audit Q2', client: 'Internal', startDate: '2025-06-01', endDate: '2025-07-31', status: 'Active', country: 'UK', assignedEmployees: ['EMP-006'] },
  { id: 'PRJ-004', name: 'Marketing Campaign MY', client: 'Internal', startDate: '2025-04-01', endDate: '2025-09-30', status: 'Active', country: 'MY', assignedEmployees: ['EMP-005'] },
];

export const ANNOUNCEMENTS = [
  { id: 'ANN-001', title: 'Bank Holiday - 28 August', body: 'All UK offices will be closed on Monday 28 August for the Summer Bank Holiday.', date: '2025-07-08', country: 'UK', priority: 'high' },
  { id: 'ANN-002', title: 'Annual Performance Reviews', body: 'Performance review season begins 1 September. Please ensure goals are updated in the system.', date: '2025-07-05', country: 'ALL', priority: 'medium' },
  { id: 'ANN-003', title: 'New HRMS System Launch', body: 'Welcome to NeXa HR — your new HR platform. Explore your dashboard and update your profile.', date: '2025-07-01', country: 'ALL', priority: 'high' },
];

export const USERS = [
  { id: 'USR-001', employeeId: 'EMP-001', email: 'sarah.mitchell@nexahr.com', role: 'hr', status: 'active', lastLogin: '2025-07-09 09:15', password: 'hr123' },
  { id: 'USR-002', employeeId: 'EMP-002', email: 'james.thornton@nexahr.com', role: 'employee', status: 'active', lastLogin: '2025-07-09 08:58', password: 'emp123' },
  { id: 'USR-003', employeeId: 'EMP-003', email: 'robert.hargreaves@nexahr.com', role: 'admin', status: 'active', lastLogin: '2025-07-09 08:30', password: 'admin123' },
  { id: 'USR-004', employeeId: 'EMP-004', email: 'priya.sharma@nexahr.com', role: 'employee', status: 'active', lastLogin: '2025-07-08 10:20', password: 'emp123' },
  { id: 'USR-005', employeeId: 'EMP-005', email: 'amir.razak@nexahr.com', role: 'employee', status: 'active', lastLogin: '2025-07-08 09:45', password: 'emp123' },
];

export const PUBLIC_HOLIDAYS = {
  UK: [
    { date: '2025-01-01', name: "New Year's Day" },
    { date: '2025-04-18', name: 'Good Friday' },
    { date: '2025-04-21', name: 'Easter Monday' },
    { date: '2025-05-05', name: 'Early May Bank Holiday' },
    { date: '2025-05-26', name: 'Spring Bank Holiday' },
    { date: '2025-08-25', name: 'Summer Bank Holiday' },
    { date: '2025-12-25', name: 'Christmas Day' },
    { date: '2025-12-26', name: 'Boxing Day' },
  ],
  IN: [
    { date: '2025-01-26', name: 'Republic Day' },
    { date: '2025-08-15', name: 'Independence Day' },
    { date: '2025-10-02', name: "Gandhi Jayanti" },
    { date: '2025-12-25', name: 'Christmas Day' },
  ],
  MY: [
    { date: '2025-01-01', name: "New Year's Day" },
    { date: '2025-01-29', name: 'Chinese New Year' },
    { date: '2025-05-01', name: "Labour Day" },
    { date: '2025-08-31', name: 'National Day' },
    { date: '2025-09-16', name: 'Malaysia Day' },
    { date: '2025-12-25', name: 'Christmas Day' },
  ],
};

export const AUDIT_LOGS = [
  { id: 'LOG-001', action: 'Employee Created', user: 'sarah.mitchell@nexahr.com', target: 'EMP-006', timestamp: '2022-03-07 09:30:00', ip: '192.168.1.10' },
  { id: 'LOG-002', action: 'Leave Approved', user: 'sarah.mitchell@nexahr.com', target: 'LV-001', timestamp: '2025-06-30 14:22:00', ip: '192.168.1.10' },
  { id: 'LOG-003', action: 'User Role Changed', user: 'robert.hargreaves@nexahr.com', target: 'USR-001', timestamp: '2025-07-01 11:00:00', ip: '192.168.1.5' },
  { id: 'LOG-004', action: 'Asset Assigned', user: 'sarah.mitchell@nexahr.com', target: 'AST-001', timestamp: '2019-06-15 10:15:00', ip: '192.168.1.10' },
  { id: 'LOG-005', action: 'Payroll Processed', user: 'robert.hargreaves@nexahr.com', target: 'PAY-001', timestamp: '2025-07-01 08:00:00', ip: '192.168.1.5' },
  { id: 'LOG-006', action: 'Login', user: 'james.thornton@nexahr.com', target: null, timestamp: '2025-07-09 08:58:00', ip: '192.168.1.22' },
];
