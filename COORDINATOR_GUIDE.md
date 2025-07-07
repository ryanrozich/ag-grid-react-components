# Coordinator Agent Guide

## Starting a New Feature with the Framework

### Quick Start

1. **Describe Your Feature**

   ```bash
   # Option A: Interactive mode (recommended)
   # Just tell Claude Code what you want to build

   # Option B: Use coordinator script
   node scripts/bot-workflow/coordinator/plan-feature.js
   ```

2. **Coordinator Will:**

   - Ask clarifying questions
   - Break down into parallel tasks
   - Create GitHub issues with proper labels
   - Provide bot commands

3. **Execute the Plan**
   ```bash
   # Coordinator provides these commands:
   node scripts/bot-workflow/bot-claim-issue.js 42
   node scripts/bot-workflow/bot-claim-issue.js 43
   # ... etc
   ```

### Example Conversation Flow

**Human**: "I want to add a feature where users can save their filter configurations and reload them later"

**Coordinator**: "Great idea! Let me understand the requirements better:

1. Should presets be stored locally or in a database?
2. Do you want sharing capabilities (via URL)?
3. Should users be able to import/export presets?
4. Any UI preferences for the preset selector?"

**Human**: "Local storage is fine, yes to URL sharing, yes to import/export, keep it minimal like our other components"

**Coordinator**: "Perfect! I'll break this into 5 parallel tasks:

- Task 1: Core storage layer
- Task 2: UI components
- Task 3: URL sharing
- Task 4: Import/Export
- Task 5: Demo & docs

Creating issues now... Done! Here are your commands:

````bash
# Open 5 Claude Code instances and run one in each:
node scripts/bot-workflow/bot-claim-issue.js 42  # Storage
node scripts/bot-workflow/bot-claim-issue.js 43  # UI
node scripts/bot-workflow/bot-claim-issue.js 44  # URLs
node scripts/bot-workflow/bot-claim-issue.js 45  # Import/Export
node scripts/bot-workflow/bot-claim-issue.js 46  # Docs
```"

### Best Practices

1. **Start with the Problem**: Don't worry about implementation details
2. **Let Coordinator Plan**: It knows how to break things down for parallel work
3. **Review the Issues**: Make sure they capture your vision
4. **Adjust if Needed**: You can always edit issues before bots start

### Common Patterns

#### Feature Development
"I want to add [feature description]"
→ Coordinator creates 3-7 parallel tasks

#### Bug Fixes
"Users reported [bug description]"
→ Coordinator creates investigation + fix tasks

#### Refactoring
"We need to improve [area]"
→ Coordinator creates incremental refactoring tasks

#### Documentation
"We need docs for [topic]"
→ Coordinator creates guide + example tasks

### Pro Tips

1. **Be Specific About Requirements**
   - Bad: "Add search functionality"
   - Good: "Add fuzzy search for filter names with keyboard shortcuts"

2. **Mention Constraints**
   - "Must work with AG Grid v33+"
   - "Should follow our headless component pattern"
   - "Needs to be tree-shakeable"

3. **Think in Parallel**
   - UI can be built while backend is developed
   - Tests can be written alongside implementation
   - Docs can be created in parallel

4. **Use the Framework's Strengths**
   - Each bot gets its own worktree (no conflicts)
   - CI runs on each PR (catch issues early)
   - Preview deployments for UI changes
````
