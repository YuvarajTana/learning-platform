from fastapi import FastAPI
import uvicorn

# Create FastAPI application instance
app = FastAPI()

# Define a GET endpoint at root path "/"
@app.get("/")
def read_root():
    """
    Root endpoint that returns a simple greeting message.
    This demonstrates the basic HTTP request/response cycle.
    """
    return {"message": "Hello, World!"}


# Run the server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

