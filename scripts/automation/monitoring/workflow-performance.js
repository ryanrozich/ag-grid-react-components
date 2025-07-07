#!/usr/bin/env node

/**
 * Monitor GitHub Actions workflow performance
 * Usage: node workflow-performance.js [workflow-name] [--days=7]
 */

import { execSync  } from 'child_process';
import { ensureProjectRoot  } from '../../utils/ensure-project-root.mjs';
// Ensure we're in the project root
ensureProjectRoot('workflow-performance.js');


// Parse arguments
const args = process.argv.slice(2);
const workflowName = args.find(arg => !arg.startsWith('--')) || '';
const days = parseInt(args.find(arg => arg.startsWith('--days='))?.split('=')[1] || '7');

console.log(`📊 Workflow Performance Report`);
console.log(`${'═'.repeat(50)}\n`);

/**
 * Get workflow runs data
 */
function getWorkflowRuns(workflow, daysBack) {
  try {
    const date = new Date();
    date.setDate(date.getDate() - daysBack);
    const since = date.toISOString();

    let query = `gh run list --json databaseId,name,status,conclusion,createdAt,updatedAt,event`;
    
    if (workflow) {
      query += ` --workflow="${workflow}"`;
    }
    
    query += ` --limit 100`;

    const runs = JSON.parse(execSync(query, { encoding: 'utf8' }));
    
    // Filter by date
    return runs.filter(run => new Date(run.createdAt) >= date);
  } catch (error) {
    console.error(`Error fetching workflow runs:`, error.message);
    return [];
  }
}

/**
 * Calculate run duration in minutes
 */
function calculateDuration(run) {
  const start = new Date(run.createdAt);
  const end = new Date(run.updatedAt);
  return Math.round((end - start) / 1000 / 60);
}

/**
 * Group runs by workflow
 */
function groupByWorkflow(runs) {
  const grouped = {};
  
  runs.forEach(run => {
    if (!grouped[run.name]) {
      grouped[run.name] = [];
    }
    grouped[run.name].push(run);
  });
  
  return grouped;
}

/**
 * Calculate workflow statistics
 */
function calculateStats(runs) {
  if (runs.length === 0) return null;

  const durations = runs.map(calculateDuration).filter(d => d > 0);
  const successful = runs.filter(r => r.conclusion === 'success');
  const failed = runs.filter(r => r.conclusion === 'failure');
  const cancelled = runs.filter(r => r.conclusion === 'cancelled');
  
  // Calculate percentiles
  durations.sort((a, b) => a - b);
  const p50 = durations[Math.floor(durations.length * 0.5)];
  const p90 = durations[Math.floor(durations.length * 0.9)];
  const p95 = durations[Math.floor(durations.length * 0.95)];

  return {
    total: runs.length,
    successful: successful.length,
    failed: failed.length,
    cancelled: cancelled.length,
    successRate: (successful.length / runs.length * 100).toFixed(1),
    avgDuration: Math.round(durations.reduce((a, b) => a + b, 0) / durations.length),
    minDuration: Math.min(...durations),
    maxDuration: Math.max(...durations),
    p50Duration: p50,
    p90Duration: p90,
    p95Duration: p95,
    byEvent: runs.reduce((acc, run) => {
      acc[run.event] = (acc[run.event] || 0) + 1;
      return acc;
    }, {})
  };
}

/**
 * Format duration for display
 */
