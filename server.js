const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Protect sensitive files from being served
app.use((req, res, next) => {
    const sensitiveFiles = ['users.json', 'package.json', 'package-lock.json', 'server.js'];
    const requestedFile = path.basename(req.path);
    
    if (sensitiveFiles.includes(requestedFile)) {
        return res.status(403).send('Forbidden');
    }
    next();
});

app.use(express.static(__dirname));

// Session configuration
// Note: For production, set cookie.secure to true when using HTTPS
// Note: For production with state-changing operations, consider adding CSRF protection using csurf package
app.use(session({
    secret: 'learn-math-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Set to true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true, // Prevent client-side JS from accessing the cookie
        sameSite: 'strict' // CSRF protection
    }
}));

// Helper functions
function readUsers() {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, create it with empty array
        if (error.code === 'ENOENT') {
            writeUsers([]);
            return [];
        }
        return [];
    }
}

function writeUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input.replace(/[<>]/g, '').trim();
}

// API Routes
// Note: For production deployment, add rate limiting middleware to prevent brute force attacks
// Example: npm install express-rate-limit

// Register endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { name, dateOfBirth, email, location, password } = req.body;

        // Validate required fields
        if (!name || !dateOfBirth || !email || !location || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }

        // Sanitize inputs
        const sanitizedName = sanitizeInput(name);
        const sanitizedEmail = sanitizeInput(email);
        const sanitizedLocation = sanitizeInput(location);

        // Validate email format
        if (!validateEmail(sanitizedEmail)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email format' 
            });
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).json({ 
                success: false, 
                message: 'Password must be at least 6 characters long' 
            });
        }

        const users = readUsers();

        // Check if email already exists
        if (users.find(u => u.email === sanitizedEmail)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email already registered' 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name: sanitizedName,
            dateOfBirth,
            email: sanitizedEmail,
            location: sanitizedLocation,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        writeUsers(users);

        res.json({ 
            success: true, 
            message: 'Registration successful! Please login.' 
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error during registration' 
        });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email and password are required' 
            });
        }

        const sanitizedEmail = sanitizeInput(email);
        const users = readUsers();
        const user = users.find(u => u.email === sanitizedEmail);

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        // Set session
        req.session.userId = user.id;
        req.session.userName = user.name;
        req.session.userEmail = user.email;

        res.json({ 
            success: true, 
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error during login' 
        });
    }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Error logging out' 
            });
        }
        res.json({ 
            success: true, 
            message: 'Logged out successfully' 
        });
    });
});

// Check authentication status
app.get('/api/auth/status', (req, res) => {
    if (req.session.userId) {
        res.json({ 
            authenticated: true,
            user: {
                name: req.session.userName,
                email: req.session.userEmail
            }
        });
    } else {
        res.json({ 
            authenticated: false 
        });
    }
});

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Learn Math server running on http://localhost:${PORT}`);
});
