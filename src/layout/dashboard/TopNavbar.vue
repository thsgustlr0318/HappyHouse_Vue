<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ routeName }}</a>
      <button
        class="navbar-toggler navbar-burger"
        type="button"
        @click="toggleSidebar"
        :aria-expanded="$sidebar.showSidebar"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul v-if="userinfo != null" class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-user"></i>
              <p>{{ userinfo.userid }}</p>
            </a>
          </li>

          <li class="nav-item">
            <router-link :to="{ name: 'settings' }" class="nav-link">
              <i class="ti-settings"></i>
              <p>
                Settings
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'dashboard' }"
              class="nav-link"
              @click.native.prevent="logout"
            >
              <i class="ti-unlock"></i>
              <p>logout</p>
            </router-link>
          </li>
        </ul>
        <ul v-if="userinfo == null" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'login' }" class="nav-link">
              <i class="ti-lock"></i>
              <p>login</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'join' }" class="nav-link">
              <i class="ti-user"></i>
              <p>join</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["userinfo"]),
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false
    };
  },
  mounted() {
    console.log("왜그래");
    console.log(this.userinfo);
  },
  methods: {
    ...mapActions(["logout"]),
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    }
  }
};
</script>
<style></style>
