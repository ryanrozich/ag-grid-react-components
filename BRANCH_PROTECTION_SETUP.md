# Branch Protection Setup Guide

Follow these steps to protect your main branch and enforce PR workflow.

## Step 1: Navigate to Branch Protection Settings

1. Go to your repository: <[https://github.com/ryanrozich/ag-grid-react-components>](https://github.com/ryanrozich/ag-grid-react-components>)
2. Click **Settings** tab
3. In the left sidebar, click **Branches**
4. Click **Add rule** button

## Step 2: Configure Protection Rules

### Branch name pattern

- Enter: `main`

### Protect matching branches

Check these boxes:

#### ✅ Require a pull request before merging

- ✅ **Include administrators** (IMPORTANT: This applies rules to you too!)
- ❌ Require approvals (skip - you're solo)
- ✅ **Dismiss stale pull request approvals when new commits are pushed**
- ❌ Require review from CODEOWNERS (skip)
- ❌ Restrict who can dismiss reviews (skip)

#### ✅ Require status checks to pass before merging

- ✅ **Require branches to be up to date before merging**
- Search and add these status checks (if available):
  - `Run Tests`
  - `Check Code Quality`
  - `tests`
  - Any other CI checks that appear

#### ✅ Require conversation resolution before merging

- Ensures all PR comments are addressed

#### Additional settings (optional but recommended)

- ❌ Require signed commits (skip for now)
- ❌ Require linear history (skip - we're using squash merge)
- ✅ **Include administrators** (appears again - make sure it's checked!)
- ❌ Restrict who can push (skip - you need to push)
- ❌ Allow force pushes (keep disabled)
- ❌ Allow deletions (keep disabled)

## Step 3: Click "Create" or "Save changes"

## What This Accomplishes

1. **No more direct pushes to main** - Everything goes through PRs
2. **CI runs on every PR** - Catches issues before merge
3. **Clean history** - Squash merge keeps things tidy
4. **Self-discipline** - Even though you're solo, you follow the process

## Testing Your Setup

Try this to confirm it's working:

````bash
# This should fail
git checkout main
echo "test" >> README.md
git add . && git commit -m "test"
git push origin main
# ❌ Should be rejected

# This should work
git checkout -b test/branch-protection
echo "test" >> README.md
git add . && git commit -m "test: verify branch protection"
git push -u origin test/branch-protection
gh pr create --title "test: branch protection" --body "Testing setup"
# ✅ Should create PR successfully
```text

## First Real PR Workflow

Now let's create your first proper issue + PR:

```bash
# 1. Create an issue for the failing test we need to fix
gh issue create \
  --title "Fix DateFilter integration test and restore prepublishOnly" \
  --body "The DateFilter integration test is failing on line 446. Need to fix the test and restore 'npm run test:unit' to prepublishOnly script."

# 2. Create a branch (assuming issue #17)
git checkout main
git pull origin main
git checkout -b fix/datefilter-test

# 3. Make your fixes
# ... edit files ..

# 4. Commit and push
git add .
git commit -m "fix: correct DateFilter boundary inclusivity test"
git push -u origin fix/datefilter-test

# 5. Create PR
gh pr create \
  --title "fix: DateFilter test and restore prepublishOnly" \
  --body "Fixes DateFilter integration test failing at line 446.

Restores test requirement in prepublishOnly script.

Closes #17"

# 6. Check CI status
gh pr checks

# 7. Merge when ready
gh pr merge --squash --delete-branch
````

## Tips

1. **Can't push to main?** Good! That means it's working.
2. **Need to fix something quickly?** Still use a PR - it's good practice.
3. **PR seems like overkill?** The history and CI checks are worth it.
4. **Forgot to create issue first?** Create it after and link in PR body.

## Emergency Override

If you absolutely need to bypass (not recommended):

1. Settings → Branches → Edit rule
2. Uncheck "Include administrators" temporarily
3. Make your change
4. **IMMEDIATELY re-enable "Include administrators"**

Better approach: Just use the PR workflow, even for emergencies!
