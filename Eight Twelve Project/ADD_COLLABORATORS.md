# How to Add Collaborators to Your Repository

## Step-by-Step Guide

### Step 1: Open Collaborator Settings
1. Go to: **https://github.com/FunmiAnthony/Eight-Twelve-Project**
2. Click the **"Settings"** tab (top menu, next to "Insights")
3. In the left sidebar, click **"Collaborators"** (under "Access")
4. Click **"Add people"** button

### Step 2: Add Collaborators
1. In the search box, enter:
   - **GitHub username** (e.g., `username123`)
   - **OR** their **email address** (the one associated with their GitHub account)
2. Select the person from the dropdown
3. Choose their **access level**:
   - **Read**: Can view and clone (view-only)
   - **Write**: Can push changes (recommended for active collaborators)
   - **Admin**: Full access (can manage settings, delete repo)
4. Click **"Add [username] to this repository"**

### Step 3: Collaborator Accepts Invitation
- They'll receive an email invitation
- They need to click the link in the email
- Or they can go to: **https://github.com/FunmiAnthony/Eight-Twelve-Project/invitations**

## What You Need from Collaborators

To add them, you need one of these:
- ✅ Their **GitHub username** (e.g., `@username`)
- ✅ Their **GitHub email address**
- ✅ Their **full name** (if it matches their GitHub profile)

## Access Levels Explained

| Level | Can View | Can Clone | Can Push | Can Manage Settings |
|-------|----------|-----------|----------|---------------------|
| **Read** | ✅ | ✅ | ❌ | ❌ |
| **Write** | ✅ | ✅ | ✅ | ❌ |
| **Admin** | ✅ | ✅ | ✅ | ✅ |

**Recommendation**: Use **"Write"** for most collaborators so they can contribute code.

## After Adding Collaborators

Once added, they can:
1. **Clone the repository:**
   ```bash
   git clone https://github.com/FunmiAnthony/Eight-Twelve-Project.git
   ```

2. **Pull latest changes:**
   ```bash
   git pull origin main
   ```

3. **Make changes and push:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

## Quick Link

**Direct link to add collaborators:**
https://github.com/FunmiAnthony/Eight-Twelve-Project/settings/access

## Troubleshooting

**"User not found"**
- Check the username spelling
- Make sure they have a GitHub account
- Try using their email instead

**"Already a collaborator"**
- They're already added
- Check the collaborators list

**"Invitation pending"**
- They haven't accepted yet
- Remind them to check their email
- They can also check: https://github.com/FunmiAnthony/Eight-Twelve-Project/invitations

---

**Ready to add collaborators?** Use the link above or follow the steps!

