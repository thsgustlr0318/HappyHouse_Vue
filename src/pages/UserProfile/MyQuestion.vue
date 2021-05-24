<template>
  <div>
    <card title="내가 쓴 글">
      <hr />
      <div v-if="qnas.length" slot="raw-content" class="table-responsive">
        <table class="table table-striped">
          <thead>
            <th>제목</th>
            <th>답변 여부</th>
          </thead>
          <tbody>
            <tr v-for="qna in qnas" :key="qna.no" v-on:click="movePage(qna)">
              <slot :row="qna">
                <td>{{ qna.subject }}</td>
                <td>{{ qna.chk == 1 ? "답변완료" : "답변미완료" }}</td>
              </slot>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="!qnas.length" style="margin-bottom:20px">
        작성한 글이 없습니다.
      </div>
    </card>
    <br />
  </div>
</template>

<script>
// import NotificationTemplate from "./Notifications/NotificationTemplate";
import { mapState } from "vuex";
import http from "@/util/http-common";

const tableColumns = ["no", "제목", "글쓴이", "조회수"];

export default {
  data() {
    return {
      qnas: [],
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      },
      table1: {
        title: "Stripped Table",
        subTitle: "Here is a subtitle for this table",
        columns: [...tableColumns]
      },
      table2: {
        title: "Table on Plain Background",
        subTitle: "Here is a subtitle for this table",
        columns: [...tableColumns]
      }
    };
  },
  computed: {
    ...mapState(["userinfo"])
  },
  methods: {
    notifyVue(verticalAlign, horizontalAlign) {
      const color = Math.floor(Math.random() * 4 + 1);
      this.$notify({
        component: NotificationTemplate,
        icon: "ti-gift",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[color]
      });
    },
    goRegisterNotificationPage() {
      this.$router.push({ name: "notification-register" });
    },
    movePage(item) {
      console.log(item);
      this.$router.push({ name: "qna-view", params: { item: item } });
    }
  },
  created() {
    http.get("/qna/question/" + this.userinfo.userid, {}).then(({ data }) => {
      console.log(data);
      // console.log(data);
      // console.log(data);
      this.qnas = data;
    });
  }
};
</script>

<style></style>
