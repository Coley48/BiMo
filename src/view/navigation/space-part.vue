<template>
  <div class="container">
    <div class="content">
      <div class="header">
        <h3 class="title">space part</h3>
      </div>
      <div
        class="comments-list"
        :class="{ 'padding-bottom': isShowCommentInput }"
        @scroll.stop="!noMore && iShowMore()"
        v-loading="loading"
      >
        <comment-item
          v-for="item of list"
          :key="item.id"
          :item="item"
          :class="showArrow(item.uid)"
        ></comment-item>
        <div class="no-comments" v-if="this.list.length == 0">
          来留下第一条评论，成为第一人吧！
        </div>
        <div class="no-more-comments" v-else>
          {{ noMore ? "没有更多了！" : "正在加载..." }}
        </div>
      </div>
      <div class="footer" v-show="isShowCommentInput">
        <div class="control">
          <el-button
            class="submit-btn"
            type="primary"
            size="mini"
            @click="newComment"
            >评论</el-button
          >
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
    <div class="comment-starter" @click="showCommentInput()">
      <span v-if="!isShowCommentInput">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-brush"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z"
          />
        </svg>
      </span>
      <span v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-brush-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04z"
          />
        </svg>
      </span>
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
      content: "",
      list: [],
      page: 1,
      limit: 10,
      loading: true,
      noMore: false,
      timer: null,
      isShowCommentInput: false,
    };
  },
  computed: {
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
        listElement.scrollHeight - 100
      ) {
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
          data.avator = this.userinfo.avator;
          data.likes = 0;
          data.reply = 0;
          data.id = res.data;
          this.list.unshift(data);
        } else {
          this.showMessage("error", "评论失败，请稍候再试！");
        }
      });
    },
    getComment(page = 1) {
      $.get(`/api/get/comment?page=${page}&limit=${this.limit}`, (res) => {
        if (res.code == 200 && res.data.length != 0) {
          this.list.push(...res.data);
          this.loading = false;
        } else {
          this.noMore = true;
        }
      });
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
    showCommentInput() {
      this.isShowCommentInput = !this.isShowCommentInput;
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
    width: 50%;
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
      padding: 4.5rem 0.5rem 0;
      background-color: lightyellow;
      overflow: scroll;

      &.padding-bottom {
        padding-bottom: 5rem;
      }

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
        justify-content: flex-end;
        margin-bottom: 10px;
      }

      .content-textarea {
        max-height: 300px;
        overflow: scroll;
      }
    }
  }

  .comment-starter {
    position: absolute;
    bottom: 0.4rem;
    right: 0.4rem;

    span {
      padding: 0.8rem;
      background: white;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>