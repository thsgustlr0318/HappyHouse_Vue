<template>
  <card class="card" title="공지 작성">
    <div>
      <form>
        <div class="row">
          <div class="col-md-12">
            <fg-input
              v-if="!this.modify"
              type="text"
              label="제목"
              placeholder="공지 제목을 입력하세요."
              disabled="true"
              v-model="item.subject"
            >
            </fg-input>
            <fg-input
              v-else
              type="text"
              label="제목"
              placeholder="공지 제목을 입력하세요."
              v-model="item.subject"
            >
            </fg-input>
          </div>
        </div>
        <!-- 유저 아이디 로그인 시 자동 입력 -->
        <div class="row">
          <div class="col-md-12">
            <fg-input
              type="text"
              label="userid"
              placeholder="공지 제목을 입력하세요."
              disabled="true"
              v-model="item.userid"
            >
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>내용</label>
              <textarea
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

              <!--파일-->
              <input
                id="customFile"
                type="file"
                multiple
                @change="checkFileInfo"
              />

              <!-- 파일 출력 -->
              <div v-for="(file, index) in files" :key="index">
                <textarea
                  rows="1"
                  class="form-control border-input"
                  v-model="file.originalfilename"
                >
                </textarea>
                <!-- <img style="width: 120px;" :src="file.filepath" /> -->
                <button v-on:click="deleteFile(file.fileno)">
                  파일 삭제
                </button>
                <img :src="require('../../assets/files/' + file.filename)" />
                <!-- <img
                  :src="
                    'C:\\Users\\thsgu\\Documents\\github\\v3\\HappyHouse_Vue\\src\\assets\\files\\' +
                      file.filename
                  "
                /> -->
                <!-- <img src="C:\Users\thsgu\Documents\github\v3\HappyHouse_Vue\src\assets\files\ " alt=""> -->
                <!-- <img src="@/assets/files/{{file.filename}}" /> -->
                <!-- <img src="" v-bind="downloadFile(file.fileno)" /> -->
                <!-- <img src="../assets/3a7e43f8-cbd6-4145-a666-dcfc55b115ad.jpg" /> -->
                <!-- <button v-on:click="downloadFile(file.fileno)">
                  파일 다운
                </button> -->

                <br /><br />
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <span>
            <router-link to="/notifications"
              ><p-button round type="info">
                <div>목록</div>
              </p-button></router-link
            >
          </span>
          <span v-if="!this.modify" v-on:click="changeMode()">
            <p-button type="info" round>
              수정
            </p-button>
          </span>
          <span v-if="this.modify" v-on:click="deleteNotice()">
            <p-button type="info" round>
              삭제
            </p-button>
          </span>
          <span v-if="this.modify" v-on:click="modifyNotice()">
            <p-button type="info" round>
              입력
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
export default {
  data() {
    return {
      files: [],
      imageInfo: {}
    };
  },
  props: {
    item: {},
    modify: true
  },
  created() {
    console.log(this.$router);
    this.getFileList();
  },
  methods: {
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
          this.$router.push("/notifications");
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
    }
  }
};
</script>

<style></style>
