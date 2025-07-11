# GitHub Automation & Bot Workflow System

## Overview

This repository implements a comprehensive GitHub automation system designed to maximize development velocity through parallelized AI agents and automated workflows. The system enables a single developer to orchestrate multiple AI agents working simultaneously on different features while maintaining high code quality standards.

## 🏗️ Architecture

### Core Components

````mermaid
graph TB
    subgraph HumanDeveloper[Human Developer]
        HD[Developer]
    end

    subgraph CoordinatorLayer[Coordinator Layer]
        CA[Coordinator Agent]
        PM[Project Manager Scripts]
    end

    subgraph WorkerLayer[Worker Layer]
        W1[Worker Agent 1]
        W2[Worker Agent 2]
        W3[Worker Agent N]
    end

    subgraph GitHub
        GI[Issues]
        GP[Pull Requests]
        GB[Project Board]
        GA[Actions/Workflows]
    end

    subgraph Infrastructure
        WT[Git Worktrees]
        CI[CI/CD Pipeline]
        CD[Cloudflare Deploy]
    end

    HD -->|Plans Features| CA
    CA -->|Creates Issues| GI
    CA -->|Manages| PM
    PM -->|Updates| GB

    GI -->|Claims| W1
    GI -->|Claims| W2
    GI -->|Claims| W3

    W1 -->|Works in| WT
    W2 -->|Works in| WT
    W3 -->|Works in| WT

    W1 -->|Creates| GP
    W2 -->|Creates| GP
    W3 -->|Creates| GP

    GP -->|Triggers| CI
    CI -->|Updates| GP
    CI -->|Deploys| CD

    GP -->|Reviews| HD
    GA -->|Syncs| GB
```text

### Workflow Interaction Map

```mermaid
graph LR
    subgraph IssueCreation[Issue Creation]
        IC[Issue Created] --> AL[Auto Label]
        AL --> AP[Add to Project]
        AP --> AS[Set Status]
    end

    subgraph BotDevelopment[Bot Development]
        AS --> BC[Bot Claims]
        BC --> BW[Bot Works]
        BW --> CP[Checkpoint Progress]
        CP --> PR[Create PR]
    end

    subgraph PRLifecycle[PR Lifecycle]
        PR --> CI[Run CI]
        CI --> DP[Deploy Preview]
        DP --> UR[Update URL]
        UR --> RV[Human Review]
        RV --> MG[Merge]
    end

    subgraph Cleanup
        MG --> CL[Cleanup Preview]
        CL --> UL[Update Labels]
        UL --> CS[Close Issue]
    end
````

## 🤖 Bot Workflow Lifecycle

### 1. Planning Phase

- **Human Developer** provides high-level requirements
- **Coordinator Agent** breaks down into discrete, parallelizable tasks
- GitHub issues created with detailed implementation instructions
- Issues labeled with `agent:todo` for bot pickup

### 2. Development Phase

- **Worker Agents** claim issues using `/bot claim` command
- Each agent works in isolated git worktree
- Progress saved via `/bot checkpoint` command
- Test-driven development enforced via CLAUDE.md

### 3. Review Phase

- Agents create PRs when implementation complete
- CI/CD pipeline runs automatically
- Preview deployments created for UI changes
- Human developer reviews and provides feedback

### 4. Completion Phase

- PR merged after approval
- Automated cleanup of preview deployments
- Issue status updated automatically
- Worktree cleaned up

## 👨‍💻 Human Developer Workflow

### Daily Workflow

```bash
# Morning: Plan features with Coordinator
$ node scripts/bot-workflow/coordinator/plan-feature.js
"Add timezone support to DateFilter component"

# Coordinator creates issues
# - #101: Add timezone UI component
# - #102: Update date parsing logic
# - #103: Add timezone tests
# - #104: Update documentation

# Monitor progress via GitHub
# - Project board shows real-time status
# - Notifications for PR reviews
# - Slack/email alerts for failures

# Review PRs as they complete
# - Each PR is focused and isolated
# - All tests pass before review
# - Preview deployments available
```

### Commands Available

#### Slash Commands (in Issues/PRs)

- `/bot claim` - Claim an issue for bot work
- `/bot checkpoint <message>` - Save progress
- `/bot resume <pr>` - Resume work on a PR
- `/bot handoff <reason>` - Prepare for human takeover
- `/bot status` - Check bot work status
- `/deploy preview` - Force preview deployment
- `/skip preview` - Skip preview deployment

#### CLI Scripts

```bash
# Bot workflow
scripts/bot-workflow/bot-claim-issue.js <issue>
scripts/bot-workflow/bot-checkpoint.js "message"
scripts/bot-workflow/bot-resume-work.js [pr]
scripts/bot-workflow/bot-status-all.js

# Project management
scripts/project-management/bulk-update-issues.js
scripts/project-management/sync-issues-to-project.js
scripts/project-management/generate-milestone-report.js

# Release management
scripts/release/generate-changelog.js
scripts/release/bump-version.js
npm run release -- --dry-run
```

## 📊 State Management

### Issue/PR Labels

#### Bot States

- `agent:todo` - Ready for bot work
- `agent:wip` - Bot currently working
- `agent:needs-review` - PR ready for human review
- `agent:failed` - Bot encountered error
- `agent:done` - Work completed and merged

#### PR States

- `status: pr-in-progress` - Draft PR
- `status: in-code-review` - Ready for review
- `status: code-review-complete` - Approved
- `status: merged` - Completed

