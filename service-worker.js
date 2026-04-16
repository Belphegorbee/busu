const CACHE_NAME = "busu-v2";

const urlsToCache = [
  "/busu/",
  "/busu/index.html",
  "/busu/pencatatan.html",
  "/busu/bayar.html",
  "/busu/jadwal.html"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match("/busu/index.html"))
  );
});
