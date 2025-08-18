// Service Worker for Burgess Shale Explorer
const CACHE_NAME = 'burgess-shale-v2';
const urlsToCache = [
  './',
  './index.html',
  './faith-and-science.html',
  './deep-time.html',
  './manifest.json',
  // Cache all fossil images
  './fossils/anomalocaris/anomalocaris-canadensis-large.jpg',
  './fossils/anomalocaris/anomalocaris-canadensis-medium.jpg',
  './fossils/hallucigenia/hallucigenia-sparsa-large.jpg',
  './fossils/hallucigenia/hallucigenia-sparsa-medium.jpg',
  './fossils/marrella/marrella-splendens-large.jpg',
  './fossils/marrella/marrella-splendens-medium.jpg',
  './fossils/opabinia/opabinia-regalis-large.jpg',
  './fossils/opabinia/opabinia-regalis-medium.jpg',
  './fossils/pikaia/Pikaia_fossil.jpg',
  './fossils/wiwaxia/wiwaxia_fossil.jpg',
  // Cache reconstruction images
  './reconstructions/anomalocaris-reconstruction-large.jpg',
  './reconstructions/hallucigenia-reconstruction-large.jpg',
  './reconstructions/marrella-reconstruction-large.jpg',
  './reconstructions/opabinia-reconstruction-large.jpg',
  './reconstructions/wiwaxia-reconstruction-large.jpg',
  // Cache illustrated creatures
  './ilustrated_creatures_of_the_burgess_shale/anomalocaris.jpg',
  './ilustrated_creatures_of_the_burgess_shale/hallucigenia.jpg',
  './ilustrated_creatures_of_the_burgess_shale/Marrella.jpg',
  './ilustrated_creatures_of_the_burgess_shale/Opabinia4.jpg',
  './ilustrated_creatures_of_the_burgess_shale/Pikaia_drawing.jpg',
  './ilustrated_creatures_of_the_burgess_shale/wiwaxia_drawing.jpg',
  // Cache landscapes
  './landscapes/burgess-shale-yoho-park-large.jpg',
  './historical/charles-walcott-1900-large.jpg'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});