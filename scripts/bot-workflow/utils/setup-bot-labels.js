#!/usr/bin/env node

/**
 * Set up enhanced bot label system
 * Usage: node setup-bot-labels.js
 */

import { execSync  } from 'child_process';

console.log(`🏷️  Setting up enhanced bot label system...`);
console.log(`${'═'.repeat(50)}\n`);

// Define bot-specific labels
const botLabels = [
  // Bot states
  {
    name: 'agent:todo',
    color: '0E8A16',
    description: 'Ready for bot assignment'
  },
  {
    name: 'agent:wip',
    color: 'FEF3C7',
    description: 'Bot actively working'
  },
  {
    name: 'agent:needs-review',
    color: '1E40AF',
    description: 'Bot work ready for human review'
  },
  {
    name: 'agent:failed',
    color: 'B91C1C',
    description: 'Bot encountered error'
  },
  {
    name: 'agent:done',
    color: '6EE7B7',
    description: 'Bot work completed and merged'
  },
  
  // Bot metadata
  {
    name: 'bot-created',
    color: '8B5CF6',
    description: 'Created by automated bot'
  },
  {
    name: 'needs-human-review',
    color: 'F59E0B',
    description: 'Requires human intervention'
  },
  {
    name: 'bot:checkpoint',
    color: '6B7280',
    description: 'Bot saved checkpoint'
  },
  
  // Coordinator labels
  {
    name: 'coordinator:tracking',
    color: '7C3AED',
    description: 'Feature tracking issue'
  },
  {
    name: 'coordinator:planned',
    color: 'A78BFA',
    description: 'Planned by coordinator'
  },
  
  // Performance labels
  {
    name: 'bot:stale',
    color: 'DC2626',
    description: 'Bot work idle >24h'
  },
  {
    name: 'bot:timeout',
    color: 'EF4444',
    description: 'Bot exceeded time limit'
  }
];

/**
 * Create or update a label
 */
async function createOrUpdateLabel(label) {
  try {
    // Check if label exists
    const existingLabels = JSON.parse(
      execSync('gh label list --json name,color,description --limit 1000', { encoding: 'utf8' })
    );
    
    const existing = existingLabels.find(l => l.name === label.name);
    
    if (existing) {
      // Update if different
      if (existing.color !== label.color || existing.description !== label.description) {
        console.log(`🔄 Updating label: ${label.name}`);
        execSync(
          `gh label edit "${label.name}" --color "${label.color}" --description "${label.description}"`,
          { stdio: 'inherit' }
        );
      } else {
        console.log(`✅ Label exists: ${label.name}`);
      }
    } else {
      // Create new
      console.log(`➕ Creating label: ${label.name}`);
      execSync(
        `gh label create "${label.name}" --color "${label.color}" --description "${label.description}"`,
        { stdio: 'inherit' }
      );
    }
  } catch (error) {
    console.error(`❌ Error with label ${label.name}:`, error.message);
  }
}

/**
 * Set up label aliases for backward compatibility
 */
function setupAliases() {
  console.log(`\n🔗 Setting up label aliases...`);
  
  // Map old labels to new ones if needed
  const aliases = {
    'bot-work': 'agent:todo',
    'bot-in-progress': 'agent:wip',
    'bot-review': 'agent:needs-review'
  };
  
  Object.entries(aliases).forEach(([oldLabel, newLabel]) => {
    try {
      // Find issues with old label
      const issues = JSON.parse(
        execSync(`gh issue list --label "${oldLabel}" --json number --limit 100`, { encoding: 'utf8' })
      );
      
      if (issues.length > 0) {
        console.log(`   Migrating ${issues.length} issues from ${oldLabel} to ${newLabel}`);
        issues.forEach(issue => {
          execSync(
            `gh issue edit ${issue.number} --remove-label "${oldLabel}" --add-label "${newLabel}"`,
            { stdio: 'ignore' }
          );
        });
      }
    } catch (e) {
      // Old label doesn't exist
    }
  });
}

/**
 * Create label groups documentation
 */
function createLabelDocs() {
  const docs = `# Bot Label System

## State Labels (agent:*)
These track the bot's progress through the development lifecycle:

- \`agent:todo\` - Issue is ready for bot assignment
- \`agent:wip\` - Bot is actively working on the issue
- \`agent:needs-review\` - Bot has created PR, needs human review
- \`agent:failed\` - Bot encountered an error and needs help
- \`agent:done\` - Work is complete and merged

## Metadata Labels
Additional information about bot work:

- \`bot-created\` - PR/issue was created by a bot
- \`needs-human-review\` - Requires human intervention
- \`bot:checkpoint\` - Bot has saved progress checkpoints
- \`bot:stale\` - No activity for >24 hours
- \`bot:timeout\` - Bot exceeded time limits

## Coordinator Labels
For multi-bot coordination:

- \`coordinator:tracking\` - Main tracking issue for a feature
- \`coordinator:planned\` - Work items planned by coordinator

## Label Transitions

\`\`\`mermaid
graph LR
    A[agent:todo] --> B[agent:wip]
    B --> C[agent:needs-review]
    B --> D[agent:failed]
    C --> E[agent:done]
    D --> F[needs-human-review]
\`\`\`

## Usage Examples

### Assign work to bot:
\`\`\`bash
gh issue edit 123 --add-label "agent:todo"
\`\`\`

### Mark as failed:
\`\`\`bash
gh issue edit 123 --add-label "agent:failed" --add-label "needs-human-review"
\`\`\`

### Query bot work:
\`\`\`bash
# All bot work
gh issue list --label "agent:wip"

# Stale bot work
gh issue list --label "bot:stale"

# Failed bot work needing help
gh issue list --label "agent:failed"
\`\`\`
`;

  console.log(`\n📄 Label documentation created`);
  return docs;
}

/**
 * Main setup function
 */
async function setupBotLabels() {
  try {
    // Create/update all bot labels
    console.log(`Creating bot labels...`);
    for (const label of botLabels) {
      await createOrUpdateLabel(label);
    }

    // Set up aliases
    setupAliases();

    // Create documentation
    const docs = createLabelDocs();

    // Summary
    console.log(`\n${'═'.repeat(50)}`);
    console.log(`✅ Bot label system setup complete!\n`);
    console.log(`📊 Labels created: ${botLabels.length}`);
    console.log(`\n🏷️  Available bot states:`);
    console.log(`   - agent:todo → agent:wip → agent:needs-review → agent:done`);
    console.log(`   - agent:failed + needs-human-review (for errors)`);
    
    console.log(`\n📝 Next steps:`);
    console.log(`   1. Update bot scripts to use new labels`);
    console.log(`   2. Configure automation rules`);
    console.log(`   3. Train team on label usage`);

    // Save documentation
    import fs from 'fs';
    import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const docsPath = path.join(__dirname, '../BOT_LABELS.md');
    fs.writeFileSync(docsPath, docs);
    console.log(`\n📄 Documentation saved to: ${docsPath}`);

  } catch (error) {
    console.error(`\n❌ Error setting up labels:`, error.message);
    process.exit(1);
  }
}

// Run the setup
setupBotLabels().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});