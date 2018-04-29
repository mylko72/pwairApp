importScripts('./src/vendor/sw-toolbox.js');

const precacheFiles = [
  './',
  // Images
  // './src/assets/favicon.ico',
  './src/assets/pwair_logo_1x.png',
  './src/assets/pwair_logo_2x.png',
  './src/assets/pwair_logo_3x.png',
  // JS
  './src/vendor/sw-toolbox.js',
  './service-worker.js',
  './dist/build.js',
  // Mock Json
  // 'http://openapi.seoul.go.kr:8088/746a5361636a6f7337336e4f656579/json/RealtimeCityAir/1/25/'
];

// Precache the files
toolbox.precache(precacheFiles);

// 서비스 워커에서 발생하는 푸시 이벤트를 수신
// self는 서비스 워커 자체를 참조하므로 서비스 워커에 이벤트 리스너를 추가
self.addEventListener('push', function(event){
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'PWAir';
  const options = {
    body: '자세한 미세먼지 정보를 원하면 클릭하세요',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  }

  var notiPromise = self.registration.showNotification(title, options);   // 알림 생성
  event.waitUntil(notiPromise);   // 프라미스를 취하며 브라우저는 전달된 프라미스가 확인될 때까지 서비스 워커를 활성화 및 실행 상태로 유지
});

self.addEventListener('notificationclick', function(event){  // 알림 클릭을 처리
  event.notification.close();
  event.waitUntil(
    clients.openWindow('http://www.google.com/')
  );
});
