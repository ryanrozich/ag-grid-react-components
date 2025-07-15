# Scripts Directory

This directory contains various scripts used for development, building, quality assurance, and project management. Scripts are organized by purpose to make them easier to find and maintain.

## Directory Structure

### `/build`
Build and deployment related scripts:
- `generate-og-image.js` - Generate Open Graph images for social sharing
- `generate-version-info.js` - Generate version information for builds
- `publish-local.sh` - Publish package locally for testing

### `/dev`
Development workflow scripts:
- `bootstrap-all.sh` - Bootstrap the entire project
- `pre-push.sh` - Pre-push git hook (runs all tests)
- `pre-push-quick.sh` - Quick pre-push hook (skips E2E tests)
- `test-filter-click.js` - Test filter click functionality
- `thorough-demo-check.js` - Thorough demo validation
- `validate-demo.js` - Basic demo validation

### `/quality`
Code quality and linting scripts:
- `check-codeql.js` - Check CodeQL analysis results
- `check-fonts.js` - Validate font usage
- `check-whitespace.sh` - Check for whitespace issues
- `fix-whitespace.sh` - Fix whitespace issues
- `test-code-block-fonts.js` - Test code block font rendering

### `/github`
GitHub-specific automation and project management:
- **Label Management:**
  - `add-missing-labels.js` - Add required labels to issues
  - `add-new-status-labels.js` - Add new status labels
  - `create-all-labels.js` - Create all project labels
  - `create-preview-labels.js` - Create preview-related labels
  - `sync-labels-to-project.js` - Sync labels to project fields
  - `update-all-status-labels.js` - Update status labels

- **Project Synchronization:**
  - `bootstrap-project-sync.js` - Bootstrap project field sync
  - `bootstrap-project-sync-all.js` - Sync all project fields
  - `manual-project-sync.js` - Manual project sync
  - `sync-issue-status.js` - Sync issue status

- **PR Management:**
  - `sync-pr-labels-from-issues.js` - Sync PR labels from linked issues
  - `fix-pr-statuses.js` - Fix PR status labels
  - `fix-all-pr-statuses.js` - Fix all PR statuses
  - `fix-pr-project-status.js` - Fix PR project status
  - `cleanup-pr-status-labels.js` - Clean up PR status labels
  - `cleanup-merged-pr-deployments.js` - Clean up merged PR deployments

- **Milestone Management:**
  - `create-milestone.js` - Create new milestone
  - `assign-to-milestone.js` - Assign issues to milestone
  - `milestone-overview.js` - Show milestone overview

- **Branch Protection:**
  - `setup-branch-protection.sh` - Setup branch protection rules
  - `check-branch-protection.sh` - Check branch protection status

### `/release`
Release management scripts (to be added as needed)

### `/utils`
Shared utilities:
- `ensure-project-root.mjs` - Ensure scripts run from project root
- `run-tsx.js` - Run TypeScript files directly

## Usage

Most scripts are executed through npm scripts defined in `package.json`. For example:
- `npm run pre-push` - Run pre-push checks
- `npm run check:whitespace` - Check whitespace
- `npm run sync:labels` - Sync GitHub labels

## 🚀 Quick Start

To bootstrap the project management system:

```bash
npm run bootstrap:project
```

## 🔄 How GitHub Sync Works

1. **Project → Labels**: When you change a field in the project, labels update automatically
2. **Labels → Project**: When you change labels on an issue, project fields update automatically
3. **Bidirectional**: Changes in either place stay synchronized

## 📋 Label Categories

### Required Labels (one from each):
- **Type**: bug, enhancement, documentation, question
- **Priority**: priority: critical/high/medium/low
- **Area**: area: components/demo/build/ci-cd/testing/docs

### Optional Labels:
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
```

### "GraphQL request failed" error
Your GitHub token might not have the right permissions:
```bash
# Check current auth status
gh auth status

# Re-authenticate with proper scopes
gh auth login --scopes "repo,project"
```

## Adding New Scripts

When adding new scripts:
1. Place them in the appropriate subdirectory based on their purpose
2. Update the relevant npm scripts in `package.json`
3. Add documentation here explaining what the script does
4. Consider if the script is one-time setup or recurring use

## 📊 Monitoring

View sync status:
- [GitHub Actions](https://github.com/ryanrozich/ag-grid-react-components/actions)
- [Project Board](https://github.com/users/ryanrozich/projects/1)
- [Issues List](https://github.com/ryanrozich/ag-grid-react-components/issues)