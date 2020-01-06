workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.routing.registerRoute(
    new RegExp(/\.(?:png|jpg|jpeg|svg|woff2|css|js)$/),
    new workbox.strategies.StaleWhileRevalidate()
);
workbox.routing.registerRoute(
    new RegExp(/\.secure.meetupstatic.com$/),
    new workbox.strategies.StaleWhileRevalidate()
);
workbox.routing.registerRoute(
    new RegExp('https:.*\.(png|jpg|jpeg|svg|woff2|css|js)'),
    new workbox.strategies.StaleWhileRevalidate()
);
workbox.routing.registerRoute(
    new RegExp('.*\/community\/summary'),
    workbox.strategies.networkFirst()
)

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
            return cache.match(event.request).then(function(response) {
                var fetchPromise = fetch(event.request).then(function(networkResponse) {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                })
                return response || fetchPromise;
            })
        })
    );
})

self.addEventListener('install', event => {
    alert("Install");

    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(
                [
                    '/login'
                ]
            );
        })
    );
});

self.addEventListener('activate', event => {
    console.log("activate")
})
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])