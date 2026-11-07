(function(){
  "use strict";
  const D = window.PORTAL;
  const LITMIR = "https://luisfader.github.io/litmir/#/";
  const UI_LANGS = ["es","ru","en"];
  const SHORT = {misterio:"Misterio",corazonada:"Corazonada",horizonte:"Горизонт",volny:"Волны",onde:"Onde",momento:"Città"};

  /* Nombres de idiomas: [castellano, ruso, inglés] */
  const LN = {
    es:["castellano","испанский","Spanish"], ru:["ruso","русский","Russian"], it:["italiano","итальянский","Italian"],
    pt:["portugués","португальский","Portuguese"], cs:["checo","чешский","Czech"], en:["inglés","английский","English"],
    fr:["francés","французский","French"], tr:["turco","турецкий","Turkish"], sr:["serbio","сербский","Serbian"],
    eo:["esperanto","эсперанто","Esperanto"], isv:["intereslavo","межславянский","Interslavic"], de:["alemán","немецкий","German"],
    vo:["volapük","волапюк","Volapük"], ia:["interlingua","интерлингва","Interlingua"], ld:["láadan","лаадан","Láadan"], pl:["polaco","польский","Polish"]
  };
  /* «en castellano», «на испанском», «in Spanish» */
  const IN = {
    es:{es:"en castellano",ru:"en ruso",it:"en italiano",en:"en inglés",pt:"en portugués"},
    ru:{es:"на испанском",ru:"на русском",it:"на итальянском",en:"на английском",pt:"на португальском"},
    en:{es:"in Spanish",ru:"in Russian",it:"in Italian",en:"in English",pt:"in Portuguese"}
  };

  const S = {
    es:{
      title:"Luis Fader — bandas sonoras de sus novelas",
      desc:"Las bandas sonoras de las novelas de Luis Fader en un solo lugar: Mendoza, la fortaleza turquesa, el horizonte después de la catástrofe, Verdegrado y Sinea.",
      skip:"Ir a las bandas sonoras", name:"Luis Fader", tagline:"bandas sonoras de sus novelas",
      navSections:"Secciones", navSoundtracks:"Bandas sonoras", navNovels:"Todas las novelas", langPick:"Idioma del sitio",
      listen:"Escuchar", openSite:"Abrir el sitio de la banda sonora", read:"Leer la novela", readIn:l=>"Leer la novela "+l, alsoIn:l=>"También "+l,
      tune:"Sintonizá una novela",
      soundtracksH:"Las bandas sonoras",
      soundtracksP:"Cada novela tiene su propio sitio, con la escena de cada pista y las letras. Desde acá podés escucharlas todas sin cambiar de página.",
      novelsH:"Todas las novelas", filterLang:"Filtrar por idioma", all:"Todas", withMusic:"Con banda sonora", hasMusic:"con banda sonora",
      novelsP:(n,k)=>n+" novelas publicadas en Litmir, en "+k+" idiomas. Las que tienen banda sonora están marcadas. Tocá una portada para leerla.",
      footName:"Luis Fader. Robert Fader en ruso, Roberto Fader en italiano.", footLitmir:"Litmir, la biblioteca de sus novelas",
      prev:"Pista anterior", next:"Pista siguiente", pause:"Pausar", play:"Reproducir", seek:"Posición en la pista", scene:"Ver la escena",
      error:"Esta pista no se pudo cargar desde su sitio. Probá abriendo el sitio de la banda sonora.",
      cover:t=>"Portada de "+t,
      tracks:n=>n+(n===1?" pista":" pistas"), min:"min",
      pending:n=>(n===1?"Una canción más todavía sin grabar.":n+" canciones más todavía sin grabar.")+" Sus letras ya están en el sitio."
    },
    ru:{
      title:"Луис Фадер — саундтреки к его романам",
      desc:"Саундтреки к романам Луиса Фадера в одном месте: Мендоса, бирюзовая крепость, горизонт после катастрофы, Вердеград и Синея.",
      skip:"К саундтрекам", name:"Луис Фадер", tagline:"саундтреки к его романам",
      navSections:"Разделы", navSoundtracks:"Саундтреки", navNovels:"Все романы", langPick:"Язык сайта",
      listen:"Слушать", openSite:"Открыть сайт саундтрека", read:"Читать роман", readIn:l=>"Читать роман "+l, alsoIn:l=>"Также "+l,
      tune:"Настройтесь на роман",
      soundtracksH:"Саундтреки",
      soundtracksP:"У каждого романа свой сайт: со сценой к каждому треку и текстами песен. Здесь можно слушать всё, не уходя со страницы.",
      novelsH:"Все романы", filterLang:"Фильтр по языку", all:"Все", withMusic:"С саундтреком", hasMusic:"с саундтреком",
      novelsP:(n,k)=>ruPlural(n,"роман опубликован","романа опубликовано","романов опубликовано")+" на Litmir, на "+k+" языках. Романы с саундтреком отмечены. Нажмите на обложку, чтобы читать.",
      footName:"Луис Фадер. В русских книгах — Роберт Фадер, в итальянских — Роберто Фадер.", footLitmir:"Litmir — библиотека его романов",
      prev:"Предыдущий трек", next:"Следующий трек", pause:"Пауза", play:"Воспроизвести", seek:"Позиция в треке", scene:"Открыть сцену",
      error:"Не удалось загрузить трек с его сайта. Попробуйте открыть сайт саундтрека.",
      cover:t=>"Обложка: "+t,
      tracks:n=>ruPlural(n,"трек","трека","треков"), min:"мин",
      pending:n=>"Ещё "+ruPlural(n,"песня пока не записана","песни пока не записаны","песен пока не записаны")+". Их тексты уже есть на сайте."
    },
    en:{
      title:"Luis Fader — soundtracks to his novels",
      desc:"The soundtracks to Luis Fader's novels in one place: Mendoza, the turquoise fortress, the horizon after the catastrophe, Verdegrad and Sinea.",
      skip:"Skip to the soundtracks", name:"Luis Fader", tagline:"soundtracks to his novels",
      navSections:"Sections", navSoundtracks:"Soundtracks", navNovels:"All novels", langPick:"Site language",
      listen:"Listen", openSite:"Open the soundtrack site", read:"Read the novel", readIn:l=>"Read the novel "+l, alsoIn:l=>"Also "+l,
      tune:"Tune in to a novel",
      soundtracksH:"The soundtracks",
      soundtracksP:"Each novel has its own site, with the scene behind every track and the lyrics. Here you can listen to all of them without leaving the page.",
      novelsH:"All novels", filterLang:"Filter by language", all:"All", withMusic:"With soundtrack", hasMusic:"with soundtrack",
      novelsP:(n,k)=>n+" novels published on Litmir, in "+k+" languages. Those with a soundtrack are marked. Tap a cover to read it.",
      footName:"Luis Fader. Robert Fader in Russian, Roberto Fader in Italian.", footLitmir:"Litmir, the library of his novels",
      prev:"Previous track", next:"Next track", pause:"Pause", play:"Play", seek:"Position in track", scene:"See the scene",
      error:"This track couldn't be loaded from its site. Try opening the soundtrack site.",
      cover:t=>"Cover of "+t,
      tracks:n=>n+(n===1?" track":" tracks"), min:"min",
      pending:n=>(n===1?"One more song":n+" more songs")+" not recorded yet. The lyrics are already on the site."
    }
  };
  function ruPlural(n,one,few,many){
    const a=n%10, b=n%100;
    return n+" "+(a===1&&b!==11 ? one : a>=2&&a<=4&&(b<10||b>=20) ? few : many);
  }

  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const secs = d => { if(!d) return 0; const [m,s] = d.split(":").map(Number); return m*60 + (s||0); };
  const clock = t => { t = Math.max(0, Math.floor(t||0)); return Math.floor(t/60) + ":" + String(t%60).padStart(2,"0"); };

  /* ---------- Idioma ---------- */
  function pickLang(){
    let l = null;
    try{ l = new URLSearchParams(location.search).get("lang"); }catch(e){}
    if(!l){ try{ l = localStorage.getItem("fader-lang"); }catch(e){} }
    if(!l){
      const nav = (navigator.languages || [navigator.language || ""]).map(x => String(x).toLowerCase());
      l = nav.find(x => /^(ru|uk|be|kk)/.test(x)) ? "ru" : nav.find(x => x.startsWith("es")) ? "es" : nav.find(x => x.startsWith("en")) ? "en" : "es";
    }
    return UI_LANGS.includes(l) ? l : "es";
  }
  let L = pickLang();
  let T = S[L];
  const tx = o => o == null ? "" : (typeof o === "string" ? o : (o[L] || o.es || ""));
  const langName = code => (LN[code] || [code,code,code])[UI_LANGS.indexOf(L)];
  const inLang = code => IN[L][code] || langName(code);
  const minutes = tracks => { const t = tracks.reduce((a,x)=>a+secs(x.d),0); return t ? Math.round(t/60) + " " + T.min : ""; };
  const countTracks = w => w.discs.reduce((a,d)=>a+d.tracks.length,0);

  /* Versión de la novela para el idioma elegido, y las demás */
  function novelLinks(w){
    const v = w.novel.v, mine = v[L], main = mine || v[w.novel.orig];
    const first = { slug: main, label: mine ? T.read : T.readIn(inLang(w.novel.orig)) };
    const rest = Object.keys(v).filter(k => v[k] !== main && k !== L)
      .map(k => ({ slug: v[k], label: T.alsoIn(inLang(k)) }));
    return [first].concat(rest);
  }

  /* Todos los discos en una sola lista, para el reproductor */
  const discs = [];
  D.worlds.forEach(w => w.discs.forEach(d => { d.world = w; d.accent = w.accent; discs.push(d); }));

  /* ---------- Dial ---------- */
  const dial = $("#dial"), needle = dial.querySelector(".needle");
  const layers = document.querySelectorAll(".layer");
  let cur = -1, layerOn = 0;
  dial.style.setProperty("--n", D.worlds.length);
  D.worlds.forEach((w,i) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "station"; b.setAttribute("role","radio");
    b.setAttribute("aria-checked","false"); b.tabIndex = -1;
    b.innerHTML = '<span lang="'+w.lang+'">'+esc(SHORT[w.id] || w.title)+'</span><small></small>';
    b.addEventListener("click", () => tune(i, true));
    dial.appendChild(b);
  });
  const stations = () => dial.querySelectorAll(".station");
  dial.addEventListener("keydown", e => {
    const k = e.key, n = D.worlds.length;
    let j = null;
    if(k==="ArrowRight"||k==="ArrowDown") j = (cur+1)%n;
    else if(k==="ArrowLeft"||k==="ArrowUp") j = (cur-1+n)%n;
    else if(k==="Home") j = 0; else if(k==="End") j = n-1;
    if(j!==null){ e.preventDefault(); tune(j, true); stations()[j].focus(); }
  });

  function tune(i, fromUser){
    const changed = i !== cur;
    cur = i;
    const w = D.worlds[i];
    if(changed){
      document.documentElement.style.setProperty("--accent", w.accent);
      const next = layers[1-layerOn];
      next.style.backgroundImage = "url('img/mundos/"+w.repo+"-fondo.jpg')";
      next.classList.add("on"); layers[layerOn].classList.remove("on"); layerOn = 1-layerOn;
      needle.style.setProperty("--x", ((i+.5)/D.worlds.length*100)+"%");
      stations().forEach((b,k) => { b.setAttribute("aria-checked", k===i ? "true" : "false"); b.tabIndex = k===i ? 0 : -1; });
    }
    $("#hero-place").textContent = tx(w.place);
    const h = $("#hero-title"); h.textContent = w.title; h.lang = w.lang;
    $("#hero-tr").textContent = tx(w.tr && w.tr[L]);
    $("#hero-blurb").textContent = tx(w.blurb);
    $("#hero-site").href = w.discs[0].url;
    const nl = novelLinks(w)[0], nv = $("#hero-novel");
    nv.href = LITMIR + nl.slug; nv.textContent = nl.label;
    $("#hero-count").textContent = tx(w.kind) + ". " + T.tracks(countTracks(w)) + ", " + inLang(w.lang) + ".";
    if(fromUser){ try{ history.replaceState(null,"",location.search+"#"+w.id); }catch(e){} }
  }
  $("#hero-play").addEventListener("click", () => play(D.worlds[cur].discs[0], 0));

  /* ---------- Mundos ---------- */
  const trackList = d => '<ol>' + d.tracks.map((t,k) =>
      '<li><button type="button" class="track" data-d="'+discs.indexOf(d)+'" data-t="'+k+'">'+
      '<span class="n">'+(k+1)+'</span>'+
      '<span class="tt" lang="'+esc(d.world.lang)+'">'+esc(t.t)+(t.o||t.s ? '<small>'+esc(t.o || t.s)+'</small>' : '')+'</span>'+
      '<span class="du">'+esc(t.d||"")+'</span></button></li>').join("") + '</ol>' +
      (d.pending ? '<p class="pending">'+esc(T.pending(d.pending))+'</p>' : '');
  const discBlock = (d, open) => {
    const info = [T.tracks(d.tracks.length), minutes(d.tracks)].filter(Boolean).join(", ");
    const name = tx(d.name);
    return '<details class="disc" data-disc="'+discs.indexOf(d)+'"'+(open?' open':'')+'><summary><img src="'+esc(d.cover)+'" alt="" loading="lazy" width="48" height="48">'+
      '<span><span class="d-name">'+esc(name)+'</span><span class="d-info">'+esc(info)+(d.note ? '. '+esc(tx(d.note)) : '')+'</span></span></summary>'+trackList(d)+'</details>';
  };

  function renderWorlds(){
    const open = new Set([...document.querySelectorAll(".disc[open]")].map(x => x.dataset.disc));
    $("#worlds").innerHTML = D.worlds.map(w => {
      const links = novelLinks(w);
      const tr = w.tr && w.tr[L];
      return '<article class="world" id="m-'+w.id+'" style="--w:'+w.accent+'">'+
        '<img class="world-cover" src="'+esc(w.discs[0].cover)+'" alt="'+esc(T.cover(w.title))+'" loading="lazy" width="560" height="840">'+
        '<div class="w-head"><h3 lang="'+w.lang+'"><a href="'+esc(w.discs[0].url)+'">'+esc(w.title)+'</a></h3>'+
        (tr ? '<p class="es">'+esc(tr)+'</p>' : '')+
        '<p class="meta"><b>'+esc(tx(w.place))+'</b>. '+esc(w.author)+', '+esc(inLang(w.lang))+'. '+esc(T.tracks(countTracks(w)))+'.</p></div>'+
        '<p class="desc">'+esc(tx(w.blurb))+'</p>'+
        '<ul class="links"><li><a href="'+esc(w.discs[0].url)+'">'+esc(T.openSite)+'</a></li>'+
          links.map(x => '<li><a href="'+LITMIR+esc(x.slug)+'">'+esc(x.label)+'</a></li>').join("")+'</ul>'+
        '<div class="discs">'+w.discs.map(d=>discBlock(d, open.has(String(discs.indexOf(d))))).join("")+'</div>'+
        '</article>';
    }).join("");
    markCurrent();
  }

  document.addEventListener("click", e => {
    const b = e.target.closest(".track"); if(!b) return;
    const d = discs[+b.dataset.d], t = +b.dataset.t;
    if(current.d===d && current.t===t){ toggle(); return; }
    play(d, t);
  });

  /* ---------- Pared de novelas ---------- */
  const withMusic = new Set();
  D.worlds.forEach(w => Object.values(w.novel.v).forEach(s => withMusic.add(s)));
  const counts = {};
  D.wall.forEach(n => counts[n.lang] = (counts[n.lang]||0)+1);
  const wallLangs = Object.keys(counts).sort((a,b)=>counts[b]-counts[a]);
  const fil = $("#filters");
  let wallFilter = "";
  function renderFilters(){
    const opts = [["",T.all],["*",T.withMusic]].concat(wallLangs.map(l => [l, langName(l)+" ("+counts[l]+")"]));
    fil.innerHTML = opts.map(([v,lab]) => '<button type="button" aria-pressed="'+(v===wallFilter)+'" data-l="'+v+'">'+esc(lab)+'</button>').join("");
    $("#universo-p").textContent = T.novelsP(D.wall.length, wallLangs.length);
  }
  function renderWall(){
    const list = D.wall.filter(n => !wallFilter || (wallFilter==="*" ? withMusic.has(n.slug) : n.lang===wallFilter));
    $("#wall").innerHTML = list.map(n =>
      '<li><a href="'+LITMIR+esc(n.slug)+'"><img src="'+esc(n.img)+'" alt="" loading="lazy" width="200" height="300">'+
      '<span lang="'+esc(n.lang)+'">'+esc(n.title)+'</span><small>'+esc(langName(n.lang))+(withMusic.has(n.slug) ? ', <span class="sound">'+esc(T.hasMusic)+'</span>' : '')+'</small></a></li>').join("");
  }
  fil.addEventListener("click", e => {
    const b = e.target.closest("button"); if(!b) return;
    wallFilter = b.dataset.l;
    fil.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x===b ? "true" : "false"));
    renderWall();
  });

  /* ---------- Reproductor ---------- */
  const audio = $("#audio"), player = $("#player"), seek = $("#p-seek");
  const current = {d:null, t:-1};
  const ICON_PAUSE = '<path d="M8 5v14M16 5v14"/>', ICON_PLAY = '<path d="M7 4.5 19 12 7 19.5z"/>';

  function markCurrent(){
    document.querySelectorAll('.track[aria-current]').forEach(b => b.removeAttribute("aria-current"));
    if(current.d) document.querySelectorAll('.track[data-d="'+discs.indexOf(current.d)+'"][data-t="'+current.t+'"]').forEach(b => b.setAttribute("aria-current","true"));
  }
  function playerText(){
    if(!current.d) return;
    const d = current.d, name = tx(d.name);
    $("#p-sub").textContent = name + (name !== d.world.title ? ", " + d.world.title : "");
    $("#p-toggle").setAttribute("aria-label", audio.paused ? T.play : T.pause);
  }
  function play(d, t){
    current.d = d; current.t = t;
    const tr = d.tracks[t];
    $("#p-error").textContent = "";
    audio.src = tr.src;
    audio.play().catch(() => {});
    player.hidden = false;
    document.body.style.setProperty("--player-h", player.offsetHeight + "px");
    player.style.setProperty("--pa", d.accent);
    $("#p-cover").src = d.cover;
    const pt = $("#p-title"); pt.textContent = tr.t; pt.lang = d.world.lang;
    playerText();
    $("#p-site").href = d.url;
    $("#p-dur").textContent = tr.d || "0:00";
    markCurrent();
    if("mediaSession" in navigator){
      try{
        navigator.mediaSession.metadata = new MediaMetadata({title:tr.t, artist:"Luis Fader", album:tx(d.name),
          artwork:[{src:new URL(d.cover, location.href).href, sizes:"560x560", type:"image/jpeg"}]});
        navigator.mediaSession.setActionHandler("previoustrack", prev);
        navigator.mediaSession.setActionHandler("nexttrack", next);
      }catch(e){}
    }
  }
  function toggle(){ if(!current.d) return; audio.paused ? audio.play().catch(()=>{}) : audio.pause(); }
  function next(){ if(!current.d) return; const d = current.d; play(d, (current.t+1) % d.tracks.length); }
  function prev(){ if(!current.d) return; if(audio.currentTime > 4){ audio.currentTime = 0; return; } const d = current.d; play(d, (current.t-1+d.tracks.length) % d.tracks.length); }

  $("#p-toggle").addEventListener("click", toggle);
  $("#p-next").addEventListener("click", next);
  $("#p-prev").addEventListener("click", prev);
  audio.addEventListener("play", () => { $("#p-icon").innerHTML = ICON_PAUSE; $("#p-toggle").setAttribute("aria-label",T.pause); });
  audio.addEventListener("pause", () => { $("#p-icon").innerHTML = ICON_PLAY; $("#p-toggle").setAttribute("aria-label",T.play); });
  audio.addEventListener("ended", next);
  audio.addEventListener("loadedmetadata", () => { $("#p-dur").textContent = clock(audio.duration); });
  audio.addEventListener("timeupdate", () => {
    $("#p-cur").textContent = clock(audio.currentTime);
    if(audio.duration && !seeking) seek.value = Math.round(audio.currentTime / audio.duration * 1000);
  });
  let audioFailed = false;
  audio.addEventListener("error", () => {
    if(!current.d) return;
    audioFailed = true;
    $("#p-error").textContent = T.error;
    document.body.style.setProperty("--player-h", player.offsetHeight + "px");
  });
  audio.addEventListener("loadstart", () => { audioFailed = false; });
  let seeking = false;
  seek.addEventListener("input", () => { seeking = true; if(audio.duration) $("#p-cur").textContent = clock(seek.value/1000*audio.duration); });
  seek.addEventListener("change", () => { if(audio.duration) audio.currentTime = seek.value/1000*audio.duration; seeking = false; });
  window.addEventListener("resize", () => { if(!player.hidden) document.body.style.setProperty("--player-h", player.offsetHeight + "px"); });


  /* ---------- Espectro (Web Audio, como Winamp) ----------
     Analiza la música real que suena. Solo funciona si el MP3 está en el mismo
     dominio que el portal (luisfader.github.io); si no, se oculta y el audio
     sigue sonando normal. Se dibuja solo mientras hay música. */
  const spec = $("#p-spec"), sctx = spec.getContext("2d");
  const reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  let actx = null, analyser = null, freq = null, specOn = false, raf = 0, lastDraw = 0;
  let bars = [], peaks = [], peakHold = [], ranges = [], grad = null, gradFor = "", specW = 0, specH = 0;
  function specReady(){
    if(analyser) return true;
    let same = false;
    try{ same = new URL(audio.src, location.href).origin === location.origin; }catch(e){}
    const AC = window.AudioContext || window.webkitAudioContext;
    if(!same || !AC) return false;
    try{
      actx = new AC();
      const src = actx.createMediaElementSource(audio);
      analyser = actx.createAnalyser();
      analyser.fftSize = 1024; analyser.smoothingTimeConstant = .72;
      analyser.minDecibels = -88; analyser.maxDecibels = -18;
      src.connect(analyser); analyser.connect(actx.destination);
      freq = new Uint8Array(analyser.frequencyBinCount);
    }catch(e){ analyser = null; return false; }
    return true;
  }
  function specSize(){
    const r = spec.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    specW = Math.max(1, Math.round(r.width * dpr)); specH = Math.max(1, Math.round(r.height * dpr));
    spec.width = specW; spec.height = specH;
    const n = Math.max(12, Math.min(32, Math.round(r.width / 7)));
    bars = new Array(n).fill(0); peaks = new Array(n).fill(0); peakHold = new Array(n).fill(0);
    /* bandas en escala logarítmica, de 40 Hz a 15 kHz */
    const binHz = (actx ? actx.sampleRate : 44100) / (analyser ? analyser.fftSize : 1024);
    const maxBin = freq ? freq.length - 1 : 511;
    ranges = [];
    for(let i = 0; i < n; i++){
      const f0 = 40 * Math.pow(15000/40, i/n), f1 = 40 * Math.pow(15000/40, (i+1)/n);
      const a = Math.min(maxBin, Math.max(1, Math.floor(f0/binHz))), b = Math.min(maxBin, Math.max(a+1, Math.ceil(f1/binHz)));
      ranges.push([a, b]);
    }
    gradFor = "";
  }
  function specColor(){
    const accent = current.d ? current.d.accent : "#d0607e";
    if(gradFor === accent && grad) return;
    grad = sctx.createLinearGradient(0, specH, 0, 0);
    grad.addColorStop(0, accent); grad.addColorStop(.7, accent); grad.addColorStop(1, "#f1ebdf");
    gradFor = accent;
  }
  function specFrame(t){
    raf = 0;
    if(!specOn) return;
    raf = requestAnimationFrame(specFrame);
    if(reduceMotion && t - lastDraw < 66) return;
    lastDraw = t;
    analyser.getByteFrequencyData(freq);
    specColor();
    const n = bars.length, gap = Math.max(1, Math.round(specW/n*0.22)), bw = (specW - gap*(n+1)) / n;
    const seg = Math.max(2, Math.round(specH/14)), segGap = Math.max(1, Math.round(seg/2)), step = seg + segGap;
    const paused = audio.paused;
    sctx.clearRect(0, 0, specW, specH);
    let alive = false;
    for(let i = 0; i < n; i++){
      let v = 0;
      if(!paused){ const [a,b] = ranges[i]; for(let k = a; k < b; k++) if(freq[k] > v) v = freq[k]; }
      v = v / 255;
      bars[i] = v > bars[i] ? v : Math.max(0, bars[i] - 0.06);
      if(bars[i] >= peaks[i]){ peaks[i] = bars[i]; peakHold[i] = 18; }
      else if(peakHold[i] > 0) peakHold[i]--;
      else peaks[i] = Math.max(0, peaks[i] - 0.015);
      if(bars[i] > 0 || peaks[i] > 0) alive = true;
      const x = Math.round(gap + i*(bw+gap)), w = Math.max(1, Math.round(bw));
      const segs = Math.floor(bars[i] * specH / step);
      sctx.fillStyle = grad;
      for(let s2 = 0; s2 < segs; s2++) sctx.fillRect(x, specH - (s2+1)*step + segGap, w, seg);
      if(peaks[i] > 0.02){
        sctx.fillStyle = "#f1ebdf";
        sctx.fillRect(x, Math.max(0, Math.round(specH - peaks[i]*specH)), w, Math.max(1, Math.round(seg/1.5)));
      }
    }
    if(paused && !alive){ specOn = false; cancelAnimationFrame(raf); raf = 0; }
  }
  function specStart(){
    if(!specReady()){ spec.hidden = true; return; }
    if(spec.hidden){ spec.hidden = false; document.body.style.setProperty("--player-h", player.offsetHeight + "px"); specSize(); }
    if(actx.state === "suspended") actx.resume().catch(()=>{});
    specOn = true;
    if(!raf) raf = requestAnimationFrame(specFrame);
  }
  audio.addEventListener("play", specStart);
  audio.addEventListener("pause", () => { if(analyser && specOn && !raf) raf = requestAnimationFrame(specFrame); });
  window.addEventListener("resize", () => { if(!spec.hidden) specSize(); });

  /* ---------- Aplicar idioma ---------- */
  function applyLang(l, save){
    L = l; T = S[L];
    document.documentElement.lang = L;
    document.title = T.title;
    const md = document.querySelector('meta[name="description"]'); if(md) md.content = T.desc;
    document.querySelectorAll("[data-i18n]").forEach(el => { const v = T[el.dataset.i18n]; if(typeof v === "string") el.textContent = v; });
    document.querySelectorAll("[data-i18n-aria]").forEach(el => { const v = T[el.dataset.i18nAria]; if(typeof v === "string") el.setAttribute("aria-label", v); });
    document.querySelectorAll("#langs button").forEach(b => b.setAttribute("aria-pressed", b.dataset.ui===L ? "true" : "false"));
    stations().forEach((b,k) => {
      const w = D.worlds[k];
      b.querySelector("small").textContent = langName(w.lang);
      b.setAttribute("aria-label", w.title + (w.tr && w.tr[L] ? " ("+w.tr[L]+")" : ""));
    });
    if(cur >= 0) tune(cur, false);
    renderWorlds(); renderFilters(); renderWall(); playerText();
    if(audioFailed) $("#p-error").textContent = T.error;
    if(save){
      try{ localStorage.setItem("fader-lang", L); }catch(e){}
      try{ const u = new URL(location.href); u.searchParams.set("lang", L); history.replaceState(null,"",u.pathname+u.search+u.hash); }catch(e){}
    }
  }
  $("#langs").addEventListener("click", e => {
    const b = e.target.closest("button[data-ui]"); if(!b || b.dataset.ui === L) return;
    applyLang(b.dataset.ui, true);
  });

  /* Arranque: la estación del enlace, o la primera */
  const fromHash = D.worlds.findIndex(w => "#"+w.id === location.hash);
  cur = -1;
  tune(fromHash >= 0 ? fromHash : 0, false);
  applyLang(L, false);
})();
