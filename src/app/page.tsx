import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Master Mathematics with AI-Powered Learning
            </h1>
            <p className="text-xl md:text-2xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
              World-class mathematics education aligned with Indian academic standards and powered by advanced AI technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-white text-primary-600 rounded-md hover:bg-gray-100 font-semibold text-lg shadow-lg"
              >
                Get Started Free
              </Link>
              <Link
                href="/onboarding"
                className="px-8 py-4 bg-secondary-600 text-white rounded-md hover:bg-secondary-700 font-semibold text-lg shadow-lg"
              >
                Take Level Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose iiskills.cloud Math?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Generated Content</h3>
              <p className="text-gray-600">Curriculum and quizzes powered by advanced AI, aligned with CBSE and ICSE standards</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">10 Comprehensive Modules</h3>
              <p className="text-gray-600">From basics to advanced topics, structured for progressive learning</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600">24/7 counselor support and active community forum</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            AI-Powered Learning Modules
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            All modules and quizzes are AI-generated to match EdTech best practices and Indian academic standards
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((moduleNum) => (
              <div key={moduleNum} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Module {moduleNum}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                    AI-Generated
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Advanced mathematical concepts and techniques aligned with CBSE/ICSE curriculum
                </p>
                <Link
                  href={`/modules/${moduleNum}`}
                  className="inline-block px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  Start Learning →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Latest Math News
              </h3>
              <p className="text-gray-600 mb-6">
                Stay updated with mathematics and EdTech developments
              </p>
              <Link
                href="/news"
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 font-medium"
              >
                Read News
              </Link>
            </div>

            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Career Opportunities
              </h3>
              <p className="text-gray-600 mb-6">
                Explore jobs for mathematics professionals
              </p>
              <Link
                href="/jobs"
                className="inline-block px-6 py-3 bg-secondary-600 text-white rounded-md hover:bg-secondary-700 font-medium"
              >
                View Jobs
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Join Our Community
              </h3>
              <p className="text-gray-600 mb-6">
                Connect with learners and share knowledge
              </p>
              <Link
                href="/forum"
                className="inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
              >
                Visit Forum
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
