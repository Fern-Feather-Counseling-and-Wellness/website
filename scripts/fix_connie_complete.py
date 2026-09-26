from pathlib import Path

p = Path('connie.html')
s = p.read_text(encoding='utf-8')

old_photo = '<div class="photo-placeholder"><div><span class="initials">CW</span><strong>Connie Wei, APC</strong><br><small>Headshot coming soon</small></div></div>'
new_photo = '<div class="photo-placeholder" style="padding:0;overflow:hidden;"><img src="/images/1000002526.jpg?v=20260925" alt="Connie Wei, Associate Professional Counselor" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:15px;"></div>'
if old_photo in s:
    s = s.replace(old_photo, new_photo, 1)

rate_section = '<section class="services" id="rates-payment" style="background:var(--cream)"><div class="container"><div class="section-header"><h2>Rates &amp; Payment</h2></div><div style="max-width:700px;margin:0 auto;text-align:center;background:white;padding:2.5rem;border-radius:20px;box-shadow:var(--shadow-soft);"><h3>$135 per session</h3><p>Connie is a private-pay clinician and does not bill insurance.</p><p><strong>Reduced-fee sessions are available from $70–$135</strong> based on financial need and availability. A limited number of sliding-scale spots are available.</p><a href="/contact.html" class="btn btn-primary">Schedule a Consultation</a></div></div></section>'
cta_marker = '<section class="lead-magnet"><div class="container" style="text-align:center"><h2>Ready to Connect With Connie?</h2>'
if 'id="rates-payment"' not in s and cta_marker in s:
    s = s.replace(cta_marker, rate_section + '\n' + cta_marker, 1)

old_cta_button = '<a href="contact.html" class="btn btn-primary" style="background:#fff;color:var(--sage-700)">Schedule a Consultation</a>'
contact = '<div class="connie-practice-contact" style="font-size:1.15rem;line-height:2;margin-top:.75rem;"><a href="tel:+17705638334" style="color:inherit;text-decoration:underline;font-weight:600;">770-563-8334</a><br><a href="mailto:info@fernandfeathercounseling.com" style="color:inherit;text-decoration:underline;font-weight:600;">info@fernandfeathercounseling.com</a></div>'
if old_cta_button in s:
    s = s.replace(old_cta_button, contact, 1)

p.write_text(s, encoding='utf-8')
