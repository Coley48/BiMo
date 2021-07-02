<template>
  <div class="navigation" :class="{ active: isLogoActive }">
    <!-- logo -->
    <div
      class="logo-tips right-bottom"
      data-toggle="tips"
      data-content="点击打开/收起导航栏"
      :class="logoTipsState"
      @click.once="closeLogoTips"
    >
      <div class="logo" @click="toggleNavbar">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 200 197"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,197.000000) scale(0.100000,-0.100000)"
            fill="currentColor"
            stroke="none"
          >
            <path
              d="M303 1910 c-110 -22 -190 -101 -228 -226 -22 -74 -22 -1321 0 -1398 33 -114 107 -189 217 -221 49 -14 133 -15 729 -13 l674 3 56 26 c66 31 120 84 151 148 l23 46 3 680 c2 474 0 696 -8 732 -14 66 -61 136 -115 173 -86 59 -95 60 -810 59 -357 -1 -669 -5 -692 -9z m1442 -54 c61 -29 97 -65 127 -131 l23 -50 0 -691 0 -690 -30 -59 c-34 -66 -93 -118 -153 -135 -24 -6 -281 -10 -722 -10 l-685 0 -51 24 c-63 29 -120 95 -139 160 -22 74 -22 1348 0 1422 19 65 76 131 139 160 l51 24 695 0 695 0 50 -24z"
            />
            <path
              d="M562 1563 c-8 -3 -11 -15 -7 -37 4 -17 -1 -82 -9 -144 -9 -62 -16 -137 -16 -166 0 -65 -4 -69 -140 -136 -58 -28 -105 -56 -105 -63 0 -7 16 -17 35 -24 62 -21 92 -16 149 27 30 22 55 39 57 37 2 -1 4 -52 4 -112 3 -186 57 -483 96 -526 19 -21 82 -26 115 -9 26 14 24 20 -16 71 -19 24 -41 67 -49 94 -22 75 -37 199 -25 203 6 3 6 8 0 16 -16 19 -26 287 -13 312 6 11 28 26 49 33 21 7 43 14 50 17 7 3 14 -11 18 -38 11 -64 44 -135 77 -163 37 -32 97 -49 140 -41 38 7 147 57 168 77 8 8 36 30 61 51 25 20 56 48 70 62 32 35 148 129 177 145 47 25 87 -20 80 -90 -4 -48 -48 -67 -169 -75 -88 -6 -119 -15 -119 -35 0 -4 20 -27 45 -50 44 -41 69 -91 79 -159 5 -32 2 -38 -39 -68 -25 -18 -45 -37 -45 -43 0 -6 16 3 35 20 20 17 41 31 47 31 6 0 -2 -10 -18 -22 -16 -12 -42 -33 -59 -47 -16 -14 -25 -19 -20 -10 16 25 -31 -31 -75 -91 -41 -56 -49 -87 -28 -108 19 -19 23 -16 63 45 47 71 134 165 146 157 5 -3 9 -27 9 -54 0 -41 4 -52 27 -70 27 -21 50 -22 45 0 -2 7 -7 45 -12 84 -8 61 -7 73 7 84 52 39 111 -10 143 -119 22 -72 43 -104 62 -93 13 8 2 66 -28 146 -28 73 -69 118 -110 118 -29 0 -31 11 -4 35 23 21 28 99 8 112 -7 4 -37 12 -67 18 -68 14 -77 32 -21 41 51 8 119 72 138 129 22 65 26 95 12 95 -7 0 -10 7 -7 15 10 24 -49 65 -92 65 -59 0 -163 -58 -286 -159 -171 -141 -268 -182 -316 -135 -21 21 -36 96 -31 151 3 29 8 33 55 49 89 29 89 29 68 67 -16 29 -23 32 -59 30 -40 -2 -41 -1 -32 23 15 39 12 68 -10 92 -43 46 -68 24 -88 -79 l-17 -84 -58 -29 c-32 -16 -60 -26 -64 -22 -9 9 27 125 54 172 13 22 23 48 23 58 0 54 -110 137 -158 119z m915 -650 c4 -11 -34 -53 -47 -53 -3 0 -7 16 -8 36 -3 33 -1 35 24 32 15 -2 29 -8 31 -15z"
            />
          </g>
        </svg>
      </div>
    </div>

    <nav class="nav-wrap">
      <div class="nav">
        <a
          class="nav-item"
          v-for="(item, idx) in icons"
          :key="idx"
          :data-content="item.content"
          :class="[item.name, { active: index === idx }]"
          @click="showPart(idx)"
        ></a>
      </div>
    </nav>

    <!-- components -->
    <transition name="slideInAndOut">
      <keep-alive>
        <component :is="currentPart" @close="index = -1"></component>
      </keep-alive>
    </transition>

    <!-- mask & close-btn -->
    <transition-group>
      <div
        class="mask"
        key="mask"
        v-show="index !== -1"
        @click="index = -1"
      ></div>
      <div
        class="close-btn"
        key="closeBtn"
        v-show="index !== -1 && index !== 0"
        @click="index = -1"
      ></div>
    </transition-group>
  </div>
</template>

<script>
import MenuPart from "./menu-part";
import { mapState } from "vuex";

