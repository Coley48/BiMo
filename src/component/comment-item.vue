<template>
  <div class="comment-item" :data-id="item.id">
    <div class="comment-header">
      <el-avatar
        class="avator"
        :size="40"
        :src="item.avator"
        @error="errorHandler()"
      >
        <img src="@/assets/img/default-avator.jpg" />
      </el-avatar>
      <span class="user-info">{{ iUsername }}</span>
      <span class="date-info">{{ iDatetime }}</span>
    </div>
    <div class="comment-body">
      {{ item.content }}
    </div>
    <div class="comment-footer">
      <div class="control">
        <span class="thumb"
          ><i
            :class="{
              'el-icon-star-off': !isThumbUp,
              'el-icon-star-on': isThumbUp,
            }"
            @click="thumbUp()"
          ></i
          >{{ item.likes }}</span
        >
        <span class="reply"
          ><i
            :class="{
              'el-icon-chat-square': !isShowReply,
              'el-icon-chat-line-square': isShowReply,
            }"
            @click="showReply()"
          ></i
          >{{ item.reply }}</span
        >
        <span class="new-reply" @click="showReplyInput()">回复</span>
      </div>
      <div class="reply-wrap">
        <div
          class="reply-list"
          v-show="isShowReply && !noReply"
          v-loading="isLoading"
        >
          <reply-item
            v-for="(it, index) in replyList"
            :key="item.id + '-' + index"
            :item="it"
          ></reply-item>
          <div class="more-reply" v-if="hasMoreReply">
            <span @click="getReply()">加载更多</span>
          </div>
        </div>
        <div class="reply-input" v-show="isShowInput">
          <el-input
            type="text"
            v-model="replyContent"
            autocomplete="off"
            clearable
            placeholder="我的回复"
            prefix-icon="el-icon-edit"
            size="mini"
          >
            <template slot="append">
              <el-button class="reply-btn" size="mini" @click="newReply()"
                >评论</el-button
              >
            </template>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import replyItem from "./reply-item.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      rPage: 1,
      rLimit: 5,
      isLoading: true,
      isShowReply: false,
      isShowInput: false,
      isThumbUp: false,
      replyList: [],
      replyContent: "",
      mReply: 0,
    };
  },
  components: {
    replyItem,
  },
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    hasMoreReply() {
      return (this.rPage - 1) * this.rLimit + this.mReply < this.item.reply;
    },
    iUsername() {
      return this.item.username != "" ? this.item.username : "Author Unknown";
    },
    iDatetime() {
      return this.toDatetime(this.item.datetime);
    },
    noReply() {
      return this.item.reply == 0;
    },
    ...mapState({
      userinfo: (state) => state.userinfo,
    }),
  },
  methods: {
    // 时间戳转为时间差
    toDatetime(timestamp) {
      if (timestamp == 0) {
        return "1秒钟前";
      }
      let now = new Date();
      let past = new Date(timestamp);

      switch (0) {
        case 0:
          let year = now.getFullYear() - past.getFullYear();
          if (year > 0) {
            return year + "年前";
          }
        case 1:
          let month = now.getMonth() - past.getMonth();
          if (month > 0) {
            return month + "月前";
          }
        case 2:
          let day = now.getDate() - past.getDate();
          if (day > 0) {
            return day + "天前";
          }
        case 3:
          let hour = now.getHours() - past.getHours();
          if (hour > 0) {
            return hour + "小时前";
          }
        case 4:
          let minute = now.getMinutes() - past.getMinutes();
          if (minute > 0) {
            return minute + "分钟前";
          }
        default:
          let second = now.getSeconds() - past.getSeconds() + 1;
          return second + "秒钟前";
      }
    },
    errorHandler() {
      return true;
    },
    // 点赞评论
    thumbUp(e) {
      if (!this.loginCheck()) {
        return;
      }
      if (!this.isThumbUp) {
        this.item.likes++;
        $.get(`/api/like/comment?target=comment&cid=${this.item.id}`, (res) => {
          console.log(res);
        });
      } else {
        this.item.likes--;
        $.get(
          `/api/dislike/comment?target=comment&cid=${this.item.id}`,
          (res) => {
            console.log(res);
          }
        );
      }
      this.isThumbUp = !this.isThumbUp;
    },
    showReply() {
      if (!this.loginCheck()) {
        return;
      }
      if (this.isLoading) {
        this.getReply();
      }
      this.isShowReply = !this.isShowReply;
    },
    getReply() {
      if (!this.loginCheck()) {
        return;
      }
      if (this.hasMoreReply) {
        $.get(
          `/api/get/reply?page=${this.rPage++}&limit=${this.rLimit}&cid=${
            this.item.id
          }&start=${this.mReply}`,
          (res) => {
            this.replyList.push(...res.data);
            this.isLoading = false;
          }
        );
      } else if (this.noReply) {
        this.isShowInput = !this.isShowInput;
      }
    },
    showReplyInput() {
      if (!this.loginCheck()) {
        return;
      }
      this.isShowInput = !this.isShowInput;
    },
    newReply(e) {
      if (!this.loginCheck()) {
        return;
      }
      let data = {
        uid: this.userinfo.id,
        username: this.userinfo.username,
        content: this.replyContent,
        datetime: new Date().getTime(),
        cid: this.item.id,
      };
      $.post("/api/post/reply", data, (res) => {
        console.log(res);
        this.mReply++;
        this.replyContent = "";
        this.isShowReply = true;
        this.item.reply++;
        data.likes = 0;
        data.id = res.data;
        data.avator = this.userinfo.avator;
        this.replyList.unshift(data);
      });
    },
    loginCheck() {
      if (this.userinfo == null || sessionStorage.getItem("isLogin") == "") {
        this.showMessage("error", "你还没有登录！");
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="less" scoped>
.comment-item {
  width: 100%;
  background: lightcoral;
  padding: 0.5rem;
  border-radius: 0.5rem;
  position: relative;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  i {
    cursor: pointer;
    margin-right: 0.25rem;
  }

  .comment-header {
    height: 40px;
    padding: 0 0.25rem;
    margin-bottom: 0.3rem;

    .avator {
      margin-right: 0.8rem;
    }
    span {
      line-height: 40px;
      float: left;

      &:last-child {
        float: right;
        font-style: italic;
        color: #555;
      }
    }
  }
  .comment-body {
    text-indent: 2em;
  }

  .comment-footer {
    .control {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      span {
        padding: 0.2rem 0.4rem;
      }

      .new-reply {
        cursor: pointer;
        transition: 0.5s;
        &:hover {
          color: lightseagreen;
        }
      }
    }

    .reply-wrap {
      border-radius: 0.4rem;
      background: lightgray;
      transition: 1s;
      margin-left: 1.5rem;
      .reply-list {
        padding: 0.25rem;
      }

      .more-reply {
        text-align: center;
        span {
          cursor: pointer;
        }
      }

      .reply-input {
        .reply-btn {
          transition: 0.5s;
          &:hover {
            color: white;
            background: lightskyblue;
          }
        }
        // display: flex;
        // justify-content: centerr;
      }
    }
  }

  &::before {
    opacity: 0;
    position: absolute;
    top: 100%;
    left: 0;
    content: "";
    display: inline-block;
    height: 0;
    width: 0;
    border: 0.5em solid transparent;
    border-left-color: lightcoral;
    border-width: 0.5rem 0.6rem;
    transform: translate(0, -50%);
  }

  &::after {
    opacity: 0;
    position: absolute;
    top: 100%;
    right: 0;
    content: "";
    display: inline-block;
    height: 0;
    width: 0;
    border: 0.5em solid transparent;
    border-right-color: lightcoral;
    border-width: 0.5rem 0.6rem;
    transform: translate(0, -50%);
  }

  &.left-arrow::before {
    opacity: 1;
  }
  &.right-arrow::after {
    opacity: 1;
  }
}
</style>