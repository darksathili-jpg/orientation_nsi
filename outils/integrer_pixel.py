from pathlib import Path
pages={
 'index.html':[('assets/pixel-guide.css','css'),('assets/darksathi-li.css','css'),('assets/typographie-correctif.css','css'),('assets/darksathi-li.js','js')],
 'atelier-original.html':[('assets/atelier-bd.css','css'),('assets/darksathi-li.css','css'),('assets/typographie-correctif.css','css'),('assets/metiers-missions.css','css'),('assets/darksathi-li.js','js'),('assets/metiers-missions.js','js')]
}
for filename,assets in pages.items():
 p=Path(filename)
 if not p.exists():raise SystemExit(f'Page introuvable: {filename}')
 text=p.read_text(encoding='utf-8')
 # Supprimer les anciens scripts d'assistant afin d'éviter les doublons.
 for legacy in ['assets/pixel-guide.js','assets/atelier-pixel.js']:
  text=text.replace(f'<script defer src="{legacy}"></script>','')
 for asset,kind in assets:
  if asset in text:continue
  if kind=='css':
   assert '</head>' in text
   text=text.replace('</head>',f'<link rel="stylesheet" href="{asset}"></head>',1)
  else:
   assert '</body>' in text
   text=text.replace('</body>',f'<script defer src="{asset}"></script></body>',1)
 p.write_text(text,encoding='utf-8')
 print(filename,', '.join(a for a,_ in assets))
