import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the route is an admin route
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Check if user has admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role !== 'admin') {
      // Redirect to home if not admin
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Protect other routes that require authentication
  if (
    (req.nextUrl.pathname.startsWith('/profile') ||
      req.nextUrl.pathname.startsWith('/forum')) &&
    !session
  ) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*', '/forum/:path*'],
}
