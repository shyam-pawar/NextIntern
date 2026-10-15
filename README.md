# 🚀 NexIntern - New Joinee & Internship Portal

A modern, full-featured web portal for new interns and joinees to discover, apply for, and track internships, along with a dedicated HR & Talent Management dashboard.

---

## 🌟 Key Features

### 🎓 1. For Candidates & New Interns
- **Internship Catalog**: Browse 6+ curated engineering, AI, design, and data science internships.
- **Smart Filtering & Search**: Instant real-time filtering by department, remote/hybrid work mode, required skills, and stipend.
- **Detailed Role Views**: Deep dive into daily responsibilities, qualifications, tech stacks, perks, and application deadlines.
- **Streamlined Registration**: Multi-section application form for personal details, academic history, portfolio links (GitHub, LinkedIn), and resume upload.
- **Real-Time Application Tracking**: Look up applications via unique ID (e.g. `INT-2026-101`) or email with a visual milestone progress stepper.
- **🎉 Joinee Onboarding Hub**:
  - Automatically unlocked when an application status is marked as **Accepted / Selected**.
  - Dedicated welcome message and start-date schedule.
  - Assigned senior mentor card with direct email and Slack channel details.
  - Interactive pre-joining checklist (NDA, hardware requisition, SSO account, development environment setup) with live completion progress bar.

### 👔 2. For HR & Talent Recruiters
- **Recruitment Analytics**: Real-time KPI cards for total applications, screening backlog, active interviews, and accepted joinees.
- **Candidate Review Pipeline**:
  - Filter by candidate stage (`Applied`, `Under Review`, `Interview Scheduled`, `Accepted`, `Rejected`).
  - Search applicants by name, college, email, or role.
  - Update candidate stages with instant status synchronization.
  - Attach custom recruiter evaluation notes.
  - **1-Click Export to CSV** for records and reporting.
- **Internship Listing Management**: Post new job openings, toggle active/closed status, or archive listings.
- **Interactive Role Switcher**: Seamlessly toggle between Candidate View and Recruiter View in the top navigation bar.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, Plus Jakarta Sans typography
- **Icons**: Lucide React
- **Data & Persistence**: Browser `localStorage` with seed data fallback

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` (or the port displayed in terminal).

### 3. Build for Production
```bash
npm run build
```

---

## 🧪 Quick Demo Guide

1. **Browse & Apply**: Go to **Available Internships**, select any track (e.g. *Frontend Engineering Intern*), and click **Apply Now**. Fill out the form and copy your generated Application ID (e.g. `INT-2026-xxx`).
2. **Track Status**: Head over to **Track Status & Joinee Hub**, paste your ID to view the application stepper.
3. **Switch to Recruiter View**: Click **HR Portal** in the navigation bar. Find your newly submitted application in the pipeline table, change the status to **Accepted / Selected**, and add an evaluation note.
4. **Inspect Joinee Onboarding**: Return to **Track Status & Joinee Hub**; your application will now display the unlocked **Joinee Onboarding Hub** with mentor details and interactive checklist!
