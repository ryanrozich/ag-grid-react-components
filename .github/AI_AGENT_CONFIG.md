# AI Agent Configuration

This file provides specific instructions for AI coding assistants working with this repository.

## Core Rules

1. **CREATE ISSUES, DON'T FIX** - When you find bugs or improvements, create detailed issues using our templates
2. **USE TEMPLATES** - Always use issue templates in `.github/ISSUE_TEMPLATE/`
3. **PROVIDE CONTEXT** - Include file paths, line numbers, and code snippets
4. **SUGGEST PRIORITIES** - But mark them as suggestions
5. **ONE ISSUE PER PROBLEM** - Don't bundle multiple issues together

## Issue Creation Workflow

```bash
# Step 1: Analyze the problem
# Step 2: Choose the right template
# Step 3: Fill out ALL fields in the template
# Step 4: Create the issue

# For bugs
gh issue create --template 01-bug-report.yml \
  --title "[BUG] Grand total row overlaps with filter dropdown" \
  --label "area: demo,priority: medium"

# For features
gh issue create --template 02-feature-request.yml \
  --title "[FEATURE] Add keyboard navigation to QuickFilterDropdown" \
  --label "area: components,priority: high"

# For investigations
gh issue create --template 03-discovery-task.yml \
  --title "[DISCOVERY] Portal rendering performance impact" \
  --label "area: components,investigation"
```

## Required Issue Fields

### For Bugs

- **Area**: Component name or "Demo"
- **File Location**: `src/components/DateFilter/index.tsx:342`
- **Steps to Reproduce**: Exact steps
- **Technical Context**: Your analysis
- **Proposed Solutions**: At least 2 options
- **Complexity**: Simple/Medium/Complex

### For Features

- **Problem Statement**: Why this is needed
- **API Design**: TypeScript interfaces
- **Implementation Notes**: Files to modify
- **Breaking Change**: Yes/No/Minor
- **Success Criteria**: Checklist format

### For Discoveries

- **What Was Found**: Specific concern
- **Current State**: Code snippets
- **Questions**: What needs research
- **Investigation Plan**: Steps to validate

## Code Analysis Guidelines

When analyzing code, always check:

1. **Component Boundaries**

   - Is this a component issue or demo issue?
   - Which specific component is affected?

2. **Dependencies**

   - What AG Grid version is required?
   - Are there peer dependency conflicts?

3. **Performance**

   - Bundle size impact
   - Runtime performance
   - Memory leaks

4. **Patterns**
   - Does it follow existing patterns?
   - Is there similar code elsewhere?

## Priority Assessment Matrix

```
CRITICAL (🔴):
- Breaks core functionality
- Security vulnerability
- Causes data loss

HIGH (🟠):
- Major UX issue
- Blocks common use cases
- Performance degradation >50%

MEDIUM (🟡):
- Visible bugs with workarounds
- Missing important features
- Performance degradation <50%

LOW (🟢):
- Cosmetic issues
- Nice-to-have features
- Minor optimizations
```

## File-Specific Instructions

### When analyzing `/src/components/*`

- These are the PUBLIC APIs users depend on
- Breaking changes are SERIOUS
- Always suggest backward-compatible solutions
- Check for existing tests

### When analyzing `/src/demo/*`

- This is for demonstration only
- Can be more experimental
- Focus on user education
- Showcase best practices

### When analyzing build/config files

- Check for security vulnerabilities
- Verify peer dependency compatibility
- Consider bundle size impact
- Test in multiple environments

## Finding Work

To find the next priority tasks, run:

```bash
bash .github/scripts/get-next-tasks.sh
```

Or query directly:

```bash
# High priority, ready to work
gh issue list --label "priority: high" --label "status: ready" --state open

# All ready tasks by priority
gh issue list --label "status: ready" --state open --sort "label:priority"
```

## Status Labels (IMPORTANT)

Always check and update status labels:

- `status: backlog` - New, not evaluated
- `status: triage` - Being evaluated
- `status: ready` - Ready to implement
- `status: in-progress` - Being worked on
- `status: in-review` - PR open
- `status: done` - Completed

## DO NOT

1. **Don't fix without creating an issue first**
2. **Don't modify `.github/` files**
3. **Don't change version numbers**
4. **Don't update dependencies without analysis**
5. **Don't remove features without deprecation**
6. **Don't move issues between statuses** - Let humans manage workflow

## Templates Quick Reference

```yaml
# Bug Report must include:
area: [Components|Demo|Build|Docs|Tests]
component: [DateFilter|QuickFilterDropdown|ActiveFilters|etc]
description: Clear problem statement
reproduction: Step-by-step
technical-context: File:line analysis
priority-suggestion: [Critical|High|Medium|Low]
complexity: [Simple|Medium|Complex]

# Feature Request must include:
feature-type: [New Component|Enhancement|DX|Performance|etc]
problem-statement: Why needed
proposed-solution: How to implement
api-design: TypeScript interfaces
breaking-change: [No|Minor|Major]
effort-estimate: [XS|S|M|L|XL]

# Discovery must include:
discovery-type: [Performance|Code Smell|Security|etc]
what-found: Specific issue
current-state: Code + analysis
questions: What to research
investigation-plan: Steps to validate
```

## Example: Good Issue Creation by AI

```markdown
Title: [BUG] QuickFilterDropdown portal recreates on every render

Area: Components
Component: QuickFilterDropdown
Description: The portal is recreated on every render when usePortal="always", potentially causing performance issues

Technical Context:

- File: src/components/QuickFilterDropdown/index.tsx:337-426
- The portal creation happens inside the render without memoization
- No dependency tracking for portal creation
- Could cause issues with 10+ dropdowns on page

Proposed Solutions:

1. Memoize portal creation with useMemo
2. Use a single portal container for all dropdowns
3. Only create portal on mount, update content on render

Priority: Medium (performance impact unclear without profiling)
Complexity: Medium (requires refactoring render logic)
```

Remember: You're a detective documenting crimes, not a vigilante fixing them!
