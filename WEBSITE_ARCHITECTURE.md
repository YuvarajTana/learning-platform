# Interactive Learning Platform - Architecture

## Overview
A modern, interactive web platform for progressive project-based learning with real-time code execution, progress tracking, and community features.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Dashboard│  │  Editor  │  │ Projects │  │ Community│   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└──────────────────────┬──────────────────────────────────────┘
                       │ REST API
┌──────────────────────┴──────────────────────────────────────┐
│                  Backend API (FastAPI)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Auth   │  │ Projects │  │ Progress │  │  Code    │   │
│  │          │  │          │  │  Track   │  │ Execute  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└──────┬──────────────┬──────────────┬──────────────┬─────────┘
       │              │              │              │
┌──────▼──────┐ ┌─────▼─────┐ ┌─────▼─────┐ ┌─────▼─────┐
│  PostgreSQL │ │   Redis   │ │  Docker   │ │   S3/     │
│  Database   │ │   Cache   │ │ Container │ │  Storage  │
└─────────────┘ └───────────┘ └───────────┘ └───────────┘
```

## Directory Structure

```
learning-platform/
├── frontend/                 # Next.js application
│   ├── app/                 # Next.js 13+ app directory
│   │   ├── (auth)/          # Auth routes
│   │   ├── dashboard/       # User dashboard
│   │   ├── projects/        # Project pages
│   │   │   ├── [id]/        # Individual project
│   │   │   │   ├── page.tsx # Project view
│   │   │   │   ├── editor/  # Code editor page
│   │   │   │   └── concepts/# Concept deep-dive
│   │   ├── community/       # Community features
│   │   └── api/             # API routes (proxy)
│   ├── components/          # React components
│   │   ├── editor/          # Code editor components
│   │   ├── dashboard/       # Dashboard components
│   │   ├── progress/        # Progress tracking
│   │   └── shared/          # Shared components
│   ├── lib/                 # Utilities
│   │   ├── api.ts           # API client
│   │   ├── editor.ts        # Editor utilities
│   │   └── utils.ts         # General utilities
│   └── public/              # Static assets
│
├── backend/                  # FastAPI application
│   ├── app/
│   │   ├── api/             # API routes
│   │   │   ├── v1/
│   │   │   │   ├── auth.py  # Authentication
│   │   │   │   ├── projects.py # Project management
│   │   │   │   ├── progress.py # Progress tracking
│   │   │   │   ├── code.py  # Code execution
│   │   │   │   └── community.py # Community features
│   │   ├── core/            # Core functionality
│   │   │   ├── config.py    # Configuration
│   │   │   ├── security.py  # Security utilities
│   │   │   └── database.py  # Database setup
│   │   ├── models/          # Database models
│   │   ├── schemas/         # Pydantic schemas
│   │   └── services/        # Business logic
│   │       ├── code_executor.py # Code execution service
│   │       ├── project_service.py
│   │       └── progress_service.py
│   └── tests/               # Test files
│
├── shared/                   # Shared resources
│   ├── projects/            # Project definitions
│   │   ├── p1-simple-fastapi-server/
│   │   ├── p2-sample-rest-api/
│   │   └── ...              # All project templates
│   ├── concepts/            # Concept documentation
│   └── case-studies/        # Real-world examples
│
└── infrastructure/          # Infrastructure as code
    ├── docker/              # Docker configs
    ├── kubernetes/          # K8s manifests (optional)
    └── scripts/             # Deployment scripts
```

## Key Features & Components

### 1. Dashboard Component
**Purpose**: Central hub for learning progress

**Features**:
- Progress visualization (charts, progress bars)
- Recent projects and activity
- Concept mastery indicators
- Quick access to next project
- Achievement badges
- Time tracking

**Tech Stack**:
- React components with Recharts for visualizations
- Real-time updates via WebSocket or polling

### 2. Interactive Code Editor
**Purpose**: In-browser coding experience

**Features**:
- Monaco Editor (VS Code editor in browser)
- Syntax highlighting for Python
- Auto-completion and IntelliSense
- Real-time error detection
- Code formatting
- File tree navigation
- Run/Test buttons
- Output panel

**Tech Stack**:
- Monaco Editor (monaco-editor npm package)
- WebSocket connection for real-time updates
- Docker-based code execution backend

### 3. Project Explorer
**Purpose**: Browse and select projects

**Features**:
- Filter by phase, concept, difficulty
- Search functionality
- Prerequisites display
- Estimated time
- Completion status
- Real-world applications preview

**Tech Stack**:
- Next.js dynamic routing
- Server-side filtering and search

### 4. Concept Deep-Dive Pages
**Purpose**: Detailed concept explanations

**Features**:
- Concept overview and theory
- Visual diagrams (Mermaid.js)
- Code examples
- Real-world case studies
- Common pitfalls
- Best practices
- Related concepts

**Tech Stack**:
- Markdown-based content (MDX)
- Mermaid.js for diagrams
- Code syntax highlighting

### 5. Code Execution Service
**Purpose**: Safely execute user code

**Architecture**:
```
User Code → API Request → Queue → Docker Container → Execute → Results → Response
```

**Security**:
- Sandboxed Docker containers
- Resource limits (CPU, memory, time)
- Network restrictions
- File system isolation
- Automatic cleanup

**Tech Stack**:
- Docker API for container management
- Redis queue for job management
- Python subprocess for execution

### 6. Progress Tracking System
**Purpose**: Track learning journey

**Data Model**:
```python
UserProgress:
  - user_id
  - project_id
  - status (not_started, in_progress, completed)
  - completion_percentage
  - time_spent
  - concepts_mastered
  - last_accessed
  - test_results
