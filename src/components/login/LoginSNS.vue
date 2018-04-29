<template>
  <div class="bxSns">
    <button type="button" v-on:click="loginWithGoogle">GOOGLE</button>
    <button type="button" v-on:click="loginWithFacebook" >FACEBOOK</button>
  </div>
</template>

<script>
export default {
  methods: {
    loginWithGoogle(){
      this.$emit('login-with-google');
    },
    loginWithFacebook(){
      this.$emit('login-with-facebook');
    }
  }
}
</script>

<style scoped>
.bxSns {
  margin-top:15px;
}
.bxSns button {
  height:30px;
  padding:0 15px;
  background:rgb(25, 82, 129);
  color:#fff;
  border:0;
  line-height:30px;
  transition: .3s;
}
.bxSns button:hover {
  background:rgb(15, 60, 97);
}
</style>
