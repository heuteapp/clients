importScripts('/workbox-455445.js');

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  if (event.request.mode === 'navigate') {
    if (!url.pathname.startsWith('/workspace')) {
      event.respondWith(
        Response.redirect('/workspace/board', 302)
      );
      return;
    }
  }
  
  event.respondWith(fetch(event.request));
});