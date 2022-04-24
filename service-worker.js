/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-f419746';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./janosik_002.html","./janosik_005.html","./janosik_006.html","./janosik_007.html","./janosik_008.html","./janosik_009.html","./janosik_010.html","./janosik_011.html","./janosik_012.html","./janosik_013.html","./janosik_014.html","./janosik_015.html","./janosik_016.html","./janosik_017.html","./janosik_018.html","./janosik_019.html","./janosik_020.html","./janosik_021.html","./janosik_022.html","./janosik_023.html","./janosik_024.html","./janosik_025.html","./janosik_026.html","./janosik_027.html","./janosik_028.html","./janosik_029.html","./janosik_030.html","./janosik_031.html","./janosik_032.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/mzk_logo_tyrkys_transparent.jpg","./resources/obalka_janosik_cibula.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
