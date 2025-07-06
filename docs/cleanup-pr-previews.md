# Cleaning Up PR Preview Deployments

This guide explains how to clean up stale PR preview deployments from Cloudflare.

## Automatic Cleanup (For New PRs)

Starting from PR #41, preview deployments are automatically cleaned up when PRs are merged or closed. This includes:

- Removing the Cloudflare Worker (`ag-grid-demo-api-pr-*`)
- Removing the KV metadata entry
- Clearing the Preview URL field in the GitHub project
- Removing the `has-preview` label

## Manual Cleanup (For Existing Stale Previews)

For PR previews that were created before the automatic cleanup was implemented, use one of these scripts:

### Option 1: Simple Bash Script

```bash
# Set required environment variable
export CLOUDFLARE_KV_NAMESPACE_ID=your_namespace_id

# Run the cleanup script
./scripts/cleanup-pr-previews-manual.sh
```

This script will clean up workers for PRs: 18, 35, 38, 40, 41 (based on your screenshot).

To add more PR numbers, edit the `PR_NUMBERS` array in the script.

### Option 2: Comprehensive Node.js Script

```bash
# Set required environment variables
export GITHUB_TOKEN=your_github_token
export CLOUDFLARE_KV_NAMESPACE_ID=your_namespace_id

# Run the cleanup script
node scripts/cleanup-stale-pr-previews.js
```

This script will:

1. Fetch all PRs from GitHub
2. Find all deployed workers
3. Clean up workers for closed/merged PRs
4. Keep workers for open PRs

## R2 Bucket Cleanup

The R2 bucket files need to be cleaned up separately:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → R2
2. Open the `rozich-demos` bucket
3. Delete folders named `ag-grid-react-components-pr-*` for closed PRs

Alternatively, you can set up lifecycle rules in R2 to automatically delete old files.

## Finding Your KV Namespace ID

1. Go to Cloudflare Dashboard → Workers & Pages → KV
2. Find your namespace
3. Copy the ID from the namespace details

## Troubleshooting

If you get permission errors:

- Make sure you're logged in: `wrangler login`
- Check you have the correct permissions in Cloudflare
- Ensure environment variables are set correctly
