const cachename ='v1';
const cachefiles =[
    './index.html',
    './restaurant.html',
    '/js/dbhelper.js',
    './js/main.js',
    './js/restaturant_info.js',
    './img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
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