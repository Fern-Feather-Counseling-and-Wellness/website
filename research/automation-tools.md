# Automation Tools for Fern & Feather

*Compiled March 8, 2026 — Ronda's capability research*

---

## Top Automation Platforms

### **Zapier** ⭐ (Best for Beginners)
- **Best for:** Simple workflows, most integrations
- **Pros:** 5,000+ apps, easy to use, reliable
- **Cons:** Expensive at scale, limited customization
- **Cost:** Free tier (100 tasks/month); Starter ~$20/month; Professional ~$50/month
- **Use case:** Connecting Calendly to email, Stripe to spreadsheet

### **Make** (Best Visual Builder)
- **Best for:** Visual workflow design, complex logic
- **Pros:** Drag-and-drop interface, powerful transformations
- **Cons:** Learning curve for advanced features
- **Cost:** Free tier (1,000 ops/month); Core ~$9/month; Pro ~$16/month
- **Use case:** Multi-step automations with conditional logic

### **n8n** (Best for Power Users)
- **Best for:** Complex workflows, high volume, self-hosting
- **Pros:** Open source, most flexible, cheapest at scale
- **Cons:** Steeper learning curve, technical setup
- **Cost:** Free (self-hosted) or ~$20/month (cloud)
- **Use case:** Custom integrations, high-volume automation

---

## Recommended Workflows for Fern & Feather

### **Phase 1: Essential Automations**

**1. New Client Onboarding**
```
Calendly (booking) → Email (welcome sequence) → Google Sheets (client tracker)
```

**2. Payment Notifications**
```
Stripe (payment) → Email (receipt) → Google Sheets (revenue tracking)
```

**3. Lead Magnet Delivery**
```
Email signup (ConvertKit) → Auto-send PDF → Tag for nurture sequence
```

### **Phase 2: Advanced Automations**

**4. Session Reminders**
```
Calendly (24h before session) → SMS reminder → Email prep materials
```

**5. Follow-up Sequences**
```
Session complete → Wait 1 day → Check-in email → Wait 6 days → Resource email
```

**6. Content Repurposing**
```
Blog post published → Auto-share to social → Email newsletter
```

---

## Ronda's Recommendation

**Start with Zapier:**
- Easiest to learn
- Most app integrations
- Can migrate to Make or n8n later as needs grow

**Specific Zaps to Build First:**
1. Calendly → Welcome email
2. Stripe → Payment confirmation
3. Email signup → PDF delivery
4. New booking → Calendar event + reminder

**Cost Estimate:** ~$20-50/month for Zapier Starter/Professional

---

## Integration with Tech Stack

- **Website:** Squarespace/Webflow (embed Zapier webhooks)
- **Scheduling:** Calendly (native Zapier integration)
- **Email:** ConvertKit or Mailchimp (Zapier connected)
- **Payments:** Stripe (Zapier connected)
- **Storage:** Google Drive/Dropbox (Zapier connected)

---

## Alternative: All-in-One Practice Management

**Jane App or SimplePractice** include many automations built-in:
- Appointment reminders
- Payment processing
- Client portal
- Insurance claims (if needed later)

**Trade-off:** Less customization, but simpler setup

---

*Sources: Digidop, n8n Blog, Webspacekit, Parseur (2025-2026 data)*