# ⚡teamforsolution HR — Multi-Country HRMS

A fully functional, production-grade **Human Resource Management System** supporting **UK 🇬🇧**, **India 🇮🇳**, and **Malaysia 🇲🇾** operations.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Open in browser
http://localhost:3000
```

---

## 🔑 Demo Login Accounts

| Role | Email | Password |
|------|-------|----------|
| **Admin** | robert.hargreaves@teamforsolutionhr.com | admin123 |
| **HR Manager** | sarah.mitchell@teamforsolutionhr.com | hr123 |
| **Employee (UK)** | james.thornton@teamforsolutionhr.com | emp123 |
| **Employee (India)** | priya.sharma@teamforsolutionhr.com | emp123 |
| **Employee (Malaysia)** | amir.razak@teamforsolutionhr.com | emp123 |

---

## 📦 Modules Included

| Module | Employee | HR | Admin |
|--------|----------|-----|-------|
| Dashboard | ✅ Personal | ✅ HR view | ✅ Full analytics |
| Employee Management | 👁 View own | ✅ Manage all | ✅ Full control |
| New Joiner Onboarding | ❌ | ✅ 3-step wizard | ✅ |
| Leave Management | ✅ Apply & view | ✅ Approve/reject | ✅ |
| Attendance & Clock-in | ✅ Clock in/out | ✅ Review | ✅ |
| Timesheet | ✅ Submit | ✅ Review | ✅ |
| Payroll & Payslips | ✅ View own | ✅ Manage | ✅ |
| Assets | ✅ View assigned | ✅ Manage | ✅ |
| Training | ✅ View & complete | ✅ Assign | ✅ |
| Projects | ✅ View assigned | ✅ Manage | ✅ |
| Reports & Analytics | ❌ | ✅ Export | ✅ |
| User Management | ❌ | ❌ | ✅ |
| Audit Logs | ❌ | ❌ | ✅ |
| Country Settings | ❌ | ❌ | ✅ |

---

## 🌍 Multi-Country Support

- **🇬🇧 United Kingdom** — GBP, NI deductions, GDPR, pension auto-enrolment, 28-day holiday entitlement
- **🇮🇳 India** — INR, PF/EPF, country-specific leave policies
- **🇲🇾 Malaysia** — MYR, EPF, Malaysian Employment Act compliance

---

## 🏗 Tech Stack (Frontend Demo)

```
React 18          — Component framework
Recharts          — Data visualizations
Lucide React      — Icons
date-fns          — Date utilities
```

## 🏗 Recommended Backend Stack

```
Spring Boot 3     — Microservices backend
Java 21           — Core language
PostgreSQL        — Primary database
JWT               — Authentication
AWS S3            — Document storage
Redis             — Caching/sessions
```

---

## 📐 Architecture

```
src/
├── components/
│   ├── auth/           Login page
│   ├── layout/         Sidebar, Layout, Shared UI
│   ├── dashboard/      Role-specific dashboards
│   ├── employees/      Employee management
│   ├── leave/          Leave management
│   ├── payroll/        Payroll & payslips
│   ├── attendance/     Attendance & clock-in
│   ├── pages/          Assets, Training, Reports, Profile
│   │   └── MorePages   NewJoiner, Timesheet, Projects
│   └── admin/          User mgmt, Audit logs, Settings
├── context/            AuthContext (role-based auth)
└── data/               mockData.js (all test data)
```

---

## 🔌 Connecting to Real Backend

Replace mock data imports with API calls:

```javascript
// Instead of:
import { EMPLOYEES } from '../data/mockData';

// Use:
const [employees, setEmployees] = useState([]);
useEffect(() => {
  fetch('/api/employees', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(setEmployees);
}, []);
```

---

## 📋 Suggested Microservices (Spring Boot)

| Service | Port | Description |
|---------|------|-------------|
| auth-service | 8001 | JWT auth, user management |
| employee-service | 8002 | Employee profiles, onboarding |
| leave-service | 8003 | Leave requests, approvals |
| attendance-service | 8004 | Clock-in/out, timesheets |
| payroll-service | 8005 | Salary, payslips |
| asset-service | 8006 | Company assets |
| training-service | 8007 | Training programs |
| report-service | 8008 | Reports, analytics |
| notification-service | 8009 | Email, in-app alerts |

---

## 🇬🇧 UK Legal Compliance Features

- ✅ GDPR — Data consent, audit logs, right to deletion
- ✅ Right to Work — Document tracking (passport, BRP, visa)
- ✅ Pension Auto-Enrolment — Employee + employer contributions
- ✅ NI Deductions — National Insurance in payslip
- ✅ 28-Day Holiday — Statutory minimum enforced
- ✅ Sick Leave — Self-certification tracking

---

## 💰 SaaS Revenue Model

| Plan | Price | Features |
|------|-------|----------|
| Starter | £2/employee/month | Core HR, leave, attendance |
| Growth | £4/employee/month | + Payroll, training, reports |
| Enterprise | Custom | + AI features, multi-company, API |

---

## 🤖 AI Features (Roadmap)

1. **AI HR Assistant** — Policy Q&A, leave balance, onboarding help
2. **Recruitment Screening** — CV matching to job roles
3. **Salary Recommendations** — Market-aligned salary suggestions
4. **Attendance Insights** — Pattern analysis, absence risk flags
5. **Dashboard Summaries** — Auto-generated weekly HR briefings

---

## 📄 License

MIT — Free to use and modify for commercial purposes.

---

Built with ⚡ by teamforsolution HR Team
