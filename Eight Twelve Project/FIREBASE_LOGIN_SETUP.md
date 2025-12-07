# Firebase Login Setup - Complete Guide

This guide will walk you through setting up Firebase authentication for the login page.

## ✅ Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or select an existing project
3. Enter project name: `eight-twelve-project` (or your preferred name)
4. Follow the setup wizard:
   - Disable Google Analytics (optional, you can enable later)
   - Click **"Create project"**
5. Wait for project creation to complete, then click **"Continue"**

## ✅ Step 2: Enable Email/Password Authentication

1. In your Firebase project dashboard, click **"Authentication"** in the left sidebar
2. Click **"Get started"** (if you see this button)
3. Click on the **"Sign-in method"** tab at the top
4. Find **"Email/Password"** in the list
5. Click on **"Email/Password"**
6. Toggle **"Enable"** to **ON**
7. **Important**: Also enable **"Email link (passwordless sign-in)"** if you want passwordless login (optional)
8. Click **"Save"**

## ✅ Step 3: Get Firebase Configuration

1. In Firebase Console, click the **gear icon ⚙️** next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to the **"Your apps"** section
4. If you haven't added a web app yet:
   - Click the **Web icon** (`</>`)
   - Register your app with a nickname: **"8:12 Web App"**
   - **Do NOT** check "Also set up Firebase Hosting" (unless you want to)
   - Click **"Register app"**
5. You'll see a `firebaseConfig` object. Copy these values:
   ```javascript
   apiKey: "AIza..."
   authDomain: "your-project.firebaseapp.com"
   projectId: "your-project-id"
   storageBucket: "your-project.appspot.com"
   messagingSenderId: "123456789"
   appId: "1:123456789:web:abc123"
   ```

## ✅ Step 4: Update firebase-config.js

1. Open `firebase-config.js` in your project
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",                    // Your actual API key
  authDomain: "your-project.firebaseapp.com",  // Your auth domain
  projectId: "your-project-id",              // Your project ID
  storageBucket: "your-project.appspot.com",  // Your storage bucket
  messagingSenderId: "123456789",            // Your messaging sender ID
  appId: "1:123456789:web:abc123"            // Your app ID
};
```

**⚠️ Important**: These are public keys and safe to expose in client-side code. Firebase security is handled through security rules.

## ✅ Step 5: Create User Accounts

You have two options:

### Option A: Use the Signup Page (Recommended)
1. Go to `signup.html` (we'll create this)
2. Fill in the form and create an account
3. You'll be automatically logged in

### Option B: Create Users Manually in Firebase Console
1. Go to **Authentication** → **Users** tab
2. Click **"Add user"**
3. Enter email and password
4. Click **"Add user"**

## ✅ Step 6: Test the Login

1. Start your local server:
   ```bash
   npm start
   ```
2. Open `http://localhost:8080` in your browser
3. Try logging in with a user account you created
4. You should be redirected to `event-details.html` on successful login

## 🔒 Step 7: Configure Firestore Security Rules (For Collaboration Features)

If you're using the collaboration features, you need to set up Firestore security rules:

1. Go to **Firestore Database** in Firebase Console
2. Click **"Create database"** (if you haven't already)
3. Start in **test mode** (we'll update rules)
4. Click **"Rules"** tab
5. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Events collection
    match /events/{eventId} {
      // Allow read/write if user is authenticated
      allow read, write: if request.auth != null;
      
      // Collaborators subcollection
      match /collaborators/{collaboratorId} {
        allow read, write: if request.auth != null;
      }
      
      // Comments subcollection
      match /comments/{commentId} {
        allow read: if request.auth != null;
        allow create: if request.auth != null && 
                         request.resource.data.authorEmail == request.auth.token.email;
        allow update, delete: if request.auth != null && 
                                 resource.data.authorEmail == request.auth.token.email;
      }
      
      // Presence subcollection
      match /presence/{userId} {
        allow read: if request.auth != null;
        allow write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

6. Click **"Publish"**

## 🐛 Troubleshooting

### "Firebase is not initialized"
- **Solution**: Make sure you've updated `firebase-config.js` with your actual Firebase credentials
- Check browser console for errors

### "auth/user-not-found"
- **Solution**: The email doesn't exist. Create a user account first (via signup page or Firebase Console)

### "auth/wrong-password"
- **Solution**: The password is incorrect. Use the "Forgot password" link to reset it

### "auth/invalid-api-key"
- **Solution**: Check that your API key in `firebase-config.js` is correct

### "auth/operation-not-allowed"
- **Solution**: Email/Password authentication is not enabled. Go to Firebase Console → Authentication → Sign-in method → Enable Email/Password

### Network errors
- **Solution**: Check your internet connection
- Verify Firebase project is active in Firebase Console
- Check browser console for CORS or network errors

### Login works but redirect fails
- **Solution**: Make sure `event-details.html` exists in the same directory
- Check browser console for JavaScript errors

## 📝 Next Steps

- ✅ Login is now working!
- Create a signup page for new users
- Add user profile management
- Implement logout functionality
- Add social login (Google, Facebook, etc.) if needed

## 🔐 Security Best Practices

1. **Never commit sensitive data**: Firebase config keys are public, but don't commit API keys for other services
2. **Use security rules**: Always set up proper Firestore security rules
3. **Validate on server**: For production, add server-side validation
4. **Enable email verification**: Consider requiring email verification for new accounts
5. **Rate limiting**: Firebase has built-in rate limiting, but monitor for abuse

---

**Need help?** Check the [Firebase Documentation](https://firebase.google.com/docs/auth/web/start) or open an issue on GitHub.

