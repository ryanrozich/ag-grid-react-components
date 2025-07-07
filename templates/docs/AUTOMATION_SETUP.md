# GitHub Automation Framework Setup Guide

This guide will help you set up the GitHub automation framework in your repository.

## 📋 Prerequisites

- Node.js 18+ installed
- GitHub CLI (`gh`) installed and authenticated
- Repository with GitHub Actions enabled
- Admin access to configure secrets and workflows

## 🚀 Quick Start

### 1. Run Setup Script

```bash
# Clone the framework
git clone https://github.com/ryanrozich/automation-framework.git
cd automation-framework

# Run setup for your repository
./setup-automation.sh YOUR_GITHUB_REPO
```

### 2. Manual Setup

If you prefer manual setup:

#### Copy Templates

```bash
# Copy workflow templates
cp -r templates/workflows/.github/workflows/* YOUR_REPO/.github/workflows/

# Copy script templates
cp -r templates/scripts/* YOUR_REPO/scripts/

# Copy documentation templates
cp -r templates/docs/* YOUR_REPO/docs/
```

#### Configure Labels

```bash
# Navigate to your repository
cd YOUR_REPO

# Create bot labels
gh label create "agent:todo" --description "Ready for bot work" --color "0E8A16"
gh label create "agent:wip" --description "Bot working on this" --color "FFA500"
gh label create "agent:needs-review" --description "Ready for human review" --color "0052CC"
gh label create "agent:failed" --description "Bot encountered error" --color "D93F0B"
gh label create "agent:done" --description "Bot work completed" --color "5319E7"
```

## 🔧 Configuration

### 1. GitHub Secrets

Add these secrets to your repository:

```bash
# Required for deployments (if using Cloudflare)
gh secret set CLOUDFLARE_API_TOKEN
gh secret set CLOUDFLARE_ACCOUNT_ID

# Required for npm publishing
gh secret set NPM_TOKEN

# Optional for Slack notifications
gh secret set SLACK_WEBHOOK_URL
```

### 2. Update Workflow Files

Edit the copied workflow files to match your project:

#### `.github/workflows/ci.yml`

```yaml
# Update test command
- name: Run tests
  run: npm test # Change to your test command

# Update build command
- name: Build project
  run: npm run build # Change to your build command
```

#### `.github/workflows/bot-automation.yml`

```yaml
# Update label names if different
TODO_LABEL: "agent:todo" # Change if using different labels
WIP_LABEL: "agent:wip"
```

### 3. Initialize Scripts

```bash
# Make scripts executable
chmod +x scripts/bot-workflow/*.js
chmod +x scripts/automation/**/*.js

# Install dependencies
npm install
```

## 🏗️ Project Structure

After setup, your project will have:

```
YOUR_REPO/
├── .github/
│   └── workflows/         # GitHub Actions workflows
│       ├── ci.yml        # Main CI pipeline
│       ├── bot-automation.yml  # Bot command handling
│       └── health-check.yml    # System monitoring
│
├── scripts/
│   ├── bot-workflow/     # Bot development scripts
│   │   ├── bot-claim-issue.js
│   │   ├── bot-checkpoint.js
│   │   └── bot-status-all.js
│   │
│   └── automation/       # Automation utilities
│       └── monitoring/   # Health checks
│
└── docs/
    └── github-automation/  # Documentation
```

## 🤖 Bot Setup

### 1. Configure Bot Workspace

```bash
# Set bot workspace location
export BOT_WORKSPACE_DIR=~/bot-worktrees

# Add to your shell profile
echo 'export BOT_WORKSPACE_DIR=~/bot-worktrees' >> ~/.bashrc
```

### 2. Test Bot Commands

```bash
# Create test issue
gh issue create --title "Test bot workflow" \
  --body "Test issue for bot automation" \
  --label "agent:todo"

# Test claiming
node scripts/bot-workflow/bot-claim-issue.js 1

# Check status
node scripts/bot-workflow/bot-status-all.js
```

## 📊 Monitoring Setup

### 1. Enable Health Checks

The health check workflow runs daily by default. To run manually:

```bash
gh workflow run health-check.yml
```

### 2. View Performance Reports

```bash
# Generate performance report
node scripts/automation/monitoring/workflow-performance.js --days=7

# Export detailed metrics
node scripts/automation/monitoring/workflow-performance.js --export
```

## 🎯 Customization

### Add Project-Specific Scripts

1. Create new scripts in `scripts/` directory
2. Follow the template pattern
3. Update documentation

### Modify Workflows

1. Edit workflow files in `.github/workflows/`
2. Test changes in a branch first
3. Monitor workflow runs after merge

### Extend Bot Capabilities

1. Add new commands to bot-automation.yml
2. Create corresponding scripts
3. Update bot documentation

## 🚨 Troubleshooting

### Common Issues

#### Bot can't claim issues

- Check label exists: `gh label list | grep "agent:todo"`
- Verify permissions: `gh auth status`
- Check workflow logs: `gh run list --workflow=bot-automation.yml`

#### Workflows failing

- Check secrets are set: `gh secret list`
- Verify Node.js version in workflows
- Review workflow logs for specific errors

#### Health check errors

- Ensure GitHub token has correct permissions
- Check if scripts are executable
- Verify dependencies are installed

### Getting Help

1. Check the [troubleshooting guide](./TROUBLESHOOTING.md)
2. Review [example implementations](./examples/)
3. Open an issue in the framework repository

## 📚 Next Steps

1. Read the [Bot Development Guide](./bot-development-guide.md)
2. Review [Workflow Patterns](./workflow-patterns.md)
3. Explore [Advanced Features](./advanced-features.md)

## 🎉 Success Checklist

- [ ] Workflows copied and configured
- [ ] Scripts installed and executable
- [ ] Labels created
- [ ] Secrets configured
- [ ] Test bot command working
- [ ] Health check passing
- [ ] Documentation updated

Congratulations! Your repository now has the GitHub automation framework installed. Start by creating issues with the `agent:todo` label to test the bot workflow.
