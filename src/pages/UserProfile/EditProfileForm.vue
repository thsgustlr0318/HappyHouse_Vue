<template>
  <card class="card" :title="user.userid + ' Page'">
    <div>
      <form @submit.prevent>
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
              v-model="user.password"
            >
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input
              type="password"
              label="Confirm Password"
              placeholder="*********"
              v-model="user.password"
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
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>
import { mapState } from "vuex";
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
        email: "",
        address: "",
        cellphone: ""
      }
    };
  },
  methods: {
    initInfo() {
      http
        .post("/user/info/" + this.userinfo.userid, {
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
      alert("Your data: " + JSON.stringify(this.user));
    }
  }
};
</script>
<style></style>
