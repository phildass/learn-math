# Learn Math - Interactive Mathematics Tutorial Platform

Learn the basics of math with ease through our comprehensive 10-module course covering topics from number systems to differential equations.

## Features

- **Centralized IIS Skills Cloud Authentication**: Secure authentication through IIS Skills Cloud central portal
- **10 Comprehensive Modules**: Each with detailed lessons, examples, and fun facts
- **Interactive Testing**: Test your knowledge with quizzes for each module (requires authentication)
- **Session Management**: Authentication persists across page refreshes
- **Responsive Design**: Works on desktop and mobile devices
- **SSO Ready**: Prepared for future single sign-on integration

## Installation & Local Deployment

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/phildass/learn-math.git
cd learn-math
```

2. Install dependencies:
```bash
npm install
```

3. The server will automatically create a `users.json` file when first run to store user data.

4. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

The application will be running on port 3000 by default.

## Usage

### Authentication

**All users must authenticate through IIS Skills Cloud:**

1. Visit the Learn Math application at your deployment URL
2. If not authenticated, you will be prompted to sign in through IIS Skills Cloud
3. Click on the provided link to be redirected to https://iiskills.cloud/register
4. Sign in with your existing IIS Skills Cloud account or create a new one
5. After authentication on IIS Skills Cloud, you can access the Learn Math application

**Note:** Local registration and login have been disabled. All user account management is handled centrally through IIS Skills Cloud for enhanced security and unified user experience.

### Accessing Content

1. After authentication, access all 10 mathematics modules
2. Click on any module to view lessons and examples
3. Take module tests to assess your knowledge (authentication required)

### Logout

Click the "Logout" button to end your session. You will be redirected to IIS Skills Cloud.

## Project Structure

```
learn-math/
├── server.js              # Express server with API endpoints
├── package.json           # Project dependencies
├── index.html             # Main application page (protected)
├── login.html             # Login and registration page
├── auth.js                # Client-side authentication logic
├── script.js              # Main application logic
├── styles.css             # Application styles
├── users.json             # User database (auto-created, not in git)
├── users.json.template    # Template for users database
└── .gitignore             # Git ignore file
```

## API Endpoints

### Authentication Endpoints (Modified)

- `POST /api/register` - **DISABLED** - Returns redirect URL to IIS Skills Cloud
- `POST /api/login` - **DISABLED** - Returns redirect URL to IIS Skills Cloud
- `POST /api/logout` - Logout current user session
- `GET /api/auth/status` - Check authentication status

**Note:** Local registration and login endpoints have been disabled. All authentication must go through IIS Skills Cloud centralized authentication system.

### Protected Endpoints

All endpoints below require authentication:

- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile  
- `POST /api/change-password` - Change password
- `POST /api/test-result` - Save test result
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/modules` - Get module data (admin only)

## Security Features

- **Centralized Authentication**: All authentication handled through IIS Skills Cloud
- **No Local Password Storage**: Passwords managed centrally for enhanced security
- **Session Management**: Secure session handling with express-session
- **Protected Routes**: Tutorial content and tests only accessible after authentication
- **Input Sanitization**: All user inputs are sanitized to prevent XSS attacks
- **SSO Ready**: Prepared for OAuth/SAML integration with IIS Skills Cloud

### Future SSO Integration

The application is prepared for future integration with IIS Skills Cloud Single Sign-On (SSO):
- OAuth 2.0 / SAML authentication flow
- Automatic user provisioning from IIS Skills Cloud
- Role-based access control (RBAC) from central identity provider
- Token-based authentication for API access

## Deployment to Production

For deployment on learnmath.iiskills.cloud:

1. Set up your production server with Node.js
2. Clone the repository on the server
3. Install dependencies: `npm install`
4. Set environment variables:
   ```bash
   export PORT=3000
   export NODE_ENV=production
   ```
5. For HTTPS in production, update session configuration in server.js:
   ```javascript
   cookie: { 
       secure: true,  // Set to true for HTTPS
       maxAge: 24 * 60 * 60 * 1000
   }
   ```
6. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js
   pm2 save
   pm2 startup
   ```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Authentication**: bcrypt, express-session
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Data Storage**: JSON file-based storage

## License

ISC
