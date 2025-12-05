// Service Worker for Admin Panel Notifications
const CACHE_NAME = 'dynsteel-admin-v1'
const NOTIFICATION_SOUND = '/sounds/notification.mp3'

// Install event
self.addEventListener('install', (event) => {
  self.skipWaiting()
})

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim())
})

// Push notification event
self.addEventListener('push', (event) => {
  let data = {}
  
  if (event.data) {
    try {
      data = event.data.json()
    } catch (e) {
      data = { title: 'Yeni Bildirim', body: event.data.text() }
    }
  }

  const options = {
    title: data.title || 'DynSteel Admin',
    body: data.body || data.message || 'Yeni bildirim',
    icon: '/icons/admin-icon.svg',
    badge: '/icons/admin-icon.svg',
    tag: data.id || 'notification',
    requireInteraction: false,
    vibrate: [200, 100, 200],
    data: {
      url: data.url || data.link || '/admin',
      timestamp: Date.now()
    },
    sound: NOTIFICATION_SOUND
  }

  // Bildirim göster ve ses çal
  event.waitUntil(
    Promise.all([
      self.registration.showNotification(options.title, options),
      // Tüm client'lara ses çalma mesajı gönder
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'PLAY_NOTIFICATION_SOUND'
          })
        })
      })
    ])
  )
})

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const urlToOpen = event.notification.data?.url || '/admin'

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if there's already a window/tab open with the target URL
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i]
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus()
        }
      }
      // If not, open a new window/tab
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen)
      }
    })
  )
})

// Message event - Client'tan gelen mesajları dinle
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PLAY_NOTIFICATION_SOUND') {
    // Tüm client'lara ses çalma mesajı gönder
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'PLAY_NOTIFICATION_SOUND'
        })
      })
    })
  }
})

// Background sync (for offline support)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-notifications') {
    event.waitUntil(syncNotifications())
  }
})

async function syncNotifications() {
  // Sync notifications when back online
  return Promise.resolve()
}

