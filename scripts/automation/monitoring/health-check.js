#!/usr/bin/env node

/**
 * System health check for GitHub automation
 * Usage: node health-check.js [--json] [--verbose]
 */

import { execSync  } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ensureProjectRoot  } from '../../utils/ensure-project-root.mjs';
// Ensure we're in the project root
ensureProjectRoot('health-check.js');


// Parse arguments
const args = process.argv.slice(2);
const jsonOutput = args.includes('--json');
const verbose = args.includes('--verbose');

// Health status levels
const HealthStatus = {
  HEALTHY: { symbol: '🟢', text: 'Healthy', value: 0 },
  WARNING: { symbol: '🟡', text: 'Warning', value: 1 },
  CRITICAL: { symbol: '🔴', text: 'Critical', value: 2 }
};

// Initialize health report
const healthReport = {
  timestamp: new Date().toISOString(),
  overall: HealthStatus.HEALTHY,
  checks: {},
  recommendations: [],
  metrics: {}
};

/**
 * Run a health check and update report
 */
function runCheck(name, checkFn) {
  try {
    const result = checkFn();
    healthReport.checks[name] = result;

    // Update overall status
    if (result.status.value > healthReport.overall.value) {
      healthReport.overall = result.status;
    }

    // Add recommendations
    if (result.recommendations) {
      healthReport.recommendations.push(...result.recommendations);
    }

    return result;
  } catch (error) {
    healthReport.checks[name] = {
      status: HealthStatus.CRITICAL,
      message: `Check failed: ${error.message}`,
      error: true
    };
    return null;
  }
}

/**
 * Check workflow health
 */
function checkWorkflows() {
  const oneDay = 24 * 60 * 60 * 1000;
  const since = new Date(Date.now() - oneDay).toISOString();

  try {
    // Get recent workflow runs
    const runs = JSON.parse(
      execSync(`gh run list --json status,conclusion,createdAt --limit 100`, { encoding: 'utf8' })
    );

    // Filter to last 24 hours
    const recentRuns = runs.filter(run => new Date(run.createdAt) > new Date(since));
    const successful = recentRuns.filter(r => r.conclusion === 'success').length;
    const failed = recentRuns.filter(r => r.conclusion === 'failure').length;
    const total = recentRuns.length;

    const successRate = total > 0 ? (successful / total * 100) : 100;

    let status = HealthStatus.HEALTHY;
    const recommendations = [];

    if (successRate < 80) {
      status = HealthStatus.CRITICAL;
      recommendations.push('Multiple workflow failures detected - investigate CI issues');
    } else if (successRate < 90) {
      status = HealthStatus.WARNING;
      recommendations.push('Some workflow failures - review failed runs');
    }

    healthReport.metrics.workflowSuccessRate = successRate;
    healthReport.metrics.workflowsTotal = total;

    return {
      status,
      message: `${successRate.toFixed(1)}% success rate (${successful}/${total} runs)`,
      details: { successful, failed, total, successRate },
      recommendations
    };
  } catch (error) {
    return {
      status: HealthStatus.WARNING,
      message: 'Unable to fetch workflow data',
      error: error.message
    };
  }
}

/**
 * Check bot health
 */
