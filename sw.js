const CACHE_NAME = 'spese-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// Installa il Service Worker e salva in cache l'interfaccia base
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Gestisce le richieste per far funzionare l'app anche con scarsa rete
self.addEventListener('fetch', (e) => {
  // Non intercettare le chiamate verso Google Script (devono andare sempre live)
  if (e.request.url.includes('script.google.com')) {
    return;
  }
  
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});