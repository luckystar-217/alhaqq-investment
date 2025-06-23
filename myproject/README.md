# Alhaqq Investment

This is a full-stack investment website project with the following stack:

- **Frontend:** React + TypeScript (Vite)
- **Backend:** Node.js/Express + TypeScript
- **Database:** PostgreSQL
- **Authentication:** JWT-based

## Getting Started

### Frontend
1. `npm install`
2. `npm run dev`

### Backend
1. `cd backend`
2. `npm install`
3. `npm run dev`

### Environment Variables
- Copy `.env.example` to `.env` in the backend folder and set your database and JWT secrets.

### Database Setup
- Ensure PostgreSQL is running and accessible.
- Create a database named `alhaqq_investment` (or update `DATABASE_URL` in `.env`).
- Run the migration script:
  - `psql -U <user> -d alhaqq_investment -f backend/db_init.sql`

### API Documentation
- Visit `http://localhost:5000/api/docs` after starting the backend for Swagger API docs.

---

This project is in active development. More features and documentation coming soon.
