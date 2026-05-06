import React, { createContext, useContext, useState } from 'react';
import { USERS, EMPLOYEES } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const login = (email, password) => {
    const user = USERS.find(u => u.email === email && u.password === password);
    if (user) {
      const employee = EMPLOYEES.find(e => e.id === user.employeeId);
      setCurrentUser(user);
      setCurrentEmployee(employee);
      return { success: true, role: user.role };
    }
    return { success: false };
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentEmployee(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, currentEmployee, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
