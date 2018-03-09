<template>
  <div class="loginBx">
    <p>
      <input type="text" class="email" name="email" v-model="email" placeholder="이메일 주소를 입력해주세요." />
    </p>
    <p>
      <input type="password" class="pw" name="pw" v-model="pw" placeholder="비밀번호를 입력해주세요." />
    </p>
    <button type="button" class="btn_login" v-on:click="loginWithEmail">LOGIN</button>
  </div>

</template>

<script>
export default {
  data(){
    return {
      email: this.dataEmail,
      pw: this.dataPw
    }
  },
  props: ['dataEmail', 'dataPw'],
  methods: {
    loginWithEmail(){
      var userInfo = {
        email: this.email,
        pw: this.pw
      }
      this.$emit('login-with-email', userInfo);
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
  width:100%;
  height:30px;
  background:rgb(204, 165, 29);
  line-height: 27px;
}
</style>
