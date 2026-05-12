# Project Management / Backend

**Stack:** Express 4 · MySQL (`mysql2`).

REST API: project list (search, status, pagination), create, read, update, delete.

## About this project

Project management backend I built and can explain end-to-end (routes, SQL, errors, deployment).

---

## Contents

| # | Section |
|---|---------|
| 1 | [About this project](#about-this-project) |
| 2 | [Prerequisites](#prerequisites) |
| 3 | [Quick start](#quick-start) |
| 4 | [Live server URL](#live-server-url) |
| 5 | [Database schema](#database-schema) |
| 6 | [Project layout](#project-layout) |
| 7 | [API](#api) |
| 8 | [API testing (Postman, curl)](#api-testing-postman-curl) |
| 9 | [npm scripts](#npm-scripts) |

---

## Prerequisites

- Node.js (LTS)
- MySQL

---

## Quick start

```bash
cd backend
npm install
```

1. `cp .env.example .env` (Windows: `copy .env.example .env`)
2. Set `DB_*` in `.env`. Optionally set `API_PUBLIC_URL` after you deploy (see below).
3. Apply `database/schema.sql` to MySQL.
4. `npm run dev`

Local base URL: `http://localhost:5000` (or your `PORT`).

---

## Live server URL

After you deploy (Render, Railway, VPS, etc.), set in `.env`:

```env
API_PUBLIC_URL=https://project-management-backend-b9kx.onrender.com
```

- No trailing slash on `API_PUBLIC_URL`. Public API base for clients: **`https://project-management-backend-b9kx.onrender.com/api`** (same value the frontend uses as `VITE_API_BASE_URL`).
- `API_PUBLIC_URL` is only used in the startup log locally; set it on Render from the service dashboard if you want it in server env.

Document the same URL wherever you share the API (README, frontend `VITE_*` / env, Postman collection variable `{{baseUrl}}`).

---

## Database schema

**File:** `database/schema.sql`

- Database: `project_management` (utf8mb4)
- Table **`projects`:** `id`, `name`, `description`, `status` (`pending` | `active` | `completed`), `start_date`, `end_date`, `created_at`, `updated_at`

```bash
mysql -u root -p < database/schema.sql
```

Remote:

```bash
mysql -h HOST -P 3306 -u USER -p < database/schema.sql
```

Match `DB_NAME` in `.env` (default `project_management`).

---

## Project layout

```
backend/
  database/schema.sql
  postman/
    Project-Management-API.postman_collection.json
  src/
    index.js
    config/db.js
    controllers/project.controller.js
    routes/project.routes.js
    middleware/errorHandler.js
  .env.example
  package.json
  README.md
```

---

## API

**Base paths**

| Environment | Base |
|-------------|------|
| Local | `http://localhost:5000/api` |
| Live | `https://project-management-backend-b9kx.onrender.com/api` |

**Endpoints**

| Method | Path | Notes |
|:------:|------|--------|
| `GET` | `/health` | Full URL: `{base}/health` — liveness |
| `GET` | `/projects` | Query: `search`, `status`, `page`, `limit` |
| `POST` | `/projects` | JSON; `name` required |
| `GET` | `/projects/:id` | |
| `PUT` | `/projects/:id` | JSON body |
| `DELETE` | `/projects/:id` | |

Example live health check:

```text
GET https://project-management-backend-b9kx.onrender.com/api/health
```

---

## API testing (Postman, curl)

### Postman (exported collection)


**`postman/Project-Management-API.postman_collection.json`**

I attach this JSON file to Gmail when you can download and and **Import → File** from the download without cloning the repo. The copy in the repository stays the source of truth.

1. Postman → **Import** → **File** → choose that JSON.
2. Open the collection → **Variables** (or edit collection variables).
3. Set **`baseUrl`** to `http://localhost:5000/api` (local) or **`https://project-management-backend-b9kx.onrender.com/api`** (live). The collection defaults to live; change it for local runs. Path must end with `/api` (no extra slash after `api`).
4. Set **`projectId`** to a real row ID for get/update/delete requests.

You can also **Share** → export from Postman and replace this file when your requests change.

### Postman (manual)

1. Create a collection variable `baseUrl` = `http://localhost:5000/api` (local) or `https://project-management-backend-b9kx.onrender.com/api` (live).
2. Add requests: `GET {{baseUrl}}/health`, `GET {{baseUrl}}/projects`, etc.
3. `POST` / `PUT`: **Body** → **raw** → **JSON**, e.g. create:

```json
{
  "name": "Demo project",
  "description": "Optional",
  "status": "pending",
  "start_date": "2026-01-01",
  "end_date": "2026-12-31"
}
```

### curl (local)

Replace `BASE` if needed.

```bash
BASE=http://localhost:5000/api
curl -s "$BASE/health"
curl -s "$BASE/projects?page=1&limit=5"
curl -s -X POST "$BASE/projects" -H "Content-Type: application/json" \
  -d "{\"name\":\"From curl\",\"status\":\"active\"}"
```

### curl (live)

```bash
BASE=https://project-management-backend-b9kx.onrender.com/api
curl -s "$BASE/health"
```

**Alternative:** [Hoppscotch](https://hoppscotch.io/) or Insomnia — same URLs and JSON bodies.

---

## npm scripts

| Script | Command |
|--------|---------|
| `npm run dev` | `nodemon src/index.js` |
| `npm start` | `node src/index.js` |

---

