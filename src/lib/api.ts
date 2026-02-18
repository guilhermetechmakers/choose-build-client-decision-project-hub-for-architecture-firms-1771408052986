import {
  clearSession,
  getAccessToken,
  refreshToken,
} from "@/services/auth";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  retried = false
): Promise<T> {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint}`;
  const token = getAccessToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(url, { ...options, headers });
  if (res.status === 401 && !retried) {
    const refreshed = await refreshToken();
    if (refreshed) return request<T>(endpoint, options, true);
    clearSession();
    const err: ApiError = {
      message: "Session expired. Please sign in again.",
      status: 401,
    };
    throw err;
  }
  if (!res.ok) {
    const err: ApiError = {
      message: (await res.json().catch(() => ({})))?.message ?? res.statusText,
      status: res.status,
    };
    throw err;
  }
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint, { method: "GET" }),
  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: "PUT", body: JSON.stringify(body) }),
  patch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: "DELETE" }),
};
