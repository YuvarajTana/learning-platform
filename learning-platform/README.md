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


## Annotated Code Explanations for All Projects

You can now display annotated code explanations for all 5 projects using a single reusable component:

- **Component:** `MultiProjectAnnotatedCode` (in `frontend/components`)
- **Data:** `allProjectsAnnotatedCode` (in `frontend/lib`)
- **Example usage page:** `frontend/app/all-projects-code-examples.tsx`

### How to Use

1. Import the component and data:
	```tsx
	import MultiProjectAnnotatedCode from '@/components/MultiProjectAnnotatedCode'
	import { allProjectsAnnotatedCode } from '@/lib/allProjectsAnnotatedCode'
	```
2. Render in your page:
	```tsx
	<MultiProjectAnnotatedCode codes={allProjectsAnnotatedCode} />
	```

This will show a tabbed/code-switcher interface for all 5 projects, with clickable code annotations and explanations for each.

