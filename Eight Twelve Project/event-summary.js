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

  // Update summary elements
  document.getElementById('summaryTitle').textContent = title;
  document.getElementById('summaryDate').textContent = date;
  document.getElementById('summaryTime').textContent = time;
  document.getElementById('summaryLocation').textContent = location;
  document.getElementById('summaryPrice').textContent = price;
  document.getElementById('summaryDescription').textContent = description;

  // Show attendees if provided
  if (attendees) {
    document.getElementById('summaryAttendees').textContent = attendees;
    document.getElementById('summaryAttendeesContainer').style.display = 'flex';
  } else {
    document.getElementById('summaryAttendeesContainer').style.display = 'none';
  }

  // Show flyer if provided
  const summaryFlyer = document.getElementById('summaryFlyer');
  const summaryPlaceholder = document.getElementById('summaryPlaceholder');
  
  if (flyerUrl) {
    summaryFlyer.src = flyerUrl;
    summaryFlyer.style.display = 'block';
    summaryPlaceholder.style.display = 'none';
  } else {
    summaryFlyer.style.display = 'none';
    summaryPlaceholder.style.display = 'flex';
  }
}

// Create another event handler
document.getElementById('createAnotherBtn').addEventListener('click', function() {
  window.location.href = 'create-event.html';
});

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

// Initialize
checkAuth();
displayEventSummary();
setupLogout();

