(function(){
  var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};
  var de=document.documentElement, ok=!!(window.gsap&&window.ScrollTrigger);
  var anim=de.classList.contains('anim')&&ok;
  if(!anim) de.classList.remove('anim');
  var small=matchMedia('(max-width: 899px)').matches; /* mobile: sem ScrollTrigger (IntersectionObserver), túnel estático, preloader curto, animações pausadas fora da tela */
  if(ok&&!small){ gsap.registerPlugin(ScrollTrigger); ScrollTrigger.config({ignoreMobileResize:true}); }
  var WA='https://wa.me/5511973397668', CASES='github.com/DevAlify/engineering-cases';
  var lang='pt';
  try{lang=localStorage.getItem('portfolio-language')||((navigator.language||'').toLowerCase().indexOf('pt')===0?'pt':'en')}catch(e){}
  if(lang!=='en')lang='pt';
  var META={
    pt:{title:'Alify Lopes | Engenheiro de IA e software',desc:'Alify Lopes, engenheiro de IA e software em São Paulo. Agentes com LLMs, RAG e MCP, backend e interfaces com testes, com base em produção.',ogd:'Agentes com LLMs, RAG e MCP, backend e interfaces com testes, com base em produção.'},
    en:{title:'Alify Lopes | AI and Software Engineer',desc:'Alify Lopes, AI and software engineer in São Paulo, Brazil. Agents with LLMs, RAG and MCP, backend and tested interfaces, with a production background.',ogd:'Agents with LLMs, RAG and MCP, backend and tested interfaces, with a production background.'}};
  var H1={pt:'Do dado ao agente, em <em>produção</em>.',en:'From data to agent, in <em>production</em>.'}, H1L={pt:'Do dado ao agente, em produção.',en:'From data to agent, in production.'};
  var h1=$('#h1'), hc=[], splitH1=null;

  /* ---------- Marquee: lista duplicada ---------- */
  var words=['TypeScript','Claude','MCP','RAG','Evals','Node.js','PostgreSQL','pgvector','Next.js 16','AWS Lambda','Playwright','Java 21','SQL Server','Cloudflare'];
  var mh=words.map(function(w){return '<span>'+w+'</span>'}).join(''); $('#mqt').innerHTML=mh+mh;
  // faixas de ticks (decorativas) do primeiro painel
  $$('.ticks').forEach(function(t){for(var i=0;i<24;i++)t.appendChild(document.createElement('i'))});

  /* ---------- Cartões: virar (face oculta fica inert) ---------- */
  $$('[data-cd]').forEach(function(cd){
    var fr=$('.fr',cd), bk=$('.bk',cd);
    $$('button.fb',cd).forEach(function(b){b.addEventListener('click',function(){
      var back=!cd.classList.contains('back'); cd.classList.toggle('back',back);
      if(back){fr.setAttribute('inert','');bk.removeAttribute('inert')}else{bk.setAttribute('inert','');fr.removeAttribute('inert')}
      setTimeout(function(){(back?$('button.fb',bk):$('button.fb',fr)).focus({preventScroll:true})},60);
    })});
  });

  /* ---------- Acordeão de pilares ---------- */
  var panes=$$('.pane');
  function openPane(p){ panes.forEach(function(x){var on=x===p;x.classList.toggle('open',on);$('.hd',x).setAttribute('aria-expanded',on)}); }
  panes.forEach(function(p){ $('.hd',p).addEventListener('click',function(){openPane(p)});
    p.addEventListener('pointerenter',function(){ if(matchMedia('(hover: hover) and (min-width: 901px)').matches) openPane(p) }); });

  /* ---------- Tooltip global (evita corte pelos painéis recortados) ---------- */
  var tip=$('#tip');
  function tipOf(el){return lang==='en'?el.dataset.enTip:el.dataset.tip}
  function showTip(el){ tip.textContent=tipOf(el); var r=el.getBoundingClientRect(); tip.classList.add('on');
    var tw=tip.offsetWidth, th=tip.offsetHeight, x=Math.max(8,Math.min(innerWidth-tw-8,r.left+r.width/2-tw/2)), y=r.top-th-10; if(y<8)y=r.bottom+10;
    tip.style.left=x+'px'; tip.style.top=y+'px'; }
  $$('.chip[data-tip]').forEach(function(c){ 
    c.addEventListener('pointerenter',function(){showTip(c)}); c.addEventListener('focus',function(){showTip(c)});
    c.addEventListener('pointerleave',function(){tip.classList.remove('on')}); c.addEventListener('blur',function(){tip.classList.remove('on')}); });
  addEventListener('keydown',function(e){if(e.key==='Escape')tip.classList.remove('on')});

  /* ---------- Mini-terminal (tecla ~ ou botão) ---------- */
  var term=$('#term'), tout=$('#tout'), tin=$('#tin'), lastFocus=null;
  var T={
    pt:{hello:'terminal de Alify Lopes. digite help.',nf:function(v){return 'comando não encontrado: '+v+'. tente help.'},ph:'digite help',prompt:'alify@syphrax:~$ (Esc fecha)',close:'Fechar terminal',lab:'Comando',skip:'clique ou Esc para pular',
      help:'comandos: help, whoami, stack, cases, timeline, edu, contact, clear, exit',
      whoami:'Alify Lopes, engenheiro de IA e software. São Paulo, SP. Em tecnologia desde 2017. Cofundador e CTO da syphrax.',
      stack:'IA: Claude, MCP, RAG, evals, guardrails\nBackend: Node.js, Fastify, Spring Boot, pg-boss\nDados: PostgreSQL, SQL Server, Elasticsearch\nFrontend: Next.js, React, TypeScript, GSAP\nCloud: AWS, Docker, Coolify, Cloudflare\nQualidade: Vitest, Playwright, gitleaks, Semgrep',
      cases:'1) agente de suporte: MCP somente leitura, 31 consultas, 430+ testes, 51 evals\n2) Argos, revisor de PR com LLM: 198 testes, 2 contêineres isolados\n3) ERP syphrax: 15 módulos, 68 tabelas, ~2.240 testes, 8 integrações\n4) Genoma: ERP instalado na infraestrutura do cliente, 8 módulos\n5) agente de currículo sob medida: Codex redige, Claude revisa\ntodos os cases: '+CASES,
      timeline:'09/2026 a hoje  Cofundador e CTO, syphrax\n07/2026 a 09/2026  Engenheiro de IA, GE Finance\n08/2025 a 06/2026  Sustentação Sênior, GE Finance\n01/2025 a 06/2025  Full Stack Java, WTEAM\n2017 a 2024  Arcólor Brasil, de Jovem Aprendiz a responsável técnico',
      edu:'Tecnólogo em Análise e Desenvolvimento de Sistemas, Faculdade Impacta, 2020 a 2021\nFull Stack (240h), Udemy; Java Programmer I a III (100h), Impacta; Java Elite, UNIPDS (interrompida)',
      contact:'whatsapp: '+WA+'\ne-mail: alify.alves@hotmail.com\nlinkedin: linkedin.com/in/alify-silva\ngithub: github.com/DevAlify\ncurrículo sob pedido: peça pelo WhatsApp ou por e-mail'},
    en:{hello:"Alify Lopes's terminal. type help.",nf:function(v){return 'command not found: '+v+'. try help.'},ph:'type help',prompt:'alify@syphrax:~$ (Esc closes)',close:'Close terminal',lab:'Command',skip:'click or Esc to skip',
      help:'commands: help, whoami, stack, cases, timeline, edu, contact, clear, exit',
      whoami:'Alify Lopes, AI and software engineer. São Paulo, Brazil. In tech since 2017. Co-founder and CTO at syphrax.',
      stack:'AI: Claude, MCP, RAG, evals, guardrails\nBackend: Node.js, Fastify, Spring Boot, pg-boss\nData: PostgreSQL, SQL Server, Elasticsearch\nFrontend: Next.js, React, TypeScript, GSAP\nCloud: AWS, Docker, Coolify, Cloudflare\nQuality: Vitest, Playwright, gitleaks, Semgrep',
      cases:'1) support agent: read-only MCP, 31 queries, 430+ tests, 51 evals\n2) Argos, LLM PR reviewer: 198 tests, 2 isolated containers\n3) syphrax ERP: 15 modules, 68 tables, ~2,240 tests, 8 integrations\n4) Genoma: ERP installed on the customer infrastructure, 8 modules\n5) tailored resume agent: Codex drafts, Claude reviews\nall cases: '+CASES,
      timeline:'09/2026 to present  Co-founder and CTO, syphrax\n07/2026 to 09/2026  AI Engineer, GE Finance\n08/2025 to 06/2026  Senior Support Analyst, GE Finance\n01/2025 to 06/2025  Full Stack Java, WTEAM\n2017 to 2024  Arcólor Brasil, from IT apprentice to technical lead',
      edu:'Associate Degree in Systems Analysis and Development, Faculdade Impacta, 2020 to 2021\nFull Stack (240h), Udemy; Java Programmer I to III (100h), Impacta; Java Elite, UNIPDS (not completed)',
      contact:'whatsapp: '+WA+'\ne-mail: alify.alves@hotmail.com\nlinkedin: linkedin.com/in/alify-silva\ngithub: github.com/DevAlify\nresume on request: ask on WhatsApp or by e-mail'}
  };
  var CMDS=['help','whoami','stack','cases','timeline','edu','contact'];
  function tprint(t,cls){var d=document.createElement('div');if(cls)d.className=cls;d.textContent=t;tout.appendChild(d);tout.scrollTop=tout.scrollHeight}
  function openTerm(){ if(!term.hidden)return; lastFocus=document.activeElement; term.hidden=false; if(!tout.children.length){tprint(T[lang].hello,'c')} setTimeout(function(){tin.focus()},30); }
  function closeTerm(){ term.hidden=true; if(lastFocus&&lastFocus.focus)lastFocus.focus(); }
  $('#tbtn').addEventListener('click',openTerm);$('#tbtn2').addEventListener('click',openTerm); $('#tclose').addEventListener('click',closeTerm);
  addEventListener('keydown',function(e){
    if(e.key==='Escape'&&!term.hidden){closeTerm();return}
    var tag=(e.target.tagName||'').toLowerCase();
    if((e.key==='~'||e.code==='Backquote')&&tag!=='input'&&tag!=='textarea'){e.preventDefault();term.hidden?openTerm():closeTerm()}
    if(e.key==='Tab'&&!term.hidden){var f=[$('#tclose'),tin];var i=f.indexOf(document.activeElement);e.preventDefault();f[(i+(e.shiftKey?-1:1)+f.length)%f.length].focus()}
  });
  $('#tform').addEventListener('submit',function(e){e.preventDefault();var v=tin.value.trim().toLowerCase();tin.value='';if(!v)return;tprint('$ '+v,'c');
    if(v==='clear'){tout.innerHTML='';return} if(v==='exit'){closeTerm();return}
    if(CMDS.indexOf(v)>-1)tprint(T[lang][v]); else tprint(T[lang].nf(v),'e'); });

  /* ---------- Letras do e-mail ---------- */
  var mailEl=$('#mail'), mchars=[];
  (function(){var t=mailEl.textContent;mailEl.textContent='';mailEl.setAttribute('aria-label',t);t.split('').forEach(function(c){var s=document.createElement('span');s.className='ch';s.setAttribute('aria-hidden','true');s.textContent=c;mailEl.appendChild(s);mchars.push(s)})})();

  /* ---------- Corredor: só desktop com animação ---------- */
  var cor=$('#cor'), planes=$$('.pl'), dots=$$('#dots i'), floor=$('#floor'), mm=matchMedia('(min-width: 901px)');
  var corridorOn=anim&&mm.matches; if(corridorOn)cor.classList.remove('flat');

  /* ---------- Idioma (PT/EN) ---------- */
  function applyLang(l,first){
    lang=l; var en=l==='en';
    de.lang=en?'en':'pt-BR';
    if(en||!first)$$('[data-en]').forEach(function(e){ if(e.dataset.pt==null)e.dataset.pt=e.innerHTML; e.innerHTML=en?e.dataset.en:e.dataset.pt; });
    if(en||!first)$$('[data-en-label]').forEach(function(e){ if(e.dataset.ptLabel==null)e.dataset.ptLabel=e.getAttribute('aria-label'); e.setAttribute('aria-label',en?e.dataset.enLabel:e.dataset.ptLabel); });
    if(en||!first)$$('[data-en-alt]').forEach(function(e){ if(e.dataset.ptAlt==null)e.dataset.ptAlt=e.getAttribute('alt'); e.setAttribute('alt',en?e.dataset.enAlt:e.dataset.ptAlt); });
    $$('.gl').forEach(function(h){h.setAttribute('data-text',h.textContent)});
    $$('.chip[data-tip]').forEach(function(c){c.setAttribute('aria-label',c.textContent+': '+tipOf(c))});
    if(en||!first){h1.innerHTML=H1[l]; h1.setAttribute('aria-label',H1L[l]); if(splitH1){splitH1(); if(!first)gsap.set(hc,{opacity:1,yPercent:0,fontVariationSettings:'"wght" 700'})}}
    var m=META[l]; document.title=m.title;
    $('meta[name="description"]').content=m.desc; $('meta[property="og:title"]').content=m.title; $('meta[property="og:description"]').content=m.ogd;
    $$('[data-language]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.language===l))});
    tin.placeholder=T[l].ph; $('#tprompt').textContent=T[l].prompt; $('#tclose').setAttribute('aria-label',T[l].close); $('label[for=tin]').textContent=T[l].lab; var sk=$('#pskip');if(sk)sk.textContent=T[l].skip;
    if(!first)try{localStorage.setItem('portfolio-language',l)}catch(e){}
  }
  $$('[data-language]').forEach(function(b){b.addEventListener('click',function(){applyLang(b.dataset.language)})});
  applyLang(lang,true);

  if(!anim){ var pe=$('#pre'); if(pe)pe.remove(); return; }

  var ease='expo.out';
  /* ---------- Cursor sutil ---------- */
  var cur=$('#cur');
  if(matchMedia('(hover: hover)').matches){
    var cx_=gsap.quickTo(cur,'x',{duration:.35,ease:'power3'}), cy_=gsap.quickTo(cur,'y',{duration:.35,ease:'power3'});
    addEventListener('pointermove',function(e){cur.classList.add('on');cx_(e.clientX);cy_(e.clientY);
      cur.classList.toggle('h',!!e.target.closest('a,button,[tabindex],.pane'))},{passive:true});
    document.addEventListener('pointerleave',function(){cur.classList.remove('on')});
  }

  /* ---------- Túnel em canvas 2D (ciano e magenta) ---------- */
  var cv=$('#tunnel'), cx=cv.getContext('2d'), W=0,H=0,dpr=Math.min(devicePixelRatio||1,1.5), st=[], ox=0,oy=0,tx=0,ty=0,vis=true;
  function size(){W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0)}
  for(var i=0;i<(innerWidth<700?100:190);i++) st.push({x:Math.random()*2-1,y:Math.random()*2-1,z:Math.random()*.95+.05,c:Math.random()<.22?'255,43,214':(Math.random()<.1?'255,179,0':'25,240,255')});
  size(); addEventListener('resize',size);
  var last=performance.now();
  function draw(now){ var dt=Math.min(.05,(now-last)/1000);last=now; ox+=(tx-ox)*.05;oy+=(ty-oy)*.05; cx.clearRect(0,0,W,H);
    var sp=.22,f=Math.max(W,H)*.55;
    for(var i=0;i<st.length;i++){var s=st[i];s.z-=sp*dt;if(s.z<.04){s.z=1;s.x=Math.random()*2-1;s.y=Math.random()*2-1}
      var x1=W/2+ox+s.x/s.z*f*.5,y1=H/2+oy+s.y/s.z*f*.5,z2=s.z+sp*.07,x2=W/2+ox+s.x/z2*f*.5,y2=H/2+oy+s.y/z2*f*.5,a=Math.pow(1-s.z,1.6);
      cx.strokeStyle='rgba('+s.c+','+(a*.9).toFixed(3)+')';cx.lineWidth=.6+a*1.5;cx.beginPath();cx.moveTo(x2,y2);cx.lineTo(x1,y1);cx.stroke();}
    if(vis&&!small)requestAnimationFrame(draw);}
  if(!small)new IntersectionObserver(function(e){var v=e[0].isIntersecting;if(v&&!vis){vis=true;last=performance.now();requestAnimationFrame(draw)}vis=v},{threshold:0}).observe($('.hero'));
  addEventListener('pointermove',function(e){tx=(e.clientX/innerWidth-.5)*-60;ty=(e.clientY/innerHeight-.5)*-40;de.style.setProperty('--gx',e.clientX+'px');de.style.setProperty('--gy',e.clientY+'px')},{passive:true});
  requestAnimationFrame(draw);

  /* ---------- h1 em letras com peso variável ---------- */
  splitH1=function(){hc=[];function walk(n){[].slice.call(n.childNodes).forEach(function(c){if(c.nodeType===3){var fr=document.createDocumentFragment();
    c.textContent.split(/(\s+)/).forEach(function(w){if(w==='')return;if(/^\s+$/.test(w)){fr.appendChild(document.createTextNode(' '));return}
      var ws=document.createElement('span');ws.className='w';ws.setAttribute('aria-hidden','true');w.split('').forEach(function(ch){var s=document.createElement('span');s.className='ch';s.textContent=ch;ws.appendChild(s);hc.push(s)});fr.appendChild(ws)});n.replaceChild(fr,c)}
    else if(c.nodeType===1)walk(c)})};walk(h1);meas()};
  var cache=[];function meas(){cache=hc.map(function(c){var r=c.getBoundingClientRect();return{x:r.left+r.width/2+scrollX,y:r.top+r.height/2+scrollY}})}splitH1();addEventListener('resize',meas);
  var raf=0,mx=-999,my=-999;
  function wpaint(){raf=0;hc.forEach(function(c,i){var p=cache[i];if(!p)return;var d=Math.hypot(p.x-mx,p.y-my);c.style.fontVariationSettings='"wght" '+Math.round(d>300?700:Math.max(400,700-(1-d/300)*300))})}
  addEventListener('pointermove',function(e){mx=e.pageX;my=e.pageY;if(!raf)raf=requestAnimationFrame(wpaint)},{passive:true});
  var mc=[];function mmeas(){mc=mchars.map(function(c){var r=c.getBoundingClientRect();return{x:r.left+r.width/2+scrollX,y:r.top+r.height/2+scrollY}})}
  var mraf=0;mailEl.addEventListener('pointermove',function(e){if(!mc.length)mmeas();var X=e.pageX,Y=e.pageY;if(mraf)return;mraf=requestAnimationFrame(function(){mraf=0;
    mchars.forEach(function(c,i){var d=Math.hypot(mc[i].x-X,mc[i].y-Y);c.style.fontVariationSettings='"wght" '+Math.round(Math.max(400,900-d*4))})})});
  mailEl.addEventListener('pointerleave',function(){mchars.forEach(function(c){c.style.fontVariationSettings='"wght" 700'})});
  addEventListener('resize',function(){mc=[]});

  /* ---------- Retrato 3D ---------- */
  var c3=$('#c3'),stage=$('#stage'),qx=gsap.quickTo(c3,'rotationX',{duration:.8,ease:'power3'}),qy=gsap.quickTo(c3,'rotationY',{duration:.8,ease:'power3'});
  gsap.set(c3,{transformPerspective:1200});
  addEventListener('pointermove',function(e){var r=stage.getBoundingClientRect();var nx=(e.clientX-(r.left+r.width/2))/innerWidth,ny=(e.clientY-(r.top+r.height/2))/innerHeight;
    qy(nx*28);qx(-ny*22);c3.style.setProperty('--gx2',(50+nx*140)+'%');c3.style.setProperty('--gy2',(40+ny*140)+'%')},{passive:true});

  var ph=$('#ph'); (function gx(){setTimeout(function(){ph.classList.add('gx');setTimeout(function(){ph.classList.remove('gx')},700);gx()},7000+Math.random()*6000)})();

  /* ---------- Glitch controlado: entrada e hover ---------- */
  function glitch(h){h.classList.remove('on');void h.offsetWidth;h.classList.add('on');setTimeout(function(){h.classList.remove('on')},650)}
  $$('.gl').forEach(function(h){h.addEventListener('pointerenter',function(){glitch(h)});h.addEventListener('focus',function(){glitch(h)})});

  /* ---------- Preloader: log de boot ---------- */
  var pre=$('#pre'),bl=$('#bl'),pb=$('#pb'),pp=$('#pp'),pdone=false;
var LINES={pt:['núcleo carregado','agente N1: guardrails ativos','servidor MCP: somente leitura','evals: 51 casos, 10 selados','auditoria append-only no banco','túnel de dados online'],en:['core loaded','L1 agent: guardrails on','MCP server: read-only','evals: 51 cases, 10 sealed','append-only audit in the database','data tunnel online']};
  var lines=LINES[lang].map(function(t){return '<b>[ ok ]</b> '+t}).concat(['alify@syphrax: '+(lang==='en'?'session started':'sessão iniciada')]);
  var bi=0;
  function startHero(){
    var fine=matchMedia('(hover: hover)').matches; /* ponytail: peso variável animado só com ponteiro fino, custo de layout em celular */
    gsap.fromTo(hc,fine?{opacity:0,yPercent:70,fontVariationSettings:'"wght" 400'}:{opacity:0,yPercent:70},fine?{opacity:1,yPercent:0,fontVariationSettings:'"wght" 700',duration:1.2,ease:ease,stagger:.02,onComplete:meas}:{opacity:1,yPercent:0,duration:1.2,ease:ease,stagger:.02,onComplete:meas});
    h1.classList.add('jit'); setTimeout(function(){h1.classList.remove('jit')},1000);
    gsap.to('.hero .rv',{opacity:1,y:0,duration:1.2,ease:ease,stagger:.14,delay:.3});
  }
  function endPre(){if(pdone)return;pdone=true;gsap.to(pre,{opacity:0,duration:.6,ease:'power2.in',onComplete:function(){pre.remove();startHero()}})}
  (function bt(){if(bi<lines.length){bl.innerHTML+=lines[bi++]+'\n';var p=Math.round(bi/lines.length*100);pb.style.width=p+'%';pp.textContent=p+'%';setTimeout(bt,small?80:230)}else setTimeout(endPre,small?120:380)})();
  pre.addEventListener('click',endPre);addEventListener('keydown',function(e){if(e.key==='Escape')endPre()});

  if(small){var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.toggleAttribute('data-off',!e.isIntersecting)})},{rootMargin:'100px'});$$('.hero,.pan').forEach(function(x){io.observe(x)})}

  /* mobile: IntersectionObserver no lugar de ScrollTrigger (medir ~40 gatilhos custa ~800 ms de layout forçado em celular) */
  function once(el,start,fn){
    if(!small){ScrollTrigger.create({trigger:el,start:start,once:true,onEnter:fn});return}
    var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){o.disconnect();fn()}},{rootMargin:'0px 0px -8% 0px'});o.observe(el);
  }

  /* ---------- Marquee cinético ---------- */
  var mqt=$('#mqt'),mtw=gsap.to(mqt,{xPercent:-50,duration:34,ease:'none',repeat:-1}),skew=gsap.quickTo(mqt,'skewX',{duration:.5,ease:'power3'});
  var tv=1;if(!small)ScrollTrigger.create({start:0,end:'max',onUpdate:function(s){var v=s.getVelocity();tv=Math.max(tv,1+Math.min(Math.abs(v)/260,8)*.9);skew(Math.max(-14,Math.min(14,v/-120)))}});
  gsap.ticker.add(function(){tv+=(1-tv)*.06;mtw.timeScale(tv)});

  /* ---------- Entradas por seção ---------- */
  if(small)$$('section:not(.hero) .rv').forEach(function(e){once(e,'',function(){e.classList.add('in')})});
  else ScrollTrigger.batch('section:not(.hero) .rv',{start:'top 90%',once:true,onEnter:function(b){gsap.to(b,{opacity:1,y:0,duration:1,ease:ease,stagger:.1})}});
  // wipe entre seções: linha neon varre a largura e o título dá um glitch
  $$('.pan').forEach(function(p){var w=$('.wipe',p);if(!small)gsap.set(w,{scaleX:0});
    once(p,'top 82%',function(){if(small){p.classList.add('in');$$('.gl',p).forEach(glitch);return}gsap.to(w,{scaleX:1,duration:1.1,ease:'power3.inOut'});
      $$('.gl',p).forEach(function(h){gsap.fromTo(h,{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:.9,ease:'power3.out',clearProps:'clipPath',onStart:function(){glitch(h)}})})})});
  // painel anterior recua levemente (exceto antes do corredor, onde o pin não pode ter ancestral transformado)
  $$('.pan').forEach(function(p){var prev=p.previousElementSibling;if(small||!prev||prev.classList.contains('mq')||prev.id==='trajetoria'||p.id==='trajetoria')return;
    gsap.to(prev,{scale:.97,ease:'none',transformOrigin:'50% 100%',scrollTrigger:{trigger:p,start:'top bottom',end:'top 30%',scrub:true}})});
  // contadores e ticks
  $$('[data-count]').forEach(function(el){var end=+el.dataset.count,suf=el.dataset.suffix||'',pre_=el.dataset.prefix||'',fmt=el.dataset.fmt,o={v:0};
    once(el,'top 92%',function(){gsap.to(o,{v:end,duration:1.8,ease:'power2.out',onUpdate:function(){var n=Math.round(o.v);el.textContent=pre_+(fmt?n.toLocaleString('pt-BR'):n)+suf}})})});
  $$('.ticks').forEach(function(t){var is=$$('i',t);once(t,'top 92%',function(){is.forEach(function(e,i){setTimeout(function(){e.classList.add('on')},i*45)})})});
  $$('.prog i').forEach(function(i){if(small){once(i,'',function(){i.parentNode.classList.add('in')})}else gsap.from(i,{width:0,duration:1.4,ease:'power3.out',scrollTrigger:{trigger:i,start:'top 94%',once:true}})});
  // cartões: inclinação com o ponteiro (só de frente)
  (small?[]:$$('[data-cd]')).forEach(function(cd){var t=$('.tilt',cd),rx=gsap.quickTo(t,'rotationX',{duration:.7,ease:'power3'}),ry=gsap.quickTo(t,'rotationY',{duration:.7,ease:'power3'});
    cd.addEventListener('pointermove',function(e){if(cd.classList.contains('back'))return;var r=cd.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;ry((x-.5)*5);rx(-(y-.5)*4)});
    cd.addEventListener('pointerleave',function(){rx(0);ry(0)})});
  if(small){once($('#acc'),'',function(){$('#acc').classList.add('in')})}
  else gsap.from('.pane',{opacity:0,y:60,duration:1.1,ease:ease,stagger:.12,scrollTrigger:{trigger:'#acc',start:'top 85%',once:true}});
  // trilho e nav
  var rl=$$('.rail a');(small?[]:['top','numeros','pilares','cases','inventario','trajetoria','formacao','contato']).forEach(function(id,i){ScrollTrigger.create({trigger:'#'+id,start:'top 55%',end:'bottom 55%',onToggle:function(s){rl[i].classList.toggle('on',s.isActive)}})});
  var nl=$$('.navc a.l');(small?[]:['numeros','cases','inventario','trajetoria']).forEach(function(id,i){ScrollTrigger.create({trigger:'#'+id,start:'top 55%',end:'bottom 55%',onToggle:function(s){nl[i].classList.toggle('on',s.isActive)}})});

  /* ---------- Corredor (desktop) ---------- */
  if(corridorOn){
    var n=planes.length;
    var place=function(t){planes.forEach(function(p,i){var d=i-t,side=(i%2?1:-1),x=side*Math.min(innerWidth*.2,300)*(1+Math.max(0,d)*.1);
      var z=-d*820,o=d>=0?Math.max(0,1-d*.62):Math.max(0,1+d*1.7);
      p.style.transform='translate3d(calc(-50% + '+x+'px),-50%,'+z+'px)';p.style.opacity=o.toFixed(3);p.style.pointerEvents=o>.6?'auto':'none';p.classList.toggle('front',Math.abs(d)<.45)});
      var cur_=Math.round(t);dots.forEach(function(dt,i){dt.classList.toggle('on',i===cur_)})};
    place(0);
    ScrollTrigger.create({trigger:'#cor',start:'top top',end:function(){return '+='+(innerHeight*(n-1)*.9)},pin:true,scrub:.8,invalidateOnRefresh:true,
      onUpdate:function(s){place(s.progress*(n-1));floor.style.setProperty('--fy',(s.progress*n*190)+'px')}});
  }
  mm.addEventListener&&mm.addEventListener('change',function(){location.reload()});
})();
