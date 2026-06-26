// Ändere einfach diese Versionsnummer (z.B. zu v3), wenn du Code-Änderungen erzwingen willst!
const CACHE_NAME = 'scoreflex-v2.1'; 
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
  // Aktiviert den neuen Service Worker sofort, ohne auf das Schließen der App zu warten
  self.skipWaiting(); 
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
  // Übernimmt sofort die Kontrolle über alle offenen Tabs/Anwendungen
  self.clients.claim(); 
});

// Netzwerk-Anfragen abfangen (Network-First mit Cache-Fallback für maximale Stabilität)
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