function formatDuration(minutes) {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

/**
 * Generate performance report
 */
async function generateReport() {
  // Get workflow runs
  const runs = getWorkflowRuns(workflowName, days);
  
  if (runs.length === 0) {
    console.log(`No workflow runs found in the last ${days} days`);
    return;
  }

  console.log(`Period: Last ${days} days`);
  console.log(`Total runs: ${runs.length}\n`);

  // Group by workflow
  const grouped = groupByWorkflow(runs);
  const workflows = Object.keys(grouped).sort();

  // Overall summary
  console.log(`📈 Overall Summary`);
  console.log(`${'-'.repeat(50)}`);
  
  const allStats = calculateStats(runs);
  console.log(`Total Runs: ${allStats.total}`);
  console.log(`Success Rate: ${allStats.successRate}%`);
  console.log(`Average Duration: ${formatDuration(allStats.avgDuration)}`);
  console.log(`P95 Duration: ${formatDuration(allStats.p95Duration)}`);
  console.log('');

  // Per-workflow breakdown
  console.log(`📊 Workflow Breakdown`);
  console.log(`${'-'.repeat(50)}`);
  
  workflows.forEach(workflow => {
    const workflowRuns = grouped[workflow];
    const stats = calculateStats(workflowRuns);
    
    console.log(`\n${workflow}:`);
    console.log(`  Runs: ${stats.total} (${stats.successful} ✅, ${stats.failed} ❌, ${stats.cancelled} ⚠️)`);
    console.log(`  Success Rate: ${stats.successRate}%`);
    console.log(`  Duration: avg ${formatDuration(stats.avgDuration)}, p50 ${formatDuration(stats.p50Duration)}, p90 ${formatDuration(stats.p90Duration)}`);
    console.log(`  Range: ${formatDuration(stats.minDuration)} - ${formatDuration(stats.maxDuration)}`);
    
    // Event breakdown
    const events = Object.entries(stats.byEvent)
      .sort(([,a], [,b]) => b - a)
      .map(([event, count]) => `${event}: ${count}`)
      .join(', ');
    console.log(`  Triggers: ${events}`);
  });

  // Bottlenecks and recommendations
  console.log(`\n🔍 Analysis & Recommendations`);
  console.log(`${'-'.repeat(50)}`);

  // Find slowest workflows
  const slowWorkflows = workflows
    .map(w => ({ name: w, stats: calculateStats(grouped[w]) }))
    .filter(w => w.stats.avgDuration > 10)
    .sort((a, b) => b.stats.avgDuration - a.stats.avgDuration);

  if (slowWorkflows.length > 0) {
    console.log(`\n⚠️  Slow Workflows (>10min average):`);
    slowWorkflows.forEach(w => {
      console.log(`  - ${w.name}: ${formatDuration(w.stats.avgDuration)} avg`);
    });
  }

  // Find unreliable workflows
  const unreliableWorkflows = workflows
    .map(w => ({ name: w, stats: calculateStats(grouped[w]) }))
    .filter(w => parseFloat(w.stats.successRate) < 90)
    .sort((a, b) => parseFloat(a.stats.successRate) - parseFloat(b.stats.successRate));

  if (unreliableWorkflows.length > 0) {
    console.log(`\n⚠️  Unreliable Workflows (<90% success):`);
    unreliableWorkflows.forEach(w => {
      console.log(`  - ${w.name}: ${w.stats.successRate}% success rate`);
    });
  }

  // Cost estimation
  console.log(`\n💰 Cost Estimation`);
  console.log(`${'-'.repeat(50)}`);
  
  const totalMinutes = runs.reduce((acc, run) => acc + calculateDuration(run), 0);
  const estimatedCost = (totalMinutes * 0.008).toFixed(2); // $0.008 per minute for Linux
  
  console.log(`Total Runtime: ${formatDuration(totalMinutes)}`);
  console.log(`Estimated Cost: $${estimatedCost} (Linux runners)`);
  console.log(`Average Cost per Run: $${(estimatedCost / runs.length).toFixed(3)}`);

  // Optimization suggestions
  console.log(`\n💡 Optimization Suggestions`);
  console.log(`${'-'.repeat(50)}`);

  if (allStats.p95Duration > 20) {
    console.log(`- Consider adding more caching (current P95: ${formatDuration(allStats.p95Duration)})`);
  }

  if (parseFloat(allStats.successRate) < 95) {
    console.log(`- Improve test reliability (current success: ${allStats.successRate}%)`);
  }

  const cancelRate = (allStats.cancelled / allStats.total * 100);
  if (cancelRate > 10) {
    console.log(`- High cancellation rate (${cancelRate.toFixed(1)}%) - consider using concurrency groups`);
  }

  // Check for optimization opportunities
  const ciWorkflow = grouped['CI'] || grouped['ci'];
  if (ciWorkflow) {
    const ciStats = calculateStats(ciWorkflow);
    if (ciStats.avgDuration > 10) {
      console.log(`- CI workflow averaging ${formatDuration(ciStats.avgDuration)} - consider parallelization`);
    }
  }

  // Export data for further analysis
  if (args.includes('--export')) {
    const exportData = {
      period: { days, from: new Date(Date.now() - days * 24 * 60 * 60 * 1000), to: new Date() },
      summary: allStats,
      workflows: workflows.map(w => ({
        name: w,
        stats: calculateStats(grouped[w]),
        runs: grouped[w].length
      })),
      recommendations: {
        slowWorkflows: slowWorkflows.map(w => w.name),
        unreliableWorkflows: unreliableWorkflows.map(w => w.name),
        estimatedCost
      }
    };

    require('fs').writeFileSync(
      'workflow-performance-report.json',
      JSON.stringify(exportData, null, 2)
    );
    console.log(`\n📄 Report exported to workflow-performance-report.json`);
  }
}

// Main execution
generateReport().catch(error => {
  console.error('Error generating report:', error);
  process.exit(1);
});