import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User, Screen } from '../types';

interface AuthContextValue {
  screen: Screen;
  setScreen: (s: Screen) => void;
  user: User | null;
  setUser: (u: User | null) => void;
  profiles: User[];
  setProfiles: (p: User[]) => void;
  pendingStaff: User | null;
  setPendingStaff: (u: User | null) => void;
  showCreateModal: boolean;
  setShowCreateModal: (v: boolean) => void;
  needPin: boolean;
  setNeedPin: (v: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>('auth');
  const [user, setUserState] = useState<User | null>(null);
  const [profiles, setProfiles] = useState<User[]>([]);
  const [pendingStaff, setPendingStaff] = useState<User | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [needPin, setNeedPin] = useState(false);

  const setUser = useCallback((u: User | null) => {
    setUserState(u);
    if (u) {
      localStorage.setItem('vinta_user', JSON.stringify(u));
    } else {
      localStorage.removeItem('vinta_user');
    }
  }, []);

  const logout = useCallback(() => {
    setUserState(null);
    setProfiles([]);
    setPendingStaff(null);
    setShowCreateModal(false);
    setNeedPin(false);
    setScreen('auth');
    localStorage.removeItem('vinta_token');
    localStorage.removeItem('vinta_user');
  }, []);

  // Restore user from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('vinta_user');
    const token = localStorage.getItem('vinta_token');
    if (saved && token) {
      try {
        const parsed = JSON.parse(saved) as User;
        setUserState(parsed);
        setScreen('app');
      } catch {
        localStorage.removeItem('vinta_user');
        localStorage.removeItem('vinta_token');
      }
    }
  }, []);

  // Listen for auth:logout event from axios interceptor
  useEffect(() => {
    const handler = () => logout();
    window.addEventListener('auth:logout', handler);
    return () => window.removeEventListener('auth:logout', handler);
  }, [logout]);

  return (
    <AuthContext.Provider value={{
      screen, setScreen,
      user, setUser,
      profiles, setProfiles,
      pendingStaff, setPendingStaff,
      showCreateModal, setShowCreateModal,
      needPin, setNeedPin,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
