# TaskFlow - Full Stack Task Management Application

## Overview

TaskFlow is a full-stack task management application built using Next.js, Express.js, PostgreSQL, Prisma, and TypeScript.

The application allows users to manage tasks efficiently through authentication, task tracking, filtering, searching, sorting, file attachments, activity tracking, and real-time updates.

---

## Features

### Authentication & Authorization

- User Signup
- User Login
- JWT Authentication
- Secure Password Hashing (bcrypt)
- Protected Routes
- Persistent Login Sessions
- Role-Based Access Control (User/Admin)

### Task Management

- Create Tasks
- Edit Tasks
- Delete Tasks
- View Tasks
- Due Dates
- Priority Levels
- Status Management

### Search, Sort & Filter

- Search by Title
- Filter by Status
- Sort by:
  - Due Date
  - Priority
  - Created Date

### Admin Features

- View All User Tasks
- Search Tasks Across Users
- Filter User Tasks
- User Information Visibility

### Real-Time Updates

- Socket.IO Integration
- Live Task Creation Updates
- Live Task Update Notifications
- Live Task Deletion Updates
- Live Activity Log Refresh

### Activity Log

Tracks:

- Task Created
- Task Deleted
- Status Changed
- Priority Changed

### File Attachments

- Upload Documents
- Upload Images
- View Attachments

### User Experience

- Responsive Design
- Mobile Friendly
- Dark Mode
- Light Mode
- Optimistic UI Updates
- Loading States
- Empty States
- Error States

### Quality Features

- Unit/Integration Tests
- Docker Support
- GitHub Actions CI/CD

---

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Query
- Socket.IO Client

### Backend

- Express.js
- TypeScript
- Prisma ORM
- Socket.IO
- JWT

### Database

- PostgreSQL

---

## Assumptions & Trade-offs

### File Storage

Current implementation stores files locally.

Trade-off:

- Simpler implementation
- Suitable for local development
- Files
