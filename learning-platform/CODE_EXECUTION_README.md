# Code Execution Service

This document explains the code execution service implementation for the learning platform.

## Overview

The code execution service allows users to run code directly in the browser interface with the results displayed in real-time. Code is executed securely in isolated environments with resource limits.

## Architecture

```
Frontend (Next.js)           Backend (FastAPI)          Executor
    │                             │                        │
    │  POST /api/v1/code/execute  │                        │
    ├──────────────────────────────>                       │
    │                             │                        │
    │                             │  Execute in Docker     │
    │                             ├───────────────────────>│
    │                             │                        │
    │                             │  ← Return output       │
    │                             <────────────────────────┤
    │                             │                        │
    │  ← Response with output     │                        │
    <──────────────────────────────┤                        │
    │                             │                        │
```

## Components

### 1. Backend Service (`app/services/code_executor.py`)

**Features:**
- Supports Python, JavaScript, and TypeScript
- Docker-based execution (production)
- Local execution (development)
- Resource limits (CPU, memory, time)
- Automatic cleanup of temporary files

**Resource Limits:**
- Max execution time: 30 seconds
- Max memory: 128MB
- Max CPU: 0.5 cores
- Max output size: 10KB
- Max code size: 50KB

### 2. API Endpoints (`app/api/v1/code.py`)

#### Execute Code
```
POST /api/v1/code/execute
```

**Request:**
```json
{
  "code": "print('Hello, World!')",
  "language": "python",
  "stdin": "",
  "project_id": 1,
  "save_history": true
}
```

**Response:**
```json
{
  "output": "Hello, World!\n",
  "error": null,
  "execution_time": 0.123,
  "status": "success",
  "exit_code": 0
}
```

#### Get Execution History
```
GET /api/v1/code/history?project_id=1&limit=50
```

#### Get Execution by ID
```
GET /api/v1/code/history/{execution_id}
```

#### Delete Execution
```
DELETE /api/v1/code/history/{execution_id}
```

#### Get Supported Languages
```
GET /api/v1/code/languages
```

### 3. Database Models (`app/models/execution.py`)

Stores execution history:
- User ID
- Project ID (optional)
- Code and language
- Output and errors
- Execution time and status
- Timestamp

### 4. Frontend Components

#### Code Editor (`app/projects/[id]/editor/page.tsx`)
- Monaco Editor integration
- Syntax highlighting
- Real-time code execution
- Output display with animations
- Execution time display

#### API Client (`lib/codeApi.ts`)
- TypeScript API client
- Type-safe requests/responses
- Error handling

## Security Features

### Docker Isolation
- No network access (`--network none`)
- Read-only filesystem
- Temporary filesystem for /tmp only
- Runs as non-root user
- All Linux capabilities dropped

### Resource Limits
- Time: 30 seconds max
- Memory: 128MB max
- CPU: 0.5 cores max
- Output: 10KB max

### Input Validation
- Code size limit: 50KB
- Language whitelist
- No arbitrary command execution

## Setup Instructions

### Development (Without Docker)

1. **Backend setup:**
```bash
cd backend
python run.py
```

The service automatically falls back to local execution if Docker is not available.

⚠️ **Warning:** Local execution is NOT secure. Only use for development with trusted code.

### Production (With Docker)

1. **Install Docker:**
```bash
# macOS
brew install --cask docker

# Ubuntu/Debian
sudo apt-get install docker.io

# Verify installation
docker --version
```

2. **Build executor image:**
```bash
cd backend
docker build -f Dockerfile.executor -t learning-platform-python-executor:latest .
```

3. **Enable Docker in backend:**

Edit `app/api/v1/code.py`:
```python
# Change this line:
executor = get_code_executor(use_docker=False)

# To:
executor = get_code_executor(use_docker=True)
```

4. **Restart backend:**
```bash
python run.py
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Testing

### Test Code Execution

1. **Start the backend:**
```bash
cd backend
python run.py
```

2. **Start the frontend:**
```bash
cd frontend
npm run dev
```

3. **Navigate to a project editor:**
```
http://localhost:3000/projects/1/editor
```

4. **Write and run code:**
```python
print("Hello from the code executor!")
```

### Manual API Testing

```bash
# Login to get token
curl -X POST http://localhost:8000/api/v1/auth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=your_username&password=your_password"

# Execute code
curl -X POST http://localhost:8000/api/v1/code/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "print(\"Hello, World!\")",
    "language": "python"
  }'
```

## Supported Languages

### Python 3.11
- Default language
- Full standard library support
- No external packages (by design)

### JavaScript (Node.js 18)
- ES2022 features
- No npm packages (by design)

### TypeScript
- Coming soon
- Requires ts-node in executor image

## Adding New Languages

1. **Create Dockerfile:**
```dockerfile
FROM node:18-slim
WORKDIR /code
RUN useradd -m -u 1000 coderunner
USER coderunner
CMD ["node"]
```

2. **Build image:**
```bash
docker build -f Dockerfile.node -t learning-platform-node-executor:latest .
```

3. **Update executor config:**
```python
LANGUAGE_CONFIGS = {
    # ... existing languages ...
    "javascript": {
        "image": "learning-platform-node-executor:latest",
        "extension": ".js",
        "command": "node",
    },
}
```

## Monitoring

### Execution Metrics
- All executions are logged
- Execution time tracked
- Success/error rates
- Resource usage

### Database Queries
```sql
-- Get execution statistics
SELECT 
    language,
    status,
    COUNT(*) as count,
    AVG(execution_time) as avg_time
FROM code_executions
GROUP BY language, status;

-- Get user execution history
SELECT * FROM code_executions
WHERE user_id = ?
ORDER BY created_at DESC
LIMIT 50;
```

## Troubleshooting

### Docker Issues

**Problem:** `docker: command not found`
```bash
# Install Docker
# macOS: brew install --cask docker
# Ubuntu: sudo apt-get install docker.io
```

**Problem:** Permission denied
```bash
# Add user to docker group (Linux)
sudo usermod -aG docker $USER
# Log out and back in
```

**Problem:** Container doesn't start
```bash
# Check Docker daemon
docker ps

# View logs
docker logs <container_id>
```

### Execution Errors

**Problem:** Timeout errors
- Reduce execution time limit
- Optimize code
- Check for infinite loops

**Problem:** Memory errors
- Reduce data size
- Optimize algorithms
- Check for memory leaks

## Best Practices

1. **Always use Docker in production**
2. **Set appropriate resource limits**
3. **Implement rate limiting**
4. **Monitor execution metrics**
5. **Clean up old execution history**
6. **Log suspicious activity**
7. **Keep Docker images updated**

## Future Enhancements

- [ ] Support for more languages (Go, Rust, Java)
- [ ] Interactive stdin input
- [ ] File upload support
- [ ] Package installation (sandboxed)
- [ ] Collaborative editing
- [ ] Code templates
- [ ] Unit test integration
- [ ] Performance profiling
- [ ] Code quality metrics

## References

- [Docker Security](https://docs.docker.com/engine/security/)
- [FastAPI Async](https://fastapi.tiangolo.com/async/)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Python subprocess](https://docs.python.org/3/library/subprocess.html)

