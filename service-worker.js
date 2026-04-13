// =============================================
// VGI INDUSTRIAL — Service Worker (PWA)
// =============================================
const CACHE_NAME = 'vgi-cache-v1';

// Core assets to cache for offline use
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/pedido.css',
  '/checkout.css',
  '/i18n.js',
  '/pedido.js',
  '/checkout.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Install — cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching core assets');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate — clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch — network first, fallback to cache
self.addEventListener('fetch', event => {
  // Skip non-GET and external API requests
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('/api/') || event.request.url.includes('asaas.com')) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone and cache successful responses
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clone);
          });
        }
        return response;
      })
      .catch(() => {
        // Network failed — serve from cache
        return caches.match(event.request).then(cached => {
          return cached || new Response('Offline', { status: 503, statusText: 'Offline' });
        });
      })
  );
});
