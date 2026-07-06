# Mega Sync API Reference

## Hindsight Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Database connection check |
| `/version` | GET | API version |
| `/v1/default/banks` | GET | List banks |
| `/v1/default/banks/default/profile` | GET | Profile settings |
| `/v1/default/banks/default/config` | GET | Configuration |
| `/v1/default/banks/default/directives` | GET | Active directives |
| `/v1/default/banks/default/memories/list` | GET | Memory list |
| `/v1/default/banks/default/entities` | GET | Entities |
| `/v1/default/banks/default/mental-models` | GET | Mental models |
| `/v1/default/banks/default/documents` | GET | Documents |
| `/v1/default/banks/default/tags` | GET | Tags |
| `/v1/default/banks/default/graph` | GET | Graph |
| `/v1/default/banks/default/stats` | GET | Statistics |
| `/v1/default/banks/default/operations` | GET | Operations |
| `/v1/default/banks/default/memories/recall` | POST | Semantic recall |
| `/v1/default/banks/default/reflect` | POST | Memory synthesis |

## Common Queries

### Reflect Query
```bash
curl -s --max-time 90 -X POST "https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/reflect" \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the current state of the human-AI partnership?"}'
```

### Recall Query
```bash
curl -s -X POST "https://glutinous-meda-excrescently.ngrok-free.dev/v1/default/banks/default/memories/recall" \
  -H "Content-Type: application/json" \
  -d '{"query": "recent sessions", "maxResults": 5}'
```

## Status Indicators

| Status | Meaning |
|--------|---------|
| 200 OK | Success |
| 404 Not Found | Endpoint wrong or resource missing |
| 500 Error | Server issue |
| Connection failed | ngrok tunnel down |

---

*Last updated: April 24, 2026*