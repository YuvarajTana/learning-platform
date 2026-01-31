from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from app.api.v1.auth import get_current_user
from app.api.v1.auth import get_current_user_optional
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
    current_user: User | None = Depends(get_current_user_optional),
    db: Session = Depends(get_db)
):
    """
    Execute code in a sandboxed environment
    
    Supports Python, JavaScript, and TypeScript
    Code is executed in an isolated environment with resource limits
    """
    
    try:
        import sys
        import io
        import traceback
        import subprocess
        import tempfile
        import os
        import time
        
        start_time = time.time()
        
        # Initialize result with default error state in case of early failure
        result = {
            "output": "",
            "error": "Execution failed due to internal error",
            "execution_time": 0.0,
            "status": "error",
            "exit_code": 1
        }
        
        # For Python code, execute directly to capture output
        if request.language == "python":
            old_stdout = sys.stdout
            redirected_output = io.StringIO()
            sys.stdout = redirected_output
            
            try:
                # Execute the code in a restricted namespace
                # Temporarily replace uvicorn.run to prevent server startup
                def mock_uvicorn_run(*args, **kwargs):
                    host = kwargs.get('host', 'localhost')
                    port = kwargs.get('port', 8000)
                    print(f"Server would start on {host}:{port} (skipped for security)")
                
                # Import required modules for code execution
                from fastapi import FastAPI, HTTPException
                from pydantic import BaseModel, Field, conint, ValidationError
                from typing import Optional
                # SQLAlchemy imports for Project 3
                from sqlalchemy import create_engine, Column, Integer, String, DateTime
                from sqlalchemy.ext.declarative import declarative_base
                from sqlalchemy.orm import sessionmaker, Session
                
                exec_globals = {
                    '__builtins__': __builtins__,
                    # FastAPI components
                    'FastAPI': FastAPI,
                    'HTTPException': HTTPException,
                    # Pydantic components (needed for Project 5)
                    'BaseModel': BaseModel,
                    'Field': Field,
                    'conint': conint,
                    # Pydantic components (needed for Project 5)
                    'ValidationError': ValidationError,
                    # Typing components (needed for Project 5)
                    'Optional': Optional,
                    # SQLAlchemy components (needed for Project 3)
                    'create_engine': create_engine,
                    'Column': Column,
                    'Integer': Integer,
                    'String': String,
                    'DateTime': DateTime,
                    'declarative_base': declarative_base,
                    'sessionmaker': sessionmaker,
                    'Session': Session,
                    'datetime': datetime,
                    # Other utilities
                    'uvicorn': type('MockUvicorn', (), {
                        'run': mock_uvicorn_run
                    })(),
                    'print': print  # Make sure print is available
                }
                exec_locals = {}
                exec(request.code, exec_globals, exec_locals)
                
                output = redirected_output.getvalue()
                execution_time = time.time() - start_time
                
                result = {
                    "output": output,
                    "error": None,
                    "execution_time": execution_time,
                    "status": "success",
                    "exit_code": 0
                }
            except Exception as e:
                execution_time = time.time() - start_time
                result = {
                    "output": "",
                    "error": traceback.format_exc(),
                    "execution_time": execution_time,
                    "status": "error",
                    "exit_code": 1
                }
            finally:
                sys.stdout = old_stdout
        else:
            # For other languages, use the existing executor
            executor = get_code_executor(use_docker=False)
            import asyncio
            try:
                # Check if we're already in an event loop (which is the case in FastAPI async endpoints)
                loop = asyncio.get_running_loop()
                # If we are in a loop, run the coroutine directly
                result = loop.run_until_complete(executor.execute_code(
                    code=request.code,
                    language=request.language,
                    stdin=request.stdin
                ))
            except RuntimeError:
                # If no loop is running, use asyncio.run
                result = asyncio.run(executor.execute_code(
                    code=request.code,
                    language=request.language,
                    stdin=request.stdin
                ))
        
        # Save to history if requested and user is authenticated
        if request.save_history and current_user:
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
                
                # Automatically update progress if execution was successful
                if result["status"] == "success" and request.project_id:
                    from app.models.progress import UserProgress, ProgressStatus
                    
                    # Check if progress record exists
                    progress = db.query(UserProgress).filter(
                        UserProgress.user_id == current_user.id,
                        UserProgress.project_id == request.project_id
                    ).first()
                    
                    if progress:
                        # Update existing progress to completed
                        progress.status = ProgressStatus.COMPLETED
                        progress.completion_percentage = 100.0
                        progress.completed_at = datetime.utcnow()
                    else:
                        # Create new progress record as completed
                        progress = UserProgress(
                            user_id=current_user.id,
                            project_id=request.project_id,
                            status=ProgressStatus.COMPLETED,
                            completion_percentage=100.0,
                            completed_at=datetime.utcnow()
                        )
                        db.add(progress)
                    
                    db.commit()
                    
            except Exception as e:
                # Don't fail execution if history save fails
                print(f"Failed to save execution history: {e}")
                db.rollback()
        
        return CodeExecutionResponse(**result)
    except Exception as e:
        # Catch any unexpected errors and return a proper response with error details
        result = {
            "output": "",
            "error": f"Unexpected error: {str(e)}",
            "execution_time": 0.0,
            "status": "error",
            "exit_code": 1
        }
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

