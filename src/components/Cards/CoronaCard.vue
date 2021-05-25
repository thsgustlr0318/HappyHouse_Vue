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
      <chartist
        ratio="ct-major-second"
        type="Line"
        :data="chartData"
        :options="chartOptions"
      >
      </chartist>
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
    },
    chartType: {
      type: String,
      default: "Line" // Line | Pie | Bar
    },
    chartOptions: {
      type: Object,
      default: () => {
        return {};
      }
    },
    chartData: {
      type: Object,
      default: () => {
        return {
          labels: [],
          series: []
        };
      }
    }
  },
  data() {
    return {
      chartId: "no-id"
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
    this.updateChartId();
    import("chartist").then(Chartist => {
      let ChartistLib = Chartist.default || Chartist;
      this.$nextTick(() => {
        this.initChart(ChartistLib);
      });
    });

    http
      .get("https://api.corona-19.kr/korea/country/new/", {
        params: { serviceKey: "XTNfSm3LJEBhprI4ycwbM9Qx2qkW8C6Hz" }
      })
      .then(res => {
        let data = res.data;
        console.log(data);
        console.log(data["seoul"]);
        for (let d in data) {
          console.log("why " + data[d]);
          if (data[d].countryName == "서울") {
            console.log(data[d].totalCase.replaceAll(",", ""));
            console.log(data[d].recovered.replaceAll(",", ""));
            console.log(data[d].death.replaceAll(",", ""));
          }
        }
      })
      .catch(e => {
        console.log();
      });

    var data = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      series: [
        [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
        [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
      ]
    };

    var options = {
      seriesBarDistance: 10
    };

    var responsiveOptions = [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }
      ]
    ];

    new Chartist.Bar("#barChart", data, options, responsiveOptions);
  }
};
</script>
<style></style>
