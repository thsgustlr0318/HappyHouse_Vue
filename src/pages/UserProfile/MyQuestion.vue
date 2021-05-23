<template>
  <div>
    여긴 수정해야대ㅠㅠ (내가 쓴 질문 목록 올릴것)
    <div class="col-12">
      <card class="card-plain">
        <div class="table-full-width table-responsive">
          <notification-table
            type="hover"
            :title="table2.title"
            :sub-title="table2.subTitle"
            :data="data"
            :columns="table2.columns"
          >
          </notification-table>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
// import NotificationTemplate from "./Notifications/NotificationTemplate";
import NotificationTable from "@/components/Notification/NotificationTable.vue";
import http from "@/util/http-common";

const tableColumns = ["no", "제목", "글쓴이", "조회수"];

export default {
  components: {
    NotificationTable
  },
  data() {
    return {
      data: [],
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
    }
  },
  created() {
    http.get("/notice/list", {}).then(({ data }) => {
      console.log("공지 받아오기");
      // console.log(data);
      // console.log(data);
      this.data = data;
    });
  }
};
</script>

<style></style>
