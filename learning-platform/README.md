# Interactive Learning Platform

A modern, interactive web platform for progressive project-based learning with real-time code execution, progress tracking, and community features.

## Architecture

- **Frontend**: Next.js 14+ with TypeScript
- **Backend**: FastAPI with Python
- **Database**: PostgreSQL (SQLite for development)
- **Code Execution**: Docker containers
- **Cache**: Redis (optional for development)

## Project Structure

```
learning-platform/
├── backend/          # FastAPI backend
├── frontend/         # Next.js frontend
├── shared/           # Shared resources (projects, concepts)
└── infrastructure/   # Docker, deployment configs
```

## Quick Start

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Development

- Backend runs on: http://localhost:8000
- Frontend runs on: http://localhost:3000
- API docs: http://localhost:8000/docs

## Features

- ✅ User authentication
- ✅ Project management
- ✅ Progress tracking
- ✅ Code execution (coming soon)
- ✅ Community features (coming soon)

