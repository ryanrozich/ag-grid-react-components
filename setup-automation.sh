#!/bin/bash

# GitHub Automation Framework Setup Script
# Usage: ./setup-automation.sh [target-repo-path]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_REPO="${1:-$(pwd)}"

echo -e "${GREEN}🚀 GitHub Automation Framework Setup${NC}"
echo "======================================="
echo ""

# Validate target repository
if [ ! -d "$TARGET_REPO/.git" ]; then
  echo -e "${RED}❌ Error: $TARGET_REPO is not a git repository${NC}"
  echo "Usage: $0 [target-repo-path]"
  exit 1
fi

cd "$TARGET_REPO"
REPO_NAME=$(basename "$TARGET_REPO")

echo "📂 Setting up automation for: $REPO_NAME"
echo "📍 Location: $TARGET_REPO"
echo ""

# Check prerequisites
echo -e "${YELLOW}📋 Checking prerequisites...${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
  echo -e "${RED}❌ Node.js not found. Please install Node.js 18+${NC}"
  exit 1
fi

NODE_VERSION=$(node --version | cut -d. -f1 | sed 's/v//')
if [ "$NODE_VERSION" -lt 18 ]; then
  echo -e "${RED}❌ Node.js 18+ required (found $(node --version))${NC}"
  exit 1
fi
echo "✅ Node.js $(node --version)"

# Check GitHub CLI
if ! command -v gh &> /dev/null; then
  echo -e "${RED}❌ GitHub CLI not found. Please install: https://cli.github.com${NC}"
  exit 1
fi

if ! gh auth status &> /dev/null; then
  echo -e "${RED}❌ GitHub CLI not authenticated. Run: gh auth login${NC}"
  exit 1
fi
echo "✅ GitHub CLI authenticated"

# Check if npm/package.json exists
if [ ! -f "package.json" ]; then
  echo -e "${YELLOW}⚠️  No package.json found. Creating one...${NC}"
  npm init -y
fi

echo ""
echo -e "${GREEN}📦 Creating directory structure...${NC}"

# Create directories
mkdir -p .github/workflows
mkdir -p scripts/{bot-workflow,automation/monitoring,project-management,release}
mkdir -p docs/github-automation

echo "✅ Directories created"

# Copy workflow templates
echo ""
echo -e "${GREEN}📋 Copying workflow templates...${NC}"

# Copy and customize workflows
for workflow in "$SCRIPT_DIR"/templates/workflows/*.yml; do
  filename=$(basename "$workflow")
  target=".github/workflows/${filename//-template/}"

  if [ -f "$target" ]; then
    echo -e "${YELLOW}⚠️  $target already exists, skipping${NC}"
  else
    cp "$workflow" "$target"
    echo "✅ Created $target"
  fi
done

# Copy script templates
echo ""
echo -e "${GREEN}📜 Copying script templates...${NC}"

# Bot workflow scripts
cp -n "$SCRIPT_DIR"/templates/scripts/bot-claim-template.js scripts/bot-workflow/bot-claim-issue.js 2>/dev/null || echo "⚠️  bot-claim-issue.js already exists"
cp -n "$SCRIPT_DIR"/scripts/bot-workflow/bot-checkpoint.js scripts/bot-workflow/ 2>/dev/null || echo "⚠️  bot-checkpoint.js already exists"
cp -n "$SCRIPT_DIR"/scripts/bot-workflow/bot-status-all.js scripts/bot-workflow/ 2>/dev/null || echo "⚠️  bot-status-all.js already exists"

# Monitoring scripts
cp -n "$SCRIPT_DIR"/scripts/automation/monitoring/health-check.js scripts/automation/monitoring/ 2>/dev/null || echo "⚠️  health-check.js already exists"
cp -n "$SCRIPT_DIR"/scripts/automation/monitoring/workflow-performance.js scripts/automation/monitoring/ 2>/dev/null || echo "⚠️  workflow-performance.js already exists"

# Make scripts executable
chmod +x scripts/**/*.js

echo "✅ Scripts copied and made executable"

# Copy documentation
echo ""
echo -e "${GREEN}📚 Copying documentation...${NC}"

cp -n "$SCRIPT_DIR"/templates/docs/AUTOMATION_SETUP.md docs/github-automation/ 2>/dev/null || echo "⚠️  AUTOMATION_SETUP.md already exists"

# Create project-specific docs if they don't exist
if [ ! -f "docs/github-automation/README.md" ]; then
  cat > docs/github-automation/README.md << 'EOF'
