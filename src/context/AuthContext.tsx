// src/context/AuthContext.tsx
"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

export type AuthUser = {
  id: number;
  fullName: string;
  email: string;
  token?: string;
} | null;

type AuthContextValue = {
  user: AuthUser;
  login: (userData: AuthUser) => void;
  logout: () => void;
  register?: (userData: AuthUser) => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("user");
      if (saved) setUser(JSON.parse(saved));
    } catch (e) {
      console.error("Failed to read user from localStorage", e);
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = (userData: AuthUser) => setUser(userData);
  const logout = () => setUser(null);

  const value: AuthContextValue = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
