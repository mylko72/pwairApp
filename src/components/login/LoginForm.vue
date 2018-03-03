<template>
  <div class="loginBx">
    <p>
      <input type="text" class="email" />
    </p>
    <p>
      <input type="password" class="pw" />
    </p>
    <button type="button" class="btn_login">LOGIN</button>
  </div>

</template>

<script>
export default {
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
