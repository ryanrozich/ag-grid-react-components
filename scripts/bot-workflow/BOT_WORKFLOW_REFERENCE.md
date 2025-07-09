# Bot Workflow Command Reference

## Core Bot Commands

### 1. Claim an Issue
```bash
node scripts/bot-workflow/core/bot-claim-issue.js <issue-number>
```
- Updates issue labels (removes `agent:todo`, adds `agent:wip`)
- Creates a git worktree for isolated development
- Sets up `.bot` directory with context

### 2. Save Progress Checkpoint
```bash
node scripts/bot-workflow/core/bot-checkpoint.js "Description of progress"
```text
- Saves current state
- Commits changes with checkpoint message
- Updates PR if one exists

### 3. Create Pull Request (NEW!)
```bash
node scripts/bot-workflow/core/bot-create-pr.js [--title "PR title"] [--body "PR body"]
```
- Creates PR from current branch
- **Automatically removes `agent:wip` label from issue**
- **Automatically adds `agent:needs-review` AND `status: in-code-review` labels**
- Updates both issue and PR with proper labels
- Updates bot context with PR number
- If no title provided, uses issue title
- If no body provided, adds "Closes #X" automatically

### 4. Check All Bot Status
```bash
node scripts/bot-workflow/core/bot-status-all.js
```text
- Shows all active bot work
- Displays checkpoints and PR status
- Lists stale work (>24h old)

### 5. Resume Work
```bash
node scripts/bot-workflow/core/bot-resume-work.js <issue-number>
```text
- Resume work on an existing issue
- Restores context and state

### 6. Bot Handoff (if stuck)
```bash
node scripts/bot-workflow/core/bot-handoff.js "Reason for handoff"
```text
- Marks work as needing human intervention
- Updates labels appropriately

## Coordinator Commands

### Launch Bot Army (tmux)
```bash
node scripts/bot-workflow/coordinator/launch-bot-army.js 47 48 49 50 51 52
```text
- Creates tmux session with all bots
- Sets up dashboard for monitoring
- Provides instructions for each bot

### Auto Bot Orchestrator
```bash
node scripts/bot-workflow/coordinator/auto-bot-orchestrator.js
```
- Interactive bot launcher
- Options for basic, tmux, or VS Code setup

## Updated Bot Workflow

1. **Claim issue**: `bot-claim-issue.js`
2. **Work on implementation**: Follow TDD, create files
3. **Save checkpoints**: `bot-checkpoint.js` as you progress
4. **Commit final changes**: `git add -A && git commit -m "feat: ..."`
5. **Create PR**: `bot-create-pr.js` (automatically removes agent:wip)
6. **Done!** The automation takes over

## Label Transitions

### Agent Labels (Bot Workflow)
- `agent:todo` → Bot can claim this issue
- `agent:wip` → Bot is actively working
- `agent:needs-review` → PR created, awaiting review
- `agent:done` → Work completed and merged
- `agent:error` → Bot encountered issues (needs human help)

### Status Labels (Applied Automatically)
- `status: in-progress` → Applied when bot claims issue (with `agent:wip`)
- `status: in-code-review` → Applied when PR created (with `agent:needs-review`)

### Project Field Sync
- **Agent Status** field in GitHub Project automatically syncs with agent labels
- Updates happen via GitHub Actions on any label change

## Example Complete Workflow

```bash
# Bot claims issue
node scripts/bot-workflow/core/bot-claim-issue.js 123

# Bot saves progress periodically
node scripts/bot-workflow/core/bot-checkpoint.js "Implemented basic structure"
node scripts/bot-workflow/core/bot-checkpoint.js "Added tests for storage"
node scripts/bot-workflow/core/bot-checkpoint.js "Completed implementation"

# Bot creates PR (removes agent:wip automatically)
git add -A
git commit -m "feat: implement feature for issue #123"
node scripts/bot-workflow/core/bot-create-pr.js --title "feat: add awesome feature"

# Done! Issue now shows as in review, not in WIP
```