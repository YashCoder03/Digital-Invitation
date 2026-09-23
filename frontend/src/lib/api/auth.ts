import { apiClient } from "./client";
import { clearToken, getToken, setToken } from "@/lib/auth/tokenStorage";
import type { AuthResponse, LoginRequest, RegisterRequest, UserSummary } from "./types";

const USER_KEY = "shubhinvite:auth-user";

function isBrowser() {
  return typeof window !== "undefined";
}

function persistSession(auth: AuthResponse) {
  setToken(auth.token);
  if (isBrowser()) window.localStorage.setItem(USER_KEY, JSON.stringify(auth.user));
}

export async function register(input: RegisterRequest): Promise<UserSummary> {
  const auth = await apiClient.post<AuthResponse>("/auth/register", input, { auth: false });
  persistSession(auth);
  return auth.user;
}

export async function login(input: LoginRequest): Promise<UserSummary> {
  const auth = await apiClient.post<AuthResponse>("/auth/login", input, { auth: false });
  persistSession(auth);
  return auth.user;
}

export function logout() {
  clearToken();
  if (isBrowser()) window.localStorage.removeItem(USER_KEY);
}

/** Reads the last-known user from local storage without hitting the network. */
export function getCurrentUser(): UserSummary | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserSummary;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}
