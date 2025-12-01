"""
Seed script to populate initial projects
Run this after setting up the database
"""
from app.core.database import SessionLocal, init_db
from app.models.project import Project, ProjectPhase, ProjectDifficulty

# Initialize database
init_db()

# Create session
db = SessionLocal()

# Project data
projects_data = [
    {
        "project_number": 1,
        "title": "Simple FastAPI Server",
        "description": "Learn HTTP server basics with your first FastAPI application",
        "concept": "HTTP Server Basics",
        "phase": ProjectPhase.FOUNDATIONS,
        "difficulty": ProjectDifficulty.BEGINNER,
        "estimated_time": 30,
        "prerequisites": None
    },
    {
        "project_number": 2,
        "title": "REST API Basics",
        "description": "Build RESTful APIs with HTTP methods (GET, POST, PUT, DELETE)",
        "concept": "RESTful API Design",
        "phase": ProjectPhase.FOUNDATIONS,
        "difficulty": ProjectDifficulty.BEGINNER,
        "estimated_time": 60,
        "prerequisites": "[1]"
    },
    {
        "project_number": 3,
        "title": "Database Integration",
        "description": "Integrate databases with SQLAlchemy ORM and perform CRUD operations",
        "concept": "Database CRUD Operations",
        "phase": ProjectPhase.FOUNDATIONS,
        "difficulty": ProjectDifficulty.INTERMEDIATE,
        "estimated_time": 120,
        "prerequisites": "[2]"
    },
    {
        "project_number": 4,
        "title": "Authentication & Authorization",
        "description": "Implement user authentication with JWT tokens and password hashing",
        "concept": "User Security",
        "phase": ProjectPhase.FOUNDATIONS,
        "difficulty": ProjectDifficulty.INTERMEDIATE,
        "estimated_time": 180,
        "prerequisites": "[3]"
    },
    {
        "project_number": 5,
        "title": "Data Validation & Error Handling",
        "description": "Validate user input and handle errors gracefully with proper status codes",
        "concept": "Input Validation & Error Management",
        "phase": ProjectPhase.FOUNDATIONS,
        "difficulty": ProjectDifficulty.INTERMEDIATE,
        "estimated_time": 120,
        "prerequisites": "[4]"
    },
]

# Insert projects
for project_data in projects_data:
    # Check if project already exists
    existing = db.query(Project).filter(
        Project.project_number == project_data["project_number"]
    ).first()
    
    if not existing:
        project = Project(**project_data)
        db.add(project)
        print(f"Added project: {project.title}")

db.commit()
print(f"\n✅ Seeded {len(projects_data)} projects successfully!")
db.close()

