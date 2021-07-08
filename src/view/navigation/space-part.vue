<template>
  <div class="container">
    <div class="content">
      <div class="header">
        <h3 class="title">space part</h3>
      </div>
      <div class="comments-list" v-loading="loading">
        <comment-item
          v-for="item of list"
          :key="item.cid"
          :item="item"
          :class="showArrow(item.cid)"
          @replyTo="setTarget"
          @reset="resetTarget"
        ></comment-item>
      </div>
      <div class="footer">
        <div class="control">
          <div>
            <el-input
              class="target-ipt"
              placeholder="评论或回复"
              v-model="target"
              clearable
              size="mini"
              disabled
              v-show="isReply"
            >
              <template slot="prepend">@</template>
            </el-input>
          </div>
          <div class="btn-group">
            <el-button
              class="reset-btn"
              type="warning"
              size="mini"
              @click="resetTarget"
              v-show="isReply"
              >重置</el-button
            >
            <el-button
              class="submit-btn"
              type="primary"
              size="mini"
              @click="newComment"
              >{{ isReply ? "回复" : "评论" }}</el-button
            >
          </div>
        </div>
        <div>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="content"
            maxlength="100"
            autosize
            show-word-limit
          >
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commentItem from "../../component/comment-item.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      target: "",
      target_cid: -1,
      content: "",
      list: [],
      page: 1,
      limit: 10,
      loading: true,
    };
  },
  computed: {
    isReply() {
      return this.target !== "";
    },
    ...mapState({
      userinfo: (state) => state.userinfo,
    }),
  },
  components: {
    commentItem,
  },
  methods: {
    showArrow(n) {
      return n % 2 === 0 ? "left-arrow" : "right-arrow";
    },
    newComment() {
      // console.log(this.$store.state.userinfo);
      if (this.userinfo == null || sessionStorage.getItem("isLogin") == "") {
        this.showMessage("error", "你还没有登录！");
        return;
      }
      if (this.content == "") {
        this.showMessage("warning", "你还没有输入任何内容");
        return;
      }
      $.post("/api/post/comment", {
        uid: this.userinfo.id,
        username: this.userinfo.username,
        content: this.content,
        datetime: new Date().getTime(),
      });
    },
    resetTarget() {
      this.target = "";
      this.target_cid = -1;
    },
    setTarget(tcid, tuser) {
      this.target = tuser;
      this.target_cid = tcid;
    },
  },
  mounted() {
    $.get(`/api/get/comment?page=${this.page}&limit=${this.limit}`, (res) => {
      console.log(res);
      if (res.code == 200) {
        this.list = res.data;
        this.loading = false;
      } else {
        console.log(res.info);
      }
    });
  },
};
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    width: 80%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .header {
      text-align: center;
      font-size: 2rem;
      width: 100%;
      background: lightgray;
      position: absolute;
      top: 0;
      line-height: 4rem;
      height: 4rem;
      z-index: 2110;
    }
    .comments-list {
      width: 100%;
      height: 100%;
      padding: 4.5rem 0.5rem;
      background-color: lightyellow;
      overflow: scroll;
    }
    .footer {
      width: 100%;
      background: lightcyan;
      position: absolute;
      bottom: 0;
      padding: 0.5rem;
      .control {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      .target-ipt {
        width: auto;
      }
    }
  }
}
</style>