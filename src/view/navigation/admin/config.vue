<template>
  <div class="config">
    <image-uploader></image-uploader>
    <file-uploader></file-uploader>
    <mutation-manager></mutation-manager>
  </div>
</template>

<script>
import imageUploader from "@/component/image-uploader";
import fileUploader from "@/component/file-uploader";
import mutationManager from "@/component/mutation-manager";

export default {
  data() {
    return {};
  },

  components: {
    imageUploader,
    fileUploader,
    mutationManager,
  },
};
</script>

<style lang="less" scoped>
.config {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>