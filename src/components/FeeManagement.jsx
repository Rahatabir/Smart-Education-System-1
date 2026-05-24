import React, { useState } from "react";

const initialFees = [
  { id: 1, name: "Rahim Ahmed", avatar: "R", due: 5000, total: 10000, status: "Pending", dueDate: "Jun 30, 2026" },
  { id: 2, name: "Karim Hasan", avatar: "K", due: 0, total: 10000, status: "Paid", dueDate: "Jun 30, 2026" },
  { id: 3, name: "Nusrat Jahan", avatar: "N", due: 2500, total: 10000, status: "Partial", dueDate: "Jun 15, 2026" },
  { id: 4, name: "Sadia Islam", avatar: "S", due: 0, total: 10000, status: "Paid", dueDate: "Jun 30, 2026" },
  { id: 5, name: "Tahmid Rahman", avatar: "T", due: 10000, total: 10000, status: "Overdue", dueDate: "May 31, 2026" },
  { id: 6, name: "Faria Hossain", avatar: "F", due: 0, total: 10000, status: "Paid", dueDate: "Jun 30, 2026" },
];

const avatarColors = ["#2563eb", "#7c3aed", "#059669", "#b45309", "#be123c", "#0891b2"];

const statusCfg = {
  "Paid": { badge: "badge-green", label: "Paid" },
  "Pending": { badge: "badge-amber", label: "Pending" },
  "Partial": { badge: "badge-blue", label: "Partial" },
  "Overdue": { badge: "badge-rose", label: "Overdue" },
};

