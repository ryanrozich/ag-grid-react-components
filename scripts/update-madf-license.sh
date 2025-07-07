#!/bin/bash

# Script to update MADF license
# Run this in the MADF repository

set -e

echo "🔐 Updating MADF License"
echo "========================"

MADF_DIR="$HOME/code-repos/github/coalesce-labs/multi-agent-dev-framework"

if [ ! -d "$MADF_DIR" ]; then
    echo "❌ MADF directory not found at: $MADF_DIR"
    exit 1
fi

cd "$MADF_DIR"

# Step 1: Remove MIT license
echo "📄 Removing MIT license..."
rm -f LICENSE

# Step 2: Create custom license
echo "📝 Creating custom license..."
cat > LICENSE << 'EOF'
Coalesce Labs Multi-Agent Development Framework (MADF) License

Copyright (c) 2024 Coalesce Labs. All rights reserved.

This software and associated documentation files (the "Software") are the 
proprietary property of Coalesce Labs.

DUAL LICENSING:

1. OPEN SOURCE LICENSE (Community Edition)
   
   The core components of MADF marked as "open source" in their respective
   package.json files are licensed under the Apache License 2.0.
   You may obtain a copy of the License at:
   http://www.apache.org/licenses/LICENSE-2.0

2. COMMERCIAL LICENSE (Pro/Enterprise Edition)
   
   All other components, including but not limited to:
   - Advanced orchestration features
   - Cloud integration modules
   - Enterprise plugins
   - Analytics and monitoring
   
   Are licensed under the Coalesce Labs Commercial License.
   
   To obtain a commercial license, please contact:
   licensing@coalesce-labs.com

RESTRICTIONS:

Without a commercial license, you may NOT:
- Use MADF for commercial purposes with more than 3 concurrent agents
- Remove or modify license validation code
- Redistribute modified versions claiming them as MADF
- Use MADF Cloud or Enterprise features

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

For questions about licensing, contact: legal@coalesce-labs.com
EOF

# Step 3: Create Apache 2.0 license for open source components
echo "📝 Creating Apache license for open components..."
cat > LICENSE-APACHE << 'EOF'
                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

Copyright 2024 Coalesce Labs

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
EOF

# Step 4: Update package.json files
echo "📦 Updating package.json licenses..."

# Root package.json
sed -i '' 's/"license": "MIT"/"license": "SEE LICENSE IN LICENSE"/' package.json

# Create license notice file
cat > NOTICE << 'EOF'
Coalesce Labs Multi-Agent Development Framework (MADF)
Copyright 2024 Coalesce Labs

This product includes software developed at Coalesce Labs.

Portions of this software are licensed under the Apache License 2.0.
See LICENSE-APACHE for details.

Commercial features require a separate license.
Contact licensing@coalesce-labs.com for more information.
EOF

# Step 5: Create README for licensing
cat > LICENSE-README.md << 'EOF'
# MADF Licensing

MADF uses a dual-licensing model:

## 🆓 Open Source (Apache 2.0)

The following components are open source:
- Core agent orchestration
- Basic GitHub integration  
- CLI tool (community features)
- Standard plugins

You can use these freely under Apache 2.0 license.

## 💼 Commercial License

A commercial license is required for:
- More than 3 concurrent agents
- Cloud orchestration features
- Enterprise plugins
- Priority support
- Advanced analytics
- On-premise deployment

## 📊 License Comparison

| Feature | Open Source | Pro | Enterprise |
|---------|------------|-----|------------|
| Concurrent Agents | 3 | 10 | Unlimited |
| GitHub Integration | ✅ | ✅ | ✅ |
| Cloud Orchestration | ❌ | ✅ | ✅ |
| Analytics Dashboard | ❌ | ✅ | ✅ |
| Custom Plugins | ✅ | ✅ | ✅ |
| Support | Community | Priority | Dedicated |
| Price | Free | $49/mo | Custom |

## 🔐 License Enforcement

The software includes license validation that:
- Checks agent concurrency limits
- Validates commercial features
- Reports usage analytics (commercial only)

## 📧 Contact

- Sales: sales@coalesce-labs.com
- Licensing: licensing@coalesce-labs.com
- Support: support@coalesce-labs.com
EOF

# Step 6: Add license headers to source files
echo "📝 Creating license header template..."
cat > .license-header << 'EOF'
/**
 * Copyright (c) 2024 Coalesce Labs. All rights reserved.
 * Licensed under the Coalesce Labs License.
 * See LICENSE file in the project root for license information.
 */
EOF

# Step 7: Update GitHub repository settings reminder
echo "⚠️  Creating GitHub settings reminder..."
cat > UPDATE-GITHUB-SETTINGS.md << 'EOF'
# Update GitHub Repository Settings

After pushing these license changes, update the GitHub repository:

1. Go to: https://github.com/coalesce-labs/multi-agent-dev-framework/settings

2. Update repository license:
   - Click "Add license" 
   - Select "None" or "Other"
   - Reference the custom LICENSE file

3. Update repository description:
   - Add: "Dual-licensed: Apache 2.0 for core, commercial for advanced features"

4. Add topics:
   - dual-license
   - commercial
   - enterprise
   - ai-orchestration

5. Update README badges:
   - Remove MIT badge
   - Add custom license badge
EOF

echo ""
echo "✅ License update complete!"
echo ""
echo "📋 Next steps:"
echo "1. Review the LICENSE file"
echo "2. Commit changes: git add -A && git commit -m 'chore: switch from MIT to dual license model'"
echo "3. Push to GitHub: git push"
echo "4. Update GitHub repository settings (see UPDATE-GITHUB-SETTINGS.md)"
echo ""
echo "💡 Consider also:"
echo "- Adding license validation code"
echo "- Setting up a CLA (Contributor License Agreement)"
echo "- Creating a separate 'community' branch for pure open source"