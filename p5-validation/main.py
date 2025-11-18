from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, EmailStr, Field, validator, conint, constr
from typing import Optional
from datetime import datetime
from enum import Enum
import uvicorn

# FastAPI app
app = FastAPI(title="Validation & Error Handling API", version="1.0.0")


# Enums for validation
class ItemCategory(str, Enum):
    """Valid item categories"""
    ELECTRONICS = "electronics"
    CLOTHING = "clothing"
    BOOKS = "books"
    FOOD = "food"
    OTHER = "other"


# Pydantic models with validation

class ItemCreate(BaseModel):
    """Schema for creating an item with validation"""
    name: constr(min_length=1, max_length=100) = Field(
        ...,
        description="Item name (1-100 characters)",
        example="Laptop"
    )
    description: Optional[constr(max_length=500)] = Field(
        None,
        description="Item description (max 500 characters)",
        example="Gaming laptop with RTX 4090"
    )
    price: conint(gt=0, le=1000000) = Field(
        ...,
        description="Item price (must be positive, max 1,000,000)",
        example=1299
    )
    category: ItemCategory = Field(
        ...,
        description="Item category",
        example=ItemCategory.ELECTRONICS
    )
    email: Optional[EmailStr] = Field(
        None,
        description="Contact email for this item",
        example="seller@example.com"
    )

    @validator('name')
    def name_must_not_be_empty(cls, v):
        """Custom validator for name"""
        if not v or not v.strip():
            raise ValueError('Name cannot be empty or whitespace')
        return v.strip()

    @validator('price')
    def price_must_be_reasonable(cls, v):
        """Custom validator for price"""
        if v < 0:
            raise ValueError('Price cannot be negative')
        if v > 1000000:
            raise ValueError('Price seems unreasonably high')
        return v

    class Config:
        schema_extra = {
            "example": {
                "name": "Gaming Laptop",
                "description": "High-performance gaming laptop",
                "price": 1299,
                "category": "electronics",
                "email": "seller@example.com"
            }
        }


class ItemResponse(BaseModel):
    """Schema for item response"""
    id: int
    name: str
    description: Optional[str]
    price: int
    category: ItemCategory
    email: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class ErrorResponse(BaseModel):
    """Standard error response format"""
    error: str
    detail: str
    status_code: int
    timestamp: datetime = Field(default_factory=datetime.utcnow)


# In-memory storage (for demonstration)
items_db = []
next_id = 1


# API Endpoints

@app.get("/")
def read_root():
    """Root endpoint with API information"""
    return {
        "message": "Validation & Error Handling API",
        "description": "This API demonstrates input validation and error handling",
        "endpoints": {
            "POST /items": "Create an item (with validation)",
            "GET /items": "List all items",
            "GET /items/{id}": "Get a specific item",
            "PUT /items/{id}": "Update an item",
            "DELETE /items/{id}": "Delete an item"
        },
        "validation_features": [
            "Field type validation",
            "String length constraints",
            "Number range validation",
            "Email format validation",
            "Enum validation",
            "Custom validators",
            "Proper error messages"
        ]
    }


@app.post("/items", response_model=ItemResponse, status_code=status.HTTP_201_CREATED)
def create_item(item: ItemCreate):
    """
    POST /items - Create a new item with validation
    
    This endpoint demonstrates:
    - Automatic validation of input data
    - Type checking
    - Constraint validation
    - Custom validators
    - Proper error responses
    """
    global next_id
    
    # Create item (validation already done by Pydantic)
    new_item = {
        "id": next_id,
        **item.dict(),
        "created_at": datetime.utcnow()
    }
    items_db.append(new_item)
    next_id += 1
    
    return new_item


@app.get("/items", response_model=list[ItemResponse])
def read_items(skip: int = 0, limit: int = 100):
    """
    GET /items - List all items with pagination
    
    Query parameters are automatically validated:
    - skip: must be >= 0
    - limit: must be between 1 and 100
    """
    if skip < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="skip parameter must be >= 0"
        )
    if limit < 1 or limit > 100:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="limit parameter must be between 1 and 100"
        )
    
    return items_db[skip:skip + limit]


@app.get("/items/{item_id}", response_model=ItemResponse)
def read_item(item_id: int):
    """
    GET /items/{item_id} - Get a specific item by ID
    
    Demonstrates proper error handling with 404 status code
    """
    if item_id < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Item ID must be a positive integer"
        )
    
    item = next((item for item in items_db if item["id"] == item_id), None)
    if item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with ID {item_id} not found"
        )
    return item


@app.put("/items/{item_id}", response_model=ItemResponse)
def update_item(item_id: int, item: ItemCreate):
    """
    PUT /items/{item_id} - Update an existing item
    
    Demonstrates validation on update operations
    """
    if item_id < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Item ID must be a positive integer"
        )
    
    existing_item = next((item for item in items_db if item["id"] == item_id), None)
    if existing_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with ID {item_id} not found"
        )
    
    # Update item (validation already done by Pydantic)
    existing_item.update(item.dict())
    return existing_item


@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(item_id: int):
    """
    DELETE /items/{item_id} - Delete an item
    
    Returns 204 No Content on success, 404 if not found
    """
    if item_id < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Item ID must be a positive integer"
        )
    
    global items_db
    item_index = next((i for i, item in enumerate(items_db) if item["id"] == item_id), None)
    if item_index is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with ID {item_id} not found"
        )
    
    items_db.pop(item_index)
    return None


# Exception handlers for custom error responses

@app.exception_handler(ValueError)
async def value_error_handler(request, exc):
    """Handle ValueError exceptions"""
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail=str(exc)
    )


# Run the server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

