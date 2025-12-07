# Account Creation Guide

## ✅ Account Creation is Ready!

You can now create accounts for login. The signup functionality is fully set up and ready to use.

## 🚀 How to Create an Account

### Method 1: Using the Signup Page (Recommended)

1. **Start your server:**
   ```bash
   npm start
   ```

2. **Open the signup page:**
   - Go to `http://localhost:8080/signup.html`
   - Or click "Create one" on the login page

3. **Fill in the form:**
   - Enter your email address
   - Create a password (minimum 6 characters)
   - Confirm your password

4. **Click "Create account"**
   - Your account will be created
   - You'll be automatically logged in
   - You'll be redirected to the event details page

### Method 2: From the Login Page

1. Go to the login page (`index.html`)
2. Click the **"Create one"** link at the bottom
3. You'll be taken to the signup page
4. Follow the steps above

## 📋 What Happens When You Create an Account

1. ✅ **Validation**: Your email and password are validated
2. ✅ **Account Creation**: A new account is created in Firebase
3. ✅ **Auto Login**: You're automatically logged in
4. ✅ **Redirect**: You're taken to the event details page

## 🔒 Account Requirements

- **Email**: Must be a valid email format (e.g., `user@example.com`)
- **Password**: Must be at least 6 characters long
- **Password Confirmation**: Must match the password

## ⚠️ Common Issues

### "Email already in use"
- **Solution**: This email is already registered. Use the login page instead, or use a different email.

### "Password is too weak"
- **Solution**: Choose a stronger password (at least 6 characters, mix of letters and numbers recommended).

### "Email/password accounts are not enabled"
- **Solution**: Go to Firebase Console → Authentication → Sign-in method → Enable "Email/Password"

### "Firebase is not initialized"
- **Solution**: Make sure you've updated `firebase-config.js` with your Firebase credentials.

## 🎯 Testing Account Creation

1. **Test the signup flow:**
   - Go to `signup.html`
   - Enter a test email: `test@example.com`
   - Enter a password: `password123`
   - Confirm the password
   - Click "Create account"

2. **Verify the account:**
   - Check Firebase Console → Authentication → Users
   - You should see your new account listed

3. **Test login:**
   - Go to `index.html`
   - Log in with the account you just created
   - You should be able to log in successfully

## 📝 Account Management

### View All Accounts
- Go to [Firebase Console](https://console.firebase.google.com/)
- Select your project
- Go to **Authentication** → **Users**
- You'll see all registered accounts

### Delete an Account (Admin)
- In Firebase Console → Authentication → Users
- Click the three dots next to a user
- Select "Delete user"

### Reset Password (User)
- Users can use the "Forgot your password?" link on the login page
- They'll receive a password reset email

## 🔐 Security Features

- ✅ Password minimum length (6 characters)
- ✅ Password confirmation required
- ✅ Email format validation
- ✅ Duplicate email prevention
- ✅ Secure password storage (Firebase handles encryption)
- ✅ Automatic session management

## 🎨 User Experience

- Clean, modern signup form
- Real-time validation
- Clear error messages
- Success feedback
- Automatic redirect after signup
- Password visibility toggle
- Link back to login page

## 📱 Mobile Friendly

The signup page is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## ✨ Next Steps

After creating an account, you can:
- ✅ Log in anytime
- ✅ Access event details
- ✅ Use collaboration features
- ✅ Add comments and notes
- ✅ Invite other collaborators

---

**Ready to create your first account?** Go to `signup.html` and get started! 🎉

