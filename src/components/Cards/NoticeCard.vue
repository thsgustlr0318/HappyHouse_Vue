<template>
  <card>
    <template slot="header">
      <h4 v-if="$slots.title || title" class="card-title">
        <slot name="title">
          {{ title }}
        </slot>
      </h4>
      <p class="card-category">
        <slot name="subTitle">
          {{ subTitle }}
        </slot>
      </p>
    </template>
    <div>
      <table class="table table-striped">
        <tbody>
          <tr v-for="(notice, index) in noticeList" :key="index">
            <slot :row="notice">
              <td v-if="index < 7" @click="$bvModal.show(String(notice.no))">
                <b-row>
                  <b-col md="1" style="color:black">{{ notice.no }}</b-col>
                  <b-col md="8" style="color:black">{{ notice.subject }}</b-col>
                  <b-col md="3" style="color:black">{{ notice.userid }}</b-col>
                </b-row>
              </td>
              <b-modal :id="String(notice.no)" hide-footer size="lg">
                <template #modal-title>
                  <b>제목: </b> {{ notice.subject }}
                </template>
                <div class="d-block text-center">
                  <h4>
                    <!-- {{ notice.content }} -->
                    <b-form-textarea rows="20" v-model="notice.content">
                    </b-form-textarea>

                    <notice-card-image :no="notice.no"></notice-card-image>
                    <!-- <div
                      v-for="(file, index) in getFileList(notice.no)"
                      :key="index"
                    >
                      <h3>file.filename</h3>
                    </div> -->
                  </h4>
                </div>
                <b-button
                  class="mt-3"
                  block
                  @click="$bvModal.hide(String(notice.no))"
                  >공지 닫기</b-button
                >
              </b-modal>
            </slot>
          </tr>
        </tbody>
      </table>
    </div>
  </card>
</template>
<script>
import http from "@/util/http-common";
import Card from "./Card.vue";
import NoticeCardImage from "./NoticeCardImage.vue";
export default {
  components: {
    Card,
    NoticeCardImage
  },
  name: "notice-card",
  props: {
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      noticeList: [],
      files: []
    };
  },
  created() {
    this.updateNoticeList();
    this.getFileList();
    console.log(this.noticeList);
  },
  methods: {
    updateNoticeList() {
      http.get("/notice/list", {}).then(({ data }) => {
        console.log("공지 받아오기dd");
        this.noticeList = data;
        console.log(this.noticeList);
      });
    },
    editTitle(title) {
      let len = 50;
      if (title.length > len) {
        return title.substr(0, len) + "... ";
      } else {
        return title;
      }
    },
    getFileList(no) {
      http.get("file/getFileList/" + no).then(({ data }) => {
        // this.files = data;
        console.log(data);
        return data;
        // this.downloadFile(data.fileno);
        // console.log(data);
      });
    }
  }
};
</script>
<style></style>
