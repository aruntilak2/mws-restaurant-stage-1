const cachename ='v1';
const cachefiles =[
    '/',
    '../index.html',
    '../restaurant.html',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/data/restaurants.json',
    '/css/styles.css'
];
self.addEventListener('install', function(e){
    console.log("Installed");
    e.waitUntil(
        caches
            .open(cachename)
            .then(cache => {
                console.log('SW: Caching files');
                cache.addAll(cachefiles);
            })
            .then(() => self.skipWaiting())
    );
});
self.addEventListener('activate', function(){
    console.log("Activated");
})
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response){
            if (response){
                console.log(" Got these ", e.request, 'in the cache');
                return response;
            }
            else {
                console.log("Sorry!", e.request, "nothing to fetch");
                return fetch(e.request)
                .then(function(response){
                    const clonedResponse = response.clone();
                    caches.open(cachename).then(function(cache){
                        cache.put(e.request, clonedResponse);
                    })
                    return response;
                })
                .catch(function(err){
                    console.log(err);
                })
            }
        })
    );
});