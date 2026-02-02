
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { progressAPI, projectsAPI } from '@/lib/api'
import { codeExecutionAPI } from '@/lib/codeApi'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    notStarted: 0,
  })
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on the client side
    console.log('=== Authentication Check ===');
    const token = localStorage.getItem('access_token');
    console.log('Auth token found:', !!token);
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('=== Dashboard Data Fetch ===');
        
        // Fetch projects (public data)
        const projectsRes = await projectsAPI.list()
        const total = Math.min(projectsRes.data.total, 5) // Cap at 5 projects
        
        // Check if user is authenticated
        const token = localStorage.getItem('access_token')
        console.log('Token found:', !!token);
        console.log('Token value:', token ? token.substring(0, 20) + '...' : 'null');
        
        if (!token) {
          console.log('No token - showing default stats');
          // Not logged in - show all as not started
          setStats({
            total,
            completed: 0,
            inProgress: 0,
            notStarted: total,
          })
          setLoading(false)
          return
        }
        
        // User is logged in - fetch progress data
        console.log('Fetching progress data...');
        try {
          const progressRes = await progressAPI.list()
          console.log('Progress response:', progressRes);
          const progressRecords = progressRes.data
          console.log('Progress records:', progressRecords);
          
          // Create a map of project_id to progress status
          const progressMap = new Map()
          progressRecords.forEach((p: any) => {
            progressMap.set(p.project_id, p)
          })
          
          // Calculate stats based on progress records
          let completed = 0
          let inProgress = 0
          let notStarted = 0
          
          // Check projects 1-5
          for (let projectId = 1; projectId <= 5; projectId++) {
            const progressRecord = progressMap.get(projectId)
            
            if (progressRecord) {
              if (progressRecord.status === 'completed') {
                completed++
              } else if (progressRecord.status === 'in_progress') {
                inProgress++
              } else {
                notStarted++
              }
            } else {
              // No progress record exists - consider as not started
              notStarted++
            }
          }
          
          console.log('Calculated stats:', { completed, inProgress, notStarted });
          
          setStats({
            total: 5,
            completed,
            inProgress,
            notStarted,
          })
          
        } catch (progressError) {
          console.error('Progress API error:', progressError);
          // If progress API fails, show default
          setStats({
            total: 5,
            completed: 0,
            inProgress: 0,
            notStarted: 5,
          })
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setStats({
          total: 0,
          completed: 0,
          inProgress: 0,
          notStarted: 0,
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
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
        
        {!isAuthenticated && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">
              <span className="font-semibold">Note:</span> Login to track your progress and save your learning journey.
              <Link href="/auth/login" className="ml-2 text-blue-600 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        )}
        
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
        

        
        <div className="flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Browse Projects
          </Link>
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              View Progress
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Login to Track Progress
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

