# Learning Platform Setup Guide

## 🎉 What's Been Built

### Backend (FastAPI)
✅ Complete API structure with:
- User authentication (JWT tokens)
- Project management endpoints
- Progress tracking system
- Code execution endpoint (placeholder)
- Database models (User, Project, UserProgress)
- Database seeding script

### Frontend (Next.js)
✅ Basic frontend with:
- Home page
- Dashboard with progress tracking
- Project listing page
- API client setup
- Tailwind CSS styling

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd learning-platform/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Initialize database and seed projects
python seed_data.py

# Run server
python run.py
```

Backend will run on: `http://localhost:8000`
API docs: `http://localhost:8000/api/docs`

### 2. Frontend Setup

```bash
cd learning-platform/frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will run on: `http://localhost:3000`

## 📋 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/token` - Login (get JWT token)
- `GET /api/v1/auth/me` - Get current user (protected)

### Projects
- `GET /api/v1/projects/` - List all projects
- `GET /api/v1/projects/{id}` - Get project by ID
- `GET /api/v1/projects/number/{number}` - Get project by number

### Progress
- `GET /api/v1/progress/` - Get user progress (protected)
- `GET /api/v1/progress/{project_id}` - Get project progress (protected)
- `POST /api/v1/progress/` - Create progress (protected)
- `PUT /api/v1/progress/{project_id}` - Update progress (protected)

### Code Execution
- `POST /api/v1/code/execute` - Execute code (placeholder, coming soon)

## 🗄️ Database

The platform uses SQLite by default (for development). The database file will be created automatically at `learning_platform.db`.

To use PostgreSQL in production:
1. Update `DATABASE_URL` in `.env`
2. Format: `postgresql://user:password@localhost/learning_platform`

## 📁 Project Structure

```
learning-platform/
├── backend/
│   ├── app/
│   │   ├── api/v1/        # API routes
│   │   ├── core/          # Core functionality (config, database, security)
│   │   ├── models/        # Database models
│   │   └── schemas/       # Pydantic schemas
│   ├── requirements.txt
│   ├── seed_data.py       # Seed initial projects
│   └── run.py             # Development server
│
├── frontend/
│   ├── app/               # Next.js app directory
│   ├── lib/               # Utilities (API client)
│   └── package.json
│
└── shared/                # Shared resources (coming soon)
```

## ✅ Current Features

### Working
- ✅ User registration and authentication
- ✅ Project listing and browsing
- ✅ Progress tracking (create, read, update)
- ✅ Dashboard with statistics
- ✅ API documentation (Swagger UI)

### Coming Soon
- ⏳ Code editor with Monaco Editor
- ⏳ Real-time code execution
- ⏳ Project detail pages
- ⏳ Login/Register pages
- ⏳ Community features
- ⏳ Concept deep-dives
- ⏳ Real-world case studies

## 🧪 Testing the API

### 1. Register a User
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "testpass123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser&password=testpass123"
```

### 3. Get Projects
```bash
curl http://localhost:8000/api/v1/projects/
```

### 4. Get Progress (with token)
```bash
curl http://localhost:8000/api/v1/progress/ \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🔧 Configuration

### Backend Environment Variables
Create `.env` file in `backend/` directory:
```env
DEBUG=True
SECRET_KEY=your-secret-key-change-this
DATABASE_URL=sqlite:///./learning_platform.db
CORS_ORIGINS=["http://localhost:3000"]
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend Environment Variables
Create `.env.local` file in `frontend/` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📝 Next Steps

1. **Add Login/Register Pages**: Create authentication UI
2. **Project Detail Pages**: Show project information and concepts
3. **Code Editor**: Integrate Monaco Editor for in-browser coding
4. **Code Execution**: Implement Docker-based code execution
5. **Progress Visualization**: Add charts and visual progress tracking
6. **Community Features**: Discussion forums, solution sharing

## 🐛 Troubleshooting

### Backend Issues
- **Import errors**: Make sure you're in the `backend/` directory and virtual environment is activated
- **Database errors**: Run `python seed_data.py` to initialize database
- **Port already in use**: Change port in `run.py` or kill process using port 8000

### Frontend Issues
- **API connection errors**: Make sure backend is running on port 8000
- **CORS errors**: Check `CORS_ORIGINS` in backend config
- **Build errors**: Run `npm install` again

## 📚 Documentation

- Backend API docs: `http://localhost:8000/api/docs`
- Backend README: `backend/README.md`
- Frontend README: `frontend/README.md`
- Architecture: `../WEBSITE_ARCHITECTURE.md`

---

**Happy Learning! 🚀**

