import React from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";

export default function Admin() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "var(--bg-deep)", overflow: "hidden" }}>
      <Navbar />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Dashboard />
      </div>
    </div>
  );
}
