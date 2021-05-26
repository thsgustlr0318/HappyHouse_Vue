<template>
  <div>
    <!-- map -->
    <div class="row">
      <div class="col-12">
        <store-card :address="address"></store-card>
      </div>
    </div>

    <!--Charts-->
    <div class="row">
      <div class="col-md-6 col-12">
        <corona-card :sido="sido">
          <span slot="footer"> <i class="ti-timer"></i> Update 1 day ago</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> 확진환자수
            <i class="fa fa-circle text-warning"></i> 완치자수
            <i class="fa fa-circle text-danger"></i> 사망자수
          </div>
        </corona-card>
      </div>

      <div class="col-md-6 col-12">
        <environment-card :gugun="gugun">
          <span slot="footer"> <i class="ti-check"></i> 단위:㎍/㎥ </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> 우리 동네
            <i class="fa fa-circle text-warning"></i> 서울시 평균
          </div>
        </environment-card>
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
import CoronaCard from "@/components/Cards/CoronaCard.vue";
import EnvironmentCard from "@/components/Cards/EnvironmentCard.vue";
import StoreCard from "@/components/Cards/StoreCard.vue";
import http from "@/util/http-common";
export default {
  components: {
    StatsCard,
    ChartCard,
    Maps,
    NewsCard,
    AptCard,
    CoronaCard,
    EnvironmentCard,
    StoreCard
  },
  computed: {
    ...mapState(["userinfo"])
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      sido: "",
      gugun: "",
      address: ""
    };
  },
  mounted() {
    http
      .post("/user/" + this.userinfo.userid, {
        auth: this.userinfo.auth
      })
      .then(res => {
        console.log("chk " + res.data.user.user.userid);
        this.address = res.data.user.user.address.replace(/\([^\]]*\)/g, "");
        this.sido = this.address.split(" ")[0];
        this.gugun = this.address.split(" ")[1];
        console.log("get info" + res.data.user.user.address);
      })
      .catch(e => {
        console.log(e);
        //alert("로그인 후 이용해주세요");
        //window.location = "/login";
      });
  }
};
</script>
<style></style>
