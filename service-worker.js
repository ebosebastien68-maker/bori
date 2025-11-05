// Nom du cache (change-le pour forcer une mise à jour quand tu modifies ton site)
const CACHE_NAME = "WorldConnect-cache-v1";

// Liste des fichiers à mettre en cache
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/connect_pro.png",
  "/manifest.json"
];

// Installation du Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("✅ Mise en cache des fichiers");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  console.log("🧹 Ancien cache supprimé, nouveau prêt !");
  self.clients.claim();
});

// Interception des requêtes réseau
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
