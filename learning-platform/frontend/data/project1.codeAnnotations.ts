export const project1CodeAnnotations = {
  code: `from fastapi import FastAPI
import uvicorn

# Create FastAPI application instance
app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}`,

  annotations: [
    {
      line: 1,
      label: 'Import FastAPI',
      explanation: 'Imports the FastAPI class used to create the API application.'
    },
    {
      line: 2,
      label: 'Import Uvicorn',
      explanation: 'Imports uvicorn which is an ASGI server for running the application.'
    },
    {
      line: 4,
      label: 'Create App',
      explanation: 'Creates the FastAPI application instance.'
    },
    {
      line: 6,
      label: 'Route Decorator',
      explanation: 'Registers a GET endpoint for the root URL (/).' 
    },
    {
      line: 7,
      label: 'Handler Function',
      explanation: 'Defines the function that handles incoming HTTP requests to the root endpoint.'
    },
    {
      line: 8,
      label: 'Return Statement',
      explanation: 'Returns a dictionary as a JSON response with the message.'
    }
  ]
}
