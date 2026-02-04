# Auth Task – Full Stack Authentication System

A production-style authentication system built using NestJS (backend) and Next.js App Router (frontend) with PostgreSQL, JWT, httpOnly cookies, and Docker.

This project demonstrates real-world backend and frontend authentication fundamentals expected in internships and entry-level backend roles.

---

## Features

### Backend (NestJS)
- User signup and signin
- Password hashing
- JWT access token
- JWT refresh token stored in httpOnly cookies
- PostgreSQL database integration
- Proper HTTP status handling
- Dockerized backend and database

### Frontend (Next.js App Router)
- Signup page
- Signin page
- Tailwind CSS based UI
- API integration with credentials (cookies)
- Basic client-side error handling

---

## Tech Stack

### Backend
- NestJS
- PostgreSQL
- JWT
- cookie-parser
- Docker & Docker Compose

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- Fetch API

## How to Run (Docker)

### Step 1: Clone the repository
```bash
git clone <repo-url>
cd Auth-Task
Step 2: Start services
docker compose up --build
Running services
Backend: http://localhost:3001

Frontend: http://localhost:3000

PostgreSQL: port 5432
