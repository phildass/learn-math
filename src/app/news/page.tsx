'use client'

import { useState, useEffect } from 'react'

interface NewsItem {
  id: string
  title: string
  description: string
  date: string
  category: string
  link: string
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    // AI-generated math/EdTech news
    const newsData: NewsItem[] = [
      {
        id: '1',
        title: 'New AI-Powered Math Learning Tools Transform Education',
        description: 'Latest developments in AI-assisted mathematics education are helping students learn complex concepts more effectively.',
        date: '2026-01-04',
        category: 'EdTech',
        link: '#'
      },
      {
        id: '2',
        title: 'CBSE Introduces Updated Math Curriculum for 2026',
        description: 'Central Board of Secondary Education announces new mathematics framework aligned with NEP 2020 goals.',
        date: '2026-01-03',
        category: 'Curriculum',
        link: '#'
      },
      {
        id: '3',
        title: 'Indian Students Excel in International Math Olympiad',
        description: 'Team India secures top positions in the latest International Mathematical Olympiad competition.',
        date: '2026-01-02',
        category: 'Achievement',
        link: '#'
      },
      {
        id: '4',
        title: 'IIT Introduces Advanced Math Program for School Students',
        description: 'Leading technical institutes launch specialized mathematics program to nurture young talent.',
        date: '2026-01-01',
        category: 'Programs',
        link: '#'
      },
      {
        id: '5',
        title: 'Digital Math Resources Reach Rural Indian Schools',
        description: 'Government initiative brings interactive math learning platforms to underserved communities.',
        date: '2025-12-30',
        category: 'EdTech',
        link: '#'
      }
    ]
    setNews(newsData)
  }, [])

  const filteredNews = filter === 'all' 
    ? news 
    : news.filter(item => item.category === filter)

  const categories = ['all', 'EdTech', 'Curriculum', 'Achievement', 'Programs']

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Math & EdTech News
          </h1>
          <p className="text-lg text-gray-600">
            Stay updated with the latest developments in mathematics education and technology
          </p>
        </div>

        {/* Filter buttons */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                filter === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                  {item.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {item.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{item.date}</span>
                <a
                  href={item.link}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
