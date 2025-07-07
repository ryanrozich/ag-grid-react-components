# GitHub Automation Framework

A comprehensive automation system that enables a single developer to orchestrate multiple AI agents working in parallel, dramatically increasing development velocity while maintaining code quality.

## 🚀 Overview

This framework transforms how software development is done by:

- **Parallelizing Development**: Multiple AI agents work simultaneously on different features
- **Automating Workflows**: From issue creation to PR merge, everything is automated
- **Maintaining Quality**: Comprehensive CI/CD ensures code quality never drops
- **Scaling Productivity**: One developer can manage 5-10x more work

## 🎯 Key Benefits

### For Solo Developers

- Manage multiple features in parallel
- Focus on architecture while bots handle implementation
- Automated testing and deployment
- Complete project management automation

### For Teams

- Standardized development workflow
- Reduced review burden
- Automated documentation
- Consistent code quality

### For Open Source

- Easy contributor onboarding
- Automated issue triage
- Community bot assistance
- Streamlined release process

## 🚀 Quick Start

### 1. Copy Framework Files

```bash
# Clone this repository
git clone https://github.com/ryanrozich/ag-grid-react-components.git
cd ag-grid-react-components

# Copy automation files to your project
cp -r .github/workflows /path/to/your/project/.github/
cp -r scripts/automation /path/to/your/project/scripts/
cp -r scripts/bot-workflow /path/to/your/project/scripts/
cp -r scripts/release /path/to/your/project/scripts/
cp -r docs/github-automation /path/to/your/project/docs/
cp CLAUDE.md /path/to/your/project/
```

### 2. Run Setup Script

```bash
cd /path/to/your/project
node scripts/automation/setup/setup-framework.js
```

This will:

- Initialize configuration
- Set up GitHub secrets
- Create initial labels
- Configure project board
- Generate documentation

### 3. Configure Secrets

Add these secrets to your GitHub repository:

```
CLOUDFLARE_API_TOKEN        # For deployments
CLOUDFLARE_ACCOUNT_ID       # For deployments
NPM_TOKEN                   # For package publishing
```

### 4. Create CLAUDE.md

Customize the AI agent instructions for your project:

```markdown
# CLAUDE.md

## Project Overview

[Your project description]

## Development Workflow

1. Always run tests before committing
2. Follow [your coding standards]
3. Use [your preferred patterns]

## Bot Instructions

- Claim issues with `agent:todo` label
- Work in isolated git worktrees
- Create focused PRs
- Run quality checks before submission
```

## 🏗️ Architecture

```
Developer → Coordinator Agent → Multiple Worker Agents
    ↓              ↓                    ↓
  Plans      Creates Issues      Implement Features
    ↓              ↓                    ↓
 Reviews    Manages Board         Create PRs
    ↓              ↓                    ↓
  Merges    Track Progress      Auto-Deploy
```

## 📦 What's Included

### 1. **GitHub Workflows** (17 optimized workflows)

- Automated CI/CD pipeline
- Preview deployments for PRs
- Release management with RCs
- Project synchronization
- Security scanning

### 2. **Bot Development System**

- Git worktree management
- Issue claiming and tracking
- Progress checkpointing
- Automated PR creation
- State management

### 3. **Project Management**

- Automated labeling
- Project board sync
- Milestone tracking
- Progress reporting

### 4. **Release Automation**

- Version bumping
- Changelog generation
- NPM publishing
- GitHub releases

## 🤖 Using the Bot System

### For Developers

1. **Create Work Items**

   ```bash
   gh issue create --title "Add dark mode" --label "enhancement,agent:todo"
   ```

2. **Monitor Progress**

   ```bash
   node scripts/bot-workflow/bot-status-all.js
   ```

3. **Review PRs**
   - Bots create PRs automatically
   - Preview deployments available
   - All tests pass before review

### For AI Agents

1. **Claim Work**

   ```bash
   node scripts/bot-workflow/bot-claim-issue.js 123
   ```

2. **Save Progress**

   ```bash
   node scripts/bot-workflow/bot-checkpoint.js "Implemented base component"
   ```

3. **Submit PR**
   ```bash
   node scripts/bot-workflow/bot-create-pr.js
   ```

## 📋 Workflow Reference

### Core Workflows

| Workflow                     | Purpose                 | Triggers      |
| ---------------------------- | ----------------------- | ------------- |
| `ci-optimized.yml`           | Fast parallel CI checks | Push, PR      |
| `deploy-demo.yml`            | Production deployment   | Main branch   |
| `deploy-preview.yml`         | PR preview sites        | PR changes    |
| `sync-labels-to-project.yml` | Project board sync      | Label changes |
| `release-candidate.yml`      | RC releases             | Manual        |

