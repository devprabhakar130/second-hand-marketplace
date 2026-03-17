# Second-Hand Items Marketplace — Prototype

This repo contains a demo marketplace platform (monorepo):

- `backend/`: Node.js + Express + MongoDB (JWT auth)
- `frontend/`: Next.js app (auth + profile UI)

## Day 1 scope (completed)

- Project scaffolding (frontend + backend)
- Database design doc (`docs/DB_SCHEMA.md`)
- User authentication (email/password + phone OTP demo flow) using JWT
- Basic profile page (protected)

## Quick start (local)

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend runs at `http://localhost:4000`.

### 2) Frontend

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`.

## API endpoints (Day 1)

- `POST /api/auth/register` — email + password (+ optional phone)
- `POST /api/auth/login` — email + password
- `POST /api/auth/request-otp` — phone OTP (demo: OTP returned in response)
- `POST /api/auth/verify-otp` — phone OTP -> JWT
- `GET /api/me` — current user profile (requires `Authorization: Bearer <token>`)
