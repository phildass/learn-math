# Deployment Guide

This guide covers deploying the Learn Math application to production.

## Deploying to Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

### Prerequisites

1. GitHub account with your repository
2. Vercel account (sign up at https://vercel.com)
3. Supabase project set up (see `SUPABASE_SETUP.md`)

### Steps

#### 1. Prepare Your Repository

Ensure your code is pushed to GitHub:
```bash
git push origin main
```

#### 2. Import to Vercel

1. Go to https://vercel.com/new
2. Click "Import" next to your repository
3. Vercel will auto-detect Next.js settings

#### 3. Configure Environment Variables

In the Vercel dashboard, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Important**: Get these from your Supabase project dashboard > Settings > API

#### 4. Deploy

1. Click "Deploy"
2. Wait 1-2 minutes for build to complete
3. Visit your deployment URL

#### 5. Set Up Custom Domain (Optional)

1. In Vercel dashboard, go to Settings > Domains
2. Add your custom domain (e.g., `learnmath.iiskills.cloud`)
3. Follow DNS configuration instructions
4. Vercel automatically provisions SSL certificate

### Vercel Configuration File (Optional)

Create `vercel.json` for advanced configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

## Deploying to Other Platforms

### Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build your app:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

4. **Set environment variables** in Netlify dashboard

### AWS Amplify

1. Connect your GitHub repository
2. Select the branch to deploy
3. Set build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
4. Add environment variables
5. Deploy

### Digital Ocean App Platform

1. Create a new app from GitHub
2. Select your repository
3. Configure:
   - Environment: Node.js
   - Build command: `npm run build`
   - Run command: `npm start`
4. Add environment variables
5. Deploy

## Environment Variables

All platforms require these environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGc...` |

⚠️ **Security Note**: Never commit `.env.local` to git. Use platform-specific environment variable features.

## Post-Deployment Checklist

After deploying, verify:

- [ ] Application loads at your domain
- [ ] Can register a new user
- [ ] Can login
- [ ] Can access protected routes (forum, profile)
- [ ] Admin panel accessible (for admin users)
- [ ] Forum features work (create thread, post)
- [ ] SSL certificate is active (HTTPS)
- [ ] Mobile responsive design works

## Monitoring and Analytics

### Vercel Analytics

Enable analytics in Vercel dashboard:
1. Go to your project
2. Click Analytics tab
3. Enable Web Analytics

### Supabase Monitoring

Monitor database in Supabase dashboard:
1. Database > Logs
2. Database > Performance
3. Auth > Users (monitor registrations)

## Troubleshooting

### Build Errors

**"supabaseUrl is required"**
- Solution: Add environment variables in deployment platform
- Verify values are correct

**"Module not found"**
- Solution: Run `npm install` locally
- Commit `package-lock.json`
- Redeploy

### Runtime Errors

**Authentication not working**
- Check environment variables are set correctly
- Verify Supabase project URL and key
- Check Supabase project is not paused

**Forum/Database errors**
- Verify database schema is applied in Supabase
- Check Row Level Security policies
- Review Supabase logs

## Scaling Considerations

### Database

- Supabase free tier: 500 MB database, 2 GB bandwidth
- For production: Upgrade to Pro plan
- Consider read replicas for high traffic

### Vercel

- Free tier: 100 GB bandwidth
- For production: Pro plan
- Consider edge functions for API routes

### CDN

- Vercel includes CDN automatically
- Static assets are cached globally
- Images are automatically optimized

## CI/CD Pipeline

For automated deployments:

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      # Deploy step depends on your platform
```

## Backup Strategy

### Database Backups

Supabase automatically backs up your database:
- Daily backups on Pro plan
- Point-in-time recovery available

Manual backup:
1. Supabase dashboard > Database > Backups
2. Click "Create Backup"
3. Download SQL dump

### Code Backups

- Code is in GitHub (version controlled)
- Vercel keeps deployment history
- Can rollback to previous deployments

## Cost Estimates

### Free Tier (Suitable for testing)
- Vercel: Free
- Supabase: Free (up to 500MB database)
- **Total: $0/month**

### Production (Small scale)
- Vercel Pro: $20/month
- Supabase Pro: $25/month
- Custom domain: ~$12/year
- **Total: ~$45/month**

### Enterprise (Large scale)
- Vercel Enterprise: Custom pricing
- Supabase Team: $599/month
- CDN: Variable
- **Contact sales for quote**

## Support

For deployment issues:
- Vercel: https://vercel.com/support
- Supabase: https://supabase.com/support
- Next.js: https://github.com/vercel/next.js/discussions

## Update Deployment

To update after changes:

```bash
git add .
git commit -m "Update description"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build the new version
3. Deploy to production
4. Zero-downtime deployment
