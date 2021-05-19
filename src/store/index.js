import Vue from "vue";
import Vuex from "vuex";
import http from "@/util/http-common";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    qnas: [],
    qna: {},
    anss: [],
    ans: {}
  },
  getters: {
    qnas(state) {
      return state.qnas;
    },
    qna(state) {
      return state.qna;
    },
    anss(state) {
      return state.anss;
    },
    ans(state) {
      return state.ans;
    }
  },
  mutations: {
    setQnas(state, payload) {
      state.qnas = payload;
    },
    setQna(state, payload) {
      state.qna = payload;
    },
    setAnss(state, payload) {
      state.anss = payload;
    },
    setAns(state, payload) {
      state.ans = payload;
    }
  },
  actions: {
    getQnas(context) {
      http
        .get("qna/all")
        .then(({ data }) => {
          context.commit("setQnas", data);
          console.log("qnas가져오기");
          console.log(data);
        })
        .catch(() => {
          alert("에러발생!");
        });
    },
    getQna(context, payload) {
      http.get("qna/" + payload).then(({ data }) => {
        console.log("getQna");
        context.commit("setQna", data);
      });
    },
    getAnss(context) {
      http
        .get("")
        .then(({ data }) => {
          context.commit("setAnss", data);
        })
        .catch(() => {
          alert("에러발생!");
        });
    },
    getAns(context, payload) {
      http.get("qna/answer" + payload).then(({ data }) => {
        context.commit("setAns", data);
        console.log(data);
      });
    }
  }
});
