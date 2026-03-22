# Google Drive Setup - Fresh Start

**Date:** March 15, 2026  
**Goal:** Create new Google Cloud project for Fern & Feather Drive integration

---

## Step-by-Step Instructions

### Step 1: Create New Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown (top left, currently shows "fern-and-feather" or "Select a project")
3. Click **"New Project"**
4. **Project name:** `fern-feather-backup`
5. **Organization:** Leave as default (or select your domain if you have one)
6. **Location:** Leave as default
7. Click **"Create"**

### Step 2: Enable Google Drive API

1. In the new project, go to **APIs & Services** → **Library**
2. Search for **"Google Drive API"**
3. Click **"Google Drive API"** in results
4. Click **"Enable"**

### Step 3: Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **"+ Create Credentials"** → **"OAuth client ID"**
3. If prompted to configure consent screen:
   - Click **"Configure Consent Screen"**
   - **User Type:** External
   - Click **"Create"**
   - **App name:** `Fern & Feather Backup`
   - **User support email:** Your email
   - **Developer contact email:** Your email
   - Click **"Save and Continue"** (skip scopes for now)
   - Click **"Save and Continue"** (skip test users for now)
   - Click **"Back to Dashboard"**
4. Now create OAuth client ID:
   - **Application type:** Desktop app
   - **Name:** `Ronda Desktop Client`
   - Click **"Create"**
5. You'll see a popup with **Client ID** and **Client Secret**

### Step 4: Share Credentials with Ronda

Copy and paste these two values to me:
- **Client ID** (looks like: `123456789-abc123def456.apps.googleusercontent.com`)
- **Client Secret** (looks like: `GOCSPX-xxxxxxxxxxxxxxxx`)

---

## What I'll Do Next

Once you give me the credentials:
1. I'll configure the OAuth flow
2. Generate an authorization URL
3. You'll click the link and grant permission
4. I'll be able to upload files to your Drive

---

## Security Note

- These credentials will be stored securely in the workspace
- They'll only be used to sync Fern & Feather documents
- You can revoke access anytime in Google Cloud Console

---

Ready when you are!
