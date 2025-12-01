"""
Redis Caching Service
Provides distributed caching for frequently accessed data
"""
from typing import Optional, Any, Dict
from json import dumps, loads
import logging

logger = logging.getLogger(__name__)


class CacheService:
    """Service for caching data in Redis"""

    def __init__(self, redis_url: Optional[str] = None):
        """
        Initialize cache service
        
        Args:
            redis_url: Redis connection URL (optional)
        """
        self.enabled = redis_url is not None
        self.redis = None
        
        if self.enabled:
            try:
                import redis
                self.redis = redis.Redis.from_url(redis_url, decode_responses=True)
                # Test connection
                self.redis.ping()
                logger.info("Redis cache connected successfully")
            except Exception as e:
                logger.warning(f"Redis connection failed, caching disabled: {e}")
                self.enabled = False

    def get(self, key: str) -> Optional[Any]:
        """
        Retrieve value from cache
        
        Args:
            key: Cache key
            
        Returns:
            Cached value or None if not found
        """
        if not self.enabled:
            return None
        
        try:
            value = self.redis.get(key)
            return loads(value) if value else None
        except Exception as e:
            logger.warning(f"Cache get failed for {key}: {e}")
            return None

    def set(self, key: str, value: Any, ttl: int = 300) -> bool:
        """
        Store value in cache with TTL
        
        Args:
            key: Cache key
            value: Value to cache (will be JSON serialized)
            ttl: Time-to-live in seconds (default: 5 minutes)
            
        Returns:
            True if set successfully, False otherwise
        """
        if not self.enabled:
            return False
        
        try:
            self.redis.setex(key, ttl, dumps(value))
            return True
        except Exception as e:
            logger.warning(f"Cache set failed for {key}: {e}")
            return False

    def delete(self, key: str) -> bool:
        """
        Delete value from cache
        
        Args:
            key: Cache key
            
        Returns:
            True if deleted, False otherwise
        """
        if not self.enabled:
            return False
        
        try:
            self.redis.delete(key)
            return True
        except Exception as e:
            logger.warning(f"Cache delete failed for {key}: {e}")
            return False

    def clear_pattern(self, pattern: str) -> int:
        """
        Delete all keys matching pattern (e.g., 'project:*')
        
        Args:
            pattern: Key pattern with wildcards
            
        Returns:
            Number of keys deleted
        """
        if not self.enabled:
            return 0
        
        try:
            keys = self.redis.keys(pattern)
            if keys:
                return self.redis.delete(*keys)
            return 0
        except Exception as e:
            logger.warning(f"Cache clear pattern failed for {pattern}: {e}")
            return 0

    def get_stats(self) -> Dict[str, Any]:
        """Get cache statistics"""
        if not self.enabled:
            return {"enabled": False}
        
        try:
            info = self.redis.info()
            return {
                "enabled": True,
                "connected_clients": info.get("connected_clients", 0),
                "used_memory": info.get("used_memory_human", "N/A"),
                "hit_rate": f"{info.get('keyspace_hits', 0)} hits",
                "miss_rate": f"{info.get('keyspace_misses', 0)} misses",
            }
        except Exception as e:
            logger.warning(f"Failed to get cache stats: {e}")
            return {"enabled": True, "error": str(e)}


# Singleton instance
_cache_service: Optional[CacheService] = None


def get_cache_service(redis_url: Optional[str] = None) -> CacheService:
    """Get or create cache service singleton"""
    global _cache_service
    if _cache_service is None:
        _cache_service = CacheService(redis_url)
    return _cache_service
