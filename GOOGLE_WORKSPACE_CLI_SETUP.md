# Google Workspace CLI Setup for Fern & Feather

*Started March 8, 2026*

## What This Enables

Direct AI control over Google Workspace:
- **Drive:** Create folders, manage files, organize client documents
- **Gmail:** Draft emails, organize communications
- **Calendar:** Schedule sessions, manage availability
- **Sheets:** Track clients, revenue, metrics
- **Docs:** Generate intake forms, session notes, reports

## Installation

```bash
npm install -g @googleworkspace/cli
```

## Authentication Required

1. Google Cloud project with OAuth credentials
2. Enable Workspace APIs (Drive, Gmail, Calendar, Sheets, Docs)
3. OAuth consent screen configuration
4. Download credentials.json

## Key Commands

```bash
# Check installation
gws --version

# List Drive files
gws drive files list

# Create folder
gws drive files create --name "Fern & Feather Clients" --mimeType folder

# Create Doc from template
gws docs documents create --title "Client Intake - [Name]"

# Add Calendar event
gws calendar events create --summary "Session with [Client]"

# Update Sheet
gws sheets spreadsheets values update --spreadsheetId [ID] --range A1 --values "[[data]]"
```

## MCP Integration

The CLI includes MCP server mode:
```bash
gws mcp
```

This exposes Workspace APIs as structured tools for AI agents.

## Use Cases for Fern & Feather

1. **New Client Onboarding**
   - Create Drive folder structure
   - Generate intake documents
   - Add to tracking spreadsheet
   - Send welcome email

2. **Session Management**
   - Create calendar events
   - Generate session notes template
   - Track attendance
   - Follow-up reminders

3. **Document Generation**
   - Professional PDFs from templates
   - Auto-filled client info
   - Progress reports

4. **Business Intelligence**
   - Revenue tracking
   - Client metrics
   - Automated reporting

## Status

- [x] Install CLI
- [x] Set up Google Cloud project
- [x] Configure OAuth
- [x] Test basic commands — **WORKING** (authenticated as nicole.e.browning@gmail.com)
- [ ] Build Fern & Feather automations

---

*This is a game-changer for automation.*