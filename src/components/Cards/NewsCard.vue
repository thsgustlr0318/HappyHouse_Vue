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
          <tr v-for="n in news" :key="n.title">
            <slot :row="n">
              <td>
                <a
                  style="color:black"
                  v-html="editTitle(n.title)"
                  v-bind:href="n.url"
                ></a>
              </td>
            </slot>
          </tr>
        </tbody>
      </table>
    </div>
  </card>
</template>
<script>
import Card from "./Card.vue";
import http from "@/util/http-common";
export default {
  name: "news-card",
  components: {
    Card
  },
  props: {
    footerText: {
      type: String,
      default: ""
    },
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
      chartId: "no-id",
      news: []
    };
  },
  methods: {
    editTitle(title) {
      let len = 50;
      if (title.length > len) {
        return title.substr(0, len) + "... ";
      } else {
        return title;
      }
    }
    /***
     * Initializes the chart by merging the chart options sent via props and the default chart options
     */
  },
  mounted() {
    console.log("this is called");
    http
      .get("https://dapi.kakao.com/v2/search/web", {
        params: { query: "부동산 뉴스", size: 7, page: 1, sort: "recency" },
        headers: {
          Authorization: "KakaoAK 9c8a67d86a71431fca74cb619a59ec2c"
        }
      })
      .then(res => {
        this.news = res.data.documents;
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>
<style></style>
