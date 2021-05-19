<template>
  <card class="card-map" title="Google Maps">
    <div class="places-buttons">
      <div class="row d-flex justify-content-center">
        <div class="col-md-3">
          <select
            v-model="sido"
            class="col mr-1 custom-select"
            @change="getGugun()"
          >
            <option value="" disabled selected hidden>선택</option>
            <option
              v-for="sidoOption in sidos"
              v-bind:key="sidoOption.sidoCode"
              v-bind:value="sidoOption.sidoCode"
              >{{ sidoOption.sidoName }}</option
            >
          </select>
        </div>
        <div class="col-md-3">
          <select
            v-model="gugun"
            class="col mr-1 custom-select"
            @change="getDong()"
          >
            <option value="" disabled selected hidden>선택</option>
            <option
              v-for="gugunOption in guguns"
              v-bind:key="gugunOption.gugunCode"
              v-bind:value="gugunOption.gugunCode"
              >{{ gugunOption.gugunName }}</option
            >
          </select>
        </div>
        <div class="col-md-3">
          <select
            v-model="dong"
            class="col custom-select"
            @change="sendKeyword()"
          >
            <option value="" disabled selected hidden>선택</option>
            <option
              v-for="dongOption in dongs"
              v-bind:key="dongOption.dong"
              v-bind:value="dongOption.dong"
              >{{ dongOption.dong }}</option
            >
          </select>
        </div>
      </div>
    </div>
    <div class="map">
      <div id="map"></div>
    </div>
  </card>
</template>
<script>
//import { mapGetters } from "vuex";
import { mapGetters, mapActions } from "vuex";
import http from "@/util/http-common";

export default {
  name: "maps",
  data() {
    return {
      sido: "",
      gugun: "",
      dong: "",
      sidos: [],
      guguns: [],
      dongs: [],
      dongCode: ""
    };
  },
  computed: {
    ...mapGetters(["apts"])
  },
  mounted() {
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(this.initMap);
    script.src =
      "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=751304f0381dd2bffd6225a9c8aeb105&libraries=services";
    document.head.appendChild(script);
  },
  created() {
    http.get("/map/sido", {}).then(({ data }) => {
      console.log("sido 받아오기");
      // console.log(data);
      this.sidos = data;
      console.log(this.sidos);
    });
  },
  methods: {
    ...mapActions(["getAptList"]),
    getGugun() {
      console.log("gugun 받아오기");
      console.log(this.sido);
      http
        .get("/map/gugun", { params: { sido: this.sido } })
        .then(({ data }) => {
          this.guguns = data;
          console.log(this.guguns);
        });
    },
    getDong() {
      console.log("dong 받아오기");
      console.log(this.gugun);
      http
        .get("/map/dong", { params: { gugun: this.gugun } })
        .then(({ data }) => {
          this.dongs = data;
          console.log(this.dongs);
        });
    },
    sendKeyword() {
      // this.$emit('send-keyword', this.dongCode);
      this.dongCode = this.gugun;
      console.log("아파트 정보 얻기");
      this.getAptList(this.dongCode);
      //this.$store.dispatch("getAptList", this.dongCode);
      this.dongCode = "";
      let geoList = this.apts;
      var geocoder = new kakao.maps.services.Geocoder();
      for (let key in geoList) {
        console.log(geoList[key].도로명);
      }

      // 주소로 좌표를 검색합니다
      var test =
        this.sido + " " + this.gugun + " " + this.dong + " 황물로15길 25";
      geocoder.addressSearch(test, function(result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        } else {
          console.log("주소를 불러오지 못했습니다.");
        }
      });
    },
    initMap() {
      var mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(37.50146850010687, 127.03965969793167), // 지도의 중심좌표
          level: 7 // 지도의 확대 레벨
        };

      var map = new kakao.maps.Map(mapContainer, mapOption);

      // 마커가 표시될 위치입니다
      var markerPosition = new kakao.maps.LatLng(
        37.50146850010687,
        127.03965969793167
      );

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: markerPosition
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
    }
  }
};
</script>
<style></style>
