# Script to connect Eight Twelve Project to GitHub
# Run this after creating your GitHub repository

# Replace YOUR_REPO_NAME with your actual repository name
$repoName = "eight-twelve-project"
$username = "FunmiAnthony"

Write-Host "Connecting to GitHub repository..." -ForegroundColor Cyan

# Add remote origin
git remote add origin "https://github.com/$username/$repoName.git"

# Verify remote was added
Write-Host "`nRemote repositories:" -ForegroundColor Green
git remote -v

# Push to GitHub
Write-Host "`nPushing to GitHub..." -ForegroundColor Cyan
git branch -M main
git push -u origin main

Write-Host "`n✅ Successfully connected to GitHub!" -ForegroundColor Green
Write-Host "Repository URL: https://github.com/$username/$repoName" -ForegroundColor Cyan

