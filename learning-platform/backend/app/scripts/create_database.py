from urllib.parse import urlparse, unquote
import psycopg
from psycopg import errors
from app.core.config import settings


def ensure_database_exists():
    """Create the target Postgres database if it doesn't exist."""
    url = settings.DATABASE_URL
    parsed = urlparse(url)

    # Extract credentials/host/port and target dbname
    username = unquote(parsed.username) if parsed.username else None
    password = unquote(parsed.password) if parsed.password else None
    host = parsed.hostname or 'localhost'
    port = parsed.port or 5432
    target_db = parsed.path.lstrip('/') or 'learning_platform_db'

    # Connect to the default maintenance DB (postgres) as admin
    try:
        conn = psycopg.connect(
            host=host,
            port=port,
            user=username,
            password=password,
            dbname='postgres',
            autocommit=True,
        )
    except Exception as e:
        print(f"Failed to connect to Postgres server to create database: {e}")
        raise

    try:
        with conn.cursor() as cur:
            cur.execute("SELECT 1 FROM pg_database WHERE datname = %s", (target_db,))
            exists = cur.fetchone() is not None
            if exists:
                print(f"Database '{target_db}' already exists.")
                return

            # Create database
            print(f"Creating database '{target_db}'...")
            cur.execute(f'CREATE DATABASE "{target_db}"')
            print("Database created successfully.")
    except Exception as e:
        print(f"Error checking/creating database: {e}")
        raise
    finally:
        conn.close()


if __name__ == '__main__':
    ensure_database_exists()
