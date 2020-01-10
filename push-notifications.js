self.addEventListener('push', event => {
    const data = event.data.json()

    event.waitUntil(
        self.registration.showNotification(data.notification.title, data.notification)
    );
})