<template>
  <div id="app" v-bind:class="bgColor">
    <router-view v-bind:uAddress="userAddress" name="nestedHeader"></router-view>
    <router-view v-bind:airData="airData" v-on:getLoc="getLocation" v-on:showGoogleMap="showMyLocation"></router-view>
    <router-view v-bind:airData="airData" name="summaryView"></router-view>
  </div>
</template>

<script>
import { eventBus } from './main.js';

export default {
  name: 'app',
  data(){
    return {
      bgColor: 'default',
      userAddress: '',
      currentPos: {
        latitude: '', // 위치
        longitude: '' // 경도
      },
      airData: {
        loading: false,
        index: 87,
        station: '강남구',
        rating: '보통',
        date: 12345,
      }
    }
  },
  created(){
    if (navigator.geolocation) {
      // GPS를 지원하면
      this.getLocation();
    } else {
      alert('GPS를 지원하지 않습니다');
    }

    eventBus.$on('changeColor', (rating)=>{
      if(rating == '보통'){
        this.bgColor = 'normal';
      }else if(rating == '좋음'){
        this.bgColor = 'good';
      }else if(rating == '나쁨'){
        this.bgColor = 'bad';
      }else{
        this.bgColor = 'default';
      }
    });
  },
  methods: {
    // 위치정보 얻기
    getLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude + ' ' + position.coords.longitude);
        this.currentPos.latitude = position.coords.latitude;
        this.currentPos.longitude = position.coords.longitude;
        var googlePos = new google.maps.LatLng(this.currentPos.latitude, this.currentPos.longitude);
        // 위치정보로 주소 얻기
        this.showMyAddress(googlePos, (popOpts) => {
          this.userAddress = popOpts.content;
          eventBus.$emit('transAddress', this.userAddress);
        });
      }, (error) => {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    },
    // Google지도에 내 위치 표시
    showMyLocation(){
      // 위치 객체의 위도와 경도 좌표를 Google maps latLng 객체로 변환
      var googlePos = new google.maps.LatLng(this.currentPos.latitude, this.currentPos.longitude);
      var mapOptions = {
				zoom : 12,  //확대,축소 수준을 지정
				center : googlePos, //지도를 사용자 위치의 중앙에 배치하도록 지정
				mapTypeId : google.maps.MapTypeId.ROADMAP   //로드맵, 위성 또는 하이브리드가 가능
      };
    	var mapObj = document.getElementById('mapObj');
    	var googleMap = new google.maps.Map(mapObj, mapOptions); // google map 객체 생성
      var markerOpt = {
    		map : googleMap,  //마커가 표시되어야하는 지도객체
    		position : googlePos, //마커가 표시되어야하는 위치
    		title : 'Hi , I am here', //마커를 가리킬 때 표시 될 제목
    		animation : google.maps.Animation.DROP
  		};
	    var googleMarker = new google.maps.Marker(markerOpt);  //옵션에 지정된 지도위의 위치에 마커를 만든다.

      // 주소를 찾고 마커를 클릭 할 때 얻은 주소를 표시
      this.showMyAddress(googlePos, (popOpts) => {
        var popOpts = popOpts;
        var popup = new google.maps.InfoWindow(popOpts);
        google.maps.event.addListener(googleMarker, 'click', () => {
          popup.open(googleMap);
        });
      });
    },
    // 역지오코딩 API를 사용하여 위치의 주소를 찾음.
    showMyAddress(googlePos, callback){
      var geocoder = new google.maps.Geocoder();
    	geocoder.geocode({'latLng': googlePos}, (results, status) => {
    		if (status == google.maps.GeocoderStatus.OK) {
          // console.log(results[1].address_components[1].long_name);
          // console.log(results[2].address_components);
    			if (results) {
    			  var popOpts = {
              content: this.findDongAddressFromResults(results),
    			    position : googlePos
    			  };
            if(typeof callback === 'function'){
              callback(popOpts);
            }
    			} else {
    				alert('No results found');
    		  }
    		} else {
    			alert('Geocoder failed due to: ' + status);
    		}
      });
    },
    /**
     * geocode의 여러 주소정보중 동 주소얻기
     * It's supporting only korean lang
     * @param results
     * @returns {string}
     */
    findDongAddressFromResults(results) {
      var dongAdress = "";
      var length = 0;
      results.forEach(function (result) {
        var lastChar = result.formatted_address.slice(-1);
        if (lastChar === '동')  {
            if(length < result.formatted_address.length) {
                dongAdress = result.formatted_address;
                length = result.formatted_address.length;
            }
        }
      });

      return dongAdress;
    }
  }
}
</script>

<style>
#app {
  height:100%;
}
.default {
  background:rgb(75, 128, 218)
}
.good {
  background:rgb(27, 187, 152);
}
.normal {
  background:rgb(246, 168, 16);
}
.bad {
  background:rgb(238, 92, 45);
}
</style>
