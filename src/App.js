import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/auth/Login';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import Employees from './components/employees/Employees';
import Leave from './components/leave/Leave';
import Payroll from './components/payroll/Payroll';
import Attendance from './components/attendance/Attendance';
import { Assets, Training, Reports, Profile } from './components/pages/OtherPages';
import { NewJoiner, Timesheet, Projects } from './components/pages/MorePages';
import { UserManagement, AuditLogs, Settings } from './components/admin/AdminPages';

function AppContent() {
  const { currentUser } = useAuth();
  const [page, setPage] = useState('dashboard');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (role) => {
    setLoggedIn(true);
    setPage('dashboard');
  };

  if (!currentUser || !loggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard />;
      case 'employees': return <Employees />;
      case 'new-joiner': return <NewJoiner />;
      case 'leave': return <Leave />;
      case 'payroll': return <Payroll />;
      case 'attendance': return <Attendance />;
      case 'assets': return <Assets />;
      case 'training': return <Training />;
      case 'timesheet': return <Timesheet />;
      case 'projects': return <Projects />;
      case 'reports': return <Reports />;
      case 'profile': return <Profile />;
      case 'users': return <UserManagement />;
      case 'audit': return <AuditLogs />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout activePage={page} onNavigate={setPage}>
      {renderPage()}
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
