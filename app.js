(function(){
  "use strict";
  const D = window.PORTAL;
  const UI_LANGS = ["es","ru","en","it"];
  /* Ranking «Lo más escuchado»: dirección y clave pública (anon) del proyecto de Supabase.
     Vacío = la sección no aparece y no se cuenta nada. Ver supabase/ranking.sql */
  const RANKING = { url: "https://nvhzkbbjskibqotiwqee.supabase.co", key: "sb_publishable_kn8ScAq4TfpjyNsYh0gUdA_Wgp5LsOo" };
  const SHORT = {misterio:"Misterio",corazonada:"Corazonada",horizonte:"Горизонт",volny:"Волны",predchuvstvie:"Предчувствие",onde:"Onde", ondas:"Ondas", zvezdy:"Звёзды", severnaya:"Север",momento:"Città", maschera:"Maschera", future:"Future", silenzio:"Silenzio", rezonans:"Резонанс"};

  /* Nombres de idiomas: [castellano, ruso, inglés, italiano] */
  const LN = {
    es:["castellano","испанский","Spanish","spagnolo"], ru:["ruso","русский","Russian","russo"], it:["italiano","итальянский","Italian","italiano"],
    pt:["portugués","португальский","Portuguese","portoghese"], cs:["checo","чешский","Czech","ceco"], en:["inglés","английский","English","inglese"],
    fr:["francés","французский","French","francese"], tr:["turco","турецкий","Turkish","turco"], sr:["serbio","сербский","Serbian","serbo"],
    eo:["esperanto","эсперанто","Esperanto","esperanto"], isv:["intereslavo","межславянский","Interslavic","interslavo"], de:["alemán","немецкий","German","tedesco"],
    vo:["volapük","волапюк","Volapük","volapük"], ia:["interlingua","интерлингва","Interlingua","interlingua"], ld:["láadan","лаадан","Láadan","láadan"], pl:["polaco","польский","Polish","polacco"]
  };
  /* «en castellano», «на испанском», «in Spanish» */
  const IN = {
    es:{es:"en castellano",ru:"en ruso",it:"en italiano",en:"en inglés",pt:"en portugués"},
    ru:{es:"на испанском",ru:"на русском",it:"на итальянском",en:"на английском",pt:"на португальском"},
    en:{es:"in Spanish",ru:"in Russian",it:"in Italian",en:"in English",pt:"in Portuguese"},
    it:{es:"in spagnolo",ru:"in russo",it:"in italiano",en:"in inglese",pt:"in portoghese"}
  };

  const S = {
    es:{
      title:"Luis Fader — bandas sonoras de sus novelas",
      desc:"Las bandas sonoras de las novelas de Luis Fader en un solo lugar: Mendoza, la fortaleza turquesa, el horizonte después de la catástrofe, Verdegrado y Sinea.",
      skip:"Ir a las bandas sonoras", name:"Luis Fader", tagline:"bandas sonoras de sus novelas",
      navSections:"Secciones", navSoundtracks:"Bandas sonoras", langPick:"Idioma del sitio",
      listen:"Escuchar", seeTracks:"Ver todas las pistas", navMixes:"Mezclas",
      mixesH:"Mezclas por ánimo", mixList:(n,i)=>"Canciones de «"+n+"»: "+i, mixesP:"Canciones de distintas novelas, juntas según lo que te hacen sentir. Las novelas se van alternando siempre que se puede.",
      shuffleAll:"Todo al azar", topH:"Lo más escuchado ahora", topP:"Las canciones que más están sonando en el sitio. Tocá una para escucharla.", topWeek:"Esta semana", topAll:"De siempre", topPick:"Período del ranking", topNone:"Todavía no hay escuchas en este período.", plays:n=>n+(n===1?" escucha":" escuchas"),  specStyle:"Cambiar el estilo del espectro", specModes:["Barras","Ondas","Osciloscopio","Aurora"], vfLabel:"Qué escuchar", vfAll:"Todo", vfSong:"Canciones", vfInst:"Instrumental", vfNone:"No hay pistas de este tipo en este disco.", sung:"Con voz", tagSong:"Canción", tagInst:"Instrumental", playMix:n=>"Escuchar la mezcla «"+n+"»", novels:n=>n+(n===1?" novela":" novelas"), mixOf:(m,w)=>m+", de "+w,
      tune:"Girá el dial para sintonizar una novela",
      soundtracksH:"Las bandas sonoras",
      soundtracksP:"Todas las canciones de cada novela, en el orden en que suenan en el libro. Tocá una pista para escucharla.",
      footName:"Luis Fader. Robert Fader en ruso, Roberto Fader en italiano.",
      lyrics:"Letra", lyricsClose:"Cerrar la letra", queueOpen:"Ver la lista completa", queueClose:"Cerrar la lista", coverOpen:"Ver la portada", coverClose:"Cerrar la imagen", lyOrig:"Original", lyTr:"Traducción", lyInst:"Esta pista es instrumental.", lyNone:"La letra de esta canción todavía no está cargada.", lyLoading:"Cargando la letra…", lyError:"No se pudo cargar la letra. Probá de nuevo en un rato.",
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
      mixesH:"Миксы по настроению", mixList:(n,i)=>"Песни микса «"+n+"»: "+i, mixesP:"Песни из разных романов, собранные по настроению. Романы по возможности чередуются.",
      shuffleAll:"Всё вперемешку", topH:"Сейчас слушают", topP:"Песни, которые чаще всего звучат на сайте. Нажмите на любую, чтобы послушать.", topWeek:"За неделю", topAll:"За всё время", topPick:"Период рейтинга", topNone:"За этот период прослушиваний пока нет.", plays:n=>ruPlural(n,"прослушивание","прослушивания","прослушиваний"),  specStyle:"Сменить стиль спектра", specModes:["Полосы","Волны","Осциллограф","Сияние"], vfLabel:"Что слушать", vfAll:"Всё", vfSong:"Песни", vfInst:"Инструментал", vfNone:"В этом альбоме нет таких треков.", sung:"С вокалом", tagSong:"Песня", tagInst:"Инструментал", playMix:n=>"Слушать микс «"+n+"»", novels:n=>ruPlural(n,"роман","романа","романов"), mixOf:(m,w)=>m+": «"+w+"»",
      tune:"Покрутите шкалу, чтобы настроиться на роман",
      soundtracksH:"Саундтреки",
      soundtracksP:"Все песни каждого романа — в том порядке, в каком они звучат в книге. Нажмите на трек, чтобы слушать.",
      footName:"Луис Фадер. В русских книгах — Роберт Фадер, в итальянских — Роберто Фадер.",
      lyrics:"Текст", queueOpen:"Показать весь список", queueClose:"Закрыть список", coverOpen:"Открыть обложку", coverClose:"Закрыть изображение", lyricsClose:"Закрыть текст", lyOrig:"Оригинал", lyTr:"Перевод", lyInst:"Это инструментальный трек.", lyNone:"Текст этой песни ещё не добавлен.", lyLoading:"Загружаем текст…", lyError:"Не удалось загрузить текст. Попробуйте чуть позже.",
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
      mixesH:"Mood mixes", mixList:(n,i)=>"Songs in «"+n+"»: "+i, mixesP:"Songs from different novels, grouped by how they feel. The novels take turns whenever possible.",
      shuffleAll:"Shuffle everything", topH:"Most played right now", topP:"The songs playing most on the site. Tap one to listen.", topWeek:"This week", topAll:"All time", topPick:"Ranking period", topNone:"No plays in this period yet.", plays:n=>n+(n===1?" play":" plays"),  specStyle:"Change the visualizer style", specModes:["Bars","Ripples","Oscilloscope","Aurora"], vfLabel:"What to play", vfAll:"Everything", vfSong:"Songs", vfInst:"Instrumental", vfNone:"No tracks of this kind on this album.", sung:"With vocals", tagSong:"Song", tagInst:"Instrumental", playMix:n=>"Play the "+n+" mix", novels:n=>n+(n===1?" novel":" novels"), mixOf:(m,w)=>m+", from "+w,
      tune:"Spin the dial to tune in to a novel",
      soundtracksH:"The soundtracks",
      soundtracksP:"Every song from each novel, in the order it plays in the book. Tap a track to listen.",
      footName:"Luis Fader. Robert Fader in Russian, Roberto Fader in Italian.",
      lyrics:"Lyrics", lyricsClose:"Close lyrics", queueOpen:"Show the full list", queueClose:"Close the list", coverOpen:"View the cover", coverClose:"Close the image", lyOrig:"Original", lyTr:"Translation", lyInst:"This track is instrumental.", lyNone:"The lyrics for this song aren't here yet.", lyLoading:"Loading lyrics…", lyError:"Couldn't load the lyrics. Try again in a moment.",
      prev:"Previous track", next:"Next track", pause:"Pause", play:"Play", seek:"Position in track",
      error:"This track couldn't be loaded. Try another one, or try again later.",
      cover:t=>"Cover of "+t,
      tracks:n=>n+(n===1?" track":" tracks"), min:"min",
      pending:n=>(n===1?"One more song":n+" more songs")+" not recorded yet. The lyrics are already on the site."
    },
    it:{
      title:"Luis Fader — le colonne sonore dei suoi romanzi",
      desc:"Le colonne sonore dei romanzi di Luis Fader in un solo posto: Mendoza, la fortezza turchese, l'orizzonte dopo la catastrofe, Verdegrado e Sinea.",
      skip:"Vai alle colonne sonore", name:"Luis Fader", tagline:"le colonne sonore dei suoi romanzi",
      navSections:"Sezioni", navSoundtracks:"Colonne sonore", langPick:"Lingua del sito",
      listen:"Ascolta", seeTracks:"Tutti i brani", navMixes:"Mix",
      mixesH:"Mix per stato d'animo", mixList:(n,i)=>"Canzoni di «"+n+"»: "+i, mixesP:"Canzoni di romanzi diversi, riunite in base a quello che ti fanno provare. I romanzi si alternano ogni volta che si può.",
      shuffleAll:"Tutto in ordine casuale", topH:"I più ascoltati del momento", topP:"Le canzoni che si ascoltano di più sul sito. Toccane una per ascoltarla.", topWeek:"Questa settimana", topAll:"Di sempre", topPick:"Periodo della classifica", topNone:"Ancora nessun ascolto in questo periodo.", plays:n=>n+(n===1?" ascolto":" ascolti"),  specStyle:"Cambia lo stile dello spettro", specModes:["Barre","Onde","Oscilloscopio","Aurora"], vfLabel:"Cosa ascoltare", vfAll:"Tutto", vfSong:"Canzoni", vfInst:"Strumentali", vfNone:"In questo album non ci sono brani di questo tipo.", sung:"Con la voce", tagSong:"Canzone", tagInst:"Strumentale", playMix:n=>"Ascolta il mix «"+n+"»", novels:n=>n+(n===1?" romanzo":" romanzi"), mixOf:(m,w)=>m+", da "+w,
      tune:"Gira la manopola per sintonizzarti su un romanzo",
      soundtracksH:"Le colonne sonore",
      soundtracksP:"Tutte le canzoni di ogni romanzo, nell'ordine in cui risuonano nel libro. Tocca un brano per ascoltarlo.",
      footName:"Luis Fader. Robert Fader in russo, Roberto Fader in italiano.",
      lyrics:"Testo", lyricsClose:"Chiudi il testo", queueOpen:"Mostra l'elenco completo", queueClose:"Chiudi l'elenco", coverOpen:"Vedi la copertina", coverClose:"Chiudi l'immagine", lyOrig:"Originale", lyTr:"Traduzione", lyInst:"Questo brano è strumentale.", lyNone:"Il testo di questa canzone non è ancora disponibile.", lyLoading:"Caricamento del testo…", lyError:"Non è stato possibile caricare il testo. Riprova tra poco.",
      prev:"Brano precedente", next:"Brano successivo", pause:"Pausa", play:"Riproduci", seek:"Posizione nel brano",
      error:"Non è stato possibile caricare questo brano. Provane un altro o riprova più tardi.",
      cover:t=>"Copertina di "+t,
      tracks:n=>n+(n===1?" brano":" brani"), min:"min",
      pending:n=>(n===1?"Un'altra canzone non è ancora stata registrata.":"Altre "+n+" canzoni non sono ancora state registrate.")+" I testi sono già sul sito."
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
      l = nav.find(x => /^(ru|uk|be|kk)/.test(x)) ? "ru" : nav.find(x => x.startsWith("es")) ? "es" : nav.find(x => x.startsWith("en")) ? "en" : nav.find(x => x.startsWith("it")) ? "it" : "es";
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
  let topQ = [];
  const MOBILE = window.matchMedia("(pointer: coarse)").matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  function getQueue(key){
    if(key === "top") return topQ.slice();
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
  /* Una rueda sin fin: la aguja queda fija en el centro y la escala gira debajo,
     con el dedo (scroll nativo con imán), arrastrando con el mouse, con la rueda
     del mouse o del trackpad, o con las flechas. Para que nunca se acabe, la escala
     se dibuja tres veces seguidas y, cuando se detiene, salta sin que se note a la
     copia del medio. La novela que queda bajo la aguja se sintoniza al detenerse. */
  const dial = $("#dial"), track = $("#dial-track");
  const layers = document.querySelectorAll(".layer");
  const reduceDial = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const N = D.worlds.length, COPIES = 3;
  let cur = -1, layerOn = 0, dragMoved = false;
  for(let c = 0; c < COPIES; c++) D.worlds.forEach((w,i) => {
    const k = c*N + i, main = c === 1;
    const b = document.createElement("button");
    b.type = "button"; b.className = "station"; b.tabIndex = -1;
    if(main){ b.setAttribute("role","radio"); b.setAttribute("aria-checked","false"); }
    else b.setAttribute("aria-hidden","true");
    b.innerHTML = '<span lang="'+w.lang+'">'+esc(SHORT[w.id] || w.title)+'</span><small></small>';
    b.addEventListener("click", e => { if(dragMoved){ e.preventDefault(); return; } centerAt(k, true); });
    track.appendChild(b);
  });
  const all = [...track.querySelectorAll(".station")];
  const stations = () => all.slice(N, 2*N);          // la copia del medio, la "real"
  const posOf = k => all[k].offsetLeft + all[k].offsetWidth/2 - dial.clientWidth/2;
  const setW = () => all[N].offsetLeft - all[0].offsetLeft;
  const offsetFor = i => posOf(N + i);
  function nearestK(){
    const mid = dial.scrollLeft + dial.clientWidth/2; let best = 0, bd = Infinity;
    all.forEach((b,k) => { const d = Math.abs(b.offsetLeft + b.offsetWidth/2 - mid); if(d < bd){ bd = d; best = k; } });
    return best;
  }
  const nearest = () => nearestK() % N;
  function centerAt(k, smooth){ dial.scrollTo({left: posOf(k), behavior: smooth && !reduceDial ? "smooth" : "auto"}); }
  function centerOn(i, smooth){
    /* si ya estamos en otra copia, girar por el camino más corto */
    const here = nearestK(); let k = N + i;
    if(smooth){ const base = here - here % N; k = base + i;
      if(k - here > N/2) k -= N; else if(here - k > N/2) k += N;
      k = Math.max(0, Math.min(all.length-1, k)); }
    centerAt(k, smooth);
  }
  /* Volver a la copia del medio sin movimiento visible */
  function recenter(){
    const k = nearestK(), c = Math.floor(k / N);
    if(c !== 1){ const sb = dial.style.scrollSnapType; dial.style.scrollSnapType = "none";
      dial.scrollLeft += (1 - c) * setW(); dial.style.scrollSnapType = sb; }
  }
  function markNear(i){ all.forEach((b,k) => b.classList.toggle("near", k % N === i)); }
  /* Curvatura de tambor: las novelas se inclinan y achican hacia los bordes */
  let drumRaf = 0;
  function drum(){
    drumRaf = 0;
    if(reduceDial) return;
    const half = dial.clientWidth/2, mid = dial.scrollLeft + half;
    all.forEach(b => {
      const c = b.offsetLeft + b.offsetWidth/2;
      if(Math.abs(c - mid) > half + b.offsetWidth){ if(b.style.transform) b.style.transform = ""; return; }
      const d = Math.max(-1, Math.min(1, (c - mid) / half));
      b.style.transform = "perspective(600px) rotateY(" + (d*38).toFixed(1) + "deg) scale(" + (1 - .14*Math.abs(d)).toFixed(3) + ")";
    });
  }
  const queueDrum = () => { if(!drumRaf) drumRaf = requestAnimationFrame(drum); };
  let settleT = 0, dragging = false, wheelK = null;
  function settle(){
    if(dragging) return;
    wheelK = null;
    recenter();
    const k = nearestK(), i = k % N;
    if(Math.abs(dial.scrollLeft - posOf(k)) > 2) centerAt(k, true);
    if(i !== cur) tune(i, true, true);
    queueDrum();
  }
  dial.addEventListener("scroll", () => {
    markNear(nearest()); queueDrum();
    clearTimeout(settleT); settleT = setTimeout(settle, 140);
  }, {passive:true});
  /* Arrastre con el mouse (en pantallas táctiles el dedo ya desliza solo) */
  let dragX = 0, dragLeft = 0;
  dial.addEventListener("pointerdown", e => {
    if(e.pointerType !== "mouse" || e.button !== 0) return;
    recenter();
    dragging = true; dragMoved = false; dragX = e.clientX; dragLeft = dial.scrollLeft;
  });
  window.addEventListener("pointermove", e => {
    if(!dragging) return;
    const dx = e.clientX - dragX;
    if(!dragMoved && Math.abs(dx) < 5) return;
    if(!dragMoved){ dragMoved = true; dial.classList.add("dragging"); }
    let left = dragLeft - dx;
    const w = setW(), lo = posOf(0) + w*.5, hi = posOf(N-1) + w*1.5;
    if(left < lo){ dragLeft += w; left += w; } else if(left > hi){ dragLeft -= w; left -= w; }
    dial.scrollLeft = left;
  });
  window.addEventListener("pointerup", () => {
    if(!dragging) return;
    dragging = false; dial.classList.remove("dragging");
    settle();
    setTimeout(() => { dragMoved = false; }, 0);
  });
  /* La rueda del mouse (vertical u horizontal) hace girar el dial una novela por golpe */
  let wheelAcc = 0, wheelT = 0;
  dial.addEventListener("wheel", e => {
    const dlt = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if(!dlt) return;
    e.preventDefault();
    const unit = e.deltaMode === 1 ? 33 : e.deltaMode === 2 ? 300 : 1;
    wheelAcc += dlt * unit;
    clearTimeout(wheelT); wheelT = setTimeout(() => { wheelAcc = 0; }, 200);
    const STEP = 60;
    if(Math.abs(wheelAcc) < STEP) return;
    const dir = Math.sign(wheelAcc); wheelAcc = 0;
    if(wheelK === null){ recenter(); wheelK = nearestK(); }
    wheelK += dir;
    /* si nos acercamos al borde de las copias, saltar una vuelta entera sin que se note */
    if(wheelK < N/2 || wheelK >= 2*N + N/2){
      const shift = wheelK < N/2 ? 1 : -1;
      dial.style.scrollSnapType = "none";
      dial.scrollTo({left: dial.scrollLeft + shift*setW(), behavior:"auto"});
      dial.style.scrollSnapType = "";
      wheelK += shift*N;
    }
    centerAt(wheelK, true);
  }, {passive:false});
  window.addEventListener("resize", () => { if(cur >= 0) centerOn(cur, false); queueDrum(); });
  dial.addEventListener("keydown", e => {
    const k = e.key, n = N;
    let j = null;
    if(k==="ArrowRight"||k==="ArrowDown") j = (cur+1)%n;
    else if(k==="ArrowLeft"||k==="ArrowUp") j = (cur-1+n)%n;
    else if(k==="Home") j = 0; else if(k==="End") j = n-1;
    if(j!==null){ e.preventDefault(); tune(j, true); stations()[j].focus({preventScroll:true}); }
  });

  function tune(i, fromUser, fromDial){
    const changed = i !== cur;
    cur = i;
    const w = D.worlds[i];
    if(changed){
      document.documentElement.style.setProperty("--accent", w.accent);
      const next = layers[1-layerOn];
      next.style.backgroundImage = "url('img/mundos/"+w.repo+"-fondo.jpg')";
      next.classList.add("on"); layers[layerOn].classList.remove("on"); layerOn = 1-layerOn;
      stations().forEach((b,k) => { b.setAttribute("aria-checked", k===i ? "true" : "false"); b.tabIndex = k===i ? 0 : -1; });
      queueDrum();
      markNear(i);
      if(!fromDial) centerOn(i, fromUser);
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
  const NOTE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>';
  const MIC = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>';
  const dur = (it, t) => '<span class="du">'+esc(t.d||"")+'</span>';
  const tag = it => isSong(it)
      ? '<span class="tag song" title="'+esc(T.sung)+'">'+MIC+esc(T.tagSong)+'</span>'
      : '<span class="tag inst">'+NOTE+esc(T.tagInst)+'</span>';
  const trackList = d => {
    const key = "d"+discs.indexOf(d), q = getQueue(key);
    if(!q.length) return '<p class="pending">'+esc(T.vfNone)+'</p>';
    return '<ol>' + q.map((it,k) => { const t = d.tracks[it.t];
      return '<li><button type="button" class="track" data-q="'+key+'" data-i="'+k+'" data-d="'+discs.indexOf(d)+'" data-t="'+it.t+'">'+
      '<span class="n">'+(k+1)+'</span>'+
      '<span class="tt" lang="'+esc(d.world.lang)+'">'+esc(t.t)+(t.o||t.s ? '<small>'+esc(t.o || t.s)+'</small>' : '')+tag(it)+'</span>'+
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
  /* Fichas compactas: tocar una pone la mezcla; abajo, una sola lista plegable con sus canciones */
  let mixSel = D.mixes[0].id;
  function renderMixes(){
    const SHUF = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h3.5c2 0 3 1 4.5 3.5l2 3c1.5 2.5 2.5 3.5 4.5 3.5H21M3 17h3.5c1.2 0 2-.4 2.8-1.2M21 7h-3.5c-1.2 0-2 .4-2.8 1.2M18 4l3 3-3 3M18 14l3 3-3 3"/></svg>';
    $("#mixes").innerHTML = '<button type="button" class="mix-chip shuf" data-shuffle="1" aria-pressed="'+(current.qk==="azar")+'">'+SHUF+'<span class="mc-name">'+esc(T.shuffleAll)+'</span>'+(current.qk==="azar" ? '<span class="mc-on" aria-hidden="true"></span>' : '')+'</button>' + D.mixes.map(m => {
      const key = "m:"+m.id, q = getQueue(key);
      const per = D.worlds.map(w => [w, q.filter(it => it.d.world === w).length]).filter(x => x[1]);
      const most = Math.max(1, ...per.map(x => x[1]));
      const bars = per.map(([w,n]) => '<span style="background:'+w.accent+';height:'+Math.max(18, Math.round(n/most*100))+'%"></span>').join("");
      const playing = current.qk === key;
      return '<button type="button" class="mix-chip" style="--m:'+m.color+'" data-mix="'+m.id+'" aria-pressed="'+(m.id===mixSel && current.qk!=="azar")+'"'+(q.length?'':' disabled')+
        ' aria-label="'+esc(T.playMix(tx(m.name)))+'" title="'+esc(tx(m.desc))+'">'+
        '<span class="mbars" aria-hidden="true">'+bars+'</span>'+
        '<span class="mc-name">'+esc(tx(m.name))+'</span><span class="mc-n">'+q.length+'</span>'+(playing ? '<span class="mc-on" aria-hidden="true"></span>' : '')+'</button>';
    }).join("");
    const m = D.mixes.find(x => x.id === mixSel), key = "m:"+m.id, q = getQueue(key);
    const per = new Set(q.map(it => it.d.world)).size;
    const info = [T.tracks(q.length), minutes(q.map(it => it.d.tracks[it.t])), T.novels(per)].filter(Boolean).join(", ");
    $("#mix-list").style.setProperty("--w", m.color);
    $("#mix-list-t").textContent = T.mixList(tx(m.name), info);
    $("#mix-list-body").innerHTML = q.length ? '<ol>' + q.map((it,k) => { const t = it.d.tracks[it.t], w = it.d.world;
        return '<li><button type="button" class="track" data-q="'+key+'" data-i="'+k+'" data-d="'+discs.indexOf(it.d)+'" data-t="'+it.t+'">'+
          '<span class="n">'+(k+1)+'</span>'+
          '<span class="tt"><span lang="'+esc(w.lang)+'">'+esc(t.t)+'</span><small class="from" style="--w:'+w.accent+'" lang="'+esc(w.lang)+'">'+esc(w.title)+'</small>'+tag(it)+'</span>'+
          dur(it, t)+'</button></li>'; }).join("") + '</ol>' : '<p class="pending">'+esc(T.vfNone)+'</p>';
    markCurrent();
  }
  $("#mixes").addEventListener("click", e => {
    const b = e.target.closest(".mix-chip"); if(!b || b.disabled) return;
    if(b.dataset.shuffle){ start("azar", 0); return; }
    mixSel = b.dataset.mix; start("m:"+mixSel, 0);
  });

  document.addEventListener("click", e => {
    const b = e.target.closest(".track"); if(!b) return;
    const q = b.dataset.q, i = +b.dataset.i;
    if(current.qk===q && current.i===i){ toggle(); return; }
    start(q, i);
  });


  /* ---------- Reproductor ---------- */
  const audio = $("#audio"), player = $("#player"), seek = $("#p-seek");
  const current = {d:null, t:-1, qk:null, q:null, i:-1};
  let retried = false;
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
    if(typeof renderMixes === "function") renderMixes();
  }
  function play(auto = true, startAt = 0){
    const it = current.q[current.i], d = it.d, t = it.t;
    current.d = d; current.t = t;
    const tr = d.tracks[t];
    $("#p-error").textContent = "";
    retried = false;
    audio.src = tr.src;
    if(startAt > 0){
      audio.addEventListener("loadedmetadata", () => { try{ audio.currentTime = startAt; }catch(e){} }, {once:true});
      $("#p-cur").textContent = clock(startAt);
    }
    if(auto) audio.play().catch(() => {});
    player.hidden = false;
    document.body.style.setProperty("--player-h", player.offsetHeight + "px");
    player.style.setProperty("--pa", d.accent);
    $("#p-cover").src = d.cover;
    const pt = $("#p-title"); pt.textContent = tr.t; pt.lang = d.world.lang;
    playerText();
    $("#p-dur").textContent = tr.d || "0:00";
    markCurrent();
    lyLoad();
    qRender();
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

  /* ---------- Lo más escuchado (Supabase) ----------
     Una escucha cuenta después de 30 segundos sonando (o la mitad, si la pista es más corta).
     El mismo navegador no vuelve a sumar la misma pista hasta 20 minutos después. */
  const trackId = tr => tr.src.replace(/^https:\/\/luisfader\.github\.io\//, "");
  const byId = new Map();
  discs.forEach(d => d.tracks.forEach((tr, t) => byId.set(trackId(tr), {d, t})));
  let topDays = 7, topRows = [], topLoaded = false, topEver = false;
  function rpc(name, body, keepalive){
    return fetch(RANKING.url.replace(/\/$/, "") + "/rest/v1/rpc/" + name, {
      method: "POST", keepalive: !!keepalive,
      /* Las claves nuevas (sb_publishable_…) van solo en apikey; las viejas (anon, eyJ…) también en Authorization */
      headers: Object.assign({apikey: RANKING.key, "Content-Type": "application/json"},
        RANKING.key.startsWith("sb_") ? {} : {Authorization: "Bearer " + RANKING.key}),
      body: JSON.stringify(body)
    });
  }
  async function loadTop(){
    if(!RANKING.url || !RANKING.key) return;
    try{
      const r = await rpc("mas_escuchadas", {p_dias: topDays || null, p_limite: 10});
      if(!r.ok) return;
      const rows = await r.json();
      topRows = rows.map(x => ({it: byId.get(x.pista), n: +x.escuchas})).filter(x => x.it);
      topLoaded = true; if(topRows.length) topEver = true;
      const playing = current.qk === "top" ? current.q[current.i] : null;
      topQ = topRows.map(x => x.it);
      if(playing){ current.q = topQ.slice(); current.i = topQ.indexOf(playing); }
      renderTop();
    }catch(e){ /* sin conexión: la sección queda como estaba */ }
  }
  function renderTop(){
    const sec = $("#ranking");
    sec.hidden = !topLoaded || !topEver;
    if(sec.hidden) return;
    const g = $("#top-pick");
    g.setAttribute("aria-label", T.topPick);
    g.innerHTML = [[7, T.topWeek], [0, T.topAll]].map(([v, lab]) =>
      '<button type="button" data-days="'+v+'" aria-pressed="'+(v === topDays)+'">'+esc(lab)+'</button>').join("");
    $("#top").innerHTML = topRows.length ? '<ol>' + topRows.map((x, k) => { const t = x.it.d.tracks[x.it.t], w = x.it.d.world;
      return '<li><button type="button" class="track" data-q="top" data-i="'+k+'" data-d="'+discs.indexOf(x.it.d)+'" data-t="'+x.it.t+'">'+
        '<span class="n">'+(k+1)+'</span>'+
        '<span class="tt"><span lang="'+esc(w.lang)+'">'+esc(t.t)+'</span><small class="from" style="--w:'+w.accent+'" lang="'+esc(w.lang)+'">'+esc(w.title)+'</small>'+tag(x.it)+'</span>'+
        '<span class="du">'+esc(T.plays(x.n))+'</span></button></li>'; }).join("") + '</ol>'
      : '<p class="pending">'+esc(T.topNone)+'</p>';
    markCurrent();
  }
  $("#top-pick").addEventListener("click", e => {
    const b = e.target.closest("button[data-days]"); if(!b || +b.dataset.days === topDays) return;
    topDays = +b.dataset.days; loadTop();
  });
  let heardId = null, heard = 0, lastPos = 0, counted = false;
  function countPlay(id){
    if(!RANKING.url || !RANKING.key) return;
    let seen = {};
    try{ seen = JSON.parse(localStorage.getItem("fader-escuchas") || "{}") || {}; }catch(e){}
    const now = Date.now();
    if(seen[id] && now - seen[id] < 20*60*1000) return;
    seen[id] = now;
    Object.keys(seen).forEach(k => { if(now - seen[k] > 24*3600*1000) delete seen[k]; });
    try{ localStorage.setItem("fader-escuchas", JSON.stringify(seen)); }catch(e){}
    rpc("registrar_escucha", {p_pista: id}, true).then(() => setTimeout(loadTop, 1200)).catch(() => {});
  }
  audio.addEventListener("loadstart", () => { heardId = null; });
  audio.addEventListener("timeupdate", () => {
    if(!current.d) return;
    const id = trackId(current.d.tracks[current.t]);
    if(id !== heardId){ heardId = id; heard = 0; counted = false; lastPos = audio.currentTime; return; }
    const dt = audio.currentTime - lastPos; lastPos = audio.currentTime;
    if(dt > 0 && dt < 2) heard += dt;
    const need = Math.min(30, (isFinite(audio.duration) && audio.duration ? audio.duration : 60) * 0.5);
    if(!counted && heard >= need){ counted = true; countPlay(id); }
  });
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
    /* un corte de red (frecuente con la pantalla bloqueada): se reintenta una vez desde donde iba */
    if(!retried && audio.error && audio.error.code !== 4){
      retried = true;
      const at = audio.currentTime || 0;
      audio.load();
      if(at > 0) audio.addEventListener("loadedmetadata", () => { try{ audio.currentTime = at; }catch(e){} }, {once:true});
      audio.play().catch(() => {});
      return;
    }
    audioFailed = true;
    $("#p-error").textContent = T.error;
    document.body.style.setProperty("--player-h", player.offsetHeight + "px");
  });
  audio.addEventListener("loadstart", () => { audioFailed = false; });
  let seeking = false;
  seek.addEventListener("input", () => { seeking = true; if(audio.duration) $("#p-cur").textContent = clock(seek.value/1000*audio.duration); });
  seek.addEventListener("change", () => { if(audio.duration) audio.currentTime = seek.value/1000*audio.duration; seeking = false; });
  window.addEventListener("resize", () => { if(!player.hidden) document.body.style.setProperty("--player-h", player.offsetHeight + "px"); });

  /* ---------- Segundo plano ----------
     Controles completos en la pantalla bloqueada y en los auriculares, y memoria de lo que
     sonaba: si el celular cierra la página para liberar memoria, al volver el reproductor
     queda listo en la misma canción y el mismo segundo. */
  const MS = "mediaSession" in navigator ? navigator.mediaSession : null;
  if(MS){
    const h = (a, f) => { try{ MS.setActionHandler(a, f); }catch(e){} };
    h("play", () => { if(current.d) audio.play().catch(()=>{}); });
    h("pause", () => audio.pause());
    h("stop", () => audio.pause());
    h("previoustrack", () => prev());
    h("nexttrack", () => next());
    h("seekto", e => { if(e.seekTime != null && isFinite(e.seekTime)) audio.currentTime = e.seekTime; posState(); });
    h("seekbackward", e => { audio.currentTime = Math.max(0, audio.currentTime - (e.seekOffset || 10)); posState(); });
    h("seekforward", e => { audio.currentTime = Math.min(audio.duration || 1e9, audio.currentTime + (e.seekOffset || 10)); posState(); });
  }
  function posState(){
    if(!MS || !MS.setPositionState || !isFinite(audio.duration) || !audio.duration) return;
    try{ MS.setPositionState({duration: audio.duration, playbackRate: audio.playbackRate || 1, position: Math.min(audio.currentTime, audio.duration)}); }catch(e){}
  }
  const SAVE = "fader-sonando";
  let lastSave = 0;
  function saveState(){
    if(!current.d) return;
    try{ localStorage.setItem(SAVE, JSON.stringify({qk: current.qk, src: current.d.tracks[current.t].src, time: audio.currentTime || 0, at: Date.now()})); }catch(e){}
  }
  audio.addEventListener("play", () => { if(MS) MS.playbackState = "playing"; posState(); });
  audio.addEventListener("pause", () => { if(MS) MS.playbackState = "paused"; posState(); saveState(); });
  ["loadedmetadata","seeked","ratechange"].forEach(ev => audio.addEventListener(ev, posState));
  audio.addEventListener("timeupdate", () => {
    const now = Date.now();
    if(now - lastSave > 5000){ lastSave = now; saveState(); posState(); }
  });
  window.addEventListener("pagehide", saveState);
  document.addEventListener("visibilitychange", () => { if(document.hidden) saveState(); });
  function restoreState(){
    let s = null;
    try{ s = JSON.parse(localStorage.getItem(SAVE) || "null"); }catch(e){}
    if(!s || !s.src || Date.now() - s.at > 12*3600*1000) return;
    let key = s.qk, q = key && key !== "azar" && key !== "top" ? getQueue(key) : [];
    let i = q.findIndex(it => it.d.tracks[it.t].src === s.src);
    if(i < 0){
      for(let k = 0; k < discs.length; k++){
        const t = discs[k].tracks.findIndex(tr => tr.src === s.src);
        if(t < 0) continue;
        key = "d"+k; q = getQueue(key); i = q.findIndex(it => it.d === discs[k] && it.t === t);
        if(i < 0){ q = discs[k].tracks.map((_, n) => ({d: discs[k], t: n})); i = t; }
        break;
      }
    }
    if(i < 0) return;
    current.qk = key; current.q = q; current.i = i;
    play(false, s.time > 3 ? s.time : 0);
  }


  /* ---------- Espectro (Web Audio) ----------
     Analiza la música real que suena. Solo funciona si el MP3 está en el mismo
     dominio que el portal (luisfader.github.io); si no, se oculta y el audio
     sigue sonando normal. Se dibuja solo mientras hay música.
     Tocándolo cambia entre cuatro estilos: barras, ondas, osciloscopio y aurora. */
  const specBtn = $("#p-spec-btn"), spec = $("#p-spec"), sctx = spec.getContext("2d");
  const reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const MODES = ["bars","ripples","scope","aurora"];
  let mode = "bars";
  try{ const m = localStorage.getItem("fader-spec"); if(MODES.includes(m)) mode = m; }catch(e){}
  let actx = null, analyser = null, freq = null, wave = null, specOn = false, raf = 0, lastDraw = 0;
  let bars = [], peaks = [], peakHold = [], ranges = [], grad = null, gradFor = "", specW = 0, specH = 0, dpr = 1;
  let rings = [], bassAvg = 0, lastRing = 0, labelUntil = 0;
  function specReady(){
    if(analyser) return true;
    let same = false;
    try{ same = new URL(audio.src, location.href).origin === location.origin; }catch(e){}
    const AC = window.AudioContext || window.webkitAudioContext;
    /* En el celular el audio no pasa por Web Audio: con la pantalla bloqueada o en segundo plano
       el sistema congela el AudioContext y la música que pasa por él se corta. */
    if(!same || !AC || MOBILE) return false;
    try{
      actx = new AC();
      actx.addEventListener("statechange", () => { if(actx.state !== "running" && !audio.paused) actx.resume().catch(()=>{}); });
      const src = actx.createMediaElementSource(audio);
      analyser = actx.createAnalyser();
      analyser.fftSize = 1024; analyser.smoothingTimeConstant = .72;
      analyser.minDecibels = -88; analyser.maxDecibels = -18;
      src.connect(analyser); analyser.connect(actx.destination);
      freq = new Uint8Array(analyser.frequencyBinCount);
      wave = new Uint8Array(analyser.fftSize);
    }catch(e){ analyser = null; return false; }
    return true;
  }
  function specSize(){
    const r = spec.getBoundingClientRect(); dpr = Math.min(window.devicePixelRatio || 1, 2);
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
  const accentNow = () => current.d ? current.d.accent : "#d0607e";
  function rgba(hex, a){ const n = parseInt(hex.slice(1), 16); return "rgba("+(n>>16&255)+","+(n>>8&255)+","+(n&255)+","+a+")"; }
  function specColor(){
    const accent = accentNow();
    if(gradFor === accent && grad) return;
    grad = sctx.createLinearGradient(0, specH, 0, 0);
    grad.addColorStop(0, accent); grad.addColorStop(.7, accent); grad.addColorStop(1, "#f1ebdf");
    gradFor = accent;
  }
  /* Lee el audio y suaviza las bandas; lo usan todos los estilos */
  function readBands(paused){
    analyser.getByteFrequencyData(freq);
    let alive = false;
    for(let i = 0; i < bars.length; i++){
      let v = 0;
      if(!paused){ const [a,b] = ranges[i]; for(let k = a; k < b; k++) if(freq[k] > v) v = freq[k]; }
      v = v / 255;
      bars[i] = v > bars[i] ? v : Math.max(0, bars[i] - 0.06);
      if(bars[i] >= peaks[i]){ peaks[i] = bars[i]; peakHold[i] = 18; }
      else if(peakHold[i] > 0) peakHold[i]--;
      else peaks[i] = Math.max(0, peaks[i] - 0.015);
      if(bars[i] > 0 || peaks[i] > 0) alive = true;
    }
    return alive;
  }

  /* 1. Barras segmentadas con picos que caen, como Winamp */
  function drawBars(){
    const n = bars.length, gap = Math.max(1, Math.round(specW/n*0.22)), bw = (specW - gap*(n+1)) / n;
    const seg = Math.max(2, Math.round(specH/14)), segGap = Math.max(1, Math.round(seg/2)), step = seg + segGap;
    specColor();
    for(let i = 0; i < n; i++){
      const x = Math.round(gap + i*(bw+gap)), w = Math.max(1, Math.round(bw));
      const segs = Math.floor(bars[i] * specH / step);
      sctx.fillStyle = grad;
      for(let k = 0; k < segs; k++) sctx.fillRect(x, specH - (k+1)*step + segGap, w, seg);
      if(peaks[i] > 0.02){
        sctx.fillStyle = "#f1ebdf";
        sctx.fillRect(x, Math.max(0, Math.round(specH - peaks[i]*specH)), w, Math.max(1, Math.round(seg/1.5)));
      }
    }
    return false;
  }

  /* 2. Ondas: anillos que nacen con los golpes de graves, se expanden y vibran */
  function drawRipples(t, paused){
    const n = bars.length, q = Math.max(2, Math.round(n/4));
    let bass = 0, all = 0;
    for(let i = 0; i < n; i++){ all += bars[i]; if(i < q) bass += bars[i]; }
    bass /= q; all /= n;
    if(!paused){
      const hit = bass > bassAvg*1.18 + 0.06 && t - lastRing > 140;
      if(hit || (t - lastRing > 700 && all > 0.05)){ rings.push({r: 0.02, a: 0.95, w: 1 + bass*2.5}); lastRing = t; }
      bassAvg = bassAvg*0.9 + bass*0.1;
    }
    const cx = specW/2, cy = specH/2, accent = accentNow();
    const sx = specW/2, sy = specH*0.9;
    sctx.lineCap = "round";
    for(let k = rings.length-1; k >= 0; k--){
      const g = rings[k];
      g.r += 0.006 + all*0.03; g.a -= 0.011;
      if(g.a <= 0 || g.r > 1.25){ rings.splice(k,1); continue; }
      sctx.beginPath();
      const steps = 72;
      for(let j = 0; j <= steps; j++){
        const ang = j/steps*Math.PI*2;
        const band = bars[Math.floor((Math.abs(Math.cos(ang/2)))*(n-1))] || 0;
        const wob = 1 + band*0.22*(1 - g.r*0.5)*Math.sin(ang*6 + t/180);
        const x = cx + Math.cos(ang)*g.r*sx*wob, y = cy + Math.sin(ang)*g.r*sy*wob;
        j ? sctx.lineTo(x, y) : sctx.moveTo(x, y);
      }
      sctx.strokeStyle = rgba(accent, g.a.toFixed(3));
      sctx.lineWidth = g.w*dpr;
      sctx.stroke();
    }
    const core = (0.12 + bass*0.5)*specH/2;
    const rg = sctx.createRadialGradient(cx, cy, 0, cx, cy, core*2.2);
    rg.addColorStop(0, rgba("#f1ebdf", (0.35 + bass*0.6).toFixed(3))); rg.addColorStop(.35, rgba(accent, (0.5*bass+0.15).toFixed(3))); rg.addColorStop(1, rgba(accent, 0));
    sctx.fillStyle = rg; sctx.fillRect(0, 0, specW, specH);
    return rings.length > 0;
  }

  /* 3. Osciloscopio: la forma de onda real, como una línea luminosa */
  function drawScope(paused){
    const accent = accentNow(), mid = specH/2;
    if(!paused) analyser.getByteTimeDomainData(wave);
    const len = paused ? 2 : wave.length, step = specW/(len-1);
    sctx.save();
    sctx.strokeStyle = rgba(accent, .25); sctx.lineWidth = 1*dpr;
    sctx.beginPath(); sctx.moveTo(0, mid); sctx.lineTo(specW, mid); sctx.stroke();
    sctx.shadowColor = accent; sctx.shadowBlur = 8*dpr;
    sctx.strokeStyle = accent; sctx.lineWidth = 1.8*dpr; sctx.lineJoin = "round";
    sctx.beginPath();
    for(let i = 0; i < len; i++){
      const v = paused ? 0 : (wave[i]-128)/128;
      const y = mid + Math.max(-1, Math.min(1, v*1.6))*(specH/2 - 2*dpr);
      i ? sctx.lineTo(i*step, y) : sctx.moveTo(0, y);
    }
    sctx.stroke();
    sctx.restore();
    return false;
  }

  /* 4. Aurora: el espectro como una curva suave y espejada que respira */
  function drawAurora(){
    const n = bars.length, accent = accentNow(), mid = specH/2;
    const pts = bars.map((v,i) => [i/(n-1)*specW, v]);
    const path = sign => {
      sctx.moveTo(0, mid);
      for(let i = 0; i < n-1; i++){
        const [x0,v0] = pts[i], [x1,v1] = pts[i+1];
        const y0 = mid + sign*v0*(mid-1), y1 = mid + sign*v1*(mid-1);
        sctx.quadraticCurveTo(x0, y0, (x0+x1)/2, (y0+y1)/2);
      }
      sctx.lineTo(specW, mid);
    };
    const g = sctx.createLinearGradient(0, 0, 0, specH);
    g.addColorStop(0, rgba("#f1ebdf", .85)); g.addColorStop(.3, rgba(accent, .9)); g.addColorStop(.5, rgba(accent, .25));
    g.addColorStop(.7, rgba(accent, .9)); g.addColorStop(1, rgba("#f1ebdf", .85));
    sctx.fillStyle = g;
    sctx.beginPath(); path(-1); path(1); sctx.fill();
    sctx.strokeStyle = rgba("#f1ebdf", .55); sctx.lineWidth = 1*dpr;
    sctx.beginPath(); path(-1); sctx.stroke();
    sctx.beginPath(); path(1); sctx.stroke();
    return false;
  }

  function specFrame(t){
    raf = 0;
    if(!specOn) return;
    raf = requestAnimationFrame(specFrame);
    if(reduceMotion && t - lastDraw < 66) return;
    lastDraw = t;
    const paused = audio.paused;
    let alive = readBands(paused);
    sctx.clearRect(0, 0, specW, specH);
    if(mode === "ripples") alive = drawRipples(t, paused) || alive;
    else if(mode === "scope") drawScope(paused);
    else if(mode === "aurora") drawAurora();
    else drawBars();
    /* al cambiar de estilo, su nombre aparece un momento */
    if(t < labelUntil){
      const a = Math.min(1, (labelUntil - t)/400);
      sctx.font = "600 "+Math.round(11*dpr)+"px 'Alegreya Sans', system-ui, sans-serif";
      sctx.textBaseline = "top";
      const txt = T.specModes[MODES.indexOf(mode)], pad = 4*dpr, w = sctx.measureText(txt).width;
      sctx.fillStyle = "rgba(10,8,18,"+(0.7*a).toFixed(3)+")"; sctx.fillRect(pad, pad, w + pad*2, 15*dpr);
      sctx.fillStyle = rgba("#f1ebdf", a.toFixed(3)); sctx.fillText(txt, pad*2, pad + 1.5*dpr);
      alive = true;
    }
    if(paused && !alive){ specOn = false; cancelAnimationFrame(raf); raf = 0; }
  }
  function specKick(){ specOn = true; if(!raf) raf = requestAnimationFrame(specFrame); }
  function specStart(){
    if(!specReady()){ specBtn.hidden = true; return; }
    if(specBtn.hidden){ specBtn.hidden = false; document.body.style.setProperty("--player-h", player.offsetHeight + "px"); specSize(); }
    if(actx.state === "suspended") actx.resume().catch(()=>{});
    specKick();
  }
  function specLabel(){
    specBtn.setAttribute("aria-label", T.specStyle + ": " + T.specModes[MODES.indexOf(mode)]);
    specBtn.title = T.specStyle;
  }
  specBtn.addEventListener("click", () => {
    mode = MODES[(MODES.indexOf(mode)+1) % MODES.length];
    try{ localStorage.setItem("fader-spec", mode); }catch(e){}
    rings = []; labelUntil = performance.now() + 1400;
    specLabel();
    if(analyser) specKick();
  });
  audio.addEventListener("play", specStart);
  audio.addEventListener("pause", () => { if(analyser) specKick(); });
  window.addEventListener("resize", () => { if(!specBtn.hidden) specSize(); });



  /* ---------- Portada en grande ----------
     Tocar la portada (en el reproductor o en la ficha de la novela) la abre
     a pantalla completa; se cierra con la cruz, tocando afuera o con Escape. */
  const cv = $("#cover-view"), cvImg = $("#cv-img");
  function coverOpen(src, alt){
    cvImg.src = src; cvImg.alt = alt || "";
    if(typeof cv.showModal === "function") cv.showModal(); else cv.setAttribute("open","");
  }
  function coverClose(){ if(typeof cv.close === "function") cv.close(); else cv.removeAttribute("open"); }
  $("#cv-close").addEventListener("click", coverClose);
  cv.addEventListener("click", e => { if(e.target === cv) coverClose(); });
  const pCover = $("#p-cover");
  const pCoverOpen = () => { if(current.d) coverOpen(current.d.cover, T.cover(tx(current.d.name))); };
  pCover.addEventListener("click", pCoverOpen);
  pCover.addEventListener("keydown", e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); pCoverOpen(); } });
  document.addEventListener("click", e => {
    const img = e.target.closest(".world-cover"); if(!img) return;
    coverOpen(img.currentSrc || img.src, img.alt);
  });

  /* ---------- Lista de lo que suena ----------
     Tocar el nombre de la canción en el reproductor abre la lista entera
     (el disco o la mezcla que está sonando) para elegir cualquier pista. */
  const qPanel = $("#queue"), qBody = $("#q-body"), qBtn = $("#p-title");
  let qOpen = false;
  const narrow = () => window.matchMedia("(max-width:820px)").matches;
  function qRender(){
    qBtn.title = T.queueOpen; $("#p-cover").title = T.coverOpen; $("#p-cover").setAttribute("aria-label", T.coverOpen);
    if(!qOpen || !current.q) return;
    const d = current.d, m = mixOfKey(current.qk), multi = !!m || current.qk === "azar" || current.qk === "top";
    $("#q-title").textContent = m ? tx(m.name) : current.qk === "azar" ? T.shuffleAll : current.qk === "top" ? T.topH : tx(d.name);
    $("#q-sub").textContent = multi ? "" : d.world.title;
    qPanel.style.setProperty("--pa", d.accent);
    qBody.innerHTML = current.q.map((it,k) => { const t = it.d.tracks[it.t], w = it.d.world;
      return '<li><button type="button" class="q-item" data-k="'+k+'"'+(k===current.i?' aria-current="true"':'')+'>'+
        '<span class="n">'+(k===current.i ? '♪' : k+1)+'</span>'+
        '<span class="tt"><span lang="'+esc(w.lang)+'">'+esc(t.t)+'</span>'+(multi ? '<small class="from" style="--w:'+w.accent+'" lang="'+esc(w.lang)+'">'+esc(w.title)+'</small>' : (t.o||t.s ? '<small>'+esc(t.o||t.s)+'</small>' : ''))+'</span>'+
        '<span class="du">'+esc(t.d||"")+'</span></button></li>'; }).join("");
    const on = qBody.querySelector('[aria-current]'); if(on) on.scrollIntoView({block:"nearest"});
  }
  function qToggle(open){
    if(open && lyOpen && narrow()) lyToggle(false);
    qOpen = open;
    qPanel.hidden = !open;
    qBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if(open){ qRender(); const on = qBody.querySelector('[aria-current]'); (on || $("#q-close")).focus({preventScroll:true}); }
    else qBtn.focus({preventScroll:true});
  }
  qBtn.addEventListener("click", () => qToggle(!qOpen));
  $("#q-close").addEventListener("click", () => qToggle(false));
  document.addEventListener("keydown", e => { if(e.key === "Escape" && qOpen) qToggle(false); });
  qBody.addEventListener("click", e => {
    const b = e.target.closest(".q-item"); if(!b) return;
    const k = +b.dataset.k;
    if(k === current.i){ toggle(); return; }
    current.i = k; play();
  });

  /* ---------- Letra ----------
     Panel con la letra de lo que suena. Cada letra se carga recién al abrirla
     (letras/<novela>/<archivo>.txt). Se desplaza sola al ritmo de la canción,
     salvo durante unos segundos después de que la persona scrollea. */
  const lyPanel = $("#lyrics"), lyBody = $("#ly-body"), lyBtn = $("#p-ly"), lyTabs = $("#ly-tabs");
  const lyCache = {};
  let lyOpen = false, lyView = "orig", lySeq = 0, lyTouched = 0;
  const lyPath = (d, t, l) => "letras/" + d.world.id + "/" + t.src.split("/").pop().replace(/\.mp3$/i, "") + (l ? "." + l : "") + ".txt";
  function lyMsg(text){ lyBody.innerHTML = '<p class="ly-msg">'+esc(text)+'</p>'; }
  function lyRender(text, lang){
    lyBody.lang = lang;
    const line = l => /^\(.*\)$/.test(l.trim()) ? '<span class="ly-aside">'+esc(l)+'</span>' : esc(l);
    lyBody.innerHTML = text.trim().split(/\n\s*\n/).map(st => '<p>'+st.split("\n").map(line).join("<br>")+'</p>').join("");
    lyBody.scrollTop = 0;
  }
  async function lyLoad(){
    if(!lyOpen || !current.d) return;
    const d = current.d, t = d.tracks[current.t], seq = ++lySeq;
    const tt = $("#ly-title"); tt.textContent = t.t; tt.lang = d.world.lang;
    $("#ly-sub").textContent = d.world.title;
    lyPanel.style.setProperty("--pa", d.accent);
    const hasTr = t.ly && t.lyt && t.lyt.includes(L) && L !== d.world.lang;
    if(!hasTr) lyView = "orig";
    lyTabs.hidden = !hasTr;
    if(hasTr){
      lyTabs.setAttribute("aria-label", T.lyrics);
      lyTabs.innerHTML = [["orig",T.lyOrig],["tr",T.lyTr]].map(([v,lab]) => '<button type="button" data-ly="'+v+'" aria-pressed="'+(v===lyView)+'">'+esc(lab)+'</button>').join("");
    }
    if(d.voice[current.t] !== "S") return lyMsg(T.lyInst);
    if(!t.ly) return lyMsg(T.lyNone);
    const path = lyPath(d, t, lyView === "tr" ? L : null);
    if(!lyCache[path]){
      lyMsg(T.lyLoading);
      try{
        const r = await fetch(path);
        if(!r.ok) throw new Error(r.status);
        lyCache[path] = await r.text();
      }catch(e){ if(seq === lySeq) lyMsg(T.lyError); return; }
    }
    if(seq !== lySeq) return;
    lyRender(lyCache[path], lyView === "tr" ? L : d.world.lang);
  }
  function lyToggle(open){
    if(open && qOpen && narrow()) qToggle(false);
    lyOpen = open;
    lyPanel.hidden = !open;
    lyBtn.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("ly-on", open);
    if(open){ lyTouched = 0; lyLoad(); lyBody.focus({preventScroll:true}); }
    else lyBtn.focus({preventScroll:true});
  }
  lyBtn.addEventListener("click", () => lyToggle(!lyOpen));
  $("#ly-close").addEventListener("click", () => lyToggle(false));
  document.addEventListener("keydown", e => { if(e.key === "Escape" && lyOpen) lyToggle(false); });
  lyTabs.addEventListener("click", e => { const b = e.target.closest("button[data-ly]"); if(!b || b.dataset.ly === lyView) return; lyView = b.dataset.ly; lyLoad(); });
  ["wheel","touchstart","pointerdown","keydown"].forEach(ev => lyBody.addEventListener(ev, () => { lyTouched = Date.now(); }, {passive:true}));
  audio.addEventListener("timeupdate", () => {
    if(!lyOpen || !audio.duration || Date.now() - lyTouched < 5000) return;
    const max = lyBody.scrollHeight - lyBody.clientHeight; if(max <= 0) return;
    /* empieza a bajar después del primer 8 % y termina un poco antes del final */
    const p = Math.min(1, Math.max(0, (audio.currentTime/audio.duration - 0.08) / 0.82));
    const target = p * max;
    lyBody.scrollTop += (target - lyBody.scrollTop) * (reduceMotion ? 1 : 0.25);
  });

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
    all.forEach((b,k) => {
      const w = D.worlds[k % N];
      b.querySelector("small").textContent = langName(w.lang);
      if(b.getAttribute("role") === "radio") b.setAttribute("aria-label", w.title + (w.tr && w.tr[L] ? " ("+w.tr[L]+")" : ""));
    });
    if(cur >= 0) tune(cur, false);
    renderWorlds(); renderMixes(); renderVF(); renderTop(); playerText(); specLabel(); lyLoad(); qRender();
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
  restoreState();
  loadTop();
})();
