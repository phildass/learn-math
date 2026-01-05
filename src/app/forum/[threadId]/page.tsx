'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

interface Post {
  id: string
  content: string
  author: string
  author_name: string
  created_at: string
}

interface Thread {
  id: string
  title: string
  author: string
  author_name: string
  created_at: string
}

export default function ThreadPage() {
  const params = useParams()
  const router = useRouter()
  const threadId = params.threadId as string

  const [thread, setThread] = useState<Thread | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [newPostContent, setNewPostContent] = useState('')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    checkUser()
    loadThread()
    loadPosts()
  }, [threadId])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setUser(session?.user)
  }

  const loadThread = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_threads')
        .select(`
          *,
          profiles!forum_threads_author_fkey(full_name)
        `)
        .eq('id', threadId)
        .single()

      if (error) throw error

      setThread({
        ...data,
        author_name: data.profiles?.full_name || 'Unknown',
      })
    } catch (error: any) {
      console.error('Error loading thread:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .select(`
          *,
          profiles!forum_posts_author_fkey(full_name)
        `)
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true })

      if (error) throw error

      setPosts(
        (data || []).map((post) => ({
          ...post,
          author_name: post.profiles?.full_name || 'Unknown',
        }))
      )
    } catch (error: any) {
      console.error('Error loading posts:', error)
    }
  }

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      alert('Please login to post')
      return
    }

    try {
      const { error } = await supabase.from('forum_posts').insert([
        {
          thread_id: threadId,
          content: newPostContent,
          author: user.id,
        },
      ])

      if (error) throw error

      setNewPostContent('')
      loadPosts()
    } catch (error: any) {
      alert('Failed to post: ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <p>Thread not found</p>
          <Link href="/forum" className="text-primary-600 hover:underline">
            Back to Forum
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/forum"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          ← Back to Forum
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {thread.title}
          </h1>
          <div className="text-sm text-gray-500">
            Started by {thread.author_name} on{' '}
            {new Date(thread.created_at).toLocaleString()}
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                    {post.author_name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-gray-900">
                      {post.author_name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {user ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Post a Reply
            </h2>
            <form onSubmit={handleSubmitPost}>
              <textarea
                required
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 mb-4"
                placeholder="Write your reply..."
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Post Reply
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-700 mb-4">
              Please login to post a reply
            </p>
            <Link
              href="/login"
              className="inline-block px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
