import Link from "next/link";

export default function HomePage() {
  return (
    <div className="card">
      <div className="topbar">
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Second-Hand Items Marketplace</div>
          <div style={{ opacity: 0.85, marginTop: 6 }}>
            Day 1 demo: authentication + profile (listings & chat come next).
          </div>
        </div>
        <span className="pill">Prototype</span>
      </div>

      <div className="row">
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 10 }}>Authentication</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/auth/register">
              <button>Register</button>
            </Link>
            <Link href="/auth/login">
              <button className="secondary">Email Login</button>
            </Link>
            <Link href="/auth/phone">
              <button className="secondary">Phone OTP</button>
            </Link>
          </div>
        </div>

        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 10 }}>Account</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/profile">
              <button>Profile</button>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ opacity: 0.8, marginTop: 16, fontSize: 13 }}>
        Configure API URL via <code>NEXT_PUBLIC_API_BASE_URL</code>.
      </div>
    </div>
  );
}
