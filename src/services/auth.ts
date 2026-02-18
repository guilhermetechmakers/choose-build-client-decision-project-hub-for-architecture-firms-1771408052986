import type { User } from "@/types";
import type {
  AuthResponse,
  SignInInput,
  SignUpInput,
  SignUpResponse,
} from "@/types/auth";
import {
  clearSession as clearAuthStorage,
  getAccessToken,
  getRefreshToken,
  login as authClientLogin,
  logout as authClientLogout,
  refresh as authClientRefresh,
  setTokens,
} from "@/lib/auth";

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

export { getAccessToken, getRefreshToken, setTokens };

export function clearSession(): void {
  clearAuthStorage();
  if (typeof window !== "undefined") {
    const returnUrl = encodeURIComponent(
      window.location.pathname + window.location.search
    );
    window.location.href = returnUrl ? `/login?returnUrl=${returnUrl}` : "/login";
  }
}

export async function signIn(input: SignInInput): Promise<AuthResponse> {
  const data = await authClientLogin({
    email: input.email,
    password: input.password,
    remember_me: input.rememberMe ?? true,
  });
  setTokens(data.access_token, data.refresh_token, input.rememberMe ?? true);
  return {
    user: data.user as User,
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
  };
}

export async function signOut(): Promise<void> {
  await authClientLogout();
  clearSession();
}

export async function refreshToken(): Promise<boolean> {
  return authClientRefresh();
}

export async function getCurrentUser(): Promise<User | null> {
  const token = getAccessToken();
  if (!token) return null;
  const { data, status, ok } = await authFetch<User>(
    "/auth/me",
    { method: "GET" },
    token
  );
  if (!ok) {
    if (status === 401) return null;
    throw new Error(
      (data as { message?: string })?.message ?? "Failed to load user"
    );
  }
  return data ?? null;
}

export async function signUp(input: SignUpInput): Promise<SignUpResponse> {
  const { data, status, ok } = await authFetch<SignUpResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(input),
  });
  if (!ok) {
    const message =
      (data as { message?: string })?.message ?? `Sign up failed (${status})`;
    throw new Error(message);
  }
  return data ?? {};
}
