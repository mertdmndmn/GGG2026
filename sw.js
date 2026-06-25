const CACHE_NAME = 'ggg2026-v20';
self.addEventListener('install', function(e) { self.skipWaiting(); });
self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.map(function(k) { return caches.delete(k); }));
  }).then(function() { return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e) {
  if (e.request.url.includes('supabase.co')) { e.respondWith(fetch(e.request)); return; }
  e.respondWith(fetch(e.request).then(function(res) {
    var clone = res.clone();
    caches.open(CACHE_NAME).then(function(cache) { cache.put(e.request, clone); });
    return res;
  }).catch(function() { return caches.match(e.request); }));
});
