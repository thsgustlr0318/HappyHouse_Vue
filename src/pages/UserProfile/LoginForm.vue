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
          Logn and Enjoy!
          <br />
        </h4>
      </div>
    </div>
    <div>
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
              type="text"
              label="Password"
              placeholder="user password"
              v-model="user.userpwd"
            >
            </fg-input>
          </div>
        </div>
        </br>
        <div class="text-center">
          <p-button type="info" round @click.native.prevent="updateProfile">
            Login
          </p-button>
        </div>
        </br>
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
        userpwd: ""
      },
      info: {
        data: "",
        color: ""
      }
    };
  },
  methods: {
    updateProfile() {
      alert("Your data: " + JSON.stringify(this.user));
      http.post("/user/login",{
        userid: this.user.userid,
        userpwd: this.user.userpwd
      }).then((res) => {
        console.log(JSON.stringify(res.data));
      }).catch( e=>{
        this.info.data = "로그인 실패";
      })
    }
  }
};
</script>
<style></style>
