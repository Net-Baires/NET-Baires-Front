self.addEventListener('push', event => {
    const data = event.data.json()

    event.waitUntil(
        self.registration.showNotification(data.notification.title, data.notification)
    );
})

self.addEventListener('notificationclick', event => {
    const rootUrl = new URL('/', location).href;
    event.notification.close();
    // Enumerate windows, and call window.focus(), or open a new one.
    event.waitUntil(
        clients.matchAll().then(matchedClients => {
            for (let client of matchedClients) {
                if (client.url === rootUrl) {
                    return client.focus();
                }
            }
            return clients.openWindow(event.notification.icon);
        })
    );
});
const queue = new workbox.backgroundSync.Queue('NET-Baires-Background-Requests');
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function(response) {
                    if (!response || response.status !== 200) {
                        return response;
                    }
                    var responseToCache = response.clone();
                    if (event.request.method === "GET")
                        caches.open("NET-Baires-Cache-Get-Request")
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            ).catch(x => {
                if (event.request.method === "PUT" ||
                    event.request.method === "POST" ||
                    event.request.method === "DELETE")
                    return queue.pushRequest({ request: event.request })
                return response;
            });
        })
    );
});