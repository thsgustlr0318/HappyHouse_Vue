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
  name: "environment-card",
  components: {
    Card
  },
  data() {
    return {
      chartId: "EnvChart",
      footerText: "test",
      title: "환경 정보",
      subTitle: "실시간 대기 환경 현황 ",
      chartData: {
        labels: [
          "미세먼지",
          "초미세먼지",
          "이산화질소",
          "아황산가스",
          "일산화탄소",
          "오존"
        ],
        series: [[], [0, 0, 0, 0, 0, 0]]
      },
      chartOptions: {
        fullWidth: true,
        chartPadding: {
          right: 40
        }
      },
      chartType: "Line"
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
  async mounted() {
    const serviceKey = "45446f4a45646c7437316644535442";
    await http
      .get(
        "http://openAPI.seoul.go.kr:8088/" +
          serviceKey +
          "/json/ListAirQualityByDistrictService/1/25/"
      )
      .then(res => {
        let data = res.data.ListAirQualityByDistrictService.row;
        console.log(data);
        for (let d in data) {
          this.chartData.series[1][0] += parseInt(
            data[d].PM10 == "점검중" ? 0 : data[d].PM10
          );
          this.chartData.series[1][1] += parseInt(
            data[d].PM25 == "점검중" ? 0 : data[d].PM25
          );
          this.chartData.series[1][2] += parseInt(
            data[d].NITROGEN == "점검중" ? 0 : data[d].NITROGEN * 100
          );
          this.chartData.series[1][3] += parseInt(
            data[d].SULFUROUS == "점검중" ? 0 : data[d].SULFUROUS * 100
          );
          this.chartData.series[1][4] += parseInt(
            data[d].CARBON == "점검중" ? 0 : data[d].CARBON * 100
          );
          this.chartData.series[1][5] += parseInt(
            data[d].OZONE == "점검중" ? 0 : data[d].OZONE * 100
          );
          if (data[d].MSRSTENAME == "종로구") {
            this.chartData.series[0].push(data[d].PM10);
            this.chartData.series[0].push(data[d].PM25);
            this.chartData.series[0].push(data[d].NITROGEN * 100);
            this.chartData.series[0].push(data[d].SULFUROUS * 100);
            this.chartData.series[0].push(data[d].CARBON * 100);
            this.chartData.series[0].push(data[d].OZONE * 100);
            this.subTitle += " - " + data[d].GRADE;
          }
        }
        for (let i = 0; i < 6; i++) {
          this.chartData.series[1][i] /= 25;
        }
        this.updateChartId();
        import("chartist").then(Chartist => {
          console.log(this.chartData);
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
