# PR Deployment Cleanup

This document describes how PR preview deployments are managed and cleaned up.

## Automatic Cleanup

When a pull request is closed (merged or not), the `.github/workflows/cleanup-pr-deployment.yml` workflow automatically:

1. **Deletes R2 objects** - Removes all files from `rozich-demos/ag-grid-react-components-pr-{number}/`
2. **Removes KV entry** - Deletes the demo router entry for the PR
3. **Deletes API worker** - Removes the `ag-grid-demo-api-pr-{number}` worker
4. **Comments on PR** - Confirms the cleanup was successful

This happens within minutes of PR closure.

## Manual Cleanup

To clean up deployments for already-merged PRs:

```bash
# Set required environment variables
export CLOUDFLARE_API_TOKEN="your-token"
export CLOUDFLARE_ACCOUNT_ID="your-account-id"
export CLOUDFLARE_KV_NAMESPACE_ID="your-kv-namespace-id"

# Run the cleanup script
npm run cleanup:pr-deployments
```

The script will:

- Find all merged PRs
- Check which ones have active deployments
- Show a list and wait for confirmation
- Clean up each deployment

## What Gets Cleaned

For each PR deployment, we remove:

1. **R2 Bucket Objects**

   - Path: `rozich-demos/ag-grid-react-components-pr-{number}/*`
   - All demo assets (HTML, JS, CSS, etc.)

2. **KV Store Entry**

   - Key: `ag-grid-react-components-pr-{number}`
   - This removes the PR from the demo router index

3. **API Worker**
   - Name: `ag-grid-demo-api-pr-{number}`
   - The dedicated API endpoint for the PR

## Verification

To verify cleanup:

```bash
# Check R2 objects
wrangler r2 object list rozich-demos --prefix="ag-grid-react-components-pr-" --remote

# Check KV entries
wrangler kv key list --namespace-id="$CLOUDFLARE_KV_NAMESPACE_ID" --remote | grep "pr-"

# Check workers
wrangler deployments list | grep "ag-grid-demo-api-pr-"
```

## Troubleshooting

If automatic cleanup fails:

1. Check the workflow logs in GitHub Actions
2. Ensure all Cloudflare secrets are properly set
3. Run manual cleanup using the script

Common issues:

- Missing permissions (check API token scopes)
- Resources already deleted (safe to ignore)
- Network timeouts (retry the operation)
