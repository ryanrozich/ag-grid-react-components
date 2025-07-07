# Quick Commands to Bypass Branch Protection

## Option A: Temporarily disable protection for a merge

```bash
# Remove protection
gh api -X DELETE repos/ryanrozich/ag-grid-react-components/branches/main/protection

# Merge your PR
gh pr merge <PR-NUMBER>

# Re-enable protection (run the setup script)
./scripts/setup-branch-protection.sh
```

## Option B: Use admin override (if available)

When merging in GitHub UI, look for "Merge without waiting for requirements to be met (bypass branch protections)" if you see it.

## Option C: Create a less strict protection rule

Modify your setup-branch-protection.sh to have empty required checks:

```bash
# In setup-branch-protection.sh, change:
"required_status_checks": {
  "strict": false,
  "contexts": []  # Empty array = no required checks
}
```
