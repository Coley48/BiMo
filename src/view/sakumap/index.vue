<template>
  <section class="sakumap">
    <transition name="section">
      <div class="sec-1" v-show="isCoverShow">
        <div class="cover">
          <div class="opener" @click="enter()">
            <p v-for="(item, index) in poemList" :key="index">
              <span
                data-editable="text"
                tabindex="0"
                :data-source="getDataSource(index)"
                >{{ item }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </transition>

    <transition>
      <div class="sec-2" v-show="!isCoverShow">
        <div class="map-wrapper">
          <ul class="launcher">
            <li
              v-for="(item, idx) in points"
              :key="idx"
              :style="item.position"
              :data-content="item.title"
              @click="showVideo(item.area, idx)"
            ></li>
          </ul>

          <video
            autoplay
            class="player"
            :src="videoSrc"
            v-if="isVideoShow"
            :class="classObj"
            :style="videoPosition"
            @click="isVideoFull = !isVideoFull"
          ></video>

          <div class="shelter" v-show="isVideoShow" @click="hideVideo"></div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    this.$store.commit("setIndex", 4);
    return {
      index: -1,
      isCoverShow: true,
      isVideoShow: false,
      isVideoFull: false,
      player: null,
      isPosition: false,
    };
  },
  methods: {
    getDataSource(index) {
      return `dictation.poemList[${index}]`;
    },
    enter() {
      this.isCoverShow = false;
      this.$store.commit("hideNavbar");
    },
    showVideo(area, idx) {
      this.isVideoShow = true;
      this.index = idx;
      this.player?.play();
    },
    hideVideo() {
      this.isVideoShow = false;
      this.isVideoFull = false;
      this.player?.pause();
    },
  },
  mounted() {
    this.player = document.querySelector(".sakumap .player");

    if ($(window).width() >= 1280) {
      this.isPosition = true;
    }
  },
  computed: {
    videoSrc() {
      return this.index !== -1 ? this.points[this.index].src : "";
    },
    videoPosition() {
      return this.isPosition ? this.points[this.index].position : "";
    },
    classObj() {
      return {
        full: this.isVideoFull,
        [this.points[this.index].area]: this.isPosition,
      };
    },
    ...mapState({
      poemList: (state) => state.sakumap.poemList,
      points: (state) => state.sakumap.points,
    }),
  },
};
</script>

<style lang="less" scoped>
.sakumap {
  .sec-1 {
    background: url("../../assets/img/sakumap/background.jpg") center no-repeat;
    background-size: cover;

    .cover {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .opener {
      position: absolute;
      top: 0;
      right: 0;
      writing-mode: vertical-lr;
      padding: 1rem;
      cursor: pointer;

      p {
        font-size: 1.4rem;
        color: white;
        margin: 0;

        &:last-child {
          text-align: right;
        }
      }
    }
  }

  .sec-2 {
    .map-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      background: url("../../assets/img/sakumap/map.jpg") center no-repeat;
      background-size: cover;
      overflow: hidden;

      .launcher {
        width: 100%;
        height: 100%;

        li {
          position: absolute;
          cursor: pointer;
          width: 2rem;
          height: 2rem;
          transform: translate(-50%, -50%);
          background: url("../../assets/img/icon/point.svg") center no-repeat;
        }
      }

      .player {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: auto;
        opacity: 0.95;
        z-index: 15;
        transform: translate(-50%, -50%);
        cursor: pointer;

        &.full {
          width: 100%;
        }
      }

      .shelter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 10;
      }
    }
  }
}

@media only screen and (min-width: 576px) {
  .sakumap {
    .sec-1 {
      .opener {
        padding: 1rem;

        p {
          font-size: 1.2rem;
        }
      }
    }

    .sec-2 {
      .map-wrapper {
        .player {
          width: auto;
          height: 200px;

          &.full {
            width: auto;
            height: 100%;
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) {
  .sakumap {
    .sec-1 {
      .opener {
        padding: 2rem;

        p {
          font-size: 1.8rem;
        }
      }
    }

    .sec-2 {
      .map-wrapper {
        .launcher {
          li {
            width: 4rem;
            height: 4rem;
            background-size: contain;
          }
        }
        .player {
          width: 400px;
          height: auto;

          &.full {
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 1280px) {
  .sakumap {
    .sec-1 {
      .opener {
        left: 5%;
        right: unset;
        writing-mode: unset;
        padding: 2rem;
        width: calc(30em * 1.8);

        p {
          font-size: 1.8rem;
        }
      }
    }

    .sec-2 {
      .map-wrapper {
        .launcher {
          li {
            width: 4rem;
            height: 4rem;
            background-size: contain;

            &:hover {
              &::before {
                content: "";
                position: absolute;
                top: 10%;
                left: 50%;
                width: 0;
                height: 0;
                border: 0.4rem solid transparent;
                border-width: 0.4rem 0.5rem;
                border-top-color: black;
                transform: translate(-50%, 0);
                pointer-events: none;
                animation: popper-fadeIn 0.5s ease-in-out;
              }

              &::after {
                content: attr(data-content);
                position: absolute;
                top: 11%;
                left: 50%;
                background-color: rgba(0, 0, 0, 0.9);
                white-space: nowrap;
                color: white;
                border-radius: 0.25rem;
                transform: translate(-50%, -100%);
                line-height: 1;
                padding: 0.4rem;
                pointer-events: none;
                animation: popper-fadeIn 0.5s ease-in-out;
              }
            }
          }
        }
        .player {
          height: 225px;
          width: auto;

          &.full {
            width: auto;
            height: 100%;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
          }

          &.A {
            transform: translate(0, 0);
          }
          &.B {
            transform: translate(-100%, 0);
          }
          &.C {
            transform: translate(0, -100%);
          }
          &.D {
            transform: translate(-100%, -100%);
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 1440px) {
  .sakumap {
    .sec-1 {
      .opener {
        top: 5%;
        width: calc(30em * 2.2);
        p {
          font-size: 2.2rem;
        }
      }
    }
    .sec-2 {
      .map-wrapper {
        .player {
          height: 270px;

          &.full {
            height: 100%;
          }
        }
      }
    }
  }
}
</style>