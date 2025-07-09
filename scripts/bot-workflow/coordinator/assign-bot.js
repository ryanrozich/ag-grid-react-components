#!/usr/bin/env node

/**
 * Assign an available bot to work on an issue
 * Usage: node assign-bot.js <issue-number> [bot-name]
 */

import { execSync  } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ensureProjectRoot  } from '../../utils/ensure-project-root.mjs';
// Ensure we're in the project root
ensureProjectRoot('assign-bot.js');


// Parse arguments
const [issueNumber, botName] = process.argv.slice(2);

if (!issueNumber) {
  console.error('❌ Usage: node assign-bot.js <issue-number> [bot-name]');
  console.error('   Example: node assign-bot.js 123 bot-1');
  process.exit(1);
}

const assignedBot = botName || `bot-${Date.now()}`;

console.log(`🤖 Assigning ${assignedBot} to issue #${issueNumber}...`);

/**
 * Check bot availability
 */
function checkBotAvailability(bot) {
  // In a real system, this would check:
  // - Current bot workload
  // - Bot capabilities vs issue requirements
  // - Bot resource usage

  // For now, we'll simulate by checking if bot has active work
  try {
    const activePRs = JSON.parse(
      execSync(`gh pr list --json number,labels --search "author:${bot}"`, { encoding: 'utf8' })
    );

    const activeWork = activePRs.filter(pr =>
      pr.labels.some(l => l.name === 'agent:wip')
    );

    return {
      available: activeWork.length === 0,
      currentWork: activeWork.length
    };
  } catch (e) {
    // Bot hasn't done any work yet
    return { available: true, currentWork: 0 };
  }
}

/**
 * Trigger bot to claim issue
 */
async function triggerBotClaim(issue, bot) {
  // In a production system, this would:
  // 1. Send message to bot queue
  // 2. Trigger bot Lambda/container
  // 3. Monitor bot progress

  // For now, we'll simulate by adding a comment
  console.log(`📢 Triggering bot claim...`);

  const triggerComment = `🤖 **Bot Assignment**

Bot \`${bot}\` has been assigned to work on this issue.

The bot will:
1. Claim this issue
2. Set up development environment
3. Begin implementation following TDD
4. Create PR when complete

---
*Triggered by Coordinator Agent*

/bot claim`;

  try {
    execSync(
      `gh issue comment ${issue} --body "${triggerComment.replace(/"/g, '\\"')}"`,
      { stdio: 'inherit' }
    );

    console.log(`✅ Bot claim triggered`);
    return true;
  } catch (error) {
    console.error(`Failed to trigger bot:`, error.message);
    return false;
  }
}

/**
 * Monitor bot progress
 */
function setupMonitoring(issue, bot) {
  // In production, this would set up:
  // - Progress tracking
  // - Timeout monitoring
  // - Error detection
  // - Performance metrics

  const monitoringConfig = {
    issue: issue,
    bot: bot,
    startTime: new Date().toISOString(),
    timeout: 3600000, // 1 hour
    checkpoints: []
  };

  // Save monitoring config
  const monitoringDir = path.join(process.cwd(), '.bot-monitoring');
  if (!fs.existsSync(monitoringDir)) {
    fs.mkdirSync(monitoringDir, { recursive: true });
  }

  const configPath = path.join(monitoringDir, `issue-${issue}.json`);
  fs.writeFileSync(configPath, JSON.stringify(monitoringConfig, null, 2));

  console.log(`📊 Monitoring configured at: ${configPath}`);
  return monitoringConfig;
}

/**
 * Main assignment function
 */
async function assignBot() {
  try {
    // Check issue status
    console.log(`📋 Checking issue #${issueNumber}...`);
    const issueInfo = JSON.parse(
      execSync(`gh issue view ${issueNumber} --json state,labels,title`, { encoding: 'utf8' })
    );

    if (issueInfo.state !== 'OPEN') {
      throw new Error(`Issue #${issueNumber} is not open`);
    }

    const hasAgentTodo = issueInfo.labels.some(l => l.name === 'agent:todo');
    const hasAgentWip = issueInfo.labels.some(l => l.name === 'agent:wip');

    if (hasAgentWip) {
      throw new Error(`Issue #${issueNumber} is already being worked on`);
    }

    if (!hasAgentTodo) {
      console.warn(`⚠️  Issue #${issueNumber} is not labeled 'agent:todo'`);
    }

    // Check bot availability
    console.log(`\n🔍 Checking bot availability...`);
    const availability = checkBotAvailability(assignedBot);

    if (!availability.available) {
      console.log(`⚠️  Bot ${assignedBot} has ${availability.currentWork} active tasks`);
      console.log(`   Proceeding anyway...`);
    } else {
      console.log(`✅ Bot ${assignedBot} is available`);
    }

    // Trigger bot claim
    console.log(`\n🚀 Assigning bot to issue...`);
    const triggered = await triggerBotClaim(issueNumber, assignedBot);

    if (!triggered) {
      throw new Error('Failed to trigger bot claim');
    }

    // Set up monitoring
    console.log(`\n📊 Setting up monitoring...`);
    const monitoring = setupMonitoring(issueNumber, assignedBot);

    // Summary
    console.log(`\n${'═'.repeat(50)}`);
    console.log(`✅ Bot assignment complete!\n`);
    console.log(`🤖 Bot: ${assignedBot}`);
    console.log(`📋 Issue: #${issueNumber} - ${issueInfo.title}`);
    console.log(`🕐 Started: ${monitoring.startTime}`);
    console.log(`\n📡 Next steps:`);
    console.log(`   - Bot will claim the issue`);
    console.log(`   - Monitor progress: gh issue view ${issueNumber}`);
    console.log(`   - Check bot status: node scripts/bot-workflow/core/bot-status-all.js`);

    // Output for automation
    const result = {
      success: true,
      issue: parseInt(issueNumber),
      bot: assignedBot,
      monitoring: monitoring,
      triggered: new Date().toISOString()
    };

    console.log(`\n🔧 Automation output:`);
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error(`\n❌ Error assigning bot:`, error.message);
    process.exit(1);
  }
}

// Run the assignment
assignBot().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});