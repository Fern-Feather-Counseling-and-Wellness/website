# OpenViking Quick Start Commands
## For Nicole — Windows Version

**Run PowerShell as Administrator. Copy and paste these commands.**

---

## Step 1: Install Software

**Python:**
- Download: https://www.python.org/downloads/
- Run installer
- ✅ Check "Add Python to PATH"
- Click Install Now

**Git:**
- Download: https://git-scm.com/download/win
- Run installer (all defaults)

**Rust:**
- Download: https://rustup.rs/ → `rustup-init.exe`
- Run it, type `1`, wait 5 minutes

**Node.js:**
- Download: https://nodejs.org/ (LTS version)
- Run installer (all defaults)

---

## Step 2: Get API Key
1. Go to: https://console.volcengine.com/
2. Sign up and verify email
3. Go to: https://console.volcengine.com/ark/
4. Create API key
5. Enable models: `doubao-embedding` and `doubao-lite`
6. **COPY THE KEY** — paste it somewhere safe

---

## Step 3: Install OpenViking

**Open PowerShell as Administrator**

```powershell
mkdir C:\openviking
cd C:\openviking
python -m venv venv
.\venv\Scripts\activate
pip install openviking --upgrade --force-reinstall
cargo install --git https://github.com/volcengine/OpenViking ov_cli
```

Wait 10-15 minutes.

---

## Step 4: Configure

```powershell
mkdir $env:USERPROFILE\.openviking
```

**Create config file:**

Open Notepad, paste this (replace YOUR_API_KEY with real key):

```json
{
  "embedding": {
    "dense": {
      "api_base": "https://ark.cn-beijing.volces.com/api/v3",
      "api_key": "YOUR_API_KEY_HERE",
      "provider": "volcengine",
      "dimension": 1024,
      "model": "doubao-embedding"
    }
  },
  "vlm": {
    "api_base": "https://ark.cn-beijing.volces.com/api/v3",
    "api_key": "YOUR_API_KEY_HERE",
    "provider": "volcengine",
    "model": "doubao-lite"
  }
}
```

**Save as:** `%USERPROFILE%\.openviking\ov.conf`

(File → Save As → paste `%USERPROFILE%\.openviking\ov.conf` in the filename box)

---

## Step 5: Install Docker & Start Server

**Install Docker Desktop:**
- Download: https://www.docker.com/products/docker-desktop/
- Run installer
- Restart if prompted
- Open Docker Desktop, wait for "Docker Desktop is running"

**Start OpenViking:**

Create file `C:\openviking\docker-compose.yml` with this content:

```yaml
version: '3.8'
services:
  openviking:
    image: ghcr.io/volcengine/openviking:main
    container_name: openviking
    ports:
      - "1933:1933"
    volumes:
      - ~/.openviking/ov.conf:/app/ov.conf
      - ~/.openviking/data:/app/data
    restart: unless-stopped
```

**In PowerShell:**
```powershell
cd C:\openviking
docker-compose up -d
```

---

## Step 6: Test

```powershell
$env:PATH += ";$env:USERPROFILE\.cargo\bin"
ov health
```

**Should see:** `Healthy: true`

---

## Step 7: Install OpenClaw Plugin

```powershell
mkdir $env:USERPROFILE\.openclaw\extensions\memory-openviking -Force
cd $env:USERPROFILE\.openclaw\extensions\memory-openviking
npm init -y
npm install @openviking/openclaw-memory-plugin

Set-Content -Path "openviking-config.json" -Value '{
  "serverUrl": "http://localhost:1933",
  "autoExtract": true,
  "sessionTimeout": 3600
}'
```

---

## Step 8: Configure OpenClaw

```powershell
openclaw config set plugins.enabled memory-openviking
openclaw config set memory.provider openviking
openclaw config set memory.server http://localhost:1933
```

---

## Step 9: Done
1. Restart OpenClaw
2. Send me a test message
3. I'll remember everything from now on

---

## Stuck?
**Text me:**
- Which step number
- The exact error message
- I'll fix it

---

*Quick reference — March 19, 2026*
