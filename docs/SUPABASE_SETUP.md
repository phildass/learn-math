# Supabase Setup Guide

This guide will help you set up Supabase for the Learn Math application.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Project name**: learn-math (or your preferred name)
   - **Database password**: Choose a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be ready (1-2 minutes)

## Step 2: Run Database Schema

1. In your Supabase project, click on "SQL Editor" in the left sidebar
2. Click "New query"
3. Copy the entire contents of `docs/supabase-schema.sql`
4. Paste into the SQL editor
5. Click "Run" or press Ctrl+Enter
6. Verify success (you should see "Success. No rows returned")

## Step 3: Get API Credentials

1. Click on "Settings" (gear icon) in the left sidebar
2. Click on "API" in the settings menu
3. Find these values:
   - **Project URL**: Under "Project URL" (looks like `https://xxxxx.supabase.co`)
   - **Anon Key**: Under "Project API keys" > "anon public"
4. Copy these values - you'll need them for the next step

## Step 4: Configure Environment Variables

1. In your project root, copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 5: Create Your First Admin User

1. Start your application:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/register`

3. Create a new account with your email and password

4. Go back to Supabase dashboard > Authentication

5. Find your user in the Users list

6. Copy your user ID (UUID format)

7. Go to SQL Editor and run:
   ```sql
   UPDATE profiles SET role = 'admin' WHERE id = 'your-user-id-here';
   ```

8. Log out and log back in to see the Admin panel in navigation

## Step 6: Verify Setup

Test the following features:

✅ **Authentication**
- Register a new user
- Login with credentials
- Logout

✅ **Forum**
- Create a new thread
- Post a reply
- View threads

✅ **Admin Panel** (with admin user)
- Access `/admin`
- View user list
- Change user role

## Troubleshooting

### "Invalid API key" Error
- Double-check your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Make sure there are no extra spaces or quotes
- Restart your dev server after changing `.env.local`

### "Relation does not exist" Error
- The schema wasn't run correctly
- Go back to Step 2 and run the schema again
- Check for any error messages in the SQL editor

### Can't access Admin Panel
- Make sure you updated the user role to 'admin' in Step 5
- Log out and log back in
- Check the profiles table to verify role is set to 'admin'

### Forum/Profile features not working
- Check browser console for errors
- Verify all tables were created (profiles, forum_threads, forum_posts)
- Check Row Level Security policies are enabled

## Database Tables Overview

After setup, you should have these tables:

1. **profiles** - User profiles and roles
2. **forum_threads** - Discussion threads
3. **forum_posts** - Thread replies

You can view and manage these in the Supabase dashboard under "Table Editor".

## Next Steps

- Customize the application branding
- Add more modules
- Configure email templates in Supabase
- Set up custom domain
- Deploy to production (see README.md)

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Next.js Documentation](https://nextjs.org/docs)
