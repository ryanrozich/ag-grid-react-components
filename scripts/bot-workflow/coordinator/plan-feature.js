#!/usr/bin/env node

/**
 * Coordinator agent plans a feature and creates issues for worker bots
 * Usage: node plan-feature.js "feature description"
 */

import { execSync  } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ensureProjectRoot  } from '../../utils/ensure-project-root.mjs';
// Ensure we're in the project root
ensureProjectRoot('plan-feature.js');


// Get feature description
const featureDescription = process.argv.slice(2).join(' ');

if (!featureDescription) {
  console.error('❌ Usage: node plan-feature.js "feature description"');
  console.error('   Example: node plan-feature.js "Add timezone support to DateFilter component"');
  process.exit(1);
}

console.log(`🎯 Planning feature: ${featureDescription}`);
console.log(`${'═'.repeat(50)}\n`);

/**
 * Break down a feature into discrete tasks
 * In a real implementation, this could use AI to analyze the feature
 */
function analyzeFeature(description) {
  // This is a simple heuristic-based breakdown
  // In production, this would use AI or more sophisticated analysis
  
  const tasks = [];
  const lowerDesc = description.toLowerCase();
  
  // Common patterns for feature breakdown
  if (lowerDesc.includes('component') || lowerDesc.includes('ui')) {
    tasks.push({
      type: 'component',
      title: `Create UI component for ${description}`,
      priority: 'high',
      area: 'components',
      description: `Implement the user interface component with proper React patterns, TypeScript types, and accessibility.`
    });
    
    tasks.push({
      type: 'tests',
      title: `Add tests for ${description}`,
      priority: 'high',
      area: 'testing',
      description: `Write comprehensive unit tests and integration tests for the new functionality.`
    });
  }

  if (lowerDesc.includes('api') || lowerDesc.includes('logic') || lowerDesc.includes('support')) {
    tasks.push({
      type: 'logic',
      title: `Implement business logic for ${description}`,
      priority: 'high',
      area: 'components',
      description: `Implement the core business logic, data handling, and state management.`
    });
  }

  if (lowerDesc.includes('filter') || lowerDesc.includes('ag-grid')) {
    tasks.push({
      type: 'integration',
      title: `Integrate with AG Grid for ${description}`,
      priority: 'medium',
      area: 'components',
      description: `Ensure proper integration with AG Grid's filter API and handle edge cases.`
    });
  }

  // Always add documentation and demo
  tasks.push({
    type: 'docs',
    title: `Document ${description}`,
    priority: 'medium',
    area: 'docs',
    description: `Update README, API documentation, and inline code comments.`
  });

  tasks.push({
    type: 'demo',
    title: `Add demo example for ${description}`,
    priority: 'low',
    area: 'demo',
    description: `Create a demo example showcasing the new functionality in the demo application.`
  });

  return tasks;
}

/**
 * Create tracking issue for the feature
 */
async function createTrackingIssue(feature, tasks) {
  console.log(`📋 Creating tracking issue...`);
  
  const trackingBody = `# 🎯 Feature: ${feature}

This is a tracking issue for implementing the feature. The work has been broken down into the following tasks:

## 📝 Tasks

${tasks.map((task, i) => `${i + 1}. [ ] #ISSUE-${i + 1} - ${task.title}`).join('\n')}

## 🤖 Bot Coordination

Each sub-task will be handled by a worker bot. This tracking issue will be updated as tasks are completed.

## 📊 Progress

- Total tasks: ${tasks.length}
- Completed: 0
- In Progress: 0
- Remaining: ${tasks.length}

---
*This issue was created by the Coordinator Agent*`;

  try {
    const result = execSync(
      `gh issue create --title "Feature: ${feature}" --body "${trackingBody.replace(/"/g, '\\"')}" --label "enhancement" --label "priority: high" --label "area: components"`,
      { encoding: 'utf8' }
    );
    
    const match = result.match(/\/issues\/(\d+)/);
    return match ? parseInt(match[1]) : null;
  } catch (error) {
    console.error('Failed to create tracking issue:', error.message);
    return null;
  }
}

/**
 * Create individual task issues
 */
