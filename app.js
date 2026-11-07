(function(){
  "use strict";
  const D = window.PORTAL;
  const LITMIR = "https://luisfader.github.io/litmir/#/";
  const LANGS = {es:"castellano",ru:"ruso",it:"italiano",pt:"portugués",cs:"checo",en:"inglés",fr:"francés",tr:"turco",sr:"serbio",eo:"esperanto",isv:"intereslavo",de:"alemán",vo:"volapük",ia:"interlingua",ld:"láadan",pl:"polaco"};
  const SHORT = {misterio:"Misterio",corazonada:"Corazonada",horizonte:"Горизонт",volny:"Волны",onde:"Onde",momento:"Città"};
  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const secs = d => { if(!d) return 0; const [m,s] = d.split(":").map(Number); return m*60 + (s||0); };
  const clock = t => { t = Math.max(0, Math.floor(t||0)); return Math.floor(t/60) + ":" + String(t%60).padStart(2,"0"); };
  const minutes = tracks => { const t = tracks.reduce((a,x)=>a+secs(x.d),0); return t ? Math.round(t/60) + " min" : ""; };
  const plural = (n,a,b) => n + " " + (n===1 ? a : b);

  /* Todos los discos en una sola lista, para el reproductor */
  const discs = [];
  D.worlds.forEach(w => w.discs.forEach(d => { d.world = w; d.accent = w.accent; discs.push(d); }));
  D.archive.forEach(a => { a.disc.world = a; a.disc.accent = "#f1ebdf"; discs.push(a.disc); });

  /* ---------- Dial ---------- */
  const dial = $("#dial"), needle = dial.querySelector(".needle");
  const layers = document.querySelectorAll(".layer");
  let cur = -1, layerOn = 0;
  dial.style.setProperty("--n", D.worlds.length);
  D.worlds.forEach((w,i) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "station"; b.setAttribute("role","radio");
    b.setAttribute("aria-checked","false"); b.tabIndex = -1; b.dataset.i = i;
    b.innerHTML = '<span lang="'+w.lang+'">'+esc(SHORT[w.id] || w.title)+'</span><small>'+esc(LANGS[w.lang])+'</small>';
    b.setAttribute("aria-label", w.title + (w.es ? " ("+w.es+")" : ""));
    b.addEventListener("click", () => tune(i, true));
    dial.appendChild(b);
  });
  dial.addEventListener("keydown", e => {
    const k = e.key, n = D.worlds.length;
    let j = null;
    if(k==="ArrowRight"||k==="ArrowDown") j = (cur+1)%n;
    else if(k==="ArrowLeft"||k==="ArrowUp") j = (cur-1+n)%n;
    else if(k==="Home") j = 0; else if(k==="End") j = n-1;
    if(j!==null){ e.preventDefault(); tune(j, true); dial.children[j+2].focus(); }
  });

  function tune(i, fromUser){
    if(i===cur) return;
    cur = i;
    const w = D.worlds[i];
    document.documentElement.style.setProperty("--accent", w.accent);
    const next = layers[1-layerOn];
    next.style.backgroundImage = "url('img/mundos/"+w.repo+"-fondo.jpg')";
    next.classList.add("on"); layers[layerOn].classList.remove("on"); layerOn = 1-layerOn;
    needle.style.setProperty("--x", ((i+.5)/D.worlds.length*100)+"%");
    dial.querySelectorAll(".station").forEach((b,k) => {
      b.setAttribute("aria-checked", k===i ? "true" : "false"); b.tabIndex = k===i ? 0 : -1;
    });
    $("#hero-place").textContent = w.place;
    const h = $("#hero-title"); h.textContent = w.title; h.lang = w.lang;
    $("#hero-es").textContent = w.es || "";
    $("#hero-blurb").textContent = w.blurb;
    $("#hero-site").href = w.discs[0].url;
    const nv = $("#hero-novel"); nv.href = LITMIR + w.novels[0][0];
    const n = w.discs.reduce((a,d)=>a+d.tracks.length,0);
    $("#hero-count").textContent = w.kind + ". " + plural(n,"pista","pistas") + ", en " + LANGS[w.lang] + ".";
    if(fromUser){ try{ history.replaceState(null,"","#"+w.id); }catch(e){} }
  }
  $("#hero-play").addEventListener("click", () => play(D.worlds[cur].discs[0], 0));

  /* ---------- Mundos ---------- */
  const trackList = d => '<ol>' + d.tracks.map((t,k) =>
      '<li><button type="button" class="track" data-d="'+discs.indexOf(d)+'" data-t="'+k+'">'+
      '<span class="n">'+(k+1)+'</span>'+
      '<span class="tt" lang="'+esc(d.world.lang)+'">'+esc(t.t)+(t.o||t.s ? '<small>'+esc(t.o || t.s)+'</small>' : '')+'</span>'+
      '<span class="du">'+esc(t.d||"")+'</span></button></li>').join("") + '</ol>' +
      (d.pending ? '<p class="pending">'+plural(d.pending,"canción más todavía sin grabar","canciones más todavía sin grabar")+'. Sus letras ya están en el sitio.</p>' : '');
  const discBlock = (d, open) => {
    const info = [plural(d.tracks.length,"pista","pistas"), minutes(d.tracks)].filter(Boolean).join(", ");
    return '<details class="disc"'+(open?' open':'')+'><summary><img src="'+esc(d.cover)+'" alt="" loading="lazy" width="48" height="48">'+
      '<span><span class="d-name" lang="'+esc(d.world.lang)+'">'+esc(d.name)+'</span><span class="d-info">'+esc(info)+(d.note ? '. '+esc(d.note) : '')+'</span></span></summary>'+trackList(d)+'</details>';
  };
  const novelLinks = (w) => w.novels.map(([s,l]) => '<li><a href="'+LITMIR+s+'">'+esc(l)+'</a></li>').join("");

  $("#worlds").innerHTML = D.worlds.map(w => {
    const n = w.discs.reduce((a,d)=>a+d.tracks.length,0);
    return '<article class="world" id="m-'+w.id+'" style="--w:'+w.accent+'">'+
      '<img class="world-cover" src="'+esc(w.discs[0].cover)+'" alt="Portada de '+esc(w.title)+'" loading="lazy" width="560" height="840">'+
      '<div class="w-head"><h3 lang="'+w.lang+'"><a href="'+esc(w.discs[0].url)+'">'+esc(w.title)+'</a></h3>'+
      (w.es ? '<p class="es">'+esc(w.es)+'</p>' : '')+
      '<p class="meta"><b>'+esc(w.place)+'</b>. '+esc(w.author)+', en '+LANGS[w.lang]+'. '+plural(n,"pista","pistas")+'.</p></div>'+
      '<p class="desc">'+esc(w.blurb)+'</p>'+
      '<ul class="links"><li><a href="'+esc(w.discs[0].url)+'">Abrir el sitio de la banda sonora</a></li>'+novelLinks(w)+'</ul>'+
      '<div class="discs">'+w.discs.map((d,k)=>discBlock(d, false)).join("")+'</div>'+
      '</article>';
  }).join("");

  $("#archive").innerHTML = D.archive.map(a =>
    '<article class="rec"><img src="'+esc(a.disc.cover)+'" alt="" loading="lazy" width="560" height="560">'+
    '<h3 lang="'+a.lang+'"><a href="'+esc(a.disc.url)+'">'+esc(a.title)+'</a></h3>'+
    '<p class="es">'+esc(a.es)+'</p><p class="note">'+esc(a.note)+'</p>'+
    (a.novels.length ? '<ul class="links">'+novelLinks(a)+'</ul>' : '')+
    discBlock(a.disc,false)+'</article>').join("");

  document.addEventListener("click", e => {
    const b = e.target.closest(".track"); if(!b) return;
    const d = discs[+b.dataset.d], t = +b.dataset.t;
    if(current.d===d && current.t===t){ toggle(); return; }
    play(d, t);
  });

  /* ---------- Pared de novelas ---------- */
  const withMusic = new Set();
  D.worlds.forEach(w => w.novels.forEach(n => withMusic.add(n[0])));
  D.archive.forEach(a => a.novels.forEach(n => withMusic.add(n[0])));
  const counts = {};
  D.wall.forEach(n => counts[n.lang] = (counts[n.lang]||0)+1);
  const langs = Object.keys(counts).sort((a,b)=>counts[b]-counts[a]);
  $("#universo-p").textContent = plural(D.wall.length,"novela publicada","novelas publicadas") + " en Litmir, en " + langs.length + " idiomas. Las que tienen banda sonora están marcadas. Tocá una portada para leerla.";
  const fil = $("#filters");
  fil.innerHTML = '<button type="button" aria-pressed="true" data-l="">Todas</button><button type="button" aria-pressed="false" data-l="*">Con banda sonora</button>' +
    langs.map(l => '<button type="button" aria-pressed="false" data-l="'+l+'">'+esc(LANGS[l]||l)+' ('+counts[l]+')</button>').join("");
  function renderWall(l){
    const list = D.wall.filter(n => !l || (l==="*" ? withMusic.has(n.slug) : n.lang===l));
    $("#wall").innerHTML = list.map(n =>
      '<li><a href="'+LITMIR+esc(n.slug)+'"><img src="'+esc(n.img)+'" alt="" loading="lazy" width="200" height="300">'+
      '<span lang="'+esc(n.lang)+'">'+esc(n.title)+'</span><small>'+esc(LANGS[n.lang]||n.lang)+(withMusic.has(n.slug) ? ', <span class="sound">con banda sonora</span>' : '')+'</small></a></li>').join("");
  }
  fil.addEventListener("click", e => {
    const b = e.target.closest("button"); if(!b) return;
    fil.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x===b ? "true" : "false"));
    renderWall(b.dataset.l);
  });
  renderWall("");

  /* ---------- Reproductor ---------- */
  const audio = $("#audio"), player = $("#player"), seek = $("#p-seek");
  const current = {d:null, t:-1};
  const ICON_PAUSE = '<path d="M8 5v14M16 5v14"/>', ICON_PLAY = '<path d="M7 4.5 19 12 7 19.5z"/>';

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
    $("#p-sub").textContent = d.name + (d.name !== d.world.title ? ", " + d.world.title : "");
    $("#p-site").href = d.url;
    $("#p-dur").textContent = tr.d || "0:00";
    document.querySelectorAll('.track[aria-current]').forEach(b => b.removeAttribute("aria-current"));
    document.querySelectorAll('.track[data-d="'+discs.indexOf(d)+'"][data-t="'+t+'"]').forEach(b => b.setAttribute("aria-current","true"));
    if("mediaSession" in navigator){
      try{
        navigator.mediaSession.metadata = new MediaMetadata({title:tr.t, artist:"Luis Fader", album:d.name,
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
  audio.addEventListener("play", () => { $("#p-icon").innerHTML = ICON_PAUSE; $("#p-toggle").setAttribute("aria-label","Pausar"); });
  audio.addEventListener("pause", () => { $("#p-icon").innerHTML = ICON_PLAY; $("#p-toggle").setAttribute("aria-label","Reproducir"); });
  audio.addEventListener("ended", next);
  audio.addEventListener("loadedmetadata", () => { $("#p-dur").textContent = clock(audio.duration); });
  audio.addEventListener("timeupdate", () => {
    $("#p-cur").textContent = clock(audio.currentTime);
    if(audio.duration && !seeking) seek.value = Math.round(audio.currentTime / audio.duration * 1000);
  });
  audio.addEventListener("error", () => {
    if(!current.d) return;
    $("#p-error").textContent = "Esta pista no se pudo cargar desde su sitio. Probá abriendo el sitio de la banda sonora.";
    document.body.style.setProperty("--player-h", player.offsetHeight + "px");
  });
  let seeking = false;
  seek.addEventListener("input", () => { seeking = true; if(audio.duration) $("#p-cur").textContent = clock(seek.value/1000*audio.duration); });
  seek.addEventListener("change", () => { if(audio.duration) audio.currentTime = seek.value/1000*audio.duration; seeking = false; });
  window.addEventListener("resize", () => { if(!player.hidden) document.body.style.setProperty("--player-h", player.offsetHeight + "px"); });

  /* Arranque: la estación del enlace, o la primera */
  const fromHash = D.worlds.findIndex(w => "#"+w.id === location.hash);
  tune(fromHash >= 0 ? fromHash : 0, false);
})();
