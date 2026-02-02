'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { projectsAPI, progressAPI } from '@/lib/api'
import CodeSample from '@/components/CodeSample'
import InteractiveCodeBlock from '@/components/InteractiveCodeBlock'
import FlowDiagram from '@/components/FlowDiagram'
import ArchitectureDiagram from '@/components/ArchitectureDiagram'
import SetupInstructions from '@/components/SetupInstructions'
import InteractiveExplanation from '@/components/InteractiveExplanation'
import { projectCodeData } from '@/lib/projectCodeSamples'
import MultiProjectAnnotatedCode from '@/components/MultiProjectAnnotatedCode'
import { project1CodeAnnotations } from '@/data/project1.codeAnnotations'
import { project2CodeAnnotations } from '@/data/project2.codeAnnotations'
import { project3CodeAnnotations } from '@/data/project3.codeAnnotations'
import { project4CodeAnnotations } from '@/data/project4.codeAnnotations'
import { project5CodeAnnotations } from '@/data/project5.codeAnnotations'
import { useRef } from 'react'
import { ProjectVisualizationRenderer } from '@/components/ProjectVisualizations'


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

interface CodeSampleType {
  title: string
  language: string
  code: string
  explanation: string
  annotations?: Array<{
    line: number
    label: string
    explanation: string
    color?: string
  }>
}

interface ProjectCodeData {
  codeSamples: CodeSampleType[]
  flowSteps: Array<{ id: string; title: string; description: string }>
  architecture?: {
    components: Array<{ id: string; name: string; description: string; color: string; position: { x: number; y: number } }>
    connections: Array<{ from: string; to: string }>
  }
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = parseInt(params.id as string)
  const sidebarRef = useRef<HTMLDivElement | null>(null)

  const [project, setProject] = useState<Project | null>(null)
  const [progress, setProgress] = useState<Progress | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedAnnotation, setSelectedAnnotation] = useState<{
    annotation: {
      label: string
      explanation: string
    }  
    y: number
  } | null>(null)
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
        const statusCode = err?.response?.status || err?.status;
        if (statusCode === 404) {
          setError('Project not found')
        } else {
          setError('Failed to load project. Please try again.')
        }
        setLoading(false)
      })

    // Only fetch progress if user is logged in
    const token = localStorage.getItem("access_token")
    if (token) {
      progressAPI.get(projectId)
        .then((response) => {
          setProgress(response.data)
        })
        .catch((err) => {
          // Progress not found - that's okay
          const statusCode = err?.response?.status || err?.status;
          if (statusCode !== 404) {
            console.error('Error fetching progress:', err)
          }
        })
    }
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
  const codeData: ProjectCodeData = projectCodeData[project.project_number] || {
    codeSamples: [],
    flowSteps: [],
    architecture: undefined,
  }
  let annotatedCode = null

  if (project.project_number === 1) {
    annotatedCode = project1CodeAnnotations
  } else if (project.project_number === 2) {
    annotatedCode = project2CodeAnnotations
  }else if (project.project_number === 3) {
    annotatedCode = project3CodeAnnotations
  } else if (project.project_number === 4) {
    annotatedCode = project4CodeAnnotations
  } else if (project.project_number === 5) {
    annotatedCode = project5CodeAnnotations
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 text-white">
        <div className="max-w-5xl mx-auto px-8 py-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-lg rounded-full text-sm font-semibold border border-white/30"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Project {project.project_number}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="px-3 py-1.5 bg-white/90 text-primary-700 rounded-full text-xs font-bold uppercase tracking-wide"
              >
                {project.difficulty}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="px-3 py-1.5 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full text-xs font-semibold uppercase tracking-wide"
              >
                {project.phase.replace('_', ' ')}
              </motion.span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-blue-100 mb-6 leading-relaxed"
            >
              {project.concept}
            </motion.p>

            {project.estimated_time && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-6 text-blue-100"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{project.estimated_time} minutes</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="relative">
          <svg className="w-full h-16 fill-current text-gray-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 -mt-8">

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
            {annotatedCode ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                <h2 className="text-2xl font-semibold mb-6">Code Examples</h2>  
                <MultiProjectAnnotatedCode
                  code={annotatedCode.code}
                  annotations={annotatedCode.annotations}
                  onSelect={setSelectedAnnotation}
                />
              </motion.div>
            ) : (
              codeData.codeSamples.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="space-y-6"
                >
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-6">Code Examples</h2>

                    <div className="space-y-6">
                      {codeData.codeSamples.map((sample: CodeSampleType, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                        >
                          {sample.annotations && sample.annotations.length > 0 ? (
                            <InteractiveCodeBlock
                              code={sample.code}
                              language={sample.language}
                              title={sample.title}
                              annotations={sample.annotations}
                            />
                          ) : (
                            <CodeSample
                              code={sample.code}
                              language={sample.language}
                              title={sample.title}
                              explanation={sample.explanation}
                            />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          )}


            {/* Flow Diagram Section */}
            {/* codeData.flowSteps && codeData.flowSteps.length > 0 && (
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
            )} */}

            {/* Architecture Diagram Section */}
            {/* codeData.architecture && (
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
            )} */}

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

            {/* System Architecture Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4">System Architecture Visualization</h2>
              <ProjectVisualizationRenderer projectId={project.project_number} />
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

            {/* Setup Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <SetupInstructions
                projectTitle={project.title}
                projectNumber={project.project_number}
              />
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
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
                    transition={{ delay: 0.7 + idx * 0.1 }}
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
          <div ref={sidebarRef} className="space-y-6 relative">
            {/* Contextual Code Explanation */}
            {selectedAnnotation && (() => {
              const sidebarTop =
                sidebarRef.current?.getBoundingClientRect().top ?? 0

              const sidebarAbsoluteTop = sidebarTop + window.scrollY

              const relativeTop =
                selectedAnnotation.y - sidebarAbsoluteTop

              return (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{
                    position: 'absolute',
                    top: relativeTop,
                    right: 0,
                    width: '370px',
                }}
                className="bg-white border border-blue-200 rounded-lg p-4 shadow-lg z-20"
              >
                <h3 className="font-semibold mb-2 text-blue-700">
                  {selectedAnnotation.annotation.label}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {selectedAnnotation.annotation.explanation}
                </p>
              </motion.div>
            )
          })()}

      
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
                      if (err.message.includes('401') || err.message.includes('403') || err.response?.status === 401 || err.response?.status === 403) {
                        router.push('/auth/login')
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