// https://developers.google.com/web/fundamentals/getting-started/primers/service-workers

var CACHE_NAME = 'starwars-api-site-cache-v1';
var urlsToCache = [
  '/',
  '/0.bac6cc38409906f9a24e.chunk.js',
  '/1.456bd0a5460ac77408a4.chunk.js',
  '/styles.d4538f005330a3786c32.bundle.css',
  '/inline.7e382a9407884c2f96c6.bundle.js',
  '/polyfills.5234c463f49595bd0e73.bundle.js',
  '/vendor.0547a2874d54e60fc392.bundle.js',
  '/main.acab8defca1d168bc42e.bundle.js'
];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function (response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', function (event) {
  // Let's say we have one cache called 'my-site-cache-v1',
  // and we find that we want to split this out into one cache for
  // pages and one cache for blog posts.This means in the install
  // step we'd create two caches, 'starwars-api-site-cache-v1' and 'some-other-posts-cache - v1'
  // and in the activate step we'd want to delete our older 'my-site-cache-v1'.
  //
  // The following code would do this by looping through all of the
  // caches in the service worker and deleting any caches that
  // aren't defined in the cache whitelist.
  var cacheWhitelist = ['starwars-api-site-cache-v1', 'some-other-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
