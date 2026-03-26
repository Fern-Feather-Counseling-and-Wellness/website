# Fern & Feather Website Documentation

## Folder Structure

```
fern-feather-website/          ← Main working folder (THIS IS WHAT WE EDIT)
├── index.html                 ← Homepage
├── about.html                 ← About page
├── services.html              ← Services page
├── rates.html                 ← Rates page
├── nicole.html                ← Nicole bio page
├── kiera.html                 ← Kiera bio page
├── faq.html                   ← FAQ page
├── resources.html             ← Resources hub
├── crisis.html                ← Crisis resources
├── tools.html                 ← Free tools page
├── blog.html                  ← Blog page
├── contact.html               ← Contact page
├── css/
│   └── style.css              ← Main stylesheet
├── js/
│   └── main.js                ← Main JavaScript
├── pages/                     ← Deployment copy (synced from root after edits)
│   ├── index.html
│   ├── about.html
│   └── ...
└── *.md                       ← Documentation
```

**Important:** Only `fern-feather-website/` is actively used. There is NO `/website` folder at the workspace root.

---

## Branch Strategy

| Branch | Purpose | Status |
|--------|---------|--------|
| **main** | Vercel deploys from HERE | ✅ Live |
| **master** | Backup/sync | Synced with main |

**Key Insight (March 26, 2026):** Vercel was deploying from `main` branch, not `master`. Always push changes to `main` for them to go live.

**Push command:**
```bash
git push origin master:main
```

---

## Edit Log

### March 26, 2026

| Change | File(s) | Commit |
|--------|---------|--------|
| Move "Why We Started" to top of About page | about.html | 24a6493 |
| Fix dropdown "About the practice" to prevent wrapping | index.html, about.html | 24a6493 |
| Style "Rooted and Rising" tagline (italic + weight) | index.html | e481ed8 |
| Link service cards to services.html sections | index.html | 9e505e9 |

### March 22, 2025 (Earlier)

- Standardized pricing across pages
- Removed "Most Popular" banners
- Rewrote insurance language in F&F voice
- Removed "capped at 12" promises

---

## Deployment

1. **Edit files in root** (`fern-feather-website/`)
2. **Sync to pages folder** (if needed for deployment):
   ```bash
   cp index.html pages/index.html
   ```
3. **Push to main** (for Vercel):
   ```bash
   git add -A && git commit -m "Description" && git push origin master:main
   ```
4. **Wait ~2 min** for Vercel to redeploy

---

## Vercel Config

- `.vercelignore`: `# Ignore nothing - force full redeploy`
- Auto-deploys on push to `main` branch
- Domain: fernfeatherwellness.com

---

## Known Issues / TODOs

- [ ] Domain not resolving from workspace (DNS likely not pointed yet)
- [ ] Some pages need content population (blog.html, tools.html)