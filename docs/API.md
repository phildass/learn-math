# API Documentation

This document describes the API patterns and data flows in the Learn Math application.

## Overview

The application uses Supabase for backend services, which provides:
- Authentication API
- Database (PostgreSQL)
- Row Level Security (RLS)
- Real-time subscriptions (optional)

## Authentication API

All authentication is handled through Supabase Auth.

### Sign Up

```typescript
import { supabase } from '@/lib/supabaseClient'

const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    data: {
      full_name: 'John Doe',
    },
  },
})
```

**Response:**
```typescript
{
  data: {
    user: {
      id: 'uuid',
      email: 'user@example.com',
      // ... other user fields
    },
    session: {
      access_token: 'token',
      refresh_token: 'token',
      // ...
    }
  },
  error: null
}
```

### Sign In

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
})
```

### Sign Out

```typescript
const { error } = await supabase.auth.signOut()
```

### Get Session

```typescript
const { data: { session } } = await supabase.auth.getSession()
```

### Auth State Changes

```typescript
const { data: { subscription } } = supabase.auth.onAuthStateChange(
  (event, session) => {
    if (event === 'SIGNED_IN') {
      // Handle sign in
    }
    if (event === 'SIGNED_OUT') {
      // Handle sign out
    }
  }
)

// Cleanup
subscription.unsubscribe()
```

## Database API

### Profiles

#### Get User Profile

```typescript
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single()
```

#### Update Profile

```typescript
const { error } = await supabase
  .from('profiles')
  .update({ full_name: 'New Name' })
  .eq('id', userId)
```

#### Get All Users (Admin only)

```typescript
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .order('created_at', { ascending: false })
```

#### Update User Role (Admin only)

```typescript
const { error } = await supabase
  .from('profiles')
  .update({ role: 'admin' })
  .eq('id', userId)
```

### Forum Threads

#### List All Threads

```typescript
const { data, error } = await supabase
  .from('forum_threads')
  .select(`
    *,
    profiles!forum_threads_author_fkey(full_name)
  `)
  .order('created_at', { ascending: false })
```

**Response:**
```typescript
[
  {
    id: 'uuid',
    title: 'Thread Title',
    author: 'user-uuid',
    created_at: '2024-01-01T00:00:00Z',
    profiles: {
      full_name: 'Author Name'
    }
  },
  // ...
]
```

#### Create Thread

```typescript
const { data, error } = await supabase
  .from('forum_threads')
  .insert([
    {
      title: 'New Thread',
      author: userId,
    },
  ])
  .select()
  .single()
```

#### Get Single Thread

```typescript
const { data, error } = await supabase
  .from('forum_threads')
  .select(`
    *,
    profiles!forum_threads_author_fkey(full_name)
  `)
  .eq('id', threadId)
  .single()
```

### Forum Posts

#### Get Posts for Thread

```typescript
const { data, error } = await supabase
  .from('forum_posts')
  .select(`
    *,
    profiles!forum_posts_author_fkey(full_name)
  `)
  .eq('thread_id', threadId)
  .order('created_at', { ascending: true })
```

#### Create Post

```typescript
const { error } = await supabase
  .from('forum_posts')
  .insert([
    {
      thread_id: threadId,
      content: 'Post content',
      author: userId,
    },
  ])
```

#### Get Post Count for Thread

```typescript
const { count } = await supabase
  .from('forum_posts')
  .select('*', { count: 'exact', head: true })
  .eq('thread_id', threadId)
```

## Row Level Security Policies

### Profiles Table

**View Policy:**
```sql
-- Anyone can view profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);
```

**Insert Policy:**
```sql
-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
```

**Update Policy:**
```sql
-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

### Forum Threads

**View Policy:**
```sql
-- Anyone can view threads
CREATE POLICY "Forum threads are viewable by everyone"
  ON forum_threads FOR SELECT
  USING (true);
```

**Create Policy:**
```sql
-- Authenticated users can create threads
CREATE POLICY "Authenticated users can create threads"
  ON forum_threads FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
```

**Update/Delete Policy:**
```sql
-- Users can update/delete own threads
CREATE POLICY "Users can update own threads"
  ON forum_threads FOR UPDATE
  USING (auth.uid() = author);
```

### Forum Posts

Similar to forum_threads with policies for:
- View: Everyone
- Create: Authenticated users
- Update/Delete: Own posts only

## Route Protection

### Middleware

The `src/middleware.ts` file protects routes:

```typescript
// Protected routes that require authentication
- /admin/* - Requires admin role
- /profile/* - Requires authentication
- /forum/* - Requires authentication
```

### Client-Side Protection

Components use `useEffect` to check authentication:

```typescript
useEffect(() => {
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/login')
    }
  }
  checkAuth()
}, [])
```

## Error Handling

### Standard Error Response

```typescript
{
  error: {
    message: 'Error description',
    details: 'Additional details',
    hint: 'Suggestion to fix',
    code: 'ERROR_CODE'
  }
}
```

### Common Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| `PGRST116` | Row not found | Check query filters |
| `23505` | Unique constraint violation | Record already exists |
| `42501` | Insufficient privileges | Check RLS policies |
| `invalid_credentials` | Auth failed | Check email/password |

## Rate Limiting

Supabase implements rate limiting:
- Anonymous requests: 100 req/hour
- Authenticated requests: 1000 req/hour

For production, consider:
- Implementing client-side debouncing
- Caching frequently accessed data
- Using pagination for large datasets

## Real-time Subscriptions (Optional)

Subscribe to table changes:

```typescript
const subscription = supabase
  .channel('forum_posts')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'forum_posts' },
    (payload) => {
      console.log('New post:', payload.new)
      // Update UI
    }
  )
  .subscribe()

// Cleanup
subscription.unsubscribe()
```

## Data Types

### User Profile

```typescript
interface Profile {
  id: string // UUID
  full_name: string
  role: 'user' | 'admin'
  created_at: string // ISO timestamp
  updated_at: string // ISO timestamp
}
```

### Forum Thread

```typescript
interface ForumThread {
  id: string // UUID
  title: string
  author: string // User UUID
  created_at: string // ISO timestamp
}
```

### Forum Post

```typescript
interface ForumPost {
  id: string // UUID
  thread_id: string // Thread UUID
  content: string
  author: string // User UUID
  created_at: string // ISO timestamp
}
```

## Best Practices

### Query Optimization

**Do:**
```typescript
// Use select to get only needed columns
.select('id, title, created_at')

// Use single() for one result
.single()

// Use pagination
.range(0, 9) // First 10 items
```

**Don't:**
```typescript
// Avoid selecting all columns when not needed
.select('*')

// Don't fetch all records at once
// Use pagination instead
```

### Security

1. **Always validate user input** on client and server
2. **Use RLS policies** to protect data
3. **Never expose service_role key** in client code
4. **Sanitize user-generated content** before display
5. **Use prepared statements** (Supabase does this automatically)

### Performance

1. **Create indexes** on frequently queried columns
2. **Use pagination** for large datasets
3. **Cache static data** on client
4. **Optimize images** with Next.js Image component
5. **Use CDN** for static assets (automatic with Vercel)

## Testing

### Testing Auth

```typescript
// Sign up test user
const { data } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'test123',
})

// Clean up
await supabase.auth.signOut()
```

### Testing Database

```typescript
// Create test data
const { data } = await supabase
  .from('profiles')
  .insert([{ id: testUserId, full_name: 'Test User' }])

// Clean up
await supabase
  .from('profiles')
  .delete()
  .eq('id', testUserId)
```

## Resources

- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
