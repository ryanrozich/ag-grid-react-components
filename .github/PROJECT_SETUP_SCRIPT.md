# Quick Setup Script for GitHub Project

Since GitHub CLI has limitations with project creation, here's a step-by-step guide with scripts to help automate what we can.

## Step 1: Create the Project Manually

1. Go to: [https://github.com/ryanrozich/ag-grid-react-components/projects](https://github.com/ryanrozich/ag-grid-react-components/projects)
2. Click "New project" (green button)
3. Select "Board" template
4. Name it: "AG Grid React Components Roadmap"
5. Click "Create"

## Step 2: Note Your Project URL

After creation, you'll see the URL like:
`https://github.com/ryanrozich/ag-grid-react-components/projects/1`

The project is automatically linked to your repository!

## Step 3: Configure the Project Board

Click on the project to open it, then proceed with configuration.

## Step 4: Add All Existing Issues to Project

Since this is a repository project, adding issues is even easier! In the project board:

1. Click the "+" button in any column (or use the "Add item" button)
2. Type "#" to see all repository issues
3. Select each issue to add it to the project
4. Or use this bulk add approach:
   - In the project, click "⌘" (Command menu) or Ctrl+K
   - Type "Add items from repository"
   - Select all issues you want to add

Alternatively, use this script:

````bash
#!/bin/bash
OWNER=ryanrozich
REPO=ag-grid-react-components

# For repository projects, you can add issues directly from the issue page
echo "To bulk add issues:"
echo "1. Go to https://github.com/$OWNER/$REPO/issues"
echo "2. Select issues using checkboxes"
echo "3. Click 'Projects' → 'AG Grid React Components Roadmap'"
```text

## Step 5: Configure Project Settings

In the project settings, you'll need to manually add:

### Custom Fields (Settings → Fields → + New Field)

1. **Area** (Single select)

   - 🧩 Components
   - 🎨 Demo
   - 🔧 Build
   - 🚀 CI/CD
   - 🧪 Testing
   - 📚 Docs

2. **Priority** (Single select)

   - 🔴 Critical
   - 🟠 High
   - 🟡 Medium
   - 🟢 Low

3. **Effort** (Single select)

   - XS (< 1 hour)
   - S (1-4 hours)
   - M (1-2 days)
   - L (3-5 days)
   - XL (1+ week)

4. **Type** (Single select)

   - 🐛 Bug
   - ✨ Feature
   - 🔍 Investigation
   - 📚 Documentation
   - ♻️ Refactor

5. **Component** (Single select)
   - DateFilter
   - QuickFilterDropdown
   - ActiveFilters
   - RelativeDateFilter
   - Grid State Utils
   - Demo App
   - N/A

### Workflows (Settings → Workflows)

1. **Auto-add to project**

   - When: Issues or PRs are created
   - Set: Status to "Backlog"

2. **Auto-move in progress**

   - When: PR is opened
   - Set: Status to "In Review"

3. **Auto-close**
   - When: Issue is closed or PR is merged
   - Set: Status to "Done"

## Step 6: Create Views

In the project, create these views:

### View 1: "Main Board" (rename the default view)

- Layout: Board
- Group by: Status
- Sort: Priority ↓

### View 2: "By Priority" (+ New View)

- Layout: Board
- Group by: Priority
- Sort: Created at ↓

### View 3: "Components vs Demo" (+ New View)

- Layout: Board
- Group by: Area
- Filter: Area is "Components" OR "Demo"

### View 4: "Sprint Planning" (+ New View)

- Layout: Table
- Show fields: Title, Area, Priority, Effort, Assignee
- Filter: Status is "Ready" OR "Backlog"
- Sort: Priority ↓, Effort ↑

## Step 7: Update Issues with Custom Fields

Here's a script to help map the existing labels to custom fields:

```bash
# This would need to be done manually in the UI as the API doesn't support custom fields yet
# But here's the mapping

# Issue #6 (Grand total z-index)
# - Area: Demo
# - Priority: Medium
# - Type: Bug
# - Effort: S
# - Component: Demo App

# Issue #5 (.serena directory)
# - Area: Build
# - Priority: High
# - Type: Bug (2)
# - Effort: XS
# - Component: N/A

# Issue #4 (OG image)
# - Area: Demo (2)
# - Priority: Low
# - Type: Enhancement
# - Effort: S (2)
# - Component: Demo App (2)

# Issue #3 (Cloudflare secrets)
# - Area: CI/CD
# - Priority: High (2)
# - Type: Documentation
# - Effort: XS (2)
# - Component: N/A (2)

# Issue #1 (Test coverage)
# - Area: Testing
# - Priority: Medium (2)
# - Type: Enhancement (2)
# - Effort: XL
# - Component: N/A (3)
```text

## Step 8: Set Up Issue Templates Link

Add this to your README.md:

```markdown
## Contributing

- [🐛 Report a Bug](https://github.com/ryanrozich/ag-grid-react-components/issues/new?template=01-bug-report.yml)
- [✨ Request a Feature](https://github.com/ryanrozich/ag-grid-react-components/issues/new?template=02-feature-request.yml)
- [🔍 Create Discovery Task](https://github.com/ryanrozich/ag-grid-react-components/issues/new?template=03-discovery-task.yml)
- [📊 View Project Board](https://github.com/users/ryanrozich/projects/X) <!-- Replace X -->
```text

## Automation Helper Scripts

Save these for future use:

### weekly-metrics.sh

```bash
#!/bin/bash
OWNER=ryanrozich
REPO=ag-grid-react-components

echo "## Weekly Metrics - $(date +%Y-%m-%d)"
echo ""
echo "### Issues Created This Week"
gh issue list --repo $OWNER/$REPO --state all --created ">=$(date -d '7 days ago' +%Y-%m-%d)" --json number,title,labels | jq -r '.[] | "- #\(.number): \(.title)"'

echo ""
echo "### By Priority"
echo "- Critical: $(gh issue list --repo $OWNER/$REPO --label "priority: critical" --state open --json number | jq '. | length')"
echo "- High: $(gh issue list --repo $OWNER/$REPO --label "priority: high" --state open --json number | jq '. | length')"
echo "- Medium: $(gh issue list --repo $OWNER/$REPO --label "priority: medium" --state open --json number | jq '. | length')"
echo "- Low: $(gh issue list --repo $OWNER/$REPO --label "priority: low" --state open --json number | jq '. | length')"
```text

### triage-helper.sh

```bash
#!/bin/bash
OWNER=ryanrozich
REPO=ag-grid-react-components

echo "Issues needing triage:"
gh issue list --repo $OWNER/$REPO --label "status: needs-triage" --json number,title,createdAt | jq -r '.[] | "#\(.number): \(.title) (created: \(.createdAt | split("T")[0]))"'
````

## Notes

- The GitHub API doesn't fully support Projects v2 custom fields yet, so some steps must be done manually
- Once set up, the automation rules will handle most of the workflow
- Use the provided scripts to help with weekly maintenance
- The issue templates will ensure consistent data entry going forward

After completing these steps, you'll have a fully functional project board with proper categorization, automation, and views for managing both AI-discovered issues and human development work!
