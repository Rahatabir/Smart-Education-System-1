import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const stats = [
    { value: "12,400+", label: "Active Students" },
    { value: "98.2%", label: "Uptime" },
    { value: "340+", label: "Institutions" },
    { value: "AI-Powered", label: "Analytics" },
  ];

  const features = [
    { icon: "◈", title: "Smart Analytics", desc: "Real-time academic performance tracking with AI insights" },
    { icon: "⬡", title: "Fee Automation", desc: "One-click payment processing and automated reminders" },
    { icon: "◉", title: "AI Assistant", desc: "24/7 intelligent assistant for students and faculty" },
    { icon: "◫", title: "Live Schedule", desc: "Dynamic scheduling with conflict detection" },
  ];

  return (
    <div style={styles.page}>
      {/* Cursor glow */}
      <div style={{
        ...styles.cursorGlow,
        left: mousePos.x - 150,
        top: mousePos.y - 150,
      }} />

      {/* Grid overlay */}
      <div style={styles.gridOverlay} />

      {/* Orbs */}
      <div style={styles.orbBlue} />
      <div style={styles.orbViolet} />
      <div style={styles.orbCyan} />

      {/* Nav */}
      <nav style={styles.nav}>
        <div style={styles.navLogo}>
          <div style={styles.logoMark}>ES</div>
          <span style={styles.logoText}>EduSmart</span>
          <span style={styles.logoBadge}>AI</span>
        </div>
        <div style={styles.navLinks}>
          <Link to="/admin" style={styles.navLink}>Admin</Link>
          <Link to="/student-login">
            <button className="btn btn-primary" style={{ fontSize: "13px", padding: "8px 18px" }}>
              Student Login →
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main style={styles.hero}>
        <div style={{
          ...styles.heroInner,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.4,0,0.2,1)",
        }}>
          {/* Tag */}
          <div style={styles.tag}>
            <span style={styles.tagDot} />
            Next-Gen Education Platform · 2026
          </div>

          {/* Title */}
          <h1 style={styles.heroTitle}>
            <span>Intelligent</span>
            <br />
            <span className="gradient-text">Student Management</span>
            <br />
            <span>Reimagined.</span>
          </h1>

          <p style={styles.heroSub}>
            An AI-powered academic ecosystem that adapts to every student, 
            every class, and every institution — with zero complexity.
          </p>

          {/* CTAs */}
          <div style={styles.ctaGroup}>
            <Link to="/admin">
              <button className="btn btn-primary" style={styles.ctaPrimary}>
                <span>Open Admin Dashboard</span>
                <span style={styles.ctaArrow}>→</span>
              </button>
            </Link>
            <Link to="/student-login">
              <button className="btn btn-ghost" style={styles.ctaSecondary}>
                Student Portal
              </button>
            </Link>
          </div>

          {/* Demo hint */}
          <p style={styles.demoHint}>
            Demo: student@gmail.com · 123456
          </p>
        </div>

        {/* Stats strip */}
        <div style={{
          ...styles.statsStrip,
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 0.4s",
        }}>
          {stats.map((s, i) => (
            <div key={i} style={styles.statItem}>
              <div style={styles.statValue}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Features grid */}
      <section style={styles.featuresSection}>
        <div style={styles.featureGrid}>
          {features.map((f, i) => (
            <div key={i} style={{
              ...styles.featureCard,
              animationDelay: `${i * 0.1}s`,
            }}>
              <div style={styles.featureIcon}>{f.icon}</div>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <span>© 2026 EduSmart AI — Premium Education Platform</span>
        <span style={{ color: "var(--text-muted)" }}>Built for tomorrow's institutions</span>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "var(--bg-deep)",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  cursorGlow: {
    position: "fixed",
    width: 300,
    height: 300,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(59,130,246,0.06), transparent 70%)",
    pointerEvents: "none",
    zIndex: 1,
    transition: "left 0.15s ease, top 0.15s ease",
  },
  gridOverlay: {
    position: "fixed",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
    `,
    backgroundSize: "60px 60px",
    pointerEvents: "none",
    zIndex: 0,
  },
  orbBlue: {
    position: "absolute",
    top: "-20%",
    left: "-10%",
    width: 600,
    height: 600,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
    filter: "blur(40px)",
    pointerEvents: "none",
  },
  orbViolet: {
    position: "absolute",
    top: "20%",
    right: "-15%",
    width: 500,
    height: 500,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
    filter: "blur(40px)",
    pointerEvents: "none",
  },
  orbCyan: {
    position: "absolute",
    bottom: "-10%",
    left: "30%",
    width: 400,
    height: 400,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
    filter: "blur(40px)",
    pointerEvents: "none",
  },
  nav: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 48px",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  navLogo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
  },
  logoMark: {
    width: 34,
    height: 34,
    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: 800,
    color: "white",
    fontFamily: "var(--font-display)",
  },
  logoText: {
    fontFamily: "var(--font-display)",
    fontSize: "18px",
    fontWeight: 700,
    color: "var(--text-primary)",
  },
  logoBadge: {
    fontSize: "10px",
    fontWeight: 700,
    background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
    color: "white",
    padding: "2px 7px",
    borderRadius: 4,
    letterSpacing: "0.05em",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: 24,
  },
  navLink: {
    color: "var(--text-secondary)",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
    transition: "color 0.2s",
  },
  hero: {
    position: "relative",
    zIndex: 5,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 24px 60px",
    textAlign: "center",
  },
  heroInner: {
    maxWidth: 740,
  },
  tag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(59,130,246,0.08)",
    border: "1px solid rgba(59,130,246,0.2)",
    borderRadius: 100,
    padding: "6px 16px",
    fontSize: "12px",
    fontWeight: 500,
    color: "#93c5fd",
    marginBottom: 28,
    letterSpacing: "0.04em",
  },
  tagDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#3b82f6",
    animation: "pulse-slow 2s infinite",
    display: "inline-block",
  },
  heroTitle: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(3rem, 7vw, 5.5rem)",
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: "-0.03em",
    color: "var(--text-primary)",
    marginBottom: 24,
  },
  heroSub: {
    fontSize: "18px",
    color: "var(--text-secondary)",
    lineHeight: 1.7,
    maxWidth: 540,
    margin: "0 auto 40px",
    fontWeight: 300,
  },
  ctaGroup: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  ctaPrimary: {
    padding: "14px 28px",
    fontSize: "15px",
    fontWeight: 600,
    borderRadius: 14,
  },
  ctaArrow: {
    display: "inline-block",
    transition: "transform 0.2s",
  },
  ctaSecondary: {
    padding: "14px 28px",
    fontSize: "15px",
  },
  demoHint: {
    fontSize: "12px",
    color: "var(--text-muted)",
    fontFamily: "monospace",
    marginTop: 8,
  },
  statsStrip: {
    display: "flex",
    gap: 0,
    marginTop: 60,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid var(--border)",
    borderRadius: 16,
    overflow: "hidden",
  },
  statItem: {
    flex: 1,
    padding: "18px 24px",
    textAlign: "center",
    borderRight: "1px solid var(--border)",
  },
  statValue: {
    fontFamily: "var(--font-display)",
    fontSize: "22px",
    fontWeight: 700,
    color: "var(--text-primary)",
    marginBottom: 3,
  },
  statLabel: {
    fontSize: "12px",
    color: "var(--text-muted)",
    letterSpacing: "0.04em",
  },
  featuresSection: {
    position: "relative",
    zIndex: 5,
    padding: "0 48px 80px",
    maxWidth: 1100,
    margin: "0 auto",
    width: "100%",
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  },
  featureCard: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid var(--border)",
    borderRadius: 16,
    padding: "24px 20px",
    transition: "border-color 0.3s, background 0.3s",
    cursor: "default",
    animation: "fadeUp 0.6s ease both",
  },
  featureIcon: {
    fontSize: "24px",
    color: "#3b82f6",
    marginBottom: 12,
    display: "block",
  },
  featureTitle: {
    fontFamily: "var(--font-display)",
    fontSize: "16px",
    fontWeight: 700,
    color: "var(--text-primary)",
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: "13px",
    color: "var(--text-muted)",
    lineHeight: 1.6,
  },
  footer: {
    position: "relative",
    zIndex: 5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 48px",
    borderTop: "1px solid rgba(255,255,255,0.04)",
    fontSize: "12px",
    color: "var(--text-secondary)",
  },
};
