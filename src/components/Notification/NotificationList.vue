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
                v-b-toggle="'test-' + item.no"
                variant="outline-secondary"
              >
                <b-row>
                  <b-col md="1" style="color:black">{{ item.no }}</b-col>
                  <b-col md="8" style="color:black">{{ item.subject }}</b-col>
                  <b-col md="3" style="color:black">{{ item.time }}</b-col>
                </b-row>
              </b-button>
            </b-card-header>
            <b-collapse
              :id="'test-' + item.no"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-card-text
                  ><notification-view
                    :item="item"
                    @childs-event="updateNoticeList"
                  ></notification-view
                ></b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </div>
    </card>
    <div class="col-sm-11 text-right" style="margin-bottom:20px">
      <b-button v-on:click="goRegisterNotificationPage()" round>
        <i class="ti-comment-alt"> WRITE</i>
      </b-button>
    </div>
  </div>
</template>

<script>
import NotificationView from "@/components/Notification/NotificationView.vue";
import NotificationTable from "@/components/Notification/NotificationTable.vue";
import http from "@/util/http-common";

const tableColumns = ["no", "제목", "글쓴이", "조회수"];

export default {
  components: {
    NotificationTable,
    NotificationView
  },
  data() {
    return {
      data: []
    };
  },
  methods: {
    goRegisterNotificationPage() {
      this.$router.push({ name: "notification-register" });
    },
    updateNoticeList() {
      http.get("/notice/list", {}).then(({ data }) => {
        console.log("공지 받아오기");
        this.data = data;
        console.log(this.data);
      });
    }
  },
  created() {
    this.updateNoticeList();
  }
};
</script>

<style></style>
