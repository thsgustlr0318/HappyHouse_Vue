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
              :placeholder="user.id"
              v-model="user.id"
            >
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <fg-input
              type="text"
              label="Password"
              :placeholder="user.password"
              v-model="user.password"
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
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>
export default {
  data() {
    return {
      user: {
        id: "user id",
        password: "user password"
      }
    };
  },
  methods: {
    updateProfile() {
      alert("Your data: " + JSON.stringify(this.user));
    }
  }
};
</script>
<style></style>
