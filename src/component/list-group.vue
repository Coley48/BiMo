<template>
  <div class="list-group-wrap" @click="click()" v-if="title">
    <ul class="list-group">
      <li>{{ title }}</li>
      <li
        v-for="(item, idx) in list"
        :key="idx"
        :class="{ active: index === idx }"
        @click="active(idx)"
      >
        {{ item }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    index: {
      type: Number,
      default: () => -1,
    },
    title: {
      type: String,
      default: () => "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    callback: {
      type: Function,
      default() {
        return null;
      },
    },
  },
  methods: {
    click() {
      this.$emit("click");
    },
    active(idx, time) {
      this.$emit("active", idx, time);
    },
  },
  mounted() {
    if (this.callback) {
      this.callback();
    }
  },
};
</script>

<style lang="less">
@background: #343a40;
@active-bg: #1d2124;

.list-group-wrap {
  height: 100%;
  width: 100%;
  transition: all 0.5s ease-in-out;
}
.list-group {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: scroll;
  background: @background;

  li,
  .list-item {
    color: rgba(255, 255, 255, 0.5);
    padding: 0.75rem 1.25rem;
    cursor: pointer;
    border-top: 1px solid rgba(0, 0, 0, 0.125);
    text-decoration: none;

    &:hover,
    &.active {
      background-color: @active-bg;
      border-color: @active-bg;
      color: #fff;
    }

    &:first-child {
      position: sticky;
      top: 0;
      left: 0;
      pointer-events: none;
      border-top-width: 0;
      color: #6c757d !important;
      background-color: @background !important;
    }
  }
}
</style>