from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings"""
    
    # App
    APP_NAME: str = "Learning Platform"
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str = "sqlite:///./learning_platform.db"
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://127.0.0.1:3000",
    ]
    
    # Code Execution
    DOCKER_IMAGE: str = "python:3.11-slim"
    CODE_EXECUTION_TIMEOUT: int = 30
    
    # Redis (optional)
    REDIS_URL: str = "redis://localhost:6379"
    USE_REDIS: bool = False
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

