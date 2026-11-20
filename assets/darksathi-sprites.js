(()=>{'use strict';
const source='assets/personnages/darksathi-li-spritesheet.png';
function install(){const img=new Image();img.onload=()=>{if(img.naturalWidth<3||img.naturalHeight<4)return;
 document.querySelectorAll('#darksathi-assistant .darksathi-avatar').forEach(el=>{el.textContent='';const sprite=document.createElement('span');sprite.className='darksathi-sprite is-animated';sprite.setAttribute('aria-hidden','true');el.append(sprite)});
 const hero=document.querySelector('main .hero,main .hero-section,header.hero,.hero');
 if(!hero||hero.querySelector('.darksathi-hero'))return;
 let visual=hero.querySelector('.hero-visual,.hero-art,.hero-graphic,.hero-illustration,.hero-image,.hero-right');
 if(!visual){const svg=[...hero.querySelectorAll('svg')].find(el=>el.getBoundingClientRect().width>110);if(svg)visual=svg.parentElement}
 if(!visual)return;
 const figure=document.createElement('figure');figure.className='darksathi-hero';figure.setAttribute('aria-label','Darksathi Li, ton compagnon pour explorer les formations');figure.innerHTML='<span class="darksathi-sprite is-animated" aria-hidden="true"></span><figcaption>Darksathi Li · Ton guide d’orientation</figcaption>';
 visual.replaceWith(figure);
 };img.onerror=()=>{console.info('Planche Darksathi Li absente : déposer '+source)};img.src=source;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();