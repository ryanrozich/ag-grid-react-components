# R2 Cleanup Guide

## Getting R2 API Credentials

To automate R2 cleanup, you need R2 API credentials (different from your regular Cloudflare API token):

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → R2
2. Click **"Manage R2 API tokens"** (in the right sidebar)
3. Click **"Create API token"**
4. Configure the token:
   - **Token name**: `ag-grid-pr-cleanup` (or any name you prefer)
   - **Permissions**: Select **Object Read & Write**
   - **Specify bucket**: Select `rozich-demos`
   - **TTL**: Leave as default or set as needed
5. Click **"Create API Token"**
6. Copy the **Access Key ID** and **Secret Access Key** (you won't see the secret again!)

## Add Credentials to .env

Add these lines to your `.env` file:

```bash
# Existing credentials
CLOUDFLARE_KV_NAMESPACE_ID=your_existing_value
CLOUDFLARE_ACCOUNT_ID=your_existing_value
CLOUDFLARE_API_TOKEN=your_existing_value

# New R2 credentials
CLOUDFLARE_R2_ACCESS_KEY_ID=your_r2_access_key_id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
```

## Option 1: AWS CLI Method (Recommended)

Once you have R2 credentials:

```bash
# Run the cleanup script
./scripts/cleanup-r2-aws-cli.sh

# Or specify specific PRs
./scripts/cleanup-r2-aws-cli.sh 18 35 38 40 41
```

The script will:

1. List objects for each PR
2. Show a dry run of what will be deleted
3. Ask for confirmation before deleting

## Option 2: Manual Cleanup via Dashboard

If you prefer not to set up R2 API credentials:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → R2
2. Click on the `rozich-demos` bucket
3. Navigate to each folder and delete:
   - `ag-grid-react-components-pr-18/`
   - `ag-grid-react-components-pr-35/`
   - `ag-grid-react-components-pr-38/`
   - `ag-grid-react-components-pr-40/`
   - `ag-grid-react-components-pr-41/`

## Option 3: Node.js Script

If you prefer Node.js over AWS CLI:

```bash
node scripts/cleanup-r2-s3-api.js 18 35 38 40 41
```

## Automated Cleanup for Future PRs

To enable automatic R2 cleanup when PRs are merged:

1. Get R2 API credentials (as described above)
2. Add them as GitHub Secrets:
   - Go to your repo → Settings → Secrets and variables → Actions
   - Add `CLOUDFLARE_R2_ACCESS_KEY_ID`
   - Add `CLOUDFLARE_R2_SECRET_ACCESS_KEY`
3. The cleanup workflow will automatically delete R2 objects when PRs are merged

## Verify Cleanup

To check if objects were deleted:

```bash
# List all PR folders
aws s3 ls s3://rozich-demos/ \
  --endpoint-url="https://$(grep CLOUDFLARE_ACCOUNT_ID .env | cut -d= -f2).r2.cloudflarestorage.com" \
  | grep 'ag-grid-react-components-pr-'
```

If the cleanup was successful, you shouldn't see pr-18, pr-35, pr-38, pr-40, or pr-41.
