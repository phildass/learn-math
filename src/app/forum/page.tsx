'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

interface Thread {
  id: string
  title: string
  author: string
  author_name: string
  created_at: string
  post_count?: number
}

export default function ForumPage() {
  const router = useRouter()
  const [threads, setThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newThreadTitle, setNewThreadTitle] = useState('')
  const [newThreadContent, setNewThreadContent] = useState('')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    checkUser()
    loadThreads()
  }, [])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setUser(session?.user)
  }

  const loadThreads = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_threads')
        .select(`
          *,
          profiles!forum_threads_author_fkey(full_name)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Get post counts for each thread
      const threadsWithCounts = await Promise.all(
        (data || []).map(async (thread) => {
          const { count } = await supabase
            .from('forum_posts')
            .select('*', { count: 'exact', head: true })
            .eq('thread_id', thread.id)

          return {
            ...thread,
            author_name: thread.profiles?.full_name || 'Unknown',
            post_count: count || 0,
          }
        })
      )

      setThreads(threadsWithCounts)
    } catch (error: any) {
      console.error('Error loading threads:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      alert('Please login to create a thread')
      return
    }

    try {
      // Create thread
      const { data: thread, error: threadError } = await supabase
        .from('forum_threads')
        .insert([
          {
            title: newThreadTitle,
            author: user.id,
          },
        ])
        .select()
        .single()

      if (threadError) throw threadError

      // Create first post
      const { error: postError } = await supabase
        .from('forum_posts')
        .insert([
          {
            thread_id: thread.id,
            content: newThreadContent,
            author: user.id,
          },
        ])

      if (postError) throw postError

      setShowCreateModal(false)
      setNewThreadTitle('')
      setNewThreadContent('')
      loadThreads()
      router.push(`/forum/${thread.id}`)
    } catch (error: any) {
      alert('Failed to create thread: ' + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Forum</h1>
            {user && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Create Thread
              </button>
            )}
          </div>

          {loading ? (
            <p>Loading threads...</p>
          ) : threads.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No threads yet. Be the first to start a discussion!</p>
              {user && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Create First Thread
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {threads.map((thread) => (
                <Link
                  key={thread.id}
                  href={`/forum/${thread.id}`}
                  className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {thread.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>By {thread.author_name}</span>
                    <span>•</span>
                    <span>{new Date(thread.created_at).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{thread.post_count} replies</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Thread Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Thread</h2>
            <form onSubmit={handleCreateThread} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  value={newThreadTitle}
                  onChange={(e) => setNewThreadTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter thread title"
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  id="content"
                  required
                  value={newThreadContent}
                  onChange={(e) => setNewThreadContent(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Write your message..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Create Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
