// service-worker.js

const CACHE_NAME = "busu-app-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/pencatatan.html",
  "/bayar.html",
  "/jadwal.html"
];

// =====================
// INSTALL
// =====================
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// =====================
// ACTIVATE
// =====================
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// =====================
// FETCH
// =====================
self.addEventListener("fetch", event => {

  const url = new URL(event.request.url);

  // API (jangan cache keras)
  if (url.search.includes("action")) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify({
          status: "offline"
        }))
      )
    );
    return;
  }

  // HTML & asset
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});