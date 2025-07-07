#!/bin/bash

# Interactive Setup Script for MADF Examples
# 
# This script provides an interactive way to set up MADF configurations
# with customization for your specific project.

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
NC='\033[0m'

# Script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
TARGET_DIR="$(dirname "$SCRIPT_DIR")"

# Print functions
print_header() {
    echo -e "\n${BOLD}${BLUE}$1${NC}\n"
}

print_info() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Welcome message
clear
print_header "🚀 MADF Example Configuration Setup"
echo "This wizard will help you set up MADF configurations for your project."
echo "We'll ask a few questions to customize the setup for your needs."
echo

# Get project information
print_header "Project Information"

read -p "Project name: " PROJECT_NAME
read -p "Project type (library/application/service) [library]: " PROJECT_TYPE
PROJECT_TYPE=${PROJECT_TYPE:-library}

read -p "GitHub owner/organization: " GITHUB_OWNER
read -p "GitHub repository name: " GITHUB_REPO

read -p "Primary language (typescript/javascript) [typescript]: " LANGUAGE
LANGUAGE=${LANGUAGE:-typescript}

if [[ "$LANGUAGE" == "typescript" ]]; then
    read -p "Use React? (y/n) [y]: " USE_REACT
    USE_REACT=${USE_REACT:-y}
else
    USE_REACT="n"
fi

# Testing preferences
print_header "Testing Configuration"

read -p "Test framework (vitest/jest) [vitest]: " TEST_FRAMEWORK
TEST_FRAMEWORK=${TEST_FRAMEWORK:-vitest}

read -p "E2E framework (playwright/cypress/none) [playwright]: " E2E_FRAMEWORK
E2E_FRAMEWORK=${E2E_FRAMEWORK:-playwright}

read -p "Coverage threshold (%) [80]: " COVERAGE_THRESHOLD
COVERAGE_THRESHOLD=${COVERAGE_THRESHOLD:-80}

# Linting preferences
print_header "Code Quality Configuration"

read -p "Use Trunk for linting? (y/n) [y]: " USE_TRUNK
USE_TRUNK=${USE_TRUNK:-y}

read -p "ESLint strictness (strict/recommended/minimal) [strict]: " ESLINT_LEVEL
ESLINT_LEVEL=${ESLINT_LEVEL:-strict}

# Component structure (for libraries)
if [[ "$PROJECT_TYPE" == "library" ]]; then
    print_header "Component Structure"
    
    read -p "Component pattern (headless/styled/hybrid) [headless]: " COMPONENT_PATTERN
    COMPONENT_PATTERN=${COMPONENT_PATTERN:-headless}
    
    read -p "Allow external dependencies? (y/n) [n]: " ALLOW_DEPS
    ALLOW_DEPS=${ALLOW_DEPS:-n}
fi

# Summary
print_header "Configuration Summary"
echo "Project: $PROJECT_NAME ($PROJECT_TYPE)"
echo "GitHub: $GITHUB_OWNER/$GITHUB_REPO"
echo "Language: $LANGUAGE"
[[ "$USE_REACT" == "y" ]] && echo "Framework: React"
echo "Testing: $TEST_FRAMEWORK (Coverage: $COVERAGE_THRESHOLD%)"
[[ "$E2E_FRAMEWORK" != "none" ]] && echo "E2E: $E2E_FRAMEWORK"
echo "Linting: $([[ "$USE_TRUNK" == "y" ]] && echo "Trunk with" || echo "") ESLint ($ESLINT_LEVEL)"
[[ "$PROJECT_TYPE" == "library" ]] && echo "Components: $COMPONENT_PATTERN pattern"
echo

read -p "Proceed with setup? (y/n) [y]: " PROCEED
PROCEED=${PROCEED:-y}

if [[ "$PROCEED" != "y" ]]; then
    print_warn "Setup cancelled"
    exit 0
fi

# Create customized configurations
print_header "Creating Configurations"

# Create madf.config.ts
print_info "Creating madf.config.ts..."
cat > "$TARGET_DIR/madf.config.ts" << EOF
import { defineConfig } from '@coalesce-labs/madf';

export default defineConfig({
  project: {
    name: '$PROJECT_NAME',
    type: '$PROJECT_TYPE',
    language: ['$LANGUAGE'$([[ "$USE_REACT" == "y" ]] && echo ", 'react'" || echo "")],
  },

  github: {
    owner: '$GITHUB_OWNER',
    repo: '$GITHUB_REPO',
  },

  stages: {
    test: {
      unit: {
        command: 'npm run test:unit',
        coverage: $COVERAGE_THRESHOLD,
        framework: '$TEST_FRAMEWORK',
        required: true,
      },
EOF

if [[ "$E2E_FRAMEWORK" != "none" ]]; then
    cat >> "$TARGET_DIR/madf.config.ts" << EOF
      e2e: {
        command: 'npm run test:e2e',
        framework: '$E2E_FRAMEWORK',
        required: false,
      },
EOF
fi

cat >> "$TARGET_DIR/madf.config.ts" << EOF
    },
    
    lint: {
      tool: '$([[ "$USE_TRUNK" == "y" ]] && echo "trunk" || echo "eslint")',
      command: '$([[ "$USE_TRUNK" == "y" ]] && echo "trunk check" || echo "npm run lint")',
      autoFix: '$([[ "$USE_TRUNK" == "y" ]] && echo "trunk fmt" || echo "npm run lint:fix")',
    },
    
    build: {
      command: 'npm run build',
      outputs: ['dist/', 'types/'],
    },
  },

  agents: {
    validations: {
EOF

if [[ "$PROJECT_TYPE" == "library" ]]; then
    cat >> "$TARGET_DIR/madf.config.ts" << EOF
      noExternalDependencies: $([[ "$ALLOW_DEPS" == "n" ]] && echo "true" || echo "false"),
      headlessComponents: $([[ "$COMPONENT_PATTERN" == "headless" ]] && echo "true" || echo "false"),
EOF
fi

cat >> "$TARGET_DIR/madf.config.ts" << EOF
      strictTypeScript: true,
      testFirst: true,
    },
  },
});
EOF

