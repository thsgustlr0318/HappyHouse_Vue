<template>
  <card class="card" title="공지 작성">
    <div>
      <form>
        <div class="row">
          <div class="col-md-12">
            <fg-input
              type="text"
              label="제목"
              placeholder="공지 제목을 입력하세요."
              v-model="subject"
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
              placeholder="아이디 입력하세요."
              disabled="true"
              v-model="this.userinfo.userid"
            >
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>내용</label>
              <textarea
                rows="5"
                class="form-control border-input"
                placeholder="공지 내용을 입력하세요"
                v-model="content"
              >
              </textarea>
            </div>
          </div>
        </div>
        <!-- <input type="file" multiple ref="fileitem" /> -->
        <b-form-file
          type="file"
          multiple
          ref="fileitem"
          placeholder="파일을 선택하세요"
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <div class="text-center" v-on:click="registerNotification()">
          <br />
          <b-button round type="info">
            입력
          </b-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>

<script>
import http from "@/util/http-common";
import { mapState } from "vuex";
export default {
  data() {
    return {
      userid: "",
      subject: "",
      content: "",
      no: "",
      fileInfos: []
    };
  },
  computed: {
    ...mapState(["userinfo"])
  },
  methods: {
    registerNotification() {
      http
        .post("notice/add", {
          userid: this.userinfo.userid,
          subject: this.subject,
          content: this.content
        })
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.registerNoticeFile();
        });
    },
    async registerNoticeFile() {
      await http.get("notice/getNoticeNo").then(newNo => {
        console.log("dada");
        console.log(newNo);
        console.log(newNo.data.no);
        // alert(newNo.data.no);
        this.checkFileInfo(newNo.data.no);
      });
    },
    async checkFileInfo(no) {
      console.log(no);
      console.log(this.$refs.fileitem.files);
      if (this.$refs.fileitem.files.length == 0) {
        console.log("파일없어요");
        this.moveNoticeList();
      } else {
        const formData = new FormData();
        this.fileInfos = this.$refs.fileitem.files;
        // console.log(this.fileInfos);
        for (var index = 0; index < this.fileInfos.length; index++) {
          formData.append("files", this.fileInfos[index]);
        }
        // console.log(this.fileInfos);
        http
          .post("file/upload/" + no, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(({ data }) => {
            console.log("파일 올리기");
            console.log(data);
            // this.getFileList();
            this.moveNoticeList();
          });
      }
    },
    moveNoticeList() {
      this.$router.push("/notifications");
    }
  }
};
</script>

<style></style>