async function createTaskIssues(tasks, trackingIssue) {
  const createdIssues = [];
  
  for (const [index, task] of tasks.entries()) {
    console.log(`\n📝 Creating issue ${index + 1}/${tasks.length}: ${task.title}`);
    
    const issueBody = `## 📋 Task Description

${task.description}

## 🔗 Context

This task is part of the feature tracked in #${trackingIssue}.

## ✅ Acceptance Criteria

- [ ] Implementation follows project conventions
- [ ] All tests pass
- [ ] Code is properly typed (no \`any\`)
- [ ] Documentation is updated
- [ ] Follows TDD approach

## 🤖 Bot Instructions

1. Claim this issue using \`/bot claim\`
2. Follow TDD - write tests first
3. Checkpoint progress regularly
4. Create PR when implementation is complete
5. Request human review if blocked

---
*This issue was created by the Coordinator Agent for bot processing*`;

    try {
      const labels = [
        task.priority === 'high' ? 'priority: high' : 'priority: medium',
        `area: ${task.area}`,
        'agent:todo',
        'enhancement'
      ];
      
      const result = execSync(
        `gh issue create --title "${task.title}" --body "${issueBody.replace(/"/g, '\\"')}" ${labels.map(l => `--label "${l}"`).join(' ')}`,
        { encoding: 'utf8' }
      );
      
      const match = result.match(/\/issues\/(\d+)/);
      if (match) {
        const issueNumber = parseInt(match[1]);
        createdIssues.push({
          number: issueNumber,
          task: task
        });
        console.log(`   ✅ Created issue #${issueNumber}`);
      }
    } catch (error) {
      console.error(`   ❌ Failed to create issue: ${error.message}`);
    }
  }
  
  return createdIssues;
}

/**
 * Update tracking issue with created task links
 */
async function updateTrackingIssue(trackingIssue, createdIssues) {
  console.log(`\n🔄 Updating tracking issue #${trackingIssue}...`);
  
  const updateBody = `## 📊 Task Issues Created

${createdIssues.map((issue, i) => `${i + 1}. [ ] #${issue.number} - ${issue.task.title}`).join('\n')}

## 🚀 Next Steps

The worker bots can now claim these issues and begin implementation. Monitor progress through this tracking issue.

---
*Updated by Coordinator Agent at ${new Date().toISOString()}*`;

  try {
    execSync(
      `gh issue comment ${trackingIssue} --body "${updateBody.replace(/"/g, '\\"')}"`,
      { stdio: 'inherit' }
    );
    console.log(`   ✅ Updated tracking issue`);
  } catch (error) {
    console.error(`   ❌ Failed to update tracking issue: ${error.message}`);
  }
}

/**
 * Main coordination function
 */
async function coordinateFeature() {
  try {
    // Step 1: Analyze and break down the feature
    console.log(`🧠 Analyzing feature requirements...`);
    const tasks = analyzeFeature(featureDescription);
    
    console.log(`\n📊 Identified ${tasks.length} tasks:`);
    tasks.forEach((task, i) => {
      console.log(`   ${i + 1}. ${task.title} (${task.priority})`);
    });

    // Step 2: Create tracking issue
    const trackingIssue = await createTrackingIssue(featureDescription, tasks);
    if (!trackingIssue) {
      throw new Error('Failed to create tracking issue');
    }
    console.log(`\n✅ Created tracking issue #${trackingIssue}`);

    // Step 3: Create individual task issues
    const createdIssues = await createTaskIssues(tasks, trackingIssue);
    
    // Step 4: Update tracking issue with links
    await updateTrackingIssue(trackingIssue, createdIssues);

    // Summary
    console.log(`\n${'═'.repeat(50)}`);
    console.log(`✅ Feature planning complete!\n`);
    console.log(`📋 Tracking Issue: #${trackingIssue}`);
    console.log(`📝 Task Issues: ${createdIssues.map(i => `#${i.number}`).join(', ')}`);
    console.log(`\n🤖 Bot Instructions:`);
    console.log(`   Bots can now claim issues with: node scripts/bot-workflow/core/bot-claim-issue.js <issue-number>`);
    
    // Output for automation
    const result = {
      success: true,
      feature: featureDescription,
      trackingIssue: trackingIssue,
      tasks: createdIssues.map(i => ({
        number: i.number,
        title: i.task.title,
        type: i.task.type,
        priority: i.task.priority
      }))
    };
    
    console.log(`\n🔧 Automation output:`);
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error(`\n❌ Error coordinating feature:`, error.message);
    process.exit(1);
  }
}

// Run the coordination
coordinateFeature().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});