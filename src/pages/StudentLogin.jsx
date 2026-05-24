import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function StudentLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("All fields are required."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (form.email === "student@gmail.com" && form.password === "123456") {
        localStorage.setItem("studentUser", JSON.stringify({ email: form.email, role: "STUDENT" }));
        navigate("/student-dashboard");
      } else {
        setError("Invalid email or password. Try: student@gmail.com / 123456");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div style={styles.page}>
      {/* Background */}
      <div style={styles.orbBlue} />
      <div style={styles.orbViolet} />
      <div style={styles.grid} />

      {/* Nav */}
      <nav style={styles.nav}>
        <Link to="/" style={styles.backLink}>← Back to Home</Link>
      </nav>

      {/* Card */}
      <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{
          ...styles.card,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)",
        }}>
          {/* Logo */}
          <div style={styles.cardLogo}>
            <div style={styles.logoMark}>ES</div>
          </div>
          <h1 style={styles.cardTitle}>Student Portal</h1>
          <p style={styles.cardSubtitle}>Sign in to access your academic dashboard</p>

          {/* Error */}
          {error && (
            <div style={styles.errorBox}>
              <span>⚠</span> {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                className="input"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="student@gmail.com"
                style={styles.input}
              />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPwd ? "text" : "password"}
                  className="input"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••"
                  style={{ ...styles.input, paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  style={styles.eyeBtn}
                >
                  {showPwd ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{
                ...styles.submitBtn,
                opacity: loading ? 0.7 : 1,
                justifyContent: "center",
              }}
            >
              {loading ? (
                <><div className="spinner" /> Signing in...</>
              ) : (
                "Sign in to Dashboard →"
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div style={styles.demoBox}>
            <div style={styles.demoLabel}>DEMO CREDENTIALS</div>
            <div style={styles.demoRow}>
              <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>Email</span>
              <span
                style={styles.demoValue}
                onClick={() => setForm(f => ({ ...f, email: "student@gmail.com" }))}
              >
                student@gmail.com
              </span>
            </div>
            <div style={styles.demoRow}>
              <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>Password</span>
              <span
                style={styles.demoValue}
                onClick={() => setForm(f => ({ ...f, password: "123456" }))}
              >
                123456
              </span>
            </div>
            <p style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: 6 }}>Click credentials to auto-fill</p>
          </div>

          <p style={styles.adminLink}>
            Admin?{" "}
            <Link to="/admin" style={{ color: "#60a5fa", textDecoration: "none" }}>
              Open Admin Dashboard →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh", background: "var(--bg-deep)",
    display: "flex", flexDirection: "column", position: "relative", overflow: "hidden",
  },
  orbBlue: {
    position: "fixed", top: "-20%", left: "-10%", width: 500, height: 500,
    borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)",
    filter: "blur(40px)", pointerEvents: "none",
  },
  orbViolet: {
    position: "fixed", bottom: "-20%", right: "-10%", width: 500, height: 500,
    borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%)",
    filter: "blur(40px)", pointerEvents: "none",
  },
  grid: {
    position: "fixed", inset: 0,
    backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
    backgroundSize: "60px 60px", pointerEvents: "none",
  },
  nav: {
    position: "relative", zIndex: 10,
    padding: "20px 36px",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  backLink: {
    color: "var(--text-secondary)", textDecoration: "none", fontSize: "13px",
    transition: "color 0.2s",
  },
  card: {
    position: "relative", zIndex: 10,
    background: "rgba(13,20,36,0.9)", backdropFilter: "blur(20px)",
    border: "1px solid var(--border-bright)", borderRadius: 24,
    padding: "36px", width: "100%", maxWidth: 420,
    boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
  },
  cardLogo: { display: "flex", justifyContent: "center", marginBottom: 20 },
  logoMark: {
    width: 44, height: 44, background: "linear-gradient(135deg, #2563eb, #7c3aed)",
    borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "16px", fontWeight: 800, color: "white", fontFamily: "var(--font-display)",
  },
  cardTitle: {
    fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 800,
    color: "var(--text-primary)", textAlign: "center", marginBottom: 6,
  },
  cardSubtitle: { fontSize: "13px", color: "var(--text-muted)", textAlign: "center", marginBottom: 24 },
  errorBox: {
    background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.2)",
    borderRadius: 10, padding: "10px 14px", fontSize: "13px", color: "#fb7185",
    marginBottom: 16, display: "flex", alignItems: "center", gap: 8,
  },
  form: { display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 },
  fieldGroup: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.04em" },
  input: { borderRadius: 10, padding: "11px 14px" },
  eyeBtn: {
    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
    background: "transparent", border: "none", cursor: "pointer", fontSize: "14px",
  },
  submitBtn: { width: "100%", padding: "13px", fontSize: "14px", fontWeight: 600, borderRadius: 12 },
  demoBox: {
    background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)",
    borderRadius: 12, padding: "14px 16px", marginBottom: 16,
  },
  demoLabel: { fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: 8 },
  demoRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  demoValue: {
    fontSize: "12px", fontFamily: "monospace", color: "#60a5fa",
    cursor: "pointer", padding: "2px 6px", background: "rgba(59,130,246,0.1)",
    borderRadius: 4,
  },
  adminLink: { textAlign: "center", fontSize: "13px", color: "var(--text-muted)" },
};
