"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import * as authApi from "@/lib/api/auth";
import { setUnauthorizedHandler } from "@/lib/api/client";
import type { UserSummary } from "@/lib/api/types";

interface AuthContextValue {
  user: UserSummary | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Hydrates from localStorage, which isn't available during server rendering.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(authApi.getCurrentUser());
    setLoading(false);
  }, []);

  useEffect(() => {
    // centralizes 401 handling: clear stale session and bounce to /login once, from anywhere
    setUnauthorizedHandler(() => {
      setUser(null);
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        router.push("/login");
      }
    });
    return () => setUnauthorizedHandler(null);
  }, [router]);

  const login = useCallback(async (email: string, password: string) => {
    const nextUser = await authApi.login({ email, password });
    setUser(nextUser);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const nextUser = await authApi.register({ name, email, password });
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}