export default {
  data() {
    return {
      index: -1,
      clickAudio: null,
      logoTipsState: localStorage.getItem("logoTipsState") || "show",
      icons: [
        {
          content: "章节目录",
          name: "menu",
        },
        {
          content: "家庭相册",
          name: "album",
        },
        {
          content: "你的位置",
          name: "earth",
        },
        {
          content: "分享推广",
          name: "share",
        },
        {
          content: "用户登录",
          name: "user",
        },
        {
          content: "关于我们",
          name: "about",
        },
      ],
    };
  },
  methods: {
    toggleNavbar() {
      this.$store.commit("playClickAudio");
      // this.isLogoActive = !this.isLogoActive;
      this.$store.commit("toggleNavbar");
      if (this.index === 0) {
        this.index = -1;
      }
    },
    showPart(i) {
      this.$store.commit("playClickAudio");
      if (this.index === i) {
        this.index = -1;
        return;
      }
      this.index = i;
    },
    closeLogoTips() {
      this.logoTipsState = "hide";
      localStorage.setItem("logoTipsState", "hide");
    },
  },
  computed: {
    currentPart() {
      return this.icons[this.index]
        ? this.icons[this.index].name + "-part"
        : "";
    },
    ...mapState({
      isLogoActive: "isLogoActive",
    }),
  },
  components: {
    MenuPart,
    AlbumPart: () => import("@/view/navigation/album-part.vue"),
    EarthPart: () => import("@/view/navigation/earth-part.vue"),
    SharePart: () => import("@/view/navigation/share-part.vue"),
    AboutPart: () => import("@/view/navigation/about-part.vue"),
    UserPart: () => import("@/view/navigation/user-part.vue"),
  },
  mounted() {
    // this.$store.dispatch("getAsyncData");
  },
};
</script>

<style lang="less" scoped>
@nav-width: 3.125rem;

.navigation {
  .logo {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    text-align: center;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 1s ease-in-out;

    svg {
      width: 2.125rem;
      height: 2.125rem;
      color: white;
      transition: all 1s ease-in-out;
    }
  }

  .nav-wrap {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: @nav-width;
    background: #6c757d8a url("../../assets/img/navigation/background.jpg")
      center no-repeat;
    background-size: cover;
    z-index: 990;
    transition: all 0.8s ease-in-out;
    transform: translateY(-100%);
    opacity: 0;

    .nav {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .nav-item {
      display: block;
      width: 100%;
      height: @nav-width;
      line-height: @nav-width;
      text-align: center;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;

      &:last-child {
        position: absolute;
        bottom: 0;
      }

      &.active {
        background-color: #343a40 !important;
      }

      &.menu {
        background-image: url("../../assets/img/icon/menu.svg");
      }
      &.earth {
        background-image: url("../../assets/img/icon/earth.svg");
      }
      &.album {
        background-image: url("../../assets/img/icon/album.svg");
      }
      &.share {
        background-image: url("../../assets/img/icon/share.svg");
      }
      &.about {
        background-image: url("../../assets/img/icon/about.svg");
      }
      &.user {
        background-image: url("../../assets/img/icon/user.svg");
      }
    }
  }

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 90;
  }

  .close-btn {
    position: absolute;
    top: 0;
    right: 0;
    height: @nav-width;
    width: @nav-width;
    z-index: 110;
    border-radius: 50%;
    cursor: pointer;
    background: url("../../assets/img/icon/backspace.svg") no-repeat center;
  }

  &.active {
    .logo svg {
      color: black;
    }

    .nav-wrap {
      transform: translateY(0);
      opacity: 1;
    }
  }
}

.slideInAndOut-enter-active {
  animation: slide-in 0.8s ease;
}
.slideInAndOut-leave-active {
  animation: slide-out 0.5s ease;
}

@keyframes slide-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes slide-out {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@media only screen and (min-width: 768px) {
  @nav-width: 3.75rem;

  .navigation {
    .logo {
      padding: 0.6rem;

      svg {
        width: 2.55rem;
        height: 2.55rem;
        color: white;
        transition: all 1s ease-in-out;
      }
    }

    .nav-wrap {
      width: @nav-width;

      .nav-item {
        height: @nav-width;
        line-height: @nav-width;
      }
    }
  }
}

@media only screen and (min-width: 1280px) {
  .navigation {
    .logo-tips {
      &::before,
      &::after {
        top: 2.5rem;
        left: 2.75rem;
      }
    }

    .nav-wrap {
      .nav-item {
        position: relative;

        &:hover {
          background-color: #545b62aa !important;

          &::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 100%;
            width: 0;
            height: 0;
            border: 0.4rem solid transparent;
            border-right-color: white;
            border-width: 0.6rem 0.4rem;
            transform: translate(0, -50%);
            pointer-events: none;
            animation: popper-fadeIn 0.5s ease-in-out;
          }

          &::after {
            content: attr(data-content);
            position: absolute;
            top: 50%;
            left: 100%;
            background-color: white;
            white-space: nowrap;
            color: black;
            border-radius: 0.25rem;
            transform: translate(0.78rem, -50%);
            line-height: 1;
            padding: 0.8rem 0.5rem;
            pointer-events: none;
            animation: popper-fadeIn 0.5s ease-in-out;
          }
        }
      }
    }
  }
}

@keyframes popper-fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>