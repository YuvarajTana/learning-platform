import Link from 'next/link'

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Project not found
      </h1>
      <p className="text-gray-600 mb-8">
        The project you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/projects"
        className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
      >
        Back to projects
      </Link>
    </div>
  )
}

