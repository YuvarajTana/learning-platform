'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { projectsAPI } from '@/lib/api'

interface Project {
  id: number
  project_number: number
  title: string
  description: string | null
  concept: string
  phase: string
  difficulty: string
  estimated_time: number | null
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    projectsAPI.list()
      .then((response) => {
        setProjects(response.data.projects)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching projects:', error)
        setLoading(false)
      })
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'advanced':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'expert':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase.toLowerCase()) {
      case 'foundations':
        return 'bg-blue-50 text-blue-700'
      case 'intermediate':
        return 'bg-purple-50 text-purple-700'
      case 'advanced':
        return 'bg-orange-50 text-orange-700'
      case 'ai_ml':
        return 'bg-pink-50 text-pink-700'
      case 'capstone':
        return 'bg-yellow-50 text-yellow-700'
      default:
        return 'bg-gray-50 text-gray-700'
    }
  }

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.difficulty.toLowerCase() === filter)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-200 rounded w-1/3"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Learning Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Master software development through hands-on projects. Each project builds on the previous one, 
            gradually increasing in complexity.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-wrap gap-3"
        >
          {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                filter === level
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-200 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-primary-600 mb-1">{projects.length}</div>
            <div className="text-sm text-gray-600">Total Projects</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {projects.filter(p => p.difficulty.toLowerCase() === 'beginner').length}
            </div>
            <div className="text-sm text-gray-600">Beginner</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {projects.filter(p => p.difficulty.toLowerCase() === 'intermediate').length}
            </div>
            <div className="text-sm text-gray-600">Intermediate</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {projects.reduce((sum, p) => sum + (p.estimated_time || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Minutes</div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index % 6) }}
            >
              <Link
                href={`/projects/${project.id}`}
                className="block group h-full"
              >
                <div className="h-full bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-primary-300 transition-all duration-300 overflow-hidden">
                  {/* Card Header with gradient */}
                  <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4 border-b border-primary-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-primary-700">
                        Project {project.project_number}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full border font-medium ${getDifficultyColor(project.difficulty)}`}>
                        {project.difficulty}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {project.title}
                    </h2>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {project.description || 'No description available'}
                    </p>

                    {/* Concept Badge */}
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        {project.concept}
                      </span>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${getPhaseColor(project.phase)}`}>
                          {project.phase.replace('_', ' ')}
                        </span>
                      </div>
                      {project.estimated_time && (
                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">{project.estimated_time} min</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center text-primary-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                      Start Project
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

