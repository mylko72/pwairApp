<template>
  <div>
    <LoginHeader></LoginHeader>
    <LoginForm></LoginForm>
    <LoginSNS></LoginSNS>
  </div>
</template>

<script>
import LoginForm from './LoginForm.vue'
import LoginHeader from './LoginHeader.vue'
import LoginSNS from './LoginSNS.vue'

export default {
  components: {
    LoginForm,
    LoginHeader,
    LoginSNS
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
