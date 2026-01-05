'use client'

import { useState, useEffect } from 'react'

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  experience: string
  skills: string[]
  description: string
  salary: string
  postedDate: string
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    // AI-generated job listings for mathematics professionals
    const jobData: Job[] = [
      {
        id: '1',
        title: 'Mathematics Teacher',
        company: 'Delhi Public School',
        location: 'Delhi, India',
        type: 'Full-time',
        experience: '2-5 years',
        skills: ['CBSE Curriculum', 'Classroom Management', 'Mathematics'],
        description: 'Seeking experienced mathematics teacher for secondary classes.',
        salary: '₹4-7 LPA',
        postedDate: '2026-01-03'
      },
      {
        id: '2',
        title: 'Data Analyst',
        company: 'TCS',
        location: 'Bangalore, India',
        type: 'Full-time',
        experience: '0-2 years',
        skills: ['Statistics', 'Python', 'Excel', 'SQL'],
        description: 'Entry-level data analyst position for mathematics graduates.',
        salary: '₹3.5-5 LPA',
        postedDate: '2026-01-02'
      },
      {
        id: '3',
        title: 'Quantitative Analyst',
        company: 'ICICI Bank',
        location: 'Mumbai, India',
        type: 'Full-time',
        experience: '3-6 years',
        skills: ['Financial Math', 'Risk Analysis', 'R', 'Python'],
        description: 'Quantitative analyst for risk management division.',
        salary: '₹8-15 LPA',
        postedDate: '2026-01-01'
      },
      {
        id: '4',
        title: 'EdTech Content Developer',
        company: "Byju's",
        location: 'Remote',
        type: 'Contract',
        experience: '1-3 years',
        skills: ['Mathematics', 'Content Writing', 'Curriculum Design'],
        description: 'Create engaging mathematics content for online learning platform.',
        salary: '₹4-6 LPA',
        postedDate: '2025-12-30'
      },
      {
        id: '5',
        title: 'Research Analyst',
        company: 'IIT Bombay',
        location: 'Mumbai, India',
        type: 'Full-time',
        experience: '0-1 years',
        skills: ['Applied Mathematics', 'Research', 'Programming'],
        description: 'Research position in applied mathematics department.',
        salary: '₹3-4.5 LPA',
        postedDate: '2025-12-28'
      }
    ]
    setJobs(jobData)
  }, [])

  const filteredJobs = filter === 'all' 
    ? jobs 
    : jobs.filter(job => job.type === filter)

  const jobTypes = ['all', 'Full-time', 'Contract', 'Remote']

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Math Career Opportunities
          </h1>
          <p className="text-lg text-gray-600">
            Explore career opportunities for mathematics professionals
          </p>
        </div>

        {/* Filter buttons */}
        <div className="mb-6 flex flex-wrap gap-2">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                filter === type
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Jobs list */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                      </svg>
                      {job.company}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {job.location}
                    </span>
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {job.type}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary-600 mb-1">
                    {job.salary}
                  </div>
                  <div className="text-sm text-gray-500">
                    {job.experience}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                {job.description}
              </p>

              <div className="mb-4">
                <span className="text-sm font-medium text-gray-700 mr-2">Skills:</span>
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 mr-2 mb-2 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Posted: {job.postedDate}</span>
                <button className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 font-medium">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
