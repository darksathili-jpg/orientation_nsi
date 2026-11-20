const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const out='artifacts/visual-audit';fs.mkdirSync(out,{recursive:true});
 const failures=[];const report=[];
 const cases=[['accueil','index.html'],['atelier','atelier-original.html']];
 const sizes=[['desktop',1440,900],['mobile',390,844]];
 for(const [label,file] of cases)for(const [device,width,height] of sizes){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce',deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8765/'+file,{waitUntil:'networkidle',timeout:45000});
  await page.screenshot({path:path.join(out,label+'-'+device+'.png'),fullPage:true,animations:'disabled'});
  const audit=await page.evaluate(()=>{
   const sprite=[...document.querySelectorAll('.darksathi-sprite')];
   const title=document.querySelector('h1');
   const root=document.documentElement;
   const spriteData=sprite.map(e=>({width:Math.round(e.getBoundingClientRect().width),height:Math.round(e.getBoundingClientRect().height),background:getComputedStyle(e).backgroundImage,visible:e.getBoundingClientRect().width>0}));
   return {title:title?.textContent?.trim(),titleFont:title?getComputedStyle(title).fontFamily:null,sprites:spriteData,horizontalOverflow:root.scrollWidth>innerWidth+2,assistant:!!document.getElementById('darksathi-assistant'),mission:!!document.getElementById('mission-lab')};
  });
  const item={page:label,device,width,height,...audit,errors};report.push(item);
  if(!audit.sprites.length)failures.push(label+' '+device+': personnage absent');
  if(audit.sprites.some(s=>s.background==='none'||!s.visible))failures.push(label+' '+device+': sprite non visible');
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
