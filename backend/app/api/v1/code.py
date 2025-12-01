from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.api.v1.auth import get_current_user
from app.models.user import User
from app.models.execution import CodeExecution
from app.schemas.execution import (
    CodeExecutionRequest,
    CodeExecutionResponse,
    CodeExecutionHistory,
    SupportedLanguage
)
from app.core.database import get_db
from app.services.code_executor import get_code_executor

router = APIRouter()


@router.post("/execute", response_model=CodeExecutionResponse)
async def execute_code(
    request: CodeExecutionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Execute code in a sandboxed environment
    
    Supports Python, JavaScript, and TypeScript
    Code is executed in an isolated environment with resource limits
    """
    # Get executor instance (use_docker=False for development without Docker)
    executor = get_code_executor(use_docker=False)
    
    # Execute code
    result = await executor.execute_code(
        code=request.code,
        language=request.language,
        stdin=request.stdin
    )
    
    # Save to history if requested
    if request.save_history:
        try:
            execution = CodeExecution(
                user_id=current_user.id,
                project_id=request.project_id,
                language=request.language,
                code=request.code,
                stdin=request.stdin,
                output=result["output"],
                error=result.get("error"),
                execution_time=result["execution_time"],
                status=result["status"],
                exit_code=result["exit_code"]
            )
            db.add(execution)
            db.commit()
        except Exception as e:
            # Don't fail execution if history save fails
            print(f"Failed to save execution history: {e}")
            db.rollback()
    
    return CodeExecutionResponse(**result)


@router.get("/history", response_model=List[CodeExecutionHistory])
def get_execution_history(
    project_id: int = None,
    limit: int = 50,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get user's code execution history
    
    Optionally filter by project_id
    """
    query = db.query(CodeExecution).filter(CodeExecution.user_id == current_user.id)
    
    if project_id:
        query = query.filter(CodeExecution.project_id == project_id)
    
    executions = query.order_by(CodeExecution.created_at.desc()).limit(limit).all()
    return executions


@router.get("/history/{execution_id}", response_model=CodeExecutionHistory)
def get_execution_by_id(
    execution_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific execution by ID"""
    execution = db.query(CodeExecution).filter(
        CodeExecution.id == execution_id,
        CodeExecution.user_id == current_user.id
    ).first()
    
    if not execution:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Execution not found"
        )
    
    return execution


@router.delete("/history/{execution_id}")
def delete_execution(
    execution_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete an execution from history"""
    execution = db.query(CodeExecution).filter(
        CodeExecution.id == execution_id,
        CodeExecution.user_id == current_user.id
    ).first()
    
    if not execution:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Execution not found"
        )
    
    db.delete(execution)
    db.commit()
    
    return {"message": "Execution deleted successfully"}


@router.get("/languages", response_model=List[SupportedLanguage])
def get_supported_languages():
    """Get list of supported programming languages"""
    executor = get_code_executor(use_docker=False)
    languages = executor.get_supported_languages()
    
    language_info = {
        "python": {"display_name": "Python", "extension": ".py", "version": "3.11"},
        "javascript": {"display_name": "JavaScript", "extension": ".js", "version": "ES2022"},
        "typescript": {"display_name": "TypeScript", "extension": ".ts", "version": "5.0"},
    }
    
    return [
        SupportedLanguage(
            name=lang,
            display_name=language_info[lang]["display_name"],
            extension=language_info[lang]["extension"],
            version=language_info[lang].get("version")
        )
        for lang in languages
    ]

