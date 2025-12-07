// Event Details Page JavaScript
// Check authentication state and protect the page

// Get Firebase Auth instance
function getAuth() {
  if (typeof firebase !== 'undefined' && firebase.auth) {
    return firebase.auth();
  }
  return null;
}

// Get Firestore instance
function getFirestore() {
  if (typeof firebase !== 'undefined' && firebase.firestore) {
    return firebase.firestore();
  }
  return null;
}

// Global variables
let currentUser = null;
let currentEventId = null;
let collaboratorsUnsubscribe = null;
let commentsUnsubscribe = null;
let presenceUnsubscribe = null;

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
        currentUser = user;
        console.log("User is logged in:", user.email);
        
        // Initialize collaboration features
        initializeCollaboration();
      }
    });
  } else {
    // If Firebase isn't loaded yet, wait a bit and try again
    setTimeout(checkAuthState, 100);
  }
}

// Initialize collaboration features
async function initializeCollaboration() {
  const db = getFirestore();
  if (!db || !currentUser) return;

  // Use a default event ID or get from URL params
  const urlParams = new URLSearchParams(window.location.search);
  currentEventId = urlParams.get('eventId') || 'default-event';

  // Ensure event document exists
  await ensureEventExists();

  // Initialize presence tracking
  initializePresence();

  // Load collaborators
  loadCollaborators();

  // Load comments
  loadComments();

  // Setup modal handlers
  setupModalHandlers();
}

// Ensure event document exists in Firestore
async function ensureEventExists() {
  const db = getFirestore();
  if (!db || !currentEventId) return;

  try {
    const eventRef = db.collection('events').doc(currentEventId);
    const eventDoc = await eventRef.get();
    
    if (!eventDoc.exists) {
      // Create the event document if it doesn't exist
      await eventRef.set({
        title: '8:12 Event',
        createdBy: currentUser.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error ensuring event exists:', error);
  }
}

// Initialize presence tracking (who's currently viewing)
function initializePresence() {
  const db = getFirestore();
  if (!db || !currentUser || !currentEventId) return;

  const userPresenceRef = db.collection('events')
    .doc(currentEventId)
    .collection('presence')
    .doc(currentUser.uid);

  // Set user as online
  userPresenceRef.set({
    email: currentUser.email,
    displayName: currentUser.displayName || currentUser.email.split('@')[0],
    lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
    online: true
  });

  // Update last seen every 30 seconds
  const presenceInterval = setInterval(() => {
    if (currentUser) {
      userPresenceRef.update({
        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
      });
    } else {
      clearInterval(presenceInterval);
    }
  }, 30000);

  // Mark as offline when user leaves
  window.addEventListener('beforeunload', () => {
    userPresenceRef.update({
      online: false,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    });
  });

  // Listen for active collaborators
  const presenceQuery = db.collection('events')
    .doc(currentEventId)
    .collection('presence')
    .where('online', '==', true);

  presenceUnsubscribe = presenceQuery.onSnapshot((snapshot) => {
    const activeCollaborators = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.email !== currentUser.email) {
        activeCollaborators.push({
          id: doc.id,
          email: data.email,
          displayName: data.displayName || data.email.split('@')[0]
        });
      }
    });
    displayActiveCollaborators(activeCollaborators);
  });
}

// Load and display collaborators
function loadCollaborators() {
  const db = getFirestore();
  if (!db || !currentUser || !currentEventId) return;

  const eventRef = db.collection('events').doc(currentEventId);

  // Listen for collaborators
  collaboratorsUnsubscribe = eventRef.collection('collaborators')
    .onSnapshot((snapshot) => {
      const collaborators = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        collaborators.push({
          id: doc.id,
          email: data.email,
          status: data.status || 'invited',
          invitedBy: data.invitedBy,
          invitedAt: data.invitedAt
        });
      });
      displayInvitedCollaborators(collaborators);
    });
}

// Display active collaborators
function displayActiveCollaborators(collaborators) {
  const container = document.getElementById('activeCollaborators');
  if (!container) return;

  if (collaborators.length === 0) {
    container.innerHTML = '<p class="no-collaborators">No active collaborators</p>';
    return;
  }

  container.innerHTML = collaborators.map(collab => `
    <div class="collaborator-badge active">
      <div class="collaborator-avatar">${getInitials(collab.displayName)}</div>
      <div class="collaborator-info">
        <span class="collaborator-name">${collab.displayName}</span>
        <span class="collaborator-status">Online</span>
      </div>
    </div>
  `).join('');
}

// Display invited collaborators
function displayInvitedCollaborators(collaborators) {
  const container = document.getElementById('invitedCollaborators');
  if (!container) return;

  if (collaborators.length === 0) {
    container.innerHTML = '<p class="no-collaborators">No invited collaborators</p>';
    return;
  }

  container.innerHTML = collaborators.map(collab => `
    <div class="collaborator-badge">
      <div class="collaborator-avatar">${getInitials(collab.email)}</div>
      <div class="collaborator-info">
        <span class="collaborator-name">${collab.email}</span>
        <span class="collaborator-status">${collab.status}</span>
      </div>
    </div>
  `).join('');
}

