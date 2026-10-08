const CACHE_NAME = "heitu-toolbox-v49";
const APP_SHELL = [
  "./", "./index.html", "./styles.css", "./i18n.js", "./share-utils.js", "./app.js",
  "./heitu-jun.png", "./heitu-contact.png", "./wechat-group-qr.jpg",
  "./line-contact-qr.jpg", "./whatsapp-contact-qr.jpg",
  "./assets/hero-banner.png", "./assets/card-toilet.png", "./assets/card-smoking.png",
  "./assets/card-lost.png", "./assets/card-onsen.png", "./assets/card-convenience.png",
  "./assets/card-luggage.png", "./assets/card-anime.png", "./assets/card-japanese-help.png",
  "./assets/card-laundry.png",
  "./assets/sushi-hama.png", "./assets/sushi-kappa.png",
  "./assets/sushi-kura.svg", "./assets/sushi-sushiro.svg",
  "./assets/gyudon-yoshinoya.svg", "./assets/gyudon-sukiya.svg", "./assets/gyudon-matsuya.png",
  "./assets/shopping-daimaru.svg", "./assets/shopping-takashimaya.svg", "./assets/shopping-mitsukoshi.svg",
  "./assets/shopping-isetan.svg", "./assets/shopping-hankyu.svg", "./assets/shopping-matsuzakaya.png",
  "./assets/shopping-maruiimai.png", "./assets/shopping-iwataya.png", "./assets/shopping-aeonmall.svg",
  "./assets/shopping-lalaport.svg", "./assets/shopping-ario.png",
  "./assets/shopping-bic.svg", "./assets/shopping-yodobashi.png", "./assets/shopping-yamada.png",
  "./assets/shopping-uniqlo.svg", "./assets/shopping-donki.svg",
  "./assets/shopping-gu.svg", "./assets/shopping-muji.svg", "./assets/shopping-daiso.svg",
  "./assets/shopping-loft.png", "./assets/shopping-hands.png", "./assets/shopping-3coins.png",
  "./assets/shopping-komehyo.svg", "./assets/shopping-secondstreet.svg", "./assets/shopping-surugaya.svg",
  "./assets/shopping-animate.svg", "./assets/shopping-mandarake.png", "./assets/shopping-lashinbang.png",
  "./assets/arrival-ed-1.png", "./assets/arrival-customs-1.png", "./assets/japan-season-map.svg",
  "./assets/sakura-reference-map.svg", "./assets/leaves-reference-map.svg"
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
