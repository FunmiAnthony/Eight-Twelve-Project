# Quick Start Guide - Firebase Login Setup

## 🚀 Quick Setup (5 minutes)

### 1. Configure Firebase (2 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create or select a project
3. Enable **Authentication** → **Email/Password**
4. Get your config from **Project Settings** → **Your apps**
5. Update `firebase-config.js` with your credentials

### 2. Test Login (1 minute)

1. Run `npm start`
2. Go to `http://localhost:8080`
3. Click **"Create one"** to sign up
4. Create an account
5. Log in!

## ✅ What's Already Working

- ✅ Login page (`index.html`)
- ✅ Signup page (`signup.html`) 
- ✅ Password reset functionality
- ✅ Event details page with authentication
- ✅ Logout button
- ✅ Real-time collaboration features

## 📝 Files You Need to Update

**Only one file needs your Firebase credentials:**

- `firebase-config.js` - Add your Firebase config values

## 🔑 Firebase Setup Checklist

- [ ] Firebase project created
- [ ] Email/Password authentication enabled
- [ ] Firestore Database created (for collaboration features)
- [ ] `firebase-config.js` updated with your credentials
- [ ] Test account created (via signup page or Firebase Console)

## 🎯 Next Steps After Setup

1. **Test the login flow:**
   - Sign up a new account
   - Log in
   - Check event details page loads

2. **Test collaboration features:**
   - Invite a collaborator
   - Add comments
   - See real-time updates

3. **Customize:**
   - Update branding/colors
   - Add more features
   - Deploy to production

## 📚 Detailed Guides

- **Complete Setup**: See `FIREBASE_LOGIN_SETUP.md`
- **Firebase Setup**: See `FIREBASE_SETUP.md`
- **GitHub Collaboration**: See `GITHUB_SETUP.md`
- **Contributing**: See `CONTRIBUTING.md`

## 🐛 Common Issues

**"Firebase is not initialized"**
→ Update `firebase-config.js` with your actual Firebase credentials

**"auth/operation-not-allowed"**
→ Enable Email/Password in Firebase Console → Authentication → Sign-in method

**"auth/user-not-found"**
→ Create a user account first (use signup page)

**Login works but can't see event details**
→ Check browser console for errors, verify `event-details.html` exists

---

**Need help?** Check the detailed guides or open an issue on GitHub!

