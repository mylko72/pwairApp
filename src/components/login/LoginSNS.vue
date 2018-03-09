<template>
  <div class="bxSns">
    <button type="button" v-on:click="loginWithGoogle">GOOGLE</button>
    <button type="button" id="loginWithFacebook" >FACEBOOK</button>
  </div>
</template>

<script>
export default {
  methods: {
    loginWithGoogle(){
      this.$emit('login-with-google');
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
}
</style>
