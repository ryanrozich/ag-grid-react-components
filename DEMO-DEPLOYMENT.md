# Demo Deployment Guide

This guide explains how to run the AG Grid React Components demo locally and how the online demo deployment works.

## Running the Demo Locally

For most users who just want to test the components:

```bash
# Install dependencies
npm install

# Run the demo locally
npm run dev

# Open http://localhost:5173 in your browser
```

That's it! The demo will hot-reload as you make changes.

## Online Demo Deployment

The live demo is available at: https://demo.rozich.net/ag-grid-react-components/

This deployment uses a custom Cloudflare Workers architecture that allows hosting multiple project demos under a single domain. The deployment is automated via GitHub Actions when changes are pushed to the main branch.

### Architecture Overview (Optional Reading)

For those interested in the deployment details:

- **Demo Router Worker**: A centralized Cloudflare Worker that routes requests to different demo projects
- **Router Repository**: https://github.com/ryanrozich/demo-router-worker
- **Storage**: Uses Cloudflare R2 for static assets and KV for metadata
- **Cost**: Everything fits within Cloudflare's free tier

### How It Works

1. Push changes to main branch
2. GitHub Action builds the demo with correct base path
3. Assets are uploaded to Cloudflare R2
4. Demo is accessible at demo.rozich.net/ag-grid-react-components/

## Deployment Configuration

The project includes these deployment-related files:

### 1. Vite Configuration (`vite.config.demo.ts`)

```typescript
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/ag-grid-react-components/",
  build: {
    outDir: "dist-demo",
    // ... other config
  },
});
```

### 2. GitHub Actions (`.github/workflows/deploy-demo.yml`)

Automatically builds and deploys the demo when changes are pushed to main.

### 3. NPM Scripts

```bash
# Build the demo for deployment
npm run build:demo

# Build and preview locally with production base path
VITE_BASE_PATH=/ag-grid-react-components/ npm run build:demo
npm run preview:demo
```

## Manual Deployment (For Maintainers)

If you need to manually deploy the demo:

```bash
#!/bin/bash
# Build the demo
VITE_BASE_PATH=/ag-grid-react-components/ npm run build:demo

# Upload to R2 (requires wrangler CLI and credentials)
wrangler r2 object put rozich-demos/ag-grid-react-components/ \
  --file=dist-demo --recursive \
  --account-id=YOUR_ACCOUNT_ID

# Update metadata
wrangler kv:key put \
  --namespace-id=YOUR_KV_NAMESPACE_ID \
  "ag-grid-react-components" \
  '{"name": "AG Grid React Components", "updated": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"}' \
  --account-id=YOUR_ACCOUNT_ID
```

## Additional Resources

- **Live Demo**: https://demo.rozich.net/ag-grid-react-components/
- **Demo Router Repository**: https://github.com/ryanrozich/demo-router-worker
- **Main Project Repository**: https://github.com/ryanrozich/ag-grid-react-components
