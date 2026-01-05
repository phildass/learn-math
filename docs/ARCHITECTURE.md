# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Learn Math Platform                      │
│                    (iiskills-cloud)                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      Frontend Layer                          │
│                      (Next.js 14)                            │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Home    │  │  Login   │  │  Forum   │  │  Admin   │   │
│  │  Page    │  │  Pages   │  │  Pages   │  │  Panel   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Shared Components (LogoBar, Footer)          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Middleware (Route Protection)            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Supabase Client                           │
│                 (Authentication & DB)                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Supabase Cloud                          │
│                    (Backend as a Service)                    │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Auth Service │  │   Database   │  │  Row Level   │     │
│  │   (OAuth)    │  │ (PostgreSQL) │  │   Security   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  Tables:                                                     │
│  • profiles (users, roles)                                   │
│  • forum_threads                                             │
│  • forum_posts                                               │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Authentication Flow

```
User              Frontend           Middleware        Supabase
 │                   │                   │                │
 ├──1. Visit────────>│                   │                │
 │                   │                   │                │
 │                   ├──2. Check Auth───>│                │
 │                   │                   │                │
 │                   │                   ├──3. Verify────>│
 │                   │                   │                │
 │                   │                   │<─4. Session────┤
 │                   │                   │                │
 │                   │<─5. Allow/Deny────┤                │
 │                   │                   │                │
 │<──6. Page/Redirect─┤                   │                │
```

### Forum Interaction Flow

```
User              Component           Supabase DB        RLS Policies
 │                   │                   │                │
 ├──1. Create Thread>│                   │                │
 │                   │                   │                │
 │                   ├──2. Insert────────>│                │
 │                   │                   │                │
 │                   │                   ├──3. Check RLS──>│
 │                   │                   │                │
 │                   │                   │<─4. Allow/Deny─┤
 │                   │                   │                │
 │                   │<─5. Response──────┤                │
 │                   │                   │                │
 │<──6. Update UI────┤                   │                │
```

## Component Hierarchy

```
RootLayout
├── LogoBar
│   ├── Logo
│   ├── Navigation Links
│   └── User Menu
│
├── Main Content
│   ├── HomePage
│   │   └── Module Cards
│   │
│   ├── LoginPage
│   │   └── Login Form
│   │
│   ├── ForumPage
│   │   ├── Thread List
│   │   └── Create Thread Modal
│   │
│   ├── ThreadDetailPage
│   │   ├── Thread Header
│   │   ├── Posts List
│   │   └── Reply Form
│   │
│   ├── AdminPage
│   │   ├── Statistics Cards
│   │   └── User Table
│   │
│   └── ProfilePage
│       └── Profile Form
│
└── Footer
    ├── Links
    └── Copyright
```

## Technology Stack Layers

```
┌─────────────────────────────────────────┐
│          Deployment Layer                │
│  Vercel / Netlify / AWS Amplify          │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Application Layer                │
│  Next.js 14 (App Router)                 │
│  React 18 Server/Client Components       │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│           Styling Layer                  │
│  Tailwind CSS + Custom Theme             │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│          Type Safety Layer               │
│  TypeScript + ESLint                     │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Backend Layer                    │
│  Supabase (Auth + Database + RLS)        │
└─────────────────────────────────────────┘
```

## Security Model

```
┌─────────────────────────────────────────────────────┐
│                  Security Layers                     │
├─────────────────────────────────────────────────────┤
│                                                      │
│  1. Transport Layer                                  │
│     • HTTPS/TLS encryption                           │
│     • Secure WebSocket connections                   │
│                                                      │
│  2. Application Layer                                │
│     • Middleware route protection                    │
│     • Client-side auth checks                        │
│     • Role-based UI rendering                        │
│                                                      │
│  3. API Layer                                        │
│     • Supabase Auth tokens                           │
│     • JWT validation                                 │
│     • Session management                             │
│                                                      │
│  4. Database Layer                                   │
│     • Row Level Security (RLS) policies              │
│     • SQL injection prevention                       │
│     • Encrypted at rest                              │
│                                                      │
│  5. Input Validation                                 │
│     • TypeScript type checking                       │
│     • Form validation                                │
│     • Sanitization                                   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Deployment Architecture (Vercel)

```
┌─────────────────────────────────────────────────────────┐
│                    Global CDN Edge                       │
│              (Automatic SSL, DDoS protection)            │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  Vercel Edge Network                     │
│         (Serverless Functions, Static Assets)            │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Middleware │  │    Pages     │  │    API       │  │
│  │  (Protected  │  │  (Static/    │  │  (Implicit   │  │
│  │    Routes)   │  │   Dynamic)   │  │via Supabase) │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   Supabase Cloud                         │
│         (Database, Auth, Storage, Real-time)             │
└─────────────────────────────────────────────────────────┘
```

## Request Flow Example

### Authenticated Forum Post

```
1. User clicks "Post Reply"
   ↓
2. Client Component validates input
   ↓
3. Calls Supabase client: supabase.from('forum_posts').insert()
   ↓
4. Supabase client sends request with JWT token
   ↓
5. Supabase validates JWT
   ↓
6. RLS policy checks: "Is user authenticated?"
   ↓
7. RLS policy passes → Insert allowed
   ↓
8. Database inserts record
   ↓
9. Response sent back to client
   ↓
10. Component updates UI
    ↓
11. User sees new post
```

## Database Schema

```
┌─────────────────────────┐
│       auth.users        │  (Managed by Supabase)
│  • id (UUID)            │
│  • email                │
│  • encrypted_password   │
│  • created_at           │
└─────────────────────────┘
           │
           │ 1:1
           ↓
┌─────────────────────────┐
│       profiles          │
│  • id (UUID) [PK]       │
│  • full_name            │
│  • role (user/admin)    │
│  • created_at           │
│  • updated_at           │
└─────────────────────────┘
           │
           │ 1:N
           ↓
┌─────────────────────────┐
│    forum_threads        │
│  • id (UUID) [PK]       │
│  • title                │
│  • author (UUID) [FK]   │
│  • created_at           │
└─────────────────────────┘
           │
           │ 1:N
           ↓
┌─────────────────────────┐
│     forum_posts         │
│  • id (UUID) [PK]       │
│  • thread_id [FK]       │
│  • content              │
│  • author (UUID) [FK]   │
│  • created_at           │
└─────────────────────────┘
```

## Scalability Considerations

### Horizontal Scaling
- **Next.js**: Serverless functions scale automatically
- **Supabase**: Database connection pooling
- **CDN**: Global edge caching

### Performance Optimization
- **Static Generation**: Pre-rendered pages
- **Code Splitting**: Automatic by Next.js
- **Image Optimization**: Next.js Image component
- **Database Indexes**: On frequently queried columns

### Monitoring
- **Vercel Analytics**: Page views, performance
- **Supabase Logs**: Database queries, auth events
- **Error Tracking**: Browser console, server logs

## Future Enhancements

### Planned Features
```
┌──────────────────────────────────────┐
│  Phase 1: Module System               │
│  • Dynamic module pages               │
│  • Progress tracking                  │
│  • Quiz system                        │
└──────────────────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│  Phase 2: Enhanced Auth               │
│  • OAuth providers                    │
│  • Email verification                 │
│  • Password reset                     │
└──────────────────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│  Phase 3: Real-time Features         │
│  • Live forum updates                 │
│  • Presence indicators                │
│  • Notifications                      │
└──────────────────────────────────────┘
```

---

**This architecture provides:**
- ✅ Scalability
- ✅ Security
- ✅ Performance
- ✅ Maintainability
- ✅ Developer experience
