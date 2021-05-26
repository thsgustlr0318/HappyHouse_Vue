<template>
  <card class="card-user">
    <div slot="image">
      <img src="@/assets/img/log_background.jpg" alt="..." />
    </div>
    <div>
      <div class="author">
        <img
          class="avatar border-white"
          src="@/assets/img/faces/person-icon.png"
          alt="..."
        />
        <h4 class="title">
          Join and Enjoy!
        </h4>
      </div>
    </div>
    <br />
    <div v-if="info.data" :class="'alert ' + info.color">
      <button type="button" aria-hidden="true" class="close">×</button>
      <i class="ti-check">
        <span> {{ info.data }} </span>
      </i>
    </div>
    <div>
      <br />
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-12">
            <fg-input
              type="text"
              label="ID"
              placeholder="user id"
              v-model="user.userid"
            >
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <fg-input
              type="password"
              label="Password"
              placeholder="user password"
              v-model="user.userpwd"
            >
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <fg-input
              type="text"
              label="Name"
              placeholder="user name"
              v-model="user.username"
            >
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <fg-input
              type="email"
              label="E-mail"
              placeholder="hello@localhost.com"
              v-model="user.email"
            >
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <fg-input
              type="text"
              label="Cell Phone"
              placeholder="010-1234-5678"
              v-model="user.cellphone"
            >
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <fg-input
              @click.native.prevent="DaumPostcode"
              type="text"
              label="Address"
              placeholder="click!"
              v-model="user.address"
            >
            </fg-input>
          </div>
        </div>
        <br />
        <div class="text-center">
          <p-button type="info" round @click.native.prevent="checkJoin">
            Join
          </p-button>
        </div>
        <br />
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>
import http from "@/util/http-common";
export default {
  data() {
    return {
      user: {
        userid: "",
        userpwd: "",
        username: "",
        email: "",
        cellphone: "",
        address: ""
      },
      info: {
        data: "",
        color: ""
      }
    };
  },
  mounted() {
    const script = document.createElement("script");
    /* global kakao */
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild(script);
  },
  methods: {
    checkJoin() {
      http
        .post("/user/join", {
          userid: this.user.userid,
          userpwd: this.user.userpwd,
          username: this.user.username,
          email: this.user.email,
          cellphone: this.user.cellphone,
          address: this.user.address
        })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.info.data = "회원가입 성공!";
            this.info.color = "alert-success";
            window.location = "/login";
          } else {
            this.info.data = "회원가입 실패!";
            this.info.color = "alert-danger";
          }
        })
        .catch(e => {
          this.info.data = "서버 에러";
          this.info.color = "alert-warning";
        });
    },
    DaumPostcode() {
      new daum.Postcode({
        oncomplete: function(data) {
          var roadAddr = data.roadAddress;
          var extraRoadAddr = "";

          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }

          if (data.buildingName !== "" && data.apartment === "Y") {
            extraRoadAddr +=
              extraRoadAddr !== ""
                ? ", " + data.buildingName
                : data.buildingName;
          }

          if (extraRoadAddr !== "") {
            extraRoadAddr = " (" + extraRoadAddr + ")";
          }

          this.user.address = roadAddr + data.jibunAddress;

          if (roadAddr !== "") {
            this.user.address = roadAddr + extraRoadAddr;
          }
        }.bind(this)
      }).open();
    }
  }
};
</script>
<style></style>
