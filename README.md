# Learn Math - Interactive Mathematics Tutorial Platform

Learn the basics of math with ease through our comprehensive 10-module course covering topics from number systems to differential equations.

## Features

- **User Authentication System**: Secure registration and login required to access content
- **10 Comprehensive Modules**: Each with detailed lessons, examples, and fun facts
- **Interactive Testing**: Test your knowledge with quizzes for each module
- **Session Management**: Your login session persists across page refreshes
- **Responsive Design**: Works on desktop and mobile devices

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

### First Time Users

1. Click on "Register here" on the login page
2. Fill in all required fields:
   - Name
   - Date of Birth
   - Email (must be valid email format)
   - Location
   - Password (minimum 6 characters)
3. Click "Register"
4. After successful registration, you'll be redirected to login

### Returning Users

1. Enter your email and password
2. Click "Login"
3. Access all 10 mathematics modules

### Logout

Click the "Logout" button in the top-right corner to end your session.

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

- `POST /api/register` - Register a new user
- `POST /api/login` - Login with credentials
- `POST /api/logout` - Logout current user
- `GET /api/auth/status` - Check authentication status

## Security Features

- **Password Hashing**: Uses bcrypt to hash passwords before storage
- **Input Sanitization**: All user inputs are sanitized to prevent XSS attacks
- **Email Validation**: Validates email format before registration
- **Session Management**: Secure session handling with express-session
- **Protected Routes**: Tutorial content only accessible after authentication

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
