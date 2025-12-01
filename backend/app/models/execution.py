"""
Code Execution Models
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime


class CodeExecution(Base):
    """Model for storing code execution history"""
    __tablename__ = "code_executions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)
    
    # Code details
    language = Column(String, nullable=False, default="python")
    code = Column(Text, nullable=False)
    stdin = Column(Text, nullable=True)
    
    # Execution results
    output = Column(Text, nullable=True)
    error = Column(Text, nullable=True)
    execution_time = Column(Float, nullable=False)  # seconds
    status = Column(String, nullable=False)  # success, error, timeout
    exit_code = Column(Integer, nullable=True)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="code_executions")
    project = relationship("Project")


# Add relationship to User model
from app.models.user import User
User.code_executions = relationship("CodeExecution", back_populates="user", cascade="all, delete-orphan")

