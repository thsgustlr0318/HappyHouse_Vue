<template>
  <div class="card" style="background-color:#66615b">
    <router-link :to="{ name: 'location' }">
      <div class="card-content text-center">
        <h5 style="color:white; margin:10px">우리 동네 둘러보기</h5>
      </div>
    </router-link>
  </div>
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
<style>
.social-box .box {
  background: #fff;
  border-radius: 10px;
  padding: 40px 10px;
  margin: 20px 0px;
  cursor: pointer;
  transition: all 0.5s ease-out;
}

.social-box .box:hover {
  box-shadow: 0 0 6px #4183d7;
}

.social-box .box .box-text {
  margin: 20px 0px;
  font-size: 15px;
  line-height: 30px;
}

.social-box .box .box-btn a {
  text-decoration: none;
  color: #4183d7;
  font-size: 16px;
}

.fa {
  color: #ffffff;
}
</style>
