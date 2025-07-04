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

   | Label                              | Project Field | Field Value          |
   | ---------------------------------- | ------------- | -------------------- |
   | `priority: critical`               | Priority      | Critical             |
   | `priority: high`                   | Priority      | High                 |
   | `priority: medium`                 | Priority      | Medium               |
   | `priority: low`                    | Priority      | Low                  |
   | `area: components`                 | Area          | Components           |
   | `area: demo`                       | Area          | Demo                 |
   | `area: build`                      | Area          | Build                |
   | `area: ci/cd`                      | Area          | CI/CD                |
   | `area: testing`                    | Area          | Testing              |
   | `area: docs`                       | Area          | Docs                 |
   | `bug`                              | Type          | Bug                  |
   | `enhancement`                      | Type          | Enhancement          |
   | `documentation`                    | Type          | Documentation        |
   | `component: date-filter`           | Component     | DateFilter           |
   | `component: quick-filter-dropdown` | Component     | QuickFilterDropdown  |
   | `component: active-filters`        | Component     | ActiveFilters        |
   | `component: relative-date-filter`  | Component     | RelativeDateFilter   |
   | `component: grid-state-utils`      | Component     | Grid State Utils     |
   | `component: demo-app`              | Component     | Demo App             |
   | `status: needs-triage`             | Status        | Needs Triage         |
   | `status: triaging`                 | Status        | Triaging             |
   | `status: backlog`                  | Status        | Backlog              |
   | `status: in-progress`              | Status        | In Progress          |
   | `status: in-product-review`        | Status        | In Product Review    |
   | `status: done`                     | Status        | Done                 |
   | `status: pr-in-progress`           | Status        | PR In Progress       |
   | `status: in-code-review`           | Status        | In Code Review       |
   | `status: code-review-complete`     | Status        | Code Review Complete |
   | `status: merged`                   | Status        | Merged               |
   | `effort: xs`                       | Effort        | XS (< 1 hour)        |
   | `effort: s`                        | Effort        | S (1-4 hours)        |
   | `effort: m`                        | Effort        | M (1-2 days)         |
   | `effort: l`                        | Effort        | L (3-5 days)         |
   | `effort: xl`                       | Effort        | XL (1+ week)         |

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

## Pull Request Label Automation

PRs automatically inherit labels from their linked issues:

### How PR Label Sync Works

1. **On PR Creation/Edit**: When a PR references an issue (e.g., "fixes #123"), it automatically gets all labels from that issue **except status labels**
2. **On Issue Label Changes**: When labels change on an issue, any PRs that reference it are updated (excluding status)
3. **Multiple Issues**: If a PR fixes multiple issues, it gets labels from all of them (excluding status)

**Why exclude status?** PRs have their own lifecycle:

- Issues: needs-triage → backlog → in-progress → in-product-review → done
- PRs: pr-in-progress → in-code-review → code-review-complete → merged

The project automation handles PR status automatically:

- Draft PR opened → "PR In Progress"
- PR ready for review → "In Code Review"
- Code review approved → "Code Review Complete"
- PR merged → "Merged"

When a PR is approved, linked issues automatically move to "In Product Review"

### Linking Patterns Recognized

- `fixes #123`
- `closes #123`
- `resolves #123`
- `fixes https://github.com/owner/repo/issues/123`

### Manual PR Label Sync

To sync all existing PRs with their linked issues:

```bash
npm run sync:pr-labels
```

## Bidirectional Sync

The automation also supports syncing project field changes back to issue labels:

### Sync Process

1. **Scheduled Sync**: Runs every 5 minutes to check for project field changes
2. **Field Change Detection**: Compares project field values with issue labels
3. **Label Updates**: Automatically adds/removes labels to match project fields
4. **Manual Trigger**: Can be run manually via GitHub Actions UI

### Sync Example

If you change Priority from "Low" to "Medium" in the project:

- Removes: `priority: low` label
- Adds: `priority: medium` label

### Configuration

The bidirectional sync is defined in `.github/workflows/sync-project-to-labels.yml`:

- Runs on schedule (every 5 minutes)
- Can be triggered manually
- Handles all field types (Priority, Area, Type, Component, Status)

### Benefits

- **Full Synchronization**: Changes in either direction stay in sync
- **No Manual Updates**: Change priority in project, label updates automatically
- **Conflict Resolution**: Removes conflicting labels (e.g., can't be both high and low priority)
- **Audit Trail**: All changes visible in issue history

## Complete Sync Scripts

### Sync All Project Items

To sync ALL items in your project (including closed issues and PRs):

```bash
npm run sync:project:all
```

This is useful when:

- You have items in "Done" status that need labels
- You want to ensure PRs have proper labels
- You're doing a complete project cleanup

### Available NPM Scripts

| Script                      | Description                                                        |
| --------------------------- | ------------------------------------------------------------------ |
| `npm run bootstrap:project` | Complete bootstrap (create labels, add missing, sync from project) |
| `npm run sync:labels`       | Add missing required labels to issues                              |
| `npm run sync:project`      | Sync project fields to labels (open issues only)                   |
| `npm run sync:project:all`  | Sync project fields to labels (ALL items)                          |
| `npm run sync:pr-labels`    | Copy labels from linked issues to PRs                              |

## Milestone Integration

### How Milestones Work with Projects

1. **Create Release Milestones**: Use semantic versioning (v0.1.0, v0.2.0)
2. **Auto-assign Items**: Ready items get assigned to appropriate milestones
3. **Track Progress**: See release progress in project views
4. **Release Planning**: Plan features and bugs for each version

### Quick Commands

```bash
# Create a new release milestone
npm run milestone:create v0.1.0 "First Public Release"

# Assign ready items to milestone
npm run milestone:assign 1

# View all milestones and progress
npm run milestone:overview
```

See [Release Strategy](./release-strategy.md) for detailed information.

## Related Resources

- [GitHub Projects V2 Documentation](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [GraphQL API Reference](https://docs.github.com/en/graphql)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Scheduled Workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule)
