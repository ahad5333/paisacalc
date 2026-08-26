// Hand-rolled, deliberately — the site has no other build tooling beyond
// Next.js itself (even OG images are hand-rolled via ImageResponse rather
// than a service), and a plugin like next-pwa has known friction with
// Turbopack + output:"export". Bump CACHE_NAME on any change to the
// strategy below; the browser only re-checks a service worker when its
// own byte content changes, and activate() below clears stale caches once
// it does.
const CACHE_NAME = "paisacalc-v2";
const OFFLINE_URL = "/offline/";

// Just enough for the app to open at all on a completely fresh, fully
// offline visit — everything else is cached as the user actually visits
// it (see fetch handler), not pre-loaded, since precaching all 173+
// calculator pages upfront would be slow and wasteful for most visitors.
const APP_SHELL = ["/", OFFLINE_URL, "/manifest.webmanifest", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Page navigations: network-first, so a visitor online always gets the
  // current content — cache (then the offline page) is only the fallback
  // for when the network genuinely isn't there.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL))),
    );
    return;
  }

  // Everything else (JS/CSS/images/fonts): cache-first. Next's own static
  // assets are content-hashed and immutable, so a cache hit is always
  // correct — a code change produces a new URL, not stale content at the
  // old one.
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        }),
    ),
  );
});
