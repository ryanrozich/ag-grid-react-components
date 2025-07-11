# GitHub Automation System Requirements

This document lists all GitHub labels, project fields, and GitHub Actions required for the automation system to work correctly.

## Issue Labels

### Type Labels (One Required Per Issue)

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `question` - Further information requested
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed

### Priority Labels (One Required Per Issue)

- `priority: critical` - Must fix ASAP, blocking usage
- `priority: high` - Important, should be fixed soon
- `priority: medium` - Normal priority
- `priority: low` - Nice to have, can wait

### Area Labels (At Least One Required Per Issue)

- `area: components` - Related to the React components
- `area: demo` - Related to the demo/showcase application
- `area: build` - Build tools, bundling, TypeScript config
- `area: ci/cd` - GitHub Actions, deployment, automation
- `area: testing` - Test suite, coverage, test infrastructure
- `area: docs` - Documentation (README, API docs, guides)

### Status Labels (Auto-Managed for Issues)

- `status: needs-triage` - Default for new issues
- `status: triaging` - Being evaluated
- `status: backlog` - Ready for development
- `status: in-progress` - Being worked on
- `status: in-product-review` - Feature deployed, awaiting product review
- `status: done` - Completed and verified

### Component Labels (Optional, Component-Specific Issues Only)

- `component: date-filter` - DateFilter/RelativeDateFilter components
- `component: quick-filter-dropdown` - QuickFilterDropdown component
- `component: active-filters` - ActiveFilters component
- `component: relative-date-filter` - RelativeDateFilter component
- `component: grid-state-utils` - Grid state persistence utilities
- `component: demo-app` - Demo application specific

### Effort Labels (Optional, Add Once Scope is Clear)

- `effort: xs` - Extra small (< 1 hour)
- `effort: s` - Small (1-4 hours)
- `effort: m` - Medium (1-2 days)
- `effort: l` - Large (3-5 days)
- `effort: xl` - Extra large (1+ week)

## PR Labels

### PR-Specific Status Labels (Auto-Managed)

- `status: pr-in-progress` - Draft PR, not ready for review
- `status: in-code-review` - Ready for code review
- `status: code-review-complete` - Code approved, ready to merge
- `status: merged` - PR merged

### Bot/Agent Labels

- `agent:todo` - Work assigned to AI agent
- `agent:wip` - AI agent actively working
- `agent:needs-review` - AI agent work needs human review
- `agent:failed` - AI agent encountered an error
- `agent:done` - AI agent work completed
- `bot:stale` - Bot work has been inactive for 24+ hours
- `needs-human-review` - Requires human attention

## Project Fields

### Required Project Custom Fields

1. **Status** (Single Select)

   - Needs Triage / 📥 Needs Triage
   - Triaging / 🔍 Triaging
   - Backlog / 📋 Backlog
   - In Progress / 🚧 In Progress
   - In Product Review / 👀 In Product Review
   - Done / ✅ Done
   - PR In Progress / 🔨 PR In Progress
   - In Code Review / 👨‍💻 In Code Review
   - Code Review Complete / 🎉 Code Review Complete
   - Merged / 🚀 Merged

2. **Priority** (Single Select)

   - Critical / 🔴 Critical
   - High / 🟠 High
   - Medium / 🟡 Medium
   - Low / 🟢 Low

3. **Area** (Single Select)

   - Components / 🧩 Components
   - Demo / 🎨 Demo
   - Build / 🔧 Build / 🔨 Build
   - CI/CD / 🚀 CI/CD / 🤖 CI/CD
   - Testing / 🧪 Testing
   - Docs / 📚 Docs

4. **Type** (Single Select)

   - Bug / 🐛 Bug
   - Enhancement / ✨ Enhancement / ✨ Feature
   - Documentation / 📚 Documentation
   - Question / ❓ Question
   - Good First Issue / 👋 Good First Issue
   - Help Wanted / 🆘 Help Wanted

5. **Component** (Single Select)

   - DateFilter
   - QuickFilterDropdown
   - ActiveFilters
   - RelativeDateFilter
   - Grid State Utils
   - Demo App
   - N/A

6. **Effort** (Single Select)
   - XS (< 1 hour)
   - S (1-4 hours)
   - M (1-2 days)
   - L (3-5 days)
   - XL (1+ week)

## GitHub Actions Workflows

### Label and Project Synchronization

1. **sync-labels-to-project.yml**

   - Trigger: When issues/PRs are labeled/unlabeled
   - Purpose: Syncs GitHub labels to project custom fields
   - Maps labels to project field values

2. **sync-project-to-labels.yml**

   - Trigger: Every 5 minutes (scheduled) + manual
   - Purpose: Syncs project field changes back to GitHub labels
   - Ensures bidirectional sync between labels and project fields

3. **sync-pr-labels-from-issues.yml**
   - Trigger: When PRs are opened/edited or issues are labeled/unlabeled
   - Purpose: Copies labels from linked issues to PRs (except status labels)
   - Recognizes linking patterns: fixes #123, closes #123, resolves #123

