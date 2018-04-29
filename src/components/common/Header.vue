<template>
  <div class="header md-layout-column">
    <md-toolbar>
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <h1>PWAir</h1>
      <a href="#" @click="getRefresh"><span class="reload"><i class="fas fa-sync-alt"></i></span></a>
      <span class="user">{{ email }}</span>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">PWAir</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <a href="#" @click="goPage('/home')"><span class="md-list-item-text">Home</span></a>
        </md-list-item>

        <md-list-item>
          <a href="#" @click="goPage('/logs?address='+uAddress)"><span class="md-list-item-text">Statistic</span></a>
        </md-list-item>

        <md-list-item>
          <a href="#" @click="logout"><span class="md-list-item-text">Logout</span></a>
        </md-list-item>

        <md-list-item>
          <div @click.capture="switchBtn">
            <md-switch ref="switch" v-model="isSubscribed">
              {{ pushText }}
            </md-switch>
          </div>
        </md-list-item>
      </md-list>
    </md-drawer>
  </div>

</template>

<script>
import { eventBus } from '../../main.js';
import { setSubscribedKeytoFirebase, removeSubscribedKeyinFirebase } from './firebase-db.js';

export default {
  data(){
    return {
      showNavigation: false,
      // isSubscribed: '',
      checked: 'disable',
      isSubscribed: 'disable',
      pushText: 'Push is off',
      email: ''
    }
  },
  props: ['uAddress'],
  created(){
    this.getUserInfo();
    if(swRegistration !== null){
      this.initialiseUI();
    }
  },
  methods: {
    getUserInfo(){
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // console.log(user);
          this.email = email;
          // ...
        } else {
          // User is signed out.
          // ...
        }
      });
    },
    getRefresh(){
      eventBus.$emit('refresh');
    },
    // 상태 초기화
    initialiseUI() {
      // 푸시 메시지 구독 여부 확인
      swRegistration.pushManager.getSubscription() //구독이 있는 경우 현재 구독으로 확인되는 프라미스를 반환하고 그렇지 않으면 null을 반환하는 메서드
      .then((subscription) => {
        console.log('subscription', subscription);
        this.isSubscribed = !(subscription === null);
        console.log('isSubscribed', this.isSubscribed);
        if (this.isSubscribed) {
          console.log('User IS subscribed.');
        } else {
          console.log('User is NOT subscribed.');
        }
        // 구독여부에 따른 버튼상태 활성/비활성화
        this.updateBtn();
      });
    },
    // 구독여부에 따른 버튼 활성/비활성
    updateBtn() {
      // 푸시 알람이 차단되어 있는지 확인
      if (Notification.permission === 'denied') {
        console.log('Push Messaging Blocked.');
        this.pushText = 'Push Messaging Blocked';
        // pushButton.disabled = true;
        this.updateSubscriptionOnServer(null);
        return;
      }
      // 구독여부에 따른 텍스트 변경
      if (this.isSubscribed) {
        this.pushText = 'Push is on';
      } else {
        this.pushText = 'Push is off';
      }

      // 구독 상태 저장
      this.checked = this.isSubscribed;
    },
    // 푸시버튼 클릭에 따른 구독 신청/취소
    switchBtn(){
      if (this.checked) {
        // Unsubscribed user
        console.log('unsubscribed user');
        this.unsubscribeUser();  // 푸시메세지 구독 취소
      } else {
        // Subscribed user
        console.log('subscribed user');
        this.subscribeUser();   // 푸시메세지 구독 신청
      }
    },
    // 푸시 메세지 구독 신청
    subscribeUser() {
      const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
      // subscribe 메서드를 호출하여 애플리케이션 서버의 공개 키와 userVisibleOnly: true 값을 제출
      swRegistration.pushManager.subscribe({
        userVisibleOnly: true,  // 푸시가 전송될 때마다 알림을 표시하도록 허용
        applicationServerKey: applicationServerKey
      })
      .then((subscription) => {
        console.log('User is subscribed:', subscription);
        // 서버로 구독을 보내는 메서드
        this.updateSubscriptionOnServer(subscription);
        // 구독 상태로 설정
        this.isSubscribed = true;
        // 구독신청에 따른 버튼 활성
        this.updateBtn();
      })
      .catch((err) => {
        console.log('Failed to subscribe the user: ', err);
        this.updateBtn();
      });
    },
    // 구독 취소
    unsubscribeUser() {
      swRegistration.pushManager.getSubscription() //구독이 있는 경우 현재 구독으로 확인되는 프라미스를 반환하고 그렇지 않으면 null을 반환하는 메서드
      .then((subscription) => {
        if (subscription) {
          return subscription.unsubscribe();
        }
      })
      .catch((error) => {
        console.log('Error unsubscribing', error);
      })
      .then(() => {
        this.updateSubscriptionOnServer(null);

        console.log('User is unsubscribed.');
        this.isSubscribed = false;

        this.updateBtn();
      });
    },
    // 서버로 구독정보를 관리하는 메서드
    updateSubscriptionOnServer(subscription, unsubscribed) {
      if (subscription && !unsubscribed) {
        // 구독이 수신되면 서버로 구독정보를 보낸다.
        setSubscribedKeytoFirebase(subscription.endpoint.split('send/')[1]);
        console.log('구독이 수신됨');
      } else {
        // 구독이 취소되면 서버에서 구독정보를 삭제한다.
        removeSubscribedKeyinFirebase();
        console.log('구독이 해지됨');
      }
    },
    goPage(url){
      this.$router.push({ path: url })
      this.showNavigation = !this.showNavigation
    },
    logout(){
      firebase.auth().signOut().then(() => {
        console.log('Sign-out successful');
        // this.$router.replace({ path: '/' })
        window.location = '/';
        this.showNavigation = !this.showNavigation
      }).catch((error) => {
        // An error happened.
      });
    }
  }
}
</script>

<style scoped>
  .header {
    color:#666;
  }
  h1 {
    font-size: 1.4rem;
    color: #fff;
  }
  .menu {
    margin-right:10px;
    margin-top:15px;
    font-size: 1.4rem;
    color: #fff;
    cursor:pointer;
  }
  .user {
    margin-left:20px;
    color:#fff;
  }
  .reload {
    position:absolute;
    top:17px;
    right:10px;
    font-size: 1.4rem;
    color: #fff;
    cursor:pointer;
  }
  .md-toolbar {
    background-color:transparent;
    box-shadow:none;
  }
  .md-drawer {
     width: 100%;
     max-width: calc(100vw - 90px);
     background:#fff;
  }
  .md-drawer .md-list-item-container {
    font-size:18px;
  }
  .md-switch {
    display: flex;
  }
</style>
