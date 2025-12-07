# GitHub Setup Guide

This guide will help you set up your Eight Twelve Project on GitHub for collaboration.

## Initial Setup

### 1. Initialize Git Repository (if not already done)

```bash
git init
```

### 2. Add All Files

```bash
git add .
```

### 3. Create Initial Commit

```bash
git commit -m "Initial commit: Eight Twelve Project"
```

## Creating a GitHub Repository

### Option 1: Using GitHub Website

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it `eight-twelve-project` (or your preferred name)
5. Choose public or private
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### Option 2: Using GitHub CLI (if installed)

```bash
gh repo create eight-twelve-project --public --source=. --remote=origin --push
```

## Connecting Local Repository to GitHub

### 1. Add Remote Repository

```bash
git remote add origin https://github.com/YOUR_USERNAME/eight-twelve-project.git
```

Replace `YOUR_USERNAME` with your GitHub username.

### 2. Push to GitHub

```bash
git branch -M main
git push -u origin main
```

## Setting Up for Collaboration

### 1. Add Collaborators

1. Go to your repository on GitHub
2. Click "Settings" → "Collaborators"
3. Click "Add people"
4. Enter the GitHub username or email of the collaborator
5. Choose their access level (Read, Write, or Admin)
6. They will receive an invitation email

### 2. Branch Protection (Optional but Recommended)

1. Go to "Settings" → "Branches"
2. Add a branch protection rule for `main`
3. Enable:
   - Require pull request reviews
   - Require status checks to pass
   - Require branches to be up to date

### 3. Enable Issues and Discussions

1. Go to "Settings" → "General"
2. Enable "Issues" and "Discussions" if you want to use them

## Workflow for Collaborators

### For New Collaborators

1. **Fork the repository** (or clone if they have direct access):
   ```bash
   git clone https://github.com/YOUR_USERNAME/eight-twelve-project.git
   cd eight-twelve-project
   ```

2. **Create a branch** for their work:
   ```bash
   git checkout -b feature/their-feature-name
   ```

3. **Make changes and commit**:
   ```bash
   git add .
   git commit -m "Add: description of changes"
   ```

4. **Push to GitHub**:
   ```bash
   git push origin feature/their-feature-name
   ```

5. **Create a Pull Request** on GitHub

### For Repository Maintainers

1. Review Pull Requests
2. Test the changes
3. Merge when ready
4. Delete the feature branch after merging

## Common Git Commands

```bash
# Check status
git status

# See all branches
git branch

# Switch branches
git checkout branch-name

# Pull latest changes
git pull origin main

# See commit history
git log

# Undo last commit (keep changes)
git reset --soft HEAD~1

# See remote repositories
git remote -v
```

## Troubleshooting

### If you get "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/eight-twelve-project.git
```

### If you need to update your remote URL
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/eight-twelve-project.git
```

### If you have merge conflicts
1. Pull the latest changes: `git pull origin main`
2. Resolve conflicts in your editor
3. Stage resolved files: `git add .`
4. Complete the merge: `git commit`

## Next Steps

- Review [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
- Set up GitHub Actions for CI/CD (optional)
- Configure branch protection rules
- Add project description and topics on GitHub

Happy collaborating! 🎉

