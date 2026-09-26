from pathlib import Path
import re

root = Path('.')

# 1) Restore Lydia anywhere the standardized About menu accidentally dropped her.
for p in root.rglob('*.html'):
    s = p.read_text(encoding='utf-8')
    old = s
    if '/connie.html">Connie</a></li>' in s and '/lydia.html">Lydia</a></li>' not in s:
        s = s.replace('/connie.html">Connie</a></li>', '/connie.html">Connie</a></li>\n        <li><a href="/lydia.html">Lydia</a></li>', 1)
    if s != old:
        p.write_text(s, encoding='utf-8')

# 2) Connie: make the headshot, rates, and practice CTA native HTML instead of JS-only overrides.
p = root / 'connie.html'
s = p.read_text(encoding='utf-8')
s = re.sub(
    r'<div class="photo-placeholder"><div><span class="initials">CW</span><strong>Connie Wei, APC</strong><br><small>Headshot coming soon</small></div></div>',
    '<div class="photo-placeholder" style="padding:0;overflow:hidden;"><img src="/images/1000002526.jpg?v=20260925" alt="Connie Wei, Associate Professional Counselor" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:15px;"></div>',
    s,
    count=1,
)
# Replace the Rates & Payment section, preserving surrounding sections.
rate_section = '''<section class="services" id="rates-payment" style="background:var(--cream)"><div class="container"><div class="section-header"><h2>Rates &amp; Payment</h2></div><div style="max-width:700px;margin:0 auto;text-align:center;background:white;padding:2.5rem;border-radius:20px;box-shadow:var(--shadow-soft);"><h3>$135 per session</h3><p>Connie is a private-pay clinician and does not bill insurance.</p><p><strong>Reduced-fee sessions are available from $70–$135</strong> based on financial need and availability. A limited number of sliding-scale spots are available.</p><a href="/contact.html" class="btn btn-primary">Schedule a Consultation</a></div></div></section>'''
# Find a section whose h2 references rate/payment/investment.
pattern = re.compile(r'<section\b[^>]*>.*?<h2>[^<]*(?:Rate|Payment|Investment)[^<]*</h2>.*?</section>', re.I | re.S)
if pattern.search(s):
    s = pattern.sub(rate_section, s, count=1)
else:
    # Insert before the final CTA if no rates section is present.
    idx = s.lower().find('ready to connect with connie')
    if idx != -1:
        sec = s.rfind('<section', 0, idx)
        if sec != -1:
            s = s[:sec] + rate_section + '\n' + s[sec:]

# Replace the final Connie CTA button with practice phone/email while keeping its copy.
cta_match = re.search(r'(<section\b[^>]*>.*?<h2>\s*Ready to Connect With\s*Connie\??\s*</h2>.*?</section>)', s, re.I | re.S)
if cta_match:
    block = cta_match.group(1)
    block = re.sub(r'<a\b[^>]*class="[^"]*btn[^"]*"[^>]*>.*?</a>', '', block, count=1, flags=re.I|re.S)
    if 'connie-practice-contact' not in block:
        contact = '<div class="connie-practice-contact" style="font-size:1.15rem;line-height:2;margin-top:.75rem;"><a href="tel:+17705638334" style="color:inherit;text-decoration:underline;font-weight:600;">770-563-8334</a><br><a href="mailto:info@fernandfeathercounseling.com" style="color:inherit;text-decoration:underline;font-weight:600;">info@fernandfeathercounseling.com</a></div>'
        block = block.replace('</div></section>', contact + '</div></section>', 1)
    s = s[:cta_match.start()] + block + s[cta_match.end():]
p.write_text(s, encoding='utf-8')

# 3) Nicole: make the selected current hero photo native HTML.
p = root / 'nicole.html'
s = p.read_text(encoding='utf-8')
s = re.sub(r'(<div class="therapist-photo">.*?<img\s+src=")[^"]+("[^>]*>)', r'\1/images/64-IMG_2001.jpg\2', s, count=1, flags=re.S)
p.write_text(s, encoding='utf-8')

# 4) About page: make Nicole's manually edited/cropped image native HTML.
p = root / 'about.html'
s = p.read_text(encoding='utf-8')
# Locate Nicole card and replace its first image source.
nicole_pos = s.find('Learn More About Nicole')
if nicole_pos != -1:
    start = max(0, s.rfind('<', 0, max(0, nicole_pos-6000)))
    prefix = s[:nicole_pos]
    img_matches = list(re.finditer(r'<img\b[^>]*src="[^"]+"[^>]*>', prefix, re.I))
    if img_matches:
        m = img_matches[-1]
        tag = m.group(0)
        tag = re.sub(r'src="[^"]+"', 'src="/images/nick%20zoomed.jpg"', tag, count=1)
        # Avoid old zoom transforms now that the edited image itself is cropped.
        tag = re.sub(r'\sstyle="[^"]*"', '', tag, count=1)
        s = s[:m.start()] + tag + s[m.end():]
p.write_text(s, encoding='utf-8')

print('Recovered recent clinician/content edits and Lydia navigation entry.')
