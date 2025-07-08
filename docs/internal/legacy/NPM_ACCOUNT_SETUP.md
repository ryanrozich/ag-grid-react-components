# NPM Account Setup Guide

## Step 1: Create NPM Account

### Option A: Via Website (Recommended)

1. Go to [https://www.npmjs.com/signup](https://www.npmjs.com/signup)
2. Fill in:
   - Username (e.g., `ryanrozich`)
   - Email address
   - Password
3. Verify your email address (check inbox)

### Option B: Via Command Line

````bash
npm adduser
# Follow prompts for username, password, email
```text

## Step 2: Enable 2FA (Recommended)

1. Login to [https://www.npmjs.com](https://www.npmjs.com)
2. Go to Account Settings → Security
3. Enable Two-Factor Authentication
4. Choose "Authorization and Publishing" for maximum security

## Step 3: Login via CLI

```bash
npm login
# Enter username and password
# If 2FA enabled, enter one-time code
```text

Verify login:

```bash
npm whoami
# Should show: ryanrozich (or your username)
```text

## Step 4: Test with Dry Run

Before publishing for real:

```bash
cd packages/core
npm publish --dry-run --access public
````

## Step 5: Create Organization (Optional)

If you want `@agrc` scope to be an organization:

1. Go to [https://www.npmjs.com/org/create](https://www.npmjs.com/org/create)
2. Create org named `agrc`
3. This allows multiple maintainers later

Or use personal scope:

- Your packages would be `@ryanrozich/ag-grid-react-core`
- No org needed, tied to your account

## Quick Setup Commands

````bash
# 1. Create account (if using CLI)
npm adduser

# 2. Login
npm login

# 3. Check login
npm whoami

# 4. Configure for public scoped packages
npm config set access public
```text

## Publishing Your First Package

Once logged in:

```bash
# From project root
npm run publish:beta

# Or manually for testing
cd packages/core
npm publish --access public --tag beta
````

## Common Issues

### "You do not have permission to publish"

- Make sure you're logged in: `npm whoami`
- For scoped packages, use `--access public`

### "Package name too similar to existing package"

- This won't happen with `@agrc/` scope
- It's available and unique to you

### "Two-factor authentication required"

- Enter the 6-digit code from your authenticator app
- Or use auth token in CI/CD

## Next Steps

1. ✅ Create npm account
2. ✅ Login via CLI
3. ✅ Run `npm run publish:dry` to test
4. 🚀 Publish with `npm run publish:beta`

Your packages will be live at:

- [https://www.npmjs.com/package/@agrc/core](https://www.npmjs.com/package/@agrc/core)
- [https://www.npmjs.com/package/@agrc/adapters](https://www.npmjs.com/package/@agrc/adapters)
- [https://www.npmjs.com/package/@agrc/styles](https://www.npmjs.com/package/@agrc/styles)
- [https://www.npmjs.com/package/@agrc/compat](https://www.npmjs.com/package/@agrc/compat)
