import React, { useState, useRef, useEffect } from "react";
import aiService from "../services/aiService";

const QUICK_PROMPTS = [
  { label: "Check Attendance", text: "How do I check my attendance?" },
  { label: "View Results", text: "Where can I see my GPA and results?" },
  { label: "Fee Status", text: "How do I pay my tuition fee?" },
  { label: "Class Schedule", text: "Show me the weekly class schedule" },
  { label: "Top Students", text: "Who are the top performing students?" },
];

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: "assistant",
      text: "Hello! I'm your EduSmart AI Assistant. I can help you with attendance, results, fees, schedules, and more. What would you like to know?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      text: msg,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const response = aiService.getSmartResponse(msg);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        text: response,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }]);
      setLoading(false);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.pageHeader}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={styles.aiAvatar}>⬡</div>
          <div>
            <h1 style={styles.pageTitle}>AI Assistant</h1>
            <div style={styles.onlineStatus}>
              <span style={styles.onlineDot} />
              <span style={styles.onlineText}>Online · Instant responses</span>
            </div>
          </div>
        </div>
        <button className="btn btn-ghost" style={{ fontSize: "12px" }}
          onClick={() => setMessages(messages.slice(0, 1))}>
          Clear chat
        </button>
      </div>

      {/* Chat area */}
      <div className="section-card" style={styles.chatContainer}>
        <div style={styles.messageList}>
          {messages.map((msg, i) => (
            <div
              key={msg.id}
              style={{
                ...styles.messageBubble,
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                animation: "fadeUp 0.3s ease",
              }}
            >
              {msg.role === "assistant" && (
                <div style={styles.botIcon}>⬡</div>
              )}
              <div style={{
                ...styles.bubble,
                background: msg.role === "user"
                  ? "linear-gradient(135deg, #2563eb, #3b82f6)"
                  : "rgba(255,255,255,0.05)",
                border: msg.role === "user" ? "none" : "1px solid var(--border-bright)",
                borderRadius: msg.role === "user"
                  ? "18px 18px 4px 18px"
                  : "18px 18px 18px 4px",
                maxWidth: "75%",
              }}>
                <p style={styles.bubbleText}>{msg.text}</p>
                <span style={styles.bubbleTime}>{msg.time}</span>
              </div>
              {msg.role === "user" && (
                <div style={{ ...styles.botIcon, background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}>A</div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ ...styles.messageBubble, alignSelf: "flex-start", animation: "fadeIn 0.3s ease" }}>
              <div style={styles.botIcon}>⬡</div>
              <div style={{ ...styles.bubble, background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-bright)", borderRadius: "18px 18px 18px 4px" }}>
                <div style={styles.typingDots}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ ...styles.dot, animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick prompts */}
        <div style={styles.quickRow}>
          {QUICK_PROMPTS.map((p, i) => (
            <button
              key={i}
              className="btn btn-ghost"
              onClick={() => sendMessage(p.text)}
              style={styles.quickBtn}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div style={styles.inputArea}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about attendance, results, fees, schedule..."
            style={styles.textarea}
            rows={1}
          />
          <button
            className="btn btn-primary"
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            style={{
              ...styles.sendBtn,
              opacity: loading || !input.trim() ? 0.5 : 1,
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            }}
          >
            {loading ? <div className="spinner" /> : "↑"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { padding: "32px", display: "flex", flexDirection: "column", gap: 20, maxWidth: 800 },
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", animation: "fadeUp 0.4s ease" },
  aiAvatar: {
    width: 42, height: 42, background: "linear-gradient(135deg, #2563eb, #7c3aed)",
    borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "20px", color: "white", animation: "glow-pulse 3s infinite",
  },
  pageTitle: { fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" },
  onlineStatus: { display: "flex", alignItems: "center", gap: 5, marginTop: 2 },
  onlineDot: { width: 6, height: 6, borderRadius: "50%", background: "#10b981", animation: "pulse-slow 2s infinite", display: "inline-block" },
  onlineText: { fontSize: "11px", color: "#34d399" },
  chatContainer: { display: "flex", flexDirection: "column", gap: 16, padding: "20px" },
  messageList: {
    display: "flex", flexDirection: "column", gap: 12,
    minHeight: 300, maxHeight: 420, overflowY: "auto",
    padding: "4px 4px 4px 0",
  },
  messageBubble: { display: "flex", gap: 8, alignItems: "flex-end", maxWidth: "100%" },
  botIcon: {
    width: 28, height: 28, borderRadius: 8,
    background: "linear-gradient(135deg, #1e3a5f, #2563eb)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "12px", color: "white", flexShrink: 0, fontWeight: 700,
  },
  bubble: { padding: "10px 14px", maxWidth: "75%" },
  bubbleText: { fontSize: "14px", lineHeight: 1.5, color: "var(--text-primary)", margin: 0 },
  bubbleTime: { fontSize: "10px", color: "rgba(255,255,255,0.35)", marginTop: 4, display: "block" },
  typingDots: { display: "flex", gap: 4, alignItems: "center", padding: "4px 0" },
  dot: {
    width: 6, height: 6, borderRadius: "50%", background: "var(--text-muted)",
    animation: "pulse-slow 1s infinite",
  },
  quickRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  quickBtn: {
    fontSize: "12px", padding: "5px 12px",
    borderRadius: 100, flexShrink: 0,
  },
  inputArea: { display: "flex", gap: 10, alignItems: "flex-end" },
  textarea: {
    flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-bright)",
    borderRadius: 12, padding: "12px 14px", color: "var(--text-primary)",
    fontFamily: "var(--font-body)", fontSize: "14px", outline: "none",
    resize: "none", lineHeight: 1.5,
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  sendBtn: {
    width: 42, height: 42, padding: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: 12, fontSize: "18px", fontWeight: 700, flexShrink: 0,
  },
};
