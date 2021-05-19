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
            @change="getGugun()"
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
          <select v-model="dong" class="col custom-select">
            <option value="">선택</option>
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
import { mapGetters } from "vuex";
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
      dongs: []
    };
  },
  mounted() {
    var myLatlng = new window.google.maps.LatLng(37.5665734, 126.978179);
    var mapOptions = {
      zoom: 13,
      center: myLatlng,
      scrollwheel: true, // we disable de scroll over the map, it is a really annoing when you scroll through page
      styles: [
        {
          featureType: "water",
          stylers: [{ saturation: 43 }, { lightness: -11 }, { hue: "#0088ff" }]
        },
        {
          featureType: "road",
          elementType: "geometry.fill",
          stylers: [{ hue: "#ff0000" }, { saturation: -100 }, { lightness: 99 }]
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#808080" }, { lightness: 54 }]
        },
        {
          featureType: "landscape.man_made",
          elementType: "geometry.fill",
          stylers: [{ color: "#ece2d9" }]
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [{ color: "#ccdca1" }]
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#767676" }]
        },
        {
          featureType: "road",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#ffffff" }]
        },
        { featureType: "poi", stylers: [{ visibility: "off" }] },
        {
          featureType: "landscape.natural",
          elementType: "geometry.fill",
          stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
        },
        { featureType: "poi.park", stylers: [{ visibility: "on" }] },
        {
          featureType: "poi.sports_complex",
          stylers: [{ visibility: "on" }]
        },
        { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
        {
          featureType: "poi.business",
          stylers: [{ visibility: "simplified" }]
        }
      ]
    };
    var map = new window.google.maps.Map(
      document.getElementById("map"),
      mapOptions
    );
    var marker = new window.google.maps.Marker({
      position: myLatlng,
      title: "Hello World!"
    });
    // To add the marker to the map, call setMap();
    marker.setMap(map);
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
    addMarker(tmpLat, tmpLng, aptName) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          parseFloat(tmpLat),
          parseFloat(tmpLng)
        ),
        label: aptName,
        title: aptName
      });
      marker.addListener("click", function() {
        map.setZoom(17);
        map.setCenter(marker.getPosition());
        callHouseDealInfo(aptName);
      });
      marker.setMap(map);
    },
    geocode(jsonData) {
      let idx = 0;
      $.each(jsonData, function(index, vo) {
        let tmpLat;
        let tmpLng;
        $.get(
          "https://maps.googleapis.com/maps/api/geocode/json",
          {
            key: "AIzaSyBbAXw9l2nVgs3r-QfbDebWelD8-ySXIqA",
            address: vo.dong + "+" + vo.aptName + "+" + vo.jibun
          },
          function(data, status) {
            tmpLat = data.results[0].geometry.location.lat;
            tmpLng = data.results[0].geometry.location.lng;
            $("#lat_" + index).text(tmpLat);
            $("#lng_" + index).text(tmpLng);
            addMarker(tmpLat, tmpLng, vo.aptName);
          },
          "json"
        ); //get
      }); //each
    }

    // $(document).ready(function(){
    //   $.get("/map/sido"
    //     ,function(data, status){
    //       $.each(data, function(index, vo) {
    //         $("#sido").append("<option value='"+vo.sidoCode+"'>"+vo.sidoName+"</option>");
    //       });//each
    //     }//function
    //     , "json"
    //   );//get
    // });//ready
    // $(document).ready(function(){
    //   $("#sido").change(function() {
    //     $.get("/map/gugun"
    //         ,{sido:$("#sido").val()}
    //         ,function(data, status){
    //           $("#gugun").empty();
    //           $("#gugun").append('<option value="0">선택</option>');
    //           $.each(data, function(index, vo) {
    //             $("#gugun").append("<option value='"+vo.gugunCode+"'>"+vo.gugunName+"</option>");
    //           });//each
    //         }//function
    //         , "json"
    //     );//get
    //   });//change
    //   $("#gugun").change(function() {
    //     $.get("/map/dong"
    //         ,{gugun:$("#gugun").val()}
    //         ,function(data, status){
    //           $("#dong").empty();
    //           $("#dong").append('<option value="0">선택</option>');
    //           $.each(data, function(index, vo) {
    //             $("#dong").append("<option value='"+vo.dong+"'>"+vo.dong+"</option>");
    //           });//each
    //         }//function
    //         , "json"
    //     );//get
    //   });//change
    //   $("#dong").change(function() {
    //     $.get("/map/apt"
    //         ,{dong:$("#dong").val()}
    //         ,function(data, status){
    //           $("#searchResult").empty();
    //           $("#showHouse").empty();
    //           $.each(data, function(index, vo) {
    // 	let str =  '<div class="col-md-12 col-xl-4">'
    // 	+ '<div class="card card-social">'
    // 	+ '<div class="card-block border-bottom">'
    // 	+ '<div class="row align-items-center justify-content-center">'
    // 	+ '<div class="col text-left">'
    // 	+ '<h5>'+vo.aptName+'</h5></div>'
    // 	+ '<div class="col text-right">'
    // 	+ '<h5>'+vo.dong+'</h5>'
    // 	+ '<h5 class="text-c-green mb-0">'
    // 	+ '<span class="text-muted">'+vo.jibun+'</span>'
    // 	+ ' 번지</h5></div></div></div>'
    //             + '<div class="card-block">'
    // 	+ '<div class="row align-items-center justify-content-center card-active">'
    // 	+ '<div class="col-6">'
    // 	+ '<h6 class="text-center m-b-10">'
    // 	+ ' <span class="text-muted m-r-5">면적:</span>'+vo.area+' m2</h6>'
    // 	+ '<div class="progress"><div class="progress-bar progress-c-theme" role="progressbar" style="width: 60%; height: 6px;" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>'
    // 	+ '</div>'
    // 	+ '</div><div class="col-6"><h6 class="text-center  m-b-10">'
    // 	+ '<span class="text-muted m-r-5">금액:</span>'+vo.dealAmount + ' 만원'
    // 	+ '</h6><div class="progress">'
    // 	+ '<div class="progress-bar progress-c-theme2" role="progressbar" style="width: 45%; height: 6px;" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>'
    // 	+ '</div></div></div></div></div></div>'

    //             $("#showHouse").append(str);
    // 	$("#searchResult").append(vo.dong+" "+vo.aptName+" "+vo.jibun+"<br>");
    //           });//each
    //           geocode(data);
    //         }//function
    //         , "json"
    //     );//get
    //   });//change

    // });//ready
  }
};
</script>
<style></style>
