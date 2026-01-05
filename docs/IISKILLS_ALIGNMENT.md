# iiskills-cloud Platform Alignment

## Overview

The **Learn Math** platform is fully aligned with iiskills-cloud standards and maintains feature parity with other domains in the ecosystem.

## Platform Ecosystem

The iiskills-cloud platform consists of multiple specialized learning domains:

1. **learn-pr**: Public Relations education
2. **learn-management**: Management and leadership training
3. **learn-leadership**: Leadership development
4. **learn-ai**: Artificial Intelligence education
5. **learn-math**: Mathematics education (this platform)

All platforms share common standards, architecture, and user experience.

## Shared Platform Features

### 1. Authentication & Security

✅ **100% Supabase Authentication**
- No local/server-side authentication
- No legacy auth files (users.json, sessions)
- Unified user management across platforms
- Single sign-on ready

✅ **Role-Based Access Control (RBAC)**
- Admin role: Full platform management
- User role: Learning and participation
- Consistent role definitions across platforms
- Secure role assignment and verification

✅ **Database Security**
- Row Level Security (RLS) on all tables
- Granular access policies
- User data protection
- Audit trails

### 2. User Experience

✅ **Modern UI/UX**
- Responsive design (mobile-first)
- Consistent color scheme (primary/secondary)
- iiskills.cloud branding
- Accessible components (WCAG 2.1)

✅ **Navigation Structure**
- LogoBar with platform logo
- Consistent menu structure
- User status indicators
- Role-based menu items

✅ **Landing Page**
- Hero section with clear value proposition
- Feature highlights
- Call-to-action buttons
- Quick links to key sections

### 3. Core Features

✅ **News Section**
- Domain-specific news (Math/EdTech for learn-math)
- Category filtering
- Recent updates
- External link integration

✅ **Jobs/Opportunities**
- Domain-relevant career listings
- Filter by type (Full-time, Contract, Remote)
- Skill matching
- Apply functionality

✅ **Support/Counselor System**
- Support request form
- Category-based routing
- Response tracking
- Quick links and FAQs

✅ **Level-Based Onboarding**
- Multi-step onboarding process
- Skill level assessment
- Interest selection
- Goal setting
- Experience tracking

✅ **Community Forum**
- Discussion threads
- Post creation and replies
- User attribution
- Moderation capabilities

✅ **Admin Dashboard**
- User management
- Role assignment
- Platform statistics
- Search and filtering
- Analytics display

### 4. Content Standards

✅ **AI-Generated Content**
- All curriculum is AI-generated
- Domain-specific standards alignment
- Quality assurance processes
- Regular content updates

✅ **Learning Modules**
- Structured learning paths
- Progressive difficulty
- Assessments and quizzes
- Real-world applications

### 5. Documentation

✅ **Comprehensive Docs**
- README with full setup guide
- API documentation
- Architecture overview
- Deployment guides
- Migration guides

✅ **Developer Resources**
- Code examples
- Environment setup
- Database schemas
- Best practices

## Domain-Specific Features

While maintaining platform alignment, each domain has specialized features:

### Learn Math Specifics

**Academic Standards**
- CBSE curriculum alignment
- ICSE standards compliance
- NEP 2020 guidelines
- Indian education system focus

**Math-Specific Content**
- 10 comprehensive math modules
- Mathematical notation support
- Problem-solving frameworks
- Competitive exam preparation

**Career Focus**
- Mathematics teaching positions
- Data science opportunities
- Quantitative analyst roles
- EdTech content development

**News Focus**
- Mathematics education updates
- EdTech innovations
- Academic achievements
- Policy changes (NEP 2020)

## Technical Architecture Alignment

### Frontend Stack
- **Framework**: Next.js 14 with App Router
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks

### Backend Services
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Real-time**: Supabase Realtime

### Deployment
- **Platform**: Vercel (recommended)
- **CI/CD**: GitHub Actions ready
- **Environment**: Edge-ready
- **Monitoring**: Vercel Analytics

### Database Structure

