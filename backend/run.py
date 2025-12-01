"""
Development server runner
"""
import uvicorn
from app.main import app
from app.core.database import init_db
from sqlalchemy.exc import OperationalError

# helper to create DB if missing
from app.scripts.create_database import ensure_database_exists

if __name__ == "__main__":
    # Initialize database; if the database does not exist, attempt to create it
    try:
        init_db()
    except OperationalError as e:
        msg = str(e).lower()
        if 'does not exist' in msg or 'database' in msg:
            print('Target database not found; attempting to create it...')
            ensure_database_exists()
            # Try again
            init_db()
        else:
            raise
    
    # Run server
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )

