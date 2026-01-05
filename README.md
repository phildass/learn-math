# Learn Math - iiskills.cloud Platform

**AI-Powered Mathematics Education Platform** - Part of the iiskills.cloud ecosystem

A production-ready mathematics learning platform built with Next.js, React, TypeScript, and Supabase. Featuring comprehensive Supabase-only authentication, advanced RBAC, AI-generated curriculum aligned with Indian academic standards, and full feature parity with other iiskills-cloud domains.

## 🌟 Platform Alignment

This platform is fully aligned with **iiskills-cloud standards** and matches the feature set of:
- learn-pr (Public Relations)
- learn-management (Management)
- learn-leadership (Leadership)
- learn-ai (Artificial Intelligence)

## ✨ Key Features

### Authentication & Security
- **100% Supabase Authentication**: No local/server-side auth - all authentication through Supabase Auth
- **Zero Legacy Code**: Fully migrated from file-based authentication
- **Role-Based Access Control (RBAC)**: Comprehensive admin/user role management
- **Row Level Security (RLS)**: Database-level security policies
- **Protected Routes**: Middleware-based route protection

### AI-Powered Education
- **AI-Generated Curriculum**: All modules and quizzes created using advanced AI
- **Indian Academic Standards**: Aligned with CBSE, ICSE, and NEP 2020
- **EdTech Best Practices**: Industry-standard educational technology
- **10 Comprehensive Modules**: From basics to advanced mathematics

### Advanced Features
- **Dynamic Math/EdTech News**: Stay updated with latest developments
- **Career Opportunities**: Live job listings for mathematics professionals
- **Support & Counseling**: 24/7 counselor support system
- **Level-Based Onboarding**: Personalized learning path assessment
- **Community Forum**: Discussion threads and collaborative learning
- **Admin Dashboard**: Full RBAC with user management and analytics

### User Experience
- **Modern UI/UX**: Responsive design matching iiskills-cloud standards
- **Level Assessment**: Personalized onboarding flow
- **Progress Tracking**: Monitor learning journey
- **Mobile-First**: Optimized for all devices

## Technologies

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom iiskills.cloud theme
- **Authentication**: Supabase Auth (100% - no local auth)
- **Database**: Supabase (PostgreSQL) with RLS
- **Deployment**: Vercel-ready (or any Next.js compatible platform)

## Quick Links

- **Home**: Browse AI-generated modules and features
- **News**: Latest math and EdTech developments
- **Jobs**: Career opportunities for math professionals
- **Support**: 24/7 counselor support
- **Forum**: Community discussions (requires login)
- **Onboarding**: Personalized level assessment
- **Admin Panel**: User management with RBAC (admin only)

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Supabase account (free tier available)

## Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/phildass/learn-math.git
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

### Authentication (100% Supabase)

**All authentication is handled exclusively through Supabase - no local/server-side auth:**

1. **Register**: Navigate to `/register` to create a new account via Supabase Auth
2. **Login**: Use `/login` to sign in with Supabase credentials
3. **Logout**: Click the Logout button (handled by Supabase)
4. **Onboarding**: Complete `/onboarding` for personalized experience

### Core Features

1. **Home**: Browse AI-generated mathematics modules
2. **News**: View latest math and EdTech news
3. **Jobs**: Explore career opportunities
4. **Support**: Contact counselors for help
5. **Forum**: Participate in community discussions (requires authentication)
   - Create new threads
   - Reply to existing threads
   - View all discussions
6. **Profile**: Manage your account settings (requires authentication)
7. **Admin Panel**: User management and platform administration (admin role only)

### Admin Panel (RBAC)

**Access**: Available at `/admin` (requires admin role)

**Features**:
- View all registered users with advanced filtering
- Manage user roles (promote users to admin)
- View comprehensive platform statistics
- Monitor user activity and onboarding status
- Search and filter users
- Full RBAC implementation with Supabase RLS

## AI-Generated Content

### Curriculum Standards

