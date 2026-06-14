# TaskFlow - Full Stack Task Management Application

## Overview

TaskFlow is a full-stack task management application built using:

- Frontend: Next.js 16 + TypeScript + Tailwind CSS
- Backend: Express.js + TypeScript
- Database: PostgreSQL + Prisma ORM
- Authentication: JWT + HTTP Only Cookies
- Real-Time Updates: Server Sent Events (SSE)
- Dockerized Setup using Docker Compose

## Features

### Authentication

- User Signup
- User Login
- Secure Password Hashing using bcrypt
- JWT Authentication
- Persistent Login Sessions

### Task Management

- Create Task
- Update Task
- Delete Task
- View Single Task
- View All Tasks

### Search & Filtering

- Search Tasks by Title
- Filter by Status
- Sort by:
  - Created Date
  - Due Date
  - Priority

### Authorization

- Users can only access their own tasks
- Admin role can view all users' tasks

### Additional Features

- Real-time task updates using SSE
- File attachments for tasks
- Dark Mode
- Responsive UI
- Pagination
- Optimistic UI Updates

---

## Environment Variables

### Backend (.env)

```env
PORT=5001
DATABASE_URL=
JWT_SECRET=
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

---

## Local Development

### Backend

```bash
cd backend

npm install

npx prisma generate

npx prisma migrate deploy

npm run dev
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Docker Setup

### Start Application

```bash
docker compose up --build
```

### Stop Application

```bash
docker compose down
```

### Services

Frontend:
http://localhost:3000

Backend:
http://localhost:5001

PostgreSQL:
localhost:5433

---

## Running Tests

Backend Tests:

```bash
cd backend

npm test
```

---

## Admin Credentials

Create an admin user directly in the database or update a user's role to ADMIN.

---

## Project Structure

```text
frontend/
backend/
docker-compose.yml
```

---

## Assumptions & Trade-offs

- JWT stored in HTTP-only cookies.
- SSE used for lightweight real-time updates.
- PostgreSQL chosen for reliability and relational data support.
- Prisma used for type-safe database access.

---

## Author

Prayas Godara

Email: [prayasgodara.workspace@gmail.com](mailto:prayasgodara.workspace@gmail.com)
LinkedIn: https://linkedin.com/in/prayasgodara
GitHub: https://github.com/prayas59
