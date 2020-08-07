// file to be cached
var cacheName = 'bitcoin-v1';
var filesToCache = [
  './',
  './index.html',
  './styles.css',
  './manifest.json',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-256x256.png',
  './icons/icon-512x512.png',
];

//install event
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] caching');
      return cache.addAll(filesToCache);
    })
  );
});

//delete cashed files when ServiceWorker updated
self.addEventListener('activate', function(event) {
    console.log('[ServiceWorker] activating');
    event.waitUntil(
        caches.keys()
        .then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cName) {
                    if(cName !== cacheName){
                        return caches.delete(cName);
                    }
                })
            );
        })
    );
});

//Monitor events
self.addEventListener('fetch', event => {
  console.log('[ServiceWorker] fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)
    }).catch(error => { 
      console.log(error);
    })
  );
});
