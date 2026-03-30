import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, role: 'buyer' | 'seller' | 'admin', name?: string) => Promise<void>;
  signOut: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const initAuth = () => {
      try {
        const savedUser = localStorage.getItem('silla_user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Failed to parse user from storage", error);
        localStorage.removeItem('silla_user');
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for storage changes (multi-tab support)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'silla_user') {
        if (e.newValue) {
          setUser(JSON.parse(e.newValue));
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = async (email: string, role: 'buyer' | 'seller' | 'admin', name?: string) => {
    return new Promise<void>((resolve) => {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: name || email.split('@')[0],
        email,
        role,
        isVerified: true,
        isApproved: true,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };
      
      // Update state and storage
      setUser(newUser);
      localStorage.setItem('silla_user', JSON.stringify(newUser));
      
      // Artificial delay to ensure state commit in some environments
      setTimeout(() => {
        resolve();
      }, 100);
    });
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('silla_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('silla_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signOut, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};