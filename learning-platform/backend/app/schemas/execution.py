"""
Code Execution Schemas
"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class CodeExecutionRequest(BaseModel):
    """Schema for code execution request"""
    code: str = Field(..., description="Source code to execute", max_length=50000)
    language: str = Field(default="python", description="Programming language")
    stdin: Optional[str] = Field(None, description="Standard input for the program")
    project_id: Optional[int] = Field(None, description="Associated project ID")
    save_history: bool = Field(default=True, description="Whether to save execution in history")


class CodeExecutionResponse(BaseModel):
    """Schema for code execution response"""
    output: str = Field(description="Program output (stdout)")
    error: Optional[str] = Field(None, description="Error output (stderr)")
    execution_time: float = Field(description="Execution time in seconds")
    status: str = Field(description="Execution status: success, error, or timeout")
    exit_code: int = Field(description="Process exit code")
    
    class Config:
        from_attributes = True


class CodeExecutionHistory(BaseModel):
    """Schema for code execution history entry"""
    id: int
    user_id: int
    project_id: Optional[int]
    language: str
    code: str
    stdin: Optional[str]
    output: Optional[str]
    error: Optional[str]
    execution_time: float
    status: str
    exit_code: Optional[int]
    created_at: datetime
    
    class Config:
        from_attributes = True


class SupportedLanguage(BaseModel):
    """Schema for supported language info"""
    name: str
    display_name: str
    extension: str
    version: Optional[str] = None

