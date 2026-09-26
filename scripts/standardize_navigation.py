from pathlib import Path
import re

NAV = '''<nav class="site-nav" aria-label="Primary navigation">
  <style>
    .site-nav{font-family:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial;position:relative;z-index:1001;background:#fff;border-bottom:1px solid #eee}
    .site-nav .container{max-width:1500px;margin:0 auto;padding:12px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;position:relative}
    .site-nav .logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:inherit;font-weight:700;white-space:nowrap}
    .site-nav .logo .mark{width:44px;height:44px;border-radius:10px;background:#b0bda3;display:flex;align-items:center;justify-content:center}
    .site-nav .nav-links{list-style:none;display:flex;gap:clamp(10px,1.4vw,24px);margin:0;padding:0;align-items:center;white-space:nowrap}
    .site-nav .nav-links a{color:inherit;text-decoration:none;padding:6px 8px;border-radius:6px}
    .site-nav .nav-links .dropdown{position:relative}
    .site-nav .nav-links .dropdown-menu{display:none;position:absolute;top:100%;left:0;background:#fff;border:1px solid #eee;padding:14px 8px 8px;list-style:none;min-width:220px;box-shadow:0 8px 24px rgba(0,0,0,.08);z-index:1002}
    .site-nav .nav-links .dropdown-menu li{padding:4px 0;white-space:nowrap}
    .site-nav .nav-links .dropdown:hover .dropdown-menu,.site-nav .nav-links .dropdown:focus-within .dropdown-menu{display:block}
    .site-nav .mobile-menu-btn{display:none}
    @media(max-width:1100px){.site-nav .container{padding:10px 16px}.site-nav .nav-links{display:none}.site-nav .mobile-menu-btn{display:inline-block!important}.site-nav .nav-links.mobile-open{display:flex!important;flex-direction:column;align-items:stretch;position:absolute;top:100%;left:0;right:0;background:#fdfcfb;padding:1rem;gap:.5rem;box-shadow:0 4px 12px rgba(0,0,0,.1);z-index:1002}.site-nav .nav-links.mobile-open .dropdown-menu{position:static;box-shadow:none;border:0;padding-left:1rem;display:block}}
  </style>
  <div class="container">
    <a href="/index.html" class="logo" aria-label="Fern & Feather homepage"><img src="/images/logo-mark-final.svg" alt="F&F" class="mark"><span>Fern & Feather</span></a>
    <button class="mobile-menu-btn" aria-label="Open menu" type="button" onclick="var n=this.parentElement.querySelector('.nav-links');n.classList.toggle('mobile-open');">☰</button>
    <ul class="nav-links">
      <li class="dropdown"><a href="/about.html" class="dropdown-toggle">About ▾</a><ul class="dropdown-menu" role="menu">
        <li><a href="/about.html">About the Practice</a></li>
        <li><a href="/nicole.html">Nicole</a></li>
        <li><a href="/kiera.html">Kiera</a></li>
        <li><a href="/connie.html">Connie</a></li>
        <li><a href="/our-place.html">Our Place</a></li>
      </ul></li>
      <li><a href="/services.html">Services</a></li>
      <li><a href="/rates.html">Rates</a></li>
      <li><a href="/faq.html">FAQs</a></li>
      <li class="dropdown"><a href="/resources.html" class="dropdown-toggle">Resources ▾</a><ul class="dropdown-menu" role="menu">
        <li><a href="/crisis.html">Crisis Resources</a></li>
        <li><a href="/tools.html">Free Tools</a></li>
        <li><a href="/blog.html">Blog</a></li>
      </ul></li>
      <li><a href="/join-our-team.html">Join Us</a></li>
      <li><a href="/contact.html" style="background:#b0bda3;color:#fff;padding:10px 16px;border-radius:10px;text-decoration:none;font-weight:600">Schedule Consult</a></li>
    </ul>
  </div>
</nav>'''

pattern = re.compile(r'<nav\s+class=["\']site-nav["\'][^>]*>.*?</nav>', re.I | re.S)
changed = []
for path in Path('.').rglob('*.html'):
    # Backups/templates are not deployed pages.
    if '.git' in path.parts or path.name.endswith('.bak'):
        continue
    text = path.read_text(encoding='utf-8')
    if not pattern.search(text):
        continue
    new_text, count = pattern.subn(NAV, text, count=1)
    if count and new_text != text:
        path.write_text(new_text, encoding='utf-8')
        changed.append(str(path))
print(f'Standardized navigation in {len(changed)} HTML files')
for p in changed:
    print(p)
