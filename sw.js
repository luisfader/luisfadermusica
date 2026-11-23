/* Service worker del portal «Luis Fader — Música».
   Guarda en el teléfono lo que hace falta para abrir la aplicación (página, estilos, código,
   datos, portadas y letras), así arranca rápido y no depende de la red para mostrarse.
   La música en general NO pasa por acá: los mp3 los pide el navegador directamente, con sus
   pedidos por partes (Range), que es lo que permite adelantar y seguir sonando en segundo plano.
   La excepción son las canciones ya guardadas en el teléfono (caché «fader-audio»): la página
   las pide con «?fc=1» y acá se sirven desde lo guardado, también por partes. */
const VERSION = "fader-app-2026-11-23c";
const AUDIO = "fader-audio";
const SHELL = ["./", "index.html", "style.css", "app.js", "data.js", "manifest.webmanifest",
  "img/app/icon-192.png", "img/app/icon-512.png", "img/app/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== AUDIO).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  if(/\.mp3$/i.test(url.pathname) && url.searchParams.has("fc")){ e.respondWith(fromSaved(req, url)); return; }
  /* audio, pedidos por partes y el ranking (Supabase): siempre directo a la red */
  if(req.destination === "audio" || req.headers.has("range") || /\.mp3$/i.test(url.pathname)) return;
  if(url.origin !== location.origin && !/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) return;

  const scope = new URL(self.registration.scope);
  const isShell = url.origin === location.origin && url.pathname.startsWith(scope.pathname) &&
    (req.mode === "navigate" || /\.(html|js|css|webmanifest)$/.test(url.pathname) || url.pathname === scope.pathname);

  if(isShell){
    /* primero la red (para recibir los cambios), y si no hay conexión, lo guardado */
    e.respondWith(fetch(req).then(res => {
      if(res.ok){ const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, {ignoreSearch: true}).then(r => r || caches.match("index.html"))));
    return;
  }
  /* portadas, fondos, letras y fuentes: lo guardado al instante, y se refresca por detrás */
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(res => {
      if(res.ok || res.type === "opaque"){ const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => hit);
    return hit || net;
  }));
});

/* Una canción guardada, entera o por partes (lo que pida el reproductor al adelantar).
   Si por algún motivo ya no está guardada, se busca en la red como siempre. */
async function fromSaved(req, url){
  const key = url.origin + url.pathname;
  const range = req.headers.get("range");
  let hit = null;
  try{ hit = await (await caches.open(AUDIO)).match(key); }catch(e){}
  if(!hit) return fetch(key, range ? {headers: {Range: range}} : {});
  const blob = await hit.blob(), size = blob.size;
  const type = hit.headers.get("content-type") || "audio/mpeg";
  const m = range && /bytes=(\d*)-(\d*)/.exec(range);
  if(!m) return new Response(blob, {status: 200, headers: {"Content-Type": type, "Content-Length": String(size), "Accept-Ranges": "bytes"}});
  let start, end;
  if(m[1] === ""){ start = Math.max(0, size - Number(m[2] || 0)); end = size - 1; }
  else { start = Number(m[1]); end = m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1); }
  if(start >= size || start > end)
    return new Response(null, {status: 416, headers: {"Content-Range": "bytes */" + size}});
  return new Response(blob.slice(start, end + 1), {status: 206, headers: {
    "Content-Type": type, "Content-Length": String(end - start + 1),
    "Content-Range": "bytes " + start + "-" + end + "/" + size, "Accept-Ranges": "bytes"}});
}
