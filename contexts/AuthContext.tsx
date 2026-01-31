import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUser as getUserFromStorage, getToken as getTokenFromStorage, saveToken as saveTokenToStorage, saveUser as saveUserToStorage, logout as clearAuth } from '../utils/auth';

export interface User {
  id: number | string;
  name: string;
  email: string;
  avatar?: string;
  [key: string]: any;
}

export interface AuthToken {
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (tokenData: AuthToken, userData: User) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getTokenFromStorage();
    const storedUser = getUserFromStorage();
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser as User);
    }
  }, []);

  const login = (tokenData: AuthToken, userData: User) => {
    saveTokenToStorage(tokenData);
    saveUserToStorage(userData);
    setToken(tokenData.token);
    setUser(userData);
  };

  const logout = () => {
    clearAuth();
    setToken(null);
    setUser(null);
  };

  const isLoggedIn = () => !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthProvider;
