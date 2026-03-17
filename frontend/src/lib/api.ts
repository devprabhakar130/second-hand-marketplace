import { getToken } from "./auth";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

type ApiError = {
  error?: string;
  details?: unknown;
  reason?: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {})
    }
  });

  const data = (await res.json().catch(() => ({}))) as T & ApiError;
  if (!res.ok) {
    const message = (data && (data.error || data.reason)) || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data as T;
}

export const api = {
  register: (body: { email?: string; phone?: string; password: string; displayName: string }) =>
    request<{ token: string; user: { id: string; email?: string; phone?: string; displayName: string } }>(
      "/api/auth/register",
      { method: "POST", body: JSON.stringify(body) }
    ),
  login: (body: { email: string; password: string }) =>
    request<{ token: string; user: { id: string; email?: string; phone?: string; displayName: string } }>(
      "/api/auth/login",
      { method: "POST", body: JSON.stringify(body) }
    ),
  requestOtp: (body: { phone: string }) =>
    request<{ ok: true; phone: string; otp: string; expiresInSec: number }>("/api/auth/request-otp", {
      method: "POST",
      body: JSON.stringify(body)
    }),
  verifyOtp: (body: { phone: string; otp: string }) =>
    request<{ token: string; user: { id: string; email?: string; phone?: string; displayName: string } }>(
      "/api/auth/verify-otp",
      { method: "POST", body: JSON.stringify(body) }
    ),
  me: () =>
    request<{
      id: string;
      email: string | null;
      phone: string | null;
      displayName: string;
      role: string;
      isVerifiedSeller: boolean;
      ratingAvg: number;
      ratingCount: number;
      createdAt: string;
    }>("/api/me", { method: "GET" })
};
