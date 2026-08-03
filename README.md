<div align="center">
  <h1>🧬 Roots of Biology</h1>
  <p>A Comprehensive Biology Learning Management System (LMS)</p>
</div>

## 📖 Overview
Roots of biology is a specialized learning management system focused on biology education. Built with a 3-tier role architecture: Admins oversee platform operations and user moderation; Moderators handle student approvals, batch timing, exam result publishing, and study material uploads; and Students access interactive diagrams, view schedules, download PDFs, and participate in online exams.

## 🚀 The Problem & Solution
* **The Problem:** Students lack a centralized online portal to take biology exams, track batch schedules, download curated study materials, and visualize complex biology topics.
* **The Solution:** An all-in-one educational platform integrating interactive diagrams, automated online exams, PDF resource distribution, and automated administrative approval workflows.

## ✨ Key Features
- 🔐 **3-Tier RBAC:** Strict Role-Based Access Control (Admin, Moderator, Student).
- 🛡️ **Admin Controls:** Promote Moderators & Ban/Unban Users.
- 📝 **Moderator Tools:** PDF/Image Uploads & Student Approvals.
- 📅 **Routine Management:** Dynamic Batch Schedule management.
- ⏱️ **Online Exams:** Automated online exam system with instant result publishing.
- 📚 **Student Portal:** Access to PDF study material downloads & live exam participation.

## 💻 Tech Stack
- **Framework:** Next.js (App Router), React
- **Styling:** Tailwind CSS, Framer Motion, Shadcn UI
- **Language:** TypeScript
- **Database:** PostgreSQL, Prisma ORM
- **Deployment:** Vercel

## 🛠️ Challenges & Learnings
* **Challenges:** Implementing strict 3-tier Role-Based Access Control (RBAC), managing secure PDF file handling, and handling real-time state synchronization during online exams.
* **Learnings:** Mastered Role-Based Access Control (RBAC) patterns, file handling workflows, online exam timer logic, and complex state management in React/Next.js.



# Start the development server
npm run dev
