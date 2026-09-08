import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

export const DEMO_USERS = {
  STUDENT: {
    id: '16010124169',
    name: 'Shlok Mehta',
    role: 'STUDENT',
    email: 'shlok.mehta@somaiya.edu',
    rollNo: '16010124169',
    batch: 'D3',
    department: 'Computer Science and Engineering',
  },
  FACULTY: {
    id: 'FAC-102',
    name: 'Prof. Sharma',
    role: 'FACULTY',
    email: 'sharma.prof@somaiya.edu',
    department: 'Computer Science and Engineering',
  },
  ADMIN: {
    id: 'ADM-001',
    name: 'Administrator',
    role: 'ADMIN',
    email: 'admin.kjsse@somaiya.edu',
    department: 'KJSSE Virtual Labs System Administration',
  },
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('vlab_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached user:', e);
      }
    }
    return DEMO_USERS.STUDENT;
  });

  const [role, setRole] = useState(() => currentUser?.role || 'STUDENT');
  const [token, setToken] = useState(() => localStorage.getItem('vlab_token') || 'demo-jwt-token-fsd');

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('vlab_user', JSON.stringify(currentUser));
      setRole(currentUser.role);
    }
  }, [currentUser]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('vlab_token', token);
    } else {
      localStorage.removeItem('vlab_token');
    }
  }, [token]);

  const switchDemoRole = async (newRole) => {
    const targetUser = DEMO_USERS[newRole] || DEMO_USERS.STUDENT;
    setCurrentUser(targetUser);
    setRole(targetUser.role);

    try {
      const res = await api.post('/auth/switch-demo-role/', { role: newRole });
      if (res.data && res.data.token) {
        setToken(res.data.token);
        localStorage.setItem('vlab_token', res.data.token);
        if (res.data.user) {
          setCurrentUser(res.data.user);
          localStorage.setItem('vlab_user', JSON.stringify(res.data.user));
          return;
        }
      }
    } catch (e) {
      console.warn('Backend switch-role offline, using local persona');
    }

    const mockToken = `demo-${newRole.toLowerCase()}-token`;
    setToken(mockToken);
    localStorage.setItem('vlab_token', mockToken);
    localStorage.setItem('vlab_user', JSON.stringify(targetUser));
  };

  // Real or mock login endpoint
  const login = async (credentials) => {
    try {
      const res = await api.post('/auth/login/', credentials);
      if (res.data) {
        setCurrentUser(res.data.user);
        setRole(res.data.user.role);
        setToken(res.data.token);
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      console.warn('Backend login unavailable, keeping fallback demo user');
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const logout = () => {
    setCurrentUser(DEMO_USERS.STUDENT);
    setRole('STUDENT');
    setToken('demo-jwt-token-fsd');
    localStorage.removeItem('vlab_user');
    localStorage.removeItem('vlab_token');
  };

  const value = {
    currentUser,
    role,
    token,
    switchDemoRole,
    login,
    logout,
    isStudent: role === 'STUDENT',
    isFaculty: role === 'FACULTY' || role === 'ADMIN',
    isAdmin: role === 'ADMIN',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
