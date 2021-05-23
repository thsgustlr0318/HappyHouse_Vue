<template>
  <card class="card" :title="title">
    <div>
      <ul class="list-unstyled team-members">
        <li>
          <div class="row" v-for="menu in menus" :key="menu.name">
            <div class="col-9">
              {{ menu.name }}
              <span :class="getStatusClass(menu.status)"> </span>
            </div>

            <div class="col-3">
              <p-button type="success" outline icon>
                <i class="fa fa-map"></i>
              </p-button>
            </div>
            <br />
          </div>
        </li>
      </ul>
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