print_info "Created madf.config.ts"

# Copy appropriate test configuration
if [[ "$TEST_FRAMEWORK" == "vitest" ]]; then
    cp "$SCRIPT_DIR/testing/vitest.config.ts" "$TARGET_DIR/vitest.config.ts"
    print_info "Copied vitest configuration"
fi

if [[ "$E2E_FRAMEWORK" == "playwright" ]]; then
    cp "$SCRIPT_DIR/testing/playwright.config.ts" "$TARGET_DIR/playwright.config.ts"
    print_info "Copied playwright configuration"
fi

# Copy linting configuration
if [[ "$USE_TRUNK" == "y" ]]; then
    mkdir -p "$TARGET_DIR/.trunk"
    cp "$SCRIPT_DIR/linting/trunk.yaml" "$TARGET_DIR/.trunk/trunk.yaml"
    print_info "Copied trunk configuration"
fi

cp "$SCRIPT_DIR/linting/.eslintrc.js" "$TARGET_DIR/.eslintrc.js"
cp "$SCRIPT_DIR/linting/.prettierrc" "$TARGET_DIR/.prettierrc"
print_info "Copied ESLint and Prettier configurations"

# Copy GitHub templates
mkdir -p "$TARGET_DIR/.github/ISSUE_TEMPLATE"
cp -r "$SCRIPT_DIR/github/issue-templates/"* "$TARGET_DIR/.github/ISSUE_TEMPLATE/"
cp "$SCRIPT_DIR/github/pull_request_template.md" "$TARGET_DIR/.github/"
print_info "Copied GitHub templates"

# Create customized CLAUDE.md
print_info "Creating CLAUDE.md..."
cat > "$TARGET_DIR/CLAUDE.md" << EOF
# AI Agent Instructions for $PROJECT_NAME

## Core Architecture Principles

1. **Type**: $PROJECT_TYPE
2. **Language**: $LANGUAGE$([[ "$USE_REACT" == "y" ]] && echo " with React" || echo "")
3. **Dependencies**: $([[ "$ALLOW_DEPS" == "n" ]] && echo "Zero external dependencies" || echo "Minimal external dependencies")
4. **Testing**: $TEST_FRAMEWORK with $COVERAGE_THRESHOLD% coverage requirement
5. **Code Quality**: $([[ "$USE_TRUNK" == "y" ]] && echo "Trunk with " || echo "")ESLint ($ESLINT_LEVEL level)

## Development Workflow

### Before Starting
\`\`\`bash
npm run lint
npm run test:unit
\`\`\`

### During Development
- Keep tests running: \`npm run test:watch\`
- Format code: \`$([[ "$USE_TRUNK" == "y" ]] && echo "trunk fmt" || echo "npm run format")\`
- Check types: \`npm run typecheck\`

### Before Committing
\`\`\`bash
npm run pre-commit
\`\`\`

## Project-Specific Requirements

EOF

if [[ "$PROJECT_TYPE" == "library" && "$COMPONENT_PATTERN" == "headless" ]]; then
    cat >> "$TARGET_DIR/CLAUDE.md" << EOF
### Headless Components
- Components must have NO built-in styles
- Provide className and style props
- Use render props pattern for flexibility
- Export all necessary types

EOF
fi

cat >> "$TARGET_DIR/CLAUDE.md" << EOF
### Testing Requirements
- Write tests FIRST (TDD)
- Minimum $COVERAGE_THRESHOLD% coverage
- Test all edge cases
- Include accessibility tests

## Important Notes
- Follow existing patterns in the codebase
- Update documentation for all changes
- Use conventional commits
- No \`any\` types in TypeScript
EOF

print_info "Created CLAUDE.md"

# Create package.json scripts if they don't exist
if [[ -f "$TARGET_DIR/package.json" ]]; then
    print_header "Updating package.json scripts"
    
    # This is simplified - in a real script you'd use jq or similar
    print_warn "Please add these scripts to your package.json:"
    echo
    echo '  "scripts": {'
    echo '    "test": "vitest",
        "test:unit": "vitest run",
        "test:watch": "vitest watch",
        "test:coverage": "vitest run --coverage",
        "test:e2e": "playwright test",
        "lint": "'$([[ "$USE_TRUNK" == "y" ]] && echo "trunk check" || echo "eslint ."))'",
        "lint:fix": "'$([[ "$USE_TRUNK" == "y" ]] && echo "trunk fmt" || echo "eslint . --fix"))'",
        "typecheck": "tsc --noEmit",
        "build": "vite build",
        "pre-commit": "npm run lint && npm run typecheck && npm run test:unit"
    }'
    echo
fi

# Final instructions
print_header "✨ Setup Complete!"
echo
echo "Next steps:"
echo "1. Review and customize the generated configurations"
echo "2. Install dependencies:"
echo "   npm install --save-dev vitest @testing-library/react @testing-library/user-event"
[[ "$E2E_FRAMEWORK" == "playwright" ]] && echo "   npm install --save-dev @playwright/test"
[[ "$USE_TRUNK" == "y" ]] && echo "3. Initialize Trunk: trunk init"
echo "4. Run tests: npm test"
echo "5. Start developing with MADF!"
echo
print_info "Happy coding! 🎉"