#!/usr/bin/env node

/**
 * Manual sync script to update project fields based on issue labels
 * This does what the GitHub Action will do once it's on main branch
 * 
 * Usage: GITHUB_TOKEN=ghp_xxx node scripts/sync-labels-to-project.js
 */

import { execSync } from 'child_process';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || execSync('gh auth token').toString().trim();
const OWNER = 'ryanrozich';
const REPO = 'ag-grid-react-components';

// Label to field mappings (reverse of what bootstrap does)
const labelMappings = {
  // Priority
  'priority: critical': { field: 'Priority', value: '🔴 Critical' },
  'priority: high': { field: 'Priority', value: '🟠 High' },
  'priority: medium': { field: 'Priority', value: '🟡 Medium' },
  'priority: low': { field: 'Priority', value: '🟢 Low' },
  
  // Area
  'area: components': { field: 'Area', value: '🧩 Components' },
  'area: demo': { field: 'Area', value: '🎨 Demo' },
  'area: build': { field: 'Area', value: '🔨 Build' },
  'area: ci/cd': { field: 'Area', value: '🤖 CI/CD' },
  'area: testing': { field: 'Area', value: '🧪 Testing' },
  'area: docs': { field: 'Area', value: '📚 Docs' },
  
  // Type
  'bug': { field: 'Type', value: '🐛 Bug' },
  'enhancement': { field: 'Type', value: '✨ Feature' },
  'documentation': { field: 'Type', value: '📚 Documentation' },
  
  // Status
  'status: needs-triage': { field: 'Status', value: '📥 Needs Triage' },
  'status: triaging': { field: 'Status', value: '🔍 Triaging' },
  'status: backlog': { field: 'Status', value: '📋 Backlog' },
  'status: in-progress': { field: 'Status', value: '🚧 In Progress' },
  'status: in-product-review': { field: 'Status', value: '👀 In Product Review' },
  'status: done': { field: 'Status', value: '✅ Done' },
  // PR statuses
  'status: pr-in-progress': { field: 'Status', value: '🔨 PR In Progress' },
  'status: in-code-review': { field: 'Status', value: '👨‍💻 In Code Review' },
  'status: code-review-complete': { field: 'Status', value: '🎉 Code Review Complete' },
  'status: merged': { field: 'Status', value: '🚀 Merged' },
  
  // Effort
  'effort: xs': { field: 'Effort', value: 'XS (< 1 hour)' },
  'effort: s': { field: 'Effort', value: 'S (1-4 hours)' },
  'effort: m': { field: 'Effort', value: 'M (1-2 days)' },
  'effort: l': { field: 'Effort', value: 'L (3-5 days)' },
  'effort: xl': { field: 'Effort', value: 'XL (1+ week)' },
  
  // Components
  'component: date-filter': { field: 'Component', value: 'DateFilter' },
  'component: quick-filter-dropdown': { field: 'Component', value: 'QuickFilterDropdown' },
  'component: active-filters': { field: 'Component', value: 'ActiveFilters' },
  'component: relative-date-filter': { field: 'Component', value: 'RelativeDateFilter' },
  'component: grid-state-utils': { field: 'Component', value: 'Grid State Utils' },
  'component: demo-app': { field: 'Component', value: 'Demo App' }
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

async function main() {
  console.log('🔄 Syncing Labels to Project Fields\n');
  
  // Get all issues with their labels
  const issuesQuery = `
    query($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        issues(first: 100, states: OPEN) {
          nodes {
            id
            number
            title
            labels(first: 100) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  `;
  
  const issuesData = await graphqlRequest(issuesQuery, { owner: OWNER, repo: REPO });
  const issues = issuesData.repository.issues.nodes;
  
  // Get project info
  const projectQuery = `
    query($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        projectsV2(first: 10) {
          nodes {
            id
            title
            field(name: "Status") {
              ... on ProjectV2SingleSelectField {
                id
                options {
                  id
                  name
                }
              }
            }
            items(first: 100) {
              nodes {
                id
                content {
                  ... on Issue {
                    number
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  
  const projectData = await graphqlRequest(projectQuery, { owner: OWNER, repo: REPO });
  const project = projectData.repository.projectsV2.nodes[0];
  
  if (!project) {
    console.error('No project found!');
    return;
  }
  
  console.log(`Found project: ${project.title}\n`);
  
  // Create a map of issue number to project item ID
  const issueToItemMap = {};
  project.items.nodes.forEach(item => {
    if (item.content && item.content.number) {
      issueToItemMap[item.content.number] = item.id;
    }
  });
  
  // Get all field IDs
  const fieldsQuery = `
    query($projectId: ID!) {
      node(id: $projectId) {
        ... on ProjectV2 {
          fields(first: 20) {
            nodes {
              ... on ProjectV2Field {
                id
                name
              }
              ... on ProjectV2SingleSelectField {
                id
                name
                options {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  `;
  
  const fieldsData = await graphqlRequest(fieldsQuery, { projectId: project.id });
  const fields = fieldsData.node.fields.nodes;
  
  // Create field maps
  const fieldMap = {};
  const optionMap = {};
  
  fields.forEach(field => {
    fieldMap[field.name] = field.id;
    if (field.options) {
      optionMap[field.name] = {};
      field.options.forEach(option => {
        optionMap[field.name][option.name] = option.id;
      });
    }
  });
  
  // Process each issue
  let updatedCount = 0;
  
  for (const issue of issues) {
    const itemId = issueToItemMap[issue.number];
    if (!itemId) continue;
    
    console.log(`\n#${issue.number}: ${issue.title}`);
    
    const labels = issue.labels.nodes.map(l => l.name);
    
    // Check each label
    for (const label of labels) {
      const mapping = labelMappings[label];
      if (!mapping) continue;
      
      const fieldId = fieldMap[mapping.field];
      const optionId = optionMap[mapping.field]?.[mapping.value];
      
      if (!fieldId || !optionId) {
        console.log(`  ⚠️  Cannot map ${label} - field or option not found`);
        continue;
      }
      
      // Update the field
      const updateMutation = `
        mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) {
          updateProjectV2ItemFieldValue(input: {
            projectId: $projectId
            itemId: $itemId
            fieldId: $fieldId
            value: {
              singleSelectOptionId: $optionId
            }
          }) {
            projectV2Item {
              id
            }
          }
        }
      `;
      
      try {
        await graphqlRequest(updateMutation, {
          projectId: project.id,
          itemId: itemId,
          fieldId: fieldId,
          optionId: optionId
        });
        console.log(`  ✓ Updated ${mapping.field} → ${mapping.value}`);
        updatedCount++;
      } catch (error) {
        console.error(`  ✗ Failed to update ${mapping.field}: ${error.message}`);
      }
    }
  }
  
  console.log('\n' + '═'.repeat(50));
  console.log(`✅ Sync Complete! Updated ${updatedCount} field values.`);
}

main().catch(console.error);