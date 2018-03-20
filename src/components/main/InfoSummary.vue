<template>
  <div v-if="airData.loading && !airData.error" class="infoBx">
    <div class="status">
        <p class="type">
          미세먼지
        </p>
        <p class="symbol">
          <i class="far fa-smile"></i>
        </p>
        <p class="lev">
          {{ airData.rating }}
        </p>
        <p class="num">
          {{ airData.pm10 }} ㎍/㎥
        </p>
    </div>
    <div class="status">
        <p class="type">
          오존
        </p>
        <p class="symbol">
          <i class="far fa-frown"></i>
        </p>
        <p class="lev">
          {{ airData.rating }}
        </p>
        <p class="num">
          {{ airData.o3 }} ppm
        </p>
    </div>
    <div class="status">
        <p class="type">
          초미세먼지
        </p>
        <p class="symbol">
          <i class="far fa-meh"></i>
        </p>
        <p class="lev">
          {{ airData.rating }}
        </p>
        <p class="num">
          {{ airData.pm25 }} ㎍/㎥
        </p>
    </div>
  </div>

</template>

<script>

export default {
  props: ['airData'],

}
</script>

<style scoped>
p {
  padding:5px 0;
}
.infoBx {
  position:absolute;
  bottom:0;
  width:100%;
  padding:20px 0 35px;
  background:rgba(255,255,255,.2);
}
.status {
  float:left;
  width:33.333%;
  text-align:center;
}
.type {
  font-size:1.3rem;
  color:#fff;
}
.symbol {
  font-size:3.5rem;
  color:#fff;
}
.lev {
  font-size:1.1rem;
  color:#fff;
}
.num {
  font-size:1rem;
  color:#fff;
}
</style>
