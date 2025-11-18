# Project 3: Database Integration

**Concept**: Database CRUD Operations  
**Difficulty**: ⭐⭐ Intermediate  
**Time**: 2 hours  
**Status**: ✅ Completed

## Learning Objectives

- Understand relational databases
- Learn SQL basics
- Use ORM (Object-Relational Mapping)
- Perform CRUD operations
- Handle database connections

## What You'll Learn

This project teaches you how to integrate databases into your API. You'll learn:
- How to set up and connect to a database
- Using SQLAlchemy ORM to interact with databases
- Creating database models
- Performing CRUD (Create, Read, Update, Delete) operations
- Managing database sessions and transactions

## Real-World Applications

- **User Accounts**: Store usernames, emails, passwords
- **E-commerce**: Products, orders, inventory
- **Social Media**: Posts, comments, likes, followers
- **Banking**: Accounts, transactions, balances

## Industry Example

**How Instagram stores data:**
```python
# Users table
users: id, username, email, password_hash, created_at

# Posts table  
posts: id, user_id, image_url, caption, likes_count, created_at

# Comments table
comments: id, post_id, user_id, text, created_at

# Follows table
follows: follower_id, following_id, created_at
```

**Database operations in action:**
- When you post a photo → INSERT into posts table
- When someone likes it → UPDATE likes_count
- When you view feed → SELECT posts from followed users
- When you delete post → DELETE from posts table

## Project Structure

```
p3-database-integration/
├── main.py              # FastAPI app with database integration
├── requirements.txt     # Dependencies
├── items.db            # SQLite database (created on first run)
└── README.md           # This file
```

## Setup Instructions

1. **Create and activate virtual environment**:
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
   - The database file (`items.db`) will be created automatically

## Available Endpoints

### GET /items
List all items (supports pagination)
```bash
curl http://localhost:8000/items?skip=0&limit=10
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
  -d '{"name": "Laptop", "description": "Gaming laptop"}'
```

### PUT /items/{item_id}
Update an existing item
```bash
curl -X PUT http://localhost:8000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Laptop", "description": "Updated description"}'
```

### DELETE /items/{item_id}
Delete an item
```bash
curl -X DELETE http://localhost:8000/items/1
```

## Key Concepts

### ORM (Object-Relational Mapping)
ORM allows you to interact with databases using Python objects instead of SQL queries directly.

**Benefits:**
- Write Python code instead of SQL
- Database-agnostic (works with SQLite, PostgreSQL, MySQL, etc.)
- Type safety and validation
- Easier to maintain and test

### Database Models
```python
class Item(Base):
    __tablename__ = "items"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
```

### CRUD Operations

**Create (INSERT):**
```python
db_item = Item(name="Laptop", description="Gaming laptop")
db.add(db_item)
db.commit()
```

**Read (SELECT):**
```python
# Get all items
items = db.query(Item).all()

# Get specific item
item = db.query(Item).filter(Item.id == 1).first()
```

**Update (UPDATE):**
```python
item.name = "Updated Name"
db.commit()
```

**Delete (DELETE):**
```python
db.delete(item)
db.commit()
```

## Database Types

### SQLite (This Project)
- **Pros**: No setup required, file-based, perfect for development
- **Cons**: Not suitable for high concurrency, limited features
- **Use Case**: Development, small applications

### PostgreSQL (Production)
- **Pros**: Full-featured, handles concurrency well, robust
- **Cons**: Requires setup, more complex
- **Use Case**: Production applications

## Testing

1. **Create an item**:
   ```bash
   curl -X POST http://localhost:8000/items \
     -H "Content-Type: application/json" \
     -d '{"name": "Test Item", "description": "Testing database"}'
   ```

2. **List all items**:
   ```bash
   curl http://localhost:8000/items
   ```

3. **Get specific item**:
   ```bash
   curl http://localhost:8000/items/1
   ```

4. **Update item**:
   ```bash
   curl -X PUT http://localhost:8000/items/1 \
     -H "Content-Type: application/json" \
     -d '{"name": "Updated Item"}'
   ```

5. **Delete item**:
   ```bash
   curl -X DELETE http://localhost:8000/items/1
   ```

## Next Steps

After completing this project, you're ready for:
- **Project 4**: Authentication & Authorization - Secure your API
- Add user authentication
- Protect endpoints
- Secure user data

## Key Takeaways

✅ You understand how databases work  
✅ You can use ORM to interact with databases  
✅ You can perform CRUD operations  
✅ You know how to manage database sessions  
✅ You're ready to add authentication!

---

**Remember**: Databases are the foundation of most applications. Understanding how to work with them is crucial! 🚀

