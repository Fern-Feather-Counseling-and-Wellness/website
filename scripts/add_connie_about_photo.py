from pathlib import Path
p=Path('about.html')
s=p.read_text(encoding='utf-8')
old='<h3>Connie Wei</h3>'
new='<h3>Connie</h3>'
if old not in s:
    raise SystemExit('Connie full-name card heading not found; refusing to alter other content')
s=s.replace(old,new,1)
p.write_text(s,encoding='utf-8')