### Status Management

4. **auto-set-pr-status.yml**

   - Trigger: PR events (opened, converted to draft, approved, merged)
   - Purpose: Automatically sets PR status labels based on PR state
   - Draft PRs → `status: pr-in-progress`
   - Ready PRs → `status: in-code-review`
   - Approved PRs → `status: code-review-complete`
   - Merged PRs → `status: merged`
   - New issues → `status: needs-triage`

5. **add-pr-to-project.yml**
   - Trigger: When PRs are opened/reopened
   - Purpose: Automatically adds PRs to the project board
   - Uses hardcoded project ID: `PVT_kwHOBMT9Es4Aqh-F`

### Bot/Agent Management

6. **bot-label-management.yml**

   - Trigger: Issue comments, PR events, scheduled (every 6 hours)
   - Purpose: Manages AI agent workflow labels
   - Commands: `/bot claim`, `/bot handoff`
   - Monitors stale bot work (24+ hours inactive)
   - Validates label consistency

7. **sync-agent-status.yml**

   - Trigger: Issue/PR labeled with agent labels
   - Purpose: Syncs agent status between issues and their PRs

8. **bot-ci-integration.yml**
   - Trigger: PR events with bot labels
   - Purpose: Manages bot-specific CI workflows

### Deployment and Preview

9. **deploy-preview.yml**

   - Trigger: PR opened/synchronized
   - Purpose: Deploys PR preview to Cloudflare Pages

10. **deploy-demo.yml**

    - Trigger: Push to main branch
    - Purpose: Deploys main demo to production

11. **cleanup-deployment.yml**

    - Trigger: PR closed
    - Purpose: Cleans up PR preview deployments

12. **update-preview-url-field.yml**

    - Trigger: After preview deployment
    - Purpose: Updates PR with preview URL

13. **manual-preview-control.yml**
    - Trigger: Manual workflow dispatch
    - Purpose: Manual control over preview deployments

### CI/CD and Quality

14. **ci.yml**

    - Trigger: Push to main, PR events
    - Purpose: Main CI pipeline (lint, test, build)

15. **ci-optimized.yml**

    - Trigger: PR events
    - Purpose: Optimized CI for PRs

16. **test-demo-deployment.yml**

    - Trigger: PR with demo changes
    - Purpose: Tests demo deployment

17. **health-check.yml**

    - Trigger: Scheduled
    - Purpose: Monitors system health

18. **auto-fix-whitespace.yml**
    - Trigger: PR events
    - Purpose: Automatically fixes whitespace issues

### Release Management

19. **release.yml**

    - Trigger: Manual workflow dispatch
    - Purpose: Creates releases

20. **release-candidate.yml**

    - Trigger: Manual workflow dispatch
    - Purpose: Creates RC releases

21. **release-on-push.yml**

    - Trigger: Push to main with version changes
    - Purpose: Automated releases

22. **publish.yml**
    - Trigger: Release published
    - Purpose: Publishes to npm

## Automation Dependencies

### Required GitHub Secrets

- `GITHUB_TOKEN` - Default token for API access
- `CLOUDFLARE_ACCOUNT_ID` - For deployments
- `CLOUDFLARE_API_TOKEN` - For deployments
- `NPM_AUTH_TOKEN` - For publishing

### Issue Templates (Required for Consistent Labels)

1. **01-bug-report.yml**

   - Auto-adds: `bug`, `status: needs-triage`
   - Collects: area, component, priority suggestion

2. **02-feature-request.yml**

   - Auto-adds: `enhancement`, `status: needs-triage`
   - Collects: feature type, effort estimate

3. **03-discovery-task.yml**
   - Auto-adds: investigation labels
   - Collects: discovery type, investigation plan

## Label Categories and Rules

### Exclusive Categories (Only One Per Issue/PR)

- **Type**: bug, enhancement, documentation, question, etc.
- **Priority**: critical, high, medium, low
- **Status**: needs-triage, triaging, backlog, in-progress, etc.
- **Effort**: xs, s, m, l, xl

### Multiple Allowed

- **Area**: Can have multiple (e.g., `area: components` + `area: testing`)
- **Component**: Usually one, but can be multiple if issue spans components
- **Bot/Agent**: Can have agent labels alongside other labels

## Sync Behavior

1. **Label → Project**: When a label is added/removed, the corresponding project field is updated
2. **Project → Label**: When a project field is changed, labels are updated to match
3. **Issue → PR**: When a PR is linked to issues, it inherits all labels except status
4. **Status Progression**: Status labels are automatically managed based on workflow state

## Important Notes

- The project ID `PVT_kwHOBMT9Es4Aqh-F` is hardcoded in workflows
- Status labels are excluded from issue-to-PR sync (PRs have their own lifecycle)
- Bot labels have special handling and validation
- The system supports both plain and emoji versions of field values
- Label sync happens within 5 minutes due to the scheduled workflow
