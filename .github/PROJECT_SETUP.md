# GitHub Project Board Setup Guide

This guide helps you set up the GitHub Project for optimal workflow with both AI agents and human developers.

## Creating the Project

1. Go to https://github.com/ryanrozich/ag-grid-react-components/projects
2. Click "New project" → Choose "Board" template
3. Name: "AG Grid React Components Roadmap"

## Board Columns

Create these columns in order:

| Column             | Description                 | Automation               |
| ------------------ | --------------------------- | ------------------------ |
| 📋 **Backlog**     | All new issues start here   | Auto-add new issues      |
| 🔍 **Triage**      | Issues being evaluated      | Manual move              |
| 📅 **Ready**       | Prioritized & ready to work | Manual move              |
| 🚧 **In Progress** | Currently being worked on   | Auto-move when PR linked |
| 👀 **In Review**   | PR open, awaiting review    | Auto-move when PR ready  |
| ✅ **Done**        | Completed and merged        | Auto-move when PR merged |

## Custom Fields Setup

Add these custom fields in Project Settings:

### 1. Area (Single Select)

- 🧩 Components
- 🎨 Demo
- 🔧 Build
- 🚀 CI/CD
- 🧪 Testing
- 📚 Docs

### 2. Priority (Single Select)

- 🔴 Critical
- 🟠 High
- 🟡 Medium
- 🟢 Low

### 3. Effort (Single Select)

- XS (< 1 hour)
- S (1-4 hours)
- M (1-2 days)
- L (3-5 days)
- XL (1+ week)

### 4. Type (Single Select)

- 🐛 Bug
- ✨ Feature
- 🔍 Investigation
- 📚 Documentation
- ♻️ Refactor

### 5. Component (Single Select)

- DateFilter
- QuickFilterDropdown
- ActiveFilters
- RelativeDateFilter
- Grid State Utils
- Demo App
- N/A

## Automation Rules

Set up these workflows in Project Settings → Workflows:

### 1. Issue Created

```
When: Issue is created
Then: Move to "Backlog"
```

### 2. Issue Assigned

```
When: Issue is assigned
If: Status is "Ready"
Then: Move to "In Progress"
```

### 3. PR Opened

```
When: Pull request is opened
Then: Move linked issues to "In Review"
```

### 4. PR Merged

```
When: Pull request is merged
Then: Move linked issues to "Done"
```

### 5. Issue Closed (No PR)

```
When: Issue is closed
If: No linked PR
Then: Move to "Done"
```

## Views Configuration

### View 1: "Main Board" (Default)

- **Type**: Board
- **Group by**: Status
- **Sort**: Priority (High to Low)
- **Filter**: Status != "Done" OR updated:>-7days

### View 2: "By Priority"

- **Type**: Board
- **Group by**: Priority
- **Sort**: Created (Newest first)
- **Filter**: Status != "Done"

### View 3: "Components vs Demo"

- **Type**: Board
- **Group by**: Area
- **Filter**: Area IN ("Components", "Demo")
- **Sort**: Priority (High to Low)

### View 4: "Sprint Planning"

- **Type**: Table
- **Columns**: Title, Area, Priority, Effort, Assignee, Labels
- **Filter**: Status IN ("Ready", "Backlog")
- **Sort**: Priority DESC, Effort ASC

### View 5: "AI Agent Discoveries"

- **Type**: Table
- **Filter**: Type = "Investigation" AND Status != "Done"
- **Sort**: Created DESC
- **Columns**: Title, Area, Component, Priority

## Milestones & Roadmap

Create these milestones:

### v1.0.0 - Production Ready

- [ ] 100% test coverage on components
- [ ] All critical/high bugs fixed
- [ ] Complete API documentation
- [ ] Performance benchmarks

### v1.1.0 - Enhanced Features

- [ ] Keyboard navigation (accessibility)
- [ ] Advanced date expressions
- [ ] Theme customization
- [ ] Localization support

### v1.2.0 - Developer Experience

- [ ] CLI tool for setup
- [ ] Storybook integration
- [ ] Better TypeScript types
- [ ] More examples

## Issue Triage Process

For new issues in Backlog:

1. **Verify Template Used**

   - If no template → Request reporter to use template
   - If wrong template → Move to correct template

2. **Add Area Label**

   - Check "Area" field in issue
   - Add corresponding `area:` label

3. **Assess Priority**

   - Check "Suggested Priority" field
   - Validate against priority matrix
   - Add `priority:` label

4. **Estimate Effort**

   - For bugs: Check "Complexity" field
   - For features: Check "Effort Estimate" field
   - Set Effort custom field

5. **Move to Ready**
   - If all fields complete
   - If priority >= Medium
   - If no blockers

## Metrics to Track

### Weekly Metrics Dashboard

```markdown
## Week of [Date]

### Velocity

- Issues Created: X
- Issues Closed: Y
- PRs Merged: Z

### By Area

- Components: X issues
- Demo: Y issues
- Other: Z issues

### By Priority

- Critical: X
- High: Y
- Medium: Z
- Low: W

### AI Agent Contributions

- Issues Created by AI: X
- Quality Score: Y/10
- Accuracy Rate: Z%
```

## Best Practices

### For Project Maintainers

1. **Weekly Triage**

   - Review all Backlog items
   - Update priorities based on user feedback
   - Archive Done items older than 30 days

2. **Sprint Planning**

   - Use Sprint Planning view
   - Balance effort across team
   - Mix bugs and features

3. **AI Agent Review**
   - Validate AI-created issues weekly
   - Refine AI templates based on quality
   - Track AI accuracy metrics

### For Contributors

1. **Before Starting Work**

   - Check issue is in "Ready" column
   - Comment to claim issue
   - Move to "In Progress"

2. **During Development**

   - Update issue with progress
   - Ask questions early
   - Link PR when ready

3. **After Completion**
   - Ensure tests pass
   - Update documentation
   - Request review

## Quick Links

- [Create Bug Report](https://github.com/ryanrozich/ag-grid-react-components/issues/new?template=01-bug-report.yml)
- [Create Feature Request](https://github.com/ryanrozich/ag-grid-react-components/issues/new?template=02-feature-request.yml)
- [Create Discovery Task](https://github.com/ryanrozich/ag-grid-react-components/issues/new?template=03-discovery-task.yml)
- [View Project Board](#) <!-- Add link when created -->
- [View Milestones](https://github.com/ryanrozich/ag-grid-react-components/milestones)

## Automation Scripts

```bash
# Weekly metrics generation
gh api graphql -f query='
  query($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      issues(first: 100, states: OPEN) {
        nodes {
          createdAt
          labels(first: 10) {
            nodes { name }
          }
        }
      }
    }
  }' -f owner=ryanrozich -f name=ag-grid-react-components

# Bulk label updates
gh issue list --label "status: needs-triage" --json number \
  | jq -r '.[].number' \
  | xargs -I {} gh issue edit {} --add-label "area: components"
```

This project board setup ensures smooth collaboration between AI agents and human developers while maintaining high code quality and clear priorities.
