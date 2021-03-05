<template>
  <section class="ceremony">
    <!-- ceremony-封面 -->
    <transition name="section">
      <div class="sec-1" v-show="isCoverShow">
        <div class="info" :class="{ show: isInfoShow }">
          <h3>{{ infoList[infoIndex].name }}</h3>
          <p>{{ infoList[infoIndex].intro }}</p>
        </div>

        <div class="cube">
          <div
            v-for="(cer, key) in cube"
            :key="key"
            :class="key"
            :data-content="cer.name"
            data-toggle="popover"
            @mouseover="showInfo(cer.index)"
            @mouseleave="isInfoShow = false"
            @click="enterVideo(cer.index)"
          >
            <video
              preload="metadata"
              muted
              loop
              autoplay
              x5-video-player-type="h5"
              playsinline="true"
              webkit-playsinline="true"
              x-webkit-airplay="true"
              x5-video-orientation="portraint"
              x5-video-player-fullscreen="true"
            >
              <source :src="cer.videoSrc" />
            </video>
          </div>
        </div>
      </div>
    </transition>

    <!-- ceremony-core -->
    <transition>
      <div class="sec-2" v-show="!isCoverShow">
        <transition-group name="slide-toggle">
          <div class="slide" v-show="slideIndex === 0" :key="0">
            <div class="main-wrap">
              <!-- left-part -->
              <list-group
                class="left-part text-center"
                :class="{ active: isListActive }"
                title="仪式环节"
                :callback="listHandler"
                :list="segmentTextList"
                :index="listIndex"
                @click="isListActive = false"
                @active="skipVideo"
              >
                <handle-bar
                  class="bar-rotate"
                  :class="{ active: isListActive }"
                  @toggle="isListActive = !isListActive"
                  @toggle.once="closeListTips"
                >
                  <div
                    class="right-center animated"
                    data-toggle="tips"
                    data-content="点击查看仪式主要环节"
                    :class="listTipsState"
                  ></div>
                </handle-bar>
              </list-group>

              <!-- center-part -->
              <div class="center-part">
                <!-- back button -->
                <transition>
                  <div
                    class="trigger left-bottom animated"
                    data-toggle="tips"
                    data-content="点击返回仪式导航页"
                    :class="backCeremonyTopTipsState"
                    @click="backTop"
                    @click.once="closeBackTopTips"
                    v-show="!isSliderActive"
                  >
                    <img :src="backTopIcon" alt="" gable="dragfalse" />
                  </div>
                </transition>

                <video-player
                  :options="videoOptions"
                  :callback="videoHandler"
                />
              </div>

              <!-- right-part -->
              <div
                class="right-part left-center animated"
                data-toggle="tips"
                data-content="点击浮动元素了解更多"
                :class="[{ active: isSliderActive }, factorTipsState]"
              >
                <!-- toggle button -->
                <div
                  class="trigger left-top animated"
                  data-toggle="tips"
                  data-content="点击查看仪式关键元素"
                  :class="[{ shake: isTriggerShake }, sliderTipsState]"
                  @click="toggleSlider"
                  @click.once="closeSliderTips"
                >
                  <img :src="toggleSliderIcon" alt="" draggable="false" />
                </div>

                <image-slider
                  :list="element[index]"
                  :class="{ shake: isFactorShake }"
                  :callback="sliderHandler"
                  @display="showMore"
                ></image-slider>
              </div>
            </div>
          </div>

          <div class="slide" v-show="slideIndex === 1" :key="1">
            <div class="factor-wrap">
              <div class="back-to-video">
                <handle-bar
                  class="bar-shake"
                  @toggle="backVideo"
                  @click.native.once="closeBackVideoTips"
                >
                  <div
                    class="right-center animated"
                    data-toggle="tips"
                    :class="backVideoTipsState"
                    data-content="点击返回视频"
                  ></div>
                </handle-bar>
              </div>

              <div class="card-wrap">
                <div
                  class="card top-right animated"
                  data-toggle="tips"
                  data-content="点击关键元素查看更多信息"
                  :class="[{ active: isCardActive }, cardTipsState]"
                >
                  <img
                    class="origin"
                    :src="currentElement.origin"
                    alt=""
                    draggable="false"
                  />
                  <img
                    class="factor"
                    :src="currentElement.factor"
                    :style="currentElement.style"
                    alt=""
                    draggable="false"
                    @click="isCardActive = true"
                    @click.once="closeCardTips"
                  />

                  <div class="card-back" @click="isCardActive = false">
                    <img
                      class="paint"
                      :src="currentElement.paint"
                      alt=""
                      draggable="false"
                    />
                    <div class="text-content">
                      <h3 class="name">{{ currentElement.name }}</h3>
                      <p class="info">{{ currentElement.info }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </transition>
  </section>
</template>

<script>
import ListGroup from "@/component/list-group.vue";
import HandleBar from "@/component/handle-bar.vue";
import VideoPlayer from "@/component/video-player.vue";
import ImageSlider from "@/component/image-slider.vue";
import { mapState } from "vuex";

export default {
  data() {
    this.$store.commit("setIndex", 2);
    return {
      index: 0,
      infoIndex: 0,
      slideIndex: 0,
      elementIndex: 0,
      listIndex: -1,
      isCoverShow: true,
      isInfoShow: false,
      isListActive: false,
      isSliderActive: false,
      isCardActive: false,
      isFactorShake: false,
      isTriggerShake: false,
      // tips
      backCeremonyTopTipsState:
        localStorage.getItem("backCeremonyTopTipsState") || "show",
      listTipsState: localStorage.getItem("listTipsState") || "show",
      sliderTipsState: localStorage.getItem("sliderTipsState") || "show",
      factorTipsState: localStorage.getItem("factorTipsState") || "hide",
      backVideoTipsState: localStorage.getItem("backVideoTipsState") || "show",
      cardTipsState: localStorage.getItem("cardTipsState") || "show",
      imageSlider: null,
      videoPlayer: null,
      videoOptions: {
        fill: true,
        controls: true,
        controlBar: { pictureInPictureToggle: false },
        sources: [
          {
            src: this.$store.state.ceremony.videoList[0],
            type: "video/mp4",
          },
        ],
      },
    };
  },
  methods: {
    showInfo(i) {
      this.isInfoShow = true;
      this.infoIndex = i;
    },
    toggleSlider() {
      this.isSliderActive = !this.isSliderActive;
      this.isListActive = false;
    },
    backTop() {
      this.isCoverShow = true;
      this.isListActive = false;
      this.isSliderActive = false;
      this.player?.pause();
    },
    enterVideo(i) {
      if (this.index !== i) {
        this.index = i;
        this.listIndex = -1;
        this.player?.src(this.videoList[i]);
      }
      this.player?.play();
      this.isCoverShow = false;
      this.$store.commit("hideNavbar");
    },
    showMore(i) {
      this.slideIndex = 1;
      this.elementIndex = i;
      this.player?.pause();
      this.isFactorShake = false;
    },
    backVideo() {
      this.isCardActive = false;
      this.slideIndex = 0;
      this.player?.play();
    },
    skipVideo(i) {
      this.listIndex = i;
      this.player?.currentTime(this.segmentTimePoints[i]);
    },
    updateTime() {
      let t = Math.floor(this.player?.currentTime());
      let i = this.segmentTimePoints.indexOf(t);
      if (i != -1) {
        this.listIndex = i;
      }

      let j = this.elementTimePoints.indexOf(t);
      if (j != -1) {
        this.isFactorShake = true;
        this.isTriggerShake = true;
        setTimeout(() => {
          this.isTriggerShake = false;
        }, 3000);

        this.imageSlider.slide(
          j - this.imageSlider.children(":nth-child(4)").attr("data-index")
        );
      }
    },
    debounce(func, delay) {
      let timer;
      return function () {
        let context = this;
        let args = arguments;
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            func.apply(context, args);
          }, delay);
        }
      };
    },
    videoHandler(player) {
      this.player = player;
      this.player?.on("timeupdate", this.debounce(this.updateTime, 980));
    },
    listHandler() {},
    sliderHandler(slider) {
      this.imageSlider = slider;
    },
    // close tips
    closeBackTopTips() {
      this.backCeremonyTopTipsState = "hide";
      localStorage.setItem("backCeremonyTopTipsState", "hide");
    },
    closeSliderTips() {
      if (localStorage.getItem("factorTipsState") === null) {
        this.factorTipsState = "show";
      }
      localStorage.setItem("factorTipsState", "hide");
      this.sliderTipsState = "hide";
      localStorage.setItem("sliderTipsState", "hide");
    },
    closeListTips() {
      this.listTipsState = "hide";
      localStorage.setItem("listTipsState", "hide");
    },
    closeBackVideoTips() {
      this.backVideoTipsState = "hide";
      localStorage.setItem("backVideoTipsState", "hide");
    },
    closeCardTips() {
      this.cardTipsState = "hide";
      localStorage.setItem("cardTipsState", "hide");
    },
  },
  computed: {
    currentElement() {
      return this.element[this.index][this.elementIndex];
    },
    segmentTextList() {
      return this.segment[this.index].map((value) => value.text);
    },
    segmentTimePoints() {
      return this.segment[this.index].map((value) => value.time);
    },
    elementTimePoints() {
      return this.element[this.index].map((value) => value.time);
    },
    ...mapState({
      cube: (state) => state.ceremony.cube,
      infoList: (state) => state.ceremony.infoList,
      videoList: (state) => state.ceremony.videoList,
      segment: (state) => state.ceremony.segment,
      element: (state) => state.ceremony.element,
      backTopIcon: (state) => state.ceremony.backTopIcon,
      toggleSliderIcon: (state) => state.ceremony.toggleSliderIcon,
    }),
  },
  components: {
    ListGroup,
    HandleBar,
    VideoPlayer,
    ImageSlider,
  },
  mounted() {
    let Win = $(window);
    let Height = Win.height() / 2;
    let Width = Win.width() / 2;
    if (Width >= 1280 / 2) {
      let cubeWrap = $(".ceremony .sec-1");

      cubeWrap.on("mousemove", (e) => {
        cubeWrap.css(
          "perspective-origin",
          `${e.clientX - Width}px ${e.clientY - Height}px`
        );
      });
      cubeWrap.find(".cube").on("mouseover", (e) => {
        this.$store.commit("playClickAudio");
      });

      import("@/assets/js/jquery.mousewheel.min").then(() => {
        $(".card-back").on("mousewheel", (e) => e.stopPropagation());
      });
    }
  },
};
</script>

