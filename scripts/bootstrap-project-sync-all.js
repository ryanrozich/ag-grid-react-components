#!/usr/bin/env node

/**
 * Bootstrap script to sync ALL project items (issues AND PRs, open AND closed)
 * This ensures complete synchronization of project fields to labels
 * 
 * Usage: node scripts/bootstrap-project-sync-all.js
 */

import { execSync } from 'child_process';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || execSync('gh auth token').toString().trim();
const OWNER = 'ryanrozich';
const REPO = 'ag-grid-react-components';

// Field to label mappings with emoji support
const fieldMappings = {
  Priority: {
    'Critical': 'priority: critical',
    'High': 'priority: high',
    'Medium': 'priority: medium',
    'Low': 'priority: low',
    '🔴 Critical': 'priority: critical',
    '🟠 High': 'priority: high',
    '🟡 Medium': 'priority: medium',
    '🟢 Low': 'priority: low'
  },
  Area: {
    'Components': 'area: components',
    'Demo': 'area: demo',
    'Build': 'area: build',
    'CI/CD': 'area: ci/cd',
    'Testing': 'area: testing',
    'Docs': 'area: docs',
    '🧩 Components': 'area: components',
    '🎨 Demo': 'area: demo',
    '🔨 Build': 'area: build',
    '🤖 CI/CD': 'area: ci/cd',
    '🧪 Testing': 'area: testing',
    '📚 Docs': 'area: docs'
  },
  Type: {
    'Bug': 'bug',
    'Enhancement': 'enhancement',
    'Documentation': 'documentation',
    'Question': 'question',
    'Good First Issue': 'good first issue',
    'Help Wanted': 'help wanted',
    '🐛 Bug': 'bug',
    '✨ Feature': 'enhancement',
    '✨ Enhancement': 'enhancement',
    '📚 Documentation': 'documentation',
    '❓ Question': 'question',
    '👋 Good First Issue': 'good first issue',
    '🆘 Help Wanted': 'help wanted'
  },
  Component: {
    'DateFilter': 'component: date-filter',
    'QuickFilterDropdown': 'component: quick-filter-dropdown',
    'ActiveFilters': 'component: active-filters',
    'RelativeDateFilter': 'component: relative-date-filter',
    'Grid State Utils': 'component: grid-state-utils',
    'Demo App': 'component: demo-app'
  },
  Status: {
    // Issue statuses
    'Needs Triage': 'status: needs-triage',
    'Triaging': 'status: triaging',
    'Backlog': 'status: backlog',
    'In Progress': 'status: in-progress',
    'In Product Review': 'status: in-product-review',
    'Done': 'status: done',
    '📥 Needs Triage': 'status: needs-triage',
    '🔍 Triaging': 'status: triaging',
    '📋 Backlog': 'status: backlog',
    '🚧 In Progress': 'status: in-progress',
    '👀 In Product Review': 'status: in-product-review',
    '✅ Done': 'status: done',
    // PR statuses
    'PR In Progress': 'status: pr-in-progress',
    'In Code Review': 'status: in-code-review',
    'In Review': 'status: in-code-review', // Map old value to new
    'Code Review Complete': 'status: code-review-complete',
    'Merged': 'status: merged',
    '🔨 PR In Progress': 'status: pr-in-progress',
    '👨‍💻 In Code Review': 'status: in-code-review',
    '🎉 Code Review Complete': 'status: code-review-complete',
    '🚀 Merged': 'status: merged'
  },
  Effort: {
    'XS (< 1 hour)': 'effort: xs',
    'S (1-4 hours)': 'effort: s',
    'M (1-2 days)': 'effort: m',
    'L (3-5 days)': 'effort: l',
    'XL (1+ week)': 'effort: xl'
  }
};

async function graphqlRequest(query, variables = {}) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables })
  });

  const data = await response.json();
  if (data.errors) {
    console.error('GraphQL errors:', data.errors);
    throw new Error('GraphQL request failed');
  }
  return data.data;
}

