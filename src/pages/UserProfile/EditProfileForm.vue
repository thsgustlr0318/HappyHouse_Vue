<template>
  <card class="card" :title="user.userid + ' Page'">
    <div>
      <form @submit.prevent>
        <div v-if="info.data" :class="'alert ' + info.color">
          <button type="button" aria-hidden="true" class="close">×</button>
          <i class="ti-check">
            <span> {{ info.data }} </span>
          </i>
        </div>
        <div class="row">
          <div class="col-md-12">
            <fg-input
              type="text"
              label="User Name"
              :placeholder="user.username"
              v-model="user.username"
            >
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input
              type="password"
              label="Password"
              placeholder="*********"
              v-model="user.userpwd"
            >
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input
              type="password"
              label="Confirm Password"
              placeholder="*********"
              v-model="user.userconfirmpwd"
            >
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <fg-input
              type="email"
              label="Email"
              :placeholder="user.email"
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
              :placeholder="user.cellphone"
              v-model="user.cellphone"
            >
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <fg-input
              type="text"
              label="Address"
              :placeholder="user.address"
              v-model="user.address"
            >
            </fg-input>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info" round @click.native.prevent="updateProfile">
            Update
          </p-button>

          <p-button
            type="danger"
            style="margin-left: 5px;"
            round
            @click.native.prevent="deleteProfile"
          >
            Delete
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>
import { mapState, mapActions } from "vuex";
import http from "@/util/http-common";
export default {
  computed: {
    ...mapState(["userinfo"])
  },
  mounted() {
    this.initInfo();
  },
  data() {
    return {
      user: {
        userid: "",
        username: "",
        userpwd: "",
        userconfirmpwd: "",
        email: "",
        address: "",
        cellphone: ""
      },
      info: {
        data: "",
        color: ""
      }
    };
  },
  methods: {
    ...mapActions(["logout"]),
    initInfo() {
      http
        .post("/user/" + this.userinfo.userid, {
          auth: this.userinfo.auth
        })
        .then(res => {
          console.log(res.data.user.user.userid);
          this.user.userid = res.data.user.user.userid;
          this.user.username = res.data.user.user.username;
          this.user.userpwd = res.data.user.user.userpwd;
          this.user.email = res.data.user.user.email;
          this.user.address = res.data.user.user.address;
          this.user.cellphone = res.data.user.user.cellphone;
          console.log("update" + this.userid);
        })
        .catch(e => {
          alert("로그인 후 이용해주세요");
          window.location = "/login";
        });
    },
    updateProfile() {
      http
        .put("/user/", {
          userid: this.user.userid,
          username: this.user.username,
          userpwd: this.user.userpwd,
          email: this.user.email,
          address: this.user.address,
          cellphone: this.user.cellphone
        })
        .then(res => {
          if (res.status == 200) {
            this.info.data = "회원정보 수정 성공!";
            this.info.color = "alert-success";
          } else {
            this.info.data = "회원정보 수정 실패!";
            this.info.color = "alert-danger";
          }
        })
        .catch(e => {
          alert("로그인 후 이용해주세요");
          window.location = "/login";
        });
    },
    deleteProfile() {
      http
        .delete("/user/" + this.user.userid, {})
        .then(res => {
          if (res.status == 200) {
            alert("회원정보가 삭제되었습니다.");
            this.logout(user);
            window.location = "/login";
          } else {
            this.info.data = "회원정보 수정 실패!";
            this.info.color = "alert-danger";
          }
        })
        .catch(e => {
          alert("로그인 후 이용해주세요");
          window.location = "/login";
        });
    }
  }
};
</script>
<style></style>
