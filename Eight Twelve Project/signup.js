// Get elements
const signupForm = document.getElementById("signupForm");
const emailInput = document.getElementById("signupEmail");
const passwordInput = document.getElementById("signupPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const messageEl = document.getElementById("signupMessage");
const toggleSignupPasswordBtn = document.getElementById("toggleSignupPassword");
const toggleConfirmPasswordBtn = document.getElementById("toggleConfirmPassword");

// Get Firebase Auth instance
function getAuth() {
  if (typeof firebase !== 'undefined' && firebase.auth) {
    return firebase.auth();
  }
  return null;
}

// Handle signup submit
signupForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  // Basic validation
  if (!email || !password || !confirmPassword) {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  if (!email.includes("@")) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }

  if (password.length < 6) {
    showMessage("Password must be at least 6 characters long.", "error");
    return;
  }

  if (password !== confirmPassword) {
    showMessage("Passwords do not match. Please try again.", "error");
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
  const submitButton = signupForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "Creating Account...";

  try {
    // Create user with Firebase
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    showMessage("Account created successfully! Redirecting...", "success");
    
    // Redirect to Event Details page after successful signup
    setTimeout(() => {
      window.location.href = "event-details.html";
    }, 1000);
  } catch (error) {
    // Handle errors
    let errorMessage = "An error occurred during signup. Please try again.";
    
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "This email is already registered. Please log in instead.";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email address format.";
        break;
      case "auth/operation-not-allowed":
        errorMessage = "Email/password accounts are not enabled. Please contact support.";
        break;
      case "auth/weak-password":
        errorMessage = "Password is too weak. Please choose a stronger password.";
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
    submitButton.textContent = "Create Account";
  }
});

// Show / hide password for signup password
toggleSignupPasswordBtn.addEventListener("click", function () {
  const isHidden = passwordInput.type === "password";

  if (isHidden) {
    passwordInput.type = "text";
    toggleSignupPasswordBtn.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    toggleSignupPasswordBtn.textContent = "Show";
  }
});

// Show / hide password for confirm password
toggleConfirmPasswordBtn.addEventListener("click", function () {
  const isHidden = confirmPasswordInput.type === "password";

  if (isHidden) {
    confirmPasswordInput.type = "text";
    toggleConfirmPasswordBtn.textContent = "Hide";
  } else {
    confirmPasswordInput.type = "password";
    toggleConfirmPasswordBtn.textContent = "Show";
  }
});

// Helper to show messages
function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = "message " + type; // "message error" or "message success"
}

