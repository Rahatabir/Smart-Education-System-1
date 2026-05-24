import React, { useState } from "react";

const schedule = [
  { id: 1, day: "Sunday", subject: "Mathematics", time: "9:00 AM", end: "10:30 AM", room: "Room 101", teacher: "Mr. Hossain", color: "#3b82f6" },
  { id: 2, day: "Monday", subject: "Physics", time: "10:00 AM", end: "11:30 AM", room: "Lab 2", teacher: "Dr. Kamal", color: "#7c3aed" },
  { id: 3, day: "Tuesday", subject: "Chemistry", time: "9:30 AM", end: "11:00 AM", room: "Lab 1", teacher: "Ms. Riya", color: "#10b981" },
  { id: 4, day: "Wednesday", subject: "English", time: "11:00 AM", end: "12:30 PM", room: "Room 205", teacher: "Mrs. Sultana", color: "#f59e0b" },
  { id: 5, day: "Thursday", subject: "ICT", time: "2:00 PM", end: "3:30 PM", room: "Computer Lab", teacher: "Mr. Tanvir", color: "#06b6d4" },
  { id: 6, day: "Friday", subject: "Biology", time: "10:00 AM", end: "11:30 AM", room: "Lab 3", teacher: "Dr. Alam", color: "#f43f5e" },
];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState("All");
  const [hoveredClass, setHoveredClass] = useState(null);

  const filtered = selectedDay === "All" ? schedule : schedule.filter(s => s.day === selectedDay);

  return (
    <div style={styles.wrapper}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Weekly Schedule</h1>
          <p style={styles.pageSubtitle}>{schedule.length} classes · Batch 2024</p>
        </div>
        <button className="btn btn-primary" style={{ fontSize: "13px" }}>+ Add Class</button>
      </div>

      {/* Day filter */}
      <div style={styles.dayFilter}>
        <button
          onClick={() => setSelectedDay("All")}
          style={{ ...styles.dayBtn, ...(selectedDay === "All" ? styles.dayBtnActive : {}) }}
        >
          All Days
        </button>
        {days.map(d => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            style={{ ...styles.dayBtn, ...(selectedDay === d ? styles.dayBtnActive : {}) }}
          >
            {d.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Schedule cards */}
      <div style={styles.grid}>
        {filtered.map((item, i) => (
          <div
            key={item.id}
            style={{
              ...styles.classCard,
              borderLeft: `3px solid ${item.color}`,
              background: hoveredClass === item.id
                ? `linear-gradient(135deg, rgba(${hexToRgb(item.color)},0.1), var(--bg-card))`
                : "var(--bg-card)",
              animation: `fadeUp 0.4s ease ${i * 0.07}s both`,
            }}
            onMouseEnter={() => setHoveredClass(item.id)}
            onMouseLeave={() => setHoveredClass(null)}
          >
            {/* Left: time */}
            <div style={styles.timeCol}>
              <div style={{ ...styles.timeMain, color: item.color }}>{item.time}</div>
              <div style={styles.timeEnd}>{item.end}</div>
            </div>

            {/* Divider */}
            <div style={{ ...styles.vDivider, background: item.color + "30" }} />

            {/* Center: info */}
            <div style={styles.infoCol}>
              <div style={styles.subjectName}>{item.subject}</div>
              <div style={styles.teacherName}>👤 {item.teacher}</div>
            </div>

            {/* Right: meta */}
            <div style={styles.metaCol}>
              <span className="badge badge-blue" style={{ fontSize: "11px" }}>
                📍 {item.room}
              </span>
              <span style={{
                background: `${item.color}18`,
                color: item.color,
                fontSize: "10px",
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: 100,
                marginTop: 4,
                display: "block",
                textAlign: "center",
              }}>
                {item.day}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={styles.empty}>
          <span style={{ fontSize: "32px" }}>📅</span>
          <p style={{ color: "var(--text-muted)", marginTop: 8 }}>No classes on {selectedDay}</p>
        </div>
      )}
    </div>
  );
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1],16)},${parseInt(result[2],16)},${parseInt(result[3],16)}` : "59,130,246";
}

const styles = {
  wrapper: { padding: "32px", display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 },
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", animation: "fadeUp 0.4s ease" },
  pageTitle: { fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" },
  pageSubtitle: { fontSize: "13px", color: "var(--text-muted)", marginTop: 2 },
  dayFilter: { display: "flex", gap: 6, flexWrap: "wrap", animation: "fadeUp 0.4s ease 0.1s both" },
  dayBtn: {
    padding: "7px 14px", borderRadius: 8, border: "1px solid var(--border-bright)",
    background: "transparent", color: "var(--text-secondary)", fontSize: "12px",
    cursor: "pointer", transition: "all 0.2s", fontFamily: "var(--font-body)",
  },
  dayBtnActive: {
    background: "rgba(59,130,246,0.15)", color: "#60a5fa",
    border: "1px solid rgba(59,130,246,0.3)",
  },
  grid: { display: "flex", flexDirection: "column", gap: 10 },
  classCard: {
    display: "flex", alignItems: "center", gap: 16,
    padding: "18px 20px", borderRadius: 14,
    border: "1px solid var(--border)", cursor: "pointer",
    transition: "background 0.25s, transform 0.2s, box-shadow 0.2s",
  },
  timeCol: { minWidth: 80 },
  timeMain: { fontSize: "14px", fontWeight: 700 },
  timeEnd: { fontSize: "11px", color: "var(--text-muted)", marginTop: 2 },
  vDivider: { width: 1, height: 36, flexShrink: 0, borderRadius: 1 },
  infoCol: { flex: 1 },
  subjectName: { fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" },
  teacherName: { fontSize: "12px", color: "var(--text-muted)", marginTop: 3 },
  metaCol: { textAlign: "right", flexShrink: 0 },
  empty: { textAlign: "center", padding: "60px 0", animation: "fadeIn 0.3s ease" },
};
