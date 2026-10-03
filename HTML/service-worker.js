// ═══════════ SERVICE WORKER ═══════════
const CACHE_VERSION = 'weekly-ws-v1.0.0';
const CACHE_NAME = 'weekly-workspace-' + CACHE_VERSION;

// Assets cần cache
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap'
];

// Install — cache assets
self.addEventListener('install', function(event) {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[SW] Caching assets...');
      return cache.addAll(CACHE_ASSETS.map(function(url) {
        return new Request(url, { mode: 'no-cors' });
      })).catch(function(err) {
        console.warn('[SW] Cache some assets failed:', err);
      });
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// Activate — xóa cache cũ
self.addEventListener('activate', function(event) {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE_NAME; })
            .map(function(key) {
              console.log('[SW] Deleting old cache:', key);
              return caches.delete(key);
            })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch — phục vụ từ cache khi offline
self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);
  
  // Không cache Firebase/Firestore API
  if (url.hostname.includes('firebase') ||
      url.hostname.includes('googleapis.com') ||
      url.hostname.includes('gstatic.com/firebasejs') ||
      url.hostname.includes('cloudfunctions')) {
    return;
  }
  
  // Không cache POST request
  if (event.request.method !== 'GET') return;
  
  // Chiến lược: Network first, fallback to cache
  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        // Cache response mới
        if (response && response.status === 200) {
          var responseClone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(function() {
        // Offline → dùng cache
        console.log('[SW] Offline — serving from cache:', event.request.url);
        return caches.match(event.request).then(function(cached) {
          if (cached) return cached;
          
          // Fallback cho navigation request
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          
          return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
        });
      })
  );
});

// Nhận message từ client
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[SW] Service Worker loaded');