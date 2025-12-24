// IIS Skills Cloud Centralized Authentication
// All local authentication has been disabled
// Users must authenticate through https://iiskills.cloud/register

// TODO: Implement SSO integration with IIS Skills Cloud
// This will replace the current redirect-based approach with proper OAuth/SAML flow

const IIS_SKILLS_CLOUD_AUTH_URL = 'https://iiskills.cloud/register';

function showMessage(elementId, message, type) {
    const messageEl = document.getElementById(elementId);
    if (!messageEl) return;
    
    messageEl.textContent = message;
    messageEl.className = `message ${type} show`;
}

// Redirect users to IIS Skills Cloud for authentication
function redirectToIISSkillsCloud() {
    // Store the current page URL to return after authentication (for future SSO)
    sessionStorage.setItem('returnUrl', window.location.href);
    
    // Redirect to IIS Skills Cloud authentication
    window.location.href = IIS_SKILLS_CLOUD_AUTH_URL;
}

// Check authentication status - for future SSO integration
async function checkAuthStatus() {
    try {
        const response = await fetch('/api/auth/status');
        const data = await response.json();
        return data.authenticated;
    } catch (error) {
        console.error('Error checking auth status:', error);
        return false;
    }
}

// Handle any remaining form submissions by redirecting to IIS Skills Cloud
document.addEventListener('DOMContentLoaded', () => {
    // Find any login or register forms and prevent submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Local authentication is disabled. Redirecting to IIS Skills Cloud...');
            redirectToIISSkillsCloud();
        });
    });
    
    // Check if already authenticated
    checkAuthStatus().then(authenticated => {
        if (authenticated) {
            // User is authenticated, redirect to main page
            window.location.href = '/';
        }
    });
});
