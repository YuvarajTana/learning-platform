'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { projectsAPI } from '@/lib/api'
import { codeExecutionAPI } from '@/lib/codeApi'
import dynamic from 'next/dynamic'

// Dynamically import Monaco Editor (client-side only)
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false }
)

interface Project {
  id: number
  project_number: number
  title: string
  concept: string
}

export default function ProjectEditorPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = parseInt(params.id as string)
  
  const [project, setProject] = useState<Project | null>(null)
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [executionTime, setExecutionTime] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [executing, setExecuting] = useState(false)
  const [language, setLanguage] = useState('python')

  useEffect(() => {
    if (isNaN(projectId)) {
      setLoading(false)
      return
    }

    projectsAPI.get(projectId)
      .then((response) => {
        setProject(response.data)
        // Load starter code based on project
        setCode(getStarterCode(response.data))
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching project:', err)
        setLoading(false)
      })
  }, [projectId])

  const getStarterCode = (project: Project) => {
    // Return starter code based on project number
    switch (project.project_number) {
      case 1:
        return `from fastapi import FastAPI
import uvicorn

# Create FastAPI application instance
app = FastAPI()

# Define a GET endpoint at root path "/"
@app.get("/")
def read_root():
    """
    Root endpoint that returns a simple greeting message.
    This demonstrates the basic HTTP request/response cycle.
    """
    return {"message": "Hello, World!"}


# Run the server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
`
      case 2:
        return `from fastapi import FastAPI
import uvicorn

# Create FastAPI application instance
app = FastAPI()

# REST API endpoints for managing items
@app.get("/")
def read_root():
    """Root endpoint - provides API information"""
    return {
        "message": "Welcome to the REST API",
        "description": "This API demonstrates RESTful principles"
    }

@app.get("/items")
def read_items():
    """GET /items - Retrieve all items"""
    return {"items": ["item1", "item2", "item3"]}

@app.get("/items/{item_id}")
def read_item(item_id: int):
    """GET /items/{item_id} - Retrieve a specific item by ID"""
    return {"item_id": item_id, "name": f"item{item_id}"}

@app.post("/items")
def create_item(item: dict):
    """POST /items - Create a new item"""
    return {"message": "Item created", "item": item}

@app.put("/items/{item_id}")
def update_item(item_id: int, item: dict):
    """PUT /items/{item_id} - Update an existing item"""
    return {"message": "Item updated", "item_id": item_id, "item": item}

@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    """DELETE /items/{item_id} - Delete an item"""
    return {"message": "Item deleted", "item_id": item_id}

# Run the server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
`
      default:
        return `# Project ${project.project_number}: ${project.title}
# Concept: ${project.concept}

# Your code here
print("Hello, World!")
`
    }
  }

  const handleExecute = async () => {
    if (!code.trim()) {
      setOutput('')
      setError('Please write some code first!')
      return
    }

    setExecuting(true)
    setOutput('')
    setError(null)
    setExecutionTime(null)

    try {
      const response = await codeExecutionAPI.execute({
        code,
        language,
        project_id: projectId,
        save_history: true,
      })
      
      const result = response.data
      setOutput(result.output || '(No output)')
      setError(result.error || null)
      setExecutionTime(result.execution_time)
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to execute code'
      setError(errorMsg)
      setOutput('')
    } finally {
      setExecuting(false)
    }
  }

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '')
  }

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <p>Loading editor...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <p>Project not found</p>
          <Link href="/projects" className="text-primary-600">Back to Projects</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link
            href={`/projects/${project.id}`}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium mb-4 inline-block"
          >
            ← Back to Project Details
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {project.title} - Code Editor
              </h1>
              <p className="text-gray-600">{project.concept}</p>
            </div>
            <div className="flex items-center gap-4">
              {executionTime !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-sm text-gray-600"
                >
                  ⚡ {executionTime.toFixed(3)}s
                </motion.div>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExecute}
                disabled={executing}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {executing ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Running...
                  </span>
                ) : (
                  '▶ Run Code'
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Editor and Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
              <h3 className="font-semibold text-sm">Code Editor</h3>
            </div>
            <div className="h-[600px]">
              <MonacoEditor
                height="100%"
                language="python"
                theme="vs-light"
                value={code}
                onChange={handleEditorChange}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  fontLigatures: true,
                  wordWrap: 'on',
                  automaticLayout: true,
                  lineHeight: 22,
                  letterSpacing: 0.5,
                  smoothScrolling: true,
                  cursorBlinking: 'smooth',
                  cursorSmoothCaretAnimation: 'on',
                }}
              />
            </div>
          </div>

          {/* Output */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-sm">Output</h3>
              {(output || error) && (
                <button
                  onClick={() => {
                    setOutput('')
                    setError(null)
                    setExecutionTime(null)
                  }}
                  className="text-xs text-gray-600 hover:text-gray-800"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="p-4 h-[600px] overflow-auto bg-gray-900 font-mono">
              <AnimatePresence mode="wait">
                {executing ? (
                  <motion.div
                    key="executing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-gray-400 font-sans"
                  >
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Executing code...
                  </motion.div>
                ) : error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-red-400 mb-2 font-semibold font-sans">❌ Error:</div>
                    <pre className="text-sm text-red-300 whitespace-pre-wrap leading-relaxed">
                      {error}
                    </pre>
                  </motion.div>
                ) : output ? (
                  <motion.div
                    key="output"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-green-400 mb-2 font-semibold font-sans">✓ Success</div>
                    <pre className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
                      {output}
                    </pre>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-500 text-sm font-sans"
                  >
                    Output will appear here after running your code...
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Info & Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Press Ctrl+Enter (Cmd+Enter on Mac) to run code</li>
              <li>• Your code is executed in a sandboxed environment</li>
              <li>• Execution time is limited to 30 seconds</li>
              <li>• All executions are saved to your history</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">🎯 Project Goal</h4>
            <p className="text-sm text-green-700">
              Complete this project by implementing the required functionality. 
              Test your code thoroughly before moving to the next project.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

