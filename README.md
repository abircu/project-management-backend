# Project Management / Backend

**Stack:** Express 4 · MySQL (`mysql2`) · OpenAPI via Swagger UI.

REST API for projects: list (search, status, pagination), create, read, update, delete.

---

## Contents

| # | Section |
|---|---------|
| 1 | [Stack](#stack) |
| 2 | [Prerequisites](#prerequisites) |
| 3 | [Quick start](#quick-start) |
| 4 | [Database schema](#database-schema) |
| 5 | [Project layout](#project-layout) |
| 6 | [API](#api) |
| 7 | [Swagger & Postman](#swagger--postman) |
| 8 | [npm scripts](#npm-scripts) |

---

## Stack

- **Runtime:** Node.js (CommonJS)
- **HTTP:** Express, `cors`, `express.json()`
- **DB:** MySQL connection pool — `src/config/db.js`
- **Docs:** JSDoc OpenAPI comments in routes → `/api-docs` and `/api-docs.json`
- **Errors:** `src/middleware/errorHandler.js`

---

## Prerequisites

- Node.js (LTS)
- MySQL server reachable with credentials you put in `.env`

---

## Quick start

```bash
cd backend
npm install
```

1. Copy env template: `cp .env.example .env` (Windows: `copy .env.example .env`).
2. Edit `.env` — especially `DB_*` and optional `PORT`, `CLIENT_URL`.
3. Create DB + tables: [Database schema](#database-schema).
4. Run dev server:

```bash
npm run dev
```

**Useful URLs** (default port `5000`):

| Purpose | URL |
|---------|-----|
| Health | `GET http://localhost:5000/api/health` |
| Swagger UI | `http://localhost:5000/api-docs` |
| OpenAPI JSON | `http://localhost:5000/api-docs.json` |

```bash
curl -s http://localhost:5000/api/health
```

---

## Database schema

**File:** `database/schema.sql`

- Creates database `project_management` (utf8mb4) if missing.
- Table **`projects`:** `id`, `name`, `description`, `status` (`pending` | `active` | `completed`), `start_date`, `end_date`, `created_at`, `updated_at`.

Apply:

```bash
mysql -u root -p < database/schema.sql
```

Remote example:

```bash
mysql -h YOUR_HOST -P 3306 -u YOUR_USER -p < database/schema.sql
```

`DB_NAME` in `.env` should match (default `project_management`).

---

## Project layout

```
backend/
  database/
    schema.sql
  src/
    index.js                 # app entry, routes, Swagger mount
    config/
      db.js                  # MySQL pool
      swagger.js             # OpenAPI base spec
    controllers/
      project.controller.js
    routes/
      project.routes.js
    middleware/
      errorHandler.js
  .env.example
  package.json
  README.md
```

---

## API

**Base:** `http://localhost:5000/api`

| Method | Path | Notes |
|:------:|------|--------|
| `GET` | `/projects` | Query: `search`, `status`, `page`, `limit` |
| `POST` | `/projects` | JSON body; `name` required |
| `GET` | `/projects/:id` | Integer `id` |
| `PUT` | `/projects/:id` | JSON body |
| `DELETE` | `/projects/:id` | |

Details and schemas: open **Swagger UI** (`/api-docs`).

---

## Swagger & Postman

**In browser:** `http://localhost:5000/api-docs` — try requests from the UI.

**Postman**

1. **Import** → **Link** → `http://localhost:5000/api-docs.json`
2. If import-by-URL fails: download that JSON in a browser, then **Import** → **File**.
3. Collection server / base path should resolve to `http://localhost:5000/api`.
4. For `POST` / `PUT`: **Body** → **raw** → **JSON**.

**Other clients:** Insomnia, Hoppscotch, or VS Code Thunder Client — same OpenAPI file.

---

## npm scripts

| Script | Command |
|--------|---------|
| `npm run dev` | `nodemon src/index.js` |
| `npm start` | `node src/index.js` |

---
