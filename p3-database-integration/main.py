from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime
from pydantic import BaseModel
import uvicorn

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./items.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Database Model
class Item(Base):
    """
    SQLAlchemy model representing an Item in the database.
    This maps to the 'items' table.
    """
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)


# Create tables
Base.metadata.create_all(bind=engine)


# Pydantic models for request/response
class ItemCreate(BaseModel):
    """Schema for creating a new item"""
    name: str
    description: str | None = None


class ItemResponse(BaseModel):
    """Schema for item response"""
    id: int
    name: str
    description: str | None
    created_at: datetime

    class Config:
        from_attributes = True


# FastAPI app
app = FastAPI(title="Database Integration API", version="1.0.0")


# Dependency to get database session
def get_db():
    """
    Dependency function that provides a database session.
    Ensures the session is properly closed after use.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# API Endpoints

@app.get("/")
def read_root():
    """Root endpoint with API information"""
    return {
        "message": "Database Integration API",
        "description": "This API demonstrates database CRUD operations",
        "endpoints": {
            "GET /items": "List all items",
            "GET /items/{id}": "Get a specific item",
            "POST /items": "Create a new item",
            "PUT /items/{id}": "Update an item",
            "DELETE /items/{id}": "Delete an item"
        }
    }


@app.get("/items", response_model=list[ItemResponse])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    GET /items - Retrieve all items from database
    Supports pagination with skip and limit parameters
    """
    items = db.query(Item).offset(skip).limit(limit).all()
    return items


@app.get("/items/{item_id}", response_model=ItemResponse)
def read_item(item_id: int, db: Session = Depends(get_db)):
    """
    GET /items/{item_id} - Retrieve a specific item by ID
    Returns 404 if item not found
    """
    item = db.query(Item).filter(Item.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.post("/items", response_model=ItemResponse, status_code=201)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    """
    POST /items - Create a new item in the database
    Returns the created item with generated ID
    """
    db_item = Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@app.put("/items/{item_id}", response_model=ItemResponse)
def update_item(item_id: int, item: ItemCreate, db: Session = Depends(get_db)):
    """
    PUT /items/{item_id} - Update an existing item
    Returns 404 if item not found
    """
    db_item = db.query(Item).filter(Item.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    # Update fields
    db_item.name = item.name
    db_item.description = item.description
    db.commit()
    db.refresh(db_item)
    return db_item


@app.delete("/items/{item_id}", status_code=204)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    """
    DELETE /items/{item_id} - Delete an item from database
    Returns 404 if item not found, 204 (No Content) on success
    """
    db_item = db.query(Item).filter(Item.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    db.delete(db_item)
    db.commit()
    return None


# Run the server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

