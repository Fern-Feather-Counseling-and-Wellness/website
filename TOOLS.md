# TOOLS.md

Skills define how tools work. This file is for your specifics — the stuff that's unique to your setup.

*(Add tool-specific notes as you learn the user's setup.)*

---

## ClawHub Skills Inventory (Updated March 16, 2026)

### Already Installed (Bundled)
| Skill | Use Case for Fern & Feather |
|-------|----------------------------|
| `nano-pdf` | Natural language PDF editing for workbook layouts |
| `sag` | ElevenLabs TTS for TikTok voiceovers, audiobook content |
| `openai-image-gen` | Marketing images, Instagram carousels, lead magnet graphics |
| `github` | Repository sync, version control for all documents |
| `notion` | Wiki/documentation platform (potential use) |
| `weather` | Client-facing wellness content (somatic + seasonal) |

### Discovered on ClawHub (Not Installed)
| Skill | Description | Potential Use |
|-------|-------------|---------------|
| `awspace/pdf` | Comprehensive PDF toolkit — forms, merge, split, extract | Filling intake forms programmatically, combining workbook chapters |
| `billylui/calendar-scheduling` | Google/Outlook/CalDAV scheduling | Client booking integration when practice launches |
| `thesethrose/marketing-mode` | 23-skill marketing bundle (strategy, SEO, CRO, content) | TikTok strategy optimization, landing page copy |
| `sanky369/tweet-writer` | Viral tweet/thread writer with niche research | Twitter/X content for professional audience |

### Newly Discovered Skills (March 16, 2026 Check)
| Skill | Description | Potential Use |
|-------|-------------|---------------|
| `billylui/calendar-scheduling` | Temporal Cortex router — Google/Outlook/CalDAV scheduling, availability merging, atomic booking via Two-Phase Commit | Client booking integration when practice launches; multi-calendar support prevents double-booking |
| `awspace/pdf` | Comprehensive PDF toolkit using pypdf/pdfplumber — merge, split, extract text/tables, fill forms | Filling intake forms programmatically, combining workbook chapters, processing client documents |

### Installation Notes
- Skills install via: `clawhub install <skill-slug>` or paste GitHub URL into chat
- Priority installs for launch: `billylui/calendar-scheduling` (booking), `awspace/pdf` (forms)
- The `awspace/pdf` skill provides pypdf and pdfplumber libraries for programmatic PDF manipulation
- `billylui/calendar-scheduling` requires OAuth credentials for calendar providers
- ClawHub registry: 13,729 skills as of Feb 28, 2026; 5,366 curated in awesome list
