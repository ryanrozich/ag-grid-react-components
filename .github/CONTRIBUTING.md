# Contributing to AG Grid React Components

Welcome! This project embraces both human developers and AI coding assistants. We've designed our processes to work seamlessly with both.

## 🤖 For AI Agents (Claude Code, GitHub Copilot, etc.)

### Creating Issues (Not Fixes)

When you discover bugs or opportunities:

1. **USE THE TEMPLATES** - Always use our issue templates in `.github/ISSUE_TEMPLATE/`
2. **Document, Don't Fix** - Create detailed issues but don't implement fixes
3. **Include Context** - Always add:
   - Specific file paths and line numbers
   - Code snippets showing the problem
   - Your analysis of the root cause
   - Potential solutions (but don't implement them)

### Issue Creation Commands

```bash
# After discovering a bug
gh issue create --template 01-bug-report.yml

# For feature ideas
gh issue create --template 02-feature-request.yml

# For things needing investigation
gh issue create --template 03-discovery-task.yml
```

### Required Information for Issues

Always include:

- **File locations**: `src/components/DateFilter/index.tsx:245`
- **Related code**: Use code blocks with syntax highlighting
- **Impact analysis**: Who does this affect and how?
- **Complexity estimate**: Simple CSS fix vs architectural change

## 👩‍💻 For Human Developers

### Getting Started

```bash
# Clone and install
git clone https://github.com/ryanrozich/ag-grid-react-components.git
cd ag-grid-react-components
npm install

# Start development
npm run dev

# Run tests before committing
npm run test
npm run test:e2e
```

### Development Workflow

1. **Pick an Issue**

   - Check the [Project Board](<[https://github.com/ryanrozich/ag-grid-react-components/project](https://github.com/ryanrozich/ag-grid-react-components/project)s>)
   - Look for issues labeled `status: ready`
   - Comment on the issue to claim it

2. **Create a Branch**

   ```bash
   git checkout -b fix/issue-number-description
   # or
   git checkout -b feature/issue-number-description
   ```

3. **Make Changes**

   - Follow existing code style
   - Add tests for new functionality
   - Update documentation if needed

4. **Test Everything**

   ```bash
   npm run test          # Unit tests
   npm run test:e2e      # E2E tests
   npm run lint:fix      # Fix linting
   npm run typecheck     # TypeScript check
   ```

5. **Create PR**
   - Reference the issue: "Fixes #123"
   - Include screenshots for visual changes
   - Describe what you changed and why

## 📋 Issue Labeling System

### Area Labels (WHERE)

- `area: components` - The actual React components
- `area: demo` - The showcase/demo application
- `area: build` - Build tools, bundling, TypeScript
- `area: ci/cd` - GitHub Actions, deployment
- `area: testing` - Test infrastructure
- `area: docs` - Documentation

### Priority Labels (WHEN)

- `priority: critical` - Drop everything, fix now
- `priority: high` - Next sprint
- `priority: medium` - Normal queue
- `priority: low` - Someday/maybe

### Type Labels (WHAT)

- `bug` - Something broken
- `enhancement` - New feature
- `investigation` - Needs research
- `documentation` - Docs only

## 🎯 What Makes a Good Issue

### Great Bug Report Example

````markdown
**Area**: Components (DateFilter)
**File**: src/components/DateFilter/index.tsx:342

**Problem**: Filter doesn't update when props change

**Code**:

```typescript
// Current code at line 342
useEffect(() => {
  setFilterState(props.value);
}, []); // Missing props.value dependency
```

```text

**Fix**: Add props.value to dependency array
**Impact**: Medium - affects dynamic filters
**Complexity**: Simple - one line change
```
````

### Great Feature Request Example

```markdown
**Feature**: Add keyboard navigation to QuickFilterDropdown

**Why**: Accessibility - users can't navigate options without mouse

**Proposed API**: No API change needed, just behavior

**Implementation**:

1. Add keydown handler to dropdown
2. Track highlighted index in state
3. Enter/Space to select
4. Escape to close
5. Arrow keys to navigate

**Files to modify**:

- src/components/QuickFilterDropdown/index.tsx
- Add new hook: useKeyboardNavigation.ts

**Effort**: S (1-2 days)
**Breaking**: No
```

## 🔍 Code Review Guidelines

### For Reviewers

- Check that changes match the issue description
- Verify tests are included
- Ensure documentation is updated
- Look for performance implications
- Validate accessibility

### For Contributors

- Keep PRs focused - one issue per PR
- Respond to feedback quickly
- Update your PR rather than creating new ones
- Add reviewers familiar with the area

## 🚀 Release Process

We use semantic versioning and conventional commits:

- `fix:` → Patch release (1.0.0 → 1.0.1)
- `feat:` → Minor release (1.0.0 → 1.1.0)
- `BREAKING CHANGE:` → Major release (1.0.0 → 2.0.0)

## 💡 Working with AI Agents

### If You're an AI Agent

1. **Always use issue templates** - Don't freestyle issue creation
2. **Never auto-fix** - Create issues for humans to review first
3. **Include your analysis** - Share what you found and where
4. **Suggest priorities** - But humans make final decision
5. **One issue per problem** - Don't bundle multiple bugs

### If You're Working Alongside AI

1. **AI agents will create detailed issues** - Review and refine them
2. **Validate AI findings** - They might miss context
3. **Use AI for investigation** - Let them do the grunt work
4. **Human judgment for priorities** - AI suggestions are just that

## 📊 Project Board Workflow

Issues flow through these stages:

1. **📋 Backlog** - New issues land here
2. **🔍 Triage** - Being evaluated and labeled
3. **📅 Ready** - Prioritized, ready to work
4. **🚧 In Progress** - Someone's working on it
5. **👀 In Review** - PR is open
6. **✅ Done** - Merged and closed

## 🤝 Community

- **Discussions**: Use GitHub Discussions for questions
- **Discord**: Join our Discord for real-time chat
- **Issues**: For bugs and features only
- **PRs**: Include tests and follow the template

## ⚡ Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build library
npm run test            # Run tests
npm run test:e2e        # Run E2E tests

# Code Quality
npm run lint            # Check linting
npm run lint:fix        # Fix linting
npm run typecheck       # TypeScript check
npm run format          # Format code

# Before Committing
npm run pre-commit      # Run all checks

# Creating Issues (for AI agents)
gh issue create --template 01-bug-report.yml
gh issue create --template 02-feature-request.yml
gh issue create --template 03-discovery-task.yml
```

Remember: Whether you're human or AI, we're all here to make AG Grid filtering better for everyone! 🎉
