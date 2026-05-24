import React, { useState } from "react";

const navItems = [
  { id: "Dashboard", icon: "▦", label: "Dashboard", badge: null },
  { id: "Students", icon: "◉", label: "Students", badge: "1.2k" },
  { id: "Schedule", icon: "◫", label: "Schedule", badge: null },
  { id: "Results", icon: "◈", label: "Results", badge: "New" },
  { id: "AI Assistant", icon: "⬡", label: "AI Assistant", badge: null },
  { id: "Fees", icon: "◎", label: "Fees", badge: "4" },
];

export default function Sidebar({ active, onNavigate }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div style={styles.sidebar}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navLabel}>NAVIGATION</div>
        {navItems.map((item) => {
          const isActive = active === item.id;
          const isHovered = hoveredItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate && onNavigate(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {}),
                ...(isHovered && !isActive ? styles.navItemHover : {}),
              }}
            >
              {isActive && <div style={styles.activeIndicator} />}
              <span style={{
                ...styles.navIcon,
                color: isActive ? "#60a5fa" : "var(--text-muted)",
              }}>
                {item.icon}
              </span>
              <span style={{
                ...styles.navLabel2,
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                fontWeight: isActive ? 600 : 400,
              }}>
                {item.label}
              </span>
              {item.badge && (
                <span style={{
                  ...styles.navBadge,
                  background: item.badge === "New"
                    ? "rgba(16,185,129,0.15)"
                    : item.badge === "4"
                    ? "rgba(244,63,94,0.15)"
                    : "rgba(255,255,255,0.06)",
                  color: item.badge === "New"
                    ? "#34d399"
                    : item.badge === "4"
                    ? "#fb7185"
                    : "var(--text-muted)",
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div style={styles.divider} />

      {/* System info */}
      <div style={styles.systemInfo}>
        <div style={styles.systemRow}>
          <span style={styles.systemLabel}>System Status</span>
          <div style={styles.statusDot} />
        </div>
        <div style={styles.systemStat}>
          <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>Uptime</span>
          <span style={{ color: "var(--accent-emerald)", fontSize: "11px", fontWeight: 600 }}>99.9%</span>
        </div>
        <div style={styles.systemStat}>
          <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>AI Model</span>
          <span style={{ color: "#a78bfa", fontSize: "11px", fontWeight: 600 }}>v2.1 Active</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: 220,
    minWidth: 220,
    background: "var(--bg-surface)",
    borderRight: "1px solid var(--border)",
    display: "flex",
    flexDirection: "column",
    padding: "20px 12px",
    gap: 4,
    overflowY: "auto",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    flex: 1,
  },
  navLabel: {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    color: "var(--text-muted)",
    padding: "4px 12px 8px",
    fontFamily: "var(--font-display)",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "9px 12px",
    borderRadius: 10,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
    transition: "all 0.18s ease",
    position: "relative",
    fontFamily: "var(--font-body)",
  },
  navItemActive: {
    background: "rgba(59,130,246,0.1)",
    border: "1px solid rgba(59,130,246,0.2)",
  },
  navItemHover: {
    background: "rgba(255,255,255,0.04)",
  },
  activeIndicator: {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: 3,
    height: 18,
    background: "#3b82f6",
    borderRadius: "0 3px 3px 0",
  },
  navIcon: {
    fontSize: "16px",
    width: 18,
    textAlign: "center",
    flexShrink: 0,
    transition: "color 0.2s",
  },
  navLabel2: {
    flex: 1,
    fontSize: "13.5px",
    transition: "color 0.2s",
    fontFamily: "var(--font-body)",
  },
  navBadge: {
    fontSize: "10px",
    fontWeight: 700,
    padding: "2px 6px",
    borderRadius: 100,
  },
  divider: {
    height: 1,
    background: "var(--border)",
    margin: "12px 0",
  },
  systemInfo: {
    padding: "12px",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid var(--border)",
    borderRadius: 10,
  },
  systemRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  systemLabel: {
    fontSize: "11px",
    fontWeight: 600,
    color: "var(--text-secondary)",
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#10b981",
    animation: "pulse-slow 2s infinite",
    display: "inline-block",
  },
  systemStat: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 4,
  },
};
