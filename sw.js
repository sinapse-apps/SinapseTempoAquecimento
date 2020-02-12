self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('sinapse-storage').then(function(cache) {
     return cache.addAll([
       '/SinapseTempoAquecimento/',
       '/SinapseTempoAquecimento/index.html',
       '/SinapseTempoAquecimento/main.js',
       '/SinapseTempoAquecimento/main.css'
     ]);
   })
 );
});

self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
