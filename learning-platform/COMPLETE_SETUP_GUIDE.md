# 🚀 Complete Setup Guide - Learning Platform

## Overview
This comprehensive guide will walk you through setting up and running the Learning Platform on your local machine. Follow these steps carefully to get everything working perfectly.

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Running the Platform](#running-the-platform)
5. [Testing the Platform](#testing-the-platform)
6. [Troubleshooting](#troubleshooting)
7. [Advanced Configuration](#advanced-configuration)

---

## ✅ Prerequisites

### Required Software

Before starting, ensure you have these installed:

| Software | Minimum Version | Check Command | Download Link |
|----------|----------------|---------------|---------------|
| **Python** | 3.11+ | `python --version` | [python.org](https://www.python.org/downloads/) |
| **Node.js** | 18+ | `node --version` | [nodejs.org](https://nodejs.org/) |
| **npm** | 9+ | `npm --version` | Comes with Node.js |
| **Git** | Latest | `git --version` | [git-scm.com](https://git-scm.com/) |

### Verify Installation

Run these commands to verify everything is installed:

```bash
# Check Python
python --version
# Output: Python 3.11.x or higher

# Check Node.js
node --version
# Output: v18.x.x or higher

# Check npm
npm --version
# Output: 9.x.x or higher

# Check Git
git --version
# Output: git version 2.x.x
```

If any command fails, install the missing software from the links above.

---

## 🐍 Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd /Users/yuvarajtana/practice-projects/learning-platform/backend
```

### Step 2: Create Virtual Environment

**Why?** Virtual environments isolate project dependencies, preventing conflicts.

```bash
# Create virtual environment
python3 -m venv venv

# You should see a new 'venv' folder created
ls -la venv
```

### Step 3: Activate Virtual Environment

**On macOS/Linux:**
```bash
source venv/bin/activate
```

**On Windows:**
```bash
venv\Scripts\activate
```

**Success Check:** Your terminal prompt should now show `(venv)` at the beginning:
```
(venv) yuvarajtana@MacBook-Pro backend %
```

### Step 4: Upgrade pip

```bash
pip install --upgrade pip
```

### Step 5: Install Dependencies

```bash
# Install all required packages
pip install -r requirements.txt

# This installs:
# - FastAPI (web framework)
# - Uvicorn (ASGI server)
# - SQLAlchemy (database ORM)
# - Pydantic (data validation)
# - Python-Jose (JWT tokens)
# - Passlib (password hashing)
# - And more...
```

**Wait for completion.** You should see:
```
Successfully installed fastapi-0.115.6 uvicorn-0.32.1 ...
```

### Step 6: Initialize Database

```bash
python seed_data.py
```

**Expected Output:**
```
Database initialized!
Creating projects...
✓ Created Project 1: HTTP Server Basics
✓ Created Project 2: RESTful API Design
✓ Created Project 3: Database CRUD Operations
✓ Created Project 4: User Security
✓ Created Project 5: Input Validation & Error Management
Database seeded successfully!
```

### Step 7: Start Backend Server

```bash
python run.py
```

**Expected Output:**
```
INFO:     Started server process [xxxxx]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

✅ **Backend is now running!**

**Keep this terminal open.** The server needs to keep running.

---

## 🎨 Frontend Setup

**Open a NEW terminal window/tab** (keep backend running in the first one)

### Step 1: Navigate to Frontend Directory

```bash
cd /Users/yuvarajtana/practice-projects/learning-platform/frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

**Wait for completion.** This installs:
- Next.js 14
- React 18
- Framer Motion (animations)
- Monaco Editor (code editor)
- Tailwind CSS (styling)
- TypeScript
- And more...

**Expected Output:**
```
added XXX packages in XXs
```

### Step 3: Start Development Server

```bash
npm run dev
```

**Expected Output:**
```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.1s
```

✅ **Frontend is now running!**

**Keep this terminal open too.** You now have 2 terminals running.

---

## 🌐 Running the Platform

### Current Setup

You should now have:

**Terminal 1 (Backend):**
```
(venv) backend % python run.py
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Terminal 2 (Frontend):**
```
frontend % npm run dev
▲ Next.js 14.0.4
- Local: http://localhost:3000
```

### Access Points

Open these URLs in your browser:

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:3000 | Main application |
| **Backend** | http://localhost:8000 | API server |
| **API Docs** | http://localhost:8000/api/docs | Interactive API documentation |

---

## 🧪 Testing the Platform

### 1. Test Frontend

Open: http://localhost:3000

You should see:
- ✅ Beautiful gradient hero section
- ✅ "Master Development One Project at a Time" heading
- ✅ Feature cards with icons
- ✅ Stats section (25 projects, 5 phases, etc.)
- ✅ Navigation bar at top

**Try these:**
- Click "Start Learning" → Takes you to /projects
- Click "Dashboard" → Shows dashboard
- Click "Interactive Demo" → Shows demo page

### 2. Test Projects Page

Navigate to: http://localhost:3000/projects

You should see:
- ✅ 5 project cards displayed
- ✅ Filters (All, Beginner, Intermediate, Advanced)
- ✅ Statistics cards at top
- ✅ Smooth animations on load

**Try these:**
- Click "Beginner" filter → Shows only beginner projects
- Hover over project cards → See hover effects
- Click a project → Goes to project details

### 3. Test Project Details

Navigate to: http://localhost:3000/projects/1

You should see:
- ✅ Gradient hero header (blue/purple)
- ✅ Project title and description
- ✅ **Setup Instructions** section ⭐
- ✅ Code examples
- ✅ Learning objectives
- ✅ Real-world applications
- ✅ Next steps

**Try the Setup Instructions:**
1. Click through each of the 6 steps
2. Click "Copy" button → Copies commands
3. Click "Pro Tips" → Expands tips
4. Use Previous/Next buttons → Navigates steps
5. Click step indicators → Jumps to specific step

### 4. Test Demo Page

Navigate to: http://localhost:3000/demo

You should see:
- ✅ Animated hero with lightning bolt
- ✅ Quick navigation cards
- ✅ Interactive HTTP explanation
- ✅ Visual concept map (click nodes)
- ✅ Annotated code block
- ✅ Typography showcase

**Try these:**
- Click quick nav buttons → Scrolls smoothly to sections
- Click "Step 2" in HTTP explanation → Shows server processing
- Click nodes in concept visualizer → Shows descriptions
- Click annotation numbers in code → Shows explanations

### 5. Test Backend API

Open: http://localhost:8000/api/docs

You should see:
- ✅ Swagger UI documentation
- ✅ List of all API endpoints
- ✅ Auth, Projects, Progress, Code sections

**Try an API call:**
1. Find "GET /api/v1/projects/" endpoint
2. Click "Try it out"
3. Click "Execute"
4. See response with all projects

---

## 🎯 Complete Verification Checklist

Run through this checklist to ensure everything works:

### Backend Checks
- [ ] Backend server starts without errors
- [ ] Database file (`learning_platform.db`) exists
- [ ] Can access http://localhost:8000
- [ ] Can access http://localhost:8000/api/docs
- [ ] API docs show all endpoints
- [ ] Can fetch projects from API

### Frontend Checks
- [ ] Frontend server starts without errors
- [ ] Can access http://localhost:3000
- [ ] Home page loads with animations
- [ ] Navigation works
- [ ] Projects page shows all projects
- [ ] Project details page loads
- [ ] Setup Instructions display correctly
- [ ] Demo page shows all components

### Interactive Features
- [ ] Can navigate between steps in Setup Instructions
- [ ] Copy button works
- [ ] Pro tips expand/collapse
- [ ] Progress bar animates
- [ ] Quick nav scrolls smoothly
- [ ] Concept visualizer nodes are clickable
- [ ] Code annotations work
- [ ] All animations play smoothly

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** `ModuleNotFoundError: No module named 'fastapi'`

**Solution:**
```bash
# Make sure virtual environment is activated
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

---

**Problem:** `python: command not found`

**Solution:**
```bash
# Try python3 instead
python3 --version

# If that works, use:
python3 -m venv venv
python3 seed_data.py
python3 run.py
```

---

**Problem:** Port 8000 already in use

**Solution:**
```bash
# Find and kill the process
lsof -i :8000
kill -9 <PID>

# Or change the port in run.py:
# Change port=8000 to port=8001
```

---

**Problem:** Database errors

**Solution:**
```bash
# Reset the database
rm learning_platform.db
python seed_data.py
```

---

### Frontend Issues

**Problem:** `npm: command not found`

**Solution:**
```bash
# Install Node.js from nodejs.org
# After installation, verify:
node --version
npm --version
```

---

**Problem:** Port 3000 already in use

**Solution:**
Next.js will automatically offer an alternative port (like 3001). Just press 'y' to accept.

Or manually kill the process:
```bash
lsof -i :3000
kill -9 <PID>
```

---

**Problem:** `npm install` fails

**Solution:**
```bash
# Clear cache and retry
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

**Problem:** Page loads but no data shows

**Solution:**
- Check that backend is running (http://localhost:8000)
- Check browser console for errors (F12 → Console tab)
- Verify API endpoint in frontend/lib/api.ts points to http://localhost:8000

---

### General Issues

**Problem:** Styles not loading / page looks broken

**Solution:**
```bash
# Restart frontend
# Press Ctrl+C in frontend terminal
npm run dev
```

---

**Problem:** Animations not working

**Solution:**
- Check browser compatibility (Chrome/Firefox/Safari latest)
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check console for JavaScript errors

---

## ⚙️ Advanced Configuration

### Environment Variables

Create `.env` file in backend:
```bash
cd backend
nano .env
```

Add:
```env
# Database
DATABASE_URL=sqlite:///./learning_platform.db

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
FRONTEND_URL=http://localhost:3000
```

---

### Custom Port Configuration

**Backend (backend/run.py):**
```python
uvicorn.run(
    "app.main:app",
    host="0.0.0.0",
    port=8001,  # Change port here
    reload=True
)
```

**Frontend (frontend/package.json):**
```json
{
  "scripts": {
    "dev": "next dev -p 3001"  # Add -p flag
  }
}
```

---

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

**Backend:**
```bash
# Use production server
pip install gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────┐
│         Browser (localhost:3000)        │
│  ┌───────────────────────────────────┐  │
│  │   Next.js Frontend (React/TS)     │  │
│  │  - Components                     │  │
│  │  - Pages (App Router)             │  │
│  │  - Tailwind CSS                   │  │
│  │  - Framer Motion                  │  │
│  └───────────────┬───────────────────┘  │
└──────────────────┼──────────────────────┘
                   │ HTTP Requests
                   │ (axios)
                   ▼
┌─────────────────────────────────────────┐
│         API Server (localhost:8000)     │
│  ┌───────────────────────────────────┐  │
│  │    FastAPI Backend (Python)       │  │
│  │  - RESTful API                    │  │
│  │  - JWT Authentication             │  │
│  │  - SQLAlchemy ORM                 │  │
│  │  - Pydantic Validation            │  │
│  └───────────────┬───────────────────┘  │
└──────────────────┼──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│   Database (learning_platform.db)       │
│  - Projects                             │
│  - Users                                │
│  - Progress                             │
│  - Code Executions                      │
└─────────────────────────────────────────┘
```

---

## 🔄 Development Workflow

### Daily Startup

**Terminal 1 (Backend):**
```bash
cd learning-platform/backend
source venv/bin/activate
python run.py
```

**Terminal 2 (Frontend):**
```bash
cd learning-platform/frontend
npm run dev
```

**Browser:**
```
http://localhost:3000
```

### Making Changes

**Backend Changes:**
1. Edit Python files
2. Server auto-reloads (--reload flag)
3. Refresh browser

**Frontend Changes:**
1. Edit React/TypeScript files
2. Next.js auto-compiles
3. Browser auto-refreshes (Fast Refresh)

### Shutdown

**Stop Servers:**
```bash
# In each terminal:
Press Ctrl+C
```

**Deactivate Backend venv:**
```bash
deactivate
```

---

## 📚 Additional Resources

### Documentation
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

### Learning Materials
- [Python Tutorial](https://docs.python.org/3/tutorial/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [REST API Best Practices](https://restfulapi.net/)
- [React Tutorial](https://react.dev/learn)

---

## 🎓 Next Steps

Once the platform is running:

1. **Explore the Interface**
   - Navigate through all pages
   - Try all interactive features
   - Get familiar with the layout

2. **Create an Account** (when auth is implemented)
   - Sign up with email
   - Start tracking progress

3. **Start Project 1**
   - Go to http://localhost:3000/projects/1
   - Read the setup instructions
   - Follow the 6 steps
   - Build your first API!

4. **Use the Demo Page**
   - Learn from interactive examples
   - Understand the components
   - See what's possible

5. **Work Through All Projects**
   - Complete projects in order
   - Build real applications
   - Master the fundamentals

---

## ✅ Success Checklist

You've successfully set up the platform when:

- [ ] Both servers run without errors
- [ ] Home page displays with animations
- [ ] Can navigate to all pages
- [ ] Projects list loads
- [ ] Project details show setup instructions
- [ ] Can copy commands from setup instructions
- [ ] Demo page shows all interactive components
- [ ] API docs accessible at /api/docs
- [ ] No console errors in browser
- [ ] All animations work smoothly

---

## 🆘 Getting Help

If you encounter issues:

1. **Check This Guide** - Re-read relevant sections
2. **Check Console** - Browser console (F12) and terminal output
3. **Check Documentation** - See links in Additional Resources
4. **Reset Everything** - Delete venv, node_modules, and start fresh
5. **Check System** - Verify prerequisites are correctly installed

---

## 🎉 Congratulations!

You now have a fully functional Learning Platform running locally!

**What You Can Do:**
- ✅ Browse 5 interactive projects
- ✅ View detailed setup instructions
- ✅ Copy commands to build projects
- ✅ Learn from interactive demos
- ✅ Track your progress
- ✅ Use the code editor
- ✅ Execute code in the browser

**Happy Learning! 🚀**

---

*Last Updated: January 2026*
*Platform Version: 1.0.0*

