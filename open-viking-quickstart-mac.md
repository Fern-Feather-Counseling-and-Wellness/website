# OpenViking Quick Start Commands
## For Nicole — Mac Version

**Copy and paste these commands in order. Don't skip steps.**

---

## Step 1: Install Homebrew
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
Enter password when asked. Wait for completion.

---

## Step 2: Install Software
```bash
brew install python git
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
Type `1` when prompted. Wait 5 minutes.

---

## Step 3: Get API Key
1. Go to: https://console.volcengine.com/
2. Sign up and verify email
3. Go to: https://console.volcengine.com/ark/
4. Create API key
5. Enable models: `doubao-embedding` and `doubao-lite`
6. **SAVE THE KEY** — you'll need it in Step 5

---

## Step 4: Install OpenViking
```bash
mkdir -p ~/openviking && cd ~/openviking
python3 -m venv venv
source venv/bin/activate
pip install openviking --upgrade --force-reinstall
source ~/.cargo/env
cargo install --git https://github.com/volcengine/OpenViking ov_cli
```
Wait 10-15 minutes. Lots of text = normal.

---

## Step 5: Configure
```bash
mkdir -p ~/.openviking
cat > ~/.openviking/ov.conf << 'EOF'
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
EOF
```

**Replace the API key:**
```bash
nano ~/.openviking/ov.conf
```
- Find `YOUR_API_KEY_HERE` (appears twice)
- Replace both with your real key from Step 3
- Ctrl+X → Y → Enter

---

## Step 6: Start Server (Option A - Docker)

**Install Docker Desktop:**
- Download: https://www.docker.com/products/docker-desktop/
- Open `.dmg`, drag to Applications, launch Docker
- Wait for "Docker Desktop is running"

**Start OpenViking:**
```bash
cd ~/openviking
cat > docker-compose.yml << 'EOF'
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
EOF
docker-compose up -d
```

---

## Step 6: Start Server (Option B - No Docker)
```bash
cd ~/openviking
source venv/bin/activate
openviking-server
```
**Keep this Terminal window open.** Don't close it.

---

## Step 7: Test
**New Terminal window:**
```bash
~/.cargo/bin/ov health
```

**Should see:** `Healthy: true`

---

## Step 8: Install OpenClaw Plugin
```bash
brew install node
mkdir -p ~/.openclaw/extensions/memory-openviking
cd ~/.openclaw/extensions/memory-openviking
npm init -y
npm install @openviking/openclaw-memory-plugin
cat > openviking-config.json << 'EOF'
{
  "serverUrl": "http://localhost:1933",
  "autoExtract": true,
  "sessionTimeout": 3600
}
EOF
```

---

## Step 9: Configure OpenClaw
```bash
openclaw config set plugins.enabled memory-openviking
openclaw config set memory.provider openviking
openclaw config set memory.server http://localhost:1933
```

---

## Step 10: Done
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
