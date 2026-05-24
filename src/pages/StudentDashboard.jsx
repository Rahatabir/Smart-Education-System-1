import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { id: "dashboard", icon: "▦", label: "Dashboard" },
  { id: "courses", icon: "◈", label: "Courses" },
  { id: "assignments", icon: "◫", label: "Assignments" },
  { id: "attendance", icon: "◉", label: "Attendance" },
  { id: "results", icon: "★", label: "Results" },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("studentUser");
    if (!data) { navigate("/student-login"); return; }
    setStudent(JSON.parse(data));
    setTimeout(() => setVisible(true), 80);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("studentUser");
    navigate("/student-login");
  };

  if (!student) return null;

  const stats = [
    { label: "Courses", value: "5", icon: "◈", color: "#3b82f6", sub: "Enrolled" },
    { label: "Assignments", value: "2", icon: "◫", color: "#f59e0b", sub: "Pending" },
    { label: "Attendance", value: "92%", icon: "◉", color: "#10b981", sub: "This semester" },
    { label: "GPA", value: "3.8", icon: "★", color: "#7c3aed", sub: "Current" },
  ];

  const courses = [
    { name: "Mathematics", progress: 78, color: "#3b82f6", grade: "A" },
    { name: "Physics", progress: 65, color: "#7c3aed", grade: "A-" },
    { name: "English", progress: 90, color: "#10b981", grade: "A+" },
    { name: "Chemistry", progress: 55, color: "#f59e0b", grade: "B+" },
    { name: "ICT", progress: 88, color: "#06b6d4", grade: "A" },
  ];

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarTop}>
          <div style={styles.sidebarLogo}>
            <div style={styles.logoMark}>ES</div>
            <div>
              <div style={styles.logoText}>EduSmart</div>
              <div style={styles.logoSub}>Student Portal</div>
            </div>
          </div>
        </div>

        <nav style={styles.sidebarNav}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                ...styles.navBtn,
                background: activeTab === item.id ? "rgba(59,130,246,0.12)" : "transparent",
                color: activeTab === item.id ? "#60a5fa" : "var(--text-secondary)",
                borderLeft: activeTab === item.id ? "2px solid #3b82f6" : "2px solid transparent",
              }}
            >
              <span style={{ fontSize: "14px" }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User card */}
        <div style={styles.userCard}>
          <div style={styles.userAvatar}>S</div>
          <div style={styles.userInfo}>
            <div style={styles.userName}>Student</div>
            <div style={styles.userEmail}>{student.email}</div>
          </div>
        </div>

        <button className="btn btn-ghost" onClick={handleLogout} style={styles.logoutBtn}>
          ⎋ Sign Out
        </button>
      </div>

      {/* Main */}
      <div style={styles.main}>
        {/* Top bar */}
        <div style={styles.topBar}>
          <div>
            <h1 style={styles.greeting}>Welcome back 🎓</h1>
            <p style={styles.greetingSub}>Semester 2 · 2025–2026</p>
          </div>
          <div style={styles.topRight}>
            <div style={styles.notifBtn}>🔔</div>
          </div>
        </div>

        {/* Content */}
        <div style={{
          ...styles.content,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px)",
          transition: "all 0.7s ease",
        }}>
          {/* Stats */}
          <div style={styles.statsRow}>
            {stats.map((s, i) => (
              <div key={i} className="section-card" style={{ ...styles.statCard, animationDelay: `${i * 0.08}s` }}>
                <div style={{ ...styles.statIcon, background: `${s.color}18`, color: s.color }}>{s.icon}</div>
                <div style={{ ...styles.statVal, color: s.color }}>{s.value}</div>
                <div style={styles.statLabel}>{s.label}</div>
                <div style={styles.statSub}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Courses */}
          <div className="section-card" style={{ animationDelay: "0.3s" }}>
            <h2 style={styles.sectionTitle}>My Courses</h2>
            <div style={styles.courseList}>
              {courses.map((c, i) => (
                <div key={i} style={styles.courseRow}>
                  <div style={{ ...styles.courseColor, background: c.color }} />
                  <div style={{ flex: 1 }}>
                    <div style={styles.courseName}>{c.name}</div>
                    <div style={styles.progressTrack}>
                      <div style={{
                        ...styles.progressFill,
                        width: `${c.progress}%`,
                        background: `linear-gradient(90deg, ${c.color}88, ${c.color})`,
                      }} />
                    </div>
                  </div>
                  <div style={styles.courseRight}>
                    <span style={{ ...styles.courseGrade, color: c.color }}>{c.grade}</span>
                    <span style={styles.coursePct}>{c.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick info */}
          <div style={styles.infoGrid}>
            <div className="section-card" style={{ animationDelay: "0.4s" }}>
              <h3 style={styles.infoTitle}>📅 Next Class</h3>
              <div style={styles.infoContent}>
                <div style={styles.infoSubject}>Mathematics</div>
                <div style={styles.infoMeta}>Tomorrow · 9:00 AM · Room 101</div>
              </div>
            </div>
            <div className="section-card" style={{ animationDelay: "0.5s" }}>
              <h3 style={styles.infoTitle}>📝 Due Soon</h3>
              <div style={styles.infoContent}>
                <div style={styles.infoSubject}>Physics Assignment</div>
                <div style={{ ...styles.infoMeta, color: "#fbbf24" }}>Due in 2 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  layout: { display: "flex", height: "100vh", background: "var(--bg-deep)", overflow: "hidden" },
  sidebar: {
    width: 220, minWidth: 220, background: "var(--bg-surface)", borderRight: "1px solid var(--border)",
    display: "flex", flexDirection: "column", padding: "20px 12px", gap: 4,
  },
  sidebarTop: { marginBottom: 24 },
  sidebarLogo: { display: "flex", alignItems: "center", gap: 10 },
  logoMark: {
    width: 32, height: 32, background: "linear-gradient(135deg, #2563eb, #7c3aed)",
    borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "11px", fontWeight: 800, color: "white", fontFamily: "var(--font-display)",
  },
  logoText: { fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" },
  logoSub: { fontSize: "10px", color: "var(--text-muted)" },
  sidebarNav: { display: "flex", flexDirection: "column", gap: 2, flex: 1 },
  navBtn: {
    display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
    borderRadius: "0 10px 10px 0", border: "none", cursor: "pointer",
    width: "100%", textAlign: "left", fontSize: "13.5px", fontFamily: "var(--font-body)",
    transition: "all 0.18s ease",
  },
  userCard: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)",
    borderRadius: 10, marginBottom: 8,
  },
  userAvatar: {
    width: 28, height: 28, background: "linear-gradient(135deg, #059669, #10b981)",
    borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "12px", fontWeight: 700, color: "white",
  },
  userInfo: { flex: 1, overflow: "hidden" },
  userName: { fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" },
  userEmail: { fontSize: "10px", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  logoutBtn: { justifyContent: "center", fontSize: "13px" },
  main: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
  topBar: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "20px 28px", borderBottom: "1px solid var(--border)",
    background: "rgba(10,15,30,0.8)", backdropFilter: "blur(10px)",
  },
  greeting: { fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 800, color: "var(--text-primary)" },
  greetingSub: { fontSize: "12px", color: "var(--text-muted)", marginTop: 2 },
  topRight: { display: "flex", alignItems: "center", gap: 10 },
  notifBtn: {
    width: 34, height: 34, background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-bright)",
    borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
  },
  content: { flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 16 },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 },
  statCard: { padding: "18px", textAlign: "center" },
  statIcon: {
    width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: "14px", margin: "0 auto 10px",
  },
  statVal: { fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 800, lineHeight: 1 },
  statLabel: { fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", marginTop: 4 },
  statSub: { fontSize: "10px", color: "var(--text-muted)", marginTop: 2 },
  sectionTitle: { fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 },
  courseList: { display: "flex", flexDirection: "column", gap: 12 },
  courseRow: { display: "flex", alignItems: "center", gap: 12 },
  courseColor: { width: 3, height: 32, borderRadius: 2, flexShrink: 0 },
  courseName: { fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: 6 },
  progressTrack: { height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 2, transition: "width 1s ease" },
  courseRight: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, flexShrink: 0 },
  courseGrade: { fontSize: "13px", fontWeight: 700 },
  coursePct: { fontSize: "10px", color: "var(--text-muted)" },
  infoGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  infoTitle: { fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 10 },
  infoContent: {},
  infoSubject: { fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 },
  infoMeta: { fontSize: "12px", color: "var(--text-muted)" },
};
