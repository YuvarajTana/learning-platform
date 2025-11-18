# Docker Setup for Code Execution

This guide explains how to set up Docker for secure code execution.

## Prerequisites

- Docker installed and running
- Docker Compose (optional but recommended)

## Quick Start (Development - No Docker)

The code execution service works without Docker for development:

```bash
# The service will automatically fall back to local execution
# if Docker is not available
python run.py
```

**Note**: Local execution is NOT secure and should ONLY be used for development.

## Production Setup (With Docker)

### 1. Build Executor Images

```bash
cd backend

# Build Python executor image
docker build -f Dockerfile.executor -t learning-platform-python-executor:latest .

# Verify image was created
docker images | grep learning-platform
```

### 2. Enable Docker in Code Executor

Update `app/api/v1/code.py`:

```python
# Change this line:
executor = get_code_executor(use_docker=False)

# To:
executor = get_code_executor(use_docker=True)
```

### 3. Test Code Execution

```bash
# Start the backend
python run.py

# Test execution (using curl or your API client)
curl -X POST http://localhost:8000/api/v1/code/execute \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "print(\"Hello, World!\")",
    "language": "python"
  }'
```

## Security Features

### Resource Limits
- **Memory**: 128MB max
- **CPU**: 0.5 cores max
- **Execution Time**: 30 seconds max
- **Output Size**: 10KB max
- **Code Size**: 50KB max

### Isolation
- No network access
- Read-only filesystem (except /tmp)
- Runs as non-root user
- All Linux capabilities dropped
- Temporary files cleaned up after execution

### Docker Security Options
- `--network none`: No network access
- `--read-only`: Read-only root filesystem
- `--tmpfs /tmp`: Temporary filesystem for temp files
- `--cap-drop ALL`: Drop all Linux capabilities
- `--security-opt no-new-privileges`: Prevent privilege escalation

## Supported Languages

- **Python 3.11**: Default language
- **JavaScript** (Node.js 18): For web development projects
- **TypeScript**: Requires ts-node (coming soon)

## Adding New Languages

1. Create a new Dockerfile (e.g., `Dockerfile.node`)
2. Add language config in `app/services/code_executor.py`:

```python
LANGUAGE_CONFIGS = {
    "python": {...},
    "javascript": {
        "image": "learning-platform-node-executor:latest",
        "extension": ".js",
        "command": "node",
    },
}
```

3. Build and tag the image

## Troubleshooting

### Docker not found
```bash
# Check if Docker is running
docker --version
docker ps
```

### Permission denied
```bash
# Add user to docker group (Linux)
sudo usermod -aG docker $USER
# Log out and back in
```

### Container cleanup
```bash
# Remove all stopped containers
docker container prune

# Remove unused images
docker image prune
```

## Development vs Production

### Development (use_docker=False)
- Faster iteration
- No Docker required
- **NOT SECURE** - only for trusted code
- Uses local Python interpreter

### Production (use_docker=True)
- Secure isolation
- Resource limits enforced
- Network isolation
- Requires Docker daemon

## Monitoring

```bash
# View running containers
docker ps

# View container logs
docker logs <container_id>

# View resource usage
docker stats
```

## Best Practices

1. **Always use Docker in production**
2. **Set appropriate resource limits** based on your server capacity
3. **Monitor execution metrics** to detect abuse
4. **Implement rate limiting** to prevent DoS
5. **Keep Docker images updated** for security patches
6. **Log all executions** for auditing
7. **Clean up old execution history** periodically

