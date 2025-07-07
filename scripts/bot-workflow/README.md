# Bot Workflow System

This directory contains scripts for the automated bot development workflow system.

## 🏗️ Directory Structure

```
bot-workflow/
├── core/               # Core bot workflow scripts
├── worktree/          # Git worktree management
├── coordinator/       # Multi-bot coordination
└── utils/             # Utility scripts
```

## 🚀 Quick Start

### For Individual Bots

1. **Claim an issue**:
   ```bash
   node scripts/bot-workflow/core/bot-claim-issue.js 123
   ```

2. **Save progress**:
   ```bash
   node scripts/bot-workflow/core/bot-checkpoint.js "Implemented user interface"
   ```

3. **Resume work**:
   ```bash
   node scripts/bot-workflow/core/bot-resume-work.js 123
   ```

4. **Hand off to human**:
   ```bash
   node scripts/bot-workflow/core/bot-handoff.js "Need help with API design"
   ```

### For Coordinators

1. **Plan a feature**:
   ```bash
   node scripts/bot-workflow/coordinator/plan-feature.js "Add timezone support to DateFilter"
   ```

2. **Assign bot to issue**:
   ```bash
   node scripts/bot-workflow/coordinator/assign-bot.js 123 bot-1
   ```

3. **Monitor progress**:
   ```bash
   node scripts/bot-workflow/coordinator/monitor-progress.js
   ```

## 📚 Script Reference

### Core Scripts (`core/`)

#### `bot-claim-issue.js`
- **Purpose**: Bot claims an issue and sets up development environment
- **Usage**: `node bot-claim-issue.js <issue-number>`
- **Actions**:
  - Checks issue availability
  - Updates labels (agent:todo → agent:wip)
  - Creates worktree
  - Initializes bot state

#### `bot-checkpoint.js`
- **Purpose**: Save development progress
- **Usage**: `node bot-checkpoint.js "checkpoint message"`
- **Actions**:
  - Commits current changes
  - Updates memory log
  - Saves state snapshot
  - Updates PR if exists

#### `bot-resume-work.js`
- **Purpose**: Resume work on existing issue/PR
- **Usage**: `node bot-resume-work.js [pr-number|issue-number]`
- **Actions**:
  - Finds work to resume
  - Restores context
  - Shows current status
  - Lists pending tasks

#### `bot-handoff.js`
- **Purpose**: Prepare work for human review
- **Usage**: `node bot-handoff.js "reason for handoff"`
- **Actions**:
  - Creates handoff summary
  - Updates PR description
  - Notifies human developer
  - Updates labels

#### `bot-status-all.js`
- **Purpose**: Show status of all bot work
- **Usage**: `node bot-status-all.js`
- **Shows**:
  - Active work
  - Stale tasks (>24h)
  - Recently completed
  - Performance metrics

### Worktree Scripts (`worktree/`)

#### `setup-worktree.js`
- **Purpose**: Create isolated git worktree for bot development
- **Usage**: `node setup-worktree.js <issue-number> [description]`
- **Creates**:
  - Feature branch
  - Worktree directory
  - Bot state files
  - Initial context

#### `cleanup-worktree.js`
- **Purpose**: Clean up worktree after work complete
- **Usage**: `node cleanup-worktree.js <branch-name>`
- **Actions**:
  - Saves final state
  - Removes worktree
  - Deletes merged branches
  - Archives logs

### Coordinator Scripts (`coordinator/`)

#### `plan-feature.js`
- **Purpose**: Break down feature into bot-assignable tasks
- **Usage**: `node plan-feature.js "feature description"`
- **Creates**:
  - Tracking issue
  - Individual task issues
  - Labels and metadata
  - Assignment plan

#### `assign-bot.js`
- **Purpose**: Assign bot to work on issue
- **Usage**: `node assign-bot.js <issue-number> [bot-name]`
- **Actions**:
  - Checks bot availability
  - Triggers bot claim
  - Sets up monitoring
  - Updates tracking

#### `monitor-progress.js`
- **Purpose**: Monitor all bot task progress
- **Usage**: `node monitor-progress.js [tracking-issue]`
- **Shows**:
  - Task status overview
  - Progress metrics
  - Stale work warnings
  - Actionable insights

### Utility Scripts (`utils/`)

#### `bot-fix-ci.js`
- **Purpose**: Automatically fix CI failures
- **Usage**: `node bot-fix-ci.js <pr-number>`
- **Fixes**:
  - Formatting issues
  - Linting errors
  - Whitespace problems
  - Simple type errors

#### `setup-bot-labels.js`
- **Purpose**: Set up enhanced bot label system
- **Usage**: `node setup-bot-labels.js`
- **Creates**:
  - Bot state labels
  - Metadata labels
  - Coordinator labels
  - Documentation

## 🏷️ Label System

### Bot States
- `agent:todo` - Ready for bot work
- `agent:wip` - Bot actively working
- `agent:needs-review` - Ready for human review  
- `agent:failed` - Bot encountered error
- `agent:done` - Work completed

### Metadata
- `bot-created` - Created by bot
- `needs-human-review` - Needs human help
- `bot:stale` - No activity >24h
- `bot:ci-failure` - CI checks failing

## 🔄 Workflows

### Bot Development Lifecycle
```
Issue Created → agent:todo → Bot Claims → agent:wip → 
Bot Works → Creates PR → agent:needs-review → 
Human Reviews → Merged → agent:done
```

### Coordinator Flow
```
Feature Request → Plan Feature → Create Issues →
Assign Bots → Monitor Progress → Coordinate PRs →
Feature Complete
```

## 🤖 Environment Variables

```bash
# Required
export GITHUB_TOKEN=your_token

# Optional
export BOT_WORKSPACE_DIR=~/ag-grid-worktrees
export BOT_DEFAULT_BRANCH=main
export BOT_CHECKPOINT_INTERVAL=30m
```

## 📊 State Management

Bot state is persisted in multiple locations:

1. **`.bot/context.json`** - Current state and metadata
2. **`.bot/memory.md`** - Human-readable activity log
3. **`.bot/checklist.md`** - Task tracking
4. **PR metadata** - YAML frontmatter
5. **GitHub labels** - Visual state indicators

## 🚨 Troubleshooting

### Bot can't claim issue
- Check label is `agent:todo`
- Ensure not already claimed
- Verify bot has permissions

### Worktree conflicts
```bash
git worktree prune
rm -rf ~/ag-grid-worktrees/feature-*
```

### CI failures
```bash
# Auto-fix attempt
node scripts/bot-workflow/utils/bot-fix-ci.js <pr>

# Manual check
gh pr checks <pr>
```

### State corruption
```bash
# Recreate from PR
node scripts/bot-workflow/core/bot-resume-work.js <pr>
```

## 🔗 Related Documentation

- [Bot Development Guide](../../docs/github-automation/bot-development-guide.md)
- [GitHub Automation Overview](../../docs/github-automation/README.md)
- [Workflows Reference](../../docs/github-automation/workflows-reference.md)