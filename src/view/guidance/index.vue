<template>
  <section class="guidance">
    <transition>
      <div class="starter-wrap" v-show="isStarterShow" @click="showPreface()">
        <img src="../../assets/img/guidance/scroll.png" alt="" />
      </div>
    </transition>

    <div
      class="preface-wrap"
      :class="{ show: isPrefaceShow, hide: isPrefaceHide }"
    >
      <h1 class="title">
        <span>毕</span>
        <span>摩</span>
        <span>行</span>
      </h1>

      <p class="content">
        这是一段探寻毕摩文化的旅途，毕摩是彝族专门替族人礼赞、祈祷、祭祀的祭师。“毕”为“念经”之意，“摩”为“有知识的长者”。他既掌管神权，又把握文化，既司通天地，又指导人事。
      </p>

      <div class="letter-opener" @click="showLetter()">
        <img src="../../assets/img/icon/envelope.png" alt="" />
      </div>
    </div>

    <div class="letter-wrap" :class="{ show: isLetterShow }">
      <div class="letter">
        <img
          src="../../assets/img/guidance/letter.png"
          alt=""
          draggable="false"
        />

        <router-link
          class="accept"
          tag="div"
          :to="{ name: 'Introduce' }"
          @click.native="stopAudio"
          draggable="false"
        >
          <img
            src="../../assets/img/guidance/board.png"
            alt=""
            draggable="false"
          />
        </router-link>
      </div>
    </div>

    <div class="background-wrap" :class="{ blink: isLetterShow }"></div>
  </section>
</template>

<script>
import { Howl } from "howler";

export default {
  data() {
    this.$store.commit("setIndex", -1);
    return {
      isStarterShow: true,
      isPrefaceShow: false,
      isPrefaceHide: false,
      isLetterShow: false,
    };
  },
  computed: {},
  methods: {
    showPreface() {
      this.isPrefaceShow = true;
      this.isStarterShow = false;
      this.loadingAudio?.play();
    },
    showLetter() {
      this.isLetterShow = true;
      this.isPrefaceHide = true;
      this.letterAudio?.play();
    },
    stopAudio() {
      this.loadingAudio?.pause();
      this.letterAudio?.pause();
      this.$store.commit("playClickAudio");
      this.$store.commit("toggleNavbar", true);
    },
  },
  mounted() {
    this.letterAudio = new Howl({
      src: "./video/guidance/letter.mp3",
    });
    this.loadingAudio = new Howl({
      src: "./video/guidance/loading.mp3",
    });
  },
};
</script>

<style lang="less" scoped>
// 应用于所有屏幕的基础样式
.guidance {
  position: relative;
  z-index: 1000;
  height: 100%;
  width: 100%;
  background: lightblue url("../../assets/img/guidance/background.jpg") center
    no-repeat;
  background-size: cover;
  background-attachment: fixed;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  .starter-wrap {
    position: fixed;
    top: 70%;
    left: 45%;
    transform: translate(-50%, -50%);
    width: 6rem;
    z-index: 1010;

    img {
      width: 100%;
      height: auto;
      animation: scroll-pulse 2s ease-in-out infinite both;
      cursor: pointer;
    }
  }

  .preface-wrap {
    position: absolute;
    top: 100%;
    left: 50%;
    height: 100%;
    width: 100%;
    transform: translateX(-50%);
    text-align: center;
    transition: all 3s linear 1s;
    opacity: 0;
    z-index: 1015;
    padding: 0 1%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .title {
      font-size: 3.2rem;
      font-weight: normal;

      span {
        position: relative;
        &:not(:last-child) {
          margin-right: 0.3em;
        }

        &::after {
          content: "";
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) scale(0.75);
          width: 100%;
          height: 100%;
        }

        &:nth-child(1)::after {
          background: url("../../assets/img/guidance/bi.png") center no-repeat;
          background-size: contain;
        }
        &:nth-child(2)::after {
          background: url("../../assets/img/guidance/mo.png") center no-repeat;
          background-size: contain;
        }
        &:nth-child(3)::after {
          background: url("../../assets/img/guidance/xing.png") center no-repeat;
          background-size: contain;
        }
      }
    }

    .content {
      text-indent: 2.4rem;
      font-size: 1.2rem;
      line-height: 1.2;
      text-align: left;
      margin-bottom: 0;
    }

    .letter-opener {
      text-align: center;
      padding: 1rem 0;

      img {
        height: 3.5rem;
        width: auto;
        cursor: pointer;
        animation: icon-rotate 0.5s linear infinite;
      }
    }

    &.show {
      opacity: 1;
      top: 0;
    }
    &.hide {
      opacity: 0 !important;
    }
  }

  .letter-wrap {
    position: fixed;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    transition: all 1s ease-in-out 0.3s;
    opacity: 0;
    z-index: 1020;
    overflow: scroll;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    &.show {
      opacity: 1;
      top: 0;
    }

    .letter {
      position: relative;
      height: auto;
      width: 100%;
      margin: 0 auto;

      img {
        width: 100%;
        height: auto;
      }
      .accept {
        position: absolute;
        width: 100%;
        height: auto;
        bottom: 8%;
        left: 0;
        text-align: center;

        &::after {
          content: "接受邀请 开始探索";
          position: absolute;
          bottom: inherit;
          left: 50%;
          font-size: 0.9rem;
          transform: translateX(-50%);
          animation: font-breath 2s linear infinite both;
          cursor: pointer;
        }

        img {
          width: 9em;
          height: auto;
          cursor: pointer;
        }
      }
    }
  }

  @keyframes scroll-pulse {
    from {
      transform: scale3d(1, 1, 1);
    }

    50% {
      transform: scale3d(1.05, 1.05, 1.05);
    }

    to {
      transform: scale3d(1, 1, 1);
    }
  }

  @keyframes icon-rotate {
    50% {
      transform: rotateZ(10deg);
    }
  }

  @keyframes font-breath {
    50% {
      font-size: 0.95rem;
    }
  }

  @keyframes person-blink {
    50% {
      opacity: 1;
    }
  }
}

