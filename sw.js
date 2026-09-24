const CACHE_NAME = "heitu-toolbox-v2";
const APP_SHELL = [
  "./", "./index.html", "./styles.css", "./i18n.js", "./share-utils.js", "./app.js",
  "./heitu-jun.png", "./heitu-contact.png",
  "./assets/hero-banner.png", "./assets/card-toilet.png", "./assets/card-smoking.png",
  "./assets/card-lost.png", "./assets/card-onsen.png", "./assets/card-convenience.png",
  "./assets/card-luggage.png", "./assets/card-anime.png", "./assets/card-japanese-help.png",
  "./assets/card-laundry.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request).then(cached => cached || caches.match("./index.html"))));
});
