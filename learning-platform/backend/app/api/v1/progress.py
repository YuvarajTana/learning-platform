from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.progress import UserProgress, ProgressStatus
from app.models.user import User
from app.schemas.progress import ProgressResponse, ProgressUpdate
from app.api.v1.auth import get_current_user

router = APIRouter()


@router.get("/", response_model=List[ProgressResponse])
def get_user_progress(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all progress for current user"""
    progress_list = db.query(UserProgress).filter(
        UserProgress.user_id == current_user.id
    ).all()
    return progress_list


@router.get("/{project_id}", response_model=ProgressResponse)
def get_project_progress(
    project_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get progress for a specific project"""
    progress = db.query(UserProgress).filter(
        UserProgress.user_id == current_user.id,
        UserProgress.project_id == project_id
    ).first()
    
    if not progress:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Progress not found"
        )
    return progress


@router.post("/", response_model=ProgressResponse, status_code=status.HTTP_201_CREATED)
def create_progress(
    project_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create or update progress for a project"""
    # Check if progress already exists
    progress = db.query(UserProgress).filter(
        UserProgress.user_id == current_user.id,
        UserProgress.project_id == project_id
    ).first()
    
    if progress:
        # Update last accessed
        from datetime import datetime
        progress.last_accessed = datetime.utcnow()
        db.commit()
        db.refresh(progress)
        return progress
    
    # Create new progress
    progress = UserProgress(
        user_id=current_user.id,
        project_id=project_id,
        status=ProgressStatus.IN_PROGRESS.value
    )
    db.add(progress)
    db.commit()
    db.refresh(progress)
    return progress


@router.put("/{project_id}", response_model=ProgressResponse)
def update_progress(
    project_id: int,
    progress_update: ProgressUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update progress for a project"""
    progress = db.query(UserProgress).filter(
        UserProgress.user_id == current_user.id,
        UserProgress.project_id == project_id
    ).first()
    
    if not progress:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Progress not found"
        )
    
    # Update fields
    if progress_update.status:
        progress.status = progress_update.status.value
    if progress_update.completion_percentage is not None:
        progress.completion_percentage = progress_update.completion_percentage
    if progress_update.time_spent is not None:
        progress.time_spent = progress_update.time_spent
    
    # Update completed_at if status is completed
    if progress_update.status == ProgressStatus.COMPLETED:
        from datetime import datetime
        progress.completed_at = datetime.utcnow()
    
    db.commit()
    db.refresh(progress)
    return progress