```

**Features**:
- Automatic progress updates
- Concept mastery tracking
- Time analytics
- Completion certificates

### 7. Real-World Mapping System
**Purpose**: Connect concepts to industry

**Data Structure**:
```python
RealWorldMapping:
  - concept_id
  - company_name
  - use_case_description
  - example_code (optional)
  - case_study_link
  - industry
  - relevance_score
```

**Display**:
- "How X uses this" sections
- Industry examples carousel
- Case study deep-dives
- Career relevance indicators

## API Endpoints

### Authentication
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
GET    /api/v1/auth/me
```

### Projects
```
GET    /api/v1/projects              # List all projects
GET    /api/v1/projects/{id}         # Get project details
GET    /api/v1/projects/{id}/concept # Get concept details
GET    /api/v1/projects/{id}/cases   # Get real-world cases
```

### Progress
```
GET    /api/v1/progress              # Get user progress
POST   /api/v1/progress              # Update progress
GET    /api/v1/progress/stats        # Get statistics
GET    /api/v1/progress/achievements # Get achievements
```

### Code Execution
```
POST   /api/v1/code/execute          # Execute code
GET    /api/v1/code/execute/{id}     # Get execution result
POST   /api/v1/code/validate         # Validate against tests
```

### Community
```
GET    /api/v1/community/solutions   # Get shared solutions
POST   /api/v1/community/solutions   # Share solution
GET    /api/v1/community/discussions # Get discussions
POST   /api/v1/community/discussions # Create discussion
```

## Database Schema

### Users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    username VARCHAR UNIQUE NOT NULL,
    password_hash VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Projects
```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    project_number INTEGER UNIQUE NOT NULL,
    title VARCHAR NOT NULL,
    description TEXT,
    concept VARCHAR NOT NULL,
    phase VARCHAR NOT NULL,
    difficulty VARCHAR NOT NULL,
    estimated_time INTEGER, -- minutes
    prerequisites INTEGER[], -- array of project IDs
    created_at TIMESTAMP DEFAULT NOW()
);
```

### User Progress
```sql
CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    project_id INTEGER REFERENCES projects(id),
    status VARCHAR DEFAULT 'not_started',
    completion_percentage INTEGER DEFAULT 0,
    time_spent INTEGER DEFAULT 0, -- seconds
    last_accessed TIMESTAMP,
    completed_at TIMESTAMP,
    UNIQUE(user_id, project_id)
);
```

### Concepts
```sql
CREATE TABLE concepts (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    description TEXT,
    documentation_path VARCHAR,
    related_concepts INTEGER[],
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Real World Mappings
```sql
CREATE TABLE real_world_mappings (
    id SERIAL PRIMARY KEY,
    concept_id INTEGER REFERENCES concepts(id),
    company_name VARCHAR NOT NULL,
    use_case TEXT NOT NULL,
    case_study_url VARCHAR,
    industry VARCHAR,
    relevance_score INTEGER DEFAULT 0
);
```

## Security Considerations

1. **Code Execution**
   - Docker container isolation
   - Resource limits (CPU, memory, time)
   - Network restrictions
   - File system read-only except temp
   - Automatic container cleanup

2. **Authentication**
   - JWT tokens with refresh mechanism
   - Password hashing (bcrypt)
   - Rate limiting on auth endpoints
   - CORS configuration

3. **API Security**
   - Rate limiting per user
   - Input validation (Pydantic)
   - SQL injection prevention (ORM)
   - XSS prevention (React auto-escaping)

## Performance Optimizations

1. **Caching**
   - Redis for frequently accessed data
   - Project definitions cached
   - User progress cached with TTL
   - CDN for static assets

2. **Database**
   - Indexed foreign keys
   - Query optimization
   - Connection pooling
   - Read replicas for scaling

3. **Frontend**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Service worker for offline

## Deployment Strategy

### Development
- Local development with hot reload
- Docker Compose for services
- Local PostgreSQL and Redis

### Staging
- Vercel for frontend preview
- Railway/Render for backend
- Separate staging database

### Production
- Vercel for frontend (CDN)
- Railway/Render for backend API
- Managed PostgreSQL (Supabase/Neon)
- Managed Redis (Upstash)
- Docker Hub for code execution images

## Monitoring & Analytics

1. **Application Monitoring**
   - Sentry for error tracking
   - Logging (structured logs)
   - Performance metrics

2. **Learning Analytics**
   - Project completion rates
   - Time to completion
   - Concept mastery tracking
   - Drop-off points identification

3. **User Analytics**
   - Active users
   - Engagement metrics
   - Feature usage
   - Feedback collection

## Future Enhancements

1. **AI Features**
   - Code suggestions and hints
   - Personalized learning paths
   - Automated code review
   - Concept explanation generation

2. **Collaboration**
   - Pair programming mode
   - Code sharing and reviews
   - Study groups
   - Mentorship matching

3. **Gamification**
   - Points and leaderboards
   - Streaks and challenges
   - Badges and achievements
   - Learning paths with rewards

4. **Mobile App**
   - React Native app
   - Offline mode
   - Push notifications
   - Mobile-optimized editor

---

This architecture provides a solid foundation for a scalable, interactive learning platform that grows with the user's needs.

