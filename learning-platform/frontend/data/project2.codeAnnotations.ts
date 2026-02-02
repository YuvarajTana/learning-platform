export const project2CodeAnnotations = {
  code: `from fastapi import FastAPI

app = FastAPI()

@app.get("/items")
def read_items():
    return {"items": ["item1", "item2", "item3"]}

@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}`,
  
  annotations: [
    {
      line: 1,
      label: 'Import FastAPI',
      explanation: 'Imports the FastAPI framework needed to build REST APIs.'
    },
    {
      line: 3,
      label: 'Create App Instance',
      explanation: 'Creates the FastAPI application instance.'
    },
    {
      line: 5,
      label: 'Items Route Decorator',
      explanation: 'Decorator that registers a GET endpoint for the /items path.'
    },
    {
      line: 6,
      label: 'Items Handler Function',
      explanation: 'Defines the function that handles requests to the /items endpoint.'
    },
    {
      line: 7,
      label: 'Return Items',
      explanation: 'Returns a dictionary containing a list of sample items.'
    },
    {
      line: 9,
      label: 'Item by ID Route Decorator',
      explanation: 'Decorator that registers a GET endpoint for the /items/{id} path with a path parameter.'
    },
    {
      line: 10,
      label: 'Item Handler Function',
      explanation: 'Defines the function that handles requests to fetch a specific item by ID.'
    },
    {
      line: 11,
      label: 'Return Item',
      explanation: 'Returns a dictionary containing the requested item ID.'
    }
  ]
}
