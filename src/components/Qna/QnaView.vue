<template>
  <card class="card">
    <div>
      <form>
        <div class="row">
          <div class="col-md-12">
            <!-- 제목 수정 -->
            <fg-input
              v-if="this.modify"
              type="text"
              label="제목"
              placeholder="Q&A 제목을 입력하세요."
              v-model="item.subject"
            >
            </fg-input>
          </div>
        </div>
        <!-- 유저 아이디 -->

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <div class="col-md-3">
                <p-button round simple block style="text-align:left">
                  ? {{ item.userid }} 님의 질문</p-button
                >
              </div>
              <textarea
                style="background-color:transparent"
                v-if="!this.modify"
                class="form-control border-input"
                placeholder="Q&A 내용을 입력하세요"
                disabled="true"
                v-model="item.content"
              >
              </textarea>
              <textarea
                style="background-color:transparent"
                v-else
                class="form-control border-input"
                placeholder="Q&A 내용을 입력하세요"
                v-model="item.content"
              >
              </textarea>

              <!--Q 파일 수정 -->
              <b-form-file
                v-if="this.modify"
                type="file"
                multiple
                @change="checkFileInfo"
                placeholder="파일을 선택하세요"
                drop-placeholder="Drop file here..."
              ></b-form-file>
              <!-- 
              <input
                id="customFile"
                type="file"
                multiple
                @change="checkFileInfo"
              /> -->

              <!-- Q 파일 출력 -->
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
                        require('../../assets/files/qnafiles/' + file.filename)
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

              <!-- 파일 출력 -->
              <!-- <div v-for="(file, index) in files" :key="index">
                <textarea
                  rows="1"
                  class="form-control border-input"
                  v-model="file.originalfilename"
                >
                </textarea>
                <button v-on:click="deleteFile(file.fileno)">
                  파일 삭제
                </button>
                <img
                  :src="require('../../assets/files/qnafiles/' + file.filename)"
                  width="50%"
                />
              </div> -->
            </div>
          </div>
        </div>

        <!-- A 답변 출력 -->
        <div v-if="this.item.chk == 1 || printAnswerList" class="row">
          <div class="col-md-12">
            <div class="form-group">
              <div class="col-md-3">
                <p-button
                  round
                  simple
                  block
                  style="text-align:left; color:#EB5E28"
                >
                  > 답변</p-button
                >
              </div>
              <div v-for="(ans, index) in answerItem" :key="index">
                <textarea
                  style="background-color:transparent"
                  v-if="answerModify == ans.ano"
                  rows="5"
                  class="form-control border-input"
                  v-model="ans.content"
                >
                </textarea>
                <textarea
                  style="background-color:transparent"
                  v-if="answerModify != ans.ano"
                  rows="5"
                  class="form-control border-input"
                  disabled="true"
                  v-model="ans.content"
                >
                </textarea>

                <div class="text-right">
                  <span v-on:click="deleteAnswer(ans.ano)">
                    <p-button
                      type="secondary"
                      round
                      v-if="answerModify == ans.ano"
                    >
                      DELETE
                    </p-button>
                  </span>
                  <span v-on:click="modifyAnswer(ans.ano)">
                    <p-button
                      type="danger"
                      round
                      v-if="answerModify != ans.ano"
                      style="margin:10px"
                    >
                      ANSWER MODIFY
                    </p-button>
                  </span>
                  <span v-on:click="modifyQnaAnswer(ans.ano, ans.content)">
                    <p-button
                      type="danger"
                      round
                      v-if="answerModify == ans.ano"
                      style="margin:10px"
                    >
                      COMPLETE
                    </p-button>
                  </span>
                </div>
                <br /><br />
              </div>
            </div>
          </div>
        </div>

        <!-- 답변 입력 -->
        <div v-if="this.regist" class="row">
          <div class="col-md-12">
            <div class="form-group">
              <div class="col-md-3">
                <p-button
                  round
                  simple
                  block
                  style="text-align:left; color:#EB5E28"
                >
                  > 답변을 입력하세요</p-button
                >
              </div>
              <textarea
                rows="5"
                class="form-control border-input"
                placeholder="Q&A 내용을 입력하세요"
                v-model="answerContent"
              >
              </textarea>
            </div>
          </div>
        </div>

        <!-- 버튼 -->
        <div class="text-center">
          <span v-if="!this.modify && !this.regist" v-on:click="changeMode()">
            <p-button type="secondary" round>
              QUESTION MODIFY
            </p-button>
          </span>

          <span v-if="this.modify" v-on:click="modifyQna()">
            <p-button type="secondary" round style="margin-left: 10px;">
              COMPLETE
            </p-button>
          </span>
          <span v-if="this.modify" v-on:click="deleteQna()">
            <p-button type="danger" round style="margin-left: 10px;">
              DELETE
            </p-button>
          </span>
          <span v-if="!this.regist && !this.modify" v-on:click="addAnswer()">
            <p-button type="danger" round style="margin-left: 10px;">
              WRITE ANSWER
            </p-button>
          </span>
          <span v-if="this.regist" v-on:click="addQnaAnswer()">
            <p-button type="danger" round>
              COMPLETE
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
      answerItem: {},
      answerContent: " ",
      regist: false,
      answerModify: -1,
      printAnswerList: false,
      files: [],
      modify: false
    };
  },
  props: {
    item: {}
    // modify: true
  },
  created() {
    console.log("created");
    this.getFileList();
    if (this.item.chk == 1) {
      http.get("qna/answer/" + `${this.item.qno}`).then(({ data }) => {
        console.log(data);
        this.answerItem = data;
        // console.log("답변:" + data);
        // alert(msg);
      });
    }
    this.getFileList();
  },
  methods: {
    updateAnswerList() {
      http.get("qna/answer/" + `${this.item.qno}`).then(({ data }) => {
        console.log(data);
        this.answerItem = data;
      });
    },
    changeMode() {
      this.modify = !this.modify;
    },
    modifyQna() {
      http
        .put("qna/update/" + `${this.item.qno}`, {
          qno: this.item.qno,
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
          this.modify = false;
          updateAnswerList();
        });
    },
    deleteQna() {
      if (confirm("정말로 삭제?")) {
        http.delete("qna/delete/" + `${this.item.qno}`).then(({ data }) => {
          let msg = "삭제 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "삭제가 완료되었습니다.";
          }
          alert(msg);
          // this.$router.push("/qna");
          this.$emit("childs-event");
        });
      }
    },
    addAnswer() {
      this.regist = !this.regist;
    },
    addQnaAnswer() {
      http
        .post("qna/answer/add", {
          qno: this.item.qno,
          content: this.answerContent
        })
        .then(({ data }) => {
          console.log(data);
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          // this.moveList();
          this.regist = false;
          this.answerContent = "";
          this.printAnswerList = true;
          this.updateAnswerList();
          // this.$router.push({ name: "qna-view", params: { item: this.item } });
        });
    },
    deleteAnswer(ano) {
      if (confirm("답변을 삭제하시겠습니까?")) {
        http.delete("qna/answer/delete/" + ano).then(({ data }) => {
          let msg = "삭제 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "삭제가 완료되었습니다.";
          }
          this.updateAnswerList();
        });
      }
    },
    modifyAnswer(ano) {
      this.answerModify = ano;
    },
    modifyQnaAnswer(ano, content) {
      if (confirm("답변을 수정하시겠습니까?")) {
        http
          .put("qna/answer/update/" + ano, {
            qno: this.item.qno,
            ano: ano,
            content: content
          })
          .then(({ data }) => {
            let msg = "수정 처리시 문제가 발생했습니다.";
            if (data === "success") {
              msg = "수정이 완료되었습니다.";
            }
            this.answerModify = -1;
            this.updateAnswerList();
          });
      }
    },
    async checkFileInfo(e) {
      const formData = new FormData();
      this.files = e.target.files;
      console.log(this.files);
      for (var index = 0; index < this.files.length; index++) {
        formData.append("files", this.files[index]);
      }
      console.log(this.files);
      http
        .post("qnafile/upload/" + `${this.item.qno}`, formData, {
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
      http.get("qnafile/getFileList/" + `${this.item.qno}`).then(({ data }) => {
        console.log("44");
        this.files = data;
        // this.downloadFile(data.fileno);
        console.log(data);
      });
    },
    async deleteFile(fileno) {
      console.log("파일 삭제");
      await http.delete("qnafile/deleteFile/" + fileno).then(({ data }) => {
        let msg = "삭제 처리시 문제가 발생했습니다.";
        if (data === "success") {
          msg = "삭제가 완료되었습니다.";
        }
        alert(msg);
        this.getFileList();
      });
    },
    downloadFile(fileno) {
      http.get("qnafile/downloadFile/" + fileno, {}).then(({ data }) => {
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

<style>
#answer {
  color: rgb(255, 45, 00);
  font-size: 150%;
}
#question {
  color: rgb(105, 105, 105);
  font-size: 150%;
}
</style>
