from sqlalchemy import Column, Integer, String, Text, DateTime, Enum as SQLEnum
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime
import enum


class ProjectPhase(str, enum.Enum):
    """Project phases"""
    FOUNDATIONS = "foundations"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"
    AI_ML = "ai_ml"
    CAPSTONE = "capstone"


class ProjectDifficulty(str, enum.Enum):
    """Project difficulty levels"""
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"
    EXPERT = "expert"


class Project(Base):
    """Project model"""
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    project_number = Column(Integer, unique=True, nullable=False, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    concept = Column(String, nullable=False)
    phase = Column(SQLEnum(ProjectPhase), nullable=False)
    difficulty = Column(SQLEnum(ProjectDifficulty), nullable=False)
    estimated_time = Column(Integer, nullable=True)  # in minutes
    prerequisites = Column(String, nullable=True)  # JSON array of project IDs
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    progress = relationship("UserProgress", back_populates="project", cascade="all, delete-orphan")

