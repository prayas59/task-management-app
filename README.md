# TaskFlow - Full Stack Task Management Application

A full-stack task management platform built as part of the Rival.io Full-Stack Developer Assessment.

## Tech Stack

### Frontend

- Next.js 16
- TypeScript
- Tailwind CSS
- TanStack Query

### Backend

- Express.js
- TypeScript
- Prisma ORM
- JWT Authentication

### Database

- PostgreSQL

### Additional Features

- Role-Based Access Control (Admin/User)
- Server-Sent Events (SSE) Real-Time Updates
- File Attachments
- Dark Mode
- Docker Support

---

# Features

## Authentication

- User Signup
- User Login
- Secure Password Hashing (bcrypt)
- JWT Authentication
- Persistent Login Sessions
- Protected Routes

## Task Management

- Create Tasks
- Update Tasks
- Delete Tasks
- View Single Task
- View All Tasks

Each task contains:

- Title
- Description
- Status
- Priority
- Due Date
- Attachments

## Search, Filter & Sort

### Search

- Search tasks by title

### Filters

- TODO
- IN_PROGRESS
- COMPLETED

### Sorting

- Created Date
- Due Date
- Priority

Search, filters, sorting and pagination work together.

## Authorization

### User

Users can:

- View their own tasks
- Create their own tasks
- Update their own tasks
- Delete their own tasks

### Admin

Admins can:

- View all users
- View all tasks
- Filter and search across all tasks

## Real-Time Updates

Task updates are pushed to connected clients using Server-Sent Events (SSE).

## Dark Mode

Supports light and dark themes with persisted user preference.

---

# Environment Variables

## Backend (.env)

```env
PORT=5001

DATABASE_URL=postgresql://user:password@host:5432/dbname

JWT_SECRET=super-secret-key-minimum-10-chars

APP_URL=http://localhost:5001

FRONTEND_URL=http://localhost:3000

NODE_ENV=development
```

## Frontend (.env)

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api/v1

NEXT_PUBLIC_SOCKET_URL=http://localhost:5001
```

---

# Local Development Setup

## 1. Clone Repository

```bash
git clone <repository-url>

cd task-management-app
```

## 2. Setup Backend

```bash
cd backend

npm install

npx prisma generate

npm run dev
```

Backend runs on:

```text
http://localhost:5001
```

## 3. Setup Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

# Docker Setup

## Start Application

```bash
docker compose up --build
```

## Stop Application

```bash
docker compose down
```

## Docker Services

### Frontend

```text
http://localhost:3000
```

### Backend

```text
http://localhost:5001
```

### PostgreSQL

```text
localhost:5433
```

---

# API Endpoints

## Authentication

```http
POST /api/v1/auth/signup
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

## Tasks

```http
POST   /api/v1/tasks
GET    /api/v1/tasks
GET    /api/v1/tasks/:id
PATCH  /api/v1/tasks/:id
DELETE /api/v1/tasks/:id
```

---

# Testing

Run backend tests:

```bash
cd backend

npm test
```

At least 3 automated tests are included.

---

# Assumptions & Trade-offs

- JWT is stored in secure HTTP-only cookies.
- SSE was chosen for lightweight real-time communication.
- Prisma was used for type-safe database access.
- PostgreSQL was selected as the primary relational database.

---

# Project Structure

```text
task-management-app
│
├── frontend
│
├── backend
│
├── docker-compose.yml
│
└── README.md
```

---

# Author

**Prayas Godara**

Email: [prayasgodara.workspace@gmail.com](mailto:prayasgodara.workspace@gmail.com)

GitHub: https://github.com/prayas59
