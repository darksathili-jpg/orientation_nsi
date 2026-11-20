from pathlib import Path
p=Path('index.html')
s=p.read_text(encoding='utf-8')
css='<link rel="stylesheet" href="assets/pixel-guide.css">'
js='<script defer src="assets/pixel-guide.js"></script>'
if css not in s:s=s.replace('</head>',css+'</head>',1)
if js not in s:s=s.replace('</body>',js+'</body>',1)
p.write_text(s,encoding='utf-8')
print('Integrated Pixel guide into index.html',len(s))
