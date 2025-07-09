#!/usr/bin/env node

import { execSync, spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../../..');

console.log('🤖 Bot Army Launcher');
console.log('====================\n');

// Parse command line arguments
const args = process.argv.slice(2);
const issueNumbers = args.map(arg => parseInt(arg)).filter(n => !isNaN(n));

if (issueNumbers.length === 0) {
  console.log('Usage: node launch-bot-army.js <issue1> <issue2> ...');
  console.log('Example: node launch-bot-army.js 47 48 49 50 51 52');
  process.exit(1);
}

// Check if tmux is installed
try {
  execSync('which tmux', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ tmux is not installed. Please install it first:');
  console.error('   brew install tmux');
  process.exit(1);
}

// Kill any existing bot-army session
try {
  execSync('tmux kill-session -t bot-army 2>/dev/null');
} catch (error) {
  // Session doesn't exist, that's fine
}

console.log(`🚀 Launching bot army for issues: ${issueNumbers.join(', ')}\n`);

// Create tmux session with dashboard
console.log('📊 Creating tmux session with dashboard...');
execSync('tmux new-session -d -s bot-army -n dashboard');

// Set up the dashboard pane
const dashboardCmd = `cd ${rootDir} && watch -n 5 'echo "BOT ARMY DASHBOARD - $(date)" && echo "===================" && node scripts/bot-workflow/core/bot-status-all.js'`;
execSync(`tmux send-keys -t bot-army:dashboard '${dashboardCmd}' Enter`);

// Create a pane for each bot
issueNumbers.forEach((issueNumber, index) => {
  console.log(`🤖 Setting up bot for issue #${issueNumber}...`);

  // Create new window for this bot
  const windowName = `bot-${issueNumber}`;
  execSync(`tmux new-window -t bot-army -n ${windowName}`);

  // Create the bot instruction file
  const botInstructions = `# Bot Instructions for Issue #${issueNumber}

## Status
✅ Issue #${issueNumber} has been claimed
✅ Worktree created at: ~/ag-grid-worktrees/feature/${issueNumber}-*

## HUMAN: Enter these commands:

\`\`\`bash
cd ~/ag-grid-worktrees/feature/${issueNumber}-*
claude
\`\`\`

Note: If you get permission errors, use:
\`\`\`bash
claude --dangerously-skip-permissions
\`\`\`

## HUMAN: Once Claude starts, paste this entire message:

---

You are working on issue #${issueNumber}. Follow these steps:

1. Read the issue details and understand the requirements:
   \`\`\`bash
   gh issue view ${issueNumber}
   \`\`\`

2. Implement the feature according to the specifications, following TDD practices:
   - Write tests first
   - Implement the functionality
   - Ensure all tests pass
   - Follow the patterns in CLAUDE.md

3. Save checkpoints as you work:
   \`\`\`bash
   node ~/code-repos/github/ryanrozich/ag-grid-react-components/scripts/bot-workflow/core/bot-checkpoint.js "Progress description"
   \`\`\`

4. When complete, create a PR:
   \`\`\`bash
   git add -A
   git commit -m "feat: implement issue #${issueNumber}"
   node ~/code-repos/github/ryanrozich/ag-grid-react-components/scripts/bot-workflow/core/bot-create-pr.js
   \`\`\`

Start by reading the issue details and creating the necessary file structure.

---

## Troubleshooting

- **Can't find worktree**: Check exact name with \`ls ~/ag-grid-worktrees/feature/\`
- **Claude won't start**: Make sure you have Claude CLI installed
- **Permission issues**: Use \`claude --dangerously-skip-permissions\`
`;

  const instructionFile = join(rootDir, `.bot/instructions-${issueNumber}.md`);
  fs.writeFileSync(instructionFile, botInstructions);

  // Send commands to claim the issue
  const claimCmd = `cd ${rootDir} && node scripts/bot-workflow/core/bot-claim-issue.js ${issueNumber}`;
  execSync(`tmux send-keys -t bot-army:${windowName} '${claimCmd}' Enter`);

  // Wait a moment for the claim to process
  execSync('sleep 2');

  // Add instruction to open the instructions file
  const openInstructionsCmd = `echo "\\n📋 Bot instructions saved to: ${instructionFile}\\n" && cat ${instructionFile}`;
  execSync(`tmux send-keys -t bot-army:${windowName} '${openInstructionsCmd}' Enter`);
});

// Create a final window for monitoring
execSync('tmux new-window -t bot-army -n monitor');
const monitorCmd = `cd ${rootDir} && echo "📊 Use this window to run monitoring commands:" && echo "  - gh issue list --milestone \\"Filter Presets v1\\"" && echo "  - gh pr list" && echo "  - node scripts/bot-workflow/core/bot-status-all.js"`;
execSync(`tmux send-keys -t bot-army:monitor '${monitorCmd}' Enter`);

// Switch back to dashboard
execSync('tmux select-window -t bot-army:dashboard');

console.log('\n✅ Bot army launched successfully!\n');
console.log('📺 To view the tmux session:');
console.log('   tmux attach -t bot-army\n');
console.log('🎮 Tmux controls:');
console.log('   - Switch windows: Ctrl+B, then window number (0-9)');
console.log('   - Next window: Ctrl+B, n');
console.log('   - Previous window: Ctrl+B, p');
console.log('   - List windows: Ctrl+B, w');
console.log('   - Detach: Ctrl+B, d');
console.log('   - Kill session: tmux kill-session -t bot-army\n');
console.log('🤖 Each bot has instructions in their window!');