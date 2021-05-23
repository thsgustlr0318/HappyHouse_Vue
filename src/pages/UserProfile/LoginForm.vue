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
        </h4>
      </div>
    </div>
    </br>
    <div v-if="info.data" :class="'alert '+info.color">
      <button type="button" aria-hidden="true" class="close">×</button>
      <i class="ti-check">
        <span>
          {{ info.data }} </span
        >
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
        </br>
        <div class="text-center">
          <p-button type="info" round @click.native.prevent="checkLogin">
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
import { mapActions } from "vuex";
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
    ...mapActions(["login"]),
    checkLogin() {
      //alert("Your data: " + JSON.stringify(this.user));
      http.post("/user/login",{
        userid: this.user.userid,
        userpwd: this.user.userpwd
      }).then((res) => {
        //console.log(JSON.stringify(res.data));
        if( res.data ){
          this.info.data = "로그인 성공!";
          this.info.color = "alert-success";
          console.log("sdfsfs3"+res.data);
          let userinfo = {
            userid: this.user.userid,
            auth: res.data
          };
          this.login(userinfo);
        }else{
          this.info.data = "아이디/비밀번호를 다시 확인해주세요.";
          this.info.color = "alert-danger";
        }
      }).catch( e=>{
        this.info.data = "서버 에러";
        this.info.color = "alert-warning";
      })
    }
  }
};
</script>
<style></style>
