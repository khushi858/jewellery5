
document.body.classList.add('loading');addEventListener('load',()=>setTimeout(()=>{document.querySelector('.loader')?.classList.add('done');document.body.classList.remove('loading')},850));
const bar=document.querySelector('.progress'),head=document.querySelector('.header');function scrollFx(){let max=document.documentElement.scrollHeight-innerHeight;if(bar)bar.style.width=(max?scrollY/max*100:0)+'%';head?.classList.toggle('compact',scrollY>50)}addEventListener('scroll',scrollFx,{passive:true});scrollFx();
document.querySelector('.menu')?.addEventListener('click',()=>document.querySelector('.nav')?.classList.toggle('open'));document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav')?.classList.remove('open')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal,.left,.right').forEach(x=>io.observe(x));
let slides=[...document.querySelectorAll('.slide')],idx=0,slideTimer,paused=false,dots=document.querySelector('.dots');function show(n){if(!slides.length)return;idx=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('active',i===idx));if(dots)[...dots.children].forEach((d,i)=>d.classList.toggle('active',i===idx));let c=document.querySelector('.count');if(c)c.textContent=`0${idx+1} / 0${slides.length}`}if(slides.length){slides.forEach((s,i)=>{let b=document.createElement('button');b.setAttribute('aria-label','Show slide '+(i+1));b.onclick=()=>{show(i);restart()};dots?.append(b)});show(0);function restart(){clearInterval(slideTimer);slideTimer=setInterval(()=>{if(!paused)show(idx+1)},6200)}restart();document.querySelector('.next')?.addEventListener('click',()=>{show(idx+1);restart()});document.querySelector('.prev')?.addEventListener('click',()=>{show(idx-1);restart()});document.querySelector('.hero')?.addEventListener('mouseenter',()=>paused=true);document.querySelector('.hero')?.addEventListener('mouseleave',()=>paused=false)}
document.querySelectorAll('.product').forEach(c=>{c.addEventListener('mousemove',e=>{let r=c.getBoundingClientRect();c.style.setProperty('--rx',`${-((e.clientY-r.top)/r.height-.5)*4}deg`);c.style.setProperty('--ry',`${((e.clientX-r.left)/r.width-.5)*4}deg`)});c.addEventListener('mouseleave',()=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')})});
document.querySelectorAll('.heart').forEach(b=>b.onclick=()=>{b.classList.toggle('active');b.textContent=b.classList.contains('active')?'♥':'♡'});document.querySelectorAll('.add').forEach(b=>b.onclick=()=>{b.textContent='ADDED TO BAG ✓';b.classList.add('added');setTimeout(()=>{b.textContent='ADD TO BAG';b.classList.remove('added')},1500)});
document.querySelectorAll('form[data-demo]').forEach(f=>f.onsubmit=e=>{e.preventDefault();f.querySelector('button').textContent='THANK YOU ✓'});document.querySelectorAll('video[data-lazy]').forEach(v=>{let vi=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)v.play().catch(()=>{});else v.pause()}),{threshold:.15});vi.observe(v)});document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());

// Enhanced campaign motion: staggered reveals, subtle parallax, pointer sheen and product filtering.
document.querySelectorAll('.products').forEach(grid=>[...grid.children].forEach((el,i)=>el.style.setProperty('--delay',`${(i%4)*90}ms`)));
const parallaxItems=document.querySelectorAll('.category img,.editorial-photo img,.model-photo img');
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
  addEventListener('scroll',()=>{const vh=innerHeight;parallaxItems.forEach(img=>{const r=img.getBoundingClientRect();if(r.bottom>0&&r.top<vh){const shift=(r.top-vh/2)*-.025;img.style.translate=`0 ${shift}px`}})},{passive:true});
}
document.querySelectorAll('.filter-chip').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter-chip').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const filter=btn.dataset.filter;document.querySelectorAll('[data-category]').forEach(card=>card.hidden=filter!=='all'&&card.dataset.category!==filter)}));