// 576px以上屏幕宽度的样式
@media only screen and (min-width: 576px) {
  .guidance {
    .starter-wrap {
      width: 4.5rem;
    }

    .preface-wrap {
      .title {
        font-size: 2.7rem;
      }

      .content {
        padding: 0 10%;
        font-size: 1.1rem;
      }

      .letter-opener {
        padding: 0.75rem 0;

        img {
          height: 3rem;
        }
      }
    }

    .letter-wrap {
      padding: 10% 0;
      display: block;

      .letter {
        width: 80%;

        .accept {
          &::after {
            font-size: 1rem;
          }

          img {
            width: 10em;
          }
        }
      }
    }
  }

  @keyframes font-breath {
    50% {
      font-size: 1.05rem;
    }
  }
}

// 768px以上屏幕宽度的样式
@media only screen and (min-width: 768px) {
  .guidance {
    .starter-wrap {
      width: 7rem;
    }

    .preface-wrap {
      .title {
        font-size: 4rem;
      }

      .content {
        padding: 0 12.5%;
        text-indent: 3rem;
        font-size: 1.5rem;
      }

      .letter-opener {
        padding: 3.2rem 0;

        img {
          height: 4.3rem;
        }
      }
    }

    .letter-wrap {
      .letter {
        width: 80%;

        .accept {
          &::after {
            font-size: 1.2rem;
          }

          img {
            width: 12em;
          }
        }
      }
    }
  }

  @keyframes font-breath {
    50% {
      font-size: 1.25rem;
    }
  }
}

// 1024px以上屏幕宽度的样式
@media only screen and (min-width: 1024px) {
  .guidance {
    .preface-wrap {
      .title {
        font-size: 4.5rem;
      }

      .content {
        padding: 0 15%;
      }

      .letter-opener {
        img {
          height: 4.8rem;
        }
      }
    }

    .letter-wrap {
      .letter {
        width: 70%;

        .accept {
          &::after {
            font-size: 1.5rem;
          }

          img {
            width: 15em;
          }
        }
      }
    }
  }

  @keyframes font-breath {
    50% {
      font-size: 1.55rem;
    }
  }
}

// 1028px以上屏幕宽度的样式
@media only screen and (min-width: 1280px) {
  .guidance {
    .starter-wrap {
      width: 5.5rem;
    }

    .preface-wrap {
      .title {
        font-size: 3.5rem;
      }

      .content {
        padding: 0 27.5%;
        text-indent: 3rem;
        font-size: 1.5rem;
      }

      .letter-opener {
        padding: 2.4rem 0;

        img {
          height: 3.8rem;
        }
      }
    }

    .letter-wrap {
      .letter {
        width: 50%;

        .accept {
          &::after {
            font-size: 1.3rem;
          }

          img {
            width: 13em;
          }
        }
      }
    }

    .background-wrap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url("../../assets/img/guidance/background-2.png") center
        no-repeat;
      background-size: cover;
      z-index: 1005;
      opacity: 0;

      &.blink {
        animation: person-blink 3s linear 2s infinite both;
      }
    }
  }

  @keyframes font-breath {
    50% {
      font-size: 1.35rem;
    }
  }
}

// 1440px以上屏幕宽度的样式
@media only screen and (min-width: 1440px) {
  .guidance {
    .starter-wrap {
      width: 7.5rem;
    }

    .preface-wrap {
      .title {
        font-size: 5rem;
      }

      .content {
        padding: 0 30%;
        text-indent: 3.5rem;
        font-size: 1.75rem;
        line-height: 1.3;
      }

      .letter-opener {
        img {
          height: 5.3rem;
        }
      }
    }

    .letter-wrap {
      .letter {
        width: 50%;

        .accept {
          &::after {
            font-size: 1.4rem;
          }

          img {
            width: 14em;
          }
        }
      }
    }
  }

  @keyframes font-breath {
    50% {
      font-size: 1.45rem;
    }
  }
}
</style>