### Automation Workflows

| Workflow               | Purpose            | Triggers       |
| ---------------------- | ------------------ | -------------- |
| `bot-development.yml`  | Bot slash commands | Issue comments |
| `issue-automation.yml` | Auto-labeling      | Issue events   |
| `pr-automation.yml`    | PR management      | PR events      |
| `stale.yml`            | Cleanup old items  | Schedule       |

## 🏷️ Label System

### Bot States

- `agent:todo` - Ready for bot work
- `agent:wip` - Bot working
- `agent:needs-review` - PR ready
- `agent:done` - Completed

### Priorities

- `priority: critical` - Urgent
- `priority: high` - Important
- `priority: medium` - Normal
- `priority: low` - Nice to have

### Areas

- `area: components` - Component work
- `area: docs` - Documentation
- `area: ci/cd` - Infrastructure
- `area: testing` - Test improvements

## 📊 Monitoring

### Quick Status Check

```bash
# Bot status
node scripts/bot-workflow/bot-status-all.js

# Workflow performance
node scripts/automation/monitoring/workflow-performance.js

# Project health
node scripts/automation/monitoring/health-check.js
```

### Key Metrics

- Bot success rate (target: >90%)
- CI duration (target: <10min)
- PR turnaround (target: <2hr)
- Cost per feature (target: <$5)

## 🔧 Customization

### Adapt Workflows

1. **CI Pipeline**

   - Modify test commands in `ci-optimized.yml`
   - Add your build steps
   - Configure your deployment

2. **Bot Behavior**

   - Update `CLAUDE.md` with your standards
   - Customize bot scripts for your workflow
   - Add project-specific validations

3. **Release Process**
   - Configure version format
   - Customize changelog categories
   - Set up deployment targets

### Extend Functionality

1. **Add New Workflows**

   ```yaml
   # .github/workflows/custom.yml
   name: Custom Workflow
   on: [workflow_dispatch]
   jobs:
     custom:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - run: echo "Custom logic here"
   ```

2. **Create Bot Commands**

   ```javascript
   // scripts/bot-workflow/custom-command.js
   import { parseSlashCommand } from "./core/slash-commands.js";

   const command = parseSlashCommand(process.argv[2]);
   if (command.name === "custom") {
     // Your logic here
   }
   ```

## 🚨 Troubleshooting

### Common Issues

1. **Bot Can't Claim Issues**

   - Check `agent:todo` label exists
   - Verify GitHub token permissions
   - Ensure worktree directory is writable

2. **CI Failures**

   - Run `npm run pre-commit` locally
   - Check workflow logs in Actions tab
   - Verify all secrets are set

3. **Deploy Issues**
   - Check Cloudflare credentials
   - Verify build output exists
   - Review deployment logs

### Debug Commands

```bash
# Check GitHub auth
gh auth status

# Test workflow locally
act -W .github/workflows/ci-optimized.yml

# Validate configuration
node scripts/automation/setup/validate-config.js
```

## 📈 Success Stories

### This Repository

- **5x productivity increase** with bot automation
- **<10min CI times** with optimized workflows
- **100% deployment success** rate
- **Zero-downtime** preview deployments

### Adoption Tips

1. Start with basic CI/CD
2. Add bot automation gradually
3. Monitor and optimize
4. Share learnings with community

## 🤝 Contributing

We welcome contributions to improve this framework!

1. **Report Issues**: Found a bug or have a suggestion?
2. **Submit PRs**: Improvements and fixes welcome
3. **Share Experiences**: How are you using this framework?
4. **Spread the Word**: Star the repo and share with others

## 📚 Resources

### Documentation

- [Detailed Workflows Guide](./docs/github-automation/workflows-reference.md)
- [Bot Development Guide](./docs/github-automation/bot-development-guide.md)
- [Release Management](./docs/github-automation/release-management.md)
- [Monitoring Dashboard](./docs/github-automation/monitoring-dashboard.md)

### Examples

- [Setup Script](./scripts/automation/setup/setup-framework.js)
- [Bot Workflow](./scripts/bot-workflow/bot-claim-issue.js)
- [Release Process](./scripts/release/prepare-release.js)

### External Links

- [GitHub Actions Docs](https://docs.github.com/actions)
- [Cloudflare Workers](https://workers.cloudflare.com)
- [Conventional Commits](https://www.conventionalcommits.org)

## 📄 License

This automation framework is open source and available under the same license as the main project. Feel free to use, modify, and distribute according to the license terms.

---

**Ready to 10x your development velocity?** Start with the Quick Start guide above and join the future of AI-assisted development!

For questions and support, open an issue in the [main repository](https://github.com/ryanrozich/ag-grid-react-components).