#### Priorities

- `priority: critical` - Must fix ASAP
- `priority: high` - Important
- `priority: medium` - Normal
- `priority: low` - Nice to have

## 🚀 Key Features

### 1. Parallel Development

- Git worktrees enable multiple agents to work simultaneously
- No branch conflicts or state corruption
- Automatic cleanup after merge

### 2. Automated CI/CD

- Every PR triggers comprehensive test suite
- Preview deployments for UI changes
- Automatic cleanup of resources
- Performance monitoring

### 3. Smart Deployments

- Path-based triggers (only deploy when needed)
- Manual override via labels
- R2 storage for assets
- Cloudflare Workers for API

### 4. Project Synchronization

- Bidirectional sync between labels and project fields
- Automatic status updates
- Milestone tracking
- Progress reporting

### 5. Release Automation

- Release candidates (RC) for testing
- Automated changelog generation
- Version bumping
- NPM publishing

## 📁 Directory Structure

```text
.github/
├── workflows/           # GitHub Actions workflows (17 total, consolidated)
│   ├── ci.yml          # Main CI pipeline
│   ├── deploy-demo.yml # Production deployment
│   ├── deploy-preview.yml # PR preview deployment
│   ├── cleanup-deployment.yml # Preview cleanup on merge
│   ├── sync-*.yml      # Synchronization workflows
│   └── *.yml           # Other automation workflows
│
scripts/
├── automation/         # GitHub automation utilities
│   ├── github/        # GitHub API scripts
│   ├── project/       # Project management
│   └── labels/        # Label management
│
├── bot-workflow/      # Bot development system
│   ├── core/         # Core bot scripts
│   ├── worktree/     # Worktree management
│   └── coordinator/  # Coordinator agent
│
└── release/          # Release management
    ├── generate-changelog.js
    └── bump-version.js
```

## 🔧 Configuration

### Required Secrets

- `CLOUDFLARE_API_TOKEN` - For deployments
- `CLOUDFLARE_ACCOUNT_ID` - For deployments
- `CLOUDFLARE_KV_NAMESPACE_ID` - For KV storage
- `CLOUDFLARE_R2_ACCESS_KEY_ID` - For R2 storage
- `CLOUDFLARE_R2_SECRET_ACCESS_KEY` - For R2 storage
- `NPM_TOKEN` - For package publishing

### Environment Variables

```bash
# Development
GITHUB_TOKEN=your_token
CLOUDFLARE_ACCOUNT_ID=your_account_id

# Bot Configuration
BOT_WORKSPACE_DIR=~/ag-grid-worktrees
BOT_DEFAULT_BRANCH=main
BOT_CHECKPOINT_INTERVAL=30m
```

## 🚦 Getting Started

### For Developers

1. **Setup Automation**

   ```bash
   npm run setup:automation
   ```

2. **Configure GitHub**

   - Add required secrets
   - Enable GitHub Actions
   - Create project board

3. **Start Developing**
   - Create issues for features
   - Let bots handle implementation
   - Focus on architecture and review

### For Bots/Agents

1. **Claim Work**

   ```bash
   node scripts/bot-workflow/bot-claim-issue.js 123
   ```

2. **Develop Feature**

   - Follow TDD practices
   - Checkpoint regularly
   - Run quality checks

3. **Submit PR**
   - Automated via scripts
   - Includes all context
   - Links to issue

## 📈 Monitoring & Metrics

### Workflow Performance

- Average PR turnaround: < 2 hours
- CI pipeline duration: < 10 minutes
- Preview deployment: < 2 minutes
- Parallel bot capacity: 5+ simultaneous

### Quality Metrics

- Test coverage: > 80%
- Zero lint errors
- Type safety enforced
- Conventional commits

### Bot Productivity

- Issues completed per day
- Success rate
- Error frequency
- Human intervention required

## 🔍 Troubleshooting

### Common Issues

1. **Bot Can't Claim Issue**

   - Check label is `agent:todo`
   - Ensure not already claimed
   - Verify bot permissions

2. **CI Failures**

   - Check test output
   - Verify dependencies installed
   - Run `npm run pre-commit` locally

3. **Preview Not Deploying**
   - Check path filters
   - Verify Cloudflare secrets
   - Check deployment logs

## 🎯 Future Enhancements

### Planned Features

- [ ] Auto-fix for simple CI failures
- [ ] Multi-repo orchestration
- [ ] Advanced coordinator planning
- [ ] Performance optimization bot
- [ ] Security scanning bot

### Scaling Considerations

- Cloud-based bot execution
- Distributed worktree storage
- Queue-based job distribution
- Advanced monitoring dashboard

## 📚 Documentation

### Guides

- [Workflows Reference](./workflows-reference.md) - Detailed documentation of all GitHub Actions workflows
- [Bot Development Guide](./bot-development-guide.md) - How to use the bot workflow system
- [Release Management Guide](./release-management.md) - Complete release process including RCs

### Additional Resources

- [Release Strategy](../release-strategy.md) - High-level release strategy
- [Maintenance Guide](./maintenance-guide.md) - System maintenance procedures
- [AUTOMATION_FRAMEWORK.md](../../AUTOMATION_FRAMEWORK.md) - Adopting in other repos

## 🤝 Contributing

This automation system is designed to be extended. To contribute:

1. Follow existing patterns
2. Document new workflows
3. Add tests for scripts
4. Update this documentation

## 📄 License

This automation framework is part of the ag-grid-react-components project and follows the same license terms.
