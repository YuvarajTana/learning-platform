'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { progressAPI, projectsAPI } from '@/lib/api'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    notStarted: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      projectsAPI.list(),
      progressAPI.list(),
    ])
      .then(([projectsRes, progressRes]) => {
        const total = projectsRes.data.total
        const progress = progressRes.data
        
        const completed = progress.filter((p: any) => p.status === 'completed').length
        const inProgress = progress.filter((p: any) => p.status === 'in_progress').length
        
        setStats({
          total,
          completed,
          inProgress,
          notStarted: total - progress.length,
        })
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  const completionPercentage = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Projects</h3>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          
          <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Completed</h3>
            <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
          </div>
          
          <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-2">In Progress</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
          </div>
          
          <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Not Started</h3>
            <p className="text-3xl font-bold text-gray-400">{stats.notStarted}</p>
          </div>
        </div>
        
        <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Overall Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-primary-600 h-4 rounded-full transition-all"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{completionPercentage}% Complete</p>
        </div>
        
        <div className="flex gap-4">
          <Link
            href="/projects"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Browse Projects
          </Link>
        </div>
      </div>
    </div>
  )
}

