<template>
  <div>
    <LoginHeader></LoginHeader>
    <LoginForm
      v-bind:data-email="email"
      v-bind:data-pw="password"
      v-on:login-with-email="loginWithEmail">
    </LoginForm>
    <LoginSNS v-on:login-with-google="loginWithGoogle" v-on:login-with-facebook="loginWithFacebook"></LoginSNS>
    <modal v-if="showModal" @close="showModal = false">
      <h3 class="tit" slot="header">Sign Up</h3>
      <div slot="body">
        <div class="frm">
          <p>
            <input type="text" class="ipt-email" name="email" v-model="email" placeholder="이메일 주소를 입력해주세요." />
          </p>
          <p>
            <input type="password" class="ipt-pw" name="password" v-model="password" placeholder="비밀번호를 입력해주세요." />
          </p>
          <button type="button" class="bt_signup" v-on:click="signUp">SIGN UP</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import LoginForm from './LoginForm.vue'
import LoginHeader from './LoginHeader.vue'
import LoginSNS from './LoginSNS.vue'
import eventBus from '../common/EventBus.vue';
import Modal from '../common/Modal.vue'

export default {
  data(){
    return {
      email: '',
      password: '',
      showModal: false
    }
  },
  created(){
    eventBus.$on('sign-up', () => {
      console.log('sign up');
      this.showModal = true;
    });
  },
  components: {
    LoginForm,
    LoginHeader,
    LoginSNS,
    Modal
  },
  methods: {
    loginWithEmail(userInfo){
      var userEmail = userInfo.email,
          userPW = userInfo.password;

      firebase.auth().signInWithEmailAndPassword(userEmail, userPW).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ...
      }).then((user) => {
        console.log(user);
        if(user){
          // window.location = '/home'
          this.$router.push({ path: 'home' })
        }else{
          alert('계정이 없습니다.');
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
          // window.location = '/home';
          this.$router.push({ path: 'home' })
        }
      }).catch((error) => {
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
    loginWithFacebook(){
      var provider = new firebase.auth.FacebookAuthProvider();
      provider.setCustomParameters({
        'display': 'popup'
      });
      firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);

        if(user){
          this.$router.push({ path: 'home' })
        }
        // ...
      }).catch((error) => {
        // An error happened.
        // Step 1.
        // User tries to sign in to Facebook.
        if (error.code === 'auth/account-exists-with-different-credential') {
          // Step 2.
          // User's email already exists.
          // The pending Facebook credential.
          var pendingCred = error.credential;
          // The provider account's email address.
          var email = error.email;
          // Get registered providers for this email.
          firebase.auth().fetchProvidersForEmail(email).then((providers) => {
            //providers returns this array -> ["google.com"]
            // You need to sign in the user to that google account
            // with the same email.
            // In a browser you can call:
            // var provider = new firebase.auth.GoogleAuthProvider();
            // provider.setCustomParameters({login_hint: error.email});
            // firebase.auth().signInWithPopup(provider)
            // If you have your own mechanism to get that token, you get it
            // for that Google email user and sign in
            firebase.auth().signInWithCredential(pendingCred)
                  .then(user => {
                    // You can now link the pending credential from the first
                    // error.
                    user.link(pendingCred)
                  })
                  .catch(error => console.log(error))
          });
        }
      });
    },
    signUp(){
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch((error) => {
         console.log(error.code);
         console.log(error.message);
      }).then(() => {
          this.email = '';
          this.password = '';
          alert('가입되었습니다.');
      });
      this.showModal = false;
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
      }).catch((error) => {
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

<style>
body {
  background:rgb(75, 128, 218);
  color:#fff;
  text-align:center;
}
.tit {
  margin:0;
  padding:10px 0;
  background:rgb(75, 128, 218);
}
.frm {
  width:100%;
  border:1px solid #eee;
  padding:10px 10px 20px;
  background: #fff;
}
.frm p {
  margin: 5px
}
.frm input {
  width:100%;
  height:30px;
  padding:0 10px;
  line-height:30px;
  border:0;
}
.ipt-email {
  background:rgb(180, 210, 218);
}
.ipt-pw {
  background:rgb(180, 210, 218);
}

</style>
