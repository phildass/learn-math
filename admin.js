// Admin Dashboard JavaScript

// Check admin authentication on page load
window.addEventListener('DOMContentLoaded', async () => {
    await checkAdminAuth();
    await loadDashboardData();
});

async function checkAdminAuth() {
    try {
        const response = await fetch('/api/auth/status');
        const data = await response.json();
        
        if (!data.authenticated || data.user.role !== 'admin') {
            window.location.href = '/admin';
            return;
        }
        
        // Update navbar with admin info
        const userNameEl = document.getElementById('userName');
        if (userNameEl) {
            userNameEl.textContent = data.user.name;
        }
    } catch (error) {
        console.error('Auth check error:', error);
        window.location.href = '/admin';
    }
}

async function loadDashboardData() {
    try {
        const response = await fetch('/api/admin/users');
        const data = await response.json();
        
        if (data.success) {
            displayUsers(data.users);
            updateStats(data.users);
        } else {
            console.error('Failed to load users:', data.message);
        }
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

function updateStats(users) {
    // Total users (excluding admin)
    const regularUsers = users.filter(u => u.role !== 'admin');
    document.getElementById('totalUsers').textContent = regularUsers.length;
    
    // Total tests taken
    let totalTests = 0;
    users.forEach(user => {
        if (user.testResults) {
            totalTests += user.testResults.length;
        }
    });
    document.getElementById('totalTests').textContent = totalTests;
}

function displayUsers(users) {
    const tbody = document.getElementById('usersTableBody');
    
    if (!users || users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="no-data">No users registered yet</td></tr>';
        return;
    }
    
    // Sort users by creation date (most recent first)
    const sortedUsers = [...users].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    let html = '';
    sortedUsers.forEach(user => {
        const joinDate = new Date(user.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        const testCount = user.testResults ? user.testResults.length : 0;
        const completedCount = user.completedModules ? user.completedModules.length : 0;
        const roleClass = user.role === 'admin' ? 'admin' : 'user';
        const roleText = user.role === 'admin' ? 'Admin' : 'User';
        
        html += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><span class="role-badge ${roleClass}">${roleText}</span></td>
                <td>${user.location || 'N/A'}</td>
                <td>${joinDate}</td>
                <td>${testCount}</td>
                <td>${completedCount}/10</td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

function scrollToUsers() {
    document.getElementById('usersSection').scrollIntoView({ behavior: 'smooth' });
}

// Logout function
async function handleLogout() {
    try {
        const response = await fetch('/api/logout', {
            method: 'POST'
        });
        
        const data = await response.json();
        
        if (data.success) {
            window.location.href = '/admin';
        }
    } catch (error) {
        console.error('Logout error:', error);
        window.location.href = '/admin';
    }
}

// Change Password Modal
function showChangePassword() {
    document.getElementById('changePasswordForm').reset();
    document.getElementById('changePasswordModal').style.display = 'block';
}

function closeChangePassword() {
    document.getElementById('changePasswordModal').style.display = 'none';
    const messageEl = document.getElementById('passwordMessage');
    messageEl.style.display = 'none';
}

document.getElementById('changePasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const messageEl = document.getElementById('passwordMessage');
    
    if (newPassword !== confirmPassword) {
        messageEl.textContent = 'New passwords do not match';
        messageEl.style.backgroundColor = '#f8d7da';
        messageEl.style.color = '#721c24';
        messageEl.style.border = '1px solid #f5c6cb';
        messageEl.style.display = 'block';
        return;
    }
    
    try {
        const response = await fetch('/api/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currentPassword,
                newPassword
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            messageEl.textContent = data.message;
            messageEl.style.backgroundColor = '#d4edda';
            messageEl.style.color = '#155724';
            messageEl.style.border = '1px solid #c3e6cb';
            messageEl.style.display = 'block';
            
            // Close modal after a delay
            setTimeout(() => {
                closeChangePassword();
            }, 1500);
        } else {
            messageEl.textContent = data.message;
            messageEl.style.backgroundColor = '#f8d7da';
            messageEl.style.color = '#721c24';
            messageEl.style.border = '1px solid #f5c6cb';
            messageEl.style.display = 'block';
        }
    } catch (error) {
        console.error('Password change error:', error);
        messageEl.textContent = 'Network error. Please try again.';
        messageEl.style.backgroundColor = '#f8d7da';
        messageEl.style.color = '#721c24';
        messageEl.style.border = '1px solid #f5c6cb';
        messageEl.style.display = 'block';
    }
});
