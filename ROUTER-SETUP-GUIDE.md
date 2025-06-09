# Setting Up the Demo Router Worker Repository

## Why a Separate Repo?

1. **Single Responsibility** - The router handles routing for ALL demos
2. **Independent Deployment** - Router updates don't affect individual demos
3. **Shared Infrastructure** - One place to manage auth, analytics, etc.
4. **Clean Separation** - Demo repos only worry about building their demos

## Repository Structure

```
demo-router-worker/
├── src/
│   ├── index.ts          # Main router logic
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Helper functions
├── .github/
│   └── workflows/
│       └── deploy.yml    # Auto-deploy on push
├── wrangler.toml         # Cloudflare config
├── package.json
├── tsconfig.json
└── README.md
```

## Step-by-Step Setup

### 1. Create the Repository

```bash
# Create and initialize the repo
mkdir ~/code-repos/demo-router-worker
cd ~/code-repos/demo-router-worker
git init

# Create the Worker project
npm create cloudflare@latest . -- --type=hello-world --ts
```

### 2. Full Router Implementation

```typescript
// src/index.ts
export interface Env {
  DEMO_ASSETS: R2Bucket;
  DEMO_CONFIG: KVNamespace;
  // Optional: Add these later
  // ANALYTICS: AnalyticsEngineDataset;
  // AUTH_SECRET: string;
}

interface DemoMetadata {
  name: string;
  description?: string;
  updated: string;
  github?: string;
  featured?: boolean;
}

// src/utils.ts
export function getContentType(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase();
  const types: Record<string, string> = {
    html: "text/html; charset=utf-8",
    css: "text/css",
    js: "application/javascript",
    json: "application/json",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
    ico: "image/x-icon",
    woff: "font/woff",
    woff2: "font/woff2",
    ttf: "font/ttf",
    otf: "font/otf",
  };
  return types[ext || ""] || "application/octet-stream";
}

export function getCacheControl(contentType: string): string {
  if (contentType.startsWith("image/") || contentType.startsWith("font/")) {
    return "public, max-age=31536000, immutable"; // 1 year
  }
  if (contentType.includes("javascript") || contentType.includes("css")) {
    return "public, max-age=86400"; // 1 day
  }
  if (contentType.includes("html")) {
    return "public, max-age=0, must-revalidate";
  }
  return "public, max-age=3600"; // 1 hour default
}

// src/index.ts (main file)
import { getContentType, getCacheControl } from "./utils";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // Remove trailing slash for consistency
    if (pathname !== "/" && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }

    // Homepage - show demo listing
    if (pathname === "/" || pathname === "") {
      return await showDemoListing(env);
    }

    // API endpoint for demo management (future use)
    if (pathname === "/api/demos") {
      return await handleAPI(request, env);
    }

    // Extract project and asset path
    const parts = pathname.slice(1).split("/");
    const project = parts[0];
    const assetPath = parts.slice(1).join("/") || "index.html";

    // Validate project exists
    const metadata = await env.DEMO_CONFIG.get<DemoMetadata>(project, "json");
    if (!metadata) {
      return new Response("Demo not found", {
        status: 404,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // Try to serve the requested asset
    const assetKey = `${project}/${assetPath}`;
    let asset = await env.DEMO_ASSETS.get(assetKey);

    // For SPA routes without file extension, serve index.html
    if (!asset && !assetPath.includes(".")) {
      const indexKey = `${project}/index.html`;
      asset = await env.DEMO_ASSETS.get(indexKey);

      if (asset) {
        // Set proper headers for SPA routing
        const headers = new Headers();
        headers.set("Content-Type", "text/html; charset=utf-8");
        headers.set("Cache-Control", "public, max-age=0, must-revalidate");
        headers.set("X-SPA-Route", "true");

        return new Response(asset.body, { headers });
      }
    }

    if (!asset) {
      return new Response("Asset not found", {
        status: 404,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // Serve the asset with appropriate headers
    const contentType = getContentType(assetPath);
    const cacheControl = getCacheControl(contentType);

    return new Response(asset.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": cacheControl,
        "X-Demo-Name": project,
      },
    });
  },
};

async function showDemoListing(env: Env): Promise<Response> {
  const { keys } = await env.DEMO_CONFIG.list<DemoMetadata>();

  // Sort by updated date, featured first
  const demos = await Promise.all(
    keys.map(async ({ name }) => {
      const metadata = await env.DEMO_CONFIG.get<DemoMetadata>(name, "json");
      return { name, ...metadata };
    }),
  );

  demos.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.updated).getTime() - new Date(a.updated).getTime();
  });

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rozich.net Demos</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      background: #f5f5f5;
    }
    h1 {
      color: #2563eb;
      margin-bottom: 2rem;
      font-size: 2.5rem;
    }
    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .demo-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .demo-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .demo-card.featured {
      border: 2px solid #2563eb;
    }
    .demo-card h2 {
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
    }
    .demo-card a {
      color: #2563eb;
      text-decoration: none;
    }
    .demo-card a:hover {
      text-decoration: underline;
    }
    .demo-meta {
      font-size: 0.875rem;
      color: #666;
      margin-top: 0.5rem;
    }
    .demo-description {
      margin: 0.5rem 0;
      color: #555;
    }
    .featured-badge {
      display: inline-block;
      background: #2563eb;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      margin-bottom: 0.5rem;
    }
  </style>
</head>
<body>
  <h1>Demo Projects</h1>
  <div class="demo-grid">
    ${demos
      .map(
        (demo) => `
      <div class="demo-card ${demo.featured ? "featured" : ""}">
        ${demo.featured ? '<span class="featured-badge">Featured</span>' : ""}
        <h2><a href="/${demo.name}/">${demo.name}</a></h2>
        ${demo.description ? `<p class="demo-description">${demo.description}</p>` : ""}
        <div class="demo-meta">
          Updated: ${new Date(demo.updated).toLocaleDateString()}
          ${demo.github ? `• <a href="${demo.github}" target="_blank">GitHub</a>` : ""}
        </div>
      </div>
    `,
      )
      .join("")}
  </div>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300", // 5 minutes
    },
  });
}

async function handleAPI(request: Request, env: Env): Promise<Response> {
  // Future: Add API endpoints for managing demos
  // Could include webhook endpoints for GitHub Actions
  return new Response(JSON.stringify({ message: "API coming soon" }), {
    headers: { "Content-Type": "application/json" },
  });
}
```

