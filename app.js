(function(){
  "use strict";
  const data=window.FADER_DATA;
  if(!data){return;}
  const $=(selector,root=document)=>root.querySelector(selector);
  const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
  const escapeHTML=(value)=>String(value??"").replace(/[&<>"']/g,(ch)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const norm=(value)=>String(value??"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase().replace(/[‘’]/g,"'").replace(/\s*-\s*(single|ep)$/i,"").trim();
  let filter="all",newestFirst=true,currentPlaylist="onde",currentIndex=-1,isPlaying=false;
  let toastTimer;
  const audio=$("#audioElement");
  const audioSources=data.audioSources||{};

  function showToast(message){
    const element=$("#toast");
    element.textContent=message;
    element.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer=setTimeout(()=>element.classList.remove("show"),3300);
  }

  function renderCatalog(){
    const query=norm($("#albumSearch").value);
    const items=data.albums.filter((item)=>(filter==="all"||item.kind===filter)&&norm(item.title).includes(query));
    items.sort((a,b)=>newestFirst?(b.year-a.year||data.albums.indexOf(b)-data.albums.indexOf(a)):(a.year-b.year||data.albums.indexOf(a)-data.albums.indexOf(b)));
    $("#catalogCount").innerHTML=String(items.length).padStart(2,"0")+"<span>LANZAMIENTOS</span>";
    const artistLink=data.artist.apple;
    const grid=$("#albumGrid");
    if(!items.length){grid.innerHTML='<p class="empty-state">No se encontraron lanzamientos con ese nombre. Probá con otra búsqueda.</p>';return;}
    grid.innerHTML=items.map((album)=>{
      const url=album.url||artistLink;
      const title=escapeHTML(album.title);
      const desc=escapeHTML(album.desc);
      const href=escapeHTML(url);
      const type=album.kind==="album"?"ÁLBUM":"SINGLE / EP";
      const style="--c1:"+album.colors[0]+";--c2:"+album.colors[1];
      return '<article class="album-item">'+
        '<a href="'+href+'" target="_blank" rel="noopener noreferrer" aria-label="Consultar '+title+' en la plataforma musical">'+
          '<div class="album-art" role="img" aria-label="Arte gráfico de '+title+'" data-cover="'+title+'" style="'+style+'">'+
            '<div class="album-art-content"><small>LUIS FADER</small><strong>'+title+'</strong><span>'+album.year+' · LF MUSIC</span></div>'+
          '</div></a>'+
        '<div class="album-meta"><span>'+album.year+'</span><span class="album-type">'+type+'</span></div>'+
        '<h3 class="album-item-title"><a href="'+href+'" target="_blank" rel="noopener noreferrer">'+title+'</a></h3>'+
        '<p class="album-item-desc">'+desc+'</p>'+
      '</article>';
    }).join("");
    applyArtwork();
  }

  function renderPlaylist(){
    const entry=data.playlists[currentPlaylist];
    $("#playlistTitle").textContent=entry.title;
    $("#trackCount").textContent=entry.tracks.length+" canciones";
    $("#trackList").innerHTML=entry.tracks.map((track,index)=>{
      const key=currentPlaylist+":"+index;
      const ready=!!audioSources[key];
      return '<button class="track-item" type="button" data-track-index="'+index+'" aria-label="Seleccionar '+escapeHTML(track[0])+'">'+
        '<span class="track-index">'+String(index+1).padStart(2,"0")+'</span>'+
        '<span class="track-title">'+escapeHTML(track[0])+'<small class="track-subtitle">'+escapeHTML(entry.title)+' · '+escapeHTML(track[1])+'</small></span>'+
        '<span class="track-status '+(ready?"ready":"")+'">'+(ready?"● MP3 disponible":"○ MP3 pendiente")+'</span>'+
        '<span class="track-arrow" aria-hidden="true">'+(ready?"▶":"↗")+'</span>'+
      '</button>';
    }).join("");
  }

  function formatTime(s){
    if(!Number.isFinite(s)||s<0)return "0:00";
    const seconds=Math.floor(s);
    return Math.floor(seconds/60)+":"+String(seconds%60).padStart(2,"0");
  }

  function selectedSource(){
    return audioSources[currentPlaylist+":"+currentIndex]||null;
  }

  function resetAudio(){
    audio.pause();audio.removeAttribute("src");audio.load();
    isPlaying=false;$("#playButton").textContent="▶";$("#playButton").setAttribute("aria-label","Reproducir");
    $("#timeCurrent").textContent="0:00";$("#timeTotal").textContent="0:00";$("#progressBar").value=0;
  }

  function hidePlayer(){
    resetAudio();currentIndex=-1;$("#playerBar").hidden=true;document.body.classList.remove("has-player");
    $$(".track-item.active").forEach(x=>x.classList.remove("active"));
  }

  async function selectTrack(index,shouldPlay){
    const entry=data.playlists[currentPlaylist];
    if(!entry||!entry.tracks[index])return;
    resetAudio();
    currentIndex=index;
    const track=entry.tracks[index];
    $$(".track-item").forEach((item)=>item.classList.toggle("active",Number(item.dataset.trackIndex)===index));
    $("#playerTrack").textContent=track[0];
    $("#playerAlbum").textContent=entry.title+" · "+entry.year;
    $("#playerBar").hidden=false;document.body.classList.add("has-player");
    const source=selectedSource();
    const hasPlayableTrack=Object.keys(audioSources).some(key=>key.startsWith(currentPlaylist+":"));
    $("#playButton").disabled=!source;
    $("#prevButton").disabled=!hasPlayableTrack;
    $("#nextButton").disabled=!hasPlayableTrack;
    $("#progressBar").disabled=!source;
    $("#playerMessage").textContent=source?"MP3 disponible":"MP3 próximamente";
    if(source){
      audio.src=source;
      audio.load();
      if(shouldPlay){try{await audio.play()}catch(e){showToast("No se pudo abrir el MP3. Revisá su ruta en catalog.js.");}}
    }else{
      showToast("El MP3 de esta canción se incorporará próximamente.");
    }
  }

  function nearestPlayable(step){
    const entry=data.playlists[currentPlaylist];
    const length=entry.tracks.length;
    for(let offset=1;offset<=length;offset++){
      const candidate=(currentIndex+step*offset+length*10)%length;
      if(audioSources[currentPlaylist+":"+candidate])return candidate;
    }
    return null;
  }
  function skip(step){const next=nearestPlayable(step);if(next!==null)selectTrack(next,true);}

  function applyArtwork(){
    if(!window.FADER_ARTWORK)return;
    $$("[data-cover]").forEach(el=>{
      const entry=window.FADER_ARTWORK[norm(el.dataset.cover)];
      if(!entry)return;
      el.style.backgroundImage='url("'+entry+'")';
      el.classList.add("has-image");
    });
    const main=window.FADER_ARTWORK[norm("Onde d'amore")];
    if(main){
      const mini=$(".mini-art");
      mini.style.backgroundImage='url("'+main+'")';mini.style.backgroundSize="cover";
      mini.querySelector("span").style.opacity="0";
    }
  }

  async function fetchOfficialArtwork(){
    /* Optional progressive enhancement, never a dependency for the site's operation. */
    try{
      const response=await fetch("https://itunes.apple.com/lookup?id=1378975839&entity=album&limit=200&country=us",{mode:"cors"});
      if(!response.ok)throw new Error("unavailable");
      const payload=await response.json();
      const map={};
      for(const item of (payload.results||[])){
        if(norm(item.artistName)!=="luis fader"||!item.collectionName||!item.artworkUrl100)continue;
        const cover=item.artworkUrl100.replace(/100x100(bb)?/,"600x600bb");
        if(!/^https:\/\/[a-zA-Z0-9.-]*mzstatic\.com\//.test(cover))continue;
        const name=norm(item.collectionName);
        map[name]=cover;
      }
      window.FADER_ARTWORK=map;
      applyArtwork();
    }catch(e){/* CSS-generated covers remain as graceful fallback. */}
  }

  function setupVideoArchive(){
    const videos=data.videos||[];
    if(!videos.length)return;
    const container=$(".video-grid");
    container.innerHTML=videos.filter(v=>/^[\w-]{11}$/.test(v.youtubeId)).map(v=>{
      const id=v.youtubeId;
      return '<article class="video-card"><div class="video-embed"><iframe title="'+escapeHTML(v.title)+'" src="https://www.youtube-nocookie.com/embed/'+id+'" loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="video-meta"><strong>'+escapeHTML(v.title)+'</strong><span>Videoclip oficial</span></div></article>';
    }).join("");
    container.style.gridTemplateColumns="repeat(auto-fit,minmax(min(100%,360px),1fr))";
    const style=document.createElement("style");
    style.textContent=".video-embed{position:relative;aspect-ratio:16/9;background:#151b18}.video-embed iframe{width:100%;height:100%;border:0}";
    document.head.appendChild(style);
    if(container.innerHTML)$(".videos .section-top .eyebrow").textContent="ARCHIVO AUDIOVISUAL";
  }

  $$(".filter-pill").forEach((button)=>button.addEventListener("click",()=>{
    filter=button.dataset.filter;
    $$(".filter-pill").forEach(x=>{x.classList.toggle("active",x===button);x.setAttribute("aria-pressed",String(x===button));});
    renderCatalog();
  }));
  $("#albumSearch").addEventListener("input",renderCatalog);
  $("#sortToggle").addEventListener("click",()=>{
    newestFirst=!newestFirst;
    $("#sortToggle").textContent=newestFirst?"Más recientes ↓":"Más antiguos ↑";
    renderCatalog();
  });
  $("#playlistAlbum").addEventListener("change",(event)=>{hidePlayer();currentPlaylist=event.target.value;renderPlaylist();});
  $("#trackList").addEventListener("click",(event)=>{
    const button=event.target.closest("[data-track-index]");
    if(button)selectTrack(Number(button.dataset.trackIndex),true);
  });
  $("#playButton").addEventListener("click",async()=>{
    if(!selectedSource())return;
    if(audio.paused){try{await audio.play()}catch(e){showToast("No se pudo reproducir el archivo.");}}
    else audio.pause();
  });
  $("#prevButton").addEventListener("click",()=>skip(-1));
  $("#nextButton").addEventListener("click",()=>skip(1));
  $("#closePlayer").addEventListener("click",hidePlayer);
  $("#progressBar").addEventListener("input",(event)=>{if(Number.isFinite(audio.duration)&&audio.duration>0)audio.currentTime=(Number(event.target.value)/100)*audio.duration;});
  audio.addEventListener("loadedmetadata",()=>{$("#timeTotal").textContent=formatTime(audio.duration);});
  audio.addEventListener("timeupdate",()=>{
    $("#timeCurrent").textContent=formatTime(audio.currentTime);
    $("#progressBar").value=Number.isFinite(audio.duration)&&audio.duration>0?String(audio.currentTime/audio.duration*100):"0";
  });
  audio.addEventListener("play",()=>{isPlaying=true;$("#playButton").textContent="Ⅱ";$("#playButton").setAttribute("aria-label","Pausar");});
  audio.addEventListener("pause",()=>{isPlaying=false;$("#playButton").textContent="▶";$("#playButton").setAttribute("aria-label","Reproducir");});
  audio.addEventListener("ended",()=>{const next=nearestPlayable(1);if(next!==null&&next!==currentIndex)selectTrack(next,true);else audio.currentTime=0;});
  audio.addEventListener("error",()=>{if(selectedSource())showToast("El archivo MP3 no está disponible. Revisá la ruta del archivo.");});
  $("#copyrightYear").textContent=new Date().getFullYear();
  const menuToggle=$("#menuToggle");
  const mobileNav=$("#mobileNav");
  menuToggle.addEventListener("click",()=>{
    const visible=mobileNav.hidden;
    mobileNav.hidden=!visible;
    menuToggle.setAttribute("aria-expanded",String(visible));
    menuToggle.setAttribute("aria-label",visible?"Cerrar menú":"Abrir menú");
  });
  $$("#mobileNav a").forEach(a=>a.addEventListener("click",()=>{mobileNav.hidden=true;menuToggle.setAttribute("aria-expanded","false");menuToggle.setAttribute("aria-label","Abrir menú");}));
  renderPlaylist();
  renderCatalog();
  setupVideoArchive();
  fetchOfficialArtwork();
})();