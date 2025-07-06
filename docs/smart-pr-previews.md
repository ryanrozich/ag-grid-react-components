# Smart PR Preview Deployments

This project uses intelligent PR preview deployments that only deploy when necessary, saving resources and reducing noise.

## How It Works

### Automatic Deployment

PR previews are automatically deployed when changes are made to:

- **Component source code** (`src/components/**`, `src/utils/**`)
- **Demo application** (`src/demo/**`)
- **Public assets** (`public/**`)
- **Configuration files** that affect the demo (`package.json`, `vite.config.demo.ts`, `tsconfig.json`)
- **API code** (`api/**`)

### Skipped Deployments

Previews are NOT deployed for changes to:

- GitHub Actions workflows (`.github/**`)
- Documentation (`*.md`, `docs/**`)
- Tests (`tests/**`, `*.test.ts`)
- Scripts (`scripts/**`)
- Build tools and configs (except those listed above)
- Other non-demo files

## Manual Control

### Using Labels

- **`deploy-preview`** - Forces a preview deployment even if changes don't normally trigger one
- **`skip-preview`** - Prevents preview deployment even if changes would normally trigger one
- **`has-preview`** - Automatically added when a preview is deployed (do not add manually)

### Using Comments

You can control preview deployments by commenting on a PR:

- **`/preview`** - Triggers a preview deployment
- **`/skip-preview`** - Skips preview deployment

Only users with write permissions can use these commands.

## Examples

### PR with only workflow changes

```yaml
# Changes to .github/workflows/ci.yml
# Result: No preview deployed
# Message: "Demo Preview Skipped - Contains no demo-relevant changes"
```

### PR with component changes

```typescript
// Changes to src/components/DateFilter/index.tsx
// Result: Preview automatically deployed
// Message: "Demo Preview Ready!"
```

### Forcing a preview

```bash
# Comment on PR: /preview
# Result: Preview deployed regardless of changes
# Label added: deploy-preview
```

## Benefits

1. **Faster CI** - Skips unnecessary builds and deployments
2. **Cost savings** - Reduces Cloudflare R2 storage and Worker invocations
3. **Cleaner PR threads** - Only relevant PRs get preview comments
4. **Manual override** - Can still force previews when needed

## Migration

The new smart preview system replaces the old `deploy-demo-preview.yml` workflow. To migrate:

1. The old workflow still works but should be considered deprecated
2. New PRs will automatically use the smart system
3. Existing PRs can be controlled with labels or comments
