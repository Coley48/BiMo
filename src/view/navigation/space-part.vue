<template>
  <div class="container">
    <div class="content">
      <div class="header">
        <h3 class="title">space part</h3>
      </div>
      <div
        class="comments-list"
        @scroll.stop="!noMore && iShowMore()"
        v-loading="loading"
      >
        <comment-item
          v-for="item of list"
          :key="item.id"
          :item="item"
          :class="showArrow(item.uid)"
          @setTarget="setTarget"
          @resetTarget="resetTarget"
        ></comment-item>
        <div class="no-comments" v-if="this.list.length == 0">
          来留下第一条评论，成为第一人吧！
        </div>
        <div class="no-more-comments" v-else>
          {{ noMore ? "没有更多了！" : "正在加载..." }}
        </div>
      </div>
      <div class="footer">
        <div class="control">
          <div class="ipt-wrap">
            <el-input
              class="target-ipt"
              placeholder="评论或回复"
              v-model="target.username"
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
        <div class="content-textarea">
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

let ArrowPoint = 0;
export default {
  data() {
    return {
      target: {
        cid: -1,
        username: "",
      },
      content: "",
      list: [],
      page: 1,
      limit: 5,
      loading: true,
      noMore: false,
      timer: null,
    };
  },
  computed: {
    isReply() {
      return this.target.cid !== -1;
    },
    ...mapState({
      userinfo: (state) => state.userinfo,
    }),
  },
  components: {
    commentItem,
  },
  methods: {
    showArrow(uid) {
      if (ArrowPoint === uid) {
        return uid % 2 === 0 ? "left-arrow" : "right-arrow";
      } else {
        ArrowPoint = uid;
        return uid % 2 === 0 ? "left-arrow" : "right-arrow";
      }
    },
    showMore() {
      let listElement = document.querySelector(".comments-list");
      if (
        listElement.clientHeight + listElement.scrollTop >
        listElement.scrollHeight - 80
      ) {
        console.log("get comments.");
        this.getComment(++this.page);
      }
    },
    iShowMore() {
      if (this.timer || this.noMore) {
        return;
      }
      this.timer = setTimeout(() => {
        this.timer = null;
        this.showMore();
      }, 250);
    },
    newComment() {
      // console.log(this.$store.state.userinfo);
      if (this.userinfo == null || sessionStorage.getItem("isLogin") == "") {
        this.showMessage("error", "你还没有登录！");
        return;
      }
      if (this.content == "") {
        this.showMessage("warning", "你还没有输入任何内容！");
        return;
      }
      let data = {
        uid: this.userinfo.id,
        username: this.userinfo.username,
        content: this.content,
        datetime: new Date().getTime(),
      };
      $.post("/api/post/comment", data, (res) => {
        if (res.code == 200) {
          data["avator"] = this.userinfo.avator;
          data["likes"] = 0;
          data["reply"] = 0;
          data["id"] = res.data;
          this.list.unshift(data);
        } else {
          this.showMessage("error", "评论失败，请稍候再试！");
        }
      });
    },
    getComment(page = 1) {
      $.get(`/api/get/comment?page=${page}&limit=${this.limit}`, (res) => {
        if (res.code == 200 && res.data.length != 0) {
          console.log(res.data);
          this.list.push(...res.data);
          this.loading = false;
        } else {
          this.noMore = true;
        }
      });
    },
    resetTarget() {
      this.target.username = "";
      this.target.cid = -1;
    },
    setTarget(tcid, tuser) {
      this.target.username = tuser;
      this.target.cid = tcid;
    },
    debounce(func, delay) {
      let timer;
      return function () {
        let context = this;
        let args = arguments;
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            func.apply(context, args);
          }, delay);
        }
      };
    },
  },
  mounted() {
    this.getComment();
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
  overflow: hidden;

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
      padding: 4.5rem 0.5rem 5rem;
      background-color: lightyellow;
      overflow: scroll;

      .no-comments,
      .no-more-comments {
        text-align: center;
        color: lightgray;
      }

      .no-more-comments {
        position: relative;
        padding: 0.5rem;

        &::before {
          content: "";
          position: absolute;
          bottom: 100%;
          margin-left: 15%;
          left: 0;
          display: block;
          width: 70%;
          height: 0.4px;
          background: lightgray;
        }
      }
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

      .content-textarea {
        max-height: 300px;
        overflow: scroll;
      }
    }
  }
}
</style>