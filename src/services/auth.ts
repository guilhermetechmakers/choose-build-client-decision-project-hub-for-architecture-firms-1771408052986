import type { User } from "@/types";
import type { AuthResponse, RefreshResponse, SignInInput } from "@/types/auth";
import { AUTH_TOKEN_KEYS } from "@/types/auth";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

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

export function getAccessToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEYS.access);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEYS.refresh);
}

export function setTokens(access: string, refresh?: string): void {
  localStorage.setItem(AUTH_TOKEN_KEYS.access, access);
  if (refresh != null) {
    localStorage.setItem(AUTH_TOKEN_KEYS.refresh, refresh);
  }
}

export function clearSession(): void {
  localStorage.removeItem(AUTH_TOKEN_KEYS.access);
  localStorage.removeItem(AUTH_TOKEN_KEYS.refresh);
  const returnUrl =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.pathname + window.location.search)
      : "";
  if (typeof window !== "undefined") {
    window.location.href = returnUrl ? `/login?returnUrl=${returnUrl}` : "/login";
  }
}

export async function signIn(input: SignInInput): Promise<AuthResponse> {
  const { data, status, ok } = await authFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
  if (!ok || !data) {
    const message =
      (data as { message?: string })?.message ?? `Sign in failed (${status})`;
    throw new Error(message);
  }
  setTokens(data.access_token, data.refresh_token);
  return data;
}

export async function signOut(): Promise<void> {
  const token = getAccessToken();
  try {
    await authFetch("/auth/logout", { method: "POST" }, token);
  } finally {
    clearSession();
  }
}

export async function refreshToken(): Promise<boolean> {
  const refresh = getRefreshToken();
  if (!refresh) return false;
  const { data, ok } = await authFetch<RefreshResponse>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refresh }),
  });
  if (!ok || !data?.access_token) return false;
  setTokens(data.access_token, data.refresh_token);
  return true;
}

export async function getCurrentUser(): Promise<User | null> {
  const token = getAccessToken();
  if (!token) return null;
  const { data, status, ok } = await authFetch<User>("/auth/me", { method: "GET" }, token);
  if (!ok) {
    if (status === 401) return null;
    throw new Error((data as { message?: string })?.message ?? "Failed to load user");
  }
  return data ?? null;
}
