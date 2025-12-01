"""
Database Migration: Add Performance Indexes
Optimizes queries on frequently filtered columns
"""

# This file documents the indexes that should be created
# In a production environment, use Alembic for migrations

SQL_INDEXES = """
-- Index for project filtering by phase
CREATE INDEX IF NOT EXISTS idx_project_phase ON projects(phase);

-- Index for project filtering by difficulty
CREATE INDEX IF NOT EXISTS idx_project_difficulty ON projects(difficulty);

-- Index for project lookup by project_number
CREATE INDEX IF NOT EXISTS idx_project_number ON projects(project_number);

-- Index for user progress queries
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON user_progress(user_id);

-- Composite index for user + project progress lookup
CREATE INDEX IF NOT EXISTS idx_progress_user_project ON user_progress(user_id, project_id);

-- Index for user lookups by email
CREATE INDEX IF NOT EXISTS idx_user_email ON users(email);

-- Index for user lookups by username
CREATE INDEX IF NOT EXISTS idx_user_username ON users(username);

-- Index for code execution history queries
CREATE INDEX IF NOT EXISTS idx_execution_user_id ON code_execution(user_id);

-- Index for execution history filtering by project
CREATE INDEX IF NOT EXISTS idx_execution_project_id ON code_execution(project_id);
"""

def create_indexes():
    """
    Create performance indexes on database tables
    Call this during initialization or use Alembic migration
    """
    from app.core.database import engine
    from sqlalchemy import text
    
    with engine.connect() as conn:
        # Skip for SQLite (not typically indexed same way)
        if "sqlite" not in str(engine.url):
            statements = [s.strip() for s in SQL_INDEXES.split(";") if s.strip()]
            for stmt in statements:
                try:
                    conn.execute(text(stmt))
                    conn.commit()
                    print(f"Created index: {stmt.split('CREATE INDEX')[1].split('ON')[0].strip()}")
                except Exception as e:
                    print(f"Index creation skipped (may already exist): {e}")

if __name__ == "__main__":
    print("Creating database indexes for performance optimization...")
    create_indexes()
    print("Done!")
