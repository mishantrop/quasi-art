const PRECACHE = 'precache-1.0.0';

const PRECACHE_URLS = [
   './',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  const currentCaches = [PRECACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
    const request = event.request

    if (!request.url.startsWith('https')) {
        // console.log('[SW] Ignore non-http request (mode: ' + request.mode + ')', request.url)
        return
    }

    if (request.method === 'POST') {
        // console.log('[SW] Ignore POST request (mode: ' + request.mode + ')', request.url)
        return
    }

    event.respondWith(networkFirst(request))
});

async function networkFirst(request) {
    const cache = await caches.open(PRECACHE)

    try {
        const networkResponse = await fetch(request.url)
        cache
            .put(request.url, networkResponse.clone())
            .catch((err) => {
                console.warn(request.url, err.message)
            })
        return networkResponse
    } catch (error) {
        return cache.match(request.url)
    }
}
