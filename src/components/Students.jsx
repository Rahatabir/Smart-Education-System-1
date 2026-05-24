import React, { useState } from "react";

const allStudents = [
  { id: 1, name: "Rahim Ahmed", email: "rahim@edu.bd", gpa: 3.88, attendance: 95, status: "Active", batch: "2024", avatar: "R" },
  { id: 2, name: "Karim Hasan", email: "karim@edu.bd", gpa: 3.55, attendance: 87, status: "Active", batch: "2024", avatar: "K" },
  { id: 3, name: "Nusrat Jahan", email: "nusrat@edu.bd", gpa: 3.91, attendance: 98, status: "Excellent", batch: "2023", avatar: "N" },
  { id: 4, name: "Sadia Islam", email: "sadia@edu.bd", gpa: 3.72, attendance: 90, status: "Active", batch: "2024", avatar: "S" },
  { id: 5, name: "Tahmid Rahman", email: "tahmid@edu.bd", gpa: 3.44, attendance: 82, status: "Warning", batch: "2025", avatar: "T" },
  { id: 6, name: "Faria Hossain", email: "faria@edu.bd", gpa: 3.96, attendance: 99, status: "Excellent", batch: "2023", avatar: "F" },
];

const statusConfig = {
  "Excellent": { class: "badge-green", dot: "#10b981" },
  "Active": { class: "badge-blue", dot: "#3b82f6" },
  "Warning": { class: "badge-amber", dot: "#f59e0b" },
};

const avatarColors = ["#2563eb", "#7c3aed", "#059669", "#b45309", "#be123c", "#0891b2"];

