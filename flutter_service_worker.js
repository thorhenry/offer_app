'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"main.dart.js": "f6187c2abdda13e1857ec4d3cbfa9bd8",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"index.html": "f704b0a47ad81aabe1c8f5d96e33f831",
"/": "f704b0a47ad81aabe1c8f5d96e33f831",
"assets/FontManifest.json": "6417cdf318ab618d0a688981ca175bec",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/AssetManifest.json": "9ccd174f1fe021093639577e1ed254bf",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/iconly/fonts/IconlyLight.ttf": "5f376412227e6f8450fe79aec1c2a800",
"assets/packages/iconly/fonts/IconlyBroken.ttf": "6fbd555150d4f77e91c345e125c4ecb6",
"assets/packages/iconly/fonts/IconlyBold.ttf": "128714c5bf5b14842f735ecf709ca0d1",
"assets/assets/fonts/OpenSans-VariableFont_wdth,wght.ttf": "996d0154a25c63500dee2ae91e4f2ea7",
"assets/assets/fonts/OpenSans-Italic-VariableFont_wdth,wght.ttf": "d7ee2675bf5b9abd62749deb0d91f40d",
"assets/assets/lottie/d-login.json": "9f9f2894c7519bb1c7ac264433999865",
"assets/assets/lottie/register_wait.json": "1164dd35e2e737646e984ec601a64772",
"assets/assets/lottie/login.json": "cb41def8492745f6da17aa174f24bc18",
"assets/assets/images/app_icon.png": "3c8b7c753e543878c870ec18cc814a20",
"assets/assets/images/i3.png": "1df7cd393d80ff0a4b0607fc74890305",
"assets/assets/images/2.png": "9de6b15d887724cd481798d85cf8deb1",
"assets/assets/images/i1.png": "fc90f175f42c53380dab66798c7f2249",
"assets/assets/images/done.png": "48d3b239d4d8259bc57337bfb9c5bc40",
"assets/assets/images/empty_p.png": "1141917d5c037e8d51322d9f245fbc61",
"assets/assets/images/v.png": "63db06f8da76c4799f9506f6697aac52",
"assets/assets/images/i2.png": "340d308c856637a4472956c9ac57c201",
"assets/assets/images/empty_favorite_d.png": "0ce2f59fafa2a6b3828922134db8f75c",
"assets/assets/images/empty.png": "904459b1ee4a4f0f31411e3cf36e9768",
"assets/assets/images/github_white.png": "1dee40f2668d5c719eafa2c89296f5e7",
"assets/assets/images/d.png": "9839ba0be2ac6cb6d2c1ac87982ecb01",
"assets/assets/images/empty_favorite.png": "ddf1964cfa4b71fc986202a83e68c80b",
"assets/assets/images/google.png": "593dd6c5dc0652a289553ec88375ac48",
"assets/assets/images/12.png": "b8d45b41453cdc434af51ed11c2686c9",
"assets/assets/images/p.png": "c38dd7a299645733e5247d54bf206f6f",
"assets/assets/images/c.png": "16dbc44d8d44fd6157f722a9674e7b07",
"assets/assets/images/i4.png": "4cf971ce0d21cd5d355f67428b56ead1",
"assets/assets/images/empty_d.png": "d461e814916a72384d768fb39e840fec",
"assets/assets/images/14.gif": "0190315985e4c32e50f730dcd2458f13",
"assets/assets/images/4.gif": "58aedc14a78caa9edfccf3683a80a186",
"assets/assets/images/empty_search_d.png": "c2ca5d2255a3329973bf50b83c90778a",
"assets/assets/images/github.png": "43ce87609eb221d09d4832a9c0e709d0",
"assets/assets/images/empty_search.png": "a975f693cb5b803c0e65300c8cbc7c3a",
"assets/NOTICES": "bb296989d8afd4a53d9f0a797b58bedf",
"manifest.json": "dee1c6249463419bc504b10fad7f04d5",
"version.json": "8debc9f0750bcdf382f19201adf59b80",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
