#!/bin/bash

echo "🔍 Checking branch protection for main branch"
echo ""

# Check if protection exists
protection=$(gh api repos/ryanrozich/ag-grid-react-components/branches/main/protection 2>&1)

if [[ $protection == *"404"* ]]; then
  echo "❌ No branch protection enabled"
  echo ""
  echo "💡 To enable protection, run:"
  echo "   ./scripts/setup-branch-protection.sh"
else
  echo "✅ Branch protection is enabled"
  echo ""
  echo "Required status checks:"
  gh api repos/ryanrozich/ag-grid-react-components/branches/main/protection \
    --jq '.required_status_checks.checks[] | "   - " + .context' 2>/dev/null || echo "   None"

  echo ""
  echo "Settings:"
  gh api repos/ryanrozich/ag-grid-react-components/branches/main/protection --jq '
    "   - Enforce for admins: " + (.enforce_admins.enabled | tostring) + "\n" +
    "   - Require PR reviews: " + (if .required_pull_request_reviews then "Yes" else "No" end) + "\n" +
    "   - Allow force pushes: " + (.allow_force_pushes.enabled | tostring) + "\n" +
    "   - Require conversation resolution: " + (.required_conversation_resolution.enabled | tostring)
  ' 2>/dev/null || echo "   Unable to read settings"
fi

echo ""
echo "📝 To modify protection:"
echo "   - Add checks: Edit scripts/setup-branch-protection.sh"
echo "   - Disable: gh api repos/ryanrozich/ag-grid-react-components/branches/main/protection --method DELETE"