export default function Students() {
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = allStudents.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterStatus === "All" || s.status === filterStatus;
    return matchSearch && matchFilter;
  });

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Students</h1>
          <p style={styles.pageSubtitle}>{allStudents.length} total · {allStudents.filter(s => s.status === "Active" || s.status === "Excellent").length} active</p>
        </div>
        <button className="btn btn-primary" style={{ fontSize: "13px" }}>+ Enroll Student</button>
      </div>

      {/* Filters */}
      <div style={styles.filterRow}>
        <div style={styles.searchWrap}>
          <span style={{ color: "var(--text-muted)" }}>⌕</span>
          <input
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            style={{ border: "none", background: "transparent", padding: "0 8px", fontSize: "13px" }}
          />
        </div>
        <div style={styles.filterBtns}>
          {["All", "Excellent", "Active", "Warning"].map(f => (
            <button
              key={f}
              onClick={() => setFilterStatus(f)}
              className="btn"
              style={{
                fontSize: "12px",
                padding: "6px 14px",
                background: filterStatus === f ? "rgba(59,130,246,0.15)" : "transparent",
                border: filterStatus === f ? "1px solid rgba(59,130,246,0.3)" : "1px solid var(--border-bright)",
                color: filterStatus === f ? "#60a5fa" : "var(--text-secondary)",
                borderRadius: 8,
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="section-card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Batch</th>
              <th>GPA</th>
              <th>Attendance</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                  No students found
                </td>
              </tr>
            ) : (
              filtered.map((s, i) => (
                <tr key={s.id} style={{ animation: `slideIn 0.3s ease ${i * 0.05}s both` }}>
                  <td>
                    <div style={styles.studentCell}>
                      <div style={{ ...styles.avatar, background: avatarColors[s.id - 1] || "#2563eb" }}>
                        {s.avatar}
                      </div>
                      <div>
                        <div style={styles.studentName}>{s.name}</div>
                        <div style={styles.studentEmail}>{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{s.batch}</span>
                  </td>
                  <td>
                    <div style={styles.gpaCell}>
                      <span style={{ color: s.gpa >= 3.8 ? "#34d399" : s.gpa >= 3.5 ? "#60a5fa" : "#fbbf24", fontWeight: 600, fontSize: "14px" }}>
                        {s.gpa}
                      </span>
                      <div style={styles.gpaBar}>
                        <div style={{ ...styles.gpaFill, width: `${(s.gpa / 4) * 100}%` }} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={styles.attendCell}>
                      <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)" }}>{s.attendance}%</span>
                      <div style={styles.attendBar}>
                        <div style={{
                          ...styles.attendFill,
                          width: `${s.attendance}%`,
                          background: s.attendance >= 90 ? "#10b981" : s.attendance >= 80 ? "#f59e0b" : "#f43f5e",
                        }} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${statusConfig[s.status]?.class || "badge-blue"}`}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: statusConfig[s.status]?.dot, display: "inline-block" }} />
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-ghost"
                      style={{ fontSize: "12px", padding: "5px 12px" }}
                      onClick={() => setSelectedStudent(s)}
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedStudent && (
        <div style={styles.modalOverlay} onClick={() => setSelectedStudent(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={{ ...styles.modalAvatar, background: avatarColors[selectedStudent.id - 1] }}>
                {selectedStudent.avatar}
              </div>
              <div>
                <h2 style={styles.modalName}>{selectedStudent.name}</h2>
                <p style={styles.modalEmail}>{selectedStudent.email}</p>
              </div>
              <button className="btn btn-ghost" style={{ marginLeft: "auto", padding: "6px 10px", fontSize: "12px" }}
                onClick={() => setSelectedStudent(null)}>✕</button>
            </div>
            <div style={styles.modalGrid}>
              {[
                { label: "GPA", value: selectedStudent.gpa, color: "#3b82f6" },
                { label: "Attendance", value: `${selectedStudent.attendance}%`, color: "#10b981" },
                { label: "Batch", value: selectedStudent.batch, color: "#7c3aed" },
                { label: "Status", value: selectedStudent.status, color: "#f59e0b" },
              ].map((d, i) => (
                <div key={i} style={styles.modalStat}>
                  <div style={{ ...styles.modalStatVal, color: d.color }}>{d.value}</div>
                  <div style={styles.modalStatLabel}>{d.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Edit Profile</button>
              <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }}>Send Message</button>
            </div>
          </div>
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
  filterRow: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", animation: "fadeUp 0.4s ease 0.1s both" },
  searchWrap: {
    display: "flex", alignItems: "center", gap: 8,
    background: "var(--bg-card)", border: "1px solid var(--border-bright)",
    borderRadius: 10, padding: "8px 14px", flex: 1, minWidth: 200,
  },
  filterBtns: { display: "flex", gap: 6 },
  studentCell: { display: "flex", alignItems: "center", gap: 10 },
  avatar: {
    width: 34, height: 34, borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "13px", fontWeight: 700, color: "white", flexShrink: 0,
    fontFamily: "var(--font-display)",
  },
  studentName: { fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" },
  studentEmail: { fontSize: "11px", color: "var(--text-muted)", marginTop: 1 },
  gpaCell: { display: "flex", flexDirection: "column", gap: 4 },
  gpaBar: { height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, width: 60, overflow: "hidden" },
  gpaFill: { height: "100%", background: "linear-gradient(90deg, #2563eb, #3b82f6)", borderRadius: 2 },
  attendCell: { display: "flex", flexDirection: "column", gap: 4 },
  attendBar: { height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, width: 60, overflow: "hidden" },
  attendFill: { height: "100%", borderRadius: 2 },
  modalOverlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 500, animation: "fadeIn 0.2s ease",
  },
  modal: {
    background: "var(--bg-elevated)", border: "1px solid var(--border-bright)",
    borderRadius: 20, padding: 28, width: 400, animation: "scaleIn 0.2s ease",
    boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
  },
  modalHeader: { display: "flex", alignItems: "center", gap: 14, marginBottom: 20 },
  modalAvatar: {
    width: 50, height: 50, borderRadius: 14,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "20px", fontWeight: 700, color: "white", fontFamily: "var(--font-display)",
  },
  modalName: { fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 700, color: "var(--text-primary)" },
  modalEmail: { fontSize: "12px", color: "var(--text-muted)", marginTop: 2 },
  modalGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  modalStat: {
    background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)",
    borderRadius: 12, padding: "14px 16px",
  },
  modalStatVal: { fontSize: "22px", fontWeight: 700, fontFamily: "var(--font-display)" },
  modalStatLabel: { fontSize: "11px", color: "var(--text-muted)", marginTop: 2 },
};
