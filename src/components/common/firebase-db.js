var db = firebase.database();
var SubscribedKey = null;
var isSubscribed = false;

function setSubscribedKeytoFirebase(key) {
  SubscribedKey = 'users/SubscribedKey-' + getID();
  return db.ref(SubscribedKey).set({
    key: key,
    isSubscribed: true,
    time: getCurrentTime()
  }).then(function () {
    console.log("The key has been sent to Firebase DB");
  }).catch(function () {
    console.error('Sending a key to server has been failed');
  });
}

function removeSubscribedKeyinFirebase(key){
  return db.ref(SubscribedKey).remove()
    .then(function(){
      console.log("The key has been removed in Firebase DB");
      SubscribedKey = null;
    }).catch(function(err){
      console.log('Removing a key in server has been failed', err);
    });
}

function getID() {
  var date = new Date();
  return date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
}

function getCurrentTime() {
  return new Date().toLocaleString();
}

export { setSubscribedKeytoFirebase, removeSubscribedKeyinFirebase }
