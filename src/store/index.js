import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apts: [],
    apt: Object,
    address: Object,
    userinfo: Object,
    addressCode: ""
  },
  getters: {
    apts(state) {
      return state.apts;
    },
    userinfo(state) {
      return state.userinfo;
    }
  },
  mutations: {
    GET_APT_LIST(state, apts) {
      // console.log(state, apts);
      state.apts = apts;
    },
    SELECT_APT(state, payload) {
      state.apt = payload;
    },
    SELECT_ADDR(state, payload) {
      state.addressCode = payload;
    },
    GET_USER_INFO(state, payload) {
      // console.log(state, apts);
      state.userinfo = payload;
    },
  },
  actions: {
    async getAptList({ commit }, dongCode) {
      commit("GET_APT_LIST", []);
      // vue cli enviroment variables 검색
      //.env.local file 생성.
      // 반드시 VUE_APP으로 시작해야 한다.
      //const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
      const SERVICE_KEY =
        "9Xo0vlglWcOBGUDxH8PPbuKnlBwbWU6aO7%2Bk3FV4baF9GXok1yxIEF%2BIwr2%2B%2F%2F4oVLT8bekKU%2Bk9ztkJO0wsBw%3D%3D";

      const SERVICE_URL =
        "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev";

      const params = {
        LAWD_CD: dongCode,
        DEAL_YMD: "202010",
        serviceKey: decodeURIComponent(SERVICE_KEY)
      };

      // npm install --save axios
      await axios
        .get(SERVICE_URL, {
          params
        })
        .then(response => {
          commit("GET_APT_LIST", response.data.response.body.items.item);
        })
        .catch(error => {
          console.dir(error);
        });
    },
    selectApt({ commit }, apt) {
      commit("SELECT_APT", apt);
    },
    selectAddress({ commit }, addressCode) {
      commit("SELECT_ADDR", addressCode);
    },
    login({ commit }, info) {
      localStorage.setItem("userinfo", JSON.stringify(info));
      commit("GET_USER_INFO", info);
    },
    logout({ commit }, userinfo) {
      localStorage.setItem("userinfo", "");
      commit("GET_USER_INFO", null);
    },
    initSession({ commit }) {
      if (localStorage.getItem("userinfo") != '') {
        commit("GET_USER_INFO", JSON.parse(localStorage.getItem("userinfo")));
      }
    }
  },
  mounted() {
    this.initSession();
  },
  modules: {}
  // plugins: [createPersistedState()],
});
