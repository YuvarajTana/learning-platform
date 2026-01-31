export const project5CodeAnnotations = {
  code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, conint

app = FastAPI()

class Item(BaseModel):
    name: str = Field(..., min_length=1)
    price: conint(gt=0)

@app.post("/items")
def create_item(item: Item):
    return item

@app.get("/items/{item_id}")
def read_item(item_id: int):
    if item_id < 1:
        raise HTTPException(status_code=400, detail="Invalid ID")
    return {"item_id": item_id}`,
  
  annotations: [
    { line: 1, label: 'Import Validation Tools', explanation: 'Imports Pydantic models and validation utilities.' },
    { line: 2, label: 'Pydantic Import', explanation: 'Import BaseModel, Field, and conint for data validation and type constraints.' },
    { line: 4, label: 'FastAPI App', explanation: 'Initializes the FastAPI application.' },
    { line: 6, label: 'Pydantic Model', explanation: 'Defines request validation schema.' },
    { line: 7, label: 'Field Validation', explanation: 'Ensures the name field is not empty.' },
    { line: 8, label: 'Integer Constraint', explanation: 'Ensures price is a positive integer.' },
    { line: 10, label: 'POST Endpoint', explanation: 'Creates a new item with validated input.' },
    { line: 11, label: 'Create Item Function', explanation: 'Define function to handle item creation with validated Item parameter.' },
    { line: 12, label: 'Return Item', explanation: 'Return the validated item to the client.' },
    { line: 14, label: 'GET Endpoint', explanation: 'Define GET endpoint to retrieve an item by its ID.' },
    { line: 15, label: 'Read Item Function', explanation: 'Define function to handle item retrieval by ID.' },
    { line: 16, label: 'Validate Item ID', explanation: 'Check if the item ID is valid (greater than 0).' },
    { line: 17, label: 'Error Handling', explanation: 'Raises a 400 error if item_id is invalid.' },
    { line: 18, label: 'Return Item ID', explanation: 'Return the item ID in JSON format.' }
  ]
}
