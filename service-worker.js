// =============================================
// VERSÁTIL SERVICES — Service Worker (PWA)
// Industrial Engineering Group
// =============================================
const CACHE_NAME = 'vs-v7';

// Core assets — cached on install for instant loading
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.css',
  '/pedido.css',
  '/checkout.css',
  '/i18n.js',
  '/db.js',
  '/templates.js',
  '/solicitar.html',
  '/solicitar.js',
  '/tecnico.html',
  '/tecnico.js',
  '/portfolio.html',
  '/cliente.html',
  '/cliente.js',
  '/proposta.html',
  '/proposta.js',
  '/pedido.js',
  '/checkout.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Image assets — cached on first access (network-first)
const IMAGE_ASSETS = [
  '/img/hero_usinagem_campo.png',
  '/img/hero_trocador_calor.png',
  '/img/hero_limpeza_industrial.png',
  '/img/hero_inspecao_end.png',
  '/img/hero_offshore_plataforma.png',
  '/img/hero_petroquimica.png'
];

// External resources to cache (fonts, flags)
const EXTERNAL_CACHE = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
];

// ── INSTALL ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching core assets');
        // Cache core assets, don't fail on individual asset errors
        return Promise.allSettled(
          CORE_ASSETS.map(url => cache.add(url).catch(err => {
            console.warn(`[SW] Failed to cache: ${url}`, err);
          }))
        );
      })
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVATE ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => {
          console.log(`[SW] Deleting old cache: ${key}`);
          return caches.delete(key);
        })
      ))
      .then(() => self.clients.claim())
  );
});

// ── FETCH — Network First with Cache Fallback ──
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET, API calls, and external payment services
  if (request.method !== 'GET') return;
  if (url.pathname.startsWith('/api/')) return;
  if (url.hostname.includes('asaas.com')) return;

  // Strategy: Network First → Cache Fallback
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, clone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request).then(cached => {
          if (cached) return cached;

          // Offline fallback for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }

          return new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      })
  );
});
