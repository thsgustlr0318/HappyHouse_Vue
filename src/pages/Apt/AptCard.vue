<template>
  <div class="col-md-6 col-xl-3" @click="chooseApt">
    <stats-card>
      <div
        class="icon-big text-center"
        :class="`icon-${type[Math.floor(Math.random() * 4)]}`"
        slot="header"
      >
        <i class="ti-home"></i>
      </div>
      <div class="numbers" slot="content">
        <p>{{ apt.아파트 }}</p>
        {{ apt.거래금액 }} 만원
      </div>

      <div class="stats" slot="footer">
        <router-link :to="{ name: 'apt-info' }">
          > 자세히 보기
        </router-link>
      </div>
    </stats-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { StatsCard } from "@/components/index";
export default {
  name: "AptCard",
  components: {
    StatsCard
  },
  data() {
    return {
      type: ["warning", "success", "danger", "info"]
    };
  },
  props: {
    apt: Object
  },
  methods: {
    // chooseApt() {
    //   // this.$emit('select-apt', this.apt);
    //   this.$store.dispatch('selectApt', this.apt);
    // },
    ...mapActions(["selectApt"]),
    chooseApt() {
      this.selectApt(this.apt);
      console.log("click this " + this.apt);
    }
  }
};
</script>
