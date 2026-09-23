const TOKEN_KEY = "shubhinvite:auth-token";

function isBrowser() {
  return typeof window !== "undefined";
}

/** Isolates JWT storage so no other module touches localStorage directly for auth. */
export function getToken(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  if (!isBrowser()) return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(TOKEN_KEY);
}
