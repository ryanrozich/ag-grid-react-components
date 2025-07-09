# Deploying AG Grid React Components Demo to Cloudflare Pages

This guide explains how to deploy the demo application to `demo.rozich.net/ag-grid-react-components`.

## Prerequisites

- Cloudflare account (free plan is sufficient)
- Domain `rozich.net` configured in Cloudflare
- Git repository (GitHub, GitLab, or direct upload)

## Setup Instructions

### 1. Initial Cloudflare Pages Setup

1. Log in to [Cloudflare Dashboard](<[https://dash.cloudflare.co](https://dash.cloudflare.co)m>)
2. Go to **Workers & Pages** > **Create application** > **Pages**
3. Connect your Git account or choose "Direct Upload"

### 2. Configure Build Settings

When setting up the Pages project:

- **Project name**: `ag-grid-react-components-demo`
- **Production branch**: `main` (or your default branch)
- **Build command**: `npm run build:demo`
- **Build output directory**: `dist-demo`
- **Root directory**: `/` (leave as default)
- **Environment variables**:
  - `NODE_VERSION`: `18`

### 3. Custom Domain Setup

1. After initial deployment, go to your Pages project settings
2. Click on **Custom domains**
3. Add custom domain: `demo.rozich.net`
4. Create a CNAME record:
   ```txt
   Type: CNAME
   Name: demo
   Target: ag-grid-react-components-demo.pages.dev
   ```

### 4. Configure Path-Based Routing

Since you want the demo at `/ag-grid-react-components`, the build is already configured with:

```javascript
base: "/ag-grid-react-components/";
```

This means your demo will be accessible at:

- `https://demo.rozich.net/ag-grid-react-components/`

## Local Development

### Build and Preview Locally

````bash
# Build the demo
npm run build:demo

# Preview the built demo
npm run preview:demo
```text

### Test with Wrangler (Optional)

```bash
# Install wrangler if not already installed
npm install -g wrangler

# Build the demo (2)
npm run build:demo

# Serve locally with Cloudflare Workers
wrangler pages dev dist-demo --port 8788
```text

## Deployment Options

### Option 1: Automatic Deployment (Recommended)

Connect your GitHub repository to Cloudflare Pages:

1. Push code to your repository
2. Cloudflare automatically builds and deploys on each push

### Option 2: Manual Deployment

```bash
# Build locally
npm run build:demo

# Deploy using wrangler
wrangler pages publish dist-demo --project-name=ag-grid-react-components-demo
````

### Option 3: Direct Upload

1. Build locally: `npm run build:demo`
2. Go to your Pages project in Cloudflare dashboard
3. Click "Upload assets"
4. Upload the contents of `dist-demo` folder

## Multiple Demos Setup

To host multiple demos under `demo.rozich.net`:

1. Create separate Pages projects for each demo
2. Configure each with a different base path in `vite.config.demo.ts`
3. Add routing rules in Cloudflare:

Example for multiple projects:

- `demo.rozich.net/ag-grid-react-components`
- `demo.rozich.net/another-project`
- `demo.rozich.net/third-project`

Each project needs its own:

- Cloudflare Pages project
- Build configuration with appropriate `base` path
- Deployment pipeline

## Troubleshooting

### Assets Not Loading

If CSS or JS files return 404:

1. Verify the `base` path in `vite.config.demo.ts` matches your URL path
2. Check that all asset URLs in the build use relative paths

### Page Not Found on Refresh

For single-page apps with client-side routing:

1. Create `_redirects` file in project root:
   ```txt
   /* /index.html 200
   ```
2. Ensure it's copied to `dist-demo` during build

### Build Failures

1. Check Node.js version matches `NODE_VERSION` environment variable
2. Ensure all dependencies are in `package.json` (not just devDependencies)
3. Check build logs in Cloudflare dashboard

## Cost Considerations

With Cloudflare's free plan:

- ✅ Unlimited bandwidth
- ✅ Automatic SSL certificates
- ✅ Global CDN
- ✅ 500 builds per month
- ✅ Unlimited sites
- ❌ No custom headers or redirects beyond `_redirects` file
- ❌ Limited to 1 concurrent build

## Next Steps

1. Test the build locally:

   ```bash
   npm run build:demo
   npm run preview:demo
   ```

2. Commit the new files:

   ````bash
   git add vite.config.demo.ts wrangler.toml .cloudflare/config.json DEPLOYMENT.md
   git add package.json # for the new scripts
   git commit -m "feat: add Cloudflare Pages deployment configuration"
   ```text

   ````

3. Set up the Pages project in Cloudflare dashboard

4. Deploy your first version!

## Useful Commands

```bash
# Build the demo for production
npm run build:demo

# Preview the production build locally
npm run preview:demo

# Check the bundle size
ls -lah dist-demo/assets/

# Clean build artifacts
rm -rf dist-demo
```
