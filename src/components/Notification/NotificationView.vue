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
  props: {
    item: {},
    modify: true
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
    }
  }
};
</script>

<style></style>
