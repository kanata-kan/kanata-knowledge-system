self.importScripts("/sw-config.js");

const CACHE_VERSION = self.__KKS_SW_VERSION || "kks-static-v1";
const PAGE_CACHE = `kks-pages-${CACHE_VERSION}`;
const DATA_CACHE = `kks-data-${CACHE_VERSION}`;
const ASSET_CACHE = `kks-assets-${CACHE_VERSION}`;
const APP_ROUTES = Array.isArray(self.__KKS_APP_ROUTES)
  ? self.__KKS_APP_ROUTES
  : ["/", "/search", "/tags", "/offline", "/search-index.json"];

async function precacheApp() {
  const cache = await caches.open(PAGE_CACHE);
  await cache.addAll(APP_ROUTES);
}

async function clearOldCaches() {
  const allowedCaches = new Set([PAGE_CACHE, DATA_CACHE, ASSET_CACHE]);
  const keys = await caches.keys();

  await Promise.all(
    keys.map((key) => {
      if (!allowedCaches.has(key)) {
        return caches.delete(key);
      }

      return Promise.resolve(false);
    }),
  );
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const networkPromise = fetch(request)
    .then((response) => {
      if (response && response.ok) {
        void cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cachedResponse);

  return cachedResponse || networkPromise;
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await fetch(request);

  if (response && response.ok) {
    void cache.put(request, response.clone());
  }

  return response;
}

async function networkFirstPage(request) {
  const cache = await caches.open(PAGE_CACHE);

  try {
    const response = await fetch(request);

    if (response && response.ok) {
      void cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    const offlineResponse = await cache.match("/offline");

    if (offlineResponse) {
      return offlineResponse;
    }

    throw error;
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(precacheApp());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await clearOldCaches();
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
    return;
  }

  if (
    url.pathname === "/search-index.json" ||
    url.pathname === "/manifest.webmanifest"
  ) {
    event.respondWith(staleWhileRevalidate(request, DATA_CACHE));
    return;
  }

  if (
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/pwa-icons/") ||
    url.pathname === "/icon.svg" ||
    url.pathname === "/favicon.ico" ||
    url.pathname === "/apple-icon"
  ) {
    event.respondWith(cacheFirst(request, ASSET_CACHE));
    return;
  }

  event.respondWith(staleWhileRevalidate(request, PAGE_CACHE));
});
