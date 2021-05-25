<template>
  <card class="card" :title="title" style="padding-bottom:15px">
    <hr />
    <div>
      <router-link :to="{ name: 'location' }" class="nav-link">
        <p-button style="margin-right: 10px" type="danger" outline icon>
          <i class="fa fa-shopping-cart"></i>
        </p-button>
        상가 정보
      </router-link>
    </div>
    <hr />
    <div>
      <p-button style="margin-right: 10px" type="primary" outline icon>
        <i class="fa fa-home"></i>
      </p-button>
      아파트 거래 정보
    </div>
  </card>
</template>
<script>
export default {
  data() {
    return {
      title: "우리 지역 둘러보기",
      menus: [
        {
          name: "아파트 거래 정보 보기"
        },
        {
          name: "상가 정보 보기"
        },
        {
          name: "Flume"
        }
      ]
    };
  },
  methods: {
    getStatusClass(status) {
      switch (status) {
        case "Offline":
          return "text-muted";
        case "Available":
          return "text-success";
        case "Busy":
          return "text-danger";
        default:
          return "text-success";
      }
    }
  }
};
</script>
<style></style>
