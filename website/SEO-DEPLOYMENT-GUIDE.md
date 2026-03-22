# Fern & Feather Website - SEO Strategy & Deployment Guide

## Overview

Complete 4-page website built with SEO best practices, conversion optimization, and the cottage core aesthetic you requested.

---

## 🎨 Design Summary

**Aesthetic:** Cottage Core + Clinical Professional
- **Colors:** Sage greens (#6b7f5a, #8a9b78), warm cream backgrounds, soft botanical accents
- **Typography:** Playfair Display (headings) + Source Sans 3 (body)
- **Vibe:** Warm, welcoming, nature-inspired, but professional and trustworthy

**Pages Built:**
1. **index.html** - Homepage with hero, services preview, about teaser, lead magnet, testimonials, FAQ
2. **about.html** - Full therapist bios (Nicole & Kiera), practice story, values
3. **services.html** - Detailed services with pricing ($200 individual, $250 couples, $75 group, $150 supervision)
4. **resources.html** - Free downloads, blog preview, crisis resources

---

## 🚀 Deployment Options

Since you have the domain but no hosting yet, here are your best options:

### Option 1: Netlify (RECOMMENDED - Free & Easy)
**Best for:** Quick deployment, free SSL, automatic Git integration

**Steps:**
1. Create account at netlify.com (use GitHub login)
2. Drag & drop the `website/` folder to Netlify dashboard
3. OR connect your GitHub repo for auto-deploy
4. Add your custom domain in Settings > Domain Management
5. Update DNS with your domain registrar to point to Netlify

**Pros:** Free, fast, automatic HTTPS, global CDN
**Cons:** None for a basic site

### Option 2: Vercel (Also Free & Great)
**Best for:** If you plan to add dynamic features later

**Steps:**
1. Create account at vercel.com
2. Import your GitHub repository
3. Set root directory to `website/`
4. Deploy and add custom domain

### Option 3: Traditional Web Hosting (Bluehost, SiteGround, etc.)
**Best for:** If you want email hosting with your domain

**Steps:**
1. Purchase hosting plan ($5-15/month)
2. Upload files via FTP or File Manager
3. Point domain to hosting nameservers

---

## 📊 SEO Implementation

### On-Page SEO (Already Done)

**Meta Tags (Every Page):**
- ✅ Title tags optimized for local search
- ✅ Meta descriptions with keywords
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Schema.org JSON-LD markup for MedicalBusiness

**Technical SEO:**
- ✅ Semantic HTML5 structure
- ✅ Mobile-responsive design
- ✅ Fast loading (no heavy frameworks)
- ✅ Alt text ready for images
- ✅ Internal linking structure
- ✅ Clean URL structure

**Content SEO:**
- ✅ Local keywords (Alpharetta, GA, Georgia therapist)
- ✅ Long-tail keywords (LGBTQ affirming therapy, trauma-informed counseling)
- ✅ Service-specific content
- ✅ FAQ section for voice search

### Local SEO Checklist

**Google Business Profile (CRITICAL - Do This First):**
- [ ] Claim/create Google Business Profile
- [ ] Use exact name: "Fern & Feather Wellness Center"
- [ ] Add address (even if just city for now)
- [ ] Add service areas: Alpharetta, Johns Creek, Roswell, Cumming, Atlanta
- [ ] Upload professional photos
- [ ] Add services with descriptions
- [ ] Set business hours
- [ ] Add booking link
- [ ] Encourage reviews from first clients

**Local Citations (Build These):**
- Psychology Today directory listing
- TherapyDen profile
- GoodTherapy listing
- Yelp (mental health category)
- Apple Maps
- Bing Places
- Local business directories

**NAP Consistency:**
Make sure Name, Address, Phone are IDENTICAL across:
- Website
- Google Business Profile
- All directory listings
- Social media profiles

---

## 📝 Content Marketing Strategy

### Blog Topics to Write (SEO-Focused)

**High Priority (Write These First):**
1. "Trauma-Informed Therapy in Alpharetta: What to Expect"
2. "LGBTQ Affirming Therapy in Georgia: A Complete Guide"
3. "EMDR Therapy in Alpharetta: How It Works"
4. "Anxiety Treatment in Alpharetta: Evidence-Based Approaches"
5. "Couples Therapy in Alpharetta: Preparing for Your First Session"

**Medium Priority:**
6. "Internal Family Systems Therapy Explained"
7. "Somatic Therapy for Trauma: The Science"
8. "Group Therapy vs Individual Therapy: Which Is Right?"
9. "Understanding Your Nervous System: Polyvagal Theory"
10. "Attachment Styles in Adult Relationships"

**Blog Best Practices:**
- 1,500+ words per post
- Include local keywords naturally
- Add internal links to services pages
- Include call-to-action at end
- Add meta description
- Optimize images with alt text

---

## 🔧 Next Steps (Priority Order)

### Immediate (This Week)
1. **Choose hosting** (Netlify recommended)
2. **Deploy website** 
3. **Set up Google Business Profile**
4. **Add actual contact info** (phone, email)
5. **Replace placeholder images** with real photos:
   - Professional headshots of Nicole & Kiera
   - Office/therapy room photos
   - Nature/botanical imagery for backgrounds

### Short Term (Next 2 Weeks)
6. **Create Psychology Today profile**
7. **Set up Google Analytics**
8. **Set up Google Search Console**
9. **Create social media accounts** (Instagram, Facebook, LinkedIn)
10. **Write first 3 blog posts**

### Medium Term (Next Month)
11. **Build email list** with lead magnet
12. **Get first 5 Google reviews**
13. **Add to 5+ therapy directories**
14. **Create backlink strategy** (guest posts, podcasts, local partnerships)
15. **Start local SEO link building**

---

## 📈 Tracking & Analytics

**Set Up:**
1. **Google Analytics 4** - Track visitors, behavior, conversions
2. **Google Search Console** - Monitor search performance, fix issues
3. **Hotjar or Microsoft Clarity** - Heatmaps to see where people click

**Key Metrics to Watch:**
- Organic search traffic
- Contact form submissions
- Phone number clicks
- Time on site
- Bounce rate
- Page views per session
- Conversion rate (contact/booking)

---

## 🎯 Conversion Optimization

**Already Implemented:**
- ✅ Clear CTAs on every page
- ✅ Lead magnet (free anxiety toolkit)
- ✅ Email capture form
- ✅ FAQ to overcome objections
- ✅ Trust signals (credentials, testimonials)
- ✅ Multiple contact methods

**To Add Later:**
- [ ] Online booking widget (SimplePractice, TherapyNotes, or Acuity)
- [ ] Live chat (optional)
- [ ] Exit-intent popup for lead magnet
- [ ] Social proof notifications
- [ ] Video testimonials

---

## 🔒 Legal & Compliance

**Required Pages (Add These):**
- [ ] Privacy Policy (HIPAA-compliant)
- [ ] Terms of Service
- [ ] Accessibility Statement
- [ ] Cookie Policy (if using analytics)

**HIPAA Considerations:**
- Use HIPAA-compliant contact forms (JotForm, Cognito Forms)
- Don't include identifying client info in testimonials
- Secure hosting with SSL (included with Netlify/Vercel)

---

## 📁 File Structure

```
website/
├── index.html          # Homepage
├── about.html          # About us / Team
├── services.html       # Services & pricing
├── resources.html      # Blog & free resources
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── main.js         # Interactive features
└── images/             # (Add your photos here)
```

---

## 💡 Pro Tips

**For Faster Rankings:**
1. **Get reviews ASAP** - Google reviews are #1 local ranking factor
2. **Create content consistently** - Blog 1-2x per month minimum
3. **Build local backlinks** - Partner with other Alpharetta businesses
4. **Use schema markup** - Already done, but verify with Google's Rich Results Test
5. **Optimize for voice search** - Answer questions conversationally in content

**Content That Converts:**
- "How to Choose a Therapist in Alpharetta"
- "What to Expect in Your First Therapy Session"
- "Signs You Might Benefit from Therapy"
- "Therapy vs Coaching: What's the Difference?"

---

## 📞 Domain & DNS Setup

**When you're ready to connect your domain:**

1. **If using Netlify:**
   - Go to Site Settings > Domain Management
   - Add custom domain
   - Update DNS records at your registrar:
     - A record: 75.2.60.5
     - CNAME: www > [your-site].netlify.app

2. **If using traditional hosting:**
   - Get nameservers from hosting provider
   - Update at domain registrar
   - Wait 24-48 hours for propagation

---

## ✅ Pre-Launch Checklist

- [ ] Replace all placeholder content with actual info
- [ ] Add real phone number and email
- [ ] Upload professional photos
- [ ] Test all links
- [ ] Test contact form
- [ ] Check mobile responsiveness
- [ ] Verify SSL certificate (HTTPS)
- [ ] Set up Google Analytics
- [ ] Set up Google Search Console
- [ ] Submit sitemap to Google
- [ ] Create 301 redirects (if replacing old site)
- [ ] Test page speed (aim for <3 seconds)

---

## 🚀 You're Ready!

The website is built, optimized, and ready to deploy. The foundation for strong SEO is in place. Focus on:
1. Deploying to hosting
2. Setting up Google Business Profile
3. Creating consistent content
4. Building reviews and backlinks

Want me to help with any specific part of the deployment or create additional content?
