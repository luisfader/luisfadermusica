/* Service worker del portal «Luis Fader — Música».
   Guarda en el teléfono lo que hace falta para abrir la aplicación (página, estilos, código,
   datos, portadas y letras), así arranca rápido y no depende de la red para mostrarse.
   La música NO pasa por acá: los mp3 los pide el navegador directamente, con sus pedidos
   por partes (Range), que es lo que permite adelantar y seguir sonando en segundo plano. */
const VERSION = "fader-app-2026-11-13";
const SHELL = ["./", "index.html", "style.css", "app.js", "data.js", "manifest.webmanifest",
  "img/app/icon-192.png", "img/app/icon-512.png", "img/app/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
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
