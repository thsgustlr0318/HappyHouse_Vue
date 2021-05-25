<template>
  <card class="card">
    <div>
      <form>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <!-- <label>내용</label> -->
              <!--파일 입력-->
              <b-form-file
                v-if="this.modify"
                type="file"
                multiple
                @change="checkFileInfo"
                placeholder="파일을 선택하세요"
                drop-placeholder="Drop file here..."
              ></b-form-file>

              <!-- 파일 출력 -->
              <div v-if="files.length != 0">
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
                      :img-src="
                        require('../../assets/files/noticefiles/' +
                          file.filename)
                      "
                    >
                      <b-button
                        v-on:click="deleteFile(file.fileno)"
                        v-if="modify"
                      >
                        파일 삭제
                      </b-button>
                    </b-carousel-slide>
                  </div>
                </b-carousel>
              </div>
              <!-- 공지 내용 -->
              <textarea
                style="background-color:transparent"
                v-if="!this.modify"
                rows="5"
                class="form-control border-input"
                placeholder="공지 내용을 입력하세요"
                disabled="true"
                v-model="item.content"
              >
              </textarea>
              <textarea
                v-else
                rows="5"
                class="form-control border-input"
                placeholder="공지 내용을 입력하세요"
                v-model="item.content"
              >
              </textarea>
            </div>
          </div>
        </div>
        <div class="text-center">
          <span v-if="!this.modify" v-on:click="changeMode()">
            <p-button type="secondary" round>
              MODIFY
            </p-button>
          </span>
          <span v-if="this.modify" v-on:click="modifyNotice()">
            <p-button type="secondary" round>
              COMPLETE
            </p-button>
          </span>
          <span v-if="this.modify" v-on:click="deleteNotice()">
            <p-button type="danger" round style="margin-left: 5px;">
              DELETE
            </p-button>
          </span>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>

<script>
import http from "@/util/http-common";
const tableColumns = ["no", "제목", "글쓴이", "조회수"];
export default {
  data() {
    return {
      files: [],
      imageInfo: {},
      modify: false,
      slide: 0,
      sliding: null
    };
  },
  props: {
    item: {}
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
    changeMode() {
      this.modify = !this.modify;
    },
    modifyNotice() {
      http
        .put("notice/update", {
          no: this.item.no,
          userid: this.item.userid,
          subject: this.item.subject,
          content: this.item.content
        })
        .then(({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          http.put("notice/");
          this.modify = false;
        });
    },
    deleteNotice() {
      if (confirm("정말로 삭제?")) {
        http.delete("notice/delete/" + `${this.item.no}`).then(({ data }) => {
          let msg = "삭제 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "삭제가 완료되었습니다.";
          }
          alert(msg);
          this.$emit("childs-event");
        });
      }
    },
    async checkFileInfo(e) {
      const formData = new FormData();
      this.files = e.target.files;
      for (var index = 0; index < this.files.length; index++) {
        formData.append("files", this.files[index]);
      }
      console.log(this.files);
      http
        .post("file/upload/" + `${this.item.no}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(({ data }) => {
          console.log("파일 올리기");
          console.log(data);
          this.getFileList();
        });
    },
    getFileList() {
      http.get("file/getFileList/" + `${this.item.no}`).then(({ data }) => {
        this.files = data;
        // this.downloadFile(data.fileno);
        // console.log(data);
      });
    },
    deleteFile(fileno) {
      console.log("파일 삭제");
      http.delete("file/deleteFile/" + fileno).then(({ data }) => {
        let msg = "삭제 처리시 문제가 발생했습니다.";
        if (data === "success") {
          msg = "삭제가 완료되었습니다.";
        }
        alert(msg);
        this.getFileList();
      });
    },
    downloadFile(fileno) {
      http.get("file/downloadFile/" + fileno, {}).then(({ data }) => {
        // console.log("@/assets/files/" + data.filename);
        var path = "@/assets/files/" + data.filename;
        console.log(path);
        // this.images = data;\
        // this.imageInfo = data.filename;
        // this.imageInfo = "@/assets/files/".toString() + data.filename;
        return path;
      });
    },
    goRegisterNotificationPage() {
      this.$router.push({ name: "notification-register" });
    }
  }
};
</script>

<style></style>
