const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const out='artifacts/visual-audit';fs.mkdirSync(out,{recursive:true});
 const failures=[];const report=[];
 const cases=[['accueil','index.html'],['atelier','atelier-original.html']];
 const sizes=[['desktop',1440,900],['tablette',820,1180],['mobile',390,844]];
 for(const [label,file] of cases)for(const [device,width,height] of sizes){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce',deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8765/'+file,{waitUntil:'networkidle',timeout:45000});
  await page.screenshot({path:path.join(out,label+'-'+device+'.png'),fullPage:true,animations:'disabled'});
  const audit=await page.evaluate(()=>{
   const sprite=[...document.querySelectorAll('.darksathi-sprite')];
   const title=document.querySelector('h1');
   const root=document.documentElement;
   const hero=title?.getBoundingClientRect();
   const header=document.querySelector('header')?.getBoundingClientRect();
   const titleStyle=title?getComputedStyle(title):null;
   const heroVisible=hero?hero.bottom>0&&hero.top>=-2&&hero.left>=-2&&hero.right<=innerWidth+2:false;
   const titleObscured=!!(hero&&header&&header.bottom>hero.top+2&&header.top<=hero.top&&getComputedStyle(document.querySelector('header')).position==='sticky');
   const spriteData=sprite.map(e=>{const rect=e.getBoundingClientRect();const style=getComputedStyle(e);const frames=[...e.querySelectorAll('.ds-frame')];return {width:Math.round(rect.width),height:Math.round(rect.height),visible:rect.width>0&&rect.height>0&&style.visibility!=='hidden'&&style.display!=='none',background:style.backgroundImage,backgroundSize:style.backgroundSize,backgroundPosition:style.backgroundPosition,frames:frames.length}});
   return {title:title?.textContent?.trim(),titleFont:titleStyle?.fontFamily,heroVisible,titleObscured,sprites:spriteData,horizontalOverflow:root.scrollWidth>innerWidth+2,assistant:!!document.getElementById('darksathi-assistant'),mission:!!document.getElementById('mission-lab')};
  });
  const item={page:label,device,width,height,...audit,errors};report.push(item);
  if(!audit.sprites.length)failures.push(label+' '+device+': personnage absent');
  if(audit.sprites.some(s=>!s.visible||s.background==='none'||s.frames!==0))failures.push(label+' '+device+': sprite absent, invisible ou calques superposés');
  if(audit.sprites.some(s=>s.backgroundSize!=='300% 400%'||!['0% 0%','50% 0%','100% 0%'].includes(s.backgroundPosition)))failures.push(label+' '+device+': découpage de planche inattendu');
  if(!audit.heroVisible||audit.titleObscured)failures.push(label+' '+device+': titre principal coupé ou masqué par la navigation');
  if(audit.horizontalOverflow)failures.push(label+' '+device+': débordement horizontal');
  if(!audit.assistant)failures.push(label+' '+device+': assistant absent');
  if(label==='atelier'&&!audit.mission)failures.push(label+' '+device+': missions absentes');
  if(errors.length)failures.push(label+' '+device+': erreur JavaScript '+errors.join(' | '));
  await page.close();
 }
 fs.writeFileSync(path.join(out,'rapport.json'),JSON.stringify({report,failures},null,2));
 await browser.close();
 console.log(JSON.stringify({failures,report:report.map(x=>({page:x.page,device:x.device,sprites:x.sprites.length,overflow:x.horizontalOverflow,errors:x.errors.length}))},null,2));
 if(failures.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
