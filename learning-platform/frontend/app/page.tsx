import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Learning Platform
        </h1>
        <p className="text-xl text-center mb-12 text-gray-600">
          Progressive Project-Based Learning Platform
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/dashboard"
            className="p-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
            <p className="text-gray-600">Track your learning progress</p>
          </Link>
          
          <Link
            href="/projects"
            className="p-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Projects</h2>
            <p className="text-gray-600">Browse all learning projects</p>
          </Link>
          
          <Link
            href="/login"
            className="p-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Login</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </Link>
          
          <Link
            href="/register"
            className="p-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">Register</h2>
            <p className="text-gray-600">Create a new account</p>
          </Link>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Start your learning journey today!
          </p>
        </div>
      </div>
    </main>
  )
}

