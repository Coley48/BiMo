<template>
  <div class="reply-item">
    <div class="reply-header">
      <el-avatar
        class="avator"
        :size="35"
        :src="item.avator"
        @error="errorHandler()"
      >
        <img src="@/assets/img/default-avator.jpg" />
      </el-avatar>
      <span class="user-info">{{ item.username }}</span>
      <span class="date-info">{{ toDatetime(item.datetime) }}</span>
    </div>
    <div class="reply-content">
      {{ item.content
      }}<span class="like-count"
        ><i
          :class="{ 'el-icon-star-off': !isLiked, 'el-icon-star-on': isLiked }"
          @click="likeReply(item.id)"
        ></i
        >{{ item.likes }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowReply: false,
      isLiked: false,
    };
  },
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
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
    likeReply() {
      if (!this.isLiked) {
        this.item.likes++;
        $.get(`/api/like/comment?target=reply&cid=${this.item.id}`, (res) => {
          console.log(res);
        });
      } else {
        this.item.likes--;
        $.get(
          `/api/dislike/comment?target=reply&cid=${this.item.id}`,
          (res) => {
            console.log(res);
          }
        );
      }
      this.isLiked = !this.isLiked;
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
.reply-item {
  i {
    cursor: pointer;
    margin-right: 0.25rem;
  }

  .reply-header {
    height: 35px;
    padding: 0 0.25rem;
    margin-bottom: 0.3rem;

    .avator {
      margin-right: 0.8rem;
    }
    span {
      line-height: 35px;
      float: left;
      &.date-info {
        float: right;
        padding: 0 0.4rem;
        font-style: italic;
        color: #555;
      }
    }
  }
  .reply-content {
    padding: 0.2rem 2.4rem 0.2rem 0.2rem;
    text-indent: 2em;
    .like-count {
      margin-right: -2rem;
      float: right;
    }
  }
}
</style>