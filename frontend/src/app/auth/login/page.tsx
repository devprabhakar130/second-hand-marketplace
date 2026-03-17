"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { setToken } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await api.login({ email, password });
      setToken(res.token);
      router.push("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card">
      <div className="topbar">
        <div style={{ fontWeight: 800, fontSize: 18 }}>Login</div>
        <Link href="/" className="pill">
          Home
        </Link>
      </div>

      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />

        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" />

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button disabled={busy}>{busy ? "Signing in..." : "Login"}</button>
          <Link href="/auth/register">
            <button type="button" className="secondary">
              Create account
            </button>
          </Link>
        </div>

        {error ? <div className="error">{error}</div> : null}
      </form>
    </div>
  );
}

