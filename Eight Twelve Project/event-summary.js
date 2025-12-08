// Event Summary Page JavaScript

// Get Firebase instances
function getAuth() {
  if (typeof firebase !== 'undefined' && firebase.auth) {
    return firebase.auth();
  }
  return null;
}

// Check authentication
function checkAuth() {
  const auth = getAuth();
  if (auth) {
    auth.onAuthStateChanged(function(user) {
      if (!user) {
        // Only redirect if we're sure user is not authenticated
        // Give Firebase a moment to initialize
        setTimeout(function() {
          if (!auth.currentUser) {
            window.location.href = "index.html";
          }
        }, 500);
      }
    });
  } else {
    // Retry checking auth, but limit retries
    let retries = 0;
    const maxRetries = 50; // 5 seconds max wait
    const checkInterval = setInterval(function() {
      retries++;
      const auth = getAuth();
      if (auth || retries >= maxRetries) {
        clearInterval(checkInterval);
        if (auth) {
          checkAuth();
        }
      }
    }, 100);
  }
}

// Get URL parameters
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    title: params.get('title'),
    description: params.get('description'),
    date: params.get('date'),
    time: params.get('time'),
    location: params.get('location'),
    price: params.get('price'),
    attendees: params.get('attendees'),
    flyerUrl: params.get('flyerUrl')
  };
}

// Display event summary
function displayEventSummary() {
  try {
    const params = getUrlParams();
    
    // Helper function to safely decode URL parameters
    function safeDecode(value) {
      if (!value) return '';
      try {
        return decodeURIComponent(value);
      } catch (e) {
        console.warn('Error decoding parameter:', e);
        return value; // Return as-is if decoding fails
      }
    }
    
    // Decode URL parameters safely
    const title = safeDecode(params.title);
    const description = safeDecode(params.description);
    const date = safeDecode(params.date);
    const time = safeDecode(params.time);
    const location = safeDecode(params.location);
    const price = safeDecode(params.price) || 'Free';
    const attendees = params.attendees || '';
    
    // Check if flyer URL was stored in sessionStorage (for large base64 images)
    let flyerUrl = params.flyerUrl ? safeDecode(params.flyerUrl) : '';
    if (flyerUrl === 'stored') {
      flyerUrl = sessionStorage.getItem('eventFlyerUrl') || '';
      // Clean up after retrieving
      sessionStorage.removeItem('eventFlyerUrl');
    }

    // Update summary elements with safety checks
    const summaryTitle = document.getElementById('summaryTitle');
    const summaryDate = document.getElementById('summaryDate');
    const summaryTime = document.getElementById('summaryTime');
    const summaryLocation = document.getElementById('summaryLocation');
    const summaryPrice = document.getElementById('summaryPrice');
    const summaryDescription = document.getElementById('summaryDescription');

    // Update summary elements with safety checks and fallbacks
    if (summaryTitle) summaryTitle.textContent = title || 'Event Title';
    if (summaryDate) summaryDate.textContent = date || 'Not specified';
    if (summaryTime) summaryTime.textContent = time || 'Not specified';
    if (summaryLocation) summaryLocation.textContent = location || 'Not specified';
    if (summaryPrice) summaryPrice.textContent = price || 'Free';
    if (summaryDescription) summaryDescription.textContent = description || 'No description provided.';

    // Show attendees if provided
    const summaryAttendees = document.getElementById('summaryAttendees');
    const summaryAttendeesContainer = document.getElementById('summaryAttendeesContainer');
    if (attendees && summaryAttendees && summaryAttendeesContainer) {
      summaryAttendees.textContent = attendees;
      summaryAttendeesContainer.style.display = 'flex';
    } else if (summaryAttendeesContainer) {
      summaryAttendeesContainer.style.display = 'none';
    }

    // Show flyer if provided
    const summaryFlyer = document.getElementById('summaryFlyer');
    const summaryPlaceholder = document.getElementById('summaryPlaceholder');
    
    if (flyerUrl && summaryFlyer && summaryPlaceholder) {
      summaryFlyer.src = flyerUrl;
      summaryFlyer.style.display = 'block';
      summaryPlaceholder.style.display = 'none';
    } else if (summaryFlyer && summaryPlaceholder) {
      summaryFlyer.style.display = 'none';
      summaryPlaceholder.style.display = 'flex';
    }
  } catch (error) {
    console.error('Error displaying event summary:', error);
  }
}

// Create another event handler
function setupCreateAnotherBtn() {
  const createAnotherBtn = document.getElementById('createAnotherBtn');
  if (createAnotherBtn) {
    createAnotherBtn.addEventListener('click', function() {
      window.location.href = 'create-event.html';
    });
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('Event Summary page loaded');
  console.log('URL parameters:', window.location.search);
  
  // Setup event handlers first
  setupLogout();
  setupCreateAnotherBtn();
  
  // Check auth and display summary
  checkAuth();
  displayEventSummary();
  
  console.log('Event Summary page initialized');
});

