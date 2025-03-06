/**
 * Service Worker for Johnny Ruangmei's Portfolio Website
 * Provides offline functionality and caching for better performance
 */

// Cache version - update this when files change to invalidate old cache
const CACHE_VERSION = 'v1';
const CACHE_NAME = `johnyruangmei-${CACHE_VERSION}`;

// Files to cache
const filesToCache = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/manifest.json',
  // MDBootstrap resources
  'https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.10.2/mdb.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.10.2/mdb.min.js',
  'https://code.jquery.com/jquery-3.6.0.min.js',
  // Sections
  '/sections/header.html',
  '/sections/about.html',
  '/sections/achievements.html',
  '/sections/vision.html',
  '/sections/contact.html',
  // Images (to be added when you have them)
  '/assets/images/profile.webp',
  '/assets/images/hero-bg.webp',
  '/assets/images/profile-placeholder.jpg',
  '/assets/images/icon-192.png',
  '/assets/images/icon-512.png'
];

// Install event - caches assets
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  
  // Wait until caching is complete
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
      })
      .then(() => {
        console.log('[ServiceWorker] Skip waiting on install');
        return self.skipWaiting();
      })
  );
});

// Activate event - cleans up old caches
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  
  // Clean up old caches
  event.waitUntil(
    caches.keys()
      .then(keyList => {
        return Promise.all(keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
      .then(() => {
        console.log('[ServiceWorker] Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  console.log('[ServiceWorker] Fetch', event.request.url);
  
  // Skip non-GET requests and those not on our origin
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Handle requests for URLs that we cache
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return the response from the cache
        if (response) {
          console.log('[ServiceWorker] From cache:', event.request.url);
          return response;
        }
        
        // Not in cache - return the result from the network
        console.log('[ServiceWorker] Network fetch:', event.request.url);
        return fetch(event.request)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // If important, cache the fetched resource
            const shouldCache = event.request.url.includes('/assets/') || 
                               event.request.url.includes('/sections/') ||
                               event.request.url === '/';
            
            if (shouldCache) {
              const responseToCache = response.clone();
              
              caches.open(CACHE_NAME)
                .then(cache => {
                  console.log('[ServiceWorker] Caching new resource:', event.request.url);
                  cache.put(event.request, responseToCache);
                });
            }
            
            return response;
          });
      })
      .catch(error => {
        console.log('[ServiceWorker] Fetch failed:', error);
        // You could return a custom offline page here
      })
  );
}); 