function checkBots() {
  try {
    // Get bot-related issues
    const wipIssues = JSON.parse(
      execSync(`gh issue list --label "agent:wip" --json number,updatedAt`, { encoding: 'utf8' })
    );

    const failedIssues = JSON.parse(
      execSync(`gh issue list --label "agent:failed" --json number,title`, { encoding: 'utf8' })
    );

    // Check for stale work
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const staleWork = wipIssues.filter(issue => new Date(issue.updatedAt) < twoDaysAgo);

    let status = HealthStatus.HEALTHY;
    const recommendations = [];

    if (failedIssues.length > 2) {
      status = HealthStatus.CRITICAL;
      recommendations.push(`${failedIssues.length} bot failures need attention`);
    } else if (failedIssues.length > 0) {
      status = HealthStatus.WARNING;
      recommendations.push(`Review ${failedIssues.length} failed bot task(s)`);
    }

    if (staleWork.length > 0) {
      status = Math.max(status.value, HealthStatus.WARNING.value) === 2
        ? HealthStatus.CRITICAL
        : HealthStatus.WARNING;
      recommendations.push(`${staleWork.length} stale bot task(s) - check issues: ${staleWork.map(i => `#${i.number}`).join(', ')}`);
    }

    healthReport.metrics.botsActive = wipIssues.length;
    healthReport.metrics.botsFailed = failedIssues.length;
    healthReport.metrics.botsStale = staleWork.length;

    return {
      status,
      message: `${wipIssues.length} active, ${failedIssues.length} failed, ${staleWork.length} stale`,
      details: { active: wipIssues.length, failed: failedIssues.length, stale: staleWork.length },
      recommendations
    };
  } catch (error) {
    return {
      status: HealthStatus.WARNING,
      message: 'Unable to fetch bot data',
      error: error.message
    };
  }
}

/**
 * Check deployment health
 */
function checkDeployments() {
  try {
    // Check recent deployments
    const deployRuns = JSON.parse(
      execSync(`gh run list --workflow "deploy-demo.yml" --json conclusion,createdAt --limit 10`, { encoding: 'utf8' })
    );

    const previewRuns = JSON.parse(
      execSync(`gh run list --workflow "deploy-preview.yml" --json conclusion,createdAt --limit 20`, { encoding: 'utf8' })
    );

    const recentDeploys = deployRuns.filter(r => r.conclusion === 'success').length;
    const recentPreviews = previewRuns.filter(r => r.conclusion === 'success').length;

    let status = HealthStatus.HEALTHY;
    const recommendations = [];

    if (recentDeploys === 0 && deployRuns.length > 0) {
      status = HealthStatus.CRITICAL;
      recommendations.push('Production deployments failing - urgent attention needed');
    }

    const previewSuccessRate = previewRuns.length > 0
      ? (recentPreviews / previewRuns.length * 100)
      : 100;

    if (previewSuccessRate < 80) {
      status = Math.max(status.value, HealthStatus.WARNING.value) === 2
        ? HealthStatus.CRITICAL
        : HealthStatus.WARNING;
      recommendations.push('Preview deployments experiencing issues');
    }

    healthReport.metrics.deploymentSuccess = recentDeploys;
    healthReport.metrics.previewSuccess = previewSuccessRate;

    return {
      status,
      message: `Production: ${recentDeploys}/${deployRuns.length}, Preview: ${previewSuccessRate.toFixed(0)}%`,
      details: { production: recentDeploys, preview: previewSuccessRate },
      recommendations
    };
  } catch (error) {
    return {
      status: HealthStatus.WARNING,
      message: 'Unable to fetch deployment data',
      error: error.message
    };
  }
}

/**
 * Check resource usage
 */
function checkResources() {
  try {
    // Check GitHub Actions usage (this is an approximation)
    const runs = JSON.parse(
      execSync(`gh run list --json createdAt,updatedAt --limit 100`, { encoding: 'utf8' })
    );

    // Calculate total minutes used
    const totalMinutes = runs.reduce((acc, run) => {
      const duration = (new Date(run.updatedAt) - new Date(run.createdAt)) / 1000 / 60;
      return acc + duration;
    }, 0);

    // Estimate daily usage
    const daysInPeriod = 7;
    const dailyMinutes = totalMinutes / daysInPeriod;
    const monthlyCost = (dailyMinutes * 30 * 0.008); // $0.008 per minute

    let status = HealthStatus.HEALTHY;
    const recommendations = [];

    if (monthlyCost > 200) {
      status = HealthStatus.CRITICAL;
      recommendations.push(`High cost projection: $${monthlyCost.toFixed(2)}/month - optimize workflows`);
    } else if (monthlyCost > 150) {
      status = HealthStatus.WARNING;
      recommendations.push(`Cost approaching limit: $${monthlyCost.toFixed(2)}/month`);
    }

    healthReport.metrics.dailyMinutes = dailyMinutes;
    healthReport.metrics.monthlyCost = monthlyCost;

    return {
      status,
      message: `~${dailyMinutes.toFixed(0)} min/day, ~$${monthlyCost.toFixed(2)}/month`,
      details: { dailyMinutes, monthlyCost },
      recommendations
    };
  } catch (error) {
    return {
      status: HealthStatus.WARNING,
      message: 'Unable to calculate resource usage',
      error: error.message
    };
  }
}

/**
 * Check security and dependencies
 */
function checkSecurity() {
  try {
    const recommendations = [];
    let status = HealthStatus.HEALTHY;

    // Check for security alerts (requires API call)
    try {
      const alerts = JSON.parse(
        execSync(`gh api /repos/{owner}/{repo}/vulnerability-alerts --jq '.'`, {
          encoding: 'utf8',
          stdio: ['pipe', 'pipe', 'ignore']
        })
      );

      if (alerts && alerts.length > 0) {
        status = HealthStatus.WARNING;
        recommendations.push(`${alerts.length} security vulnerability alerts`);
      }
    } catch (e) {
      // API might not be available or no alerts
    }

    // Check npm audit
    try {
      execSync('npm audit --audit-level=high', { stdio: 'ignore' });
    } catch (e) {
      status = HealthStatus.WARNING;
      recommendations.push('npm audit found high severity vulnerabilities');
    }

    return {
      status,
      message: status === HealthStatus.HEALTHY ? 'No security issues' : 'Security issues detected',
      recommendations
    };
  } catch (error) {
    return {
      status: HealthStatus.WARNING,
      message: 'Unable to check security status',
      error: error.message
    };
  }
}

/**
 * Display health report
 */
function displayReport() {
  if (jsonOutput) {
    console.log(JSON.stringify(healthReport, null, 2));
    return;
  }

  console.log(`\n🏥 GitHub Automation Health Check`);
  console.log(`${'═'.repeat(50)}`);
  console.log(`Timestamp: ${new Date().toLocaleString()}\n`);

  console.log(`Overall Status: ${healthReport.overall.symbol} ${healthReport.overall.text}\n`);

  // Display individual checks
  Object.entries(healthReport.checks).forEach(([name, result]) => {
    if (!result) return;

    console.log(`${result.status.symbol} ${name}: ${result.message}`);

    if (verbose && result.details) {
      console.log(`   Details: ${JSON.stringify(result.details)}`);
    }
  });

  // Display recommendations
  if (healthReport.recommendations.length > 0) {
    console.log(`\n📋 Recommendations:`);
    healthReport.recommendations.forEach(rec => {
      console.log(`- ${rec}`);
    });
  }

  // Display key metrics
  if (verbose) {
    console.log(`\n📊 Key Metrics:`);
    Object.entries(healthReport.metrics).forEach(([key, value]) => {
      console.log(`- ${key}: ${typeof value === 'number' ? value.toFixed(2) : value}`);
    });
  }

  // Summary
  console.log(`\n${'─'.repeat(50)}`);
  if (healthReport.overall.value === 0) {
    console.log('✅ System is healthy!');
  } else if (healthReport.overall.value === 1) {
    console.log('⚠️  Some issues need attention');
  } else {
    console.log('🚨 Critical issues detected!');
  }
}

/**
 * Main execution
 */
async function runHealthCheck() {
  if (!jsonOutput) {
    console.log('Running health checks...');
  }

  // Run all checks
  runCheck('Workflows', checkWorkflows);
  runCheck('Bots', checkBots);
  runCheck('Deployments', checkDeployments);
  runCheck('Resources', checkResources);
  runCheck('Security', checkSecurity);

  // Display results
  displayReport();

  // Exit with appropriate code
  process.exit(healthReport.overall.value);
}

// Execute
runHealthCheck().catch(error => {
  console.error('Health check failed:', error.message);
  process.exit(2);
});