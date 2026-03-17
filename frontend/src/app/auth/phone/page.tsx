"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { api } from "@/lib/api";
import { setToken } from "@/lib/auth";

export default function PhoneAuthPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [demoOtp, setDemoOtp] = useState<string | null>(null);
  const [step, setStep] = useState<"request" | "verify">("request");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const phoneTrimmed = useMemo(() => phone.trim(), [phone]);

  async function requestOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await api.requestOtp({ phone: phoneTrimmed });
      setDemoOtp(res.otp);
      setStep("verify");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to request OTP");
    } finally {
      setBusy(false);
    }
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await api.verifyOtp({ phone: phoneTrimmed, otp: otp.trim() });
      setToken(res.token);
      router.push("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "OTP verification failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card">
      <div className="topbar">
        <div style={{ fontWeight: 800, fontSize: 18 }}>Phone OTP</div>
        <Link href="/" className="pill">
          Home
        </Link>
      </div>

      {step === "request" ? (
        <form onSubmit={requestOtp}>
          <label>Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 9xxxx xxxxx" />
          <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button disabled={busy}>{busy ? "Sending..." : "Request OTP"}</button>
            <Link href="/auth/login">
              <button type="button" className="secondary">
                Email login
              </button>
            </Link>
          </div>
          {error ? <div className="error">{error}</div> : null}
        </form>
      ) : (
        <form onSubmit={verify}>
          <div className="pill">Demo OTP: {demoOtp || "—"}</div>
          <label style={{ marginTop: 12 }}>OTP</label>
          <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit OTP" />
          <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button disabled={busy}>{busy ? "Verifying..." : "Verify & Login"}</button>
            <button
              type="button"
              className="secondary"
              onClick={() => {
                setStep("request");
                setOtp("");
                setDemoOtp(null);
              }}
            >
              Change phone
            </button>
          </div>
          {error ? <div className="error">{error}</div> : null}
        </form>
      )}
    </div>
  );
}
