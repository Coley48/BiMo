<template>
  <div class="image-uploader">
    <div class="header">
      <h2>上传图片</h2>
      <div>
        <button class="start-upload" :disabled="disabled" @click="startUpload">
          开始上传
        </button>
      </div>
    </div>
    <div class="body">
      <form class="dropzone needsclick dz-clickable" ref="imageUploader">
        <div class="dz-message needsclick">
          <button type="button" class="dz-button">
            通过拖放文件或者点击选择文件上传</button
          ><br />
          <span class="note needsclick"
            >Drop files here or click to upload.</span
          >
        </div>
        <div class="fallback">
          <input name="file" type="file" multiple />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Dropzone from "dropzone";

export default {
  data() {
    return {
      imageUploader: null,
      disabled: true,
    };
  },
  methods: {
    startUpload() {
      this.imageUploader.enqueueFiles(
        this.imageUploader.getFilesWithStatus(Dropzone.ADDED)
      );
      // autoProcessQueue -> processQueue()
    },
  },
  mounted() {
    let _this = this;

    this.imageUploader = new Dropzone(this.$refs.imageUploader, {
      url: "/api/upload",
      maxFiles: 10,
      parallelUploads: 5,
      dictDefaultMessage: "点击或拖动上传图片",
      acceptedFiles: "image/*",
      uploadMultipe: true,
      addRemoveLinks: true,
      dictRemoveFile: "删除",
      autoQueue: false,
      init: function () {
        this.on("removedfile", function (file) {
          console.log(file);
          if (file.status === "success") {
            $.get("/api/delete?target=" + file.name, (resp) => {
              console.log(resp);
            });
          }
        });
        this.on("addedfile", function (file) {
          _this.disabled = false;
        });
        this.on("reset", function (file) {
          _this.disabled = true;
        });
        this.on("sending", function (file) {
          _this.disabled = true;
        });
      },
    });
  },
};
</script>

<style src="@/assets/css/dropzone.min.css"></style>
<style src="@/assets/css/basic.css"></style>
<style lang="less" scoped>
.image-uploader {
  .header {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem 0.5rem;

    .start-upload {
      border-radius: 0.5rem;
      background-color: lightseagreen;
      border: none;
      color: white;
      outline: none;
      display: inline-block;
      margin-bottom: 0;
      font-weight: 400;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;
      background-image: none;
      border: 1px solid transparent;
      white-space: nowrap;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.42857143;
      border-radius: 4px;
      user-select: none;

      &:active,
      &:focus,
      &:hover {
        background-color: #20a29b;
      }

      &[disabled] {
        background-color: #25c3bb;
        pointer-events: none;
        cursor: not-allowed;
      }
    }
  }
}
</style>