<template>
  <div class="earth">
    <div class="container">
      <video-player :options="videoOptions"></video-player>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "@/component/video-player.vue";

export default {
  data() {
    return {
      videoOptions: {
        fill: true,
        controls: true,
        muted: true,
        autoplay: true,
        controlBar: { pictureInPictureToggle: false, volumePanel: false },
        sources: [
          {
            src: this.$store.state.navigation.earth.videoSrc,
            type: "video/mp4",
          },
        ],
      },
    };
  },
  components: {
    VideoPlayer,
  },
};
</script>

<style lang="less" scoped>
.earth {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;

  .container {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>