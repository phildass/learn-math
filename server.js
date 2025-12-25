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

// Initialize admin user if not exists
async function initializeAdmin() {
    const users = readUsers();
    const adminExists = users.find(u => u.email === 'admin@iiskills.cloud');
    
    if (!adminExists) {
        const hashedPassword = await bcrypt.hash('phil123', 10);
        const adminUser = {
            id: 'admin-' + Date.now().toString(),
            name: 'Administrator',
            email: 'admin@iiskills.cloud',
            password: hashedPassword,
            role: 'admin',
            createdAt: new Date().toISOString(),
            dateOfBirth: '1990-01-01',
            location: 'System',
            testResults: [],
            completedModules: []
        };
        users.push(adminUser);
        writeUsers(users);
        console.log('Admin user created with email: admin@iiskills.cloud and password: phil123');
    }
}

// Middleware to check if user is admin
function isAdmin(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    
    const users = readUsers();
    const user = users.find(u => u.id === req.session.userId);
    
    if (!user || user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Forbidden - Admin access required' });
    }
    
    next();
}

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized - Please login' });
    }
    next();
}

// API Routes
// Note: Local registration and login have been disabled.
// All user authentication handled centrally through iiskills.cloud
// Future: This will be replaced with SSO integration from iiskills.cloud

// Register endpoint - DISABLED - Redirect to IIS Skills Cloud
app.post('/api/register', async (req, res) => {
    // Local registration is disabled - all users must register through IIS Skills Cloud
    res.status(403).json({ 
        success: false, 
        message: 'Local registration is disabled. Please register at IIS Skills Cloud.',
        redirectUrl: 'https://iiskills.cloud/register'
    });
});

// Login endpoint - DISABLED - Redirect to IIS Skills Cloud
app.post('/api/login', async (req, res) => {
    // Local login is disabled - all users must authenticate through IIS Skills Cloud
    res.status(403).json({ 
        success: false, 
        message: 'Local login is disabled. Please sign in at IIS Skills Cloud.',
        redirectUrl: 'https://iiskills.cloud/register'
    });
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
                email: req.session.userEmail,
                role: req.session.userRole || 'user'
            }
        });
    } else {
        res.json({ 
            authenticated: false 
        });
    }
});

// Get user profile
app.get('/api/profile', isAuthenticated, (req, res) => {
    try {
        const users = readUsers();
        const user = users.find(u => u.id === req.session.userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        // Don't send password
        const { password, ...userProfile } = user;
        res.json({ success: true, profile: userProfile });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update user profile
app.put('/api/profile', isAuthenticated, async (req, res) => {
    try {
        const { name, location, dateOfBirth } = req.body;
        const users = readUsers();
        const userIndex = users.findIndex(u => u.id === req.session.userId);
        
        if (userIndex === -1) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        // Update user data
        if (name) users[userIndex].name = sanitizeInput(name);
        if (location) users[userIndex].location = sanitizeInput(location);
        if (dateOfBirth) users[userIndex].dateOfBirth = dateOfBirth;
        
        writeUsers(users);
        
        // Update session
        req.session.userName = users[userIndex].name;
        
        res.json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Change password
app.post('/api/change-password', isAuthenticated, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'Both passwords are required' });
        }
        
        if (newPassword.length < 6) {
            return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
        }
        
        const users = readUsers();
        const userIndex = users.findIndex(u => u.id === req.session.userId);
        
        if (userIndex === -1) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        // Verify current password
        const isValid = await bcrypt.compare(currentPassword, users[userIndex].password);
        if (!isValid) {
            return res.status(401).json({ success: false, message: 'Current password is incorrect' });
        }
        
        // Hash and update new password
        users[userIndex].password = await bcrypt.hash(newPassword, 10);
        writeUsers(users);
        
        res.json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
        console.error('Password change error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Save test result
app.post('/api/test-result', isAuthenticated, (req, res) => {
    try {
        const { moduleId, moduleName, score, totalQuestions, timeTaken } = req.body;
        
        if (!moduleId || !moduleName || score === undefined || !totalQuestions) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }
        
        const users = readUsers();
        const userIndex = users.findIndex(u => u.id === req.session.userId);
        
        if (userIndex === -1) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        const testResult = {
            moduleId,
            moduleName,
            score,
            totalQuestions,
            dateTaken: new Date().toISOString(),
            timeTaken: timeTaken || 'N/A'
        };
        
        // Add to test results
        if (!users[userIndex].testResults) {
            users[userIndex].testResults = [];
        }
        users[userIndex].testResults.push(testResult);
        
        // Mark module as completed if score is good (e.g., >= 70%)
        const percentage = (score / totalQuestions) * 100;
        if (percentage >= 70) {
            if (!users[userIndex].completedModules) {
                users[userIndex].completedModules = [];
            }
            if (!users[userIndex].completedModules.includes(moduleId)) {
                users[userIndex].completedModules.push(moduleId);
            }
        }
        
        writeUsers(users);
        
        res.json({ success: true, message: 'Test result saved successfully' });
    } catch (error) {
        console.error('Test result save error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Admin: Get all users
app.get('/api/admin/users', isAdmin, (req, res) => {
    try {
        const users = readUsers();
        // Don't send passwords
        const usersWithoutPasswords = users.map(({ password, ...user }) => user);
        res.json({ success: true, users: usersWithoutPasswords });
    } catch (error) {
        console.error('Admin get users error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Admin: Get module data
app.get('/api/admin/modules', isAdmin, (req, res) => {
    try {
        // Read module data from script.js
        const scriptContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
        res.json({ success: true, message: 'Module data retrieved' });
    } catch (error) {
        console.error('Admin get modules error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Admin routes
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-login.html'));
});

app.get('/admin/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-dashboard.html'));
});

app.get('/admin/edit-module/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-edit-module.html'));
});

// User routes
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'user-login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'user-signup.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'user-signup.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'user-profile.html'));
});

// Start server
app.listen(PORT, async () => {
    await initializeAdmin();
    console.log(`Learn Math server running on http://localhost:${PORT}`);
});
