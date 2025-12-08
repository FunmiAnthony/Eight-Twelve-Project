// Event Details Page JavaScript
// Check authentication state and protect the page

// Get Firebase Auth instance
function getAuth() {
  if (typeof firebase !== 'undefined' && firebase.auth) {
    return firebase.auth();
  }
  return null;
}

// Check authentication state when page loads
function checkAuthState() {
  const auth = getAuth();
  
  if (auth) {
    // Check authentication state
    auth.onAuthStateChanged(function(user) {
      if (!user) {
        // User is not logged in, redirect to login page
        window.location.href = "index.html";
      } else {
        // User is logged in
        console.log("User is logged in:", user.email);
      }
    });
  } else {
    // If Firebase isn't loaded yet, wait a bit and try again
    setTimeout(checkAuthState, 100);
  }
}


// Logout functionality
function setupLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      const auth = getAuth();
      if (auth) {
        try {
          await auth.signOut();
          window.location.href = 'index.html';
        } catch (error) {
          console.error('Error signing out:', error);
          alert('Failed to log out. Please try again.');
        }
      }
    });
  }
}

// Start checking auth state
checkAuthState();

// Setup logout button
setupLogout();

