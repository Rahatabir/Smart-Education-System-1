import React, { useState, useEffect } from "react";
import Students from "./Students";
import Results from "./Results";
import Schedule from "./Schedule";
import AIChat from "./AIChat";
import FeeManagement from "./FeeManagement";
import Sidebar from "./Sidebar";

const SECTIONS = ["Dashboard", "Students", "Schedule", "Results", "AI Assistant", "Fees"];

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const stats = [
    { title: "Total Students", value: 1200, display: "1,200", icon: "◉", color: "#3b82f6", change: "+12%", trend: "up" },
    { title: "Attendance Rate", value: 92, display: "92%", icon: "✓", color: "#10b981", change: "+3%", trend: "up" },
    { title: "Active Courses", value: 48, display: "48", icon: "◈", color: "#7c3aed", change: "Stable", trend: "neutral" },
    { title: "Average GPA", value: 3.78, display: "3.78", icon: "★", color: "#f59e0b", change: "+0.12", trend: "up" },
  ];

  // Animated counter
  useEffect(() => {
    if (activeSection !== "Dashboard") return;
    const targets = [1200, 92, 48, 3.78];
    const duration = 1200;
    const start = Date.now();
    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounts(targets.map(t => parseFloat((t * ease).toFixed(t < 10 ? 2 : 0))));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case "Students": return <Students />;
      case "Schedule": return <Schedule />;
      case "Results": return <Results />;
      case "AI Assistant": return <AIChat />;
      case "Fees": return <FeeManagement />;
      default: return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <div style={styles.dashContent}>
      {/* Header */}
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Overview</h1>
          <p style={styles.pageSubtitle}>Academic year 2025–2026 · Live data</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost" style={{ fontSize: "13px" }}>Export ↓</button>
          <button className="btn btn-primary" style={{ fontSize: "13px" }}>+ Add Student</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        {stats.map((item, i) => (
          <div key={i} className="section-card" style={{ ...styles.statCard, animationDelay: `${i * 0.08}s` }}>
            <div style={styles.statTop}>
              <div style={{ ...styles.statIconWrap, background: `${item.color}18`, border: `1px solid ${item.color}28` }}>
                <span style={{ fontSize: "16px", color: item.color }}>{item.icon}</span>
              </div>
              <span style={{
                ...styles.statChange,
                color: item.trend === "up" ? "#34d399" : "var(--text-muted)",
              }}>
                {item.trend === "up" ? "↑" : ""} {item.change}
              </span>
            </div>
            <div style={styles.statValue}>
              {i === 0 ? counts[0].toLocaleString() :
               i === 1 ? `${Math.round(counts[1])}%` :
               i === 2 ? Math.round(counts[2]) :
               counts[3].toFixed(2)}
            </div>
            <div style={styles.statTitle}>{item.title}</div>
            {/* Mini bar */}
            <div style={styles.miniBar}>
              <div style={{
                ...styles.miniBarFill,
                width: `${(item.value / (i === 0 ? 2000 : i === 1 ? 100 : i === 2 ? 60 : 4)) * 100}%`,
                background: `linear-gradient(90deg, ${item.color}88, ${item.color})`,
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick access */}
      <div style={styles.quickGrid}>
        {[
          { label: "Students", icon: "◉", section: "Students", desc: "View all students" },
          { label: "Results", icon: "◈", section: "Results", desc: "GPA & grades" },
          { label: "AI Assistant", icon: "⬡", section: "AI Assistant", desc: "Ask anything" },
          { label: "Fee Mgmt", icon: "◎", section: "Fees", desc: "Payments & dues" },
        ].map((item, i) => (
          <div
            key={i}
            style={styles.quickCard}
            onClick={() => setActiveSection(item.section)}
          >
            <span style={styles.quickIcon}>{item.icon}</span>
            <div>
              <div style={styles.quickLabel}>{item.label}</div>
              <div style={styles.quickDesc}>{item.desc}</div>
            </div>
            <span style={{ color: "var(--text-muted)", marginLeft: "auto", fontSize: "16px" }}>→</span>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="section-card" style={{ animationDelay: "0.3s" }}>
        <h2 style={styles.sectionTitle}>Recent Activity</h2>
        {[
          { action: "New student enrolled", name: "Tahmid Rahman", time: "Just now", color: "#3b82f6" },
          { action: "Fee payment received", name: "Sadia Islam · ৳5,000", time: "12m ago", color: "#10b981" },
          { action: "Exam result published", name: "Physics — Batch 2026", time: "1h ago", color: "#7c3aed" },
          { action: "Schedule updated", name: "Thursday ICT class moved", time: "3h ago", color: "#f59e0b" },
        ].map((a, i) => (
          <div key={i} style={styles.activityRow}>
            <div style={{ ...styles.activityDot, background: a.color }} />
            <div style={{ flex: 1 }}>
              <span style={styles.activityAction}>{a.action} </span>
              <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>· {a.name}</span>
            </div>
            <span style={styles.activityTime}>{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={styles.layout}>
      <Sidebar active={activeSection} onNavigate={setActiveSection} />
      <div style={styles.main}>
        {renderContent()}
      </div>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
    height: "100%",
  },
  main: {
    flex: 1,
    overflowY: "auto",
    background: "var(--bg-deep)",
  },
  dashContent: {
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    gap: 24,
    maxWidth: 1200,
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    animation: "fadeUp 0.4s ease",
  },
  pageTitle: {
    fontFamily: "var(--font-display)",
    fontSize: "28px",
    fontWeight: 800,
    color: "var(--text-primary)",
    letterSpacing: "-0.02em",
  },
  pageSubtitle: {
    fontSize: "13px",
    color: "var(--text-muted)",
    marginTop: 2,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 16,
  },
  statCard: {
    padding: "22px",
  },
  statTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  statIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statChange: {
    fontSize: "12px",
    fontWeight: 600,
  },
  statValue: {
    fontFamily: "var(--font-display)",
    fontSize: "2.2rem",
    fontWeight: 800,
    color: "var(--text-primary)",
    letterSpacing: "-0.02em",
    lineHeight: 1,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: "12px",
    color: "var(--text-muted)",
    marginBottom: 12,
  },
  miniBar: {
    height: 3,
    background: "rgba(255,255,255,0.06)",
    borderRadius: 2,
    overflow: "hidden",
  },
  miniBarFill: {
    height: "100%",
    borderRadius: 2,
    transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
  },
  quickGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
  },
  quickCard: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "16px 18px",
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 14,
    cursor: "pointer",
    transition: "all 0.2s",
    animation: "fadeUp 0.4s ease both",
  },
  quickIcon: {
    fontSize: "20px",
    color: "#3b82f6",
    width: 24,
    textAlign: "center",
  },
  quickLabel: {
    fontSize: "13px",
    fontWeight: 600,
    color: "var(--text-primary)",
  },
  quickDesc: {
    fontSize: "11px",
    color: "var(--text-muted)",
    marginTop: 1,
  },
  sectionTitle: {
    fontFamily: "var(--font-display)",
    fontSize: "16px",
    fontWeight: 700,
    color: "var(--text-primary)",
    marginBottom: 18,
  },
  activityRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.03)",
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    flexShrink: 0,
  },
  activityAction: {
    fontSize: "13px",
    fontWeight: 500,
    color: "var(--text-secondary)",
  },
  activityTime: {
    fontSize: "11px",
    color: "var(--text-muted)",
    flexShrink: 0,
  },
};
