from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1 import auth, projects, progress, code

# Create FastAPI app
app = FastAPI(
    title="Learning Platform API",
    description="Interactive learning platform API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001", 
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3004",
        "http://localhost:3005",
        "http://localhost:3006",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3002",
        "http://127.0.0.1:3003",
        "http://127.0.0.1:3004",
        "http://127.0.0.1:3005",
        "http://127.0.0.1:3006",
        "http://localhost:8000",  # Allow same origin for API docs
        "http://127.0.0.1:8001",  # Allow same origin for API docs
    ],
    allow_credentials=True,  # Enable credentials for auth headers
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["authentication"])
app.include_router(projects.router, prefix="/api/v1/projects", tags=["projects"])
app.include_router(progress.router, prefix="/api/v1/progress", tags=["progress"])
app.include_router(code.router, prefix="/api/v1/code", tags=["code"])


@app.get("/")
def read_root():
    """Root endpoint"""
    return {
        "message": "Learning Platform API",
        "version": "1.0.0",
        "docs": "/api/docs"
    }


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

