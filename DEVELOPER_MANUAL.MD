# TaskFlow Developer Manual

## Project Overview

TaskFlow is a production-style full-stack task management platform built for assessment and learning purposes.

Architecture follows a layered approach:

Frontend → API Layer → Service Layer → Repository Layer → PostgreSQL

---

# Architecture

## Frontend

Technology:

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Query
- Socket.IO Client

Responsibilities:

- UI Rendering
- Client Validation
- API Communication
- Real-Time Updates
- Optimistic Updates

---

## Backend

Technology:

- Express.js
- TypeScript
- Prisma ORM
- Socket.IO
- JWT Authentication

Responsibilities:

- Authentication
- Authorization
- Business Logic
- Validation
- Database Operations
- WebSocket Events

---

## Database

Technology:

- PostgreSQL

ORM:

- Prisma

---

# Folder Structure

## Frontend

```text
src/
├── app/
├── components/
├── hooks/
├── services/
├── lib/
├── providers/
├── types/
```

## Backend

```text
src/
├── common/
├── config/
├── middleware/
├── modules/
│   ├── auth/
│   └── task/
├── lib/
├── socket.ts
├── app.ts
└── server.ts
```

---

# Authentication Flow

1. User logs in.
2. Password validated using bcrypt.
3. JWT generated.
4. JWT stored in HttpOnly Cookie.
5. Protected routes validate token.
6. User data attached to request.

---

# Authorization

Roles:

```text
USER
ADMIN
```

User:

- Access own tasks only.

Admin:

- Access all tasks.
- Search all users.

---

# Database Schema

## User

Fields:

- id
- name
- email
- passwordHash
- role
- createdAt
- updatedAt

---

## Task

Fields:

- id
- title
- description
- status
- priority
- dueDate
- attachmentUrl
- userId
- createdAt
- updatedAt

---

## TaskActivity

Fields:

- id
- taskId
- action
- oldValue
- newValue
- createdAt

---

# Real-Time System

Technology:

Socket.IO

Events:

```text
task-created
task-updated
task-deleted
activity-updated
```

Frontend listens and invalidates React Query cache.

Benefits:

- Live synchronization
- No manual refresh
- Better UX

---

# Activity Log Implementation

Tracked Events:

```text
TASK_CREATED
TASK_DELETED
STATUS_CHANGED
PRIORITY_CHANGED
```

Activities stored in PostgreSQL.

Displayed through Activity Modal.

---

# Optimistic UI

Implemented using React Query.

Flow:

1. Update UI immediately.
2. Send request.
3. Rollback on failure.
4. Sync on success.

Benefits:

- Faster perceived performance.
- Better user experience.

---

# File Upload System

Current Storage:

```text
backend/uploads
```

Stored Metadata:

```text
attachmentUrl
```

Production Recommendation:

- Cloudinary
- AWS S3

Reason:

Cloud deployments may not preserve local storage.

---

# Dark Mode

Technology:

next-themes

Features:

- Theme persistence
- Light Mode
- Dark Mode

---

# Testing

Coverage Includes:

- Authentication
- Task CRUD
- Validation

Command:

```bash
npm test
```

---

# Docker Setup

Command:

```bash
docker-compose up --build
```

Services:

- Frontend
- Backend
- PostgreSQL

---

# CI/CD

GitHub Actions

Pipelines:

- Frontend Build
- Backend Build
- Tests

Executed on:

- Push
- Pull Request

---

# Deployment

Frontend:

Vercel

Backend:

Render

Database:

Render PostgreSQL

---

# Environment Variables

## Frontend

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SOCKET_URL=
```

## Backend

```env
PORT=
DATABASE_URL=
JWT_SECRET=
FRONTEND_URL=
```

---

# Trade-Offs

### Local File Storage

Chosen for simplicity.

Production storage should use object storage.

### Socket.IO

Chosen over polling for efficiency and real-time experience.

### JWT Cookies

Chosen for secure authentication and session persistence.

---

# Future Improvements

- Cloudinary Integration
- AWS S3 Support
- Email Notifications
- Push Notifications
- Audit Dashboard
- Team Collaboration
- Task Labels
- Task Comments
- Multi-Tenant Organizations

---

# Developed By

Prayas Godara

Email:
[prayasgodara.workspace@gmail.com](mailto:prayasgodara.workspace@gmail.com)

Phone:
+91 70147 40148
