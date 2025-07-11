# Monitoring Dashboard Guide

This guide covers monitoring and observability for the GitHub automation system, including performance tracking, health checks, and operational insights.

## 📊 Overview

Our monitoring approach provides visibility into:

- Workflow performance and reliability
- Bot productivity and success rates
- Resource utilization and costs
- System health and bottlenecks

## 🎯 Key Metrics

### Workflow Metrics

#### Performance

- **Execution Time**: P50, P90, P95 durations
- **Queue Time**: Time waiting to start
- **Success Rate**: Percentage of successful runs
- **Concurrency**: Parallel jobs running

#### Reliability

- **Failure Rate**: By workflow and cause
- **Retry Success**: Recovery from failures
- **Cancellation Rate**: Manually stopped runs
- **Timeout Rate**: Runs exceeding limits

### Bot Metrics

#### Productivity

- **Issues Completed**: Per day/week
- **PR Turnaround**: Issue → PR time
- **Success Rate**: Completed vs failed
- **Human Intervention**: Required help frequency

#### Quality

- **CI Pass Rate**: First-time success
- **Code Review Cycles**: Iterations needed
- **Test Coverage**: Maintained or improved
- **Bug Introduction**: Post-merge issues

### Cost Metrics

#### GitHub Actions

- **Minutes Used**: By workflow type
- **Storage Used**: Artifacts and caches
- **Concurrency Usage**: Peak parallel jobs
- **Cost per Feature**: Total automation cost

## 🛠️ Monitoring Tools

### 1. Workflow Performance Script

````bash
# Basic usage - last 7 days
node scripts/automation/monitoring/workflow-performance.js

# Specific workflow - last 30 days
node scripts/automation/monitoring/workflow-performance.js "CI" --days=30

# Export detailed report
node scripts/automation/monitoring/workflow-performance.js --export
```text

Output includes:

- Execution time statistics
- Success/failure rates
- Cost estimation
- Optimization suggestions

### 2. Bot Status Dashboard

```bash
# Current bot status
node scripts/bot-workflow/bot-status-all.js

# Bot productivity report
node scripts/automation/monitoring/bot-productivity.js --days=7

# Stale work detection
node scripts/automation/monitoring/check-stale-work.js
```text

### 3. Project Board Analytics

```bash
# Milestone progress
node scripts/project-management/generate-milestone-report.js

# Issue velocity
node scripts/automation/monitoring/issue-velocity.js

# Label distribution
gh api graphql -f query='
{
  repository(owner: "ryanrozich", name: "ag-grid-react-components") {
    labels(first: 100) {
      nodes {
        name
        issues { totalCount }
      }
    }
  }
}'
```text

## 📈 Real-time Monitoring

### GitHub Insights

1. **Actions Tab**

   - View running workflows
   - Check queue depth
   - Monitor failures

2. **Insights → Actions**

   - Workflow run statistics
   - Billable time usage
   - Failure trends

3. **Project Board**
   - Card movement velocity
   - Status distribution
   - Blocked items

### Automated Alerts

Set up GitHub notifications for:

- Workflow failures
- Long-running jobs
- Security alerts
- Dependency updates

## 🎨 Dashboard Views

### Executive Summary

````

┌─────────────────────────────────────────┐
│ Weekly Automation Report │
├─────────────────────────────────────────┤
│ Features Completed: 12 │
│ Bot Success Rate: 94% │
│ Avg CI Time: 8.5 min │
│ Total Cost: $24.50 │
│ │
│ Top Issues: │
│ - Flaky E2E tests (3 failures) │
│ - Slow preview deployments │
└─────────────────────────────────────────┘

```text

### Workflow Performance

```

┌─────────────────────────────────────────┐
│ Workflow Performance Matrix │
├─────────────────────────────────────────┤
│ Workflow │ Runs │ Success │ Avg Time │
├─────────────┼──────┼─────────┼──────────┤
│ CI │ 142 │ 96.5% │ 8.2 min │
│ Deploy │ 45 │ 100% │ 3.5 min │
│ E2E Tests │ 38 │ 92.1% │ 12.4 min │
│ Release │ 3 │ 100% │ 5.8 min │
└─────────────┴──────┴─────────┴──────────┘

```text

### Bot Activity

```

┌─────────────────────────────────────────┐
│ Bot Activity Timeline │
├─────────────────────────────────────────┤
│ Bot-1 │████████░░│ Issue #45 (80%) │
│ Bot-2 │██████████│ Issue #46 (Done) │
│ Bot-3 │███░░░░░░░│ Issue #47 (30%) │
│ Bot-4 │░░░░░░░░░░│ Idle │
└─────────────────────────────────────────┘

````text

## 📊 Custom Metrics

### Define Custom Metrics

```javascript
// scripts/automation/monitoring/custom-metrics.js

