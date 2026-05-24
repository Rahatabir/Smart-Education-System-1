# EduSmart AI — Premium Edition 🎓

A 2026-style premium AI-powered Student Management System built with React + Vite.

---

## 🚀 VS Code এ Run করার নিয়ম

### Step 1 — Prerequisites ইনস্টল করো
- [Node.js](https://nodejs.org) ডাউনলোড করো (v18 বা newer)
- VS Code ইনস্টল থাকতে হবে

### Step 2 — Project খোলো
1. ZIP ফাইলটি Extract করো
2. VS Code খোলো
3. **File → Open Folder** → `edusmart-premium` ফোল্ডার সিলেক্ট করো

### Step 3 — Terminal খোলো
VS Code এ: **Terminal → New Terminal** (বা `Ctrl + backtick`)

### Step 4 — Dependencies ইনস্টল করো
```bash
npm install
```

### Step 5 — Run করো
```bash
npm run dev
```

### Step 6 — Browser এ খোলো
```
http://localhost:5173
```

---

## 🔑 Demo Credentials

| Role    | Email                  | Password |
|---------|------------------------|----------|
| Student | student@gmail.com      | 123456   |
| Admin   | /admin route (no login required) | — |

---

## 📁 Project Structure

```
edusmart-premium/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         ← Top navigation bar
│   │   ├── Sidebar.jsx        ← Side navigation
│   │   ├── Dashboard.jsx      ← Main dashboard with routing
│   │   ├── Students.jsx       ← Student management table
│   │   ├── Results.jsx        ← GPA charts & results
│   │   ├── Schedule.jsx       ← Weekly class schedule
│   │   ├── AIChat.jsx         ← AI assistant chat
│   │   ├── FeeManagement.jsx  ← Fee tracking system
│   │   └── ProtectedRoute.jsx ← Auth guard
│   ├── pages/
│   │   ├── Landing.jsx        ← Home/landing page
│   │   ├── Admin.jsx          ← Admin wrapper
│   │   ├── StudentLogin.jsx   ← Student login
│   │   └── StudentDashboard.jsx ← Student view
│   ├── services/
│   │   └── aiService.js       ← AI response logic
│   ├── App.jsx                ← Routes
│   ├── main.jsx               ← Entry point
│   └── index.css              ← Global premium styles
├── index.html
├── package.json
└── vite.config.js
```

---

## 🎨 Features

- ✅ Premium 2026-style dark UI with glassmorphism
- ✅ Animated stat counters on Dashboard
- ✅ Interactive student table with search, filter & modal
- ✅ Animated bar/grade charts in Results
- ✅ Day-filterable class schedule
- ✅ Live fee tracking with progress bars
- ✅ Full AI chat with conversation history
- ✅ Student portal with sidebar navigation
- ✅ Smooth page transitions & micro-interactions