export default function FeeManagement() {
  const [fees, setFees] = useState(initialFees);
  const [successId, setSuccessId] = useState(null);
  const [filter, setFilter] = useState("All");

  const markAsPaid = (id) => {
    setFees(prev => prev.map(f => f.id === id ? { ...f, due: 0, status: "Paid" } : f));
    setSuccessId(id);
    setTimeout(() => setSuccessId(null), 2000);
  };

  const totalPending = fees.filter(f => f.status !== "Paid").reduce((a, f) => a + f.due, 0);
  const totalCollected = fees.filter(f => f.status === "Paid").length * 10000;
  const overdueCnt = fees.filter(f => f.status === "Overdue").length;

  const filtered = filter === "All" ? fees : fees.filter(f => f.status === filter);

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Fee Management</h1>
          <p style={styles.pageSubtitle}>Academic Year 2025–2026</p>
        </div>
        <button className="btn btn-primary" style={{ fontSize: "13px" }}>+ Add Fee Record</button>
      </div>

      {/* Summary cards */}
      <div style={styles.summaryGrid}>
        {[
          { label: "Total Collected", value: `৳${(totalCollected).toLocaleString()}`, icon: "✓", color: "#10b981" },
          { label: "Outstanding", value: `৳${totalPending.toLocaleString()}`, icon: "◷", color: "#f59e0b" },
          { label: "Overdue", value: `${overdueCnt} Students`, icon: "⚠", color: "#f43f5e" },
          { label: "Collection Rate", value: `${Math.round((fees.filter(f=>f.status==="Paid").length/fees.length)*100)}%`, icon: "◉", color: "#3b82f6" },
        ].map((s, i) => (
          <div key={i} className="section-card" style={{ ...styles.summaryCard, animationDelay: `${i * 0.08}s` }}>
            <div style={{ ...styles.summaryIcon, background: `${s.color}18`, color: s.color }}>{s.icon}</div>
            <div style={{ ...styles.summaryValue, color: s.color }}>{s.value}</div>
            <div style={styles.summaryLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={styles.filterRow}>
        {["All", "Paid", "Pending", "Partial", "Overdue"].map(f => (
          <button key={f}
            onClick={() => setFilter(f)}
            className="btn"
            style={{
              fontSize: "12px", padding: "6px 14px", borderRadius: 8,
              background: filter === f ? "rgba(59,130,246,0.15)" : "transparent",
              border: filter === f ? "1px solid rgba(59,130,246,0.3)" : "1px solid var(--border-bright)",
              color: filter === f ? "#60a5fa" : "var(--text-secondary)",
            }}>
            {f}
            <span style={{ marginLeft: 4, opacity: 0.6, fontSize: "10px" }}>
              ({f === "All" ? fees.length : fees.filter(x => x.status === f).length})
            </span>
          </button>
        ))}
      </div>

      {/* Fee list */}
      <div style={styles.list}>
        {filtered.map((item, i) => (
          <div
            key={item.id}
            style={{
              ...styles.feeRow,
              animation: `slideIn 0.3s ease ${i * 0.06}s both`,
              border: item.status === "Overdue"
                ? "1px solid rgba(244,63,94,0.2)"
                : "1px solid var(--border)",
            }}
          >
            {/* Left: person */}
            <div style={styles.personCell}>
              <div style={{ ...styles.avatar, background: avatarColors[item.id - 1] }}>
                {item.avatar}
              </div>
              <div>
                <div style={styles.personName}>{item.name}</div>
                <div style={styles.personSub}>Due: {item.dueDate}</div>
              </div>
            </div>

            {/* Progress */}
            <div style={styles.progressCell}>
              <div style={styles.progressRow}>
                <span style={styles.progressLabel}>৳{(item.total - item.due).toLocaleString()} / ৳{item.total.toLocaleString()}</span>
                <span style={styles.progressPct}>{Math.round(((item.total - item.due) / item.total) * 100)}%</span>
              </div>
              <div style={styles.progressTrack}>
                <div style={{
                  ...styles.progressFill,
                  width: `${((item.total - item.due) / item.total) * 100}%`,
                  background: item.status === "Paid" ? "#10b981"
                    : item.status === "Overdue" ? "#f43f5e"
                    : "#3b82f6",
                  transition: "width 0.8s ease",
                }} />
              </div>
            </div>

            {/* Status + action */}
            <div style={styles.actionCell}>
              {successId === item.id ? (
                <span style={{ ...styles.successMsg }}>✓ Marked as Paid!</span>
              ) : (
                <>
                  <span className={`badge ${statusCfg[item.status]?.badge}`}>
                    {item.status}
                  </span>
                  {item.status !== "Paid" && (
                    <button
                      className="btn btn-success"
                      onClick={() => markAsPaid(item.id)}
                      style={{ fontSize: "12px", padding: "6px 14px" }}
                    >
                      Mark Paid
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: { padding: "32px", display: "flex", flexDirection: "column", gap: 20, maxWidth: 1000 },
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", animation: "fadeUp 0.4s ease" },
  pageTitle: { fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" },
  pageSubtitle: { fontSize: "13px", color: "var(--text-muted)", marginTop: 2 },
  summaryGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 },
  summaryCard: { padding: "18px 20px", textAlign: "center" },
  summaryIcon: { width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", margin: "0 auto 10px", fontWeight: 700 },
  summaryValue: { fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 800, marginBottom: 4 },
  summaryLabel: { fontSize: "11px", color: "var(--text-muted)" },
  filterRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  list: { display: "flex", flexDirection: "column", gap: 10 },
  feeRow: {
    display: "flex", alignItems: "center", gap: 20,
    padding: "16px 20px", background: "var(--bg-card)",
    borderRadius: 14, flexWrap: "wrap",
  },
  personCell: { display: "flex", alignItems: "center", gap: 10, minWidth: 180 },
  avatar: {
    width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "white", flexShrink: 0,
    fontFamily: "var(--font-display)",
  },
  personName: { fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" },
  personSub: { fontSize: "11px", color: "var(--text-muted)", marginTop: 2 },
  progressCell: { flex: 1, minWidth: 160 },
  progressRow: { display: "flex", justifyContent: "space-between", marginBottom: 6 },
  progressLabel: { fontSize: "12px", color: "var(--text-secondary)" },
  progressPct: { fontSize: "12px", fontWeight: 700, color: "var(--text-primary)" },
  progressTrack: { height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 3 },
  actionCell: { display: "flex", alignItems: "center", gap: 10, flexShrink: 0 },
  successMsg: { color: "#34d399", fontSize: "13px", fontWeight: 600, animation: "fadeIn 0.3s ease" },
};
