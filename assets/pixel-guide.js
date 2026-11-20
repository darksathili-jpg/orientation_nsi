(()=>{'use strict';
const ready=()=>{const guide=document.getElementById('chat-guide');if(!guide||document.getElementById('pixel-controls'))return;
const bubble=document.getElementById('chat-dialog');if(!bubble)return;
const ui=document.createElement('section');ui.id='pixel-controls';ui.setAttribute('aria-label','Assistant de recherche Pixel');
ui.innerHTML='<p class="pixel-intro">Demande-moi une formation. Je pilote les filtres du catalogue pour toi.</p><form id="pixel-form"><label for="pixel-query">Ta demande</label><div class="pixel-entry"><input id="pixel-query" type="search" placeholder="Ex. BUT informatique à Lille" autocomplete="off"><button type="submit">Chercher</button></div></form><div class="pixel-shortcuts"><button type="button" data-pixel="BUT informatique">BUT informatique</button><button type="button" data-pixel="BTS cybersécurité">BTS cybersécurité</button><button type="button" data-pixel="licence informatique">Licence informatique</button><button type="button" data-pixel="jeu vidéo">Jeu vidéo</button><button type="button" data-pixel="alternance">Alternance</button><button type="button" data-pixel="tout">Tout afficher</button></div><p id="pixel-feedback" role="status" aria-live="polite"></p>';
bubble.appendChild(ui);
const $=id=>document.getElementById(id);
const field=(...ids)=>ids.map($).find(Boolean);
const set=(el,val)=>{if(!el)return false;el.value=val;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));return true};
const selects=[...document.querySelectorAll('.filters select')],inputs=[...document.querySelectorAll('.filters input')];
const search=inputs.find(x=>x.type==='search'||x.type==='text');
const selectFor=(words)=>selects.find(s=>[...s.options].some(o=>words.some(w=>(o.text+' '+o.value).toLowerCase().includes(w))));
const choose=(s,words)=>{if(!s)return false;const opt=[...s.options].find(o=>words.some(w=>(o.text+' '+o.value).toLowerCase().includes(w)));return opt?set(s,opt.value):false};
function run(raw){const q=raw.trim(),lower=q.toLowerCase();if(!q)return;
const reset=$('reset');if(reset)reset.click();
let kind='',city='',term=q,apprentice=false;
if(/\b(but|bts|licence|master|cpge|ingenieur|ingénieur)\b/i.test(q)){kind=(q.match(/\b(but|bts|licence|master|cpge|ingenieur|ingénieur)\b/i)||[])[0].toLowerCase();term=term.replace(/\b(but|bts|licence|master|cpge|ingenieur|ingénieur)\b/i,'').trim()}
const cityMatch=q.match(/\b(?:à|a|sur|près de)\s+(lille|valenciennes|amiens|arras|lens|calais|dunkerque|maubeuge|béthune|cambrai|roubaix|tourcoing|douai|compiègne|beauvais|saint-quentin)\b/i);
if(cityMatch){city=cityMatch[1];term=term.replace(cityMatch[0],'').trim()}
apprentice=/alternance|apprentissage|apprenti/i.test(q);
if(apprentice)term=term.replace(/alternance|apprentissage|apprenti/ig,'').trim();
if(/^(tout|tout afficher|réinitialiser|reinitialiser)$/i.test(q)){term='';kind='';city=''}
if(kind)choose(selectFor([kind]),[kind]);
if(city)choose(selectFor([city]),[city]);
if(apprentice){const apprenticeSelect=selectFor(['apprentissage','alternance']);choose(apprenticeSelect,['apprentissage','alternance'])}
if(search)set(search,term);
const message=$('pixel-feedback');message.textContent='Filtres appliqués'+(kind?' · '+kind.toUpperCase():'')+(city?' · '+city:'')+(term?' · '+term:'')+'. Tu peux les ajuster dans le catalogue.';
const count=$('count');if(count)message.textContent+=' '+count.textContent;
const catalogue=$('catalogue');if(catalogue)catalogue.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
}
$('pixel-form').addEventListener('submit',e=>{e.preventDefault();run($('pixel-query').value)});
ui.querySelectorAll('[data-pixel]').forEach(b=>b.addEventListener('click',()=>{$('pixel-query').value=b.dataset.pixel;run(b.dataset.pixel)}));
};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();