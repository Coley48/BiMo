<template>
  <div class="app" @dragover.prevent="showEntry" @dragend.prevent="hideEntry">
    <!-- 导航栏 -->
    <navigation></navigation>

    <!-- 章节 -->
    <div id="section">
      <transition>
        <router-view></router-view>
      </transition>
    </div>

    <!-- 登录入口 -->
    <div
      :class="{ entry: true, active: isLoginEntryActive }"
      @dragover.prevent
      @drop.prevent="showLoginInterface"
    ></div>

    <!-- 登录界面 -->
    <transition>
      <login :isShow="isLoginInterfaceActive" @callback="loginCallback"></login>
    </transition>

    <!-- 右键菜单 -->
    <contextmenu v-if="isAdminLogin"></contextmenu>
  </div>
</template>


<script>
import navigation from "@/view/navigation/index";
import login from "@/view/login/index";
import { mapMutations, mapState } from "vuex";

export default {
  name: "app",
  data() {
    return {
      isLoginEntryActive: false, // 登录入口是否显示
      isLoginInterfaceActive: false, // 登录界面是否显示
    };
  },
  computed: {
    ...mapState(["isAdminLogin", "currentIndex", "chapters"]),
    chapterCount() {
      return this.chapters.length;
    },
  },
  components: {
    navigation,
    login,
    contextmenu: () => import("@/component/contextmenu.vue"),
  },
  methods: {
    ...mapMutations(["gotoPage"]),
    // 路由跳转
    skipTo(index) {
      if (
        this.currentIndex !== index &&
        index >= 0 &&
        index <= this.chapterCount
      ) {
        this.$store.commit("gotoPage", index);
      }
    },
    // 显示登录界面
    showLoginInterface() {
      this.isLoginInterfaceActive = true;
    },
    // 登录回调
    loginCallback(res) {
      if (res === true) {
        this.$store.commit("adminLogin"); // 更改登录标志
        this.isLoginInterfaceActive = false; // 隐藏登录界面
      }
    },
    showEntry() {
      if (this.isAdminLogin === false) {
        this.isLoginEntryActive = true;
      }
    },
    hideEntry() {
      this.isLoginEntryActive = false;
    },
  },
  mounted() {
    // 判断是否已登录
    if (Boolean(sessionStorage.getItem("isAdminLogin"))) {
      this.$store.commit("adminLogin");
    }

    let Win = $(window);

    if (Win.width() >= 1280) {
      let sectionWrap = $("#section");
      let context = this;
      import("@/assets/js/jquery.mousewheel.min").then(scrollHandler);

      function scrollHandler() {
        sectionWrap.one("mousewheel", function (e) {
          if (context.currentIndex === -1) {
            scrollHandler();
            return;
          }

          if (e.deltaY < 0) {
            // 向上滑
            context.skipTo(context.currentIndex + 1);
          } else {
            // 向下滑
            context.skipTo(context.currentIndex - 1);
          }
          setTimeout(scrollHandler, 2000);
        });
      }
    }
  },
};
</script>

<style lang="less" src="./assets/css/tips.less"></style>
<style lang="less">
.app {
  height: 100%;
  width: 100%;

  #section {
    height: 100%;
    width: 100%;
  }

  .skip-arrow {
    position: fixed;
    left: 50%;
    background: rgba(0, 0, 0, 0.5);
    color: #ebd8d1;
    font-size: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 980;
    opacity: 0;
    pointer-events: none;
    transition: all 1s ease-in-out;

    &.top {
      top: 0;
      transform: translate(-50%, 0) rotate(-90deg);
    }
    &.bottom {
      bottom: 0;
      transform: translate(-50%, 0) rotate(90deg);
    }
    &.show {
      pointer-events: unset;
      opacity: 1;
    }
  }

  .entry {
    display: none;
  }
}

@media only screen and (min-width: 768px) {
  .app {
    .skip-arrow {
      font-size: 10rem;
    }
  }
}

@media only screen and (min-width: 1280px) {
  .app {
    .skip-arrow {
      font-size: 6rem;
    }

    .entry {
      display: block;
      position: fixed;
      left: 100%;
      top: 100%;
      width: 25rem;
      height: 25rem;
      z-index: 2000;
      background: lightcoral;
      border-radius: 50%;
      opacity: 0;
      transition: all 0.8s ease;

      &.active {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    }
  }
}

@media only screen and (min-width: 1440px) {
  .app {
    .skip-arrow {
      font-size: 9rem;
    }
  }
}
</style>