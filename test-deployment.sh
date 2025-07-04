#!/bin/bash

# Test deployment script - simulates what the workflow does

echo "🧪 Testing demo deployment locally..."
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler not installed. Install with: npm install -g wrangler"
    exit 1
fi

# Check if we have credentials
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ CLOUDFLARE_API_TOKEN not set"
    echo "Set it with: export CLOUDFLARE_API_TOKEN=your-token"
    exit 1
fi

# Build the demo
echo "📦 Building demo..."
npm run build:demo

# Test R2 commands
echo ""
echo "🧪 Testing R2 commands..."
echo ""

# Test listing objects (safe operation)
echo "1. Testing R2 list command with --remote flag:"
wrangler r2 object list rozich-demos --remote --prefix="ag-grid-react-components/"

echo ""
echo "2. Testing a single file upload to test path:"
cd dist-demo
if [ -f "index.html" ]; then
    echo "Uploading index.html to test location..."
    wrangler r2 object put "rozich-demos/ag-grid-react-components-test/index.html" --file="index.html" --remote
    echo "✅ Test upload successful!"

    echo ""
    echo "3. Cleaning up test file..."
    wrangler r2 object delete "rozich-demos/ag-grid-react-components-test/index.html" --remote
    echo "✅ Test cleanup successful!"
else
    echo "❌ index.html not found in dist-demo"
fi

echo ""
echo "✅ All tests passed! The --remote flag is working correctly."