import React, { useState } from "react";

export default function Navbar() {
  const [searchVal, setSearchVal] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, text: "Rahim Ahmed submitted an assignment", time: "2m ago", dot: "#3b82f6" },
    { id: 2, text: "Fee payment received from Sadia Islam", time: "15m ago", dot: "#10b981" },
    { id: 3, text: "New student registration pending", time: "1h ago", dot: "#f59e0b" },
  ];

  return (
    <div style={styles.navbar}>
      {/* Left: Brand */}
      <div style={styles.brand}>
        <div style={styles.logoMark}>ES</div>
        <div>
          <div style={styles.brandName}>EduSmart <span style={styles.aiBadge}>AI</span></div>
          <div style={styles.brandSub}>Admin Control Center</div>
        </div>
      </div>

      {/* Center: Search */}
      <div style={styles.searchWrap}>
        <span style={styles.searchIcon}>⌕</span>
        <input
          className="input"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search students, reports, settings..."
          style={styles.searchInput}
        />
        {searchVal && (
          <kbd style={styles.kbd}>ESC</kbd>
        )}
      </div>

      {/* Right: Actions */}
      <div style={styles.actions}>
        {/* Notif */}
        <div style={{ position: "relative" }}>
          <button
            className="btn btn-ghost"
            onClick={() => setNotifOpen(!notifOpen)}
            style={styles.iconBtn}
          >
            <span>🔔</span>
            <span style={styles.notifBadge}>3</span>
          </button>
          {notifOpen && (
            <div style={styles.dropdown}>
              <div style={styles.dropdownHeader}>
                <span style={styles.dropdownTitle}>Notifications</span>
                <span style={styles.dropdownClear} onClick={() => setNotifOpen(false)}>Clear all</span>
              </div>
              {notifications.map((n) => (
                <div key={n.id} style={styles.notifItem}>
                  <div style={{ ...styles.notifDot, background: n.dot }} />
                  <div>
                    <p style={styles.notifText}>{n.text}</p>
                    <p style={styles.notifTime}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div style={styles.profile}>
          <div style={styles.avatar}>A</div>
          <div style={styles.profileInfo}>
            <div style={styles.profileName}>Admin</div>
            <div style={styles.profileRole}>Super Admin</div>
          </div>
          <span style={{ color: "var(--text-muted)", fontSize: "10px" }}>▾</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 28px",
    height: 64,
    background: "rgba(10,15,30,0.95)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid var(--border)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    gap: 20,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
  },
  logoMark: {
    width: 32,
    height: 32,
    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: 800,
    color: "white",
    fontFamily: "var(--font-display)",
  },
  brandName: {
    fontFamily: "var(--font-display)",
    fontSize: "15px",
    fontWeight: 700,
    color: "var(--text-primary)",
    lineHeight: 1.2,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  aiBadge: {
    fontSize: "9px",
    fontWeight: 700,
    background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
    color: "white",
    padding: "2px 5px",
    borderRadius: 4,
    letterSpacing: "0.05em",
  },
  brandSub: {
    fontSize: "11px",
    color: "var(--text-muted)",
    lineHeight: 1,
  },
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid var(--border-bright)",
    borderRadius: 10,
    padding: "0 14px",
    flex: 1,
    maxWidth: 420,
    height: 38,
  },
  searchIcon: {
    fontSize: "18px",
    color: "var(--text-muted)",
    transform: "scaleX(-1)",
    display: "inline-block",
  },
  searchInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "var(--text-primary)",
    fontSize: "13px",
    padding: 0,
    fontFamily: "var(--font-body)",
  },
  kbd: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid var(--border-bright)",
    borderRadius: 4,
    padding: "1px 6px",
    fontSize: "10px",
    color: "var(--text-muted)",
    fontFamily: "monospace",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
  },
  iconBtn: {
    position: "relative",
    width: 36,
    height: 36,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    borderRadius: 8,
  },
  notifBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 14,
    height: 14,
    background: "#f43f5e",
    borderRadius: "50%",
    fontSize: "9px",
    fontWeight: 700,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 8px)",
    right: 0,
    width: 300,
    background: "var(--bg-elevated)",
    border: "1px solid var(--border-bright)",
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    animation: "scaleIn 0.15s ease",
    zIndex: 200,
  },
  dropdownHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    borderBottom: "1px solid var(--border)",
  },
  dropdownTitle: {
    fontSize: "13px",
    fontWeight: 600,
    color: "var(--text-primary)",
  },
  dropdownClear: {
    fontSize: "12px",
    color: "var(--accent-blue)",
    cursor: "pointer",
  },
  notifItem: {
    display: "flex",
    gap: 12,
    padding: "12px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.03)",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  notifDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    flexShrink: 0,
    marginTop: 4,
  },
  notifText: {
    fontSize: "13px",
    color: "var(--text-secondary)",
    lineHeight: 1.4,
    marginBottom: 3,
  },
  notifTime: {
    fontSize: "11px",
    color: "var(--text-muted)",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 12px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid var(--border-bright)",
    borderRadius: 10,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  avatar: {
    width: 28,
    height: 28,
    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: 700,
    color: "white",
    fontFamily: "var(--font-display)",
  },
  profileInfo: { lineHeight: 1 },
  profileName: {
    fontSize: "13px",
    fontWeight: 600,
    color: "var(--text-primary)",
    marginBottom: 2,
  },
  profileRole: {
    fontSize: "10px",
    color: "var(--text-muted)",
  },
};
