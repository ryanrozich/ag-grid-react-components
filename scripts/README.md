# Project Management Scripts

This directory contains scripts for managing GitHub issues and project synchronization.

## 🚀 Quick Start

To bootstrap everything at once:

```bash
npm run bootstrap:project
```text

Or run the shell script directly:

```bash
./scripts/bootstrap-all.sh
```text

## 📜 Available Scripts

### bootstrap-all.sh
Complete bootstrap that runs all scripts in the correct order:
1. Adds missing required labels to issues
2. Syncs project fields to issue labels
3. Triggers GitHub Actions for final sync

### add-missing-labels.js
Ensures all issues have required labels:
- Adds default type label if missing (enhancement)
- Adds default priority label if missing (medium)
- Adds default area label if missing (components)
- Adds default status label if missing (needs-triage)

```bash
node scripts/add-missing-labels.js
```text

### bootstrap-project-sync.js
Syncs all project field values to issue labels:
- Reads current project field values
- Updates issue labels to match
- Removes conflicting labels
- Handles all field types (Priority, Area, Type, Component, Status)

```bash
node scripts/bootstrap-project-sync.js
```text

## 🔄 How Sync Works

1. **Project → Labels**: When you change a field in the project, labels update automatically
2. **Labels → Project**: When you change labels on an issue, project fields update automatically
3. **Bidirectional**: Changes in either place stay synchronized

## 📋 Label Categories

### Required Labels (one from each)
- **Type**: bug, enhancement, documentation, question
- **Priority**: priority: critical/high/medium/low
- **Area**: area: components/demo/build/ci-cd/testing/docs

### Optional Labels
- **Status**: status: needs-triage/triaging/backlog/in-progress/in-review/done
- **Component**: component: date-filter/quick-filter-dropdown/active-filters/etc

## 🛠️ Troubleshooting

### "Command not found" error
Make sure you have Node.js installed and the GitHub CLI:
```bash
# Install GitHub CLI
brew install gh

# Authenticate
gh auth login
```text

### "GraphQL request failed" error
Your GitHub token might not have the right permissions:
```bash
# Check current auth status
gh auth status

# Re-authenticate with proper scopes
gh auth login --scopes "repo,project"
```

### Issues not updating
1. Check that the issue is in the project
2. Verify field values are set in the project
3. Run `gh issue view <number>` to see current labels

## 🤖 Automation

After bootstrap, the system maintains itself:
- GitHub Actions run every 5 minutes
- Changes sync automatically
- Manual trigger available in Actions tab

## 📊 Monitoring

View sync status:
- [GitHub Actions]([https://github.com/ryanrozich/ag-grid-react-components/action](https://github.com/ryanrozich/ag-grid-react-components/action)s)
- [Project Board]([https://github.com/users/ryanrozich/projects/](https://github.com/users/ryanrozich/projects/)1)
- [Issues List]([https://github.com/ryanrozich/ag-grid-react-components/issue](https://github.com/ryanrozich/ag-grid-react-components/issue)s)