async function getProjectItems() {
  const query = `
    query($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        projectsV2(first: 10) {
          nodes {
            id
            title
            items(first: 100) {
              nodes {
                id
                content {
                  ... on Issue {
                    id
                    number
                    title
                    state
                    labels(first: 100) {
                      nodes {
                        name
                      }
                    }
                  }
                  ... on PullRequest {
                    id
                    number
                    title
                    state
                    labels(first: 100) {
                      nodes {
                        name
                      }
                    }
                  }
                }
                fieldValues(first: 20) {
                  nodes {
                    ... on ProjectV2ItemFieldSingleSelectValue {
                      field {
                        ... on ProjectV2SingleSelectField {
                          name
                        }
                      }
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await graphqlRequest(query, { owner: OWNER, repo: REPO });
  return data.repository.projectsV2.nodes;
}

async function updateLabels(type, number, labelsToAdd, labelsToRemove) {
  const command = type === 'pr' ? 'pr' : 'issue';
  
  // Validate number is an integer
  const issueNumber = parseInt(number, 10);
  if (isNaN(issueNumber) || issueNumber <= 0) {
    console.error(`Invalid ${type} number: ${number}`);
    return;
  }
  
  // Remove labels
  for (const label of labelsToRemove) {
    try {
      execSync(`gh ${command} edit ${issueNumber} --remove-label "${label}"`, {
        stdio: 'pipe',
        encoding: 'utf8'
      });
      console.log(`  ✓ Removed label: ${label}`);
    } catch (e) {
      // Label might not exist, that's OK
    }
  }

  // Add labels
  if (labelsToAdd.length > 0) {
    const addLabels = labelsToAdd.map(l => `--add-label "${l}"`).join(' ');
    try {
      execSync(`gh ${command} edit ${issueNumber} ${addLabels}`, {
        stdio: 'pipe',
        encoding: 'utf8'
      });
      console.log(`  ✓ Added labels: ${labelsToAdd.join(', ')}`);
    } catch (e) {
      console.error(`  ✗ Failed to add labels: ${e.message}`);
    }
  }
}

async function main() {
  console.log('🔄 Bootstrap Project Sync (ALL items)\n');
  console.log(`Repository: ${OWNER}/${REPO}`);
  console.log('Fetching project data (including closed issues and PRs)...\n');

  try {
    const projects = await getProjectItems();
    let totalItems = 0;
    let updatedItems = 0;
    let issueCount = 0;
    let prCount = 0;

    for (const project of projects) {
      console.log(`\n📋 Project: ${project.title}`);
      console.log('─'.repeat(50));

      for (const item of project.items.nodes) {
        if (!item.content || !item.content.number) continue;

        totalItems++;
        const number = item.content.number;
        const title = item.content.title;
        const state = item.content.state;
        const currentLabels = item.content.labels.nodes.map(l => l.name);
        const labelsToAdd = new Set();
        const labelsToRemove = new Set();
        let hasChanges = false;

        // Determine if this is an issue or PR
        const isIssue = item.content.id.includes('I_');
        const type = isIssue ? 'issue' : 'pr';
        
        if (isIssue) {
          issueCount++;
        } else {
          prCount++;
        }

        console.log(`\n#${number} [${type.toUpperCase()}] [${state}]: ${title}`);

        // Check each field value
        for (const fieldValue of item.fieldValues.nodes) {
          if (!fieldValue.field || !fieldValue.name) continue;

          const fieldName = fieldValue.field.name;
          const fieldMapping = fieldMappings[fieldName];

          if (!fieldMapping) continue;

          const targetLabel = fieldMapping[fieldValue.name];
          if (!targetLabel) {
            console.log(`  ⚠️  Unknown ${fieldName} value: ${fieldValue.name}`);
            continue;
          }

          // Find all labels in this category
          const categoryLabels = Object.values(fieldMapping);

          // Remove other labels in this category
          for (const categoryLabel of categoryLabels) {
            if (categoryLabel !== targetLabel && currentLabels.includes(categoryLabel)) {
              labelsToRemove.add(categoryLabel);
              hasChanges = true;
            }
          }

          // Add the target label if not present
          if (!currentLabels.includes(targetLabel)) {
            labelsToAdd.add(targetLabel);
            hasChanges = true;
          }

          console.log(`  📍 ${fieldName}: ${fieldValue.name} → ${targetLabel}`);
        }

        // Apply changes
        if (hasChanges) {
          await updateLabels(
            type,
            number, 
            Array.from(labelsToAdd), 
            Array.from(labelsToRemove)
          );
          updatedItems++;
        } else {
          console.log('  ✓ Already in sync');
        }
      }
    }

    console.log('\n' + '═'.repeat(50));
    console.log(`✅ Bootstrap Complete!`);
    console.log(`   Total items processed: ${totalItems}`);
    console.log(`   - Issues: ${issueCount}`);
    console.log(`   - Pull Requests: ${prCount}`);
    console.log(`   Items updated: ${updatedItems}`);
    console.log(`   Already in sync: ${totalItems - updatedItems}`);
    
    if (updatedItems > 0) {
      console.log('\n💡 The scheduled workflow will maintain sync going forward.');
      console.log('   It runs every 5 minutes to catch any project changes.');
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);