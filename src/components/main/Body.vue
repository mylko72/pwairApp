<template>
  <div class="container" v-cloak>
    <div v-show="!airData.loading">
      <Loading />
    </div>
    <div v-show="airData.error" class="error-txt">
      일치하는 정보가 없습니다.
    </div>
    <div v-if="airData.loading && !airData.error">
      <p class="symbol">
        <i v-if="airData.rating=='좋음'" class="far fa-smile"></i>
        <i v-else-if="airData.rating=='보통'" class="far fa-meh"></i>
        <i v-else class="far fa-frown"></i>
      </p>
      <p class="index">{{ airData.index }}</p>
      <p class="info">
        <span>{{ airData.station }}</span>의 대기는 지금 <span>{{ airData.rating }}</span>!
      </p>
      <p class="date">
        기준 : {{ airData.date }}
      </p>
      <div class="map">
        <a href="#" @click="topggleMap">
          <span v-show="showMap"><i class="fas fa-times-circle"></i></span>
          <span v-show="!showMap"><i class="fas fa-map-marker-alt"></i></span>
        </a>
        <div v-show="showMap" id="mapObj"></div>
      </div>
    </div>
    <!-- Vue Modal -->
    <modal v-if="showModal" @close="showModal = false">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <h3 slot="header">경고</h3>
      <p slot="body">할 일을 입력하지 않았습니다.<br  />할 일을 입력하세요!</p>
    </modal>
  </div>
</template>

<script>
import axios from 'axios'
import Modal from '../common/Modal.vue'
import Loading from '../common/Loading.vue'
import { eventBus } from '../../main.js'

export default {
  data(){
    return {
      userAddress: '',
      showModal: false,
      showMap: false
    }
  },
  props: ['airData'],
  created(){
    eventBus.$on('transAddress', (value) => {
      this.userAddress = value;
      this.getData(this.userAddress);
    });
    this.$emit('getLoc');  
  },
  components: {
    Modal,
    Loading
  },
  methods: {
    find(list, predicate){
      for (var i = 0, len = list.length; i < len; i++) {
        if (predicate(list[i])) return list[i];
      }

    },
    bmatch1(key, val) {
      return function(obj) {
        return obj[key] === val;
      }
    },
    getData(userAddress){
      var url = 'http://openapi.seoul.go.kr:8088/746a5361636a6f7337336e4f656579/json/RealtimeCityAir/1/25/';
      var district = this.getDistrict(userAddress);
      // var district = '동작구';
      console.log('address', district);

      axios.get(url).then((response) => {
        var data = response.data.RealtimeCityAir.row;
        var result = this.find(data, this.bmatch1('MSRSTE_NM', district));
        console.log(result);
        if(result !== undefined){
          this.airData.loading = true;
          this.airData.index = result.IDEX_MVL; // "IDEX_MVL":"통합대기환경지수"
          this.airData.station = result.MSRSTE_NM; // "MSRSTE_NM":"측정소명"
          this.airData.rating = result.IDEX_NM;  // "IDEX_NM":"통합대기환경등급
          this.airData.date = result.MSRDT;  // "MSRDT":"측정일시"
          this.airData.pm25 = result.PM25;  // "PM25":초미세먼지농도
          this.airData.pm10 = result.PM10;  // "PM10":"미세먼지
          this.airData.o3 = result.O3;  // "O3":"오존"
          eventBus.$emit('changeColor', this.airData.rating);
        }else{
          this.airData.loading = true;
          this.airData.error = true;
        }
      });
    },
    getDistrict(address){
      var tempArr = address.split(' ');
      for (var i = 0, len = tempArr.length; i < len; i++) {
        if (tempArr[i].indexOf('구') != -1) return tempArr[i];
      }
    },
    topggleMap(){
      this.showMap = !this.showMap;
      if(this.showMap){
        console.log('show map');
        this.$emit('showGoogleMap');
      }
    }
  }
}
</script>

<style>
body {
  height:100%;
}

p {
  margin:0;
}

[v-cloak] {
  display:none;
}

.container {
  height:100%;
  padding:60px 0;
  text-align:center;
}
.symbol {
  font-size:5.2rem;
  color:#fff;
}
.index {
  padding:10px 0 0;
  font-size:3.5rem;
  color:#fff;
  line-height:1;
}
.info {
  padding:20px 0 15px;
  font-size:1.8rem;
  color:#fff;
  line-height: 1;
  font-weight:bold;
}
.date {
  font-size:1.2rem;
  color:#fff;
}
.map {
  margin-top:15px;
  color:#333;
}
.map a {
  font-size:1.8rem;
  color:#fff;
}

.error-txt {
  position:absolute;
  top:50%;
  width:100%;
  margin-top:-10px;
  font-size:1.4rem;
  color:#fff;
  text-align:center;
}

#mapObj {
  position:absolute;
  width:100%;
  height:245px;
  bottom:0;
  z-index:99;
}
</style>
