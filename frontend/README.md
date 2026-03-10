# GlucoScan AI – Frontend

AI-powered glaucoma detection platform frontend built using **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Recharts**.

This project is frontend-complete and structured for seamless backend integration.

---

## 🚀 Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Recharts (Admin analytics)
- Framer Motion (Animations)
- Sonner (Toast notifications)
- Lucide Icons

---

## 📁 Project Structure
app
├── (auth)
│ ├── login
│ ├── register
│ ├── forgot-password
│ ├── verify-otp
│ ├── verify-reset-otp
│ └── reset-password
│
├── dashboard
│ ├── page.tsx
│ └── upload
│
├── dashboard-admin
│ ├── page.tsx
│ ├── users
│ ├── activity
│ └── settings
│
components
├── ui
├── dashboard
lib
└── auth.ts

---

## 🔐 Authentication Flow

### Registration Flow

/register
→ /verify-otp
→ /dashboard


### Login Flow

/login
→ /verify-otp
→ /dashboard


### Forgot Password Flow

/forgot-password
→ /verify-reset-otp
→ /reset-password
→ /login


---

## 👤 User Features

- Register & Login
- OTP Verification
- Forgot / Reset Password
- User Dashboard
- Upload Retinal Image
- AI Prediction Display
- Scan History
- Download Report (UI Ready)

---

## 🛠 Admin Features

- Admin Dashboard
- User Growth Chart
- Scan Distribution Chart
- System Status
- Storage Monitoring
- Alerts Section
- User Management UI (Backend required)

---

## 📦 Installation

```bash
npm install
npm run dev

Runs on:

http://localhost:3000