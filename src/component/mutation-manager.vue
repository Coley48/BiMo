<template>
  <div class="mutation-manager">
    <div class="header">
      <h2>提交更新</h2>
      <div>
        <button class="start-upload" @click="startUpload">开始上传</button>
      </div>
    </div>
    <div class="main" v-if="mutationArrLength !== 0">
      <div class="table" v-for="item in mutationArr" :key="item[0]">
        <div>
          <span class="preview">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-pin"
              viewBox="0 0 16 16"
            >
              <path
                d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408l-.002-.001zm-.002-.001l.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282z"
              />
            </svg>
          </span>
        </div>
        <div class="key">{{ item[0] }}</div>
        <div class="value">{{ item[1] }}</div>
        <div class="remove" @click="delMutation(item[0])">删除</div>
      </div>
    </div>
    <div v-else>页面上更改的内容将保存在这里，当前没有更改的内容！</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["mutationArr"]),
    mutationArrLength() {
      return this.mutationArr.length;
    },
  },
  methods: {
    delMutation(key) {
      this.$store.commit("delMutation", key);
    },
    startUpload() {
      this.$store.dispatch("updateAndUploadData");
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.mutation-manager {
  .header {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem 0.5rem;
    margin-top: 1rem;

    .start-upload {
      border-radius: 0.5rem;
      background-color: #f0ad4e;
      border-color: #eea236;
      //   border: none;
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
        background-color: #ed9c28;
        border-color: #d58512;
      }

      &[disabled] {
        pointer-events: none;
        cursor: not-allowed;
        background-color: #f0ad4e;
        border-color: #eea236;
      }
    }
  }
  .main {
    width: 100%;

    .table {
      width: 100%;

      &:nth-child(odd) {
        background: whitesmoke;
      }

      & > div {
        display: inline-block;
        vertical-align: middle;
        padding: 0.5rem;
      }

      .key {
        width: 20%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .value {
        width: 50%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .remove {
        color: #007bff;
        cursor: pointer;
        float: right;

        &:hover {
          color: #0056b3;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>