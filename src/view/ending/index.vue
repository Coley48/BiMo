<template>
  <section class="ending">
    <transition name="section">
      <div class="sec-1" v-show="isCoverShow">
        <div class="cover">
          <div class="opener" @click="enter">
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
        <video-player
          :options="videoOptions"
          :callback="videoHandler"
        ></video-player>
      </div>
    </transition>
  </section>
</template>

<script>
import VideoPlayer from "@/component/video-player";
import { mapState } from "vuex";

export default {
  data() {
    this.$store.commit("setIndex", 5);
    return {
      isCoverShow: true,
      videoPlayer: null,
      videoOptions: {
        fill: true,
        controls: true,
        controlBar: { pictureInPictureToggle: false },
        sources: [
          {
            src: this.$store.state.ending.videoSrc,
            type: "video/mp4",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      poemList: (state) => state.ending.poemList,
    }),
  },
  methods: {
    getDataSource(index) {
      return `dictation.poemList[${index}]`;
    },
    enter() {
      this.isCoverShow = false;
      this.videoPlayer?.play();
      this.$store.commit("hideNavbar");
    },
    videoHandler(player) {
      this.videoPlayer = player;
    },
  },
  mounted() {
    this.player = document.querySelector(".sakumap .player");
  },
  components: {
    VideoPlayer,
  },
};
</script>

<style lang="less" scoped>
.ending {
  .sec-1 {
    background: url("../../assets/img/ending/background.jpg") center no-repeat;
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
        font-size: 1.2rem;
        color: white;
        margin: 0;
      }
    }
  }
}

@media only screen and (min-width: 768px) {
  .ending {
    .sec-1 {
      .opener {
        padding: 1.5rem;

        p {
          font-size: 1.4rem;
        }
      }
    }
  }
}

@media only screen and (min-width: 1280px) {
  .ending {
    .sec-1 {
      .opener {
        writing-mode: unset;
        left: 10%;
        top: 50%;
        padding: 1rem;
        transform: translate(0, -50%);
        writing-mode: unset;

        p {
          font-size: 1.8rem;
        }
      }
    }
  }
}

@media only screen and (min-width: 1440px) {
  .ending {
    .sec-1 {
      .opener {
        p {
          font-size: 2.2rem;
        }
      }
    }
  }
}
</style>