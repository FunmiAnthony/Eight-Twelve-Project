# Firebase Setup Instructions

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

## Step 2: Enable Authentication

1. In your Firebase project, go to **Authentication** in the left sidebar
2. Click **Get Started**
3. Click on the **Sign-in method** tab
4. Enable **Email/Password** authentication:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

## Step 3: Get Your Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Select **Project settings**
3. Scroll down to "Your apps" section
4. If you haven't added a web app yet:
   - Click the **Web** icon (`</>`)
   - Register your app with a nickname (e.g., "8:12 Web App")
   - Click "Register app"
5. Copy the `firebaseConfig` object that appears

## Step 4: Update firebase-config.js

Open `firebase-config.js` and replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",                    // Replace with your apiKey
  authDomain: "YOUR_AUTH_DOMAIN",            // Replace with your authDomain
  projectId: "YOUR_PROJECT_ID",              // Replace with your projectId
  storageBucket: "YOUR_STORAGE_BUCKET",      // Replace with your storageBucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Replace with your messagingSenderId
  appId: "YOUR_APP_ID"                       // Replace with your appId
};
```

## Step 5: Test the Login

1. Start your local server: `npm start`
2. Go to the login page
3. Create a test account by clicking "Create one" (if you implement signup) or create one manually in Firebase Console:
   - Go to Authentication > Users
   - Click "Add user"
   - Enter an email and password
4. Try logging in with those credentials

## Security Note

⚠️ **Important**: The Firebase configuration in `firebase-config.js` contains public keys that are safe to expose in client-side code. However, make sure you have proper security rules set up in Firebase for any database or storage you use.

## Troubleshooting

- **"Firebase is not initialized"**: Make sure you've updated `firebase-config.js` with your actual Firebase credentials
- **"auth/user-not-found"**: The email doesn't exist. Create a user account first
- **"auth/wrong-password"**: The password is incorrect
- **Network errors**: Check your internet connection and Firebase project status

