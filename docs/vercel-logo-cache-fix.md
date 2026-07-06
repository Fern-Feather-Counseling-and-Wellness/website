# Fixing Vercel Logo Caching Issues

When static assets such as a logo are not updating on a Vercel deployment, the issue is often due to Vercel's build cache. Below are steps to reliably force a fresh build and ensure the new logo is served:

1. **Rename the logo file** (e.g., `logo.svg` → `logo_v2.svg`) and update references in the code. This guarantees a new filename, bypassing cache.
2. **Clear Vercel's build cache**:
   ```bash
   vercel --prod --force
   ```
   The `--force` flag forces a fresh build without using the cache.
3. **If using Next.js**, add the following to `next.config.js` to disable static asset caching for this file:
   ```js
   module.exports = {
     async headers() {
       return [
         {
           source: '/logo.svg',
           headers: [
             { key: 'Cache-Control', value: 'no-store, max-age=0' },
           ],
         },
       ]
     },
   }
   ```
4. **Purge CDN** via Vercel dashboard:
   - Go to **Deployments** → select the latest deployment → click **Purge Cache**.
5. **Verify** the new logo loads:
   - Open the live site in an incognito window.
   - Use the browser dev tools → Network tab → check the response headers for `Cache-Control`.

### Additional Tips
- Keep the original logo file in the repo for fallback.
- Document any filename changes in the repo to avoid broken links.
- After confirming the fix, you can revert to the original filename if desired, but remember to purge the cache again.

These steps should resolve the intermittent logo display problem on Vercel deployments.
