# Project 4: Authentication & Authorization

**Concept**: User Security  
**Difficulty**: ⭐⭐ Intermediate  
**Time**: 2-3 hours  
**Status**: ✅ Completed

## Learning Objectives

- Understand authentication vs authorization
- Learn password hashing
- Implement JWT tokens
- Create protected routes
- Handle user sessions

## What You'll Learn

This project teaches you how to secure your API with authentication. You'll learn:
- How to hash and verify passwords securely
- How to implement JWT (JSON Web Tokens) for authentication
- How to create protected endpoints
- How to manage user sessions
- Security best practices

## Real-World Applications

- **Login Systems**: Every app needs user login
- **Protected Content**: Only logged-in users can access
- **Role-Based Access**: Admin vs regular user permissions
- **API Keys**: Secure third-party integrations

## Industry Example

**How GitHub handles authentication:**
1. User enters username/password
2. Server hashes password and compares with stored hash
3. If valid, server creates JWT token
4. Token contains user ID and permissions
5. Client stores token and sends with every request
6. Server validates token before allowing access

**Security in action:**
- Passwords never stored in plain text (bcrypt hashing)
- Tokens expire after set time (refresh tokens)
- HTTPS encrypts all communication
- Rate limiting prevents brute force attacks

## Project Structure

```
p4-authentication/
├── main.py              # FastAPI app with authentication
├── requirements.txt     # Dependencies
├── users.db            # SQLite database (created on first run)
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
   - The database file (`users.db`) will be created automatically

## Available Endpoints

### POST /register
Register a new user
```bash
curl -X POST http://localhost:8000/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "username": "testuser", "password": "securepassword123"}'
```

### POST /token
Login and get access token
```bash
curl -X POST http://localhost:8000/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser&password=securepassword123"
```

### GET /users/me
Get current authenticated user (protected)
```bash
curl http://localhost:8000/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### GET /users
List all users (protected)
```bash
curl http://localhost:8000/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Key Concepts

### Authentication vs Authorization

**Authentication**: Verifying who you are (login)
- "Are you who you claim to be?"
- Example: Username/password login

**Authorization**: Verifying what you can do (permissions)
- "What are you allowed to do?"
- Example: Admin can delete users, regular users cannot

### Password Hashing

**Never store passwords in plain text!**

```python
# Hash password before storing
hashed = get_password_hash("mypassword")
# Result: $2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqXQ5...

# Verify password when user logs in
is_valid = verify_password("mypassword", hashed)
```

**Why bcrypt?**
- One-way hashing (can't reverse)
- Includes salt (prevents rainbow table attacks)
- Slow by design (prevents brute force)

### JWT (JSON Web Tokens)

JWT tokens contain:
- **Header**: Algorithm and token type
- **Payload**: User data (username, expiration, etc.)
- **Signature**: Ensures token hasn't been tampered with

**Token Structure:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImV4cCI6MTYzODk2NDgwMH0.signature
```

**How it works:**
1. User logs in with username/password
2. Server validates credentials
3. Server creates JWT token with user info
4. Client stores token (localStorage, cookie, etc.)
5. Client sends token with every request
6. Server validates token before allowing access

### Protected Endpoints

Use dependency injection to protect endpoints:

```python
@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    # This endpoint requires authentication
    # get_current_user validates the JWT token
    return current_user
```

## Security Best Practices

1. **Password Hashing**: Always hash passwords (never plain text)
2. **HTTPS**: Use HTTPS in production (encrypts communication)
3. **Token Expiration**: Tokens should expire (30 minutes default)
4. **Secret Key**: Use strong, random secret keys
5. **Rate Limiting**: Prevent brute force attacks
6. **Input Validation**: Validate all user input

## Testing Workflow

1. **Register a user**:
   ```bash
   curl -X POST http://localhost:8000/register \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "username": "testuser", "password": "testpass123"}'
   ```

2. **Login and get token**:
   ```bash
   curl -X POST http://localhost:8000/token \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "username=testuser&password=testpass123"
   ```
   
   Response:
   ```json
   {
     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "token_type": "bearer"
   }
   ```

3. **Use token to access protected endpoint**:
   ```bash
   curl http://localhost:8000/users/me \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   ```

4. **Try accessing without token** (should fail):
   ```bash
   curl http://localhost:8000/users/me
   # Returns 401 Unauthorized
   ```

## Next Steps

After completing this project, you're ready for:
- **Project 5**: Data Validation & Error Handling - Validate user input
- Add input validation
- Handle errors gracefully
- Provide user feedback

## Key Takeaways

✅ You understand authentication vs authorization  
✅ You can hash passwords securely  
✅ You can implement JWT authentication  
✅ You can create protected endpoints  
✅ You know security best practices  
✅ You're ready to add input validation!

---

**Remember**: Security is not optional. Always hash passwords and use HTTPS in production! 🔒

