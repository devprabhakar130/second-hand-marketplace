"use client";

import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await api.register({
        displayName,
        password,
        email: email.trim() || undefined,
        phone: phone.trim() || undefined
      });
      setToken(res.token);
      router.push("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card">
      <div className="topbar">
        <div style={{ fontWeight: 800, fontSize: 18 }}>Create account</div>
        <Link href="/" className="pill">
          Home
        </Link>
      </div>

      <form onSubmit={onSubmit}>
        <label>Display name</label>
        <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="e.g. Prabhakar" />

        <label>Email (optional)</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />

        <label>Phone (optional)</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 9xxxx xxxxx" />

        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Min 8 chars" />

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button disabled={busy}>{busy ? "Creating..." : "Register"}</button>
          <Link href="/auth/login">
            <button type="button" className="secondary">
              I already have an account
            </button>
          </Link>
        </div>

        {error ? <div className="error">{error}</div> : null}
      </form>
    </div>
  );
}

