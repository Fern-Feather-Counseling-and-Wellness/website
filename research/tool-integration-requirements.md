# Tool Integration Requirements — March 12, 2026

**Research by:** Ronda  
**Status:** Ready for setup — need API keys from Nicole

---

## 1. ElevenLabs (Text-to-Speech)

**What it does:** AI voice generation for TikTok voiceovers, audiobook narration, marketing content  
**Use cases for Fern & Feather:**
- Voice versions of TikTok scripts
- Audiobook versions of digital products
- Professional voiceovers for marketing

**Pricing:**
- Free: 10k credits/month (~10 minutes of audio)
- Starter: $5/month — 30k credits, commercial license, voice cloning
- Creator: $11/month — 100k credits, professional voice cloning
- Pro: $99/month — 500k credits

**What I need:** API key from https://elevenlabs.io/
**Setup:** Store in `~/.openclaw/workspace/.env` as `ELEVENLABS_API_KEY`

---

## 2. Image Generation

**Options:**

### Option A: OpenAI DALL-E 3
- **Best for:** Consistent, professional images
- **Pricing:** Via ChatGPT Plus ($20/month) or API pay-per-image
- **API:** ~$0.04-0.08 per image (1024x1024)

### Option B: Midjourney
- **Best for:** Artistic, high-quality images
- **Pricing:** $10-120/month subscription
- **Note:** No official API — would need unofficial wrapper or manual workflow

### Option C: Stable Diffusion (Local)
- **Best for:** Privacy, unlimited generation
- **Pricing:** Free (runs locally)
- **Setup:** More complex, requires GPU

**Recommendation:** DALL-E 3 via OpenAI API — easiest integration, consistent results

**What I need:** OpenAI API key from https://platform.openai.com/
**Setup:** Store in `~/.openclaw/workspace/.env` as `OPENAI_API_KEY`

---

## 3. PDF Generation

**Current limitation:** Creating nice-looking PDFs from markdown requires manual work or paid tools

**Best Options:**

### Option A: Puppeteer + HTML (Free)
- Convert HTML to PDF using headless Chrome
- Full control over styling
- No external API needed

### Option B: Nutrient API (Paid)
- Professional PDF generation
- HTML-to-PDF, forms, signatures
- Pricing: ~$19-49/month

### Option C: APITemplate.io
- Template-based PDF generation
- Good for consistent workbook layouts
- Pricing: Free tier available, paid from $9/month

**Recommendation:** Start with Puppeteer (free, full control), upgrade to Nutrient if needed for advanced features

**What I need:** Nothing — can implement with existing tools

---

## 4. Notion Integration

**What it does:** Sync documents, databases, and notes to Notion workspace  
**Use cases for Fern & Feather:**
- Wiki/documentation for business processes
- Content calendar database
- Research notes organization
- Client tracking (if needed later)

**Pricing:**
- Free: Unlimited pages, blocks
- Plus: $8/month — unlimited file uploads, version history
- Business: $15/month — advanced permissions, SAML SSO

**API:** Free to use, just need integration token

**What I need:**
1. Go to https://www.notion.so/my-integrations
2. Create new integration
3. Give me the "Internal Integration Token"
4. Share your Fern & Feather workspace pages with the integration

**Setup:** Store token in `~/.openclaw/workspace/.env` as `NOTION_TOKEN`

---

## Summary: What You Need to Provide

| Tool | What I Need | Cost | Priority |
|------|-------------|------|----------|
| ElevenLabs | API Key | $5-11/month | Medium |
| OpenAI (DALL-E) | API Key | ~$0.04/image | Medium |
| PDF (Puppeteer) | Nothing | Free | High (implement now) |
| Notion | Integration Token | Free | Low |

---

## Next Steps

1. **Decide which tools you want** (recommend ElevenLabs + OpenAI for content creation)
2. **Get API keys** from the websites above
3. **Share keys with me** (I'll store securely in workspace)
4. **I'll implement** the integrations and start using them

---

## Security Note

API keys will be stored in:
- `~/.openclaw/workspace/.env` (local file, not synced to GitHub)
- Never logged or exposed in output
- Used only for your Fern & Feather work

---

*Ready to implement once you provide the keys!*
