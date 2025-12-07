# Firebase Configuration Guide - Step by Step

This guide shows you exactly where to find each configuration value in Firebase Console.

## 📍 Where to Find Your Firebase Configuration

### Step 1: Open Firebase Console
1. Go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Sign in with your Google account
3. Select your project (or create a new one)

### Step 2: Navigate to Project Settings
1. Click the **gear icon ⚙️** next to "Project Overview" (top left)
2. Click **"Project settings"** from the dropdown menu

### Step 3: Find "Your apps" Section
1. Scroll down to the **"Your apps"** section
2. You'll see a list of apps (iOS, Android, Web, etc.)

### Step 4: Add a Web App (if you haven't already)
If you don't see a web app:
1. Click the **Web icon** (`</>`) 
2. Enter a nickname: **"8:12 Web App"** (or any name you prefer)
3. **DO NOT** check "Also set up Firebase Hosting" (unless you want to)
4. Click **"Register app"**

### Step 5: Copy Your Configuration
After registering, you'll see a code block that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC1234567890abcdefghijklmnopqrstuv",
  authDomain: "your-project-name.firebaseapp.com",
  projectId: "your-project-name",
  storageBucket: "your-project-name.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

**OR** you might see it in a different format. Look for these 6 values:

## 🔑 The 6 Values You Need

### 1. `apiKey`
- **What it is**: Your Firebase API key
- **Looks like**: `"AIzaSyC1234567890abcdefghijklmnopqrstuv"`
- **Where to find**: In the `firebaseConfig` object, labeled as `apiKey`

### 2. `authDomain`
- **What it is**: Your authentication domain
- **Looks like**: `"your-project-name.firebaseapp.com"`
- **Where to find**: In the `firebaseConfig` object, labeled as `authDomain`
- **Format**: Usually `[your-project-id].firebaseapp.com`

### 3. `projectId`
- **What it is**: Your Firebase project ID
- **Looks like**: `"your-project-name"` or `"eight-twelve-project"`
- **Where to find**: In the `firebaseConfig` object, labeled as `projectId`
- **Also visible**: At the top of Project Settings page

### 4. `storageBucket`
- **What it is**: Your Firebase Storage bucket
- **Looks like**: `"your-project-name.appspot.com"`
- **Where to find**: In the `firebaseConfig` object, labeled as `storageBucket`
- **Format**: Usually `[your-project-id].appspot.com`

### 5. `messagingSenderId`
- **What it is**: Your messaging sender ID (for push notifications)
- **Looks like**: `"123456789012"` (a long number)
- **Where to find**: In the `firebaseConfig` object, labeled as `messagingSenderId`

### 6. `appId`
- **What it is**: Your app ID
- **Looks like**: `"1:123456789012:web:abcdef1234567890"`
- **Where to find**: In the `firebaseConfig` object, labeled as `appId`
- **Format**: Usually starts with `1:` followed by numbers, then `:web:`, then more characters

## 📝 How to Update firebase-config.js

1. Open `firebase-config.js` in your project
2. Replace each placeholder with the actual value from Firebase Console
3. Keep the quotes around each value
4. Make sure there are no extra spaces or typos

### Example:

**Before (placeholders):**
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

**After (with real values):**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC1234567890abcdefghijklmnopqrstuv",
  authDomain: "eight-twelve-project.firebaseapp.com",
  projectId: "eight-twelve-project",
  storageBucket: "eight-twelve-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

## ⚠️ Important Notes

1. **Keep the quotes**: All values must be in quotes (strings)
2. **No trailing commas**: Don't add a comma after the last item
3. **Exact match**: Copy the values exactly as they appear (case-sensitive)
4. **Public keys**: These are safe to expose in client-side code - Firebase handles security through rules

## 🔍 Alternative: SDK Setup Tab

If you don't see the config immediately:
1. In Project Settings, click the **"SDK setup and configuration"** tab
2. Select **"Config"** (not "npm")
3. You'll see the same `firebaseConfig` object

## ✅ Verification

After updating `firebase-config.js`:
1. Save the file
2. Open your app in the browser
3. Check the browser console (F12) for any Firebase errors
4. If you see "Firebase is not initialized" - double-check your config values
5. If no errors, try logging in!

## 🎯 Quick Checklist

- [ ] Opened Firebase Console
- [ ] Went to Project Settings (gear icon)
- [ ] Found "Your apps" section
- [ ] Added/selected Web app
- [ ] Copied all 6 values:
  - [ ] apiKey
  - [ ] authDomain
  - [ ] projectId
  - [ ] storageBucket
  - [ ] messagingSenderId
  - [ ] appId
- [ ] Updated firebase-config.js
- [ ] Saved the file
- [ ] Tested the app

---

**Still having trouble?** Make sure:
- You're signed into Firebase Console
- You've selected the correct project
- You've registered a Web app (not iOS/Android)
- You're copying from the "Config" tab, not "npm"

