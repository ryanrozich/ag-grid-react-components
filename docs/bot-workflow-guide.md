# Bot Workflow Guide

This guide explains how to use the automated bot workflow system for handling GitHub issues.

## Overview

The bot workflow system allows automated agents (bots) to:

- Claim and work on issues
- Create feature branches and PRs
- Save progress with checkpoints
- Resume work after interruptions
- Hand off work to humans when needed

## Architecture

### Key Components

1. **Bot Scripts** (`scripts/bot-workflow/`)

   - `bot-claim-issue.js` - Claims issues and sets up work
   - `bot-checkpoint.js` - Saves progress
   - `bot-resume-work.js` - Resumes interrupted work
   - `bot-handoff.js` - Prepares work for human takeover

2. **GitHub Actions** (`.github/workflows/bot-commands.yml`)

   - Responds to `/bot` commands in comments
   - Runs scheduled cleanup for stalled work
   - Provides workflow_dispatch for manual triggers

3. **State Persistence** (`.bot/` directory in feature branches)
   - `context.json` - Machine-readable state
   - `memory.md` - Human-readable progress log
   - `checklist.md` - Task tracking
   - `handoff-summary.md` - Generated on handoff

## Bot Commands

### Via Comments

Add these commands in issue or PR comments:

- `/bot claim` - Claim an issue for bot work
- `/bot resume [pr-number]` - Resume work on a PR
- `/bot checkpoint [message]` - Save current progress
- `/bot handoff [reason]` - Prepare for human takeover
- `/bot status [pr-number]` - Check bot work status

### Via Scripts (Local Development)

```bash
# Find and claim an available issue
node scripts/bot-workflow/bot-claim-issue.js
node scripts/bot-workflow/bot-claim-issue.js 123  # Claim specific issue

# Save progress with checkpoint
node scripts/bot-workflow/bot-checkpoint.js "Implemented feature X"

# Resume work after interruption
node scripts/bot-workflow/bot-resume-work.js
node scripts/bot-workflow/bot-resume-work.js 456  # Resume specific PR

# Hand off to human
node scripts/bot-workflow/bot-handoff.js "Complex decision needed"
```

### Via GitHub Actions Workflow Dispatch

1. Go to Actions tab
2. Select "Bot Commands" workflow
3. Click "Run workflow"
4. Choose command and provide parameters

## Workflow Process

### 1. Claiming an Issue

When a bot claims an issue:

1. Adds claiming comment (acts as lock)
2. Self-assigns the issue
3. Updates labels: `status: backlog` → `status: in-progress`
4. Adds `bot-managed` label
5. Creates feature branch: `bot/{issue-number}-{title-slug}`
6. Sets up `.bot/` directory with initial context
7. Creates draft PR with bot metadata

### 2. Working on Issues

During development:

- Bot makes changes and commits with `bot:` prefix
- Uses checkpoint command to save progress
- Updates PR description with current status
- Adds progress comments to PR

### 3. State Persistence

Bot state is stored in multiple places:

- **PR Description**: YAML frontmatter with metadata
- **`.bot/context.json`**: Current work state
- **`.bot/memory.md`**: Human-readable log
- **`.bot/checklist.md`**: Task completion tracking

### 4. Resuming Work

To resume after interruption:

1. Bot finds bot-managed PRs
2. Switches to feature branch
3. Loads context from `.bot/` directory
4. Displays current status and next steps
5. Continues from last checkpoint

### 5. Handoff Process

When handing off to humans:

1. Generates comprehensive handoff summary
2. Updates labels: removes `bot-managed`, adds `needs-human-review`
3. Marks PR ready for review (if draft)
4. Adds detailed handoff comment
5. Preserves all context for human developer

## Labels Used

- `bot-managed` - PR is being worked on by bot
- `bot-stalled` - No activity for 24+ hours
- `needs-human-review` - Bot has handed off to human
- `status: backlog` - Issue available for claiming
- `status: in-progress` - Issue being worked on

## Safety Features

1. **Claim Locking**: Comment acts as lock to prevent race conditions
2. **Stale Detection**: Automatic detection of stalled work (24h timeout)
3. **Context Preservation**: Multiple backup locations for state
4. **Human Override**: Any human can take over at any time
5. **Clean Handoff**: Structured process for human takeover

## Best Practices

### For Bots

1. **Checkpoint Frequently**: Save progress after each significant step
2. **Clear Messages**: Use descriptive checkpoint messages
3. **Update Checklist**: Mark tasks complete as you go
4. **Document Decisions**: Record important choices in context
5. **Handoff Early**: Don't struggle - hand off when stuck

### For Humans

1. **Check Bot Status**: Use `/bot status` before taking over
2. **Review Context**: Read `.bot/` files before continuing
3. **Respect Bot Work**: Review what bot accomplished
4. **Clean Transition**: Use `/bot handoff` for clean takeover
5. **Update Labels**: Ensure labels reflect current state

## Troubleshooting

### Bot Can't Find Context

```bash
# Ensure you're on the right branch
git checkout bot/123-feature-name
git pull origin bot/123-feature-name

# Check for context file
ls -la .bot/
```

### Merge Conflicts

```bash
# Update from main
git fetch origin
git merge origin/main

# Resolve conflicts, then checkpoint
node scripts/bot-workflow/bot-checkpoint.js "Resolved merge conflicts"
```

### Stalled Bot Work

```bash
# Check last activity
gh pr view 456 --json updatedAt

# Resume or handoff
node scripts/bot-workflow/bot-resume-work.js 456
# or
node scripts/bot-workflow/bot-handoff.js "Stalled - needs human help"
```

## Example Workflow

```bash
# 1. Bot claims issue #30
$ node scripts/bot-workflow/bot-claim-issue.js 30
🤖 Bot claiming issue #30...
✅ Successfully claimed issue #30
📍 Branch: bot/30-implement-dark-mode

# 2. Bot works and checkpoints progress
$ npm test
$ node scripts/bot-workflow/bot-checkpoint.js "Added dark mode context provider"
💾 Saving bot checkpoint...
✅ Checkpoint saved successfully

# 3. Bot gets interrupted/cleared

# 4. Bot resumes later
$ node scripts/bot-workflow/bot-resume-work.js
🔍 Finding bot-managed work to resume...
📊 Current Status:
  Issue: #30 - Implement dark mode
  Last Step: Added dark mode context provider

# 5. Bot completes work or hands off
$ node scripts/bot-workflow/bot-handoff.js "Core implementation complete, needs UI polish"
🤝 Preparing bot work for human handoff...
✅ Handoff completed successfully!
```

## Integration with AI Agents

This workflow is designed for AI agents like Claude that may lose context:

1. **Stateless Operations**: Each command is self-contained
2. **Context Recovery**: Full state can be recovered from files
3. **Progress Tracking**: Clear indication of what's been done
4. **Natural Handoffs**: Smooth transition between bot and human

The system ensures work can continue regardless of session boundaries or memory limits.
