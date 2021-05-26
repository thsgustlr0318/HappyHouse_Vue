<template>
  <div>
    <card class="card-plain">
      <div class="table-full-width table-responsive">
        <div
          class="accordion"
          role="tablist"
          v-for="(item, index) in data"
          :key="index"
        >
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button
                block
                v-b-toggle="'test-' + item.qno"
                variant="outline-secondary"
              >
                <b-row>
                  <b-col md="1" style="color:black">{{ item.qno }}</b-col>
                  <b-col md="2" style="color:black">{{
                    item.chk == 1 ? "답변완료" : "답변미완료"
                  }}</b-col>
                  <b-col md="4" style="color:black">{{ item.subject }}</b-col>
                  <b-col md="2" style="color:black">{{ item.userid }}</b-col>
                  <b-col md="3" style="color:black">{{ item.time }}</b-col>
                </b-row>
              </b-button>
            </b-card-header>
            <b-collapse
              :id="'test-' + item.qno"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-card-text
                  ><qna-view
                    :item="item"
                    @childs-event="updateQnaList"
                  ></qna-view
                ></b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </div>
    </card>
    <div class="col-sm-11 text-right" style="margin-bottom:20px">
      <b-button v-on:click="goRegisterQnaPage()" round>
        <i class="ti-comment-alt"> WRITE</i>
      </b-button>
    </div>
  </div>

  <!-- <div>
    <div class="col-12">
      <card class="card-plain">
        <div class="table-full-width table-responsive">
          <qna-table type="hover" :data="data" :columns="columns"> </qna-table>
        </div>
      </card>
    </div>
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-3"></div>
      <div class="col-md-3"></div>
      <div class="col-md-2" v-on:click="goRegisterQnaPage()">
        <p-button round outline block>
          <i class="ti-comment-alt" style="font-size:150%"> Q&A 작성</i>
        </p-button>
      </div>
    </div>
  </div> -->
</template>

<script>
// import { mapGetters } from "vuex";
// import ListRow from "@/components/qna/include/ListRow.vue";
// import NotificationTemplate from "../Notifications/NotificationTemplate";
import QnaTable from "@/components/Qna/QnaTable.vue";
import QnaView from "@/components/Qna/QnaView.vue";
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
    QnaTable,
    QnaView
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
    this.updateQnaList();
  },
  methods: {
    goRegisterQnaPage() {
      this.$router.push({ name: "qna-register" });
    },
    updateQnaList() {
      http.get("/qna/all", {}).then(({ data }) => {
        console.log("qna 받아오기");
        // console.log(data);
        // console.log(data);
        this.data = data;
      });
    }
  }
};
</script>

<style></style>
