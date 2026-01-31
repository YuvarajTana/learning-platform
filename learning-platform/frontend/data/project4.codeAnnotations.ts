export const project4CodeAnnotations = {
  code: `from fastapi import FastAPI, Depends, HTTPException, status
import uvicorn
from datetime import datetime, timedelta
from typing import Optional
from passlib.context import CryptContext
from jose import JWTError, jwt

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = "your-secret-key-here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

# User model (simplified)
fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "hashed_password": pwd_context.hash("secretpassword"),
    }
}

# Helper functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(username: str, password: str):
    user = fake_users_db.get(username)
    if not user or not verify_password(password, user["hashed_password"]):
        return None
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/login")
def login(username: str, password: str):
    user = authenticate_user(username, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/protected")
def read_protected():
    # This endpoint would require a valid JWT token
    return {"message": "Access granted to protected resource"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)`,

  annotations: [
    { line: 1, label: 'Import FastAPI', explanation: 'Import FastAPI framework with Depends, HTTPException, and status codes for dependency injection and error handling' },
    { line: 2, label: 'Import Uvicorn', explanation: 'Import uvicorn ASGI server to run the FastAPI application' },
    { line: 3, label: 'Import DateTime', explanation: 'Import datetime and timedelta classes for token expiration calculations' },
    { line: 4, label: 'Import Optional', explanation: 'Import Optional type annotation for optional function parameters' },
    { line: 5, label: 'Import Passlib', explanation: 'Import passlib context for secure password hashing with bcrypt algorithm' },
    { line: 6, label: 'Import JWT', explanation: 'Import JWTError and jwt for JSON Web Token encoding and decoding' },
    { line: 9, label: 'Password Context', explanation: 'Initialize password hashing context with bcrypt schemes and auto-deprecation setting' },
    { line: 12, label: 'Secret Key', explanation: 'Define secret key for JWT token cryptographic signing (should be stored securely in production)' },
    { line: 13, label: 'Algorithm', explanation: 'Specify HS256 algorithm for JWT token signing and verification' },
    { line: 14, label: 'Token Expiration', explanation: 'Set access token expiration time to 30 minutes for security' },
    { line: 16, label: 'Create App', explanation: 'Create FastAPI application instance for handling HTTP requests' },
    { line: 19, label: 'Fake Users DB', explanation: 'Initialize simulated user database as a dictionary structure' },
    { line: 20, label: 'User Entry', explanation: 'Create user entry for johndoe with username and hashed password' },
    { line: 21, label: 'Username Field', explanation: 'Store the username field in the user database record' },
    { line: 22, label: 'Hash Password', explanation: 'Hash the plaintext password using bcrypt and store the result' },
    { line: 27, label: 'Verify Password Function', explanation: 'Define function to verify plaintext password against stored hash' },
    { line: 28, label: 'Password Verification', explanation: 'Return the result of password verification using passlib context' },
    { line: 30, label: 'Authenticate User Function', explanation: 'Define function to authenticate user by username and password' },
    { line: 31, label: 'Get User From DB', explanation: 'Retrieve user record from fake database by username' },
    { line: 32, label: 'Authentication Logic', explanation: 'Verify user exists and password is correct using verify_password function' },
    { line: 33, label: 'Failed Auth Return', explanation: 'Return None if authentication fails (user not found or wrong password)' },
    { line: 34, label: 'Success Auth Return', explanation: 'Return authenticated user object if credentials are valid' },
    { line: 36, label: 'Create Token Function', explanation: 'Define function to create JWT access token with optional expiration parameter' },
    { line: 37, label: 'Copy Data', explanation: 'Create a copy of the input data dictionary to encode in the token' },
    { line: 38, label: 'Set Expiration', explanation: 'Calculate token expiration time from current UTC plus delta or default 15 minutes' },
    { line: 39, label: 'Add Exp Claim', explanation: 'Add expiration timestamp to the token payload data with exp claim' },
    { line: 40, label: 'Encode JWT', explanation: 'Encode JWT token using payload, secret key, and specified algorithm' },
    { line: 41, label: 'Return Encoded', explanation: 'Return the encoded JWT token string' },
    { line: 43, label: 'Login Endpoint', explanation: 'Define POST endpoint at /login for user authentication and token generation' },
    { line: 44, label: 'Login Function', explanation: 'Define function to handle login requests with username and password parameters' },
    { line: 45, label: 'Authenticate', explanation: 'Attempt to authenticate user with provided username and password' },
    { line: 46, label: 'Check Result', explanation: 'Check if authentication was successful, raise exception if not' },
    { line: 47, label: 'HTTP Exception', explanation: 'Raise HTTPException with 401 status for invalid credentials' },
    { line: 48, label: 'Status Code', explanation: 'Set HTTP status code to 401 Unauthorized for failed authentication' },
    { line: 49, label: 'Error Detail', explanation: 'Provide detailed error message for incorrect username or password' },
    { line: 50, label: 'Auth Header', explanation: 'Add WWW-Authenticate header indicating Bearer token authentication required' },
    { line: 52, label: 'Set Expiry', explanation: 'Set token expiration time based on configured ACCESS_TOKEN_EXPIRE_MINUTES' },
    { line: 53, label: 'Generate Token', explanation: 'Generate JWT access token with user data and calculated expiration' },
    { line: 54, label: 'Token Payload', explanation: 'Specify token payload with sub claim containing username and expiration delta' },
    { line: 55, label: 'Complete Call', explanation: 'Complete the create_access_token function call with all parameters' },
    { line: 56, label: 'Return Tokens', explanation: 'Return access token and token type as JSON response to client' },
    { line: 58, label: 'Protected Endpoint', explanation: 'Define GET endpoint at /protected that requires authentication' },
    { line: 59, label: 'Protected Function', explanation: 'Define function to handle requests to the protected resource' },
    { line: 61, label: 'Return Message', explanation: 'Return success message confirming access to protected resource' },
    { line: 63, label: 'Main Guard', explanation: 'Python idiom to ensure code only runs when script is executed directly' },
    { line: 64, label: 'Run Server', explanation: 'Start uvicorn server on host 0.0.0.0, port 8000 with hot reload enabled' }
  ]
}