# Project 5: Data Validation & Error Handling

**Concept**: Input Validation & Error Management  
**Difficulty**: ⭐⭐ Intermediate  
**Time**: 1-2 hours  
**Status**: ✅ Completed

## Learning Objectives

- Validate user input
- Handle errors gracefully
- Return proper HTTP status codes
- Create user-friendly error messages
- Prevent security vulnerabilities

## What You'll Learn

This project teaches you how to validate input and handle errors properly. You'll learn:
- How to use Pydantic for automatic validation
- How to create custom validators
- How to return proper HTTP status codes
- How to create user-friendly error messages
- Best practices for error handling

## Real-World Applications

- **Form Validation**: Email format, password strength
- **API Validation**: Required fields, data types
- **Error Messages**: Help users fix mistakes
- **Security**: Prevent SQL injection, XSS attacks

## Industry Example

**How Stripe validates payment data:**
```python
# Validation rules
card_number: Must be 13-19 digits, valid Luhn algorithm
expiry_date: Must be future date, MM/YY format
cvv: Must be 3-4 digits
amount: Must be positive number, minimum $0.50
currency: Must be valid ISO code (USD, EUR, etc.)
```

**Error handling:**
- Invalid card → 400 Bad Request with specific error
- Insufficient funds → 402 Payment Required
- Network error → 503 Service Unavailable
- Rate limit exceeded → 429 Too Many Requests

## Project Structure

```
p5-validation/
├── main.py              # FastAPI app with validation
├── requirements.txt     # Dependencies
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
   - Try creating items with invalid data to see validation in action!

## Available Endpoints

### POST /items
Create a new item (with validation)
```bash
curl -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "Gaming laptop",
    "price": 1299,
    "category": "electronics",
    "email": "seller@example.com"
  }'
```

### GET /items
List all items (with pagination validation)
```bash
curl "http://localhost:8000/items?skip=0&limit=10"
```

### GET /items/{item_id}
Get a specific item
```bash
curl http://localhost:8000/items/1
```

### PUT /items/{item_id}
Update an item
```bash
curl -X PUT http://localhost:8000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Laptop", "price": 1199, "category": "electronics"}'
```

### DELETE /items/{item_id}
Delete an item
```bash
curl -X DELETE http://localhost:8000/items/1
```

## Key Concepts

### Pydantic Validation

Pydantic automatically validates data based on type hints and constraints:

```python
class ItemCreate(BaseModel):
    name: constr(min_length=1, max_length=100)  # String length validation
    price: conint(gt=0, le=1000000)              # Number range validation
    email: Optional[EmailStr]                    # Email format validation
    category: ItemCategory                       # Enum validation
```

### Field Validation Types

**String Constraints:**
- `constr(min_length=1, max_length=100)`: String length
- `EmailStr`: Email format validation

**Number Constraints:**
- `conint(gt=0)`: Integer greater than 0
- `conint(le=1000000)`: Integer less than or equal to 1,000,000

**Enum Validation:**
- `ItemCategory`: Only allows predefined values

### Custom Validators

Create custom validation logic:

```python
@validator('name')
def name_must_not_be_empty(cls, v):
    if not v or not v.strip():
        raise ValueError('Name cannot be empty or whitespace')
    return v.strip()
```

### HTTP Status Codes

Use appropriate status codes:

- **200 OK**: Successful GET, PUT
- **201 Created**: Successful POST
- **204 No Content**: Successful DELETE
- **400 Bad Request**: Invalid input data
- **404 Not Found**: Resource doesn't exist
- **422 Unprocessable Entity**: Validation error (automatic with Pydantic)
- **500 Internal Server Error**: Server error

### Error Response Format

Consistent error format:

```json
{
  "detail": "Item with ID 1 not found"
}
```

FastAPI automatically formats validation errors:

```json
{
  "detail": [
    {
      "loc": ["body", "price"],
      "msg": "ensure this value is greater than 0",
      "type": "value_error.number.not_gt"
    }
  ]
}
```

## Validation Examples

### Valid Request
```json
{
  "name": "Laptop",
  "price": 1299,
  "category": "electronics",
  "email": "seller@example.com"
}
```
✅ **Result**: Item created successfully

### Invalid: Empty Name
```json
{
  "name": "",
  "price": 1299,
  "category": "electronics"
}
```
❌ **Error**: `"Name cannot be empty or whitespace"`

### Invalid: Negative Price
```json
{
  "name": "Laptop",
  "price": -100,
  "category": "electronics"
}
```
❌ **Error**: `"ensure this value is greater than 0"`

### Invalid: Invalid Category
```json
{
  "name": "Laptop",
  "price": 1299,
  "category": "invalid_category"
}
```
❌ **Error**: `"value is not a valid enumeration member"`

### Invalid: Invalid Email
```json
{
  "name": "Laptop",
  "price": 1299,
  "category": "electronics",
  "email": "not-an-email"
}
```
❌ **Error**: `"value is not a valid email address"`

## Testing Validation

1. **Test valid data**:
   ```bash
   curl -X POST http://localhost:8000/items \
     -H "Content-Type: application/json" \
     -d '{"name": "Test Item", "price": 100, "category": "electronics"}'
   ```

2. **Test invalid price** (should fail):
   ```bash
   curl -X POST http://localhost:8000/items \
     -H "Content-Type: application/json" \
     -d '{"name": "Test Item", "price": -100, "category": "electronics"}'
   ```

3. **Test invalid category** (should fail):
   ```bash
   curl -X POST http://localhost:8000/items \
     -H "Content-Type: application/json" \
     -d '{"name": "Test Item", "price": 100, "category": "invalid"}'
   ```

4. **Test missing required field** (should fail):
   ```bash
   curl -X POST http://localhost:8000/items \
     -H "Content-Type: application/json" \
     -d '{"price": 100, "category": "electronics"}'
   ```

## Security Benefits

Validation helps prevent:
- **SQL Injection**: Validated input can't contain SQL
- **XSS Attacks**: Input is validated and sanitized
- **Type Confusion**: Type checking prevents errors
- **Buffer Overflows**: Length constraints prevent overflow

## Next Steps

After completing this project, you're ready for:
- **Project 6**: Testing & Quality Assurance - Write tests for your API
- Write unit tests
- Write integration tests
- Ensure code quality

## Key Takeaways

✅ You can validate user input automatically  
✅ You understand HTTP status codes  
✅ You can create user-friendly error messages  
✅ You know how to prevent security vulnerabilities  
✅ You're ready to write tests!

---

**Remember**: Always validate input on the server side, even if you validate on the client. Never trust user input! 🛡️

