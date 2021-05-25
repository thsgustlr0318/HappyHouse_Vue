<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="5000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <div v-for="(file, index) in files" :key="index">
        <b-carousel-slide
          :img-src="require('../../assets/files/noticefiles/' + file.filename)"
          img-width="300"
        >
        </b-carousel-slide>
      </div>
    </b-carousel>
  </div>
</template>

<script>
import http from "@/util/http-common";
export default {
  data() {
    return {
      files: "",
      slide: 0,
      sliding: null
    };
  },
  props: {
    no: {}
  },
  created() {
    this.getFileList();
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    getFileList() {
      http.get("file/getFileList/" + this.no).then(({ data }) => {
        this.files = data;
        console.log(data);
        return data;
        // this.downloadFile(data.fileno);
        // console.log(data);
      });
    }
  }
};
</script>

<style></style>
