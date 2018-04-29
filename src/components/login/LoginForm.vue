<template>
  <div class="loginBx">
    <p>
      <input type="text" class="email" name="email" v-model="email" placeholder="이메일 주소를 입력해주세요." />
    </p>
    <p>
      <input type="password" class="pw" name="pw" v-model="password" placeholder="비밀번호를 입력해주세요." />
    </p>
    <button type="button" class="btn_login" v-on:click="loginWithEmail">LOGIN</button>
    <button type="button" class="btn_signup" v-on:click="signUp">SIGN UP</button>
  </div>

</template>

<script>
import eventBus from '../common/EventBus.vue';

export default {
  data(){
    return {
      email: this.dataEmail,
      password: this.dataPw
    }
  },
  props: ['dataEmail', 'dataPw'],
  methods: {
    loginWithEmail(){
      var userInfo = {
        email: this.email,
        password: this.password
      }
      this.$emit('login-with-email', userInfo);
    },
    signUp(){
      eventBus.$emit('sign-up');
    }
  }
}
</script>

<style scoped>
.loginBx {
  width:80%;
  padding:10px 20px 20px;
  background: #fff;
  margin: 0 auto;
}
input {
  width:100%;
  height:30px;
  padding:0 10px;
  line-height:30px;
  border:0;
}
.email {
  background:rgb(213, 214, 130);
}
.pw {
  background:rgb(213, 214, 130);
}
.btn_login {
  width:49%;
  height:30px;
  background:rgb(204, 165, 29);
  line-height: 27px;
}
.btn_signup {
  width:49%;
  height:30px;
  background:rgb(204, 165, 29);
  line-height: 27px;
}
</style>
