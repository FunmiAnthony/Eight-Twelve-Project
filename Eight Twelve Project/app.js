// Get elements
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const messageEl = document.getElementById("message");
const togglePasswordBtn = document.getElementById("togglePassword");
const forgotPasswordBtn = document.getElementById("forgotPassword");

// Get Firebase Auth instance
function getAuth() {
  if (typeof firebase !== 'undefined' && firebase.auth) {
    return firebase.auth();
  }
  return null;
}

// Handle login submit
loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Basic checks
  if (!email || !password) {
    showMessage("Please enter both email and password.", "error");
    return;
  }

  if (!email.includes("@")) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }

  // Get auth instance
  const auth = getAuth();
  
  // Check if Firebase is initialized
  if (!auth) {
    showMessage("Firebase is not initialized. Please check your configuration.", "error");
    return;
  }

  // Disable the submit button to prevent multiple submissions
  const submitButton = loginForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "Logging in...";

  try {
    // Sign in with Firebase
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    showMessage("Login successful! Redirecting...", "success");
    
    // Redirect to Event Details page after successful login
    setTimeout(() => {
      window.location.href = "event-details.html";
    }, 500);
  } catch (error) {
    // Handle errors
    let errorMessage = "An error occurred during login. Please try again.";
    
    switch (error.code) {
      case "auth/user-not-found":
        errorMessage = "No account found with this email address.";
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password. Please try again.";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email address format.";
        break;
      case "auth/user-disabled":
        errorMessage = "This account has been disabled.";
        break;
      case "auth/too-many-requests":
        errorMessage = "Too many failed attempts. Please try again later.";
        break;
      case "auth/network-request-failed":
        errorMessage = "Network error. Please check your connection.";
        break;
      default:
        errorMessage = error.message || errorMessage;
    }
    
    showMessage(errorMessage, "error");
    
    // Re-enable the submit button
    submitButton.disabled = false;
    submitButton.textContent = "Log in";
  }
});

// Show / hide password
togglePasswordBtn.addEventListener("click", function () {
  const isHidden = passwordInput.type === "password";

  if (isHidden) {
    passwordInput.type = "text";
    togglePasswordBtn.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    togglePasswordBtn.textContent = "Show";
  }
});

// Forgot password with Firebase
forgotPasswordBtn.addEventListener("click", async function () {
  const email = emailInput.value.trim();

  if (!email) {
    showMessage(
      "Please enter your email address first.",
      "error"
    );
    return;
  }

  if (!email.includes("@")) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }

  // Get auth instance
  const auth = getAuth();
  
  // Check if Firebase is initialized
  if (!auth) {
    showMessage("Firebase is not initialized. Please check your configuration.", "error");
    return;
  }

  try {
    // Send password reset email
    await auth.sendPasswordResetEmail(email);
    showMessage(
      `Password reset email sent to ${email}. Please check your inbox. 🔐`,
      "success"
    );
  } catch (error) {
    let errorMessage = "Failed to send reset email. Please try again.";
    
    switch (error.code) {
      case "auth/user-not-found":
        errorMessage = "No account found with this email address.";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email address format.";
        break;
      case "auth/network-request-failed":
        errorMessage = "Network error. Please check your connection.";
        break;
      default:
        errorMessage = error.message || errorMessage;
    }
    
    showMessage(errorMessage, "error");
  }
});

// Helper to show messages
function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = "message " + type; // "message error" or "message success"
}
