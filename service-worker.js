// Initialize Firebase
var config = {
  apiKey: "AIzaSyAjlejip5IemOidKd9rkqtvLnmfEDEHBYw",
  authDomain: "pwair-472e1.firebaseapp.com",
  databaseURL: "https://pwair-472e1.firebaseio.com",
  projectId: "pwair-472e1",
  storageBucket: "pwair-472e1.appspot.com",
  messagingSenderId: "181657868038"
};

firebase.initializeApp(config);

var swRegistration = null;
var isSubscribed = false;
// 애플리케이션 서버키 설정
const applicationServerPublicKey = 'BMf0VCXCXfQoRszse2G_Laa_ntTCw1rgwiYJzFrvmC2fDkcJgyB7DxcboauhEao3O2H6LhFKw9F3QrGSPVj5bxs';

// 서비스워커 지원여부 파악 및 등록
if('serviceWorker' in navigator && 'PushManager' in window){
  navigator.serviceWorker.register('./sw.js').then((swReg) => {
    console.log('Service Worker is registered', swReg);
    swRegistration = swReg;
    // this.initialiseUI();
  }).catch(function(err){
    console.error('서비스워커 등록오류', err);
  })
}else {
  console.warn('Push messaging is not supported');
}

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