// Load and display comments
function loadComments() {
  const db = getFirestore();
  if (!db || !currentUser || !currentEventId) return;

  const commentsRef = db.collection('events')
    .doc(currentEventId)
    .collection('comments')
    .orderBy('createdAt', 'desc');

  commentsUnsubscribe = commentsRef.onSnapshot((snapshot) => {
    const comments = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      comments.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date()
      });
    });
    displayComments(comments);
  });
}

// Display comments
function displayComments(comments) {
  const container = document.getElementById('commentsList');
  if (!container) return;

  if (comments.length === 0) {
    container.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
    return;
  }

  container.innerHTML = comments.map(comment => `
    <div class="comment-item">
      <div class="comment-header">
        <div class="comment-author">
          <div class="collaborator-avatar">${getInitials(comment.authorEmail)}</div>
          <span class="comment-author-name">${comment.authorName || comment.authorEmail}</span>
        </div>
        <span class="comment-time">${formatTime(comment.createdAt)}</span>
      </div>
      <div class="comment-text">${escapeHtml(comment.text)}</div>
    </div>
  `).join('');
}

// Setup modal handlers
function setupModalHandlers() {
  const inviteBtn = document.getElementById('inviteCollaboratorBtn');
  const modal = document.getElementById('inviteModal');
  const closeModal = document.getElementById('closeModal');
  const cancelBtn = document.getElementById('cancelInviteBtn');
  const sendInviteBtn = document.getElementById('sendInviteBtn');
  const emailInput = document.getElementById('collaboratorEmail');
  const addCommentBtn = document.getElementById('addCommentBtn');
  const commentInput = document.getElementById('commentInput');

  if (inviteBtn) {
    inviteBtn.addEventListener('click', () => {
      if (modal) modal.classList.add('show');
    });
  }

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      if (modal) modal.classList.remove('show');
      if (emailInput) emailInput.value = '';
      clearInviteMessage();
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      if (modal) modal.classList.remove('show');
      if (emailInput) emailInput.value = '';
      clearInviteMessage();
    });
  }

  if (sendInviteBtn) {
    sendInviteBtn.addEventListener('click', async () => {
      await inviteCollaborator();
    });
  }

  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        if (emailInput) emailInput.value = '';
        clearInviteMessage();
      }
    });
  }

  // Add comment handler
  if (addCommentBtn) {
    addCommentBtn.addEventListener('click', async () => {
      await addComment();
    });
  }

  // Allow Enter key to submit comment (Shift+Enter for new line)
  if (commentInput) {
    commentInput.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        await addComment();
      }
    });
  }
}

// Invite a collaborator
async function inviteCollaborator() {
  const db = getFirestore();
  const emailInput = document.getElementById('collaboratorEmail');
  
  if (!db || !currentUser || !currentEventId || !emailInput) return;

  const email = emailInput.value.trim().toLowerCase();

  if (!email || !email.includes('@')) {
    showInviteMessage('Please enter a valid email address.', 'error');
    return;
  }

  if (email === currentUser.email) {
    showInviteMessage('You cannot invite yourself.', 'error');
    return;
  }

  try {
    const eventRef = db.collection('events').doc(currentEventId);
    
    // Check if already invited
    const existingCollab = await eventRef.collection('collaborators')
      .where('email', '==', email)
      .get();

    if (!existingCollab.empty) {
      showInviteMessage('This user has already been invited.', 'error');
      return;
    }

    // Add collaborator
    await eventRef.collection('collaborators').add({
      email: email,
      status: 'invited',
      invitedBy: currentUser.email,
      invitedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    showInviteMessage(`Invitation sent to ${email}!`, 'success');
    
    // Clear input and close modal after a delay
    setTimeout(() => {
      emailInput.value = '';
      const modal = document.getElementById('inviteModal');
      if (modal) modal.classList.remove('show');
      clearInviteMessage();
    }, 1500);

  } catch (error) {
    console.error('Error inviting collaborator:', error);
    showInviteMessage('Failed to send invitation. Please try again.', 'error');
  }
}

// Add a comment
async function addComment() {
  const db = getFirestore();
  const commentInput = document.getElementById('commentInput');
  
  if (!db || !currentUser || !currentEventId || !commentInput) return;

  const text = commentInput.value.trim();

  if (!text) {
    return;
  }

  try {
    const eventRef = db.collection('events').doc(currentEventId);
    
    await eventRef.collection('comments').add({
      text: text,
      authorEmail: currentUser.email,
      authorName: currentUser.displayName || currentUser.email.split('@')[0],
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Clear input
    commentInput.value = '';

  } catch (error) {
    console.error('Error adding comment:', error);
    alert('Failed to add comment. Please try again.');
  }
}

// Helper functions
function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function formatTime(date) {
  if (!date) return '';
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showInviteMessage(text, type) {
  const messageEl = document.getElementById('inviteMessage');
  if (messageEl) {
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
  }
}

function clearInviteMessage() {
  const messageEl = document.getElementById('inviteMessage');
  if (messageEl) {
    messageEl.textContent = '';
    messageEl.className = 'message';
  }
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (collaboratorsUnsubscribe) collaboratorsUnsubscribe();
  if (commentsUnsubscribe) commentsUnsubscribe();
  if (presenceUnsubscribe) presenceUnsubscribe();
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

// Start checking auth state
checkAuthState();

// Setup logout button
setupLogout();

