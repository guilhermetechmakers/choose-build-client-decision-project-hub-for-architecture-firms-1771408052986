import type { User } from "./index";

export const AUTH_TOKEN_KEYS = {
  access: "access_token",
  refresh: "refresh_token",
} as const;

export interface SignInInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
}

export interface RefreshResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
}

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  user?: { id: string; email: string; name: string };
  message?: string;
}
