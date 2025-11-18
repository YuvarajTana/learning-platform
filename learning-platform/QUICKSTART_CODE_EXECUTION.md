# Quick Start: Code Execution Service

## Step-by-Step Setup

### 1. Initialize Database (One-time)

```bash
cd /Users/yuvarajtana/practice-projects/learning-platform/backend

# Make sure your virtual environment is activated
# If not already activated:
source venv/bin/activate

# Run the seed script to create tables and add projects
python seed_data.py
```

This will create the `code_executions` table and seed initial projects.

### 2. Start the Backend

```bash
cd /Users/yuvarajtana/practice-projects/learning-platform/backend

# Activate virtual environment
source venv/bin/activate

# Run the backend server
python run.py
```

The backend will start on `http://localhost:8000`

**Development Mode:** The code executor is configured to run in local mode (no Docker required) for easier development.

### 3. Start the Frontend

Open a new terminal:

```bash
cd /Users/yuvarajtana/practice-projects/learning-platform/frontend

# Start the Next.js development server
npm run dev
```

The frontend will start on `http://localhost:3000`

### 4. Test the Code Execution

1. **Open the frontend:**
   - Navigate to `http://localhost:3000`

2. **Register/Login:**
   - Create an account or login
   - Navigate to Projects page

3. **Open a project editor:**
   - Click on any project
   - Click "Open Code Editor"

4. **Write and run code:**
   ```python
   print("Hello from the code executor!")
   print("Testing: 2 + 2 =", 2 + 2)
   ```

5. **Click "Run Code" button:**
   - See output in the right panel
   - Execution time is displayed
   - Code is saved to history

## Testing Without Frontend

Use curl or Postman to test the API directly:

```bash
# 1. Register a user
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "testpass123",
    "full_name": "Test User"
  }'

# 2. Login to get token
curl -X POST http://localhost:8000/api/v1/auth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser&password=testpass123"

# Save the access_token from response

# 3. Execute code (replace YOUR_TOKEN)
curl -X POST http://localhost:8000/api/v1/code/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "print(\"Hello, World!\")\nprint(2 + 2)",
    "language": "python"
  }'

# 4. Get execution history
curl -X GET http://localhost:8000/api/v1/code/history \
  -H "Authorization: Bearer YOUR_TOKEN"

# 5. Get supported languages
curl -X GET http://localhost:8000/api/v1/code/languages
```

## Features

### ✅ Code Editor
- Monaco Editor (VS Code editor)
- Syntax highlighting
- Auto-completion
- Line numbers

### ✅ Code Execution
- Python 3.11 support
- Real-time output display
- Error messages displayed
- Execution time tracking

### ✅ History
- All executions saved to database
- Associated with user and project
- Can retrieve past executions

### ✅ Security (Development Mode)
- Execution timeout (30 seconds)
- Output size limit (10KB)
- Code size limit (50KB)
- Basic resource limits

## Current Status

**Working in Development Mode:**
- ✅ Backend API endpoints
- ✅ Code execution service (local mode)
- ✅ Database models and schemas
- ✅ Frontend editor interface
- ✅ Real-time output display
- ✅ Execution history

**For Production (Requires Docker):**
- Docker-based execution
- Enhanced security
- Network isolation
- Resource limits enforcement

## Enabling Docker (Optional)

If you want to use Docker for secure execution:

1. **Install Docker:**
   ```bash
   # macOS
   brew install --cask docker
   ```

2. **Build executor image:**
   ```bash
   cd backend
   docker build -f Dockerfile.executor -t learning-platform-python-executor:latest .
   ```

3. **Enable Docker in code:**
   
   Edit `backend/app/api/v1/code.py`, line 32:
   ```python
   # Change:
   executor = get_code_executor(use_docker=False)
   
   # To:
   executor = get_code_executor(use_docker=True)
   ```

4. **Restart backend:**
   ```bash
   python run.py
   ```

## Troubleshooting

### Backend won't start
- Check if port 8000 is available
- Make sure virtual environment is activated
- Check for any database errors in console

### Frontend won't start
- Check if port 3000 is available
- Run `npm install` if packages are missing
- Check Node.js version (needs 18+)

### Code execution fails
- Check backend logs for errors
- Ensure Python is installed
- Check execution timeout (default 30s)

### "Unauthorized" error
- Make sure you're logged in
- Check if token is valid
- Try logging in again

## Next Steps

Once the code execution service is working, you can:

1. **Try different projects:**
   - Each project has starter code
   - Test different Python features

2. **View execution history:**
   - Check saved executions
   - See execution times
   - Review past code

3. **Implement project solutions:**
   - Complete project requirements
   - Test thoroughly
   - Move to next project

4. **Enable Docker for production:**
   - Follow Docker setup guide
   - Test secure execution
   - Deploy to production

## Need Help?

- Check `CODE_EXECUTION_README.md` for detailed documentation
- Check `DOCKER_SETUP.md` for Docker configuration
- Review backend logs for error messages
- Check browser console for frontend errors

