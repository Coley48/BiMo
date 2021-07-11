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
          ><i class="el-icon-star-off" @click="thumbUp($event)"></i
          >{{ item.likes }}</span
        >
        <span class="reply"
          ><i class="el-icon-chat-square" @click="showReply($event)"></i
          >{{ item.reply }}</span
        >
        <span class="new-reply" @click="newReply($event)">回复</span>
      </div>
      <div class="reply-list" v-if="isShowReply" v-loading="iLoading">
        <div
          class="reply-item"
          v-for="(it, index) in replyList"
          :key="item.id + '-' + index"
        >
          <div class="reply-header">
            <el-avatar
              class="avator"
              :size="40"
              :src="it.avator"
              @error="errorHandler()"
            >
              <img src="@/assets/img/default-avator.jpg" />
            </el-avatar>
            <span class="user-info">{{ it.username }}</span>
            <span class="date-info">{{ toDatetime(it.datetime) }}</span>
            <span class="thumb"
              ><i class="el-icon-star-off"></i>{{ it.likes }}</span
            >
            <span class="reply"><i class="el-icon-chat-square"></i>艾特</span>
          </div>
          <div class="reply-content">{{ it.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowReply: true,
      iPage: 1,
      iLimit: 10,
      iLoading: false,
      replyList: [
        {
          id: 1,
          username: "test",
          datetime: 1625989919981,
          content: "这是测试回复；",
          likes: 0,
          uid: 8,
          avator: "",
          cid: 14,
        },
      ],
    };
  },
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    iUsername() {
      return this.item.username != "" ? this.item.username : "Author Unknown";
    },
    iDatetime() {
      return this.toDatetime(this.item.datetime);
    },
  },
  methods: {
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
    thumbUp(e) {
      if (e.target.className == "el-icon-star-off") {
        e.target.className = "el-icon-star-on";
        this.item.likes++;
        $.get(`/api/like/comment?target=comment&cid=${this.item.id}`, (res) => {
          console.log(res);
        });
      } else {
        e.target.className = "el-icon-star-off";
        this.item.likes--;
        $.get(
          `/api/dislike/comment?target=comment&cid=${this.item.id}`,
          (res) => {
            console.log(res);
          }
        );
      }
    },
    showReply(e) {
      if (e.target.className == "el-icon-chat-square") {
        $.get(`/api/get/reply?page=1&limit=10&cid=${this.item.id}`, (res) => {
          console.log(res);
          this.isShowReply = true;
          this.iLoading = false;
        });
        e.target.className = "el-icon-chat-line-square";
      } else {
        e.target.className = "el-icon-chat-square";
      }
    },
    newReply(e) {
      if (e.target.className == "") {
        this.$emit("newReply", this.item.cid, this.item.username);
        e.target.className = "el-icon-chat-line-square";
      } else {
        this.$emit("resetTarget");
        e.target.className = "el-icon-chat-square";
      }
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

        i {
          cursor: pointer;
          margin-right: 0.25rem;
        }
      }

      .new-reply {
        cursor: pointer;
        transition: 0.5s;
        &:hover {
          color: lightseagreen;
        }
      }
    }

    .reply-list {
      background: lightgray;
      transition: 0.5s;
      margin-left: 1.5rem;

      .reply-item {
        span {
          display: inline-block;
          line-height: 40px;
          padding: 0 4px;
        }
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