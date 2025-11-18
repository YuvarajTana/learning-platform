'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { projectsAPI, progressAPI } from '@/lib/api'
import CodeSample from '@/components/CodeSample'
import FlowDiagram from '@/components/FlowDiagram'
import ArchitectureDiagram from '@/components/ArchitectureDiagram'
import { projectCodeData } from '@/lib/projectCodeSamples'

interface Project {
  id: number
  project_number: number
  title: string
  description: string | null
  concept: string
  phase: string
  difficulty: string
  estimated_time: number | null
  prerequisites: string | null
  created_at: string
}

interface Progress {
  id: number
  user_id: number
  project_id: number
  status: string
  completion_percentage: number
  time_spent: number
  last_accessed: string
  completed_at: string | null
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = parseInt(params.id as string)
  
  const [project, setProject] = useState<Project | null>(null)
  const [progress, setProgress] = useState<Progress | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isNaN(projectId)) {
      setError('Invalid project ID')
      setLoading(false)
      return
    }

    // Fetch project details
    projectsAPI.get(projectId)
      .then((response) => {
        setProject(response.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching project:', err)
        if (err.response?.status === 404) {
          setError('Project not found')
        } else {
          setError('Failed to load project. Please try again.')
        }
        setLoading(false)
      })

    // Try to fetch progress (may fail if not logged in)
    progressAPI.get(projectId)
      .then((response) => {
        setProgress(response.data)
      })
      .catch((err) => {
        // Progress not found or not logged in - that's okay
        // Only log if it's not a 404 or 401
        if (err.response?.status !== 404 && err.response?.status !== 401) {
          console.error('Error fetching progress:', err)
        }
      })
  }, [projectId])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-blue-100 text-blue-800'
      case 'advanced':
        return 'bg-orange-100 text-orange-800'
      case 'expert':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase.toLowerCase()) {
      case 'foundations':
        return 'bg-blue-50 border-blue-200'
      case 'intermediate':
        return 'bg-purple-50 border-purple-200'
      case 'advanced':
        return 'bg-orange-50 border-orange-200'
      case 'ai_ml':
        return 'bg-pink-50 border-pink-200'
      case 'capstone':
        return 'bg-yellow-50 border-yellow-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const getRealWorldExamples = (concept: string) => {
    const examples: { [key: string]: { category: string; companies: string }[] } = {
      'HTTP Server Basics': [
        { category: 'Streaming', companies: 'Netflix, YouTube' },
        { category: 'Tech Companies', companies: 'GitHub, Google' },
        { category: 'E-commerce', companies: 'Amazon, Shopify' },
        { category: 'Social Media', companies: 'Twitter, Facebook' },
      ],
      'RESTful API Design': [
        { category: 'Payment APIs', companies: 'Stripe, PayPal' },
        { category: 'Developer Tools', companies: 'GitHub, GitLab' },
        { category: 'Social Platforms', companies: 'Twitter, Instagram' },
        { category: 'Cloud Services', companies: 'AWS, Google Cloud' },
      ],
      'Database CRUD Operations': [
        { category: 'E-commerce', companies: 'Amazon, eBay' },
        { category: 'Social Media', companies: 'Instagram, LinkedIn' },
        { category: 'Banking', companies: 'Banks, Fintech' },
        { category: 'SaaS', companies: 'Salesforce, HubSpot' },
      ],
      'User Security': [
        { category: 'All Platforms', companies: 'Every app uses auth' },
        { category: 'Enterprise', companies: 'Microsoft, Google' },
        { category: 'Finance', companies: 'Banks, Payment apps' },
        { category: 'Healthcare', companies: 'Medical platforms' },
      ],
      'Input Validation & Error Management': [
        { category: 'Payment Processing', companies: 'Stripe, Square' },
        { category: 'Form Validation', companies: 'All web apps' },
        { category: 'API Services', companies: 'Twilio, SendGrid' },
        { category: 'Security', companies: 'All secure platforms' },
      ],
    }

    return examples[concept] || [
      { category: 'Tech Companies', companies: 'Netflix, GitHub, Stripe' },
      { category: 'E-commerce', companies: 'Amazon, Shopify' },
      { category: 'Social Media', companies: 'Twitter, Instagram' },
      { category: 'SaaS Platforms', companies: 'Slack, Notion' },
    ]
  }

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-600">{error || 'Project not found'}</p>
            <Link
              href="/projects"
              className="mt-4 inline-block text-primary-600 hover:text-primary-700"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Parse prerequisites safely
  let prerequisites: number[] = []
  try {
    if (project.prerequisites) {
      prerequisites = JSON.parse(project.prerequisites)
      if (!Array.isArray(prerequisites)) {
        prerequisites = []
      }
    }
  } catch (e) {
    console.error('Error parsing prerequisites:', e)
    prerequisites = []
  }

  // Get code samples and flow data for this project
  const codeData = projectCodeData[project.project_number] || {
    codeSamples: [],
    flowSteps: [],
    architecture: undefined,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Link
            href="/projects"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium mb-4 inline-block transition-colors"
          >
            ← Back to Projects
          </Link>
          
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-sm font-semibold text-primary-600"
                >
                  Project {project.project_number}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`text-xs px-2 py-1 rounded ${getDifficultyColor(project.difficulty)}`}
                >
                  {project.difficulty}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`text-xs px-2 py-1 rounded border ${getPhaseColor(project.phase)}`}
                >
                  {project.phase}
                </motion.span>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold mb-2"
              >
                {project.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-600"
              >
                {project.concept}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Progress Card */}
        {progress && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Your Progress</h3>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={`text-sm px-3 py-1 rounded ${
                  progress.status === 'completed' 
                    ? 'bg-green-100 text-green-800'
                    : progress.status === 'in_progress'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {progress.status.replace('_', ' ')}
              </motion.span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress.completion_percentage}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="bg-primary-600 h-3 rounded-full"
              ></motion.div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{Math.round(progress.completion_percentage)}% Complete</span>
              {progress.time_spent > 0 && (
                <span>Time spent: {formatTime(progress.time_spent)}</span>
              )}
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4">About This Project</h2>
              <p className="text-gray-700 leading-relaxed">
                {project.description || 'No description available for this project.'}
              </p>
            </motion.div>

            {/* Code Samples Section */}
            {codeData.codeSamples.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="space-y-6"
              >
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h2 className="text-2xl font-semibold mb-6">Code Examples</h2>
                  <div className="space-y-6">
                    {codeData.codeSamples.map((sample, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                      >
                        <CodeSample
                          code={sample.code}
                          language={sample.language}
                          title={sample.title}
                          explanation={sample.explanation}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Flow Diagram Section */}
            {codeData.flowSteps && codeData.flowSteps.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <FlowDiagram
                  steps={codeData.flowSteps}
                  title="Implementation Flow"
                />
              </motion.div>
            )}

            {/* Architecture Diagram Section */}
            {codeData.architecture && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <ArchitectureDiagram
                  components={codeData.architecture.components}
                  connections={codeData.architecture.connections}
                  title="System Architecture"
                />
              </motion.div>
            )}

            {/* Learning Objectives */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4">Learning Objectives</h2>
              <ul className="space-y-3">
                {[
                  `Understand ${project.concept.toLowerCase()}`,
                  'Build a working implementation',
                  'Apply concepts to real-world scenarios',
                  'Master the fundamentals before moving forward',
                ].map((objective, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-start"
                  >
                    <motion.span
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="text-primary-600 mr-3"
                    >
                      ✓
                    </motion.span>
                    <span className="text-gray-700">{objective}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Real-World Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4">Real-World Applications</h2>
              <p className="text-gray-700 mb-4">
                This concept is used in production systems by companies like:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {getRealWorldExamples(project.concept).map((example, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="p-3 bg-gray-50 rounded border border-gray-200 cursor-pointer transition-shadow hover:shadow-md"
                  >
                    <div className="font-semibold text-gray-800">{example.category}</div>
                    <div className="text-sm text-gray-600">{example.companies}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
              <div className="space-y-3">
                {[
                  {
                    title: 'Open the Code Editor',
                    description: 'Click "Open Code Editor" to start coding',
                  },
                  {
                    title: 'Follow the Instructions',
                    description: 'Read the project requirements and implement the solution',
                  },
                  {
                    title: 'Test Your Code',
                    description: 'Run your code and verify it works correctly',
                  },
                  {
                    title: 'Move to Next Project',
                    description: 'Once complete, proceed to the next project in the series',
                  },
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start"
                  >
                    <motion.span
                      whileHover={{ scale: 1.2 }}
                      className="text-primary-600 mr-3 font-bold"
                    >
                      {idx + 1}.
                    </motion.span>
                    <div>
                      <div className="font-semibold text-gray-800">{step.title}</div>
                      <div className="text-sm text-gray-600">{step.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Estimated Time</div>
                  <div className="font-semibold">
                    {project.estimated_time ? `${project.estimated_time} minutes` : 'Not specified'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Difficulty</div>
                  <div className="font-semibold capitalize">{project.difficulty}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Phase</div>
                  <div className="font-semibold capitalize">{project.phase.replace('_', ' ')}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Concept</div>
                  <div className="font-semibold">{project.concept}</div>
                </div>
              </div>
            </div>

            {/* Prerequisites */}
            {prerequisites.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Prerequisites</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Complete these projects first:
                </p>
                <div className="space-y-2">
                  {prerequisites.map((prereqId: number) => (
                    <Link
                      key={prereqId}
                      href={`/projects/${prereqId}`}
                      className="block text-primary-600 hover:text-primary-700 text-sm"
                    >
                      → Project {prereqId}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Get Started</h3>
              <div className="space-y-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href={`/projects/${project.id}/editor`}
                    className="block w-full text-center px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium shadow-md"
                  >
                    Open Code Editor
                  </Link>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={async () => {
                    try {
                      // Mark as in progress
                      await progressAPI.create(project.id)
                      // Reload to show updated progress
                      window.location.reload()
                    } catch (err: any) {
                      // Not logged in - redirect to login
                      if (err.response?.status === 401 || err.response?.status === 403) {
                        router.push('/login')
                      } else {
                        alert('Failed to start project. Please try again.')
                      }
                    }
                  }}
                  className="block w-full text-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                >
                  {progress ? 'Continue Learning' : 'Start Project'}
                </motion.button>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <div className="space-y-2">
                <Link
                  href="/projects"
                  className="block text-primary-600 hover:text-primary-700 text-sm"
                >
                  ← All Projects
                </Link>
                <Link
                  href="/dashboard"
                  className="block text-primary-600 hover:text-primary-700 text-sm"
                >
                  → Dashboard
                </Link>
                {project.project_number > 1 && (
                  <Link
                    href={`/projects/${project.id - 1}`}
                    className="block text-primary-600 hover:text-primary-700 text-sm"
                  >
                    ← Previous Project
                  </Link>
                )}
                {project.project_number < 5 && (
                  <Link
                    href={`/projects/${project.id + 1}`}
                    className="block text-primary-600 hover:text-primary-700 text-sm"
                  >
                    Next Project →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
