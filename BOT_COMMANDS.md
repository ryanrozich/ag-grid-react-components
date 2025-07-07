# Bot Commands for Filter Presets Development

## 🚀 Quick Start - Claim Your Issue

Open 6 separate Claude Code instances and run one command in each:

### Instance 1 - Storage Engine

```bash
node scripts/bot-workflow/core/bot-claim-issue.js 47
```

### Instance 2 - UI Components

```bash
node scripts/bot-workflow/core/bot-claim-issue.js 48
```

### Instance 3 - Sharing System

```bash
node scripts/bot-workflow/core/bot-claim-issue.js 49
```

### Instance 4 - System & User Presets

```bash
node scripts/bot-workflow/core/bot-claim-issue.js 50
```

### Instance 5 - Demo & Integration

```bash
node scripts/bot-workflow/core/bot-claim-issue.js 51
```

### Instance 6 - Documentation & Testing

```bash
node scripts/bot-workflow/core/bot-claim-issue.js 52
```

## 📊 Monitor Progress

In your main terminal:

```bash
# Check status of all bots
node scripts/bot-workflow/core/bot-status-all.js

# View the GitHub project board
open https://github.com/ryanrozich/ag-grid-react-components/issues?q=is%3Aopen+milestone%3A%22Filter+Presets+v1%22
```

## 🔧 Other Useful Commands

### Save Progress (run in each bot instance)

```bash
node scripts/bot-workflow/core/bot-checkpoint.js "Completed storage engine implementation"
```

### If a Bot Needs Help

```bash
node scripts/bot-workflow/core/bot-handoff.js "Need clarification on API design"
```

### Resume Work on Existing PR

```bash
node scripts/bot-workflow/core/bot-resume-work.js <pr-number>
```

## 📋 What Each Bot Will Do

1. **Claim the issue** - Updates labels and creates a git worktree
2. **Work independently** - No conflicts with other bots
3. **Save checkpoints** - Progress is tracked
4. **Create PR** - When implementation is complete
5. **Run CI** - Tests run automatically
6. **Deploy preview** - For UI changes

## 🎯 Expected Timeline

With 6 bots working in parallel:

- 30 min: All bots claimed and working
- 2 hours: First PRs appearing
- 4 hours: Most implementation complete
- 6 hours: Full feature ready for review

Let's test the power of parallel AI development!