### 3. Cloudflare Configuration

```toml
# wrangler.toml
name = "demo-router"
main = "src/index.ts"
compatibility_date = "2024-01-01"

# Custom domain routing
[[routes]]
pattern = "demo.rozich.net/*"
zone_name = "rozich.net"

# R2 bucket for demo assets
[[r2_buckets]]
binding = "DEMO_ASSETS"
bucket_name = "rozich-demos"

# KV namespace for demo metadata
[[kv_namespaces]]
binding = "DEMO_CONFIG"
id = "YOUR_KV_NAMESPACE_ID" # Create in dashboard first

# Optional: Analytics
# [[analytics_engine_datasets]]
# binding = "ANALYTICS"
```

### 4. GitHub Actions for the Router

```yaml
# .github/workflows/deploy.yml
name: Deploy Router

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Deploy to Cloudflare
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

### 5. README for the Router Repo

```markdown
# Demo Router Worker

Centralized routing for all demos hosted at demo.rozich.net.

## Architecture

This Worker:

- Routes requests to appropriate demo projects
- Serves static assets from R2 storage
- Manages demo metadata in KV
- Provides a homepage listing all demos

## Adding a New Demo

Demos are deployed from their individual repositories. To add a demo:

1. In your demo repo, build with the correct base path
2. Upload assets to R2 under your project name
3. Update metadata in KV

See individual demo repos for their deployment workflows.

## Local Development

\`\`\`bash
npm install
npm run dev
\`\`\`

## Deployment

Pushes to main automatically deploy via GitHub Actions.

## Environment Variables

Set these as GitHub secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
```

## Benefits of This Architecture

1. **Clear Separation** - Router logic separate from demo content
2. **Easy Updates** - Update router features without touching demos
3. **Centralized Features** - Add auth, analytics, rate limiting in one place
4. **Independent Scaling** - Router can be optimized separately
5. **Clean Git History** - Router changes don't pollute demo repos

## Next Steps

1. Create the `demo-router-worker` repository
2. Set up the Worker with the code above
3. Create R2 bucket and KV namespace in Cloudflare
4. Configure GitHub secrets
5. Deploy the router
6. Then demos can start deploying to it!

This gives you a production-ready, scalable demo hosting platform!
