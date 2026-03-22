# Vercel Deployment Structure — CRITICAL

**Last Updated:** March 22, 2026  
**Status:** DOCUMENTED — No more confusion

---

## ⚠️ CRITICAL RULE

**Vercel deploys from the REPO ROOT where `.git` lives.**

NOT from `fern-feather-website/` subfolder.  
NOT from any other subfolder.

The `fern-feather-website/` folder is a RED HERRING. It's outdated. Ignore it.

---

## The Issue I Kept Repeating

**What I was doing:**
- Editing files in `fern-feather-website/` subfolder
- Committing and pushing
- Wondering why live site didn't update
- Repeating this multiple times like an idiot

**Why it failed:**
Vercel deploys from ROOT folder (where `.git` is), not from subfolders.

**The fix:**
Edit files in ROOT folder:
- `/root/.openclaw/workspace/index.html` ← THIS ONE
- `/root/.openclaw/workspace/services.html` ← THIS ONE
- `/root/.openclaw/workspace/about.html` ← THIS ONE
- etc.

NOT:
- ~~`/root/.openclaw/workspace/fern-feather-website/index.html`~~ ← WRONG

---

## Working Workflow

1. Edit HTML files in ROOT folder
2. `git add index.html services.html [etc]`
3. `git commit -m "message"`
4. `git push origin main`
5. Vercel auto-deploys from root in ~30 seconds

---

## Files in Root (The Ones That Matter)

```
/root/.openclaw/workspace/
├── index.html          ← HOMEPAGE - EDIT THIS ONE
├── services.html       ← SERVICES - EDIT THIS ONE  
├── about.html          ← ABOUT - EDIT THIS ONE
├── rates.html          ← RATES - EDIT THIS ONE
├── nicole.html         ← NICOLE BIO - EDIT THIS ONE
├── kiera.html          ← KIERA BIO - EDIT THIS ONE
├── faq.html            ← FAQ - EDIT THIS ONE
├── resources.html      ← RESOURCES - EDIT THIS ONE
├── specialties.html    ← SPECIALTIES - EDIT THIS ONE
├── css/                ← Styles
├── js/                 ← JavaScript
└── fern-feather-website/  ← IGNORE THIS FOLDER
```

---

## What to Do With fern-feather-website/ Folder

**Option 1:** Delete it to avoid confusion  
**Option 2:** Keep it as archive but NEVER edit it  
**Option 3:** Move its contents to root and delete it

**My recommendation:** Delete it. It's causing problems.

---

## Commands That Work

```bash
# Edit root files
cd ~/.openclaw/workspace
[nano/vim/code] index.html  # Edit root file

# Commit from root
git add index.html
git commit -m "Updated homepage"
git push origin main

# Verify live site
curl -s https://fern-feather-website.vercel.app/ | grep "<h1>"
```

---

## What I Should Have Checked First

1. Where is `.git`? → Root folder
2. Where does Vercel deploy from? → Where `.git` is
3. Therefore: Edit files where `.git` is

**I failed to connect these dots repeatedly.**

---

## Related Issues Documented Elsewhere

- Netlify failed (minute limit) — see `memory/2026-03-22-deployment-issues.md`
- GitHub Pages failed (cache issues) — see same file
- This Vercel root vs subfolder issue — you're reading it

---

## For Future Ronda

**BEFORE editing website files:**
1. Check where `.git` is located
2. Edit files in THAT location
3. Commit from THAT location
4. Verify deployment

**Never assume subfolders are the deploy target.**

---

**Documented by:** Ronda  
**After:** Too many failed attempts  
**Lesson:** Check the infrastructure before editing files
