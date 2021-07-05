<template>
  <div class="comment-item" :data-id="item.cid">
    <div class="comment-header">
      <el-avatar
        class="avator"
        :size="40"
        :src="item.avator"
        @error="errorHandler"
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
      <span class="thumb"
        ><i class="el-icon-star-off" @click="thumbUp($event)"></i
        >{{ item.thumb }}</span
      >
      <span class="reply"
        ><i class="el-icon-chat-line-square" @click="replyTo"></i
        >{{ item.reply }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          cid: 0,
          avator: "",
          username: "",
          datetime: "",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa veritatis molestias impedit inventore sapiente similique iure deserunt tempore, quas suscipit nobis qui repellendus temporibus, dolorum, possimus ipsam. Obcaecati, sed aliquid.",
          thumb: 0,
          reply: 0,
        };
      },
    },
  },
  computed: {
    iUsername() {
      return this.item.username != "" ? this.item.username : "Author Unknown";
    },
    iDatetime() {
      return this.item.datetime != "" ? this.item.datetime : "";
    },
  },
  methods: {
    errorHandler() {
      return true;
    },
    thumbUp(e) {
      if (e.target.className == "el-icon-star-off") {
        e.target.className = "el-icon-star-on";
        this.item.thumb++;
      } else {
        e.target.className = "el-icon-star-off";
        this.item.thumb--;
      }
    },
    replyTo() {
      this.$emit("replyTo", this.item.cid, this.item.username);
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
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .thumb,
    .reply {
      padding: 0.2rem 0.4rem;

      i {
        cursor: pointer;
        margin-right: 0.25rem;
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