export default function ProjectLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="h-10 bg-gray-200 rounded w-2/3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="h-24 bg-white border border-gray-100 rounded-xl shadow animate-pulse"
            />
          ))}
        </div>
        <div className="h-48 bg-white border border-gray-100 rounded-xl shadow animate-pulse" />
      </div>
    </div>
  )
}

