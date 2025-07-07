# PR Preview Cleanup Guide

## Quick Cleanup Steps

### 1. Create a `.env` file with your Cloudflare credentials:

```bash
CLOUDFLARE_KV_NAMESPACE_ID=your_kv_namespace_id
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
```

### 2. Run the cleanup script:

```bash
./scripts/cleanup-pr-previews-with-config.sh
```

This will clean up PRs: 18, 35, 38, 40, 41

### 3. For R2 bucket cleanup:

#### Option A: Using Cloudflare Dashboard (Easiest)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to R2 → `rozich-demos` bucket
3. Delete these folders:
   - `ag-grid-react-components-pr-18/`
   - `ag-grid-react-components-pr-35/`
   - `ag-grid-react-components-pr-38/`
   - `ag-grid-react-components-pr-40/`
   - `ag-grid-react-components-pr-41/`

#### Option B: Using rclone

```bash
# Configure rclone first
rclone config
# Choose 's3', use your R2 credentials

# Then run
./scripts/cleanup-r2-with-rclone.sh 18 35 38 40 41
```

## What Gets Cleaned

- ✅ Cloudflare Workers: `ag-grid-demo-api-pr-*`
- ✅ KV metadata entries
- ⚠️ R2 bucket objects (requires manual cleanup)

## Finding Your Credentials

### KV Namespace ID

1. Cloudflare Dashboard → Workers & Pages → KV
2. Click on your namespace
3. Copy the ID

### Account ID

1. Cloudflare Dashboard → Right sidebar
2. Copy your Account ID

### API Token

1. Cloudflare Dashboard → My Profile → API Tokens
2. Create a token with:
   - Account:Cloudflare Workers Scripts:Edit
   - Account:Workers KV Storage:Edit

## Verify Cleanup

After running the cleanup, you can verify:

1. Workers: Check Cloudflare Dashboard → Workers & Pages
2. KV: Check Workers & Pages → KV → Your namespace
3. R2: Check R2 → rozich-demos bucket

The workers `ag-grid-demo-api-pr-18` through `ag-grid-demo-api-pr-41` should be gone.
