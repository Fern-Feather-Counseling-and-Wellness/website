from pathlib import Path
p=Path('about.html')
s=p.read_text(encoding='utf-8')
old='<div class="therapist-avatar" aria-label="Connie Wei, APC" style="font-family:\'Playfair Display\',serif;color:var(--sage-700);">CW</div>'
new='<div class="therapist-avatar"><img loading="lazy" src="/images/1000002526.jpg?v=20260925" alt="Connie Wei, APC"></div>'
if old not in s:
    raise SystemExit('Connie placeholder not found; refusing to alter other content')
s=s.replace(old,new,1)
p.write_text(s,encoding='utf-8')
