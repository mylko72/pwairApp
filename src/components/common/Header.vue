<template>
  <div class="header md-layout-column">
    <md-toolbar>
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <h1>PWAir</h1>
      <span class="reload"><i class="fas fa-sync-alt"></i></span>
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
          <span class="md-list-item-text">Logout</span>
        </md-list-item>

        <md-list-item>
          <div>
            <md-switch ref="switch" v-model="isSubscribed">Push is {{ isSubscribed ? 'on' : 'off' }}</md-switch>
          </div>
        </md-list-item>
      </md-list>
    </md-drawer>
  </div>

</template>

<script>
import { eventBus } from '../../main.js';

export default {
  data(){
    return {
      showNavigation: false,
      // isSubscribed: '',
      checked: 'disable',
      email: ''
    }
  },
  props: ['uAddress'],
  created(){
    this.getUserInfo();
    eventBus.$on('updateUI', (isSubscribed) => {
      console.log('isSubscribed', isSubscribed);
      this.updateBtn(isSubscribed);
    })
  },
  computed: {
    isSubscribed: {
      get(){
        return this.checked
      },
      set(){
        this.checked = !this.checked;
        console.log('call set');
        if(this.checked){
          this.toggleBtn();
        }
      }
    }
  },
  methods: {
    getUserInfo(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          console.log(user);
          this.email = email;
          // ...
        } else {
          // User is signed out.
          // ...
        }
      });
    },
    updateBtn(isSubscribed) {
      // 푸시 알람이 차단되어 있는지 확인
      if (Notification.permission === 'denied') {
        console.log('Push Messaging Blocked.');
        // pushButton.disabled = true;
        updateSubscriptionOnServer(null);
        return;
      }

      // 구독 상태 저장
      this.checked = isSubscribed;
    },
    toggleBtn(){
      if (this.checked) {
        console.log('call emit');
        eventBus.$emit('subscribed');
      } else {
        // TODO: Unsubscribe user
      }

    },
    goPage(url){
      this.$router.push({ path: url })
      this.showNavigation = !this.showNavigation
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
