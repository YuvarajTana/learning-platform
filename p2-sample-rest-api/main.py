from fastapi import FastAPI
import uvicorn

# Create FastAPI application instance
app = FastAPI()

# REST API endpoints for managing items
# This demonstrates RESTful API design principles

@app.get("/")
def read_root():
    """
    Root endpoint - provides API information
    """
    return {
        "message": "Welcome to the REST API",
        "description": "This API demonstrates RESTful principles",
        "endpoints": {
            "GET /items": "List all items",
            "GET /items/{id}": "Get a specific item",
            "POST /items": "Create a new item",
            "PUT /items/{id}": "Update an item",
            "DELETE /items/{id}": "Delete an item"
        }
    }


@app.get("/items")
def read_items():
    """
    GET /items - Retrieve all items
    This demonstrates the GET method for listing resources
    """
    return {"items": ["item1", "item2", "item3"]}


@app.get("/items/{item_id}")
def read_item(item_id: int):
    """
    GET /items/{item_id} - Retrieve a specific item by ID
    This demonstrates path parameters in REST APIs
    """
    return {"item_id": item_id, "name": f"item{item_id}"}


@app.post("/items")
def create_item(item: dict):
    """
    POST /items - Create a new item
    This demonstrates the POST method for creating resources
    """
    return {"message": "Item created", "item": item}


@app.put("/items/{item_id}")
def update_item(item_id: int, item: dict):
    """
    PUT /items/{item_id} - Update an existing item
    This demonstrates the PUT method for updating resources
    """
    return {"message": "Item updated", "item_id": item_id, "item": item}


@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    """
    DELETE /items/{item_id} - Delete an item
    This demonstrates the DELETE method for removing resources
    """
    return {"message": "Item deleted", "item_id": item_id}


# Run the server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)





