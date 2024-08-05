// public/service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activated.');
  });
  
  self.addEventListener('push', (event) => {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/path/to/icon.png', // Update with the path to your icon
      badge: '/path/to/badge.png' // Update with the path to your badge
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
  