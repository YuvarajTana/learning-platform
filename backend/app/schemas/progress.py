from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models.progress import ProgressStatus


class ProgressCreate(BaseModel):
    """Schema for creating progress"""
    project_id: int


class ProgressUpdate(BaseModel):
    """Schema for updating progress"""
    status: Optional[ProgressStatus] = None
    completion_percentage: Optional[float] = None
    time_spent: Optional[int] = None


class ProgressResponse(BaseModel):
    """Schema for progress response"""
    id: int
    user_id: int
    project_id: int
    status: str
    completion_percentage: float
    time_spent: int
    last_accessed: datetime
    completed_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

