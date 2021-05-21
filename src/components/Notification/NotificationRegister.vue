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
              v-model="userid"
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
        <div class="text-center">
          <p-button round type="info">
            <div v-on:click="registerNotification()">입력</div>
          </p-button>
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
      userid: "",
      subject: "",
      content: ""
    };
  },
  methods: {
    registerNotification() {
      http
        .post("notice/add", {
          userid: this.userid,
          subject: this.subject,
          content: this.content
        })
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveNoticeList();
        });
    },
    moveNoticeList() {
      this.$router.push("/notifications");
    }
  }
};
</script>

<style></style>