document.querySelectorAll('.products').forEach(grid=>[...grid.children].forEach((el,i)=>el.style.setProperty('--delay',`${(i%4)*85}ms`)));


// Accessible playback controls for campaign films. Videos remain muted by default.
document.querySelectorAll('video').forEach((video)=>{
  const holder=video.parentElement;
  if(!holder || holder.querySelector('.video-control')) return;
  holder.style.position='relative';
  const control=document.createElement('button');
  control.className='video-control'; control.type='button'; control.setAttribute('aria-label','Pause campaign video'); control.textContent='Ⅱ';
  control.addEventListener('click',()=>{
    if(video.paused){video.play().catch(()=>{});control.textContent='Ⅱ';control.setAttribute('aria-label','Pause campaign video');}
    else{video.pause();control.textContent='▶';control.setAttribute('aria-label','Play campaign video');}
  });
  holder.appendChild(control);
});


// Collection discovery: category filtering and featured/name/price sorting.
const catalogSections=[...document.querySelectorAll('main > section[id]')].filter(s=>['rings','necklaces','earrings','bracelets'].includes(s.id));
document.querySelectorAll('[data-catalog]').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('[data-catalog]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  catalogSections.forEach(section=>section.hidden=btn.dataset.catalog!=='all'&&section.id!==btn.dataset.catalog);
}));
const sortSelect=document.querySelector('#catalog-sort');
sortSelect?.addEventListener('change',()=>document.querySelectorAll('.products').forEach(grid=>{
  const cards=[...grid.querySelectorAll('.product')];
  const mode=sortSelect.value;
  cards.sort((a,b)=>{
    if(mode==='name')return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
    const price=el=>Number((el.querySelector('.prod-info strong')?.textContent||'').replace(/[^0-9]/g,''));
    if(mode==='price-low')return price(a)-price(b);if(mode==='price-high')return price(b)-price(a);return 0;
  }).forEach(card=>grid.appendChild(card));
}));

/* Signature scroll jewellery: brief, elegant product silhouettes appear only during scroll. */
(()=>{
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const layer=document.createElement('div');layer.className='jewel-float-layer';layer.setAttribute('aria-hidden','true');document.body.appendChild(layer);
 const art=[
 `<svg viewBox="0 0 160 160"><ellipse cx="80" cy="88" rx="38" ry="45"/><ellipse cx="80" cy="88" rx="31" ry="38"/><polygon class="gem" points="80,17 91,30 80,44 69,30"/><path d="M80 44V49"/><path class="shine" d="M54 66Q44 88 56 111"/></svg>`,
 `<svg viewBox="0 0 160 160"><path d="M25 24Q80 115 135 24"/><path d="M31 27Q80 106 129 27"/><path d="M80 91V112"/><polygon class="gem" points="80,110 96,128 80,149 64,128"/><path d="M80 116L80 141M68 128H92"/><path class="shine" d="M42 49Q53 72 67 81"/></svg>`,
 `<svg viewBox="0 0 160 160"><path d="M80 18C42 18 35 72 80 125C125 72 118 18 80 18Z"/><path d="M80 29C53 29 49 70 80 109C111 70 107 29 80 29Z"/><circle class="gem" cx="80" cy="75" r="13"/><path class="shine" d="M64 38Q51 55 62 71"/></svg>`,
 `<svg viewBox="0 0 160 160"><path d="M80 15V52"/><circle cx="80" cy="67" r="12"/><path d="M80 79V91"/><polygon class="gem" points="80,88 112,116 80,150 48,116"/><path d="M80 94V143M53 116H107"/><path class="shine" d="M66 102L80 91"/></svg>`
 ];
 let lastY=scrollY,lastSpawn=0;
 function burst(){const now=Date.now();if(now-lastSpawn<900)return;lastSpawn=now;const node=document.createElement('div');node.className='jewel-ghost';node.innerHTML=art[Math.floor(Math.random()*art.length)];node.style.left=(Math.random()*72+12)+'%';node.style.top=(Math.random()*56+17)+'%';layer.appendChild(node);for(let i=0;i<3;i++){const g=document.createElement('i');g.className='scroll-glint';g.style.left=(parseFloat(node.style.left)+Math.random()*9-4)+'%';g.style.top=(parseFloat(node.style.top)+Math.random()*9-4)+'%';layer.appendChild(g);setTimeout(()=>g.remove(),1300)}setTimeout(()=>node.remove(),2700)}
 let ticking=false;addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{const y=scrollY;if(Math.abs(y-lastY)>115)burst();lastY=y;ticking=false})},{passive:true});
})();

