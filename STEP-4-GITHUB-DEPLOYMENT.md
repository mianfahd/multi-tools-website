# Step 4: GitHub Deployment Instructions

Follow these commands in your project root directory to initialize git, set up your remote, and push your Next.js project to GitHub:

```sh
# 1. Initialize git (if not already initialized)
git init

# 2. Add all project files (make sure your .gitignore is correct!)
git add .

# 3. Commit with a clear message
git commit -m "Initial commit: Next.js 13+ multi-tools website"

# 4. Add your GitHub remote (replace if already set)
git remote add origin https://github.com/mianfahd/multi-tools-website.git

# 5. Rename your branch to main
git branch -M main

# 6. Push to GitHub (main branch)
git push -u origin main
```

**Notes:**
- Make sure your `.gitignore` is present and correct before running `git add .` so that unnecessary files are not committed.
- If you already have a remote set, you may need to run `git remote remove origin` before adding the new one.
- After this, your project will be live on your GitHub repository.
