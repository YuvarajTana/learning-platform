# Learning Platform Backend

FastAPI backend for the interactive learning platform.

## Setup

1. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

2. **Install dependencies**:
   
   **For Python 3.13 (or if you encounter build errors):**
   ```bash
   pip install -r requirements-minimal.txt
   ```
   
   **For Python 3.11/3.12 (full features):**
   ```bash
   pip install -r requirements.txt
   ```
   
   **Note**: If you get build errors with `psycopg2-binary` or `pydantic-core`, use `requirements-minimal.txt` or see `INSTALLATION_NOTES.md` for troubleshooting.

3. **Set up environment variables** (optional):
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

4. **Initialize database**:
   ```bash
   python seed_data.py
   ```

5. **Run the server**:
   ```bash
   python run.py
   # Or: uvicorn app.main:app --reload
   ```

## API Endpoints

- **Health**: `GET /health`
- **API Docs**: `http://localhost:8000/api/docs`

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/token` - Login and get token
- `GET /api/v1/auth/me` - Get current user

### Projects
- `GET /api/v1/projects/` - List all projects
- `GET /api/v1/projects/{id}` - Get project by ID
- `GET /api/v1/projects/number/{number}` - Get project by number

### Progress
- `GET /api/v1/progress/` - Get user progress
- `GET /api/v1/progress/{project_id}` - Get project progress
- `POST /api/v1/progress/` - Create progress
- `PUT /api/v1/progress/{project_id}` - Update progress

### Code Execution
- `POST /api/v1/code/execute` - Execute code (coming soon)

## Development

- Server runs on: `http://localhost:8000`
- API documentation: `http://localhost:8000/api/docs`
- Interactive API: `http://localhost:8000/api/docs` (Swagger UI)