<style lang="less" scoped>
@cube-375: 8.75rem;
@cube-576: 8rem;
@cube-768: 10rem;
@cube-1024: 10.5rem;
@cube-1280: 9rem;
@cube-1440: 11rem;

.ceremony {
  .sec-1 {
    display: flex;
    justify-content: center;
    align-items: center;
    background: lightgray url("../../assets/img/ceremony/background.jpg") center
      no-repeat;
    background-size: cover;
    perspective: 2000px;
    perspective-origin: center;
    z-index: 50;

    .info {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      padding: 10% 2%;
      transition: opacity 0.5s ease-in-out;

      &.show {
        opacity: 1;
      }
      h3 {
        text-align: center;
      }
      p {
        text-indent: 2em;
      }
    }

    .cube {
      position: relative;
      width: @cube-375;
      height: @cube-375;
      transform-style: preserve-3d;
      animation: cube-spin 20s infinite linear;
      cursor: pointer;

      &:hover {
        animation-play-state: paused;
      }

      div {
        position: absolute;
        width: @cube-375;
        height: @cube-375;
        text-align: center;
        line-height: @cube-375;
        opacity: 0.8;
        overflow: hidden;
        border-radius: 2px;
        background-color: rgba(0, 0, 0, 0.5);
        /* transition: all 1s; */

        &:hover {
          opacity: 1;
        }
      }

      .back {
        transform: translateZ(-@cube-375 / 2) rotateY(180deg);
      }
      .right {
        transform: rotateY(-270deg) translateX(@cube-375 / 2);
        transform-origin: top right;
      }
      .left {
        transform: rotateY(270deg) translateX(-@cube-375 / 2);
        transform-origin: center left;
      }
      .top {
        transform: rotateX(-90deg) translateY(@cube-375 / 2) rotateZ(180deg);
        transform-origin: top center;
      }
      .bottom {
        transform: rotateX(90deg) translateY(@cube-375 / 2);
        transform-origin: bottom center;
      }
      .front {
        transform: translateZ(@cube-375 / 2);
      }

      video {
        height: 100%;
        width: auto;
        transform: translate(-25%, 0);

        &::-webkit-media-controls {
          display: none !important;
        }
      }
    }
  }

  .sec-2 {
    .slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .main-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .left-part {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        transform: translateX(-100%);

        .handle-bar {
          top: 50%;
          left: 100%;
        }

        &.active {
          transform: none !important;
          opacity: 1 !important;
        }
      }

      .center-part {
        height: 100%;
        width: 100%;

        .trigger {
          top: 0;
          right: 0;
          z-index: 40;
        }
      }

      .right-part {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 50%;
        transform: translate(100%, 200%);
        transition: all 0.5s ease-in-out;
        z-index: 20;

        .trigger {
          bottom: 105%;
          top: unset;
          right: 100%;
          z-index: 40;
          transition: all 0.3s linear;

          &.shake {
            animation: head-shake 0.8s ease-in-out 3 both;
          }
        }

        &.active {
          height: 100%;
          transform: none;

          .trigger {
            bottom: unset;
            top: 0;
            right: 20%;
          }
        }
      }
    }

    .factor-wrap {
      width: 100%;
      height: 100%;
      background: url("../../assets/img/ceremony/background-2.jpg") center
        no-repeat;
      background-size: cover;

      .back-to-video .handle-bar {
        top: 50%;
        left: 0;
        z-index: 10;
      }

      .card-wrap {
        position: relative;
        height: 100%;
        width: 100%;
        text-align: center;
        vertical-align: middle;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        .card {
          transform-style: preserve-3d;
          position: relative;
          width: 100%;
          height: auto;
          transform: none;
          transition: all 0.5s linear;
          // display: inline-block;

          .origin {
            width: 100%;
            height: auto;
            backface-visibility: hidden;
          }

          .factor {
            backface-visibility: hidden;
            position: absolute;
            animation: factor-blink 1.8s linear infinite both;
            cursor: pointer;
          }
          &.active {
            transform: rotateY(180deg) rotateZ(90deg);

            .card-back {
              opacity: 1;
            }
          }
        }

        .card-back {
          position: absolute;
          top: 50%;
          left: 0;
          width: 80%;
          height: auto;
          padding: 2rem 1.5rem;
          margin-left: 10%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-direction: column;
          background: url("../../assets/img/background.jpg") center no-repeat;
          background-size: cover;
          overflow: hidden;
          transform: translateY(-50%) rotateY(180deg) rotateZ(90deg);
          backface-visibility: hidden;
          opacity: 0;
          transition: all 0.5s linear;
          cursor: pointer;

          .paint {
            height: auto;
            width: 50%;
          }

          .text-content {
            height: 100%;
            color: #ebd8d1;
          }

          .name {
            padding-top: 1rem;
            margin: 0;
          }
          .info {
            margin: 0;
            text-align: left;
            white-space: pre-line;
          }
        }
      }
    }
  }
}

