from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from app.models.project import ProjectPhase, ProjectDifficulty


class ProjectResponse(BaseModel):
    """Schema for project response"""
    id: int
    project_number: int
    title: str
    description: Optional[str]
    concept: str
    phase: ProjectPhase
    difficulty: ProjectDifficulty
    estimated_time: Optional[int]
    prerequisites: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class ProjectList(BaseModel):
    """Schema for project list response"""
    projects: List[ProjectResponse]
    total: int

