<template>
  <div class="container">
    <h1>지난 대기 지수 보기</h1>

    <div class="chartdiv">
      <div v-show="!airResult.loaded">Loading ...</div>
      <BarChart></BarChart>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import BarChart from '../charts/BarChart.js'
import Loading from '../common/Loading.vue'
import { eventBus } from '../../main.js'

export default {
  data(){
    return {
      userAddress: '',
      airResult: {
        loaded: false,
      },
    }
  },
  created(){
    // this.$emit('getLoc');
    this.userAddress = this.$route.query.address;
    this.fetchData(this.userAddress);
  },
  components: {
    BarChart,
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
    fetchData(userAddress){
      var date = '20180316'
      var url = 'http://openapi.seoul.go.kr:8088/746a5361636a6f7337336e4f656579/json/DailyAverageAirQuality/1/39/'+date;
      var district = this.getDistrict(userAddress);
      // var district = '동작구';
      console.log('address', district);

      axios.get(url).then((response) => {
        var data = response.data.DailyAverageAirQuality.row;
        var result = this.find(data, this.bmatch1('MSRSTE_NM', district));
        console.log(result);
        if(result !== undefined){
          this.airResult.date = result.MSRDT_DE;  // "MSRDT":"측정일시"
          this.airResult.station = result.MSRSTE_NM; // "MSRSTE_NM":"측정소명"
          this.airResult.pm25 = result.PM25;  // "PM25":초미세먼지농도
          this.airResult.pm10 = result.PM10;  // "PM10":"미세먼지
          this.airResult.o3 = result.O3;  // "O3":"오존"
          this.airResult.loaded = true;
          eventBus.$emit('showData', this.airResult);
        }
      });
    },
    getDistrict(address){
      var tempArr = address.split(' ');
      for (var i = 0, len = tempArr.length; i < len; i++) {
        if (tempArr[i].indexOf('구') != -1) return tempArr[i];
      }
    },
  }
}
</script>

<style scoped>
.container {
  height:85%;
  margin:10px;
  padding:20px 0 0;
  border-radius:10px;
  background:#fff;
}

.container h1 {
  margin-bottom:15px;
  color:#333;
  text-align:center;
}

.chartdiv {
  padding:30px 5px 0;
}
</style>
