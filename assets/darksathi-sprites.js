(()=>{'use strict';
const source='assets/personnages/Planche%20de%20sprites%20du%20cyber-chat%20lyc%C3%A9en.png';
function frames(host){if(host.querySelector('.ds-frame'))return;host.textContent='';for(let i=0;i<3;i++){const frame=document.createElement('span');frame.className='ds-frame';frame.setAttribute('aria-hidden','true');host.append(frame)}}
function recolor(img){
 try{
  const canvas=document.createElement('canvas');canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;
  const ctx=canvas.getContext('2d',{willReadFrequently:true});if(!ctx)return;
  ctx.drawImage(img,0,0);const data=ctx.getImageData(0,0,canvas.width,canvas.height),p=data.data;
  // Recoloration sélective des violets/magenta (veste, accessoires), sans toucher aux yeux ni aux accents orange.
  for(let i=0;i<p.length;i+=4){if(p[i+3]<12)continue;
   let r=p[i]/255,g=p[i+1]/255,b=p[i+2]/255;
   const max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;if(d<.07||max<.12)continue;
   let hue;if(max===r)hue=((g-b)/d)%6;else if(max===g)hue=(b-r)/d+2;else hue=(r-g)/d+4;
   hue=(hue*60+360)%360;
   if(hue<265||hue>345)continue;
   const strength=Math.min(.92,Math.max(0,(hue-265)/25),Math.max(0,(345-hue)/25))*.84;
   const light=(max+min)/2;
   const target=[.14+light*.26,.47+light*.43,.47+light*.35];
   p[i]=Math.round((r*(1-strength)+target[0]*strength)*255);
   p[i+1]=Math.round((g*(1-strength)+target[1]*strength)*255);
   p[i+2]=Math.round((b*(1-strength)+target[2]*strength)*255);
  }
  ctx.putImageData(data,0,0);
  document.documentElement.style.setProperty('--darksathi-sheet','url("'+canvas.toDataURL('image/png')+'")');
 }catch(e){console.warn('Darksathi Li: recoloration non disponible; image originale conservée',e)}
}
function mount(){
 document.querySelectorAll('#darksathi-assistant .darksathi-avatar').forEach(avatar=>{
  avatar.textContent='';const sprite=document.createElement('span');sprite.className='darksathi-sprite';sprite.setAttribute('aria-hidden','true');frames(sprite);avatar.append(sprite);
 });
 const hero=document.querySelector('main .hero,main .hero-section,header.hero,.hero');
 if(hero&&!hero.querySelector('.darksathi-hero')){
  let visual=hero.querySelector('.hero-visual,.hero-art,.hero-graphic,.hero-illustration,.hero-image,.hero-right');
  if(visual){const figure=document.createElement('figure');figure.className='darksathi-hero';figure.setAttribute('aria-label','Darksathi Li, compagnon d’orientation');figure.innerHTML='<span class="darksathi-sprite"></span><figcaption>Darksathi Li · Ton guide d’orientation</figcaption>';visual.replaceWith(figure)}
 }
 document.querySelectorAll('.darksathi-sprite').forEach(frames);
 const img=new Image();img.onload=()=>recolor(img);img.onerror=()=>console.error('Image Darksathi Li indisponible : '+source);img.src=source;
 // Si le panneau est injecté après ce script, le suivre sans dupliquer le compagnon.
 const observer=new MutationObserver(()=>{const avatar=document.querySelector('#darksathi-assistant .darksathi-avatar');if(avatar&&!avatar.querySelector('.darksathi-sprite')){const s=document.createElement('span');s.className='darksathi-sprite';frames(s);avatar.replaceChildren(s)}});observer.observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();