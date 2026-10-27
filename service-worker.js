
"use strict";

const CACHE_NAME = "cotton-mitra-v2";

const APP_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./knowledge.js",
  "./manifest.json",
  "./assets/icons/cotton-mitra.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      await Promise.all(
        APP_FILES.map(async (path) => {
          try {
            const response = await fetch(path, {
              cache: "reload"
            });

            if (response.ok) {
              await cache.put(path, response);
            }
          } catch (error) {
            // Missing optional files must not stop installation.
          }
        })
      );

      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

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
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Do not intercept external websites or WhatsApp links.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);

      if (request.mode === "navigate") {
        try {
          const response = await fetch(request);

          if (response.ok) {
            await cache.put("./index.html", response.clone());
          }

          return response;
        } catch (error) {
          return (
            cached ||
            await cache.match("./index.html") ||
            new Response(
              "Cotton Mitra is offline. Please reconnect to the internet and try again.",
              {
                status: 503,
                headers: { "Content-Type": "text/plain; charset=utf-8" }
              }
            )
          );
        }
      }

      if (cached) {
        // Return the cached file immediately.
        // Refresh the cache in the background when possible.
        event.waitUntil(
          fetch(request)
            .then(async (response) => {
              if (response.ok) {
                await cache.put(request, response);
              }
            })
            .catch(() => {})
        );

        return cached;
      }

      try {
        const response = await fetch(request);

        if (response.ok) {
          await cache.put(request, response.clone());
        }

        return response;
      } catch (error) {
        return new Response("", { status: 503 });
      }
    })()
  );
});
                      
