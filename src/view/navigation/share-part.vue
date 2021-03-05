<template>
  <div class="share">
    <div class="container">
      <div class="header">
        <svg
          t="1601600988087"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5502"
          width="36"
          height="36"
          fill="currentColor"
        >
          <path
            d="M665.6 199.66976l0 624.64c0 4.01408-2.34496 7.63904-5.98016 9.30816-1.36192 0.63488-2.816 0.93184-4.25984 0.93184-2.4064 0-4.80256-0.84992-6.69696-2.48832L486.4 691.9168 324.13696 832.06144c-3.04128 2.63168-7.3216 3.24608-10.9568 1.55648C309.54496 831.9488 307.2 828.32384 307.2 824.30976l0-624.64c0-5.66272 4.57728-10.24 10.24-10.24l337.92 0C661.02272 189.42976 665.6 194.00704 665.6 199.66976z"
            p-id="5503"
          ></path>
        </svg>
        <p>
          {{ hintText }}
        </p>
      </div>

      <div class="icon-group" v-for="(group, idx) in iconGroup" :key="idx">
        <a
          class="icon"
          v-for="item in group"
          :key="item.desc"
          :href="item.url"
          :class="item.name"
          target="_blank"
        >
        </a>
      </div>

      <div class="cancel" @click="close">完成</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      hintText: (state) => state.navigation.share.hintText,
      iconGroup: (state) => state.navigation.share.iconGroup,
    }),
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="less" scoped>
@icon-size: 6rem;
@bg-width: 300px;

.share {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 360px;
    height: 300px;
    transition: all 0.5s ease-in-out;
    background-color: whitesmoke;
    font-weight: lighter;
    border-radius: 0.3rem;
    text-align: center;
  }

  .header {
    position: relative;
    width: 100%;
    height: 24%;

    svg {
      position: absolute;
      top: 0;
      left: 0;
      color: lightcoral;
      transform: translateY(-30%);
    }

    p {
      line-height: calc(300px * 0.24);
    }
  }

  .icon-group {
    width: 100%;
    height: 28%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.8rem;

    a {
      height: @icon-size;
      width: @icon-size;
      display: inline-block;
      color: black;
      text-decoration: none;
      cursor: pointer;
      background: url("../../assets/img/icon/share.png") no-repeat;
      background-size: @bg-width auto;

      &.zone {
        background-position: -100px 0;
      }
      &.weichat {
        background-position: -200px 0;
      }
      &.weibo {
        background-position: 0 -80px;
      }
      &.circle {
        background-position: -100px -80px;
      }
      &.copy {
        background-position: -200px -80px;
      }
    }
  }

  .cancel {
    height: 14%;
    margin-top: 5%;
    padding: 2% 0;
    border-radius: 5px;
    cursor: pointer;
    border-top: 0.5px solid lightgray;
    transition: all 0.5s ease-in-out;

    &:hover {
      color: lightcoral;
    }
  }
}
</style>