All educational content in this platform is **AI-generated** and aligned with:

- **CBSE** (Central Board of Secondary Education) standards
- **ICSE** (Indian Certificate of Secondary Education) standards
- **NEP 2020** (National Education Policy 2020) guidelines
- **EdTech Best Practices**: Industry-standard educational technology

### Content Quality

- **Modules**: 10 comprehensive modules covering mathematics from basics to advanced
- **Quizzes**: AI-generated assessments aligned with Indian academic standards
- **Curriculum Design**: Follows progressive learning pathways
- **Regular Updates**: Content refreshed to match latest educational standards

## Project Structure

```
learn-math/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # Admin dashboard with RBAC
│   │   ├── forum/             # Community forum
│   │   ├── jobs/              # Career opportunities
│   │   ├── news/              # Math/EdTech news
│   │   ├── onboarding/        # Level assessment
│   │   ├── support/           # Counselor support
│   │   ├── login/             # Supabase login
│   │   ├── register/          # Supabase registration
│   │   ├── profile/           # User profile
│   │   ├── layout.tsx         # Root layout with LogoBar & Footer
│   │   ├── page.tsx           # Enhanced home page
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable React components
│   │   ├── LogoBar.tsx        # Navigation bar
│   │   └── Footer.tsx         # Footer component
│   ├── lib/                   # Utility libraries
│   │   └── supabaseClient.ts  # Supabase configuration
│   └── middleware.ts          # Route protection middleware
├── docs/                      # Documentation
│   ├── supabase-schema.sql    # Enhanced database schema
│   ├── SUPABASE_SETUP.md      # Setup guide
│   ├── DEPLOYMENT.md          # Deployment guide
│   ├── API.md                 # API reference
│   └── MIGRATION.md           # Migration guide
├── public/                    # Static assets
├── .env.example              # Environment variables template
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```

## Database Schema

The application uses Supabase with the following enhanced tables:

### profiles
- User profile information with email
- Role-based access control (user/admin)
- Onboarding data (level, interests, goals)
- Links to auth.users
- Enhanced RLS policies for RBAC

### forum_threads
- Discussion thread titles and metadata
- Author references
- Timestamps

### forum_posts
- Individual posts within threads
- Content and author information
- Thread relationships

**Full schema**: See `docs/supabase-schema.sql`

## Security & RBAC

### Authentication
- **100% Supabase Auth**: All authentication through Supabase - no local/legacy auth
- **No users.json**: Fully migrated from file-based authentication
- **Session Management**: Automatic refresh, HTTP-only cookies
- **Protected Routes**: Middleware-based route protection

### Role-Based Access Control (RBAC)
- **Two Roles**: Admin and User
- **Admin Capabilities**:
  - User management
  - Role assignment
  - Platform statistics
  - Full dashboard access
- **User Capabilities**:
  - Learning modules
  - Forum participation
  - Profile management
  - Support access

### Database Security
- **Row Level Security (RLS)**: Enabled on all tables
- **Granular Policies**: Read/write operations controlled
- **User Data Protection**: Users can only modify their own data
- **Admin Override**: Admins can manage user roles via secure policies
- **Environment Variables**: Sensitive data never committed to git

## iiskills-cloud Alignment

This platform matches feature parity with other iiskills-cloud domains:

### Shared Features
✅ Supabase-only authentication (no local auth)
✅ Advanced RBAC implementation
✅ Dynamic news section
✅ Live jobs/opportunities
✅ Support/counselor system
✅ Level-based onboarding
✅ Admin dashboard with analytics
✅ Community forum
✅ AI-generated content
✅ Responsive UI/UX
✅ Comprehensive documentation

### Domain-Specific
- **Mathematics Education**: Specialized for math curriculum
- **Indian Academic Standards**: CBSE, ICSE, NEP 2020 alignment
- **Math Career Focus**: Jobs tailored for mathematics professionals
- **EdTech News**: Math and educational technology updates

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