.slide-toggle-enter-active {
  animation: slide-in 0.5s ease both;
}
.slide-toggle-leave-active {
  animation: slide-out 0.5s ease both;
}

@keyframes cube-spin {
  from {
    transform: rotateY(0) rotateX(0) rotateZ(0);
  }
  to {
    transform: rotateY(360deg) rotateX(360deg) rotateZ(360deg);
  }
}

@keyframes factor-blink {
  40% {
    transform: scale(0.995);
  }
  50% {
    opacity: 0.6;
  }
  60% {
    transform: scale(1.005);
  }
}

@keyframes slide-in {
  from {
    transform: translate(100%, 0);
  }
  to {
    transform: translate(0, 0);
  }
}
@keyframes slide-out {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-100%, 0);
  }
}

@keyframes head-shake {
  0% {
    transform: translateX(0);
  }
  6.5% {
    transform: translateX(-10px) rotateY(-10deg);
  }
  18.5% {
    transform: translateX(9px) rotateY(8deg);
  }
  31.5% {
    transform: translateX(-8px) rotateY(-6deg);
  }
  43.5% {
    transform: translateX(6px) rotateY(4deg);
  }
  50% {
    transform: translateX(0);
  }
}

@media only screen and (min-width: 576px) {
  .ceremony {
    .sec-1 {
      .info {
        padding: 2% 10%;
      }

      .cube {
        width: @cube-576;
        height: @cube-576;

        div {
          width: @cube-576;
          height: @cube-576;
          line-height: @cube-576;
        }

        .back {
          transform: translateZ(-@cube-576 / 2) rotateY(180deg);
        }
        .right {
          transform: rotateY(-270deg) translateX(@cube-576 / 2);
        }
        .left {
          transform: rotateY(270deg) translateX(-@cube-576 / 2);
        }
        .top {
          transform: rotateX(-90deg) translateY(@cube-576 / 2) rotateZ(180deg);
        }
        .bottom {
          transform: rotateX(90deg) translateY(@cube-576 / 2);
        }
        .front {
          transform: translateZ(@cube-576 / 2);
        }
      }
    }

    .sec-2 {
      .main-wrap {
        .left-part {
          width: 40%;
        }

        .right-part {
          width: 40%;

          .trigger {
            bottom: 107%;
          }
        }
      }

      .factor-wrap {
        .card-wrap {
          .card {
            width: auto;
            height: 80%;
            margin: 0 auto;

            .origin {
              width: auto;
              height: 100%;
            }

            &.active {
              transform: rotateY(180deg);

              .card-back {
                opacity: 1;
              }
            }
          }

          .card-back {
            width: 100%;
            height: 100%;
            margin: 0;
            left: 50%;
            justify-content: space-between;
            flex-direction: row;
            transform: translate(-50%, -50%) rotateY(180deg);

            .paint {
              height: auto;
              width: 40%;
            }

            .text-content {
              height: 100%;
              overflow: scroll;
              padding-left: 2rem;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;

              .name {
                padding: 0 0 1rem;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) {
  .ceremony {
    .sec-1 {
      .info {
        padding: 5% 20%;
      }

      .cube {
        width: @cube-768;
        height: @cube-768;

        div {
          width: @cube-768;
          height: @cube-768;
          line-height: @cube-768;
        }

        .back {
          transform: translateZ(-@cube-768 / 2) rotateY(180deg);
        }
        .right {
          transform: rotateY(-270deg) translateX(@cube-768 / 2);
        }
        .left {
          transform: rotateY(270deg) translateX(-@cube-768 / 2);
        }
        .top {
          transform: rotateX(-90deg) translateY(@cube-768 / 2) rotateZ(180deg);
        }
        .bottom {
          transform: rotateX(90deg) translateY(@cube-768 / 2);
        }
        .front {
          transform: translateZ(@cube-768 / 2);
        }
      }
    }

    .sec-2 {
      .handle-bar {
        width: 4.25rem;
        height: 3rem;
        font-size: 150%;
      }

      .main-wrap {
        .right-part {
          width: 60%;

          .trigger {
            bottom: 104%;
          }
        }
      }

      .factor-wrap {
        .card-wrap {
          .card {
            width: 80%;
            height: auto;
            margin: 0 auto;

            .origin {
              width: 100%;
              height: auto;
            }
          }

          .card-back {
            .text-content {
              height: 100%;
              overflow: scroll;
              padding-left: 2.5rem;

              .name {
                font-size: 1.8rem;
              }

              .info {
                font-size: 1.2rem;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 1024px) {
  .ceremony {
    .sec-1 {
      .cube {
        width: @cube-1024;
        height: @cube-1024;

        div {
          width: @cube-1024;
          height: @cube-1024;
          line-height: @cube-1024;
        }

        .back {
          transform: translateZ(-@cube-1024 / 2) rotateY(180deg);
        }
        .right {
          transform: rotateY(-270deg) translateX(@cube-1024 / 2);
        }
        .left {
          transform: rotateY(270deg) translateX(-@cube-1024 / 2);
        }
        .top {
          transform: rotateX(-90deg) translateY(@cube-1024 / 2) rotateZ(180deg);
        }
        .bottom {
          transform: rotateX(90deg) translateY(@cube-1024 / 2);
        }
        .front {
          transform: translateZ(@cube-1024 / 2);
        }
      }
    }

    .sec-2 {
      .main-wrap {
        .left-part {
          width: 30%;
        }

        .right-part {
          width: 40%;
        }
      }

      .factor-wrap {
        .card-wrap {
          .card-back {
            padding: 2.5rem;

            .text-content {
              .info {
                font-size: 1.3rem;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 1280px) {
  .ceremony {
    .sec-1 {
      .info {
        top: 10%;
        width: 50%;
        padding: 0 10%;

        h3 {
          font-size: 1.4rem;
        }
        p {
          font-size: 1.1rem;
        }
      }
      .cube {
        width: @cube-1280;
        height: @cube-1280;

        div {
          width: @cube-1280;
          height: @cube-1280;
          line-height: @cube-1280;
        }

        .back {
          transform: translateZ(-@cube-1280 / 2) rotateY(180deg);
        }
        .right {
          transform: rotateY(-270deg) translateX(@cube-1280 / 2);
        }
        .left {
          transform: rotateY(270deg) translateX(-@cube-1280 / 2);
        }
        .top {
          transform: rotateX(-90deg) translateY(@cube-1280 / 2) rotateZ(180deg);
        }
        .bottom {
          transform: rotateX(90deg) translateY(@cube-1280 / 2);
        }
        .front {
          transform: translateZ(@cube-1280 / 2);
        }
      }
    }

    .sec-2 {
      .handle-bar {
        width: 3.75rem;
        height: 2.25rem;
        font-size: 125%;
      }

      .main-wrap {
        .left-part {
          width: 20%;
        }

        .right-part {
          width: 25%;

          &.active {
            .trigger {
              right: 12%;
              transform: translateY(-10%) scale(0.8);
            }
          }

          // tips
          &::before,
          &::after {
            top: 50%;
          }
        }
      }

      .factor-wrap {
        .card-wrap {
          .card {
            width: auto;
            height: 75%;

            .origin {
              width: auto;
              height: 100%;
            }
          }

          .card-back {
            .text-content {
              .name {
                padding: 1rem 0 0;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 1440px) {
  .ceremony {
    .sec-1 {
      .info {
        h3 {
          font-size: 1.8rem;
        }
        p {
          font-size: 1.4rem;
        }
      }

      .cube {
        width: @cube-1440;
        height: @cube-1440;

        div {
          width: @cube-1440;
          height: @cube-1440;
          line-height: @cube-1440;
        }

        .back {
          transform: translateZ(-@cube-1440 / 2) rotateY(180deg);
        }
        .right {
          transform: rotateY(-270deg) translateX(@cube-1440 / 2);
        }
        .left {
          transform: rotateY(270deg) translateX(-@cube-1440 / 2);
        }
        .top {
          transform: rotateX(-90deg) translateY(@cube-1440 / 2) rotateZ(180deg);
        }
        .bottom {
          transform: rotateX(90deg) translateY(@cube-1440 / 2);
        }
        .front {
          transform: translateZ(@cube-1440 / 2);
        }
      }
    }

    .sec-2 {
      .main-wrap {
        .left-part {
          width: 20%;
        }

        .right-part {
          width: 25%;
        }
      }

      .factor-wrap {
        .card-wrap {
          .card {
            width: auto;
            height: 70%;
            max-height: 1000px;

            .origin {
              width: auto;
              height: 100%;
            }

            .text-content {
              .name {
                font-size: 2.2rem;
              }
              .info {
                font-size: 1.7rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>