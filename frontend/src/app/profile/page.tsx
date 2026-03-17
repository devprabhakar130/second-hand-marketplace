"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { clearToken, getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

type Me = Awaited<ReturnType<typeof api.me>>;

export default function ProfilePage() {
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/auth/login");
      return;
    }

    api
      .me()
      .then(setMe)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load profile"));
  }, [router]);

  function logout() {
    clearToken();
    router.push("/");
  }

  return (
    <div className="card">
      <div className="topbar">
        <div style={{ fontWeight: 800, fontSize: 18 }}>Profile</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/" className="pill">
            Home
          </Link>
          <button className="secondary" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {error ? <div className="error">{error}</div> : null}
      {!error && !me ? <div style={{ opacity: 0.85 }}>Loading...</div> : null}

      {me ? (
        <div className="card">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <span className="pill">Role: {me.role}</span>
            <span className="pill">Verified seller: {me.isVerifiedSeller ? "Yes" : "No"}</span>
            <span className="pill">
              Rating: {me.ratingAvg} ({me.ratingCount})
            </span>
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 22, fontWeight: 900 }}>{me.displayName}</div>
            <div style={{ opacity: 0.85, marginTop: 6 }}>
              Email: {me.email || "—"} • Phone: {me.phone || "—"}
            </div>
            <div style={{ opacity: 0.75, marginTop: 6, fontSize: 13 }}>
              Joined: {new Date(me.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

