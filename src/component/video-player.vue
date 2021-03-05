<template>
  <video ref="videoPlayer" class="video-js vjs-big-play-centered"></video>
</template>

<script>
import videojs from "video.js";

export default {
  name: "VideoPlayer",
  props: {
    callback: {
      type: Function,
      default() {
        return null;
      },
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  methods: {},
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log("onPlayerReady");
      }
    );

    // 刷新
    if (this.callback) {
      this.callback(this.player);
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>