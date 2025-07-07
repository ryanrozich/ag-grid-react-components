#!/bin/bash

# Commit and push license changes to MADF

set -e

echo "📝 Committing MADF License Changes"
echo "=================================="

MADF_DIR="$HOME/code-repos/github/coalesce-labs/multi-agent-dev-framework"

if [ ! -d "$MADF_DIR" ]; then
    echo "❌ MADF directory not found at: $MADF_DIR"
    exit 1
fi

cd "$MADF_DIR"

# Check git status
echo "📊 Current git status:"
git status --short

# Add all license-related files
echo ""
echo "📦 Adding license files..."
git add LICENSE LICENSE-APACHE LICENSE-README.md NOTICE UPDATE-GITHUB-SETTINGS.md .license-header package.json

# Commit with detailed message
echo ""
echo "💾 Committing changes..."
git commit -m "chore: switch from MIT to dual license model

- Replace MIT with dual-license (Apache 2.0 + Commercial)
- Add Apache 2.0 license for open source components
- Create commercial license for advanced features
- Add NOTICE file for proper attribution
- Update package.json license references
- Add license documentation and guides

This change enables:
- Free use for up to 3 concurrent agents
- Commercial licensing for advanced features
- Clear separation between open and proprietary code
- Sustainable business model for long-term development"

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub..."
git push

echo ""
echo "✅ License changes pushed successfully!"
echo ""
echo "⚠️  IMPORTANT: GitHub still shows MIT because it's cached!"
echo ""
echo "To update GitHub's license detection:"
echo "1. Go to: https://github.com/coalesce-labs/multi-agent-dev-framework/settings"
echo "2. Scroll to 'Repository' section"
echo "3. Click 'Choose a license' dropdown"
echo "4. Select 'None' or 'Other'"
echo "5. Save changes"
echo ""
echo "GitHub will then read your custom LICENSE file."
echo ""
echo "Alternative: Create a .github/LICENSE file if the above doesn't work."