from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.project import Project
from app.models.user import User
from app.schemas.project import ProjectResponse, ProjectList
from app.api.v1.auth import get_current_user

router = APIRouter()


@router.get("/", response_model=ProjectList)
def list_projects(
    phase: Optional[str] = None,
    difficulty: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """List all projects with optional filters"""
    query = db.query(Project)
    
    if phase:
        query = query.filter(Project.phase == phase)
    if difficulty:
        query = query.filter(Project.difficulty == difficulty)
    
    total = query.count()
    projects = query.order_by(Project.project_number).offset(skip).limit(limit).all()
    
    return ProjectList(projects=projects, total=total)


@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db)):
    """Get a specific project by ID"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    return project


@router.get("/number/{project_number}", response_model=ProjectResponse)
def get_project_by_number(project_number: int, db: Session = Depends(get_db)):
    """Get a project by project number"""
    project = db.query(Project).filter(Project.project_number == project_number).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    return project

