import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'Admin' | 'Manager' | 'Technician' | 'Inspector' | 'End User';
export type ProjectType = 'fm-checklist' | 'ojt' | 'fleet' | 'asset' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  selectedProject?: ProjectType;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  setSelectedProject: (project: ProjectType) => void;
  selectedProject: ProjectType;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('fm-user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string, role: UserRole = 'Manager') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockUser: User = {
      id: '1',
      name: email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      role,
      selectedProject: null,
    };

    setUser(mockUser);
    localStorage.setItem('fm-user', JSON.stringify(mockUser));
  };

  const setSelectedProject = (project: ProjectType) => {
    if (user) {
      const updatedUser = { ...user, selectedProject: project };
      setUser(updatedUser);
      localStorage.setItem('fm-user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fm-user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      setSelectedProject,
      selectedProject: user?.selectedProject || null
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}