/* Discreet welcome / private-preview popup: once per session, with clear dismissal. */
(()=>{
 if(sessionStorage.getItem('aurelleWelcomeDismissed'))return;
 const backdrop=document.createElement('div');backdrop.className='aurelle-popup-backdrop';backdrop.innerHTML=`<section class="aurelle-popup" role="dialog" aria-modal="true" aria-labelledby="aurelle-popup-title"><button class="aurelle-popup-close" aria-label="Close popup">×</button><div class="aurelle-popup-visual"><img src="assets/campaign-layered-neck.webp" alt="Layered gold jewellery campaign"></div><div class="aurelle-popup-copy"><span class="eyebrow">A PRIVATE NOTE FROM AURELLE</span><h2 id="aurelle-popup-title">A little more <em>brilliance.</em></h2><p>Discover considered pieces, new arrivals and stories behind the details. Join our private list for first access to the next collection.</p><form class="aurelle-popup-form"><input type="email" placeholder="Your email address" aria-label="Your email address" required><button type="submit">JOIN THE LIST ↗</button></form><p class="aurelle-popup-note">A thoughtful note, occasionally. Unsubscribe anytime.</p></div></section>`;
 document.body.appendChild(backdrop);const close=()=>{backdrop.classList.remove('open');sessionStorage.setItem('aurelleWelcomeDismissed','1');setTimeout(()=>backdrop.remove(),400)};
 backdrop.querySelector('.aurelle-popup-close').addEventListener('click',close);backdrop.addEventListener('click',e=>{if(e.target===backdrop)close()});addEventListener('keydown',e=>{if(e.key==='Escape'&&backdrop.classList.contains('open'))close()});backdrop.querySelector('form').addEventListener('submit',e=>{e.preventDefault();backdrop.querySelector('.aurelle-popup-copy h2').textContent='You are on the list.';backdrop.querySelector('.aurelle-popup-form').innerHTML='<span style="font-size:11px;padding:15px 0">Thank you. We look forward to sharing something beautiful.</span>';setTimeout(close,2200)});
 setTimeout(()=>{if(document.visibilityState==='visible')backdrop.classList.add('open')},12500);
})();

/* Additional campaign film chapter on the home page, using licensed-source placeholders. */
(()=>{
 const main=document.querySelector('main');if(!main||!document.querySelector('.hero')||document.querySelector('.aurelle-film-chapter'))return;
 const chapter=document.createElement('section');chapter.className='aurelle-film-chapter';chapter.innerHTML=`<div class="chapter-media"><video muted loop playsinline preload="none" poster="assets/campaign-hero.webp"><source src="https://videos.pexels.com/video-files/35764318/35764318-hd_1920_1080_25fps.mp4" type="video/mp4"></video></div><div class="chapter-copy"><span class="eyebrow">THE ART OF ADORNMENT · FILM 01</span><h2>Made to be<br><em>felt, not just seen.</em></h2><p>A closer look at the light, movement and detail that make a piece feel unmistakably yours. Explore the emotion behind every small detail.</p><a href="story.html">DISCOVER OUR WORLD ↗</a></div>`;
 const footer=main.querySelector('.footer')||document.querySelector('.footer');if(footer&&footer.parentElement===main)main.insertBefore(chapter,footer);else main.appendChild(chapter);
 const v=chapter.querySelector('video');const filmIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)v.play().catch(()=>{});else v.pause()}),{threshold:.2});filmIO.observe(v);
})();
