#!/bin/bash

echo "🔒 Setting up branch protection for main branch"

# Set up branch protection with minimal required checks
gh api repos/ryanrozich/ag-grid-react-components/branches/main/protection \
  --method PUT \
  --field required_status_checks[strict]=false \
  --field required_status_checks[checks][][context]="Tests" \
  --field required_status_checks[checks][][context]="Build" \
  --field required_status_checks[checks][][context]="Code Quality" \
  --field enforce_admins=false \
  --field required_pull_request_reviews=null \
  --field restrictions=null \
  --field allow_force_pushes=false \
  --field allow_deletions=false \
  --field required_conversation_resolution=true \
  --field lock_branch=false \
  --field allow_fork_syncing=true

echo "✅ Branch protection enabled with:"
echo "   - Required: Tests, Build, Code Quality"
echo "   - Enforce for admins: No (you can override if needed)"
echo "   - Require conversation resolution: Yes"
echo "   - Allow force pushes: No"

echo ""
echo "💡 Optional checks that won't block:"
echo "   - E2E Tests"
echo "   - CodeQL"
echo "   - Deploy Preview"
echo "   - Publish Preview"