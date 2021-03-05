<template>
  <section class="journey">
    <transition name="section">
      <div class="sec-1" v-show="isCoverShow">
        <!-- indicator -->
        <ul class="path-list">
          <li
            class="path-item"
            v-for="(item, idx) in imageList"
            :key="idx"
            @click="enterVideo(idx)"
            @click.once="isBackTopTipsShow = true"
          >
            <!-- tabindex="0" -->
            <!-- data-editable="text" -->
            <!-- :data-source="'journey.imageList[' + idx + '].title'" -->
            <img :src="item.imageSrc" alt="" draggable="false" />
            <h2 class="path-text">
              {{ item.title }}
            </h2>
          </li>
        </ul>
      </div>
    </transition>

    <transition>
      <div class="sec-2" v-show="!isCoverShow">
        <div
          class="trigger left-bottom animated"
          data-toggle="tips"
          data-content="点击返回视频导航"
          :class="backJourneyTopTipsState"
          @click="backTop"
          @click.once="closeBackTopTips"
        >
          <img :src="backTopIcon" alt="" />
        </div>

        <video-player :options="videoOptions" :callback="videoHandler" />
      </div>
    </transition>
  </section>
</template>

<script>
import VideoPlayer from "@/component/video-player.vue";
import { mapState } from "vuex";

export default {
  data() {
    this.$store.commit("setIndex", 1);
    return {
      index: 0,
      isCoverShow: true,
      backJourneyTopTipsState:
        localStorage.getItem("backJourneyTopTipsState") || "show",
      videoPlayer: null,
      videoOptions: {
        fill: true,
        controls: true,
        controlBar: { pictureInPictureToggle: false },
        sources: [
          {
            src: this.$store.state.journey.videoList[0],
            type: "video/mp4",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      backTopIcon: (state) => state.journey.backTopIcon,
      imageList: (state) => state.journey.imageList,
      videoList: (state) => state.journey.videoList,
    }),
  },
  components: {
    VideoPlayer,
  },
  methods: {
    backTop() {
      this.videoPlayer?.pause();
      this.isCoverShow = true;
    },
    enterVideo(i) {
      if (this.index !== i) {
        this.index = i;
        this.videoPlayer?.src(this.videoList[i]);
      }
      this.videoPlayer?.play();
      this.isCoverShow = false;
      this.$store.commit("hideNavbar");
    },
    videoHandler(player) {
      this.videoPlayer = player;
    },
    closeBackTopTips() {
      this.backJourneyTopTipsState = "hide";
      localStorage.setItem("backJourneyTopTipsState", "hide");
    },
  },
  mounted() {},
};
</script>

<style lang="less">
.journey {
  height: 100%;
  width: 100%;
  overflow: hidden;

  .path-list {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    background: url("../../assets/img/background.jpg") center no-repeat;
    background-size: cover;
    overflow: hidden;

    .path-item {
      position: relative;
      height: calc(100% / 3);
      width: 100%;
      transition: all 1s ease-in-out 0.5s;

      img {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: 100%;
        width: auto;
      }

      .path-text {
        position: absolute;
        top: 50%;
        left: 50%;
        color: white;
        font-size: 1.8rem;
        text-align: center;
        white-space: nowrap;
        transition: all 1s linear 0.5s;
        transform: translate(-50%, -50%);
      }
    }
  }

  .sec-2 {
    .trigger {
      top: 0;
      right: 0;
    }
  }
}

@media only screen and (min-width: 576px) {
  .journey {
    .path-list {
      overflow: hidden;

      .path-item {
        width: calc(100% / 3);
        height: 100%;
        display: inline-block;

        img {
          right: unset;
          bottom: unset;
        }

        .path-text {
          top: 40%;
          font-size: 1.7rem;
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) {
  .journey {
    .path-list {
      .path-item {
        &:nth-child(2),
        &:nth-child(3) {
          .path-text {
            color: #343a40;
          }
        }

        .path-text {
          font-size: 2rem;
        }
      }
    }
  }
}

@media only screen and (min-width: 1280px) {
  .journey {
    .path-list {
      overflow: hidden;

      &:hover li:not(:hover) {
        width: 20%;
      }

      .path-item {
        .path-text {
          top: 100%;
          opacity: 0;
          transform: translateX(-50%);
        }

        &:hover {
          width: 60%;

          .path-text {
            top: 30%;
            opacity: 1;
          }
        }
      }
    }
  }
}

.freeze {
}

@media only screen and (min-width: 1440px) {
  .journey {
    .path-list {
      .path-item {
        .path-text {
          font-size: 2.8rem;
        }
      }
    }
  }
}
</style>