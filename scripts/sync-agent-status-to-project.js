#!/usr/bin/env node

/**
 * Syncs agent status labels to GitHub Project fields
 * This script maps agent:* labels to a custom "Agent Status" field in the project
 */

import { execSync } from 'child_process';

// Configuration
const PROJECT_NUMBER = 1; // Your project number
const FIELD_NAME = 'Agent Status';

// Agent status mapping
const AGENT_STATUS_MAP = {
  'agent:todo': 'Todo',
  'agent:wip': 'In Progress',
  'agent:needs-review': 'Needs Review',
  'agent:done': 'Done',
  'agent:error': 'Error'
};

async function syncAgentStatus() {
  try {
    console.log('🔄 Syncing agent status to GitHub Project...\n');

    // Get project ID
    const projectData = JSON.parse(
      execSync(`gh api graphql -f query='
        query {
          viewer {
            projectV2(number: ${PROJECT_NUMBER}) {
              id
              fields(first: 20) {
                nodes {
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
      '`, { encoding: 'utf8' })
    );

    const project = projectData.data.viewer.projectV2;
    if (!project) {
      throw new Error(`Project #${PROJECT_NUMBER} not found`);
    }

    // Find the Agent Status field
    let agentStatusField = project.fields.nodes.find(field => field.name === FIELD_NAME);
    
    if (!agentStatusField) {
      console.log(`📝 Creating "${FIELD_NAME}" field...`);
      
      // Create the field with options
      const createFieldResult = JSON.parse(
        execSync(`gh api graphql -f query='
          mutation {
            createProjectV2Field(input: {
              projectId: "${project.id}"
              dataType: SINGLE_SELECT
              name: "${FIELD_NAME}"
              singleSelectOptions: [
                { name: "Todo", color: GRAY, description: "Ready for bot work" }
                { name: "In Progress", color: YELLOW, description: "Bot actively working" }
                { name: "Needs Review", color: BLUE, description: "PR ready for review" }
                { name: "Done", color: GREEN, description: "Work completed" }
                { name: "Error", color: RED, description: "Bot encountered issues" }
              ]
            }) {
              projectV2Field {
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
        '`, { encoding: 'utf8' })
      );
      
      agentStatusField = createFieldResult.data.createProjectV2Field.projectV2Field;
      console.log(`✅ Created "${FIELD_NAME}" field\n`);
    }

    // Get all open issues with agent labels
    const issues = JSON.parse(
      execSync(`gh issue list --json number,labels,projectItems --limit 100`, { encoding: 'utf8' })
    );

    let updatedCount = 0;
    let skippedCount = 0;

    for (const issue of issues) {
      // Find agent label
      const agentLabel = issue.labels.find(label => label.name.startsWith('agent:'));
      
      if (!agentLabel) {
        continue; // No agent label, skip
      }

      const statusValue = AGENT_STATUS_MAP[agentLabel.name];
      if (!statusValue) {
        console.warn(`⚠️  Unknown agent label: ${agentLabel.name}`);
        continue;
      }

      // Find the option ID for this status
      const option = agentStatusField.options.find(opt => opt.name === statusValue);
      if (!option) {
        console.error(`❌ Option "${statusValue}" not found in field`);
        continue;
      }

      // Check if issue is in the project
      const projectItem = issue.projectItems?.find(item => item.project.number === PROJECT_NUMBER);
      
      if (!projectItem) {
        console.log(`➕ Adding issue #${issue.number} to project...`);
        
        // Add to project first
        const addResult = JSON.parse(
          execSync(`gh api graphql -f query='
            mutation {
              addProjectV2ItemById(input: {
                projectId: "${project.id}"
                contentId: "${issue.id}"
              }) {
                item {
                  id
                }
              }
            }
          '`, { encoding: 'utf8' })
        );
        
        const itemId = addResult.data.addProjectV2ItemById.item.id;
        
        // Update the field
        execSync(`gh api graphql -f query='
          mutation {
            updateProjectV2ItemFieldValue(input: {
              projectId: "${project.id}"
              itemId: "${itemId}"
              fieldId: "${agentStatusField.id}"
              value: { singleSelectOptionId: "${option.id}" }
            }) {
              projectV2Item {
                id
              }
            }
          }
        '`);
        
        console.log(`✅ Issue #${issue.number}: Added to project with status "${statusValue}"`);
        updatedCount++;
      } else {
        // Update existing item
        execSync(`gh api graphql -f query='
          mutation {
            updateProjectV2ItemFieldValue(input: {
              projectId: "${project.id}"
              itemId: "${projectItem.id}"
              fieldId: "${agentStatusField.id}"
              value: { singleSelectOptionId: "${option.id}" }
            }) {
              projectV2Item {
                id
              }
            }
          }
        '`);
        
        console.log(`✅ Issue #${issue.number}: Updated agent status to "${statusValue}"`);
        updatedCount++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Updated: ${updatedCount} issues`);
    console.log(`   Skipped: ${skippedCount} issues`);
    console.log(`\n✅ Agent status sync complete!`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('GraphQL')) {
      console.error('\nMake sure you have the required permissions to manage projects.');
    }
    process.exit(1);
  }
}

// Run the sync
syncAgentStatus();