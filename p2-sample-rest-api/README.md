# Project 2: REST API Basics

**Concept**: RESTful API Design  
**Difficulty**: ⭐ Beginner  
**Time**: 1 hour  
**Status**: ✅ Completed

## Learning Objectives

- Understand REST principles
- Learn HTTP methods (GET, POST, PUT, DELETE)
- Design resource-based URLs
- Handle different request types

## What You'll Learn

This project teaches you RESTful API design principles. You'll learn:
- How to design resource-based URLs
- When to use different HTTP methods
- How to structure API endpoints
- The principles of REST architecture

## Real-World Applications

- **Twitter API**: GET tweets, POST new tweets, DELETE tweets
- **Stripe API**: GET customers, POST payments, PUT updates
- **GitHub API**: GET repositories, POST issues, PUT files
- **Shopify API**: GET products, POST orders, PUT inventory

## Industry Example

**How Stripe uses REST APIs:**
```
GET  /api/v1/customers          → List all customers
POST /api/v1/customers          → Create new customer
GET  /api/v1/customers/{id}     → Get specific customer
PUT  /api/v1/customers/{id}     → Update customer
POST /api/v1/payments           → Process payment
GET  /api/v1/payments/{id}      → Check payment status
```

**Why REST matters:**
- Standardized approach across all APIs
- Easy for developers to understand
- Works with any programming language
- Scales to millions of requests

## Project Structure

```
p2-sample-rest-api/
├── main.py              # FastAPI REST API application
├── requirements.txt     # Dependencies
└── README.md           # This file
```

## Setup Instructions

1. **Create and activate virtual environment** (recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the server**:
   ```bash
   python main.py
   ```

4. **Test the API**:
   - Interactive docs: `http://localhost:8000/docs`
   - Root endpoint: `http://localhost:8000`

## Available Endpoints

### GET /items
List all items
```bash
curl http://localhost:8000/items
```

### GET /items/{item_id}
Get a specific item by ID
```bash
curl http://localhost:8000/items/1
```

### POST /items
Create a new item
```bash
curl -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "New Item", "description": "A new item"}'
```

### PUT /items/{item_id}
Update an existing item
```bash
curl -X PUT http://localhost:8000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Item", "description": "Updated description"}'
```

### DELETE /items/{item_id}
Delete an item
```bash
curl -X DELETE http://localhost:8000/items/1
```

## REST Principles

### 1. Resources
Everything is exposed as resources with predictable URLs:
- `/items` - Collection of items
- `/items/1` - Specific item with ID 1

### 2. HTTP Verbs
Standard verbs map to operations:
- **GET**: Retrieve data (read)
- **POST**: Create new resources
- **PUT**: Update existing resources
- **DELETE**: Remove resources

### 3. Statelessness
Each request carries all information the server needs. The server doesn't store session state between calls.

### 4. Structured Responses
JSON responses make it easy for clients to parse data.

## Code Explanation

```python
# GET - Retrieve all items
@app.get("/items")
def read_items():
    return {"items": ["item1", "item2", "item3"]}

# GET - Retrieve specific item
@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}

# POST - Create new item
@app.post("/items")
def create_item(item: dict):
    return {"message": "Item created", "item": item}

# PUT - Update item
@app.put("/items/{item_id}")
def update_item(item_id: int, item: dict):
    return {"message": "Item updated", "item_id": item_id}

# DELETE - Remove item
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    return {"message": "Item deleted", "item_id": item_id}
```

## Testing with Interactive Docs

FastAPI automatically generates interactive API documentation:
1. Start the server: `python main.py`
2. Visit: `http://localhost:8000/docs`
3. Try each endpoint directly in the browser!

## Next Steps

After completing this project, you're ready for:
- **Project 3**: Database Integration - Store and retrieve real data
- Add data persistence
- Learn about data models
- Connect to databases

## Key Takeaways

✅ You understand REST principles  
✅ You can design resource-based URLs  
✅ You know when to use each HTTP method  
✅ You can build RESTful APIs  
✅ You're ready to add data persistence!

---

**Remember**: REST is a design philosophy, not a strict protocol. Focus on making your APIs intuitive and consistent! 🚀
