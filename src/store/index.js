import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router"
import { Howl } from "howler";

let state = {
  currentIndex: -1,
  isAdminLogin: false,
  isLogoActive: true,
  chapters: [
    { name: "Introduce" },
    { name: "Journey" },
    { name: "Ceremony" },
    { name: "Dictation" },
    { name: "Sakumap" },
    { name: "Ending" },
  ],
  mutationMap: new Map(),
  // mutationArr: [["coley", "Hello, world."], ["brooks", "发觉送到房间数量恐惧地方撒及法律你"]],
  mutationArr: [],
};
$.ajaxSetup({ async: false })
$.getJSON("/src/data/config.json", (data) => {
  Object.assign(state, data);
  state.sourceData = data;
  console.log(data, state.sourceData)
  state.clickAudio = new Howl({
    src: state.guidance.clickAudioSrc
  })
})

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters: {
  },
  mutations: {
    // 管理员登录
    adminLogin(state) {
      state.isAdminLogin = true;
      sessionStorage.setItem("isAdminLogin", "true");
    },
    // 管理员登出
    adminLogout(state) {
      state.isAdminLogin = false;
      sessionStorage.setItem("isAdminLogin", "");
    },
    // 设置页面索引号
    setIndex(state, index) {
      state.currentIndex = index;
    },
    // 页面跳转
    gotoPage(state, index) {
      router.push(state.chapters[index]);
    },
    // 播放点击音
    playClickAudio(state) {
      state.clickAudio?.play();
    },
    // 隐藏导航栏
    hideNavbar(state) {
      state.isLogoActive = false;
    },
    // 切换导航栏
    toggleNavbar(state, bool) {
      state.isLogoActive = bool !== undefined ? bool : !state.isLogoActive;
    },
    // 动态更新数据
    updateData(state) {
      for (let i = 0; i < state.mutationArr.length; i++) {
        eval(`state.sourceData.${state.mutationArr[i][0]}="${state.mutationArr[i][1]}"`);
      }
      console.log("done");
      state.mutationArr = [];
      state.mutationMap.clear();
      // state[chapter][attr] = value;
    },
    // 添加变更
    addMutation(state, { key, value }) {
      state.mutationMap.set(key, value);
      state.mutationArr = [...state.mutationMap];
    },
    delMutation(state, key) {
      state.mutationMap.delete(key);
      state.mutationArr = [...state.mutationMap];
    }
  },
  actions: {
    updateAndUploadData() {
      // 更新本地数据
      this.commit("updateData");
      // 更新服务器数据
      $.post("/api/update?config", encodeURIComponent(JSON.stringify(this.state.sourceData)), (resp) => {
        console.log(resp)
      })
    },
    getAsyncData() {
      console.log(this.state);
    },
    // 测试
    addMutation(state) {
      this.commit("addMutation", { key: "coley" + Math.random().toFixed(2), value: "Hello, world" })
    }
  },
  modules: {}
})
