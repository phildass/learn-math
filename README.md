# Learn Math - iiskills.cloud Platform

**Advanced Mathematics Tutorial Platform** - Part of the iiskills.cloud ecosystem

A modern, production-ready mathematics learning platform built with Next.js, React, and Supabase, featuring comprehensive authentication, role-based access control, and community forum.

## Features

- **Supabase Authentication**: Secure, scalable authentication with email/password
- **Role-Based Access Control (RBAC)**: Admin and user roles with protected routes
- **Admin Dashboard**: User management, role assignment, and platform analytics
- **Community Forum**: Discussion threads and posts for learner collaboration
- **10 Comprehensive Modules**: Mathematics topics from basics to advanced concepts
- **Responsive Design**: Mobile-first, modern UI with Tailwind CSS
- **iiskills.cloud Branding**: Consistent UI components and color themes

## Technologies

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom iiskills.cloud theme
- **Authentication**: Supabase Auth with Row Level Security (RLS)
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel-ready (or any Next.js compatible platform)

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Supabase account (free tier available)

## Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/phildass/iiskills-cloud/learn-math.git
cd learn-math
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up Supabase:**
   
   a. Create a new project at [supabase.com](https://supabase.com)
   
   b. In your Supabase project, go to SQL Editor and run the schema:
   ```bash
   # Copy contents from docs/supabase-schema.sql and run in SQL Editor
   ```
   
   c. Copy your Supabase credentials from Settings > API

4. **Configure environment variables:**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

5. **Create your first admin user:**
   
   After running the app, register a new user, then in Supabase SQL Editor:
   ```sql
   UPDATE profiles SET role = 'admin' WHERE id = 'your-user-id';
   ```
   You can find your user ID in the Supabase Authentication dashboard.

6. **Start the development server:**
```bash
npm run dev
```

7. **Open your browser:**
```
http://localhost:3000
```

## Usage

### Authentication

**All authentication is handled through Supabase:**

1. **Register**: Navigate to `/register` to create a new account
2. **Login**: Use `/login` to sign in with your credentials
3. **Logout**: Click the Logout button in the navigation bar

### Accessing Features

1. **Home**: Browse the 10 mathematics modules
2. **Forum**: Participate in community discussions (requires authentication)
   - Create new threads
   - Reply to existing threads
   - View all discussions
3. **Profile**: Manage your account settings (requires authentication)
4. **Admin Panel**: User management and platform administration (admin role only)

### Admin Panel

**Access**: Available at `/admin` (requires admin role)

**Features**:
- View all registered users
- Manage user roles (promote users to admin)
- View platform statistics
- Monitor user activity

## Project Structure

```
learn-math/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # Admin dashboard
│   │   ├── forum/             # Forum feature
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── profile/           # User profile
│   │   ├── layout.tsx         # Root layout with LogoBar & Footer
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable React components
│   │   ├── LogoBar.tsx        # Navigation bar
│   │   └── Footer.tsx         # Footer component
│   ├── lib/                   # Utility libraries
│   │   └── supabaseClient.ts  # Supabase configuration
│   └── middleware.ts          # Route protection middleware
├── docs/                      # Documentation
│   └── supabase-schema.sql    # Database schema
├── public/                    # Static assets
├── .env.example              # Environment variables template
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```

## Database Schema

The application uses Supabase with the following tables:

### profiles
- User profile information
- Role-based access control (user/admin)
- Links to auth.users

### forum_threads
- Discussion thread titles and metadata
- Author references
- Timestamps

### forum_posts
- Individual posts within threads
- Content and author information
- Thread relationships

**Full schema**: See `docs/supabase-schema.sql`

## API Routes & Features

### Authentication (Supabase)
- Email/password authentication
- Session management
- Protected routes via middleware

### Forum Features
- Create discussion threads
- Post replies
- View all threads and posts
- Real-time updates

### Admin Features
- View all users
- Manage user roles
- Platform statistics

## Security Features

- **Supabase Authentication**: Industry-standard OAuth 2.0 flows
- **Row Level Security (RLS)**: Database-level access control
- **Role-Based Access Control**: Admin and user separation
- **Protected Routes**: Middleware-based route protection
- **Secure Sessions**: HTTP-only cookies, CSRF protection
- **Environment Variables**: Sensitive data never committed to git

## Deployment

### Vercel (Recommended)

1. **Push your code to GitHub** (if not already done)

2. **Deploy to Vercel**:
   ```bash
   npm install -g vercel
   vercel
   ```

3. **Set environment variables** in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Deploy**:
   ```bash
   vercel --prod
   ```

### Other Platforms

The application is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Any platform supporting Next.js

## Development

### Running Locally
```bash
npm run dev        # Development server with hot reload
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint checking
```

### Environment Variables

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Migration from Old Version

The old Express.js version has been moved to `old-app/` directory for reference. To migrate existing users:

1. Export users from `old-app/users.json`
2. Create corresponding users in Supabase Auth
3. Update roles in `profiles` table
4. Migrate any module progress data if needed

## Contributing

This is part of the iiskills-cloud platform. For contributions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

ISC

## Support

For issues and questions:
- GitHub Issues: [Repository Issues](https://github.com/phildass/iiskills-cloud)
- Documentation: See `docs/` directory
- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)

---

**Part of iiskills.cloud Platform** - Advanced Mathematics Learning Platform
