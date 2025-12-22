// Profile page JavaScript
let userProfile = null;

// Load user profile on page load
window.addEventListener('DOMContentLoaded', async () => {
    await checkAuthAndLoadProfile();
});

async function checkAuthAndLoadProfile() {
    try {
        const response = await fetch('/api/auth/status');
        const data = await response.json();
        
        if (!data.authenticated) {
            window.location.href = '/login';
            return;
        }
        
        // Update navbar
        const userNameEl = document.getElementById('userName');
        if (userNameEl) {
            userNameEl.textContent = `Welcome, ${data.user.name}!`;
        }
        
        // Load profile
        await loadProfile();
    } catch (error) {
        console.error('Auth check error:', error);
        window.location.href = '/login';
    }
}

async function loadProfile() {
    try {
        const response = await fetch('/api/profile');
        const data = await response.json();
        
        if (data.success) {
            userProfile = data.profile;
            displayProfile(userProfile);
        } else {
            console.error('Failed to load profile:', data.message);
        }
    } catch (error) {
        console.error('Profile load error:', error);
    }
}

function displayProfile(profile) {
    // Header
    document.getElementById('profileName').textContent = profile.name;
    const memberSinceDate = new Date(profile.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('memberSince').textContent = `Member since: ${memberSinceDate}`;
    
    // Personal Information
    document.getElementById('infoName').textContent = profile.name;
    document.getElementById('infoEmail').textContent = profile.email;
    document.getElementById('infoDob').textContent = new Date(profile.dateOfBirth).toLocaleDateString('en-US');
    document.getElementById('infoLocation').textContent = profile.location;
    
    // Statistics
    const testResults = profile.testResults || [];
    const completedModules = profile.completedModules || [];
    
    document.getElementById('statTests').textContent = testResults.length;
    document.getElementById('statModules').textContent = completedModules.length;
    
    // Overall progress (out of 10 modules)
    const progressPercentage = (completedModules.length / 10) * 100;
    const progressBar = document.getElementById('overallProgress');
    progressBar.style.width = progressPercentage + '%';
    progressBar.textContent = Math.round(progressPercentage) + '%';
    
    // Test History
    displayTestHistory(testResults);
}

function displayTestHistory(testResults) {
    const historyContainer = document.getElementById('testHistory');
    
    if (!testResults || testResults.length === 0) {
        historyContainer.innerHTML = '<div class="no-data">No tests taken yet. Start learning!</div>';
        return;
    }
    
    // Sort by date (most recent first)
    const sortedResults = [...testResults].sort((a, b) => {
        return new Date(b.dateTaken) - new Date(a.dateTaken);
    });
    
    let html = '';
    sortedResults.forEach(result => {
        const percentage = (result.score / result.totalQuestions) * 100;
        let scoreClass = 'poor';
        if (percentage >= 90) scoreClass = 'excellent';
        else if (percentage >= 70) scoreClass = 'good';
        else if (percentage >= 50) scoreClass = 'average';
        
        const dateTaken = new Date(result.dateTaken).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        html += `
            <div class="test-result-item">
                <div class="test-result-header">
                    <span class="test-module-name">${result.moduleName}</span>
                    <span class="test-score ${scoreClass}">${result.score}/${result.totalQuestions} (${Math.round(percentage)}%)</span>
                </div>
                <div class="test-date">
                    ${dateTaken} • Time: ${result.timeTaken}
                </div>
            </div>
        `;
    });
    
    historyContainer.innerHTML = html;
}

// Logout function
async function handleLogout() {
    try {
        const response = await fetch('/api/logout', {
            method: 'POST'
        });
        
        const data = await response.json();
        
        if (data.success) {
            window.location.href = '/login';
        }
    } catch (error) {
        console.error('Logout error:', error);
        window.location.href = '/login';
    }
}

// Edit Profile Modal
function showEditProfile() {
    if (!userProfile) return;
    
    document.getElementById('editName').value = userProfile.name;
    document.getElementById('editDob').value = userProfile.dateOfBirth;
    document.getElementById('editLocation').value = userProfile.location;
    
    document.getElementById('editProfileModal').style.display = 'block';
}

function closeEditProfile() {
    document.getElementById('editProfileModal').style.display = 'none';
    document.getElementById('editMessage').classList.remove('show');
}

document.getElementById('editProfileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('editName').value,
        dateOfBirth: document.getElementById('editDob').value,
        location: document.getElementById('editLocation').value
    };
    
    try {
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        const messageEl = document.getElementById('editMessage');
        
        if (data.success) {
            messageEl.textContent = data.message;
            messageEl.className = 'message success show';
            
            // Reload profile
            await loadProfile();
            
            // Close modal after a delay
            setTimeout(() => {
                closeEditProfile();
            }, 1500);
        } else {
            messageEl.textContent = data.message;
            messageEl.className = 'message error show';
        }
    } catch (error) {
        console.error('Profile update error:', error);
        const messageEl = document.getElementById('editMessage');
        messageEl.textContent = 'Network error. Please try again.';
        messageEl.className = 'message error show';
    }
});

// Change Password Modal
function showChangePassword() {
    document.getElementById('changePasswordForm').reset();
    document.getElementById('changePasswordModal').style.display = 'block';
}

function closeChangePassword() {
    document.getElementById('changePasswordModal').style.display = 'none';
    document.getElementById('passwordMessage').classList.remove('show');
}

document.getElementById('changePasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const messageEl = document.getElementById('passwordMessage');
    
    if (newPassword !== confirmPassword) {
        messageEl.textContent = 'New passwords do not match';
        messageEl.className = 'message error show';
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
            messageEl.className = 'message success show';
            
            // Close modal after a delay
            setTimeout(() => {
                closeChangePassword();
            }, 1500);
        } else {
            messageEl.textContent = data.message;
            messageEl.className = 'message error show';
        }
    } catch (error) {
        console.error('Password change error:', error);
        messageEl.textContent = 'Network error. Please try again.';
        messageEl.className = 'message error show';
    }
});

// Close modals when clicking outside
window.onclick = function(event) {
    const editModal = document.getElementById('editProfileModal');
    const passwordModal = document.getElementById('changePasswordModal');
    
    if (event.target === editModal) {
        closeEditProfile();
    }
    if (event.target === passwordModal) {
        closeChangePassword();
    }
}
