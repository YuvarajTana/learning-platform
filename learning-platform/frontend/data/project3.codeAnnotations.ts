export const project3CodeAnnotations = {
  code: `from fastapi import FastAPI, HTTPException, Depends
import uvicorn
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, index=True)

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/items")
def read_items():
    db = SessionLocal()
    try:
        items = db.query(Item).all()
        return {"items": items}
    finally:
        db.close()

@app.post("/items")
def create_item(name: str, description: str):
    db = SessionLocal()
    try:
        db_item = Item(name=name, description=description)
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        return {"message": "Item created", "item": db_item}
    finally:
        db.close()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)`,

  annotations: [
    { line: 1, label: 'Import FastAPI', explanation: 'Import FastAPI framework for building APIs' },
    { line: 2, label: 'Import Uvicorn', explanation: 'Import uvicorn ASGI server to run the application' },
    { line: 3, label: 'SQLAlchemy Core Imports', explanation: 'Import SQLAlchemy core components for database operations' },
    { line: 4, label: 'SQLAlchemy Declarative', explanation: 'Import declarative base for ORM model definitions' },
    { line: 5, label: 'SQLAlchemy Session', explanation: 'Import sessionmaker for database session management' },
    { line: 7, label: 'Database URL', explanation: 'Define SQLite database URL for file-based storage' },
    { line: 8, label: 'Create Engine', explanation: 'Create SQLAlchemy engine instance to connect to database' },
    { line: 9, label: 'Session Factory', explanation: 'Create session factory with proper transaction settings' },
    { line: 10, label: 'Declarative Base', explanation: 'Create base class for declarative ORM models' },
    { line: 12, label: 'Model Class', explanation: 'Define Item model class inheriting from Base' },
    { line: 13, label: 'Table Name', explanation: 'Specify database table name for this model' },
    { line: 14, label: 'ID Column', explanation: 'Define primary key column with auto-increment and index' },
    { line: 15, label: 'Name Column', explanation: 'Define name column with string type and index' },
    { line: 16, label: 'Description Column', explanation: 'Define description column with string type and index' },
    { line: 18, label: 'Create Tables', explanation: 'Create all database tables based on defined models' },
    { line: 20, label: 'Create App', explanation: 'Create FastAPI application instance' },
    { line: 22, label: 'GET Items Endpoint', explanation: 'Define GET endpoint to retrieve all items' },
    { line: 23, label: 'Read Items Function', explanation: 'Function to handle GET requests for items' },
    { line: 24, label: 'Get DB Session', explanation: 'Create database session from session factory' },
    { line: 25, label: 'Try Block', explanation: 'Begin exception handling block for database operations' },
    { line: 26, label: 'Query Items', explanation: 'Query all Item records from database' },
    { line: 27, label: 'Return Items', explanation: 'Return items as JSON response' },
    { line: 28, label: 'Finally Block', explanation: 'Ensure cleanup code executes regardless of exceptions' },
    { line: 29, label: 'Close Session', explanation: 'Close database session to free resources' },
    { line: 31, label: 'POST Items Endpoint', explanation: 'Define POST endpoint to create new items' },
    { line: 32, label: 'Create Item Function', explanation: 'Function to handle POST requests with item data' },
    { line: 33, label: 'Get DB Session', explanation: 'Create database session for writing data' },
    { line: 34, label: 'Try Block', explanation: 'Begin exception handling for database write operations' },
    { line: 35, label: 'Create DB Item', explanation: 'Create new Item instance with provided parameters' },
    { line: 36, label: 'Add to Session', explanation: 'Add new item to database session for staging' },
    { line: 37, label: 'Commit Transaction', explanation: 'Commit transaction to persist changes to database' },
    { line: 38, label: 'Refresh Item', explanation: 'Refresh item to get database-generated values' },
    { line: 39, label: 'Return Success', explanation: 'Return success message with created item data' },
    { line: 40, label: 'Finally Block', explanation: 'Ensure cleanup executes after transaction' },
    { line: 41, label: 'Close Session', explanation: 'Close database session after transaction completion' },
    { line: 43, label: 'Main Guard', explanation: 'Python idiom to run code only when script executed directly' },
    { line: 44, label: 'Run Server', explanation: 'Start uvicorn server on port 8000 with hot reload' }
  ]
}