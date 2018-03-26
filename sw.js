self.addEventListener('push', function(event){
  var title = 'PWAir';
  var options = {
    body: '현재 미세먼지 정보를 원하면 클릭하세요',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  }

  var notiPromise = self.registration.showNotification(title, options);
  event.waitUntil(notiPromise);
});

self.addEventListener('notificationclick', function(event){
  event.notification.close();
  event.waitUntil(
    clients.openWindow('http://www.google.com/')
  );
});
