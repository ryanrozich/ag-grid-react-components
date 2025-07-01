# GitHub Identity Management for Claude Code

## Overview

This document describes an optional pattern for managing GitHub identities when using Claude Code. This approach allows you to maintain contribution credit while enabling proper code review workflows.

## The Hybrid Approach (Recommended)

This pattern gives you the best of both worlds:

- **Commits**: Authored by you (for contribution graph credit)
- **Pull Requests**: Created by your GitHub App (so you can review them)

### How It Works

1. **Claude commits as you** with co-authorship attribution
2. **Claude creates PRs using your GitHub App** identity
3. **You review and approve** your own PRs
4. **Clear audit trail** of human + AI collaboration

### Benefits

- ✅ Your contribution graph shows all activity
- ✅ You can review and approve PRs
- ✅ Clear attribution of AI assistance
- ✅ Professional workflow with proper code review
- ✅ Threaded PR discussions between you and Claude

## Setting Up the Hybrid Approach

### Step 1: Create Your Personal GitHub App

1. **Go to GitHub Settings**

   - Navigate to Settings → Developer settings → GitHub Apps → New GitHub App

2. **Configure Your App**

   - **Name**: `yourname-claude` (e.g., `ryanrozich-claude`)
   - **Homepage URL**: `https://claude.ai/code`
   - **Webhook**: Uncheck "Active" (not needed)
   - **Permissions**:
     - Repository permissions:
       - Contents: Read & Write
       - Pull requests: Read & Write
       - Issues: Read & Write (optional)
       - Actions: Read (to see workflow status)
     - Account permissions: None

3. **Create and Download Private Key**

   - After creating, click "Generate a private key"
   - Save the `.pem` file securely (never commit this!)
   - Store it at: `~/.github-apps/yourname-claude/private-key.pem`

4. **Install on Your Repositories**
   - Go to: `https://github.com/apps/your-app-name`
   - Click "Install"
   - Select repositories to grant access

### Step 2: Configure Claude Personal Settings

Create `CLAUDE.personal.md` in your project root:

````markdown
# Personal Claude Configuration

## Git Commit Configuration

You MUST:

1. Author commits as: Your Name <your-email@example.com>
2. Include Claude as co-author WITHOUT promotional text
3. Format commits as:

   ```
   git commit -m "feat: your message

   Co-authored-by: Claude <noreply@anthropic.com>"
   ```

```

## GitHub App Configuration

- App Name: yourname-claude
- App ID: [your app id]
- Private Key Location: ~/.github-apps/yourname-claude/private-key.pem

## Workflow

1. Make commits as me (for contribution credit)
2. Create PRs using the GitHub App (so I can review)
```
````

This file is automatically loaded by Claude and is gitignored.

## Example Workflow

### 1. Claude Makes Changes

```bash
# Claude commits as you with co-authorship
git add .
git commit -m "feat: add new date filter component

Co-authored-by: Claude <noreply@anthropic.com>"
```

### 2. Claude Creates PR

```bash
# Using your GitHub App identity
gh pr create --title "Add new date filter component" \
  --body "## Summary
  - Added new date filter with relative date support
  - Includes comprehensive test coverage

  ## Test Plan
  - [x] Unit tests pass
  - [x] E2E tests pass
  - [x] Manual testing completed"
```

### 3. You Review

- PR shows as created by `yourname-claude[bot]`
- Commits show you as author (contribution credit maintained)
- You can review, comment, and approve
- Clear separation between human review and AI implementation

## Alternative Approaches

### Bot Account (Simpler Setup)

If you prefer not to create a GitHub App:

1. Create a dedicated GitHub account (e.g., `yourname-bot`)
2. Add it as a collaborator to your repos
3. Generate a PAT for the bot account
4. Configure Claude to use bot credentials for PRs

### Direct Commits (No Review)

If you don't need PR reviews:

- Let Claude commit and push directly as you
- Still use co-authorship for transparency
- Simpler but less rigorous process

## Security Best Practices

- **Never commit tokens or private keys**
- **Store credentials securely** (use password managers or encrypted storage)
- **Rotate tokens regularly**
- **Use minimal permissions** (only what's needed)
- **Review GitHub App installations** periodically

## FAQ

### Why use this pattern?

- Maintains your contribution graph activity
- Enables proper code review workflow
- Provides clear AI collaboration transparency
- Separates implementation from review

### Is this required?

No, this is completely optional. You can:

- Use Claude with your normal GitHub account
- Skip PRs and commit directly
- Use whatever workflow suits your needs

### What about teams?

Teams can:

- Create a shared GitHub App for the team
- Each member can have their own app
- Use organization-level apps with proper permissions

## Resources

- [GitHub Apps Documentation](https://docs.github.com/en/apps)
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Conventional Commits](https://www.conventionalcommits.org/)
