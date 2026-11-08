(function(){
  "use strict";
  const D = window.PORTAL;
  const UI_LANGS = ["es","ru","en"];
  const SHORT = {misterio:"Misterio",corazonada:"Corazonada",horizonte:"Горизонт",volny:"Волны",onde:"Onde", ondas:"Ondas",momento:"Città"};

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
      navSections:"Secciones", navSoundtracks:"Bandas sonoras", langPick:"Idioma del sitio",
      listen:"Escuchar", seeTracks:"Ver todas las pistas", navMixes:"Mezclas",
      mixesH:"Mezclas por ánimo", mixesP:"Canciones de distintas novelas, juntas según lo que te hacen sentir. Las novelas se van alternando siempre que se puede.",
      shuffleAll:"Todo al azar", vfLabel:"Qué escuchar", vfAll:"Todo", vfSong:"Canciones", vfInst:"Instrumental", vfNone:"No hay pistas de este tipo en este disco.", sung:"Con voz", playMix:n=>"Escuchar la mezcla «"+n+"»", novels:n=>n+(n===1?" novela":" novelas"), mixOf:(m,w)=>m+", de "+w,
      tune:"Sintonizá una novela",
      soundtracksH:"Las bandas sonoras",
      soundtracksP:"Todas las canciones de cada novela, en el orden en que suenan en el libro. Tocá una pista para escucharla.",
      footName:"Luis Fader. Robert Fader en ruso, Roberto Fader en italiano.",
      prev:"Pista anterior", next:"Pista siguiente", pause:"Pausar", play:"Reproducir", seek:"Posición en la pista",
      error:"Esta pista no se pudo cargar. Probá con otra o volvé a intentar en un rato.",
      cover:t=>"Portada de "+t,
      tracks:n=>n+(n===1?" pista":" pistas"), min:"min",
      pending:n=>(n===1?"Una canción más todavía sin grabar.":n+" canciones más todavía sin grabar.")+" Sus letras ya están en el sitio."
    },
    ru:{
      title:"Луис Фадер — саундтреки к его романам",
      desc:"Саундтреки к романам Луиса Фадера в одном месте: Мендоса, бирюзовая крепость, горизонт после катастрофы, Вердеград и Синея.",
      skip:"К саундтрекам", name:"Луис Фадер", tagline:"саундтреки к его романам",
      navSections:"Разделы", navSoundtracks:"Саундтреки", langPick:"Язык сайта",
      listen:"Слушать", seeTracks:"Все треки", navMixes:"Миксы",
      mixesH:"Миксы по настроению", mixesP:"Песни из разных романов, собранные по настроению. Романы по возможности чередуются.",
      shuffleAll:"Всё вперемешку", vfLabel:"Что слушать", vfAll:"Всё", vfSong:"Песни", vfInst:"Инструментал", vfNone:"В этом альбоме нет таких треков.", sung:"С вокалом", playMix:n=>"Слушать микс «"+n+"»", novels:n=>ruPlural(n,"роман","романа","романов"), mixOf:(m,w)=>m+": «"+w+"»",
      tune:"Настройтесь на роман",
      soundtracksH:"Саундтреки",
      soundtracksP:"Все песни каждого романа — в том порядке, в каком они звучат в книге. Нажмите на трек, чтобы слушать.",
      footName:"Луис Фадер. В русских книгах — Роберт Фадер, в итальянских — Роберто Фадер.",
      prev:"Предыдущий трек", next:"Следующий трек", pause:"Пауза", play:"Воспроизвести", seek:"Позиция в треке",
      error:"Не удалось загрузить трек. Выберите другой или попробуйте позже.",
      cover:t=>"Обложка: "+t,
      tracks:n=>ruPlural(n,"трек","трека","треков"), min:"мин",
      pending:n=>"Ещё "+ruPlural(n,"песня пока не записана","песни пока не записаны","песен пока не записаны")+". Их тексты уже есть на сайте."
    },
    en:{
      title:"Luis Fader — soundtracks to his novels",
      desc:"The soundtracks to Luis Fader's novels in one place: Mendoza, the turquoise fortress, the horizon after the catastrophe, Verdegrad and Sinea.",
      skip:"Skip to the soundtracks", name:"Luis Fader", tagline:"soundtracks to his novels",
      navSections:"Sections", navSoundtracks:"Soundtracks", langPick:"Site language",
      listen:"Listen", seeTracks:"See all tracks", navMixes:"Mixes",
      mixesH:"Mood mixes", mixesP:"Songs from different novels, grouped by how they feel. The novels take turns whenever possible.",
      shuffleAll:"Shuffle everything", vfLabel:"What to play", vfAll:"Everything", vfSong:"Songs", vfInst:"Instrumental", vfNone:"No tracks of this kind on this album.", sung:"With vocals", playMix:n=>"Play the "+n+" mix", novels:n=>n+(n===1?" novel":" novels"), mixOf:(m,w)=>m+", from "+w,
      tune:"Tune in to a novel",
      soundtracksH:"The soundtracks",
      soundtracksP:"Every song from each novel, in the order it plays in the book. Tap a track to listen.",
      footName:"Luis Fader. Robert Fader in Russian, Roberto Fader in Italian.",
      prev:"Previous track", next:"Next track", pause:"Pause", play:"Play", seek:"Position in track",
      error:"This track couldn't be loaded. Try another one, or try again later.",
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


  /* Todos los discos en una sola lista, para el reproductor */
  const discs = [];
  D.worlds.forEach(w => w.discs.forEach(d => { d.world = w; d.accent = w.accent; discs.push(d); }));

  /* ---------- Listas de reproducción ----------
     Cada disco es una lista; cada mezcla junta pistas de varias novelas.
     En las mezclas nunca suenan dos seguidas de la misma novela. */
  /* Qué escuchar: "all" (todo), "song" (solo canciones con voz) o "inst" (solo instrumental) */
  let VF = "all";
  try{ const v = localStorage.getItem("fader-voice"); if(["all","song","inst"].includes(v)) VF = v; }catch(e){}
  const isSong = it => it.d.voice[it.t] === "S";
  const keep = it => VF === "all" || (VF === "song") === isSong(it);
  const queues = {};
  discs.forEach((d,k) => queues["d"+k] = d.tracks.map((_,t) => ({d, t})));
  function interleave(items, random){
    const groups = new Map();
    items.forEach(it => { const id = it.d.world.id; if(!groups.has(id)) groups.set(id, []); groups.get(id).push(it); });
    const out = []; let last = null;
    while(out.length < items.length){
      let best = null;
      groups.forEach((g, id) => {
        if(!g.length) return;
        if(id === last && [...groups.values()].some((h,j) => h.length && [...groups.keys()][j] !== last)) return;
        if(!best || g.length > best[1].length || (random && g.length === best[1].length && Math.random() < .5)) best = [id, g];
      });
      out.push(best[1].shift()); last = best[0];
    }
    return out;
  }
  const allItems = () => discs.flatMap(d => d.tracks.map((_,t) => ({d, t})));
  const mixItems = {};
  D.mixes.forEach(m => { mixItems["m:"+m.id] = allItems().filter(it => it.d.mood[it.t] === m.code); });
  /* La lista que suena, ya filtrada; las mezclas se intercalan después de filtrar */
  function getQueue(key){
    if(mixItems[key]) return interleave(mixItems[key].filter(keep), false);
    return (queues[key] || []).filter(keep);
  }
  function shuffled(){
    const a = allItems().filter(keep);
    for(let i = a.length-1; i > 0; i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; }
    return interleave(a, true);
  }
  const mixOfKey = k => k && k.startsWith("m:") ? D.mixes.find(m => "m:"+m.id === k) : null;

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
    $("#hero-tracks").href = "#m-" + w.id;
    $("#hero-count").textContent = tx(w.kind) + ". " + T.tracks(countTracks(w)) + ", " + inLang(w.lang) + ".";
    heroState();
    if(fromUser){ try{ history.replaceState(null,"",location.search+"#"+w.id); }catch(e){} }
  }
  const heroDisc = () => D.worlds[cur].discs.find(d => getQueue("d"+discs.indexOf(d)).length);
  $("#hero-play").addEventListener("click", () => { const d = heroDisc(); if(d) start("d"+discs.indexOf(d), 0); });
  function heroState(){ $("#hero-play").disabled = !heroDisc(); }
  /* «Ver todas las pistas» baja a la novela sintonizada y abre su primer disco */
  $("#hero-tracks").addEventListener("click", () => { const d = document.querySelector("#m-"+D.worlds[cur].id+" .disc"); if(d) d.open = true; });

  /* ---------- Mundos ---------- */
  const MIC = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>';
  const dur = (it, t) => '<span class="du">'+(isSong(it) ? '<span class="voc" role="img" aria-label="'+esc(T.sung)+'" title="'+esc(T.sung)+'">'+MIC+'</span>' : '')+esc(t.d||"")+'</span>';
  const trackList = d => {
    const key = "d"+discs.indexOf(d), q = getQueue(key);
    if(!q.length) return '<p class="pending">'+esc(T.vfNone)+'</p>';
    return '<ol>' + q.map((it,k) => { const t = d.tracks[it.t];
      return '<li><button type="button" class="track" data-q="'+key+'" data-i="'+k+'" data-d="'+discs.indexOf(d)+'" data-t="'+it.t+'">'+
      '<span class="n">'+(k+1)+'</span>'+
      '<span class="tt" lang="'+esc(d.world.lang)+'">'+esc(t.t)+(t.o||t.s ? '<small>'+esc(t.o || t.s)+'</small>' : '')+'</span>'+
      dur(it, t)+'</button></li>'; }).join("") + '</ol>' +
      (d.pending && VF !== "inst" ? '<p class="pending">'+esc(T.pending(d.pending))+'</p>' : '');
  };
  const discBlock = (d, open) => {
    const q = getQueue("d"+discs.indexOf(d)), tracks = q.map(it => d.tracks[it.t]);
    const info = [T.tracks(tracks.length), minutes(tracks)].filter(Boolean).join(", ");
    const name = tx(d.name);
    return '<details class="disc" data-disc="'+discs.indexOf(d)+'"'+(open?' open':'')+'><summary><img src="'+esc(d.cover)+'" alt="" loading="lazy" width="48" height="48">'+
      '<span><span class="d-name">'+esc(name)+'</span><span class="d-info">'+esc(info)+(d.note ? '. '+esc(tx(d.note)) : '')+'</span></span></summary>'+trackList(d)+'</details>';
  };

  function renderWorlds(){
    const open = new Set([...document.querySelectorAll(".disc[open]")].map(x => x.dataset.disc));
    $("#worlds").innerHTML = D.worlds.map(w => {
      const tr = w.tr && w.tr[L];
      return '<article class="world" id="m-'+w.id+'" style="--w:'+w.accent+'">'+
        '<img class="world-cover" src="'+esc(w.discs[0].cover)+'" alt="'+esc(T.cover(w.title))+'" loading="lazy" width="560" height="840">'+
        '<div class="w-head"><h3 lang="'+w.lang+'">'+esc(w.title)+'</h3>'+
        (tr ? '<p class="es">'+esc(tr)+'</p>' : '')+
        '<p class="meta"><b>'+esc(tx(w.place))+'</b>. '+esc(w.author)+', '+esc(inLang(w.lang))+'. '+esc(T.tracks(w.discs.reduce((a,d)=>a+getQueue("d"+discs.indexOf(d)).length,0)))+'.</p></div>'+
        '<p class="desc">'+esc(tx(w.blurb))+'</p>'+
        '<div class="discs">'+w.discs.map(d=>discBlock(d, open.has(String(discs.indexOf(d))))).join("")+'</div>'+
        '</article>';
    }).join("");
    markCurrent();
  }

  /* ---------- Mezclas ---------- */
  const PLAY_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5 19 12 7 19.5z"/></svg>';
  function renderMixes(){
    const open = new Set([...document.querySelectorAll("#mixes .disc[open]")].map(x => x.dataset.disc));
    $("#mixes").innerHTML = D.mixes.map(m => {
      const key = "m:"+m.id, q = getQueue(key);
      const per = D.worlds.map(w => [w, q.filter(it => it.d.world === w).length]).filter(x => x[1]);
      const most = Math.max(1, ...per.map(x => x[1]));
      const bars = per.map(([w,n]) => '<span style="background:'+w.accent+';height:'+Math.max(18, Math.round(n/most*100))+'%"></span>').join("");
      const info = [T.tracks(q.length), minutes(q.map(it => it.d.tracks[it.t])), T.novels(per.length)].filter(Boolean).join(", ");
      const rows = q.map((it,k) => { const t = it.d.tracks[it.t], w = it.d.world;
        return '<li><button type="button" class="track" data-q="'+key+'" data-i="'+k+'" data-d="'+discs.indexOf(it.d)+'" data-t="'+it.t+'">'+
          '<span class="n">'+(k+1)+'</span>'+
          '<span class="tt"><span lang="'+esc(w.lang)+'">'+esc(t.t)+'</span><small class="from" style="--w:'+w.accent+'" lang="'+esc(w.lang)+'">'+esc(w.title)+'</small></span>'+
          dur(it, t)+'</button></li>'; }).join("");
      return '<article class="mix" style="--m:'+m.color+'">'+
        '<button type="button" class="mix-play" data-mix="'+key+'" aria-label="'+esc(T.playMix(tx(m.name)))+'"'+(q.length?'':' disabled')+'>'+PLAY_SVG+'</button>'+
        '<details class="disc" data-disc="'+key+'"'+(open.has(key)?' open':'')+'><summary><span class="mbars" aria-hidden="true">'+bars+'</span>'+
        '<span><span class="d-name">'+esc(tx(m.name))+'</span><span class="d-info">'+esc(tx(m.desc))+' '+esc(info)+'.</span></span></summary>'+(q.length ? '<ol>'+rows+'</ol>' : '<p class="pending">'+esc(T.vfNone)+'</p>')+'</details>'+
        '</article>';
    }).join("");
    markCurrent();
  }
  $("#mixes").addEventListener("click", e => { const b = e.target.closest(".mix-play"); if(b) start(b.dataset.mix, 0); });
  $("#shuffle-all").addEventListener("click", () => start("azar", 0));

  document.addEventListener("click", e => {
    const b = e.target.closest(".track"); if(!b) return;
    const q = b.dataset.q, i = +b.dataset.i;
    if(current.qk===q && current.i===i){ toggle(); return; }
    start(q, i);
  });


  /* ---------- Reproductor ---------- */
  const audio = $("#audio"), player = $("#player"), seek = $("#p-seek");
  const current = {d:null, t:-1, qk:null, q:null, i:-1};
  const ICON_PAUSE = '<path d="M8 5v14M16 5v14"/>', ICON_PLAY = '<path d="M7 4.5 19 12 7 19.5z"/>';

  function markCurrent(){
    document.querySelectorAll('.track[aria-current]').forEach(b => b.removeAttribute("aria-current"));
    if(current.d) document.querySelectorAll('.track[data-d="'+discs.indexOf(current.d)+'"][data-t="'+current.t+'"]').forEach(b => b.setAttribute("aria-current","true"));
  }
  function playerText(){
    if(!current.d) return;
    const d = current.d, name = tx(d.name), m = mixOfKey(current.qk);
    $("#p-sub").textContent = m ? T.mixOf(tx(m.name), d.world.title)
      : current.qk === "azar" ? T.mixOf(T.shuffleAll, d.world.title)
      : name + (name !== d.world.title ? ", " + d.world.title : "");
    $("#p-toggle").setAttribute("aria-label", audio.paused ? T.play : T.pause);
  }
  function start(key, i){
    const q = key === "azar" ? shuffled() : getQueue(key);
    if(!q.length) return;
    current.qk = key; current.q = q; current.i = i;
    play();
  }
  function play(){
    const it = current.q[current.i], d = it.d, t = it.t;
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
    $("#p-dur").textContent = tr.d || "0:00";
    markCurrent();
    if("mediaSession" in navigator){
      try{
        navigator.mediaSession.metadata = new MediaMetadata({title:tr.t, artist:"Luis Fader", album:(mixOfKey(current.qk) ? tx(mixOfKey(current.qk).name) : tx(d.name)),
          artwork:[{src:new URL(d.cover, location.href).href, sizes:"560x560", type:"image/jpeg"}]});
        navigator.mediaSession.setActionHandler("previoustrack", prev);
        navigator.mediaSession.setActionHandler("nexttrack", next);
      }catch(e){}
    }
  }
  function toggle(){ if(!current.d) return; audio.paused ? audio.play().catch(()=>{}) : audio.pause(); }
  function next(){ if(!current.q || !current.q.length) return; current.i = (current.i+1) % current.q.length; play(); }
  function prev(){ if(!current.q || !current.q.length) return; if(audio.currentTime > 4){ audio.currentTime = 0; return; } current.i = (current.i-1+current.q.length) % current.q.length; play(); }

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


  /* ---------- Qué escuchar: todo, canciones o instrumental ---------- */
  function renderVF(){
    document.querySelectorAll(".vf").forEach(g => {
      g.setAttribute("aria-label", T.vfLabel);
      g.innerHTML = [["all",T.vfAll],["song",T.vfSong],["inst",T.vfInst]].map(([v,lab]) =>
        '<button type="button" data-vf="'+v+'" aria-pressed="'+(v===VF)+'">'+esc(lab)+'</button>').join("");
    });
  }
  document.addEventListener("click", e => {
    const b = e.target.closest(".vf button"); if(!b || b.dataset.vf === VF) return;
    VF = b.dataset.vf;
    try{ localStorage.setItem("fader-voice", VF); }catch(e){}
    renderWorlds(); renderMixes(); renderVF(); heroState();
    /* La lista que está sonando se rearma con el nuevo filtro; la canción actual termina normal */
    if(current.qk){
      const q = current.qk === "azar" ? current.q.filter(keep) : getQueue(current.qk);
      const i = q.findIndex(it => it.d === current.d && it.t === current.t);
      current.q = q; current.i = i >= 0 ? i : -1;
      markCurrent();
    }
  });

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
    renderWorlds(); renderMixes(); renderVF(); playerText();
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
