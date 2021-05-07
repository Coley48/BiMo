<template>
  <section class="dictation">
    <transition name="section">
      <div class="sec-1" v-show="isCoverShow">
        <div class="container">
          <div class="opener" @click="enterVideo"></div>
          <div class="preface" @click="enterVideo">
            <p>头人的知识上百，</p>
            <p>兹莫的知识上千，</p>
            <p>毕摩的知识无数计。</p>
            <p>——彝族克智谚语</p>
          </div>
        </div>
      </div>
    </transition>

    <transition>
      <div class="sec-2" v-show="!isCoverShow">
        <div class="container">
          <video-player
            :options="firstPlayerOptions"
            :callback="firstHandler"
          />

          <video-player
            class="upward"
            :options="secondPlayerOptions"
            :callback="secondHandler"
          />

          <div class="view-tips">
            <div
              class="bottom-left animated"
              data-toggle="tips"
              data-content="点击切换视角"
              :class="viewTipsState"
            ></div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import videojs from "video.js";
import VideoPlayer from "@/component/video-player";

export default {
  data() {
    this.$store.commit("setIndex", 3);
    return {
      isCoverShow: true,
      firstPlayer: null,
      secondPlayer: null,
      viewTipsState: localStorage.getItem("viewTipsState") || "show",
      firstPlayerOptions: {
        fill: true,
        controls: true,
        controlBar: { pictureInPictureToggle: false },
        sources: [
          {
            src: "/video/dictation/dictation-1.mp4",
            type: "video/mp4",
          },
        ],
      },
      secondPlayerOptions: {
        fill: true,
        controls: false,
        muted: true,
        controlBar: { pictureInPictureToggle: false, volumePanel: false },
        sources: [
          {
            src: "/video/dictation/dictation-2.mp4",
            type: "video/mp4",
          },
        ],
      },
    };
  },
  computed: {},
  methods: {
    firstHandler(firstPlayer) {
      this.firstPlayer = firstPlayer;
    },
    secondHandler(secondPlayer) {
      this.secondPlayer = secondPlayer;
    },
    enterVideo() {
      this.$store.commit("hideNavbar");
      this.isCoverShow = false;
      this.firstPlayer?.play();
    },
  },
  components: {
    VideoPlayer,
  },
  mounted() {
    function syncPlay(e) {
      switch (e.type) {
        case "pause":
          this.pause();
          break;
        case "play":
          this.play();
          break;
        case "seeking":
          this.currentTime(videojs(e.target).currentTime());
          break;
        default:
          break;
      }
    }

    function changeView(e) {
      let target = videojs(e.target);
      target.controls(true);
      target.on(this, "click", changeView);
      target.off(this, ["pause", "play", "seeking"], syncPlay);
      this.controls(false);
      this.off(target, "click", changeView);
      this.on(target, ["pause", "play", "seeking"], syncPlay);
      target.removeClass("upward");
      this.addClass("upward");
    }

    this.firstPlayer.on(this.secondPlayer, "click", changeView);
    this.secondPlayer.on(
      this.firstPlayer,
      ["pause", "play", "seeking"],
      syncPlay
    );

    this.secondPlayer.one("click", () => {
      this.viewTipsState = "hide";
      localStorage.setItem("viewTipsState", "hide");
    });
  },
};
</script>

<style lang="less" scoped>
.dictation {
  .container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .sec-1 {
    background: url("../../assets/img/dictation/background.jpg") center
      no-repeat;
    background-size: cover;
    overflow: hidden;

    .opener {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 25%;
      transform: translate(-50%, -50%) rotateZ(12deg);
      cursor: pointer;
    }

    .preface {
      position: absolute;
      top: 68%;
      left: 14%;
      width: 72%;
      min-width: calc(1.5 * 9rem);
      max-width: calc(1.5 * 16rem);
      cursor: pointer;

      p {
        margin-bottom: 0;
        font-size: 1.5rem;
        color: white;

        &:last-child {
          text-align: right;
        }
      }
    }
  }

  .sec-2 {
    .vjs-fill.upward {
      position: fixed;
      top: 1rem;
      right: 1rem;
      height: 135px !important;
      width: 240px !important;
      z-index: 2;
      opacity: 0.8;
      cursor: pointer;
      transition: opcatiy 0.5s ease-in-out;
    }
  }
}

@media only screen and (min-width: 576px) {
  .dictation {
    .sec-1 {
      .opener {
        width: 68%;
      }

      .preface {
        min-width: calc(1.3 * 9rem);
        max-width: calc(1.3 * 16rem);

        p {
          font-size: 1.3rem;
          line-height: 1.2;
        }
      }
    }

    .sec-2 {
      .vjs-fill.upward {
        top: 0.5rem;
        right: 0.5rem;
        height: 90px !important;
        width: 160px !important;
      }
    }
  }
}

@media only screen and (min-width: 768px) {
  .dictation {
    .sec-1 {
      .opener {
        width: 100%;
      }

      .preface {
        min-width: calc(1.8 * 9rem);
        max-width: calc(1.8 * 16rem);

        p {
          font-size: 1.8rem;
          line-height: 1.3;
        }
      }
    }

    .sec-2 {
      .vjs-fill.upward {
        top: 1.5rem;
        right: 1.5rem;
        height: 135px !important;
        width: 240px !important;
      }
    }
  }
}

@media only screen and (min-width: 1024px) {
  .dictation {
    .sec-1 {
      .opener {
        width: 80%;
      }
    }

    .sec-2 {
      .vjs-fill.upward {
        top: 1rem;
        right: 1rem;
      }
    }
  }
}

@media only screen and (min-width: 1280px) {
  .dictation {
    .sec-1 {
      .opener {
        width: 70%;
        height: 30%;
      }
    }

    .sec-2 {
      .vjs-fill.upward {
        top: 1rem;
        right: 1rem;
        height: 135px !important;
        width: 240px !important;
      }

      .vjs-fill.upward:hover {
        opacity: 1;
      }

      .view-tips {
        position: absolute;
        top: 1rem;
        right: 1rem;
        height: 135px;
        width: 240px;

        [data-toggle="tips"] {
          position: relative;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

@media only screen and (min-width: 1440px) {
  .dictation {
    .sec-1 {
      .opener {
        width: 70%;
        height: 30%;
      }
    }

    .sec-2 {
      .vjs-fill.upward {
        top: 1.5rem;
        right: 1.5rem;
        height: 180px !important;
        width: 320px !important;
      }
    }
  }
}
</style>