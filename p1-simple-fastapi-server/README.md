# Project 1: Simple FastAPI Server

**Concept**: HTTP Server Basics  
**Difficulty**: ⭐ Beginner  
**Time**: 30 minutes  
**Status**: ✅ Completed

## Learning Objectives

- Understand what a web server is
- Learn HTTP protocol basics
- Create your first API endpoint
- Understand request/response cycle

## What You'll Learn

This project introduces you to the fundamental concept of HTTP servers. You'll learn:
- How HTTP requests and responses work
- How to create a simple web server using FastAPI
- How to define and handle HTTP endpoints
- The basics of the request/response cycle

## Real-World Applications

- **Every Website**: All websites use HTTP servers
- **Netflix**: Streams content via HTTP
- **GitHub**: Hosts repositories via HTTP
- **Google Search**: Returns results via HTTP

## Industry Example

**How Netflix uses HTTP servers:**
- When you click "Play", your device sends an HTTP request
- Netflix's server responds with video stream URLs
- Your device then requests video chunks via HTTP
- This happens millions of times per second globally

## Project Structure

```
p1-simple-fastapi-server/
├── main.py              # FastAPI application
├── requirements.txt      # Dependencies
└── README.md           # This file
```

## Interactive Annotated Code Example

You can now view an interactive, annotated explanation of the main FastAPI server code:

- **If using Next.js/React frontend:**
   1. Import and use the `AnnotatedCodePage` component from `annotated-code.tsx` in your app or route.
   2. Or, render `<FastApiAnnotatedDemo />` directly in any React page.

- **Component location:**
   - `FastApiAnnotatedDemo.tsx` (renders the annotated code block)
   - `annotated-code.tsx` (standalone page for the annotated code)
   - `fastapiCodeExample.ts` (contains code and annotation data)

This makes it easy to reuse the annotated code explanation in this and other projects!

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

4. **Test the endpoint**:
   - Open browser: `http://localhost:8000`
   - Or use curl: `curl http://localhost:8000`
   - View interactive docs: `http://localhost:8000/docs`

## Code Explanation

```python
from fastapi import FastAPI
import uvicorn

# Create FastAPI application instance
app = FastAPI()

# Define a GET endpoint at root path "/"
@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

# Run the server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
```

**Key Concepts:**
- `FastAPI()`: Creates a web application instance
- `@app.get("/")`: Decorator that defines a GET endpoint at the root path
- `read_root()`: Handler function that returns a response
- `uvicorn.run()`: Starts the HTTP server

## HTTP Basics

- **HTTP (HyperText Transfer Protocol)**: The protocol used for communication between clients and servers
- **Request**: What the client sends to the server (e.g., "Give me the homepage")
- **Response**: What the server sends back (e.g., HTML, JSON, or other data)
- **Endpoint**: A specific URL path that the server responds to
- **GET**: HTTP method for retrieving data

## Testing

Try these requests:

```bash
# Using curl
curl http://localhost:8000

# Expected response:
# {"message":"Hello, World!"}
```

## Next Steps

After completing this project, you're ready for:
- **Project 2**: REST API Basics - Learn about different HTTP methods (GET, POST, PUT, DELETE)
- Add multiple endpoints
- Understand routing and path parameters

## Key Takeaways

✅ You've learned how to create a basic HTTP server  
✅ You understand the request/response cycle  
✅ You can create and test API endpoints  
✅ You're ready to build more complex APIs!

---

**Remember**: Every complex application starts with a simple server. You've taken the first step! 🚀

