# Migration Guide from Express.js to Next.js

This document describes the migration from the old Express.js/vanilla JavaScript implementation to the new Next.js/React/Supabase implementation.

## What Changed

### Technology Stack

**Old Stack:**
- Backend: Express.js with file-based storage (users.json)
- Frontend: Vanilla HTML/CSS/JavaScript
- Auth: bcrypt with express-session
- Database: JSON files

**New Stack:**
- Framework: Next.js 14 with App Router
- Frontend: React 18 with TypeScript
- Styling: Tailwind CSS
- Auth: Supabase Authentication
- Database: Supabase (PostgreSQL)
- Deployment: Vercel-ready

### Architecture Changes

1. **Server-Side Rendering**: Pages are now server-rendered or statically generated
2. **API Routes**: Express routes replaced with Next.js API routes (implicit via Supabase)
3. **Component-Based**: UI is now component-based React instead of static HTML
4. **Type Safety**: Full TypeScript support throughout the application
5. **Modern Tooling**: Built-in development server, hot reload, and optimization

## Feature Comparison

| Feature | Old Implementation | New Implementation |
|---------|-------------------|-------------------|
| Authentication | Local (bcrypt) | Supabase Auth |
| User Storage | JSON file | PostgreSQL (Supabase) |
| Sessions | express-session | Supabase sessions |
| Admin Panel | Basic HTML | React dashboard with RBAC |
| Forum | Not implemented | Full forum with threads/posts |
| UI Components | Static HTML | Reusable React components |
| Styling | Custom CSS | Tailwind CSS |
| Routing | Express routes | Next.js App Router |

## New Features

### 1. Forum System
- Create discussion threads
- Post replies
- View all threads
- User attribution
- Timestamps

### 2. Enhanced Admin Panel
- User management
- Role assignment (user/admin)
- Platform statistics
- Responsive UI

### 3. Modern Authentication
- Email/password authentication via Supabase
- Secure session management
- Row Level Security (RLS)
- OAuth-ready (can add Google, GitHub, etc.)

### 4. iiskills-cloud Branding
- Consistent UI components (LogoBar, Footer)
- Brand color scheme
- Responsive design
- Professional appearance

## Migration Steps

### For Existing User Data

If you have existing users in the old `users.json` file:

1. **Export users from old system:**
   ```javascript
   const users = require('./old-app/users.json')
   console.log(JSON.stringify(users, null, 2))
   ```

2. **Create users in Supabase:**
   - Use Supabase dashboard > Authentication > Users
   - Or use Supabase Admin API to bulk create users

3. **Set admin roles:**
   ```sql
   UPDATE profiles SET role = 'admin' 
   WHERE id IN (
     SELECT id FROM auth.users 
     WHERE email IN ('admin@example.com', 'other-admin@example.com')
   );
   ```

### For Module Content

The math module content from `script.js` needs to be migrated:

1. **Create module pages:**
   ```bash
   mkdir -p src/app/modules/[moduleId]
   ```

2. **Create dynamic module page:**
   See example structure in `docs/module-migration-example.md`

3. **Extract module data:**
   - Copy module data from `old-app/script.js`
   - Convert to TypeScript interfaces
   - Store in database or static JSON

## Code Patterns

### Old Pattern (Express + Vanilla JS)
```javascript
// Server-side
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  // bcrypt validation
  req.session.userId = user.id
  res.json({ success: true })
})

// Client-side
fetch('/api/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
})
```

### New Pattern (Next.js + Supabase)
```typescript
// Component
'use client'
import { supabase } from '@/lib/supabaseClient'

const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
}
```

## Development Workflow

### Old Workflow
```bash
npm install
npm start
# Edit HTML/CSS/JS files
# Refresh browser
```

### New Workflow
```bash
npm install
npm run dev
# Edit .tsx files
# Hot reload automatically
npm run build  # Test production build
```

## Deployment

### Old Deployment
- Upload files to server
- Run `pm2 start server.js`
- Manage manually

### New Deployment
- Push to GitHub
- Connect to Vercel
- Automatic deployments
- Zero-config HTTPS

## File Structure Mapping

| Old Location | New Location | Notes |
|--------------|--------------|-------|
| `server.js` | `src/app/*/page.tsx` | Routes are now files |
| `index.html` | `src/app/page.tsx` | Home page |
| `login.html` | `src/app/login/page.tsx` | Login page |
| `admin-dashboard.html` | `src/app/admin/page.tsx` | Admin page |
| `styles.css` | `src/app/globals.css` | Global styles |
| `auth.js` | `src/lib/supabaseClient.ts` | Auth client |
| `users.json` | Supabase database | Managed by Supabase |

## Environment Variables

### Old
```bash
PORT=3000
NODE_ENV=production
```

### New
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

## Testing Checklist

After migration, verify:

- [ ] User registration works
- [ ] User login works
- [ ] Session persistence works
- [ ] Admin panel accessible (admin users only)
- [ ] Forum: Create thread
- [ ] Forum: Post reply
- [ ] Forum: View threads
- [ ] Profile page works
- [ ] Logout works
- [ ] Responsive design on mobile
- [ ] All navigation links work

## Rollback Plan

If you need to rollback:

1. The old Express.js code is available in git history:
   ```bash
   git checkout c8f2bad  # Last commit before migration
   ```

2. Old files are in `old-app/` directory (not in git)

3. User data in Supabase can be exported via dashboard

## Support and Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Setup Guide**: See `docs/SUPABASE_SETUP.md`

## Future Enhancements

Possible additions:
- OAuth providers (Google, GitHub)
- Email verification
- Password reset
- Module progress tracking
- Quiz/test system migration
- Real-time features (live chat)
- Mobile app (React Native)
