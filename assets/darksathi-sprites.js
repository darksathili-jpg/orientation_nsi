(()=>{'use strict';
const source='assets/personnages/Planche%20de%20sprites%20du%20cyber-chat%20lyc%C3%A9en.png';
function mount(){
 const avatars=[...document.querySelectorAll('#darksathi-assistant .darksathi-avatar')];
 // Le compagnon utilise immédiatement la même planche sur les deux pages.
 for(const avatar of avatars){
   avatar.replaceChildren();
   const sprite=document.createElement('span');
   sprite.className='darksathi-sprite is-animated';
   sprite.setAttribute('aria-hidden','true');
   avatar.append(sprite);
 }
 // La première page contient déjà sa figure. Compatibilité avec l'atelier.
 const hero=document.querySelector('main .hero,main .hero-section,header.hero,.hero');
 if(hero&&!hero.querySelector('.darksathi-hero')){
   let visual=hero.querySelector('.hero-visual,.hero-art,.hero-graphic,.hero-illustration,.hero-image,.hero-right');
   if(!visual){const svg=[...hero.querySelectorAll('svg')].find(el=>el.getBoundingClientRect().width>110);if(svg)visual=svg.parentElement}
   if(visual){
     const figure=document.createElement('figure');
     figure.className='darksathi-hero';
     figure.setAttribute('aria-label','Darksathi Li, compagnon d’orientation');
     figure.innerHTML='<span class="darksathi-sprite is-animated" aria-hidden="true"></span><figcaption>Darksathi Li · Ton guide d’orientation</figcaption>';
     visual.replaceWith(figure);
   }
 }
 const img=new Image();
 img.onerror=()=>{document.querySelectorAll('.darksathi-sprite').forEach(el=>{el.classList.remove('is-animated');el.setAttribute('title','Image du compagnon indisponible')});console.error('Darksathi Li : impossible de charger la planche',source)};
 img.src=source;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();