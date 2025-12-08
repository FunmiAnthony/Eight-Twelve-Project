// Create Event Page JavaScript

// Get Firebase instances
function getAuth() {
  if (typeof firebase !== 'undefined' && firebase.auth) {
    return firebase.auth();
  }
  return null;
}

function getFirestore() {
  if (typeof firebase !== 'undefined' && firebase.firestore) {
    return firebase.firestore();
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

// Get form elements
const createEventForm = document.getElementById("createEventForm");
const eventTitle = document.getElementById("eventTitle");
const eventDescription = document.getElementById("eventDescription");
const eventDate = document.getElementById("eventDate");
const eventTime = document.getElementById("eventTime");
const eventLocation = document.getElementById("eventLocation");
const eventAttendees = document.getElementById("eventAttendees");
const eventPrice = document.getElementById("eventPrice");
const freeEventToggle = document.getElementById("freeEventToggle");
const eventFlyer = document.getElementById("eventFlyer");
const imagePreview = document.getElementById("imagePreview");
const previewImage = document.getElementById("previewImage");
const removeImageBtn = document.getElementById("removeImage");
const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("formMessage");
const descCharCount = document.getElementById("descCharCount");

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
eventDate.setAttribute('min', today);

// Initialize price field as greyed out (starts disabled)
eventPrice.style.opacity = "0.5";
eventPrice.style.cursor = "not-allowed";

// Free event toggle handler
freeEventToggle.addEventListener("change", function() {
  if (this.checked) {
    eventPrice.disabled = true;
    eventPrice.value = "";
    eventPrice.classList.add("disabled");
    eventPrice.style.opacity = "0.5";
    eventPrice.style.cursor = "not-allowed";
  } else {
    eventPrice.disabled = false;
    eventPrice.classList.remove("disabled");
    eventPrice.style.opacity = "1";
    eventPrice.style.cursor = "text";
  }
});

// Character count for description
eventDescription.addEventListener("input", function() {
  const count = this.value.length;
  descCharCount.textContent = count;
  if (count > 900) {
    descCharCount.parentElement.classList.add("warning");
  } else {
    descCharCount.parentElement.classList.remove("warning");
  }
});

// Image preview handler
eventFlyer.addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      showMessage("Image size must be less than 5MB.", "error");
      this.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      previewImage.src = e.target.result;
      imagePreview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  }
});

// Remove image handler
removeImageBtn.addEventListener("click", function() {
  eventFlyer.value = "";
  imagePreview.classList.add("hidden");
  previewImage.src = "";
});

// Drag and drop for image
const fileUploadLabel = document.querySelector(".file-upload-label");
const fileUploadContainer = document.querySelector(".file-upload-container");

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  fileUploadContainer.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
  fileUploadContainer.addEventListener(eventName, () => {
    fileUploadContainer.classList.add('drag-over');
  });
});

['dragleave', 'drop'].forEach(eventName => {
  fileUploadContainer.addEventListener(eventName, () => {
    fileUploadContainer.classList.remove('drag-over');
  });
});

fileUploadContainer.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  if (files.length > 0) {
    eventFlyer.files = files;
    const changeEvent = new Event('change', { bubbles: true });
    eventFlyer.dispatchEvent(changeEvent);
  }
}

// Form submission handler
createEventForm.addEventListener("submit", async function(e) {
  e.preventDefault(); // Prevent page refresh

  // Clear previous messages
  clearMessage();

  // Validate form
  if (!validateForm()) {
    return;
  }

  // Disable submit button
  submitBtn.disabled = true;
  submitBtn.textContent = "Creating Event...";

  try {
    const auth = getAuth();
    const db = getFirestore();
    
    if (!auth || !db) {
      throw new Error("Firebase is not initialized");
    }

    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Get form values
    const title = eventTitle.value.trim();
    const description = eventDescription.value.trim();
    const date = eventDate.value;
    const time = eventTime.value;
    const location = eventLocation.value.trim();
    const attendees = eventAttendees.value ? parseInt(eventAttendees.value) : null;
    const isFree = freeEventToggle.checked;
    const price = isFree ? 0 : parseFloat(eventPrice.value) || 0;
    const flyerFile = eventFlyer.files[0];

    // Format date and time for display
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const timeObj = new Date(`2000-01-01T${time}`);
    const formattedTime = timeObj.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });

    // Prepare event data
    const eventData = {
      title: title,
      description: description,
      date: date,
      time: time,
      formattedDate: formattedDate,
      formattedTime: formattedTime,
      location: location,
      attendees: attendees,
      isFree: isFree,
      price: price,
      createdBy: user.email,
      createdByUid: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      flyerUrl: null,
      status: 'active'
    };

    // Upload flyer if provided
    let flyerUrl = null;
    if (flyerFile) {
      // For now, we'll store as base64. In production, upload to Firebase Storage
      const reader = new FileReader();
      flyerUrl = await new Promise((resolve) => {
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(flyerFile);
      });
      eventData.flyerUrl = flyerUrl;
    }

    // Save to Firestore
    const docRef = await db.collection('events').add(eventData);

    // Prepare data for summary page (URLSearchParams will handle encoding)
    const summaryData = {
      title: title,
      description: description,
      date: formattedDate,
      time: formattedTime,
      location: location,
      price: isFree ? 'Free' : `$${price.toFixed(2)}`,
      attendees: attendees ? attendees.toString() : '',
      flyerUrl: flyerUrl || ''
    };

    // Build URL with event data (URLSearchParams automatically encodes)
    const queryString = new URLSearchParams(summaryData).toString();
    
    // Redirect to event summary page
    window.location.href = `event-summary.html?${queryString}`;

  } catch (error) {
    console.error("Error creating event:", error);
    showMessage(error.message || "Failed to create event. Please try again.", "error");
    submitBtn.disabled = false;
    submitBtn.textContent = "Create Event";
  }
});

// Validation function
function validateForm() {
  let isValid = true;
  const errors = [];

  if (!eventTitle.value.trim()) {
    errors.push("Event title is required");
    eventTitle.classList.add("error");
    isValid = false;
  } else {
    eventTitle.classList.remove("error");
  }

  if (!eventDescription.value.trim()) {
    errors.push("Event description is required");
    eventDescription.classList.add("error");
    isValid = false;
  } else {
    eventDescription.classList.remove("error");
  }

  if (!eventDate.value) {
    errors.push("Event date is required");
    eventDate.classList.add("error");
    isValid = false;
  } else {
    eventDate.classList.remove("error");
  }

  if (!eventTime.value) {
    errors.push("Event time is required");
    eventTime.classList.add("error");
    isValid = false;
  } else {
    eventTime.classList.remove("error");
  }

  if (!eventLocation.value.trim()) {
    errors.push("Event location is required");
    eventLocation.classList.add("error");
    isValid = false;
  } else {
    eventLocation.classList.remove("error");
  }

  if (!freeEventToggle.checked && !eventPrice.value) {
    errors.push("Please enter a ticket price or mark the event as free");
    eventPrice.classList.add("error");
    isValid = false;
  } else {
    eventPrice.classList.remove("error");
  }

  if (errors.length > 0) {
    showMessage(errors.join(". "), "error");
  }

  return isValid;
}


// Message functions
function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = "message " + type;
  formMessage.style.display = "block";
}

function clearMessage() {
  formMessage.textContent = "";
  formMessage.className = "message";
  formMessage.style.display = "none";
}

// Initialize
checkAuth();

