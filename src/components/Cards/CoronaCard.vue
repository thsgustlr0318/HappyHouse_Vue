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
      <div :id="chartId" class="ct-chart"></div>
      <div class="footer">
        <div class="chart-legend">
          <slot name="legend"></slot>
        </div>
        <hr />
        <div class="stats">
          <slot name="footer"></slot>
        </div>
        <div class="pull-right"></div>
      </div>
    </div>
  </card>
</template>
<script>
import Card from "./Card.vue";
import http from "@/util/http-common";
export default {
  name: "corona-card",
  components: {
    Card
  },
  props: {
    sido: {
      type: String,
      default: "서울"
    }
  },
  data() {
    return {
      chartId: "Bar",
      footerText: "test",
      title: "코로나 확진 환자 수",
      subTitle: "시 확진 환자를 확인하세요",
      chartOptions: {
        distributeSeries: true
      },
      chartData: {
        labels: [],
        series: []
      },
      chartType: "Bar"
    };
  },
  methods: {
    /***
     * Initializes the chart by merging the chart options sent via props and the default chart options
     */
    initChart(Chartist) {
      const chartIdQuery = `#${this.chartId}`;
      Chartist[this.chartType](chartIdQuery, this.chartData, this.chartOptions);
    },
    /***
     * Assigns a random id to the chart
     */
    updateChartId() {
      const currentTime = new Date().getTime().toString();
      const randomInt = this.getRandomInt(0, currentTime);
      this.chartId = `div_${randomInt}`;
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
  mounted() {
    http
      .get("https://api.corona-19.kr/korea/country/new/", {
        params: { serviceKey: "XTNfSm3LJEBhprI4ycwbM9Qx2qkW8C6Hz" }
      })
      .then(res => {
        let data = res.data;
        for (let d in data) {
          if (data[d].countryName == this.sido) {
            this.chartData.series.push(data[d].totalCase.replaceAll(",", ""));
            this.chartData.series.push(data[d].recovered.replaceAll(",", ""));
            this.chartData.series.push(data[d].death.replaceAll(",", ""));
            this.chartData.labels.push(data[d].totalCase + "명");
            this.chartData.labels.push(data[d].recovered + "명");
            this.chartData.labels.push(data[d].death + "명");
            break;
          }
        }
        this.subTitle = this.sido + this.subTitle;
        this.updateChartId();
        import("chartist").then(Chartist => {
          let ChartistLib = Chartist.default || Chartist;
          this.$nextTick(() => {
            this.initChart(ChartistLib);
          });
        });
      })
      .catch(e => {
        console.log();
      });
  }
};
</script>
<style></style>