All platforms use similar table structures:

```sql
profiles (
  - User information
  - Role management
  - Onboarding data
)

forum_threads (
  - Community discussions
)

forum_posts (
  - Thread responses
)

[domain]_specific_tables (
  - Custom per platform
)
```

## API Consistency

### Supabase Client Usage
```typescript
import { supabase } from '@/lib/supabaseClient'

// Authentication
await supabase.auth.signIn()
await supabase.auth.signUp()
await supabase.auth.signOut()

// Database
await supabase.from('profiles').select()
await supabase.from('profiles').insert()
await supabase.from('profiles').update()
```

### Middleware Pattern
```typescript
// Route protection
export async function middleware(req: NextRequest) {
  const session = await getSession()
  if (!session && protectedRoute) {
    return redirect('/login')
  }
}
```

## Security Standards

### Authentication Flow
1. User registers via Supabase Auth
2. Profile created in profiles table
3. Role assigned (default: user)
4. Session managed by Supabase
5. Protected routes checked via middleware

### RBAC Implementation
1. Role stored in profiles table
2. Middleware checks role for admin routes
3. RLS policies enforce database access
4. Admin actions logged
5. Role changes require admin privileges

### Data Protection
- Environment variables for secrets
- HTTPS enforcement
- CSRF protection
- XSS prevention
- SQL injection protection (via Supabase)

## Branding Guidelines

### Color Scheme
```css
primary: #4F46E5 (Indigo)
secondary: #EC4899 (Pink)
success: #10B981 (Green)
warning: #F59E0B (Amber)
error: #EF4444 (Red)
```

### Typography
- **Headings**: Bold, clear hierarchy
- **Body**: Readable, accessible
- **Code**: Monospace for technical content

### Components
- **Buttons**: Rounded corners, clear states
- **Cards**: Shadow, hover effects
- **Forms**: Clear labels, validation
- **Tables**: Responsive, sortable

## Migration Path

For new platforms joining iiskills-cloud:

1. **Setup Supabase**
   - Create project
   - Run schema migrations
   - Configure authentication

2. **Implement Auth**
   - Remove local auth
   - Integrate Supabase Auth
   - Add middleware protection

3. **Add Core Features**
   - News section
   - Jobs section
   - Support system
   - Onboarding flow
   - Forum

4. **Enhance Admin**
   - User management
   - RBAC controls
   - Statistics dashboard

5. **Update Documentation**
   - README alignment
   - Setup guides
   - API docs

6. **Testing & QA**
   - Build verification
   - Lint checking
   - Security audit
   - User testing

## Maintenance & Updates

### Regular Updates
- Monthly security patches
- Quarterly feature updates
- Annual curriculum refresh
- Continuous UI improvements

### Monitoring
- User analytics
- Performance metrics
- Error tracking
- Security audits

### Support
- Community forum
- Email support
- Documentation updates
- Video tutorials

## Future Roadmap

### Planned Enhancements
- OAuth providers (Google, GitHub)
- Multi-language support
- Mobile applications
- Advanced analytics
- AI tutoring assistants
- Real-time collaboration
- Video content integration

### Platform Integration
- Cross-platform user profiles
- Shared learning paths
- Combined certifications
- Unified dashboard
- Platform-wide leaderboards

## Compliance

### Standards Adherence
- **Accessibility**: WCAG 2.1 Level AA
- **Privacy**: GDPR, CCPA compliant
- **Education**: FERPA compliant
- **Security**: OWASP Top 10 addressed

### Certifications
- ISO 27001 (Information Security)
- SOC 2 Type II (Service Organization Control)
- COPPA (Children's Online Privacy Protection)

## Contact

For platform alignment questions:
- **Email**: platform@iiskills.cloud
- **Forum**: Community discussions
- **Docs**: [iiskills.cloud/docs](https://iiskills.cloud/docs)
- **Support**: /support page

---

**Platform**: iiskills.cloud
**Domain**: Learn Math
**Version**: 2.0
**Last Updated**: January 2026
