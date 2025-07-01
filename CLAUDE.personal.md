# Personal Claude Configuration for Ryan Rozich

This file contains personal overrides for Claude's behavior that shouldn't be shared with other contributors.

## Git Commit Configuration

**OVERRIDE DEFAULT BEHAVIOR**: When creating commits through Claude:

1. Author commits as Ryan Rozich <github@rozich.com>
2. Include Claude as co-author WITHOUT the "Generated with Claude Code" line
3. Format:

```
git commit -m "feat: your commit message

Co-authored-by: Claude <noreply@anthropic.com>"
```

This ensures:

- Commits count towards Ryan's contribution graph
- Clear attribution that Claude assisted
- Professional commit messages without promotional text

## GitHub App Configuration for PRs

When using your personal GitHub App (e.g., `ryanrozich-claude`):

1. **Commits**: Still authored by Ryan Rozich (for contribution credit)
2. **Pull Requests**: Created by the GitHub App (so you can review them)
3. **Workflow**:
   - Claude commits as Ryan with co-authorship
   - Claude pushes branch and creates PR using the App identity
   - You review and merge the PR

This gives you both contribution credit AND the ability to review PRs.

## Personal Settings

- Git Author Name: Ryan Rozich
- Git Author Email: github@rozich.com
- GitHub App Name: ryanrozich-claude (or your chosen name)

## Note

This file is in .gitignore and won't be committed to the repository. Each contributor can create their own CLAUDE.personal.md with their preferences.
