// Define el nombre de la caché
const CACHE_NAME = 'v1_cache_Radio_Cristiana_Omega';

const urlsToCache = [
  './',
  './index.html',
  './nosotros/nosotros.html',
  './nosotros/style_nosotros.css',
  './css/style.css',
  './js/script.js',
  './js/main.js',
  './js/bootstrap.min.js',
  './img/cover.png',
  './img/logo-1200.png',
  './img/cover-500.png',
  './img/icon-192.png',
  './img/icon-512.png',
  './img/Compartir_0.png',
  './img/Facebook.png',
  './img/libro1.png',
  './img/nosotros.png',
  './img/noticias.png',
  './img/Whatsapp.png',
  './img/bg_site.jpg',
  './audio/audio_tecnologia.mp3',
  './audio/Beeps.mp3'
];

// Instala el Service Worker y agrega los archivos a la caché
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log('Caché abierto con éxito');
            // Usamos un bucle para evitar que un solo archivo faltante rompa toda la instalación
            return Promise.all(
                urlsToCache.map(function(url) {
                    return cache.add(url).catch(function(error) {
                        console.error('No se pudo precargar el archivo:', url, error);
                    });
                })
            );
        })
    );
});

// Intercepta las solicitudes y sirve los archivos almacenados en caché si están disponibles
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

// Limpia los cachés antiguos cuando se activa un nuevo Service Worker
self.addEventListener('activate', function (event) {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Borrando caché antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(function() {
            return self.clients.claim();
        })
    );
});


