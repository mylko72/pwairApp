<template>
  <div>
    <LoginHeader></LoginHeader>
    <LoginForm
      v-bind:data-email="email"
      v-bind:data-pw="pw"
      v-on:login-with-email="loginWithEmail">
    </LoginForm>
    <LoginSNS v-on:login-with-google="loginWithGoogle"></LoginSNS>
  </div>
</template>

<script>
import LoginForm from './LoginForm.vue'
import LoginHeader from './LoginHeader.vue'
import LoginSNS from './LoginSNS.vue'

export default {
  data(){
    return {
      email: 'test@naver.com',
      pw: ''
    }
  },
  components: {
    LoginForm,
    LoginHeader,
    LoginSNS
  },
  methods: {
    loginWithEmail(userInfo){
      var userEmail = userInfo.email,
          userPW = userInfo.pw;

      firebase.auth().signInWithEmailAndPassword(userEmail, userPW).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ...
      }).then(function(user){
        console.log(user);
        if(user){
          window.location = '/home'
        }
      });
    },
    loginWithGoogle(){
      var provider = new firebase.auth.GoogleAuthProvider();
      //provider.addScope('https://www.googleapis.com/auth/plus.login');
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      //팝업창을 사용해서 로그인
      firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        //this.getResult();
        if(user){
          window.location = '/home';
        }

      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert("You have already signed up with a different auth provider for that email.");
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        }
      });
    },
    getResult(){
      alert('call');
      firebase.auth().getRedirectResult().then((result) => {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log(user);
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }
  }
}
</script>

<style lang="css">
body {
  background:rgb(75, 128, 218);
  color:#fff;
  text-align:center;
}
</style>
