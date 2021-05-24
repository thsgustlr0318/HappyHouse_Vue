<template>
  <card class="card" title="Q&A 작성">
    <div>
      <form>
        <div class="row">
          <div class="col-md-12">
            <fg-input
              v-if="!this.modify"
              type="text"
              label="제목"
              placeholder="Q&A 제목을 입력하세요."
              disabled="true"
              v-model="item.subject"
            >
            </fg-input>
            <fg-input
              v-else
              type="text"
              label="제목"
              placeholder="Q&A 제목을 입력하세요."
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
              placeholder="Q&A 제목을 입력하세요."
              disabled="true"
              v-model="item.userid"
            >
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label id="question">Q</label>
              <textarea
                v-if="!this.modify"
                rows="5"
                class="form-control border-input"
                placeholder="Q&A 내용을 입력하세요"
                disabled="true"
                v-model="item.content"
              >
              </textarea>
              <textarea
                v-else
                rows="5"
                class="form-control border-input"
                placeholder="Q&A 내용을 입력하세요"
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
                <img
                  :src="require('../../assets/files/qnafiles/' + file.filename)"
                  width="50%"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 답변 출력 -->
        <div v-if="this.item.chk == 1 || printAnswerList" class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label id="answer">A</label>
              <div v-for="(ans, index) in answerItem" :key="index">
                <textarea
                  v-if="answerModify == ans.ano"
                  rows="5"
                  class="form-control border-input"
                  v-model="ans.content"
                >
                </textarea>
                <textarea
                  v-if="answerModify != ans.ano"
                  rows="5"
                  class="form-control border-input"
                  disabled="true"
                  v-model="ans.content"
                >
                </textarea>

                <button v-on:click="deleteAnswer(ans.ano)">
                  답변 삭제
                </button>
                <button
                  v-if="answerModify != ans.ano"
                  v-on:click="modifyAnswer(ans.ano)"
                >
                  답변 수정
                </button>
                <button
                  v-if="answerModify == ans.ano"
                  v-on:click="modifyQnaAnswer(ans.ano, ans.content)"
                >
                  답변 수정 완료
                </button>
                <br /><br />
              </div>
            </div>
          </div>
        </div>

        <!-- 답변 입력 -->
        <div v-if="this.regist" class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label id="answer">답변 입력하세요</label>
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
          <span>
            <router-link to="/qna"
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
          <span v-if="this.modify" v-on:click="deleteQna()">
            <p-button type="info" round>
              삭제
            </p-button>
          </span>
          <span v-if="this.modify" v-on:click="modifyQna()">
            <p-button type="info" round>
              질문 입력
            </p-button>
          </span>
          <span v-if="!this.regist" v-on:click="addAnswer()">
            <p-button type="info" round>
              답변 입력
            </p-button>
          </span>
          <span v-if="this.regist" v-on:click="addQnaAnswer()">
            <p-button type="info" round>
              답변 입력 완료
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
      files: []
    };
  },
  props: {
    item: {},
    modify: true
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
    console.log("created");
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
          this.$router.push("/qna");
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
