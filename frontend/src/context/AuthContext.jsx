import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/client';

export const DEMO_USERS = {
  STUDENT: {
    id: 1,
    username: 'shlok',
    first_name: 'Shlok',
    last_name: 'Mehta',
    name: 'Shlok Mehta',
    role: 'STUDENT',
    email: 'student@vlab.edu',
    roll_or_faculty_id: '16010124169',
    batch: 'D3',
    department: 'Computer Science (Batch D3)',
  },
  FACULTY: {
    id: 2,
    username: 'faculty',
    first_name: 'Prof.',
    last_name: 'Sharma',
    name: 'Prof. Sharma',
    role: 'FACULTY',
    email: 'faculty@vlab.edu',
    roll_or_faculty_id: 'FAC-CS-204',
    department: 'Computer Science & Engineering',
  },
  ADMIN: {
    id: 3,
    username: 'admin',
    first_name: 'System',
    last_name: 'Administrator',
    name: 'System Administrator',
    role: 'ADMIN',
    email: 'admin@vlab.edu',
    roll_or_faculty_id: 'ADM-001',
    department: 'Virtual Lab Technical Core',
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

  const [token, setToken] = useState(() => localStorage.getItem('vlab_token') || 'demo-jwt-token-fsd');
  const [role, setRole] = useState(() => currentUser?.role || 'STUDENT');
  const [isLoading, setIsLoading] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'

  // Sync role whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      const computedRole = currentUser.role || 'STUDENT';
      setRole(computedRole);
      localStorage.setItem('vlab_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // Sync token to localStorage and update api header
  useEffect(() => {
    if (token) {
      localStorage.setItem('vlab_token', token);
    } else {
      localStorage.removeItem('vlab_token');
    }
  }, [token]);

  // Verify session on initial mount if token exists
  useEffect(() => {
    const verifySession = async () => {
      const storedToken = localStorage.getItem('vlab_token');
      if (!storedToken || storedToken.startsWith('demo-')) return;

      try {
        const res = await api.get('/auth/me/');
        if (res.data?.user) {
          const u = res.data.user;
          const formatted = {
            ...u,
            name: `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.username,
          };
          setCurrentUser(formatted);
          setRole(formatted.role);
        }
      } catch (err) {
        // Token expired or invalid
        if (err.response?.status === 401) {
          console.warn('Session expired, falling back to demo persona');
          setCurrentUser(DEMO_USERS.STUDENT);
          setToken('demo-jwt-token-fsd');
        }
      }
    };

    verifySession();
  }, []);

  const openLogin = useCallback(() => {
    setAuthModalMode('login');
    setAuthModalOpen(true);
  }, []);

  const openRegister = useCallback(() => {
    setAuthModalMode('register');
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  // Real backend login
  const login = async ({ username, password }) => {
    setIsLoading(true);
    try {
      const res = await api.post('/auth/login/', { username, password });
      if (res.data?.token && res.data?.user) {
        const u = res.data.user;
        const formattedUser = {
          ...u,
          name: `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.username,
        };
        setCurrentUser(formattedUser);
        setRole(formattedUser.role);
        setToken(res.data.token);
        localStorage.setItem('vlab_token', res.data.token);
        localStorage.setItem('vlab_user', JSON.stringify(formattedUser));
        setIsLoading(false);
        setAuthModalOpen(false);
        return { success: true, user: formattedUser };
      }
      setIsLoading(false);
      return { success: false, error: 'Unexpected response from server' };
    } catch (err) {
      setIsLoading(false);
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        (typeof err.response?.data === 'string' ? err.response?.data : null) ||
        'Unable to connect to authentication server.';
      return { success: false, error: errorMsg };
    }
  };

  // Real backend registration
  const register = async (userData) => {
    setIsLoading(true);
    try {
      const res = await api.post('/auth/register/', userData);
      if (res.data?.token && res.data?.user) {
        const u = res.data.user;
        const formattedUser = {
          ...u,
          name: `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.username,
        };
        setCurrentUser(formattedUser);
        setRole(formattedUser.role);
        setToken(res.data.token);
        localStorage.setItem('vlab_token', res.data.token);
        localStorage.setItem('vlab_user', JSON.stringify(formattedUser));
        setIsLoading(false);
        setAuthModalOpen(false);
        return { success: true, user: formattedUser };
      }
      setIsLoading(false);
      return { success: false, error: 'Registration succeeded, but failed to log in.' };
    } catch (err) {
      setIsLoading(false);
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        (err.response?.data?.username ? `Username: ${err.response.data.username[0]}` : null) ||
        (err.response?.data?.email ? `Email: ${err.response.data.email[0]}` : null) ||
        (err.response?.data?.password ? `Password: ${err.response.data.password[0]}` : null) ||
        'Registration failed. Please check your inputs.';
      return { success: false, error: errorMsg };
    }
  };

  // Real backend logout with cleanup
  const logout = async () => {
    try {
      if (token && !token.startsWith('demo-')) {
        await api.post('/auth/logout/');
      }
    } catch (e) {
      console.warn('Logout notification to backend failed or unneeded');
    } finally {
      setCurrentUser(DEMO_USERS.STUDENT);
      setRole('STUDENT');
      setToken('demo-jwt-token-fsd');
      localStorage.removeItem('vlab_user');
      localStorage.removeItem('vlab_token');
    }
  };

  // Quick switch role (Dev & Viva Presentation Feature)
  const switchDemoRole = async (newRole) => {
    const targetUser = DEMO_USERS[newRole] || DEMO_USERS.STUDENT;
    setCurrentUser(targetUser);
    setRole(targetUser.role);

    try {
      const res = await api.post('/auth/switch-demo-role/', { role: newRole });
      if (res.data?.token) {
        setToken(res.data.token);
        localStorage.setItem('vlab_token', res.data.token);
        if (res.data.user) {
          const u = res.data.user;
          const formatted = {
            ...u,
            name: `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.username,
          };
          setCurrentUser(formatted);
          localStorage.setItem('vlab_user', JSON.stringify(formatted));
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

  const isRealAuth = Boolean(token && !token.startsWith('demo-'));

  const value = {
    currentUser,
    role,
    token,
    isLoading,
    isRealAuth,
    authModalOpen,
    authModalMode,
    openLogin,
    openRegister,
    closeAuthModal,
    setAuthModalMode,
    switchDemoRole,
    login,
    register,
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
