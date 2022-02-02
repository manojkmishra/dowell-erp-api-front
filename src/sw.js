// install event
self.addEventListener('install', evt => {
  console.log('service worker installed');
});

// activate event--changed//
self.addEventListener('activate', evt => {
  console.log('service worker activated');
});