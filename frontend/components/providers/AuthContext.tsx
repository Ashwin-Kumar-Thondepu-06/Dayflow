"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { fetchApi } from '@/lib/api';

interface User {
  id: string;
  email: string;
  role: string;
  employeeId?: string;
  companyId?: string;
  forcePasswordChange?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const publicRoutes = ['/login', '/signup', '/forget-password', '/reset-password'];

    const loadUser = async () => {
      try {
        const response = await fetchApi('/auth/me');
        if (response.success && response.data) {
          setUser(response.data);
          // Redirect if forced to change password
          if (response.data.forcePasswordChange && pathname !== '/change-password') {
            router.push('/change-password');
          } else if (publicRoutes.includes(pathname)) {
            // If they are logged in, don't let them stay on public routes like /login
            router.push('/employees');
          }
        } else {
          setUser(null);
          handleUnauthenticated();
        }
      } catch (error) {
        setUser(null);
        handleUnauthenticated();
      } finally {
        setIsLoading(false);
      }
    };

    const handleUnauthenticated = () => {
      // If we are on a protected route, redirect to login (allow root '/' as public if you want, or redirect all)
      if (!publicRoutes.includes(pathname) && pathname !== '/') {
        router.push('/login');
      }
    };

    loadUser();
  }, [pathname, router]);

  const login = (newUser: User) => {
    setUser(newUser);
    if (newUser.forcePasswordChange) {
      router.push('/change-password');
    } else {
      router.push('/employees');
    }
  };

  const logout = async () => {
    try {
      await fetchApi('/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout failed', e);
    }
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
