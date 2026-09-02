// Define o nome do cache
const CACHE_NAME = 'v1_cache_Radio_Cristiana_Omega';

// Lista de arquivos a serem cacheados
const urlsToCache = [
  '/',
  '/index.html',
  '/nosotros/nosotros.html',
  '/nosotros/style_nosotros.css',
  '/css/style.css',
  '/js/script.js',
  '/js/main.js',
  '/js/bootstrap.min.js',
  '/img/cover.png',
  '/img/logo-1200.png',
  '/img/cover-500.png',
  '/img/icon-192.png',
  '/img/icon-512.png',
  '/img/Compartir_0.png',
  '/img/Facebook.png',
  '/img/libro1.png',
  '/img/nosotros.png',
  '/img/noticias.png',
  '/img/Whatsapp.png',
  '/img/bg_site.jpg',
  '/audio/audio_tecnologia.mp3',
  '/audio/Beeps.mp3',
  // Adicione outros recursos que deseja cache aqui
];

// Instala o Service Worker e adiciona os arquivos ao cache
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log('Cache aberto');
            return cache.addAll(urlsToCache);
        })
    );
});

// Intercepta as solicitações e serve os arquivos em cache se disponíveis
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            // Cache hit - retorna a resposta do cache
            if (response) {
                return response;
            }
            // Não encontrado no cache - busca na rede
            return fetch(event.request);
        })
    );
});
