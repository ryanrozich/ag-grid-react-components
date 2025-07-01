# Personal Claude Configuration for Ryan Rozich

This file contains personal overrides for Claude's behavior that shouldn't be shared with other contributors.

## Git Commit Configuration

You MUST:

1. Author commits as Ryan Rozich <github@rozich.com>
2. Include Claude as co-author WITHOUT the "Generated with Claude Code" line
3. Format:

```
git commit -m "feat: your commit message

Co-authored-by: Claude <noreply@anthropic.com>"
```

## PR Creation Approach

**IMPORTANT**: Claude cannot directly authenticate as a GitHub App. Choose one approach:

### Option A: Manual PR Creation (Recommended for Now)

1. Claude commits as Ryan with co-authorship
2. Claude pushes the branch: `git push -u origin branch-name`
3. Claude provides the command for you to run manually:
   ```bash
   echo "Please create a PR at: https://github.com/ryanrozich/ag-grid-react-components/compare/branch-name"
   ```
4. You create the PR from GitHub UI (allows you to review it)

### Option B: Bot Account with Token (Recommended)

**Setup Required (one-time)**:

1. Create bot account: `ryanrozich-bot`
2. Generate PAT for bot account
3. Save token: `echo "ghp_xxxx" > ~/.github-tokens/ryanrozich-bot.txt`
4. Set permissions: `chmod 600 ~/.github-tokens/ryanrozich-bot.txt`

**Workflow**:

1. Claude commits as Ryan with co-authorship (normal git operations)
2. Claude creates PR using bot token:
   ```bash
   # One-line command to create PR as bot
   GH_TOKEN=$(cat ~/.github-tokens/ryanrozich-bot.txt) gh pr create \
     --title "feat: your PR title" \
     --body "Description"
   ```
3. PR shows as created by bot (you can review)
4. All other operations continue as Ryan (no switching back needed)

### Option C: Direct PR (No Review Needed)

1. Claude commits and creates PR as Ryan
2. No ability to review your own PR
3. Simpler but less rigorous

## Current Configuration

- Git Author Name: Ryan Rozich
- Git Author Email: github@rozich.com
- GitHub App Name: ryanrozich-claude (created but not integrated)
- GitHub App ID: 1491548
- Private Key Location: ~/.github-apps/ryanrozich-claude/private-key.pem

## Note

This file is in .gitignore and won't be committed to the repository.
