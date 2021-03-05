<template>
  <div class="file-uploader">
    <div class="uploader-head">
      <h2>上传配置文件</h2>
    </div>
    <div class="uploader-body">
      <!-- controls -->
      <div id="uploader">
        <button class="btn btn-info select-file dz-clickable">
          <span>选择文件</span>
        </button>
        <button
          class="btn btn-primary start-upload"
          :disabled="disabled"
          @click="startUpload"
        >
          <span>开始上传</span>
        </button>
        <button class="btn btn-danger reset-file" @click="resetFile">
          <span>重置文件</span>
        </button>
      </div>

      <!-- preview -->
      <div class="table" id="previews">
        <div id="template" class="file-row">
          <div>
            <span class="preview">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-gear"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
                />
                <path
                  d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
                />
              </svg>
            </span>
          </div>
          <div>
            <p class="name" data-dz-name></p>
            <strong class="error text-danger" data-dz-errormessage></strong>
          </div>
          <div>
            <p class="size" data-dz-size></p>
          </div>
          <div class="progress">
            <div class="progress-bar" data-dz-uploadprogress>0%</div>
          </div>
          <div class="dz-remove" data-dz-remove>
            <a href="javascript:void">删除</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone from "dropzone";

export default {
  data() {
    return {
      fileUploader: null,
      disabled: true,
    };
  },
  methods: {
    startUpload() {
      this.fileUploader.enqueueFiles(
        this.fileUploader.getFilesWithStatus(Dropzone.ADDED)
      );
    },
    resetFile() {
      if (confirm("是否选择重置服务器上的配置文件？")) {
        this.fileUploader.removeAllFiles();
        $.get("/api/config?action=reset", (data) => {
          console.log(data);
        });
      }
    },
  },
  mounted() {
    let _this = this;
    let previewNode = document.querySelector("#template");
    previewNode.id = "";
    let previewTemplate = previewNode.parentNode.innerHTML;
    previewNode.parentNode.removeChild(previewNode);

    this.fileUploader = new Dropzone("#uploader", {
      url: "/api/config",
      maxFiles: 1,
      dictDefaultMessage: "点击或拖动上传图片",
      acceptedFiles: ".json",
      uploadMultipe: false,
      autoQueue: false,
      previewTemplate: previewTemplate,
      previewsContainer: "#previews",
      clickable: ".select-file",

      init: function () {
        this.on("reset", function (file) {
          _this.disabled = true;
        });
        this.on("addedfile", function (file) {
          if (this.files.length > 1) {
            this.removeFile(this.files[0]);
          }
          _this.disabled = false;
          $(".progress-bar").text("0%");
        });
        this.on("sending", function (file) {
          _this.disabled = true;
        });
        this.on("totaluploadprogress", function (progress) {
          $(".progress-bar").text(progress + "%");
        });
      },
    });
  },
};
</script>

<style lang="less" scoped>
.file-uploader {
  .uploader-head {
    padding: 0.2rem 0.5rem;

    h2 {
      margin-top: 1rem;
    }

    .upload {
      border-radius: 0.5rem;
      background-color: lightseagreen;
      border: none;
      font-size: 1.5rem;
      color: white;
      outline: none;
    }
  }

  .uploader-body {
    .table {
      display: table;

      .file-row {
        display: table-row;

        position: relative;
        z-index: 2;

        p {
          margin: 0;
        }

        & > div {
          display: table-cell;
          vertical-align: middle;
          padding: 0.5rem;
        }
      }
    }
  }
}

.btn {
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
  text-decoration: none;
  outline: none;

  &[disabled] {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.65;
    filter: alpha(opacity=65);
    -webkit-box-shadow: none;
    box-shadow: none;
  }
}

.btn-primary {
  color: #fff;
  background-color: #428bca;
  border-color: #357ebd;
  &:hover,
  &:focus,
  &:active {
    color: #fff;
    background-color: #3276b1;
    border-color: #285e8e;
  }

  &[disabled],
  &[disabled]:hover,
  &[disabled]:focus,
  &[disabled]:active {
    background-color: #428bca;
    border-color: #357ebd;
  }
}
.btn-info {
  color: #fff;
  background-color: #5bc0de;
  border-color: #46b8da;

  &:hover,
  &:focus,
  &:active {
    color: #fff;
    background-color: #39b3d7;
    border-color: #269abc;
  }

  &[disabled],
  &[disabled]:hover,
  &[disabled]:focus,
  &[disabled]:active {
    background-color: #5bc0de;
    border-color: #46b8da;
  }
}

.btn-danger {
  color: #fff;
  background-color: #d9534f;
  border-color: #d43f3a;

  &:hover,
  &:focus,
  &:active {
    color: #fff;
    background-color: #d2322d;
    border-color: #ac2925;
  }

  &[disabled],
  &[disabled]:hover,
  &[disabled]:focus,
  &[disabled]:active {
    background-color: #d9534f;
    border-color: #d43f3a;
  }
}
</style>