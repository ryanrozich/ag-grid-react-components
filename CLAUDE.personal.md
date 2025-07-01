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

### Option B: Bot Account with Token (Recommended) ✅

**Setup Complete**: Bot account `ryanrozich-bot` is configured with token at `~/.github-tokens/ryanrozich-bot.txt`

**Full PR Workflow**:

1. **Claude creates branch and commits** (as Ryan with co-authorship):

   ```bash
   git checkout -b feature/branch-name
   # Make changes...
   git commit -m "feat: description

   Co-authored-by: Claude <noreply@anthropic.com>"
   git push -u origin feature/branch-name
   ```

2. **Claude creates PR using bot token**:

   ```bash
   GH_TOKEN=$(cat ~/.github-tokens/ryanrozich-bot.txt) gh pr create \
     --title "feat: your PR title" \
     --body "## Summary
   - Change 1
   - Change 2

   ## Test Plan
   - [ ] Tests pass
   - [ ] Manual testing complete

   Fixes #issue-number"
   ```

3. **Claude requests your review**:
   ```bash
   GH_TOKEN=$(cat ~/.github-tokens/ryanrozich-bot.txt) gh pr edit PR_NUMBER \
     --add-reviewer ryanrozich
   ```
4. **Claude notifies you**: "I've created PR #X and requested your review. I'll wait for your feedback."

5. **You review the PR**: Make comments, request changes, or approve

6. **Claude addresses feedback**: Commits fixes and responds to comments

7. **You merge the PR**: This gives you the merge commit credit

**Key Points**:

- Commits show as Ryan (contribution credit)
- PRs created by bot (allows review)
- You get merge commit credit
- Clear audit trail of human review

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
