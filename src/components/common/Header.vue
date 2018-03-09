<template>
  <div class="header">
    <span class="menu"></span>
    <h1>PWAir</h1>
    <span class="user">{{ email }}</span>
  </div>

</template>

<script>
export default {
  data(){
    return {
      email: ''
    }
  },
  created(){
    this.getUserInfo();
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
    }
  }
}
</script>

<style scoped>
  .header {
    position: relative;
    padding: 10px 20px;
    overflow: hidden;
  }
  h1 {
    float: left;
    font-size: 1.4rem;
    color: #fff;
  }
  .user {
    float: right;
    margin-top:15px;
    color:#fff;
  }
</style>