# GitHub Automation

This project uses the GitHub Automation Framework for enhanced development workflows.

## Quick Start

- Create issues with `agent:todo` label for bot automation
- Use `/bot claim` in issue comments to assign work
- Monitor progress with `node scripts/bot-workflow/bot-status-all.js`

## Documentation

- [Setup Guide](./AUTOMATION_SETUP.md)
- [Workflows Reference](./workflows-reference.md)
- [Bot Development Guide](./bot-development-guide.md)

## Key Features

- Automated CI/CD pipelines
- Bot-assisted development
- Health monitoring
- Release automation
EOF
  echo "✅ Created project README"
fi

# Setup GitHub labels
echo ""
echo -e "${GREEN}🏷️  Setting up GitHub labels...${NC}"

# Function to create label if it doesn't exist
create_label() {
  local name=$1
  local desc=$2
  local color=$3

  if gh label list | grep -q "^$name"; then
    echo "  ⚠️  Label '$name' already exists"
  else
    gh label create "$name" --description "$desc" --color "$color"
    echo "  ✅ Created label '$name'"
  fi
}

# Create bot labels
create_label "agent:todo" "Ready for bot work" "0E8A16"
create_label "agent:wip" "Bot working on this" "FFA500"
create_label "agent:needs-review" "Ready for human review" "0052CC"
create_label "agent:failed" "Bot encountered error" "D93F0B"
create_label "agent:done" "Bot work completed" "5319E7"

# Create priority labels
create_label "priority: critical" "Must fix ASAP" "B60205"
create_label "priority: high" "Important" "D93F0B"
create_label "priority: medium" "Normal priority" "FBCA04"
create_label "priority: low" "Nice to have" "0E8A16"

# Create status labels
create_label "status: needs-triage" "Needs evaluation" "E99695"
create_label "status: backlog" "Ready for development" "C2E0C6"

# Update package.json scripts
echo ""
echo -e "${GREEN}📝 Updating package.json scripts...${NC}"

# Add automation scripts if not present
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Ensure scripts object exists
pkg.scripts = pkg.scripts || {};

// Add automation scripts
const automationScripts = {
  'bot:status': 'node scripts/bot-workflow/bot-status-all.js',
  'bot:health': 'node scripts/automation/monitoring/health-check.js',
  'bot:performance': 'node scripts/automation/monitoring/workflow-performance.js',
  'setup:labels': 'node scripts/bot-workflow/setup-bot-labels.js'
};

let added = false;
for (const [key, value] of Object.entries(automationScripts)) {
  if (!pkg.scripts[key]) {
    pkg.scripts[key] = value;
    added = true;
  }
}

if (added) {
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
  console.log('✅ Added automation scripts to package.json');
} else {
  console.log('⚠️  Automation scripts already present in package.json');
}
"

# Create .env.example if needed
echo ""
echo -e "${GREEN}🔐 Creating environment template...${NC}"

if [ ! -f ".env.example" ]; then
  cat > .env.example << 'EOF'
# GitHub Automation Environment Variables

# Bot Configuration
BOT_WORKSPACE_DIR=~/bot-worktrees
BOT_DEFAULT_BRANCH=main

# GitHub Settings
GITHUB_TOKEN=your_github_token_here

# Optional: Deployment Settings
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=

# Optional: Notifications
SLACK_WEBHOOK_URL=
EOF
  echo "✅ Created .env.example"
else
  echo "⚠️  .env.example already exists"
fi

# Final setup steps
echo ""
echo -e "${GREEN}🎯 Final Steps:${NC}"
echo ""
echo "1. Configure GitHub Secrets:"
echo "   gh secret set NPM_TOKEN"
echo "   gh secret set CLOUDFLARE_API_TOKEN  # If using deployments"
echo ""
echo "2. Review and customize workflows:"
echo "   - .github/workflows/ci.yml"
echo "   - .github/workflows/bot-automation.yml"
echo ""
echo "3. Test the setup:"
echo "   npm run bot:health"
echo "   npm run bot:status"
echo ""
echo "4. Create your first bot-ready issue:"
echo "   gh issue create --title \"Test bot workflow\" \\"
echo "     --body \"Test issue for bot automation\" \\"
echo "     --label \"agent:todo\""
echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "📚 Documentation: docs/github-automation/"
echo "🤖 Bot scripts: scripts/bot-workflow/"
echo "📊 Monitoring: scripts/automation/monitoring/"
echo ""
echo -e "${YELLOW}Happy automating! 🚀${NC}"