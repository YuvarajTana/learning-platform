# Standard Project Template

This document defines the standard structure for all learning projects.

## Project Structure

```
pX-project-name/
├── main.py                 # Main application code
├── requirements.txt        # Python dependencies
├── README.md              # Project documentation
├── .gitignore            # Git ignore rules (optional)
└── venv/                 # Virtual environment (not in git)
```

## README.md Template

Every project README should include:

1. **Header**: Project name, concept, difficulty, time, status
2. **Learning Objectives**: What you'll learn
3. **What You'll Learn**: Detailed explanation
4. **Real-World Applications**: Industry examples
5. **Industry Example**: How companies use this
6. **Project Structure**: File organization
7. **Setup Instructions**: How to run
8. **Code Explanation**: Key concepts
9. **Testing**: How to test
10. **Next Steps**: What comes next
11. **Key Takeaways**: Summary

## Code Standards

- Use type hints where appropriate
- Add docstrings to functions
- Include comments for complex logic
- Follow PEP 8 style guide
- Keep code simple and educational

## Requirements.txt

Always pin versions for reproducibility:
```
fastapi==0.104.1
uvicorn[standard]==0.24.0
```

## Naming Convention

- Project folders: `pX-descriptive-name`
- Use lowercase with hyphens
- Be descriptive but concise

