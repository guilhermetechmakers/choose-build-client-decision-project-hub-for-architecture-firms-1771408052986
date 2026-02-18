/**
 * Auth client: low-level login, logout, refresh and token storage.
 * Use this from services/auth.ts for app-level auth. In production, consider
 * httpOnly cookies (backend sets cookie; client uses credentials: 'include').
 */

const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

export const AUTH_TOKEN_KEYS = {
  access: "access_token",
  refresh: "refresh_token",
} as const;

const REMEMBER_ME_KEY = "auth_remember_me";

function getTokenStorage(): Storage {
  if (typeof window === "undefined") return localStorage;
  try {
    const remembered = localStorage.getItem(REMEMBER_ME_KEY);
    return remembered === "1" ? localStorage : sessionStorage;
  } catch {
    return localStorage;
  }
}

export function setRememberMe(remember: boolean): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(REMEMBER_ME_KEY, remember ? "1" : "0");
  }
}

export function getRememberMe(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(REMEMBER_ME_KEY) !== "0";
}

export function getAccessToken(): string | null {
  const storage = getTokenStorage();
  return storage.getItem(AUTH_TOKEN_KEYS.access);
}

export function getRefreshToken(): string | null {
  const storage = getTokenStorage();
  return storage.getItem(AUTH_TOKEN_KEYS.refresh);
}

export function setTokens(
  access: string,
  refresh?: string,
  rememberMe = true
): void {
  setRememberMe(rememberMe);
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(AUTH_TOKEN_KEYS.access, access);
  if (refresh != null) {
    storage.setItem(AUTH_TOKEN_KEYS.refresh, refresh);
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  [localStorage, sessionStorage].forEach((s) => {
    s.removeItem(AUTH_TOKEN_KEYS.access);
    s.removeItem(AUTH_TOKEN_KEYS.refresh);
  });
  localStorage.removeItem(REMEMBER_ME_KEY);
}

export interface LoginBody {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface LoginResponse {
  user: unknown;
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
}

export interface RefreshBody {
  refresh_token: string;
}

export interface RefreshResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
}

function authFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string | null
): Promise<{ data?: T; status: number; ok: boolean }> {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  return fetch(url, { ...options, headers }).then(async (res) => {
    const data = res.ok ? await res.json().catch(() => null) : null;
    return { data: data as T, status: res.status, ok: res.ok };
  });
}

/**
 * Login with email/password. Returns auth response or throws.
 */
export async function login(body: LoginBody): Promise<LoginResponse> {
  const { data, status, ok } = await authFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: body.email,
      password: body.password,
      remember_me: body.remember_me ?? true,
    }),
  });
  if (!ok || !data) {
    const message =
      (data as { message?: string })?.message ?? `Sign in failed (${status})`;
    throw new Error(message);
  }
  return data;
}

/**
 * Logout: call backend then clear local session.
 */
export async function logout(): Promise<void> {
  const token = getAccessToken();
  try {
    await authFetch("/auth/logout", { method: "POST" }, token);
  } finally {
    clearSession();
  }
}

/**
 * Refresh access token. Returns true if refreshed, false otherwise.
 */
export async function refresh(): Promise<boolean> {
  const refreshTokenValue = getRefreshToken();
  if (!refreshTokenValue) return false;
  const { data, ok } = await authFetch<RefreshResponse>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshTokenValue }),
  });
  if (!ok || !data?.access_token) return false;
  const rememberMe = getRememberMe();
  setTokens(data.access_token, data.refresh_token, rememberMe);
  return true;
}
