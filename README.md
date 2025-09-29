# QuizzNodeJS

A simple quiz app with a Node.js/Express backend and a React frontend. The backend serves questions from a JSON file and scores answers. The frontend displays the quiz and submits answers. Made by me :D

## Features

- REST API for quiz questions and scoring
- React UI with progress tracking
- Docker support for development and production
- PWA (Progressive Web App: installable, offline-ready frontend)
- TypeScript throughout

## Project Structure

- `backend/`: Express server, question bank, backend Dockerfile
- `frontend/`: React app, API client, UI components, frontend Dockerfile, `manifest.json` for PWA support
- Root Dockerfile: builds and serves frontend via backend
- `docker-compose.yml`: runs backend and frontend separately for development

## Quick Start

### Prerequisites

- Node.js 20+ and npm

### Local Development

1. **backend**
   ```bash
   cd backend
   npm install
   node server.ts
   ```
2. **frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. **Access**
   - backend: http://localhost:5000
   - frontend: http://localhost:5173

### Docker

- **Dev mode (compose):**
  ```bash
  docker compose up --build
  # backend: http://localhost:5000
  # frontend: http://localhost:5173
  ```
- **Production (single image):**
  ```bash
  docker build -t quizznodejs .
  docker run -e PORT=5000 -p 5000:5000 quizznodejs
  ```

## API

- **GET `/questions`**: Returns all questions (no answers)
- **POST `/submit`**: Accepts array of answers, returns score

### Data Types

- **Question**: `{ id, question, options }`
- **Answer**: `{ id, answer }`

## Environment Variables

- See `.env.example` for sample configuration.
- **Backend**:
  - `URL`: Base URL for the backend server
  - `PORT`: Port number for the backend server
  - `QUESTIONS_FILE`: Path to the questions JSON file
- **Frontend**:
  - `VITE_API_URL`: URL of the backend API

## Scripts

- **Backend**: `npm start`, `build`
- **Frontend**: `npm run dev`, `build`, `preview`, `lint`

## Contact

- Portfolio: https://czubinski.dev
- Email: mieszkoczubinski@gmail.com
- LinkedIn: https://www.linkedin.com/in/mieszko-czubinski/
- GitHub: https://github.com/MescoCzubinski
