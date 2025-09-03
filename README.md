# QuizzNodeJS

## 📑 Table of contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Environment variables](#environment-variables)
- [Getting started (local)](#getting-started-local)
- [Running with Docker](#running-with-docker)
- [API reference](#api-reference)
- [Project scripts](#project-scripts)
- [Troubleshooting](#troubleshooting)
- [Contact](#contact)

## Overview

Simple quiz application with a Node.js/Express backend serving questions and scoring answers, and a React + Vite frontend that renders the quiz UI. Questions are stored in a JSON file on the backend.

## Architecture

- `Backend/`
  - `server.ts`: Express app exposing REST endpoints.
    - `GET /questions`: returns all questions without the correct answers.
    - `POST /submit`: accepts an array of answers and responds with a score.
  - `questions.json`: question bank with options and the correct answer.
  - `Dockerfile`: container for backend-only development.
- `Frontend/`
  - Vite + React app.
  - `src/API/api.ts`: functions to call backend.
  - `src/Components/Questions.tsx`: loads questions, tracks progress, submits answers.
  - `src/Components/Question.tsx`: renders a single question with options.
  - TailwindCSS for styles.
- Root `Dockerfile`: multi-stage build serving built frontend via the backend container (builds frontend, builds backend to `dist`, copies frontend `dist` to backend `public`, runs `node dist/server.js`).
- `docker-compose.yml`: runs backend and frontend in dev mode separately (ports 5000 and 3000→5173).

Data contracts (types used by the frontend and backend):
- Question (served to frontend):
  - `id: number`
  - `question: string`
  - `options: string[]`
- Answer (submitted by frontend):
  - `id: number`
  - `answer: string`

## Tech stack

- **Frontend**: React 19, Vite 7, TypeScript 5, TailwindCSS 4
- **Backend**: Node.js 22, Express 5, TypeScript (compiled to `dist` for production image)
- **Tooling**: ESLint, Docker

## Environment variables

Backend (Express, loaded via `dotenv`):
- `PORT` (default: `5000`): Port to bind the API server.
- `QUESTIONS_FILE` (optional): Absolute or relative path to the questions JSON file (default: `./questions.json`).

Frontend (Vite exposes variables prefixed with `VITE_`):
- `VITE_API_URL` (recommended): Base URL for the backend API, e.g. `http://localhost:5000`.
  - If not provided, the frontend will fall back to `window.location.origin`.

How to set envs locally:
- Backend: create `Backend/.env` (not committed) with lines like `PORT=5000`.
- Frontend: create `Frontend/.env` (or `.env.local`) with lines like `VITE_API_URL=http://localhost:5000`.

Docker & compose:
- `docker-compose.yml` passes sensible defaults via `environment` for both services.
- You can also use Compose `env_file` entries or `--env-file` with `docker run` to inject values.

## Getting started (local)

Prerequisites: Node.js 20+ (project images use Node 22), npm.

1) Backend
```bash
cd Backend
npm install
# Optional: create Backend/.env and set PORT, QUESTIONS_FILE
node server.ts
# Server listens on http://localhost:${PORT:-5000}
```

2) Frontend
```bash
cd Frontend
npm install
# Optional: create Frontend/.env and set VITE_API_URL
npm run dev
# Vite dev server on http://localhost:5173 (exposed as 3000 via compose)
```

3) Using both together locally
- Start backend first on port 5000 (or your configured `PORT`).
- Start frontend dev server. The frontend reads `VITE_API_URL` to reach the backend.

## Running with Docker

Option A: Development with docker-compose (separate services)
```bash
docker compose up --build
# Backend: http://localhost:5000
# Frontend dev: http://localhost:3000 (proxy to 5173)
```
- Override envs by editing `docker-compose.yml` `environment:` or using a `.env` file that Compose reads.

Option B: Single image (root Dockerfile) serving built frontend from backend
```bash
# Build multi-stage image from project root
docker build -t quizznodejs .
# Run with custom PORT
docker run -e PORT=5000 -p 5000:5000 quizznodejs
# Optionally mount a custom questions file
# docker run -e QUESTIONS_FILE=/app/questions.json -v %CD%/Backend/questions.json:/app/questions.json:ro -p 5000:5000 quizznodejs
```

Note: The root Dockerfile sets user 'Andrzej' and runs `node dist/server.js`. Ensure backend can read `public/` assets. The `Backend/Dockerfile` is a simpler backend-only image for development.

## API reference

Base URL: `http://localhost:5000` (or your configured `PORT`)

- GET `/questions`
  - Response 200 JSON: `Question[]` (without `answer` field)
  - Example
    ```json
    [
      { "id": 1, "question": "...", "options": ["A","B","C","D"] }
    ]
    ```

- POST `/submit`
  - Body JSON: `Answer[]`
    ```json
    [
      { "id": 1, "answer": "Representational State Transfer" }
    ]
    ```
  - Response 200 JSON: `{ "score": number }`

## Project scripts

Frontend (`Frontend/package.json`):
- `npm run dev`: start Vite dev server on 0.0.0.0:5173
- `npm run build`: type-check and build
- `npm run preview`: preview built app
- `npm run lint`: lint

Backend (`Backend/package.json`):
- `npm start`: `node server.ts` (development)
- `npm run build`: compile TypeScript to `dist` (for production image)

## Troubleshooting

- **CORS or network errors from frontend**: Ensure backend is running on the URL in `VITE_API_URL`. If unset, the frontend uses `window.location.origin`.
- **Port conflicts**: Change ports in `Frontend/vite.config.ts` or backend `PORT` in `server.ts` and update `VITE_API_URL` accordingly.
- **Docker on Windows file perms**: The root image sets user `'Andrzej'`; if you see permission issues, run as root (`--user 0`) or adjust `RUN chown`/`USER` lines.
- **Running `server.ts` with Node**: This project runs the `.ts` file directly for dev; for production, build and run `dist/server.js`.
- **Hot reload in compose**: Volumes mount `./Frontend` and `./Backend`; changes should reflect without rebuilding containers.

## Contact

- Portfolio: https://czubinski.dev
- Email: mieszkoczubinski@gmail.com
- LinkedIn: https://www.linkedin.com/in/mieszko-czubinski/
- GitHub: https://github.com/MescoCzubinski
