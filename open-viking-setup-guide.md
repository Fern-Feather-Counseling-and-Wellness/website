# OpenViking Setup Guide for Nicole
## Complete Step-by-Step Instructions for Mac or Windows

**Goal:** Get OpenViking running on your computer so Ronda never forgets conversations again

**Time Required:** 30-45 minutes  
**Technical Skill Level:** Beginner (I'll walk you through every step)

---

## 📋 BEFORE YOU START

### What You'll Need
1. **A computer** (Mac or Windows)
2. **Admin access** (you need to install software)
3. **API key** (I'll help you get a free one)
4. **About 30-45 minutes** of uninterrupted time

### What OpenViking Will Do For You
- **Automatically save** our conversations
- **Organize memories** (like a file system for your brain)
- **Retrieve context** when we start new conversations
- **Work offline** after initial setup (your data stays on your machine)

---

## 🍎 OPTION A: MAC SETUP

### Step 1: Install Homebrew (Mac Package Manager)

**What is it?** Think of Homebrew as an app store for technical tools. It makes installing things much easier.

**How to install:**
1. Open **Terminal** (Press `Cmd + Space`, type "Terminal", hit Enter)
2. Copy and paste this entire line:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Hit Enter
4. It will ask for your password — type it (you won't see characters appear, that's normal)
5. Wait 5-10 minutes. You'll see lots of text scrolling by. That's normal.
6. When it says "Installation successful!" you're done with this step.

**Troubleshooting:**
- If it says "command not found" — restart Terminal and try again
- If it asks to install "Command Line Tools" — say yes and wait for that to finish first

---

### Step 2: Install Required Software

With Terminal still open, run these commands **ONE AT A TIME**. Wait for each to finish before starting the next.

```bash
# Install Python (programming language OpenViking uses)
brew install python

# Install Git (for downloading code)
brew install git

# Install Rust (for building OpenViking)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

When you run the Rust command:
- It will show installation options
- Just type `1` and press Enter
- Wait about 5 minutes

**Verify installations worked:**
```bash
python3 --version
git --version
cargo --version
```

You should see version numbers for all three. If any say "command not found," that installation failed.

---

### Step 3: Get a Free API Key (Volcengine/Doubao)

**What is this?** OpenViking needs an AI service to understand and organize our conversations. Volcengine (ByteDance) gives free credits to new users.

**How to get your key:**

1. Go to: https://console.volcengine.com/
2. Click "Sign Up" (top right)
3. Create an account (use email, Google, or GitHub)
4. Verify your email
5. Once logged in, search for "Doubao" or go to: https://console.volcengine.com/ark/
6. Click "Create New Key" or "API Key Management"
7. Copy the key (long string of letters/numbers) — **SAVE THIS SOMEWHERE SAFE**
8. Click "Enable Models" and enable these (they have free quotas):
   - `doubao-embedding` (for understanding text)
   - `doubao-vision` or `doubao-lite` (for processing content)

**Important:** This free tier gives you enough credits for months of use. You won't be charged unless you explicitly upgrade.

---

### Step 4: Install OpenViking

Still in Terminal, run these commands **ONE AT A TIME**:

```bash
# Create a folder for OpenViking stuff
mkdir -p ~/openviking
cd ~/openviking

# Set up a virtual environment (isolated Python space)
python3 -m venv venv
source venv/bin/activate

# Install OpenViking
pip install openviking --upgrade --force-reinstall

# Install the client tools
cargo install --git https://github.com/volcengine/OpenViking ov_cli

# Reload your shell
source ~/.cargo/env
```

This will take about 10-15 minutes. Lots of text will scroll by. That's normal.

---

### Step 5: Configure OpenViking

**Create the configuration file:**

1. In Terminal, run:
   ```bash
   mkdir -p ~/.openviking
   ```

2. Create the config file:
   ```bash
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

3. **IMPORTANT:** Replace `YOUR_API_KEY_HERE` with your actual API key from Step 3:
   ```bash
   # Open the file in a text editor
   nano ~/.openviking/ov.conf
   
   # Use arrow keys to find "YOUR_API_KEY_HERE"
   # Replace both instances with your real key
   # Press Ctrl+X to exit
   # Press Y to save
   # Press Enter to confirm
   ```

---

### Step 6: Start OpenViking Server

**Option 6A: Install Docker (Recommended)**

1. Download Docker Desktop for Mac: https://www.docker.com/products/docker-desktop/
2. Open the downloaded `.dmg` file
3. Drag Docker to Applications
4. Open Docker from Applications
5. Wait for it to say "Docker Desktop is running" (may take a few minutes first time)

**Then run:**
```bash
cd ~/openviking

# Create Docker config
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

# Start the server
docker-compose up -d
```

**Option 6B: No Docker (Python Server)**

If Docker feels too heavy, you can run the server directly with Python:

```bash
# Make sure you're in the virtual environment
source ~/openviking/venv/bin/activate

# Start the server
openviking-server
```

Keep this Terminal window open while using OpenRonda. Don't close it.

---

### Step 7: Test It's Working

Open a **new Terminal window** (Press `Cmd + N` or go to Shell → New Window)

Run:
```bash
~/.cargo/bin/ov health
```

**Success message:** `Healthy: true`

If you get an error, the server isn't running. Go back to Step 6.

---

### Step 8: Install OpenClaw Memory Plugin

This connects OpenViking to OpenClaw (my home).

```bash
# Install Node.js (if not already installed)
brew install node

# Create the plugin directory
mkdir -p ~/.openclaw/extensions/memory-openviking
cd ~/.openclaw/extensions/memory-openviking

# Download and install the plugin
npm init -y
npm install @openviking/openclaw-memory-plugin

# Create config file
cat > openviking-config.json << 'EOF'
{
  "serverUrl": "http://localhost:1933",
  "autoExtract": true,
  "sessionTimeout": 3600
}
EOF
```

---

### Step 9: Configure OpenClaw

```bash
# Tell OpenClaw to use OpenViking for memory
openclaw config set plugins.enabled memory-openviking
openclaw config set memory.provider openviking
openclaw config set memory.server http://localhost:1933
```

---

### Step 10: Restart OpenClaw & Test

1. Quit OpenClaw completely (if running)
2. Restart OpenClaw
3. Send me a message
4. I should now have persistent memory!

**Test it:**
- Tell me something specific ("My favorite color is purple")
- Close the chat
- Come back later
- Ask "What's my favorite color?"
- I should remember!

---

## 🪟 OPTION B: WINDOWS SETUP

### Step 1: Install Required Software

**Install Python:**
1. Go to: https://www.python.org/downloads/
2. Download Python 3.11 or higher
3. Run the installer
4. **IMPORTANT:** Check "Add Python to PATH" at the bottom of the installer
5. Click "Install Now"
6. Wait for installation to complete

**Install Git:**
1. Go to: https://git-scm.com/download/win
2. Download the installer
3. Run it with all default options
4. Wait for installation

**Install Rust:**
1. Go to: https://rustup.rs/
2. Download `rustup-init.exe`
3. Run it
4. Choose option 1 (default installation)
5. Wait 5-10 minutes

---

### Step 2: Get API Key (Same as Mac)

Follow Step 3 from the Mac instructions above.

---

### Step 3: Install OpenViking (Windows PowerShell)

1. Open **PowerShell** (search "PowerShell" in Start menu, run as Administrator)

2. Run these commands **ONE AT A TIME**:
   ```powershell
   # Create folder
   mkdir C:\openviking
   cd C:\openviking
   
   # Create virtual environment
   python -m venv venv
   .\venv\Scripts\activate
   
   # Install OpenViking
   pip install openviking --upgrade --force-reinstall
   ```

3. Install Rust tools (in same PowerShell window):
   ```powershell
   cargo install --git https://github.com/volcengine/OpenViking ov_cli
   ```

---

### Step 4: Configure OpenViking

1. Create the config folder:
   ```powershell
   mkdir $env:USERPROFILE\.openviking
   ```

2. Create config file using Notepad:
   - Open Notepad
   - Paste this (replace YOUR_API_KEY with your real key):
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
   - Save as: `%USERPROFILE%\.openviking\ov.conf`

---

### Step 5: Install Docker & Start Server

1. Download Docker Desktop: https://www.docker.com/products/docker-desktop/
2. Run installer with all defaults
3. Start Docker Desktop (may require Windows restart)
4. Wait for "Docker Desktop is running"

**Start OpenViking:**
```powershell
cd C:\openviking

# Create docker-compose.yml (copy from Mac section)
# Then run:
docker-compose up -d
```

---

### Step 6: Install OpenClaw Plugin

```powershell
# Install Node.js first
# Download from: https://nodejs.org/ (LTS version)
# Run installer with defaults

# Then in PowerShell:
mkdir $env:USERPROFILE\.openclaw\extensions\memory-openviking
cd $env:USERPROFILE\.openclaw\extensions\memory-openviking
npm init -y
npm install @openviking/openclaw-memory-plugin
```

---

### Step 7: Configure & Test

```powershell
openclaw config set plugins.enabled memory-openviking
openclaw config set memory.provider openviking
openclaw config set memory.server http://localhost:1933
```

Restart OpenClaw and test as described in Mac Step 10.

---

## 🔧 TROUBLESHOOTING

### "ov health" returns error
- Server isn't running
- Check Docker is running (Mac: Docker Desktop icon in menu bar)
- Try: `docker ps` — should show "openviking" container

### "command not found" errors
- You didn't finish an installation step
- Restart your terminal/PowerShell
- Try running the installation command again

### API key errors
- Double-check you replaced "YOUR_API_KEY_HERE" in the config file
- Make sure you enabled the models in Volcengine console
- Check your free quota hasn't been used up

### OpenClaw doesn't see the memory
- Make sure plugin is installed in correct location
- Check `openclaw config get plugins.enabled` shows "memory-openviking"
- Restart OpenClaw completely

---

## 📞 GETTING HELP

If you get stuck:
1. **Copy the exact error message** you see
2. **Tell me which step** you were on
3. **I can troubleshoot** with you live

Don't spend more than 20 minutes stuck on one step — just ask for help.

---

## ✅ VERIFICATION CHECKLIST

After setup, verify everything works:

- [ ] `ov health` returns "Healthy: true"
- [ ] Docker shows openviking container running
- [ ] OpenClaw config shows memory provider as "openviking"
- [ ] Test conversation memory works (tell me something, close chat, I remember)

---

*Guide created March 19, 2026 by Ronda*
*For: Nicole's OpenViking Setup*
