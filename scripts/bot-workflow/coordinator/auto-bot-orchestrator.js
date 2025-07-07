#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../../..');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🎯 Automated Bot Orchestrator');
console.log('============================\n');

// Function to prompt user
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// Function to create bot launcher script
function createBotLauncher(issueNumber) {
  const launcherScript = `#!/bin/bash
# Auto-generated launcher for issue #${issueNumber}

echo "🤖 Bot Launcher for Issue #${issueNumber}"
echo "================================"

# Step 1: Claim the issue
echo "📋 Claiming issue #${issueNumber}..."
cd "${rootDir}"
node scripts/bot-workflow/core/bot-claim-issue.js ${issueNumber}

# Step 2: Wait for worktree setup
sleep 3

# Step 3: Navigate to worktree
echo "📁 Navigating to worktree..."
WORKTREE_DIR=$(find ~/ag-grid-worktrees -name "*-${issueNumber}-*" -type d | head -1)
if [ -z "$WORKTREE_DIR" ]; then
  echo "❌ Worktree not found!"
  exit 1
fi

cd "$WORKTREE_DIR"
echo "✅ In worktree: $WORKTREE_DIR"

# Step 4: Create implementation prompt
cat > .claude-prompt.md << 'EOF'
I'm working on issue #${issueNumber} in the worktree. Please:

1. Read the issue details:
   \`\`\`bash
   gh issue view ${issueNumber}
   \`\`\`

2. Implement the complete solution following the issue specifications
3. Use TDD - write tests first
4. Follow the patterns in CLAUDE.md
5. Create all required files and directories
6. Run tests to ensure everything works
7. Save checkpoints periodically with:
   \`\`\`bash
   node ~/code-repos/github/ryanrozich/ag-grid-react-components/scripts/bot-workflow/core/bot-checkpoint.js "Description"
   \`\`\`

Start implementing now!
EOF

echo ""
echo "📝 Bot prompt saved to: $WORKTREE_DIR/.claude-prompt.md"
echo ""
echo "🚀 Next steps:"
echo "1. Open Claude Code"
echo "2. Navigate to: $WORKTREE_DIR"
echo "3. Use the prompt in .claude-prompt.md"
echo ""
echo "Or copy this command:"
echo "cd $WORKTREE_DIR && cat .claude-prompt.md"
`;

  const scriptPath = join(rootDir, `.bot/launcher-${issueNumber}.sh`);
  fs.writeFileSync(scriptPath, launcherScript, { mode: 0o755 });
  return scriptPath;
}

// Main orchestration function
async function orchestrate() {
  // Get issue numbers
  const issueList = await prompt('Enter issue numbers separated by spaces (e.g., 47 48 49): ');
  const issueNumbers = issueList.split(' ').map(n => parseInt(n)).filter(n => !isNaN(n));
  
  if (issueNumbers.length === 0) {
    console.error('❌ No valid issue numbers provided');
    process.exit(1);
  }

  // Ask about automation level
  console.log('\n🤖 Automation Options:');
  console.log('1. Basic - Create claim scripts only');
  console.log('2. Tmux - Launch tmux session with all bots');
  console.log('3. Full - Create VS Code workspace with all worktrees');
  
  const choice = await prompt('\nSelect option (1-3): ');

  // Ensure .bot directory exists
  const botDir = join(rootDir, '.bot');
  if (!fs.existsSync(botDir)) {
    fs.mkdirSync(botDir, { recursive: true });
  }

  switch (choice) {
    case '1':
      // Basic - just create launcher scripts
      console.log('\n📝 Creating launcher scripts...');
      issueNumbers.forEach(num => {
        const script = createBotLauncher(num);
        console.log(`✅ Created: ${script}`);
      });
      console.log('\n🚀 Run each script to start a bot!');
      break;

    case '2':
      // Tmux session
      console.log('\n📺 Launching tmux session...');
      const tmuxCmd = `node ${join(__dirname, 'launch-bot-army.js')} ${issueNumbers.join(' ')}`;
      execSync(tmuxCmd, { stdio: 'inherit' });
      break;

    case '3':
      // VS Code workspace
      console.log('\n🎨 Creating VS Code workspace...');
      
      // First claim all issues
      for (const num of issueNumbers) {
        console.log(`📋 Claiming issue #${num}...`);
        try {
          execSync(`cd "${rootDir}" && node scripts/bot-workflow/core/bot-claim-issue.js ${num}`, 
            { stdio: 'inherit' });
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait between claims
        } catch (error) {
          console.error(`⚠️  Error claiming issue #${num}`);
        }
      }

      // Create VS Code workspace file
      const folders = [
        { path: rootDir, name: 'main' }
      ];

      // Add worktrees to workspace
      issueNumbers.forEach(num => {
        const worktreePath = execSync(
          `find ~/ag-grid-worktrees -name "*-${num}-*" -type d | head -1`, 
          { encoding: 'utf8' }
        ).trim();
        
        if (worktreePath) {
          folders.push({
            path: worktreePath,
            name: `bot-${num}`
          });
        }
      });

      const workspace = {
        folders: folders,
        settings: {
          "terminal.integrated.defaultProfile.osx": "zsh",
          "git.openRepositoryInParentFolders": "always"
        }
      };

      const workspacePath = join(rootDir, 'bot-army.code-workspace');
      fs.writeFileSync(workspacePath, JSON.stringify(workspace, null, 2));

      console.log(`\n✅ VS Code workspace created: ${workspacePath}`);
      console.log('\n🚀 To open:');
      console.log(`   code ${workspacePath}`);
      console.log('\nEach worktree will open in its own folder!');
      break;

    default:
      console.log('❌ Invalid option');
  }

  rl.close();
}

// Create dashboard launcher
async function createDashboard() {
  const dashboardHtml = `<!DOCTYPE html>
<html>
<head>
    <title>Bot Army Dashboard</title>
    <style>
        body { font-family: monospace; background: #1e1e1e; color: #fff; padding: 20px; }
        .bot { border: 1px solid #444; padding: 10px; margin: 10px; border-radius: 5px; }
        .active { background: #2d4a2b; }
        .completed { background: #1e3a1e; }
        .failed { background: #4a2b2b; }
        h1 { color: #4fc3f7; }
        .refresh { background: #4fc3f7; color: black; padding: 10px; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <h1>🤖 Bot Army Dashboard</h1>
    <button class="refresh" onclick="location.reload()">🔄 Refresh</button>
    <div id="bots"></div>
    <script>
        // Auto-refresh every 10 seconds
        setInterval(() => location.reload(), 10000);
        
        // Fetch bot status (you'd implement this API endpoint)
        fetch('/api/bot-status')
            .then(r => r.json())
            .then(data => {
                const container = document.getElementById('bots');
                data.bots.forEach(bot => {
                    const div = document.createElement('div');
                    div.className = 'bot ' + bot.status;
                    div.innerHTML = \`
                        <h3>Bot #\${bot.issue}</h3>
                        <p>Status: \${bot.status}</p>
                        <p>Progress: \${bot.progress}%</p>
                        <p>Last Update: \${bot.lastUpdate}</p>
                    \`;
                    container.appendChild(div);
                });
            });
    </script>
</body>
</html>`;

  const dashboardPath = join(rootDir, '.bot/dashboard.html');
  fs.writeFileSync(dashboardPath, dashboardHtml);
  console.log(`\n📊 Dashboard created: ${dashboardPath}`);
  console.log('   Open in browser: open ' + dashboardPath);
}

// Run orchestrator
orchestrate().catch(console.error);