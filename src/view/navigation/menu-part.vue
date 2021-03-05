<template>
  <div class="menu list-group-wrap" @click="hideMenu">
    <div class="list-group">
      <span class="list-item">章节目录</span>
      <router-link
        class="list-item"
        v-for="(item, idx) in menuItem"
        :key="idx"
        :to="chapters[idx]"
        :class="{ active: currentIndex === idx }"
        draggable="false"
      >
        {{ item }}
      </router-link>
    </div>
  </div>
</template>

<script>
require("@/component/list-group");
import { mapState } from "vuex";

export default {
  data() {
    return {
      menuItem: [
        "引导",
        "探索旅途",
        "毕摩仪式",
        "毕摩口述",
        "洒库全景",
        "终章",
      ],
    };
  },
  computed: {
    ...mapState({
      currentIndex: "currentIndex",
      chapters: "chapters",
    }),
  },
  methods: {
    hideMenu() {
      this.$emit("close");
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.menu {
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 3.125rem;
  text-align: center;
  z-index: 100;
}

@media only screen and (min-width: 768px) {
  .menu {
    padding-left: 3.75rem;
    text-align: left;

    .list-group {
      width: 30%;
    }
  }
}

@media only screen and (min-width: 1024px) {
  .menu {
    .list-group {
      width: 20%;
      max-width: 300px;
    }
  }
}
</style>