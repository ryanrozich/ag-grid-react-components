# GitHub Project Automation Guide

This guide explains how issue labels are automatically synchronized to GitHub Project fields.

## Overview

When you create or update issue labels, a GitHub Action automatically updates the corresponding fields in any GitHub Projects that contain the issue. This ensures consistency between issue metadata and project views.

## How It Works

1. **Trigger Events:**

   - Issue created with labels
   - Labels added/removed from issue
   - Issue added to project

2. **Automation Flow:**

   ```text
   Issue Label Change → GitHub Action → GraphQL API → Project Field Update
   ```

3. **Label-to-Field Mappings:**

   | Label                              | Project Field | Field Value         |
   | ---------------------------------- | ------------- | ------------------- |
   | `priority: critical`               | Priority      | Critical            |
   | `priority: high`                   | Priority      | High                |
   | `priority: medium`                 | Priority      | Medium              |
   | `priority: low`                    | Priority      | Low                 |
   | `area: components`                 | Area          | Components          |
   | `area: demo`                       | Area          | Demo                |
   | `area: build`                      | Area          | Build               |
   | `area: ci/cd`                      | Area          | CI/CD               |
   | `area: testing`                    | Area          | Testing             |
   | `area: docs`                       | Area          | Docs                |
   | `bug`                              | Type          | Bug                 |
   | `enhancement`                      | Type          | Enhancement         |
   | `documentation`                    | Type          | Documentation       |
   | `component: date-filter`           | Component     | DateFilter          |
   | `component: quick-filter-dropdown` | Component     | QuickFilterDropdown |
   | `component: active-filters`        | Component     | ActiveFilters       |
   | `component: relative-date-filter`  | Component     | RelativeDateFilter  |
   | `component: grid-state-utils`      | Component     | Grid State Utils    |
   | `component: demo-app`              | Component     | Demo App            |
   | `status: needs-triage`             | Status        | Needs Triage        |
   | `status: triaging`                 | Status        | Triaging            |
   | `status: backlog`                  | Status        | Backlog             |
   | `status: in-progress`              | Status        | In Progress         |
   | `status: in-review`                | Status        | In Review           |
   | `status: done`                     | Status        | Done                |

## For AI Agents (Claude, GitHub Copilot, etc.)

When creating issues, simply apply the appropriate labels. The automation will handle project field updates.

### Example

```bash
gh issue create \
  --title "Fix date filter validation" \
  --body "..." \
  --label "bug" \
  --label "priority: high" \
  --label "area: components" \
  --label "status: needs-triage"
```

This will automatically set:

- Type → Bug
- Priority → High
- Area → Components
- Status → Needs Triage

## Adding New Mappings

To add new label-to-field mappings:

1. Edit `.github/workflows/sync-labels-to-project.yml`
2. Add to the `labelMappings` object:
   ```javascript
   'your-label': { field: 'FieldName', value: 'FieldValue' },
   ```
3. Ensure the project has the corresponding field

## Troubleshooting

### Fields Not Updating

- Check Actions tab for workflow runs
- Verify label names match exactly (case-sensitive)
- Ensure project fields exist with correct names
- Check workflow has necessary permissions

### Viewing Logs

```bash
gh run list --workflow=sync-labels-to-project.yml
gh run view <run-id>
```

## Project Setup Requirements

1. **Create Project Fields:**

   - Go to Project Settings
   - Add fields: Priority, Area, Type, Component, Status
   - Set as "Single Select" type
   - Add options matching the mapping values

2. **Enable Auto-Add:**
   - Project Settings → Workflows
   - Enable "Auto-add to project"
   - Configure for your repository
   - Set default status to "Needs Triage" for new issues

## Best Practices

1. **Consistent Labeling:**

   - Always use the defined label format
   - One label per category (priority, area, type)
   - Apply labels when creating issues

2. **Field Naming:**

   - Keep project field names simple
   - Match the documentation exactly
   - Use Single Select for mapped fields

3. **Monitoring:**
   - Check Actions tab regularly
   - Review failed workflows
   - Update mappings as needed

## API Reference

The automation uses GitHub's GraphQL API v4:

- **Query Project Fields:** `ProjectV2Field`, `ProjectV2SingleSelectField`
- **Update Fields:** `updateProjectV2ItemFieldValue` mutation
- **Authentication:** Uses `GITHUB_TOKEN` from Actions

## Contributing

To improve this automation:

1. Test changes in a fork first
2. Document new mappings
3. Update both workflow and docs
4. Submit PR with examples

## Related Resources

- [GitHub Projects V2 Documentation](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [GraphQL API Reference](https://docs.github.com/en/graphql)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
