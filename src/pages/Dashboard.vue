<template>
  <div>
    <!-- map -->
    <div class="row">
      <div class="col-12">
        <maps name=""></maps>
      </div>
    </div>

    <div class="row">
      <apt-card v-for="(apt, index) in apts" :key="index" :apt="apt" />
    </div>
    <!-- Apart -->

    <div class="row">
      <div class="col-md-6 col-12">
        <news-card
          title="실시간 뉴스 정보"
          sub-title="실시간 뉴스 정보를 확인해보세요!"
        >
        </news-card>
      </div>

      <!--공지사항-->
      <div class="col-md-6 col-12">
        <notice-card title="공지사항" sub-title="공지사항을 확인해주세요!">
        </notice-card>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { StatsCard, ChartCard } from "@/components/index";
import Chartist from "chartist";
import Maps from "@/pages/Maps.vue";
import AptCard from "@/pages/Apt/AptCard.vue";
import NewsCard from "@/components/Cards/NewsCard.vue";
import NoticeCard from "@/components/Cards/NoticeCard.vue";
export default {
  components: {
    StatsCard,
    ChartCard,
    Maps,
    NewsCard,
    AptCard,
    NoticeCard
  },
  computed: {
    ...mapState(["apts"])
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      type: ["warning", "success", "danger", "info"],
      statsCards: [
        {
          type: "warning",
          icon: "ti-home",
          title: "Capacity",
          value: "105GB",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "success",
          icon: "ti-home",
          title: "Revenue",
          value: "$1,345",
          footerText: "Last day",
          footerIcon: "ti-calendar"
        },
        {
          type: "danger",
          icon: "ti-home",
          title: "Errors",
          value: "23",
          footerText: "In the last hour",
          footerIcon: "ti-timer"
        },
        {
          type: "info",
          icon: "ti-home",
          title: "Followers",
          value: "+45",
          footerText: "Updated now",
          footerIcon: "ti-reload"
        }
      ],
      usersChart: {
        data: {
          labels: [
            "9:00AM",
            "12:00AM",
            "3:00PM",
            "6:00PM",
            "9:00PM",
            "12:00PM",
            "3:00AM",
            "6:00AM"
          ],
          series: [
            [287, 385, 490, 562, 594, 626, 698, 895, 952],
            [67, 152, 193, 240, 387, 435, 535, 642, 744],
            [23, 113, 67, 108, 190, 239, 307, 410, 410]
          ]
        },
        options: {
          low: 0,
          high: 1000,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false
        }
      },
      activityChart: {
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        }
      },
      preferencesChart: {
        data: {
          labels: ["62%", "32%", "6%"],
          series: [62, 32, 6]
        },
        options: {}
      }
    };
  }
};
</script>
<style></style>
