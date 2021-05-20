<template>
  <div class="col-12">
    <card class="card-plain">
      <div class="table-full-width table-responsive">
        <qna-table type="hover" :data="data" :columns="columns"> </qna-table>
      </div>
    </card>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
// import ListRow from "@/components/qna/include/ListRow.vue";
// import NotificationTemplate from "../Notifications/NotificationTemplate";
import QnaTable from "@/components/Qna/QnaTable.vue";
import http from "@/util/http-common";

export default {
  name: "qnalist",
  data() {
    return {
      data: [],
      columns: ["번호", "답변여부", "ID", "제목", "조회수", "등록 시간"]
    };
  },
  components: {
    // ListRow
    QnaTable
  },
  computed: {
    // ...mapGetters(["qnas"])
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
    }
  },
  created() {
    http.get("/qna/all", {}).then(({ data }) => {
      console.log("qna 받아오기");
      // console.log(data);
      console.log(data);
      this.data = data;
    });
  },
  methods: {
    // movePage() {
    //   this.$router.push({ name: "qna-create" });
    // }
  }
};
</script>

<style></style>
