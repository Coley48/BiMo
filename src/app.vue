<template>
  <div class="app">
    <!-- 导航栏 -->
    <navigation></navigation>

    <!-- 章节 -->
    <div id="section">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>


<script>
import navigation from "@/view/navigation/index";
import { mapMutations, mapState } from "vuex";

export default {
  name: "app",
  data() {
    return {};
  },
  computed: {
    ...mapState(["currentIndex", "chapters"]),
    chapterCount() {
      return this.chapters.length;
    },
  },
  components: {
    navigation,
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
  },
  mounted() {
    let Win = $(window);

    if (Win.width() >= 1280) {
      let context = this;

      // 监听鼠标滚轮
      let sectionWrap = $("#section");
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

      // 监听键盘按键
      document.onkeydown = (event) => {
        let oEvent = event || window.oEvent;

        let KeyCode =
          oEvent.detail || oEvent.keyCode || oEvent.which || oEvent.charCode;

        // let CtrlKeyCode = oEvent.ctrlKey || oEvent.metaKey;

        if (KeyCode == 38) {
          // Up 向上
          oEvent.preventDefault();
          context.skipTo(context.currentIndex - 1);
        } else if (KeyCode == 40) {
          // Down 向下
          oEvent.preventDefault();
          context.skipTo(context.currentIndex + 1);
        }
      };
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