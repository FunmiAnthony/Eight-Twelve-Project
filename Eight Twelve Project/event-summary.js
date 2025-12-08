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
        window.location.href = "index.html";
      }
    });
  } else {
    setTimeout(checkAuth, 100);
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
    
    // Decode URL parameters
    const title = decodeURIComponent(params.title || '');
    const description = decodeURIComponent(params.description || '');
    const date = decodeURIComponent(params.date || '');
    const time = decodeURIComponent(params.time || '');
    const location = decodeURIComponent(params.location || '');
    const price = decodeURIComponent(params.price || 'Free');
    const attendees = params.attendees || '';
    const flyerUrl = params.flyerUrl ? decodeURIComponent(params.flyerUrl) : '';

    // Update summary elements with safety checks
    const summaryTitle = document.getElementById('summaryTitle');
    const summaryDate = document.getElementById('summaryDate');
    const summaryTime = document.getElementById('summaryTime');
    const summaryLocation = document.getElementById('summaryLocation');
    const summaryPrice = document.getElementById('summaryPrice');
    const summaryDescription = document.getElementById('summaryDescription');

    if (summaryTitle) summaryTitle.textContent = title;
    if (summaryDate) summaryDate.textContent = date;
    if (summaryTime) summaryTime.textContent = time;
    if (summaryLocation) summaryLocation.textContent = location;
    if (summaryPrice) summaryPrice.textContent = price;
    if (summaryDescription) summaryDescription.textContent = description;

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
  checkAuth();
  displayEventSummary();
  setupLogout();
  setupCreateAnotherBtn();
});

