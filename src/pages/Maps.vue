<template>
  <card class="card-map" title="지역별 아파트 검색">
    <div class="places-buttons">
      <div class="row d-flex justify-content-center">
        <div class="col-md-3">
          <select
            v-model="sido"
            class="col mr-1 custom-select"
            @change="getGugun"
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
            @change="getDong"
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
    <hr />
    <div class="map_wrap">
      <div
        id="map"
        style="width:100%;height:100%;position:relative;overflow:hidden;"
      ></div>
    </div>
    <hr />
    <b-form-checkbox
      id="coronaHospitalSelected"
      v-model="coronaHospitalSelected"
      value="true"
      unchecked-value="false"
    >
      코로나 선별 진료소
    </b-form-checkbox>
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
      sidoCode: "",
      gugunCode: "",
      dongCode: "",
      map: "",
      markers: [],
      message: "",
      maplat: "",
      maplng: "",
      ps: "",
      hospitalInfoWindow: "",
      coronaHospitalSelected: "true",
      customOverlays: []
    };
  },
  computed: {
    ...mapGetters(["apts"])
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=751304f0381dd2bffd6225a9c8aeb105&libraries=services";
      document.head.appendChild(script);
    }
  },
  created() {
    http.get("/map/sido", {}).then(({ data }) => {
      // console.log(data);
      this.sidos = data;
    });
  },
  updated() {
    console.log(this.coronaHospitalSelected);
    if (this.coronaHospitalSelected == "false") {
      this.removeMarker();
      var listEl = document.getElementById("placesList");
      // this.removeAllChildNods(listEl);
    }
  },
  methods: {
    ...mapActions(["getAptList", "selectAddress"]),
    getGugun(e) {
      http
        .get("/map/gugun", { params: { sido: this.sido } })
        .then(({ data }) => {
          this.guguns = data;
          this.sidoCode = this.sidos[
            e.target.options.selectedIndex - 1
          ].sidoName;
        });
    },
    getDong(e) {
      http
        .get("/map/dong", { params: { gugun: this.gugun } })
        .then(({ data }) => {
          this.dongs = data;
          this.gugunCode = this.guguns[
            e.target.options.selectedIndex - 1
          ].gugunName;
          this.selectAddress(this.sidoCode + " " + this.gugunCode);
        });
    },
    async sendKeyword() {
      // this.$emit('send-keyword', this.dongCode);
      let map = this.map;
      this.dongCode = this.gugun;
      await this.getAptList(this.dongCode);
      //this.$store.dispatch("getAptList", this.dongCode);
      this.dongCode = "";
      let geoList = this.apts;
      var geocoder = new kakao.maps.services.Geocoder();

      for (let key in geoList) {
        //console.log(this.dongs);
        // 주소로 좌표를 검색합니다
        console.log(this.sidos);
        let address =
          geoList[key].도로명 + " " + geoList[key].도로명건물본번호코드 + "";
        //test = test.replaceAll("\(.*\)|\s-\s.*", "");
        geocoder.addressSearch(address, function(result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
              map: map,
              position: coords
            });
            marker.setZIndex(2);
            marker.setMap(map);

            console.log(geoList[key]);
            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var printOverlay = true;
            var infowindow = new kakao.maps.CustomOverlay({
              position: coords,
              zIndex: 5,
              content:
                // '<span class="info-title">' + geoList[key].아파트 + "</span>"
                `<div class="customoverlay">
                                <span class="aptInfo">
                                  <p class = "aptName">` +
                geoList[key].아파트 +
                `</p>
                                  <p class = "aptCost">` +
                geoList[key].거래금액 +
                `만원</p>
                                </span>
                            </div>`
            });
            infowindow.setMap(map);
            // kakao.maps.event.addListener(marker, "click", function() {
            //   printOverlay = !printOverlay;
            //   console.log(printOverlay);
            //   if (printOverlay) {
            //     infowindow.setMap(map);
            //   } else {
            //     infowindow.setMap(null);
            //   }
            // });

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            // console.log("이동");
            map.panTo(coords);
          } else {
            //console.log("주소를 불러오지 못했습니다. " + test);
          }
        });
      }
    },
    initMap() {
      var mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(37.50146850010687, 127.03965969793167), // 지도의 중심좌표
          level: 7 // 지도의 확대 레벨
        };
      this.hospitalInfoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      this.map = new kakao.maps.Map(mapContainer, mapOption);
      kakao.maps.event.addListener(this.map, "dragend", this.moveEvent);

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
      // marker.setMap(this.map);
    },
    moveEvent() {
      // 지도 중심좌표를 얻어옵니다
      var latlngs = this.map.getCenter();
      this.lat = latlngs.getLat();
      this.lng = latlngs.getLng();

      //움직일 때마다 아파트 정보 얻기
      // var geocoder = new kakao.maps.services.Geocoder();
      // geocoder.coord2RegionCode(126.9786567, 37.566826, (result, status) => {
      //   console.log(result);
      // });
      // 코로나 선별 진료소 정보 얻어오기
      var ps = new kakao.maps.services.Places();
      var options = {
        location: new kakao.maps.LatLng(this.lat, this.lng) // 지도의 중심좌표
      };
      if (this.coronaHospitalSelected == "true") {
        var keyword = "코로나선별진료소";
        ps.keywordSearch(keyword, this.placesSearchCB, options);
      }
    },
    placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다

        this.displayPlaces(data);

        // // 페이지 번호를 표출합니다
        // this.displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        console.log("검색 결과가 존재하지 않습니다.");
        return;
      }
    },
    // 검색 결과 목록과 마커를 표출하는 함수입니다
    displayPlaces(places) {
      var listEl = document.getElementById("placesList"),
        menuEl = document.getElementById("menu_wrap"),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = "";

      // 검색 결과 목록에 추가된 항목들을 제거합니다
      // this.removeAllChildNods(listEl);

      // 지도에 표시되고 있는 마커를 제거합니다
      this.removeMarker();

      for (var i = 0; i < places.length; i++) {
        // console.log(places[i]);
        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = this.addMarker(placePosition, places[i]),
          itemEl = this.getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);
        (function(marker, title) {
          kakao.maps.event.addListener(
            marker,
            "mouseover",
            function() {
              this.displayInfowindow(marker, title);
            }.bind(this)
          );

          kakao.maps.event.addListener(
            marker,
            "mouseout",
            function() {
              this.hospitalInfoWindow.close();
            }.bind(this)
          );
        }.bind(this)(marker, places[i].place_name));

        // fragment.appendChild(itemEl);
      }
    },

    // 검색결과 항목을 Element로 반환하는 함수입니다
    getListItem(index, places) {
      var el = document.createElement("li"),
        itemStr =
          '<div class="info">' + "   <h5>" + places.place_name + "</h5>";

      if (places.road_address_name) {
        itemStr +=
          "    <span>" +
          places.road_address_name +
          "</span>" +
          '   <span class="jibun gray">' +
          places.address_name +
          "</span>";
      } else {
        itemStr += "    <span>" + places.address_name + "</span>";
      }

      itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

      el.innerHTML = itemStr;
      el.className = "item";

      return el;
    },

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    addMarker(position, placeInfo) {
      var imageSrc = require("@/assets/img/hospital-icon7.png"), // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(40, 40), // 마커 이미지의 크기
        imgOptions = {
          // spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          // spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          // offset: new kakao.maps.Point(0, 0) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
          clickable: true
        });
      marker.setZIndex(1);
      marker.setMap(this.map); // 지도 위에 마커를 표출합니다
      this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

      kakao.maps.event.addListener(marker, "click", function() {
        window.open(placeInfo.place_url);
      });
      return marker;
    },

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    displayPagination(pagination) {
      var paginationEl = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;
      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function(i) {
            return function() {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    },

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    displayInfowindow(marker, title) {
      var content =
        '<div style="padding:5px;z-index:1; text-align:center">' +
        title +
        "</div>";
      // console.log(this.hospitalInfoWindow);
      this.hospitalInfoWindow.setContent(content);
      this.hospitalInfoWindow.open(this.map, marker);
    }
  }
};
</script>
<style>
.info-title {
  display: block;
  background: #50627f;
  color: #fff;
  text-align: center;
  height: 24px;
  line-height: 22px;
  border-radius: 4px;
  padding: 0px 10px;
}
.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  font-size: 12px;
}
.map_wrap a,
.map_wrap a:hover,
.map_wrap a:active {
  color: #000;
  text-decoration: none;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 500px;
}
#menu_wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  margin: 10px 0 30px 10px;
  padding: 5px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
  font-size: 12px;
  border-radius: 10px;
}
.bg_white {
  background: #fff;
}
#menu_wrap hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 2px solid #5f5f5f;
  margin: 3px 0;
}
#menu_wrap .option {
  text-align: center;
}
#menu_wrap .option p {
  margin: 10px 0;
}
#menu_wrap .option button {
  margin-left: 5px;
}
#placesList li {
  list-style: none;
}
#placesList .item {
  position: relative;
  border-bottom: 1px solid #888;
  overflow: hidden;
  cursor: pointer;
  min-height: 65px;
}
#placesList .item span {
  display: block;
  margin-top: 4px;
}
#placesList .item h5,
#placesList .item .info {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
#placesList .item .info {
  padding: 10px 0 10px 55px;
}
#placesList .info .gray {
  color: #8a8a8a;
}
#placesList .info .jibun {
  padding-left: 26px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png)
    no-repeat;
}
#placesList .info .tel {
  color: #009900;
}
#placesList .item .markerbg {
  float: left;
  position: absolute;
  width: 36px;
  height: 37px;
  margin: 10px 0 0 10px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png)
    no-repeat;
}
#placesList .item .marker_1 {
  background-position: 0 -10px;
}
#placesList .item .marker_2 {
  background-position: 0 -56px;
}
#placesList .item .marker_3 {
  background-position: 0 -102px;
}
#placesList .item .marker_4 {
  background-position: 0 -148px;
}
#placesList .item .marker_5 {
  background-position: 0 -194px;
}
#placesList .item .marker_6 {
  background-position: 0 -240px;
}
#placesList .item .marker_7 {
  background-position: 0 -286px;
}
#placesList .item .marker_8 {
  background-position: 0 -332px;
}
#placesList .item .marker_9 {
  background-position: 0 -378px;
}
#placesList .item .marker_10 {
  background-position: 0 -423px;
}
#placesList .item .marker_11 {
  background-position: 0 -470px;
}
#placesList .item .marker_12 {
  background-position: 0 -516px;
}
#placesList .item .marker_13 {
  background-position: 0 -562px;
}
#placesList .item .marker_14 {
  background-position: 0 -608px;
}
#placesList .item .marker_15 {
  background-position: 0 -654px;
}
#pagination {
  margin: 10px auto;
  text-align: center;
}
#pagination a {
  display: inline-block;
  margin-right: 10px;
}
#pagination .on {
  font-weight: bold;
  cursor: default;
  color: #777;
}
.customoverlay {
  position: relative;
  bottom: 75px;
  border-radius: 5px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  float: left;
}
.customoverlay:nth-of-type(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.customoverlay .aptInfo {
  display: block;
  color: #000;
  border-radius: 5px;
  overflow: hidden;
  text-align: center;
  background: #fff;
  padding: 5px 8px;
  font-size: 10px;
  font-weight: bold;
  z-index: 4;
}
.customoverlay .aptCost {
  color: rgb(0, 174, 255);
  padding: 5px 8px;
}
.customoverlay:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: -8px;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
</style>
