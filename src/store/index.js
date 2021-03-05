import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router"
import { Howl } from 'howler';
import state from '../data/config.json';


// 全局属性
let addition = {
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
};

Object.assign(state, addition);
state.clickAudio = new Howl({
  src: state.guidance.clickAudioSrc
})


Vue.use(Vuex)

export default new Vuex.Store({
  state,
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
