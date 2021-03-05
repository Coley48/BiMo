import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router"
import { Howl } from 'howler';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentIndex: -1, // 页面索引号
    isLogoActive: true, // 导航栏激活状态

    chapters: [ // 章节导航路由对象
      { name: "Introduce" },
      { name: "Journey" },
      { name: "Ceremony" },
      { name: "Dictation" },
      { name: "Sakumap" },
      { name: "Ending" },
    ],
    clickAudio: new Howl({
      src: "/video/navigation/click.mp3"
    })
  },

  getters: {
  },
  mutations: {
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
  },
  actions: {
    getAsyncData() {
      console.log(this.state);
    },
  },
  modules: {}
})
