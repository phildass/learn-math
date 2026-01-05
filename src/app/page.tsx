import Link from 'next/link'

export default function Home() {
  return (
    <div className="gradient-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to Learn Math
          </h1>
          <p className="text-xl text-white opacity-90">
            Advanced Mathematics Tutorial Platform - Part of iiskills.cloud
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Module Cards */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((moduleNum) => (
            <div key={moduleNum} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Module {moduleNum}
              </h3>
              <p className="text-gray-600 mb-4">
                Learn advanced mathematical concepts and techniques
              </p>
              <Link
                href={`/modules/${moduleNum}`}
                className="inline-block px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Start Learning
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-600 mb-6">
            Connect with other learners, ask questions, and share your knowledge in our forum
          </p>
          <Link
            href="/forum"
            className="inline-block px-6 py-3 bg-secondary-600 text-white rounded-md hover:bg-secondary-700 font-medium"
          >
            Visit Forum
          </Link>
        </div>
      </div>
    </div>
  )
}
