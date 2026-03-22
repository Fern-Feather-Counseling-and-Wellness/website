# Deployment Issues Log — March 22, 2026

**Purpose:** Track what we tried, what failed, and what actually works. READ THIS before suggesting deployment fixes.

---

## ❌ FAILED SOLUTIONS (Don't Try Again)

### 1. Netlify
**Status:** FAILED — Hit minute limit  
**When:** March 22, 2026  
**What happened:** Site deployed but exceeded free tier minutes immediately  
**Result:** Had to abandon, wasted time

### 2. GitHub Pages
**Status:** FAILED — Cache issues  
**When:** Earlier in March 2026  
**What happened:** 5-10 minute delays, old versions showing, cache-busting didn't work reliably  
**Result:** Abandoned for Vercel

### 3. Cache-busting meta tags
**Status:** FAILED — Didn't solve GitHub Pages cache  
**When:** March 2026  
**What happened:** Added `<meta http-equiv="Cache-Control">` tags, still saw old versions  
**Result:** Not a real solution for GH Pages

### 4. Multiple Vercel cache clears
**Status:** PARTIALLY WORKED — But not root cause  
**When:** March 22, 2026  
**What happened:** Added `.vercelignore`, forced redeploys, still seeing old content  
**Result:** Wasn't a cache problem — was wrong file location

---

## ✅ CURRENT WORKING SETUP

**Platform:** Vercel  
**Repo:** `github.com/Jeeprasr/fern-feather-website`  
**Deploy folder:** `fern-feather-website/` (NOT root)  
**Status:** Working, auto-deploys on push

**CRITICAL RULE:**
All website edits must be made to files in `fern-feather-website/` subfolder.  
Vercel does NOT deploy from root workspace files.

---

## THE MARCH 22, 2026 INCIDENT

**Problem:** Website showing "frankenstein" mix of old and new edits  
**Root cause:** Edits made to root HTML files, not `fern-feather-website/` folder  
**Fix:** Copied updated files from root to `fern-feather-website/`, committed, pushed  
**Commit:** `4fd7d12`  

**Lesson:** Always check WHICH folder Vercel is deploying from before assuming cache issues.

---

## WORKING DEPLOYMENT WORKFLOW

1. Edit files in `fern-feather-website/` only
2. `git add . && git commit -m "message"`
3. `git push origin main`
4. Vercel auto-deploys (~30 seconds)
5. Verify at live URL

---

## NEVER FORGET

- Vercel deploys from SUBFOLDER, not root
- Netlify failed — don't recommend again
- GitHub Pages failed — don't recommend again  
- Cache-busting is usually the wrong diagnosis
- When seeing "old edits", check FILE LOCATION first

---

**Last updated:** March 22, 2026  
**Next review:** When deployment issues arise again
