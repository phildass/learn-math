// Toggle between login and register forms
function showRegisterForm() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    clearMessages();
}

function showLoginForm() {
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    clearMessages();
}

function clearMessages() {
    document.getElementById('loginMessage').classList.remove('show', 'success', 'error');
    document.getElementById('registerMessage').classList.remove('show', 'success', 'error');
}

function showMessage(elementId, message, type) {
    const messageEl = document.getElementById(elementId);
    messageEl.textContent = message;
    messageEl.className = `message ${type} show`;
}

// Handle login form submission
document.getElementById('loginFormElement').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
    };

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            showMessage('loginMessage', data.message, 'success');
            
            // Store user info in sessionStorage
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('userName', data.user.name);
            sessionStorage.setItem('userEmail', data.user.email);
            
            // Redirect to main page after short delay
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        } else {
            showMessage('loginMessage', data.message, 'error');
        }
    } catch (error) {
        showMessage('loginMessage', 'Network error. Please try again.', 'error');
        console.error('Login error:', error);
    }
});

// Handle register form submission
document.getElementById('registerFormElement').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('registerName').value,
        dateOfBirth: document.getElementById('registerDob').value,
        email: document.getElementById('registerEmail').value,
        location: document.getElementById('registerLocation').value,
        password: document.getElementById('registerPassword').value
    };

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            showMessage('registerMessage', data.message, 'success');
            
            // Clear form
            document.getElementById('registerFormElement').reset();
            
            // Switch to login form after short delay
            setTimeout(() => {
                showLoginForm();
            }, 2000);
        } else {
            showMessage('registerMessage', data.message, 'error');
        }
    } catch (error) {
        showMessage('registerMessage', 'Network error. Please try again.', 'error');
        console.error('Registration error:', error);
    }
});

// Check if already logged in when page loads
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/auth/status');
        const data = await response.json();
        
        if (data.authenticated) {
            // User is already logged in, redirect to main page
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Error checking auth status:', error);
    }
});
