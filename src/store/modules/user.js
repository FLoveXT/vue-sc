import Vue from "vue";

const state = {
  token: "",
  username: ""
};

const mutations = {
  setToken(state, token) {
    state.token = token;
    localStorage.setItem("token", token);
  },
  getUserName(state, name) {
    state.username = name;
    localStorage.setItem("username", name);
  },
  logout(state) {
    state.token = "";
    state.username = "";
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }
};

export default {
  state,
  mutations
};
