# Quick Start Guide

Get the Learn Math platform running locally in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- Supabase account (free tier is fine)
- Git installed

## Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/phildass/learn-math.git
cd learn-math

# Install dependencies
npm install
```

## Step 2: Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor
3. Copy & paste the contents of `docs/supabase-schema.sql`
4. Click "Run"

## Step 3: Configure Environment

```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
nano .env.local  # or use your preferred editor
```

Add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these from: Supabase Dashboard > Settings > API

## Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 5: Create Admin User

1. Navigate to [http://localhost:3000/register](http://localhost:3000/register)
2. Create an account with your email
3. Go to Supabase Dashboard > Authentication > Users
4. Copy your user ID
5. Go to SQL Editor and run:
   ```sql
   UPDATE profiles SET role = 'admin' WHERE id = 'your-user-id';
   ```
6. Logout and login again
7. You should now see "Admin" in the navigation

## You're Done! 🎉

### What's Next?

**Test the features:**
- ✅ Create a forum thread
- ✅ Post a reply
- ✅ Access admin panel
- ✅ Manage user roles

**Deploy to production:**
- See `docs/DEPLOYMENT.md`

**Learn more:**
- API documentation: `docs/API.md`
- Full setup guide: `docs/SUPABASE_SETUP.md`

## Common Issues

### "supabaseUrl is required"
- Make sure `.env.local` exists
- Verify environment variable names are correct
- Restart dev server after changing env vars

### Can't access admin panel
- Make sure you updated your role in the database
- Logout and login again
- Check browser console for errors

### Database errors
- Verify schema was run successfully in Supabase
- Check RLS policies are enabled
- Review Supabase logs

## Need Help?

- 📖 Full documentation in `/docs` directory
- 🐛 Report issues on GitHub
- 💬 Ask in discussions

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/           # Pages (App Router)
├── components/    # React components
├── lib/           # Utilities
└── middleware.ts  # Route protection

docs/              # Documentation
```

## Tech Stack

- **Framework**: Next.js 14
- **UI**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase
- **Deployment**: Vercel

---

**Happy coding!** 🚀
