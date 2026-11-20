from pathlib import Path
pages={
 'index.html':[('assets/pixel-guide.css','css'),('assets/pixel-guide.js','js')],
 'atelier-original.html':[('assets/atelier-bd.css','css'),('assets/atelier-pixel.js','js')]
}
for filename,assets in pages.items():
 p=Path(filename)
 if not p.exists():
  raise SystemExit(f'Page introuvable: {filename}')
 text=p.read_text(encoding='utf-8')
 for asset,kind in assets:
  if asset in text:continue
  if kind=='css':
   assert '</head>' in text, f'Balise head manquante: {filename}'
   text=text.replace('</head>',f'<link rel="stylesheet" href="{asset}"></head>',1)
  else:
   assert '</body>' in text, f'Balise body manquante: {filename}'
   text=text.replace('</body>',f'<script defer src="{asset}"></script></body>',1)
 p.write_text(text,encoding='utf-8')
 print(filename,', '.join(a for a,_ in assets))
