# Installation Notes

## Python 3.13 Compatibility

If you're using Python 3.13, some packages may have compatibility issues. Here are solutions:

### Option 1: Use Minimal Requirements (Recommended for Development)

For development with SQLite (default), use the minimal requirements:

```bash
pip install -r requirements-minimal.txt
```

This installs only the essential packages without optional dependencies.

### Option 2: Install Full Requirements

If you need all features (Redis, Docker, PostgreSQL):

```bash
pip install -r requirements.txt
```

**Note**: If you encounter errors with `psycopg2-binary` or `pydantic-core`:
- These packages may not fully support Python 3.13 yet
- Use Python 3.11 or 3.12 for full compatibility
- Or use the minimal requirements which work with Python 3.13

### Option 3: Use Python 3.11 or 3.12

For best compatibility, use Python 3.11 or 3.12:

```bash
# Create virtual environment with Python 3.11
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Package Versions

All packages have been updated to latest compatible versions:
- **FastAPI**: 0.115.6 (latest)
- **Pydantic**: 2.10.3 (Python 3.13 compatible)
- **SQLAlchemy**: 2.0.36
- **Uvicorn**: 0.32.1

## Optional Dependencies

- **PostgreSQL**: Commented out by default. Uncomment `psycopg[binary]` if needed
- **Redis**: Optional, for caching (can be skipped for development)
- **Docker**: Optional, for code execution (can be skipped initially)

## Troubleshooting

### Error: Failed building wheel for psycopg2-binary
**Solution**: Use `requirements-minimal.txt` or install `psycopg3` instead:
```bash
pip install psycopg[binary]
```

### Error: Failed building wheel for pydantic-core
**Solution**: Update pip and try again:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

Or use Python 3.11/3.12 instead of 3.13.

### All packages install but import errors
**Solution**: Make sure you're in the virtual environment:
```bash
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows
```

