
const CACHE_NAME = "cotton-mitra-v1";

const APP_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./knowledge.js",
  "./app.js",
  "./manifest.json",
  "./assets/icons/cotton-mitra.svg"
];

// Install and cache the core app files.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.all(
        APP_FILES.map(async (file) => {
          try {
            const response = await fetch(file);

            if (response.ok) {
              await cache.put(file, response);
            }
          } catch (error) {
            // Continue if an individual file is unavailable.
          }
        })
      );

      await self.skipWaiting();
    })
  );
});

// Remove older Cotton Mitra caches.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(async (keys) => {
      await Promise.all(
        keys
          .filter(
            (key) =>
              key.startsWith("cotton-mitra-") &&
              key !== CACHE_NAME
          )
          .map((key) => caches.delete(key))
      );

      await self.clients.claim();
    })
  );
});

// Serve cached files offline; refresh from the network when possible.
self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (
    request.method !== "GET" ||
    new URL(request.url).origin !== self.location.origin
  ) {
    return;
  }

  event.respondWith(
    (async () => {
      const cached = await caches.match(request);

      if (request.mode === "navigate") {
        try {
          const response = await fetch(request);

          if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put("./index.html", response.clone());
          }

          return response;
        } catch (error) {
          return (
            cached ||
            (await caches.match("./index.html")) ||
            Response.error()
          );
        }
      }

      if (cached) {
        // Return the cached file immediately.
        // Update its cache for the next visit.
        event.waitUntil(
          fetch(request)
            .then(async (response) => {
              if (response.ok) {
                const cache = await caches.open(CACHE_NAME);
                await cache.put(request, response);
              }
            })
            .catch(() => {})
        );

        return cached;
      }

      try {
        return await fetch(request);
      } catch (error) {
        return Response.error();
      }
    })()
  );
});
