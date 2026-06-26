// Neue Versionsnummer, um den Cache auf dem Handy hart zurückzusetzen
const CACHE_NAME = 'scoreflex-v3.0'; 
const ASSETS = [
  'index.html',
  'manifest.json'
];

// Installieren und Cache füllen
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // Aktiviert den neuen Service Worker ohne Verzögerung
});

// Altes Cache-Aufräumen bei Updates
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // Übernimmt sofort die Kontrolle über die PWA
});

// Netzwerk-Zuerst-Strategie mit Cache-Fallback (Sorgt für reibungslose Updates bei Internet)
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