const metrics = {
  // Feature velocity
  featuresPerWeek: async () => {
    const closed = await getClosedIssues({
      labels: ["enhancement"],
      since: weekAgo,
    });
    return closed.length;
  },

  // Bot efficiency
  botEfficiency: async () => {
    const claimed = await getIssues({ labels: ["agent:wip"] });
    const completed = await getIssues({ labels: ["agent:done"] });
    return ((completed.length / claimed.length) * 100).toFixed(1);
  },

  // Technical debt
  techDebtRatio: async () => {
    const features = await getIssues({ labels: ["enhancement"] });
    const debt = await getIssues({ labels: ["tech-debt"] });
    return ((debt.length / features.length) * 100).toFixed(1);
  },
};
```text

### Track Over Time

```bash
# Run daily via GitHub Actions
- cron: '0 9 * * *'  # 9 AM daily

# Store in metrics file
date,features_week,bot_efficiency,tech_debt
2024-01-15,12,94.5,15.2
2024-01-16,14,92.3,14.8
```text

## 🚨 Health Checks

### System Health Indicators

1. **Green (Healthy)**

   - All workflows passing
   - Bot success rate >90%
   - No stale work >48h
   - Cost within budget

2. **Yellow (Warning)**

   - Some workflow failures
   - Bot success rate 80-90%
   - Stale work 48-72h
   - Cost approaching limit

3. **Red (Critical)**
   - Multiple workflow failures
   - Bot success rate <80%
   - Stale work >72h
   - Cost over budget

### Automated Health Check

```bash
# scripts/automation/monitoring/health-check.js
node health-check.js

# Output
System Health: 🟢 Healthy

✅ Workflows: 96% success rate (last 24h)
✅ Bots: 4/4 active, 92% success rate
⚠️  Stale Work: 2 issues >48h old
✅ Costs: $18.50/$50 daily budget

Recommendations:
- Review stale issues #34, #38
- Consider increasing bot concurrency
````

## 📉 Troubleshooting Patterns

### Common Issues Detection

1. **Flaky Tests**

   ```bash
   # Find flaky tests
   gh run list --workflow=CI --json conclusion \
     | jq '[.[] | select(.conclusion == "failure")] | length'
   ```

2. **Bot Failures**

   ```bash
   # Check bot error patterns
   gh issue list --label "agent:failed" \
     --json number,title,body
   ```

3. **Performance Degradation**
   ````bash
   # Compare performance over time
   node workflow-performance.js CI --days=30 \
     | grep "Average Duration"
   ```text
   ````

## 🎯 KPIs and Goals

### Automation KPIs

| Metric             | Target | Current | Status |
| ------------------ | ------ | ------- | ------ |
| Bot Success Rate   | >90%   | 94%     | 🟢     |
| CI Duration (P95)  | <15min | 12min   | 🟢     |
| Deploy Success     | 100%   | 100%    | 🟢     |
| Cost per Feature   | <$5    | $4.20   | 🟢     |
| Human Intervention | <10%   | 8%      | 🟢     |

### Monthly Goals

- **Efficiency**: Reduce CI time by 10%
- **Reliability**: Maintain 95%+ success rate
- **Scale**: Support 10 parallel bots
- **Cost**: Stay under $200/month

## 🔧 Monitoring Setup

### 1. Install Monitoring Scripts

````bash
# Make scripts executable
chmod +x scripts/automation/monitoring/*.js

# Add to PATH
export PATH=$PATH:$(pwd)/scripts/automation/monitoring
```text

### 2. Schedule Reports

```yaml
# .github/workflows/monitoring-report.yml
name: Monitoring Report

on:
  schedule:
    - cron: "0 9 * * 1" # Weekly on Monday
  workflow_dispatch:

jobs:
  report:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Generate Report
        run: |
          node scripts/automation/monitoring/workflow-performance.js --export
          node scripts/automation/monitoring/bot-productivity.js --export

      - name: Upload Report
        uses: actions/upload-artifact@v4
        with:
          name: monitoring-report-${{ github.run_id }}
          path: |
            *.json
            *.md
```text

### 3. Create Dashboards

Using GitHub Pages or internal tools:

```html
<!-- monitoring-dashboard.html -->
<div class="dashboard">
  <div class="metric-card">
    <h3>Bot Productivity</h3>
    <canvas id="bot-chart"></canvas>
  </div>

  <div class="metric-card">
    <h3>Workflow Performance</h3>
    <canvas id="workflow-chart"></canvas>
  </div>

  <div class="metric-card">
    <h3>Cost Tracking</h3>
    <canvas id="cost-chart"></canvas>
  </div>
</div>
````

## 📚 Related Documentation

- [Workflows Reference](./workflows-reference.md)
- [Bot Development Guide](./bot-development-guide.md)
- [Release Management](./release-management.md)
- [GitHub Automation Overview](./README.md)
