import React, { useState, useEffect } from "react";

const subjects = [
  { subject: "Mathematics", gpa: 3.9, students: 240, prev: 3.7, color: "#3b82f6" },
  { subject: "Physics", gpa: 3.7, students: 180, prev: 3.8, color: "#7c3aed" },
  { subject: "English", gpa: 3.8, students: 320, prev: 3.6, color: "#10b981" },
  { subject: "Chemistry", gpa: 3.6, students: 200, prev: 3.5, color: "#f59e0b" },
  { subject: "ICT", gpa: 3.95, students: 280, prev: 3.85, color: "#06b6d4" },
];

const gradeDistribution = [
  { grade: "A+", count: 312, color: "#10b981" },
  { grade: "A", count: 428, color: "#3b82f6" },
  { grade: "A-", count: 285, color: "#7c3aed" },
  { grade: "B+", count: 142, color: "#f59e0b" },
  { grade: "B", count: 33, color: "#f43f5e" },
];

export default function Results() {
  const [animated, setAnimated] = useState(false);
  const [tab, setTab] = useState("chart");

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const maxGpa = 4.0;
  const maxCount = Math.max(...gradeDistribution.map(g => g.count));

  return (
    <div style={styles.wrapper}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Academic Results</h1>
          <p style={styles.pageSubtitle}>Semester 2 · 2025–2026</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost" style={{ fontSize: "12px" }}>Export PDF</button>
          <button className="btn btn-primary" style={{ fontSize: "12px" }}>Publish Results</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {["chart", "table"].map(t2 => (
          <button key={t2} onClick={() => setTab(t2)}
            style={{
              ...styles.tabBtn,
              background: tab === t2 ? "rgba(59,130,246,0.15)" : "transparent",
              color: tab === t2 ? "#60a5fa" : "var(--text-secondary)",
              border: tab === t2 ? "1px solid rgba(59,130,246,0.25)" : "1px solid transparent",
            }}>
            {t2 === "chart" ? "📊 Chart View" : "📋 Table View"}
          </button>
        ))}
      </div>

      {tab === "chart" && (
        <div style={styles.chartLayout}>
          {/* Bar Chart */}
          <div className="section-card" style={{ flex: 2 }}>
            <h2 style={styles.cardTitle}>GPA by Subject</h2>
            <div style={styles.chartArea}>
              {subjects.map((item, i) => {
                const heightPct = animated ? `${(item.gpa / maxGpa) * 100}%` : "0%";
                return (
                  <div key={i} style={styles.barGroup}>
                    <div style={styles.barWrapper}>
                      {/* Comparison bar (prev) */}
                      <div style={{
                        ...styles.barPrev,
                        height: animated ? `${(item.prev / maxGpa) * 100}%` : "0%",
                        transition: `height 0.9s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`,
                      }} />
                      {/* Main bar */}
                      <div style={{
                        ...styles.bar,
                        height: heightPct,
                        background: `linear-gradient(180deg, ${item.color} 0%, ${item.color}88 100%)`,
                        boxShadow: animated ? `0 -4px 20px ${item.color}44` : "none",
                        transition: `height 0.9s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s, box-shadow 0.9s ease ${i * 0.1}s`,
                      }}>
                        <span style={styles.barValue}>{item.gpa}</span>
                      </div>
                    </div>
                    <p style={styles.barLabel}>{item.subject.slice(0, 4)}</p>
                  </div>
                );
              })}
            </div>
            <div style={styles.legend}>
              <div style={styles.legendItem}>
                <div style={{ width: 12, height: 4, background: "#3b82f6", borderRadius: 2 }} />
                <span>Current</span>
              </div>
              <div style={styles.legendItem}>
                <div style={{ width: 12, height: 4, background: "rgba(255,255,255,0.12)", borderRadius: 2 }} />
                <span>Previous</span>
              </div>
            </div>
          </div>

          {/* Grade Distribution */}
          <div className="section-card" style={{ flex: 1, minWidth: 200 }}>
            <h2 style={styles.cardTitle}>Grade Distribution</h2>
            <div style={styles.gradeList}>
              {gradeDistribution.map((g, i) => (
                <div key={i} style={styles.gradeRow}>
                  <span style={{ ...styles.gradeLabel, color: g.color }}>{g.grade}</span>
                  <div style={styles.gradeTrack}>
                    <div style={{
                      ...styles.gradeFill,
                      width: animated ? `${(g.count / maxCount) * 100}%` : "0%",
                      background: g.color,
                      transition: `width 0.9s cubic-bezier(0.4,0,0.2,1) ${i * 0.12}s`,
                    }} />
                  </div>
                  <span style={styles.gradeCount}>{g.count}</span>
                </div>
              ))}
            </div>
            <div style={styles.divider} />
            <div style={styles.totalRow}>
              <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>Total Students</span>
              <span style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "16px" }}>
                {gradeDistribution.reduce((a, g) => a + g.count, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {tab === "table" && (
        <div className="section-card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Current GPA</th>
                <th>Previous GPA</th>
                <th>Change</th>
                <th>Students</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((s, i) => {
                const delta = (s.gpa - s.prev).toFixed(2);
                const up = s.gpa >= s.prev;
                return (
                  <tr key={i}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                        <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>{s.subject}</span>
                      </div>
                    </td>
                    <td><span style={{ fontWeight: 700, color: s.color }}>{s.gpa}</span></td>
                    <td><span style={{ color: "var(--text-muted)" }}>{s.prev}</span></td>
                    <td>
                      <span style={{ color: up ? "#34d399" : "#fb7185", fontWeight: 600 }}>
                        {up ? "↑" : "↓"} {Math.abs(delta)}
                      </span>
                    </td>
                    <td><span className="badge badge-blue">{s.students}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: { padding: "32px", display: "flex", flexDirection: "column", gap: 20, maxWidth: 1100 },
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", animation: "fadeUp 0.4s ease" },
  pageTitle: { fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" },
  pageSubtitle: { fontSize: "13px", color: "var(--text-muted)", marginTop: 2 },
  tabs: { display: "flex", gap: 8, animation: "fadeUp 0.4s ease 0.1s both" },
  tabBtn: { fontSize: "13px", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.2s" },
  chartLayout: { display: "flex", gap: 16, flexWrap: "wrap" },
  cardTitle: { fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: 24 },
  chartArea: { display: "flex", alignItems: "flex-end", gap: 16, height: 200 },
  barGroup: { display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%" },
  barWrapper: { flex: 1, width: "100%", display: "flex", alignItems: "flex-end", gap: 3, position: "relative" },
  barPrev: {
    flex: 1, background: "rgba(255,255,255,0.08)", borderRadius: "5px 5px 0 0",
    minWidth: 0, transition: "height 0.9s ease",
  },
  bar: {
    flex: 1.5, borderRadius: "5px 5px 0 0", display: "flex", alignItems: "flex-start",
    justifyContent: "center", paddingTop: 6, minWidth: 0,
  },
  barValue: { color: "#fff", fontSize: "11px", fontWeight: 700 },
  barLabel: { color: "var(--text-muted)", fontSize: "11px", marginTop: 6, textAlign: "center" },
  legend: { display: "flex", gap: 16, marginTop: 16 },
  legendItem: { display: "flex", alignItems: "center", gap: 6, fontSize: "11px", color: "var(--text-muted)" },
  gradeList: { display: "flex", flexDirection: "column", gap: 12 },
  gradeRow: { display: "flex", alignItems: "center", gap: 10 },
  gradeLabel: { fontSize: "13px", fontWeight: 700, width: 24, textAlign: "center" },
  gradeTrack: { flex: 1, height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" },
  gradeFill: { height: "100%", borderRadius: 3 },
  gradeCount: { fontSize: "12px", color: "var(--text-muted)", width: 36, textAlign: "right" },
  divider: { height: 1, background: "var(--border)", margin: "12px 0" },
  totalRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
};
