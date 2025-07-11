# Steps to Release v0.2.0-rc1

## Quick Steps

1. **Commit current changes**:

   ```bash
   git add -A
   git commit -m "fix: resolve infinite loop in QuickFilterDropdown

   - Add state change check to prevent unnecessary re-renders
   - Memoize presets config to prevent object recreation
   - Fix SavePresetDialog ID generation"

   git push origin fix/demo-deployment
   ```

2. **Go to GitHub Actions**:

   - Navigate to: <https://github.com/ryanrozich/ag-grid-react-components/actions/workflows/release-candidate.yml>
   - Click "Run workflow"
   - Enter:
     - RC version: `0.2.0-rc.1`
     - Milestone: `2` (if you have a v0.2.0 milestone)
     - Dry run: `false` (unchecked)

3. **The workflow will automatically**:
   - Generate consolidated release notes from all commits since v0.1.1
   - Run all tests
   - Build the package
   - Publish to NPM with `next` tag
   - Create a GitHub pre-release
   - Create a testing issue

## What Gets Published

- **NPM Package**: Available as `ag-grid-react-components@next`
- **GitHub Release**: Pre-release at <https://github.com/ryanrozich/ag-grid-react-components/releases>
- **Cloudflare Pages**: Your PR preview continues to work

## Installation for Testing

```bash
# Install RC
npm install ag-grid-react-components@next

# Or specific version
npm install ag-grid-react-components@0.2.0-rc.1
```

## Release Notes Will Include

All changes since v0.1.1, including:

- Filter preset system
- Performance improvements
- Bug fixes (including the infinite loop fix)
- Documentation updates
- Build improvements

## Required Setup

⚠️ **Before running**: Ensure `NPM_TOKEN` is set in your repository secrets:

1. Go to Settings → Secrets and variables → Actions
2. Add `NPM_TOKEN` with your npm auth token

To get an npm token:

```bash
npm login
npm token create --read-only=false
```
