#!/bin/bash

# Pre-push script to run essential tests before pushing to GitHub
# This ensures code quality without slowing down CI

set -e

echo "🚀 Running pre-push checks..."
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to handle errors
handle_error() {
    echo -e "${RED}❌ Pre-push checks failed!${NC}"
    echo -e "${YELLOW}Fix the issues above before pushing.${NC}"
    exit 1
}

# Trap errors
trap handle_error ERR

# 1. Run format and lint checks
echo -e "${BLUE}📝 Running format and lint checks...${NC}"
npm run lint:fix
npm run check:whitespace

# 2. Run TypeScript checks
echo -e "${BLUE}🔍 Running TypeScript checks...${NC}"
npm run typecheck

# 3. Run unit tests
echo -e "${BLUE}🧪 Running unit tests...${NC}"
npm run test:unit

# 4. Run E2E tests
echo -e "${BLUE}🎭 Running E2E tests (locally)...${NC}"
echo -e "${YELLOW}This may take a few minutes...${NC}"
npm run test:e2e

# 5. Build check
echo -e "${BLUE}📦 Running build check...${NC}"
npm run build

echo ""
echo -e "${GREEN}✅ All pre-push checks passed!${NC}"
echo -e "${GREEN}You're ready to push to GitHub.${NC}"
echo ""
echo -e "${YELLOW}Note: E2E tests are disabled in CI for performance.${NC}"
echo -e "${YELLOW}Always run 'npm run pre-push' before pushing important changes.${NC}"