'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is authenticated by looking for token in localStorage
    const token = localStorage.getItem('access_token')
    setIsAuthenticated(!!token)
    
    // Listen for storage changes to handle login/logout in other tabs
    const handleStorageChange = () => {
      const token = localStorage.getItem('access_token')
      setIsAuthenticated(!!token)
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    };
  }, [])

  const isActive = (path: string) => {
    return pathname === path ? 'text-primary-600 font-semibold' : 'text-gray-600 hover:text-primary-600'
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    
    // Dispatch a storage event to notify other components of the change
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'access_token',
      oldValue: 'some_value', // oldValue is required but not critical
      newValue: null,
    }));
    
    window.location.href = '/';
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                Learning Platform
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/dashboard"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/dashboard'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/projects"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname?.startsWith('/projects')
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Projects
              </Link>
              <Link
                href="/demo"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/demo'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Interactive Demo
              </Link>
              <Link
                href="/concepts"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/concepts'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Concepts
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 text-sm">Welcome!</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="ml-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
