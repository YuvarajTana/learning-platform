"""
Code Execution Service
Handles safe code execution in Docker containers with resource limits
"""
import asyncio
import time
import uuid
from typing import Dict, Optional, Tuple
import tempfile
import os
import shutil


class CodeExecutor:
    """Service for executing code in isolated environments"""
    
    # Resource limits
    MAX_EXECUTION_TIME = 30  # seconds
    MAX_MEMORY = "128m"  # 128 MB
    MAX_OUTPUT_SIZE = 10000  # characters
    
    # Supported languages and their Docker images
    LANGUAGE_CONFIGS = {
        "python": {
            "image": "python:3.11-slim",
            "extension": ".py",
            "command": "python",
        },
        "javascript": {
            "image": "node:18-slim",
            "extension": ".js",
            "command": "node",
        },
        "typescript": {
            "image": "node:18-slim",
            "extension": ".ts",
            "command": "npx ts-node",
        },
    }
    
    def __init__(self, use_docker: bool = True):
        """
        Initialize code executor
        
        Args:
            use_docker: Whether to use Docker for execution (True) or subprocess (False for development)
        """
        self.use_docker = use_docker
        self._check_docker_available()
    
    def _check_docker_available(self) -> bool:
        """Check if Docker is available"""
        if not self.use_docker:
            return False
        
        try:
            import subprocess
            result = subprocess.run(
                ["docker", "--version"],
                capture_output=True,
                timeout=5
            )
            return result.returncode == 0
        except (FileNotFoundError, subprocess.TimeoutExpired):
            self.use_docker = False
            return False
    
    async def execute_code(
        self,
        code: str,
        language: str = "python",
        stdin: Optional[str] = None
    ) -> Dict[str, any]:
        """
        Execute code in a sandboxed environment
        
        Args:
            code: Source code to execute
            language: Programming language
            stdin: Optional standard input
        
        Returns:
            Dict with output, error, execution_time, and status
        """
        start_time = time.time()
        
        # Validate language
        if language not in self.LANGUAGE_CONFIGS:
            return {
                "output": "",
                "error": f"Unsupported language: {language}",
                "execution_time": 0.0,
                "status": "error",
                "exit_code": 1
            }
        
        # Validate code length
        if len(code) > 50000:  # 50KB max
            return {
                "output": "",
                "error": "Code is too large (max 50KB)",
                "execution_time": 0.0,
                "status": "error",
                "exit_code": 1
            }
        
        try:
            if self.use_docker:
                result = await self._execute_in_docker(code, language, stdin)
            else:
                result = await self._execute_local(code, language, stdin)
            
            execution_time = time.time() - start_time
            result["execution_time"] = execution_time
            
            return result
        
        except asyncio.TimeoutError:
            return {
                "output": "",
                "error": f"Execution timed out after {self.MAX_EXECUTION_TIME} seconds",
                "execution_time": self.MAX_EXECUTION_TIME,
                "status": "timeout",
                "exit_code": 124
            }
        except Exception as e:
            return {
                "output": "",
                "error": f"Execution error: {str(e)}",
                "execution_time": time.time() - start_time,
                "status": "error",
                "exit_code": 1
            }
    
    async def _execute_in_docker(
        self,
        code: str,
        language: str,
        stdin: Optional[str] = None
    ) -> Dict[str, any]:
        """Execute code in a Docker container"""
        import subprocess
        
        config = self.LANGUAGE_CONFIGS[language]
        execution_id = str(uuid.uuid4())
        
        # Create temporary directory for code file
        temp_dir = tempfile.mkdtemp(prefix=f"code_exec_{execution_id}_")
        
        try:
            # Write code to file
            code_file = os.path.join(temp_dir, f"code{config['extension']}")
            with open(code_file, "w") as f:
                f.write(code)
            
            # Build Docker command
            docker_cmd = [
                "docker", "run",
                "--rm",  # Remove container after execution
                "--network", "none",  # No network access
                "--memory", self.MAX_MEMORY,
                "--cpus", "0.5",  # Limit CPU usage
                "--read-only",  # Read-only filesystem
                "--tmpfs", "/tmp:rw,noexec,nosuid,size=10m",  # Temporary filesystem
                "-v", f"{temp_dir}:/code:ro",  # Mount code directory as read-only
                "-w", "/code",
                config["image"],
                config["command"],
                f"code{config['extension']}"
            ]
            
            # Execute in Docker with timeout
            process = await asyncio.create_subprocess_exec(
                *docker_cmd,
                stdin=asyncio.subprocess.PIPE if stdin else None,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            
            try:
                stdout, stderr = await asyncio.wait_for(
                    process.communicate(input=stdin.encode() if stdin else None),
                    timeout=self.MAX_EXECUTION_TIME
                )
                
                # Decode output
                output = stdout.decode()[:self.MAX_OUTPUT_SIZE]
                error = stderr.decode()[:self.MAX_OUTPUT_SIZE]
                
                return {
                    "output": output,
                    "error": error if error else None,
                    "status": "success" if process.returncode == 0 else "error",
                    "exit_code": process.returncode
                }
            
            except asyncio.TimeoutError:
                process.kill()
                await process.wait()
                raise
        
        finally:
            # Clean up temporary directory
            shutil.rmtree(temp_dir, ignore_errors=True)
    
    async def _execute_local(
        self,
        code: str,
        language: str,
        stdin: Optional[str] = None
    ) -> Dict[str, any]:
        """
        Execute code locally (for development without Docker)
        WARNING: This is NOT safe for production use
        """
        import subprocess
        
        config = self.LANGUAGE_CONFIGS[language]
        execution_id = str(uuid.uuid4())
        
        # Create temporary directory
        temp_dir = tempfile.mkdtemp(prefix=f"code_exec_{execution_id}_")
        
        try:
            # Write code to file
            code_file = os.path.join(temp_dir, f"code{config['extension']}")
            with open(code_file, "w") as f:
                f.write(code)
            
            # Execute locally
            cmd = [config["command"], code_file]
            
            process = await asyncio.create_subprocess_exec(
                *cmd,
                stdin=asyncio.subprocess.PIPE if stdin else None,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                cwd=temp_dir
            )
            
            try:
                stdout, stderr = await asyncio.wait_for(
                    process.communicate(input=stdin.encode() if stdin else None),
                    timeout=self.MAX_EXECUTION_TIME
                )
                
                output = stdout.decode()[:self.MAX_OUTPUT_SIZE]
                error = stderr.decode()[:self.MAX_OUTPUT_SIZE]
                
                return {
                    "output": output,
                    "error": error if error else None,
                    "status": "success" if process.returncode == 0 else "error",
                    "exit_code": process.returncode
                }
            
            except asyncio.TimeoutError:
                process.kill()
                await process.wait()
                raise
        
        finally:
            # Clean up
            shutil.rmtree(temp_dir, ignore_errors=True)
    
    def get_supported_languages(self) -> list:
        """Get list of supported programming languages"""
        return list(self.LANGUAGE_CONFIGS.keys())


# Global executor instance
_executor = None


def get_code_executor(use_docker: bool = False) -> CodeExecutor:
    """
    Get or create code executor instance
    
    Args:
        use_docker: Whether to use Docker (requires Docker to be installed)
    """
    global _executor
    if _executor is None:
        _executor = CodeExecutor(use_docker=use_docker)
    return _executor

