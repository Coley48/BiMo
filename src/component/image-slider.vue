<template>
  <div class="image-slider-wrap">
    <ul class="image-slider" ref="imageSlider">
      <li v-for="(item, idx) in list" :key="idx" :data-index="idx">
        <img :src="item.origin" alt="" @click="display($event, idx)" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slider: null,
      median: 3,
    };
  },
  props: {
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
    display($event, i) {
      let number = this.slider.find("img").index($event.target);

      if (number < this.median) {
        this.slider.slide(-1);
      } else if (number == this.median) {
        this.$emit("display", i);
      } else {
        this.slider.slide(1);
      }
    },
  },
  mounted() {
    this.slider = $(this.$refs.imageSlider);

    this.slider.slide = function (n) {
      if (n < 0) {
        while (n++ < 0) {
          this.prepend(this.children(":last"));
        }
      } else {
        while (n-- > 0) {
          this.append(this.children(":first"));
        }
      }
    };

    if (this.callback) {
      this.callback(this.slider);
    }
  },
};
</script>

<style lang="less" scoped>
.image-slider-wrap {
  position: relative;
  height: 100%;
  width: 100%;
  .image-slider {
    width: 100%;
    height: 100%;
    padding: 2rem 0;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 100% 0 0 100%;
    overflow: hidden;

    li {
      position: absolute;
      right: 0.5rem;
      padding: 0 1.5rem 0 2.5rem;
      cursor: pointer;
      transform-style: preserve-3d;
      transition: all 0.8s ease-in-out;

      img {
        width: 100%;
        height: auto;
      }

      &:nth-child(1) {
        top: 0;
        opacity: 0;
        transform: translate(25%, -100%) scale(0.5);
      }
      &:nth-child(2) {
        top: 15%;
        opacity: 0.5;
        transform: translate(18%, -50%) scale(0.64);
      }
      &:nth-child(3) {
        top: 30%;
        opacity: 0.8;
        z-index: 2;
        transform: translate(9%, -50%) scale(0.82);
      }
      &:nth-child(4) {
        top: 50%;
        opacity: 1;
        z-index: 3;
        transform: translate(0, -50%) scale(1);
      }
      &:nth-child(5) {
        top: 70%;
        opacity: 0.8;
        z-index: 2;
        transform: translate(9%, -50%) scale(0.82);
      }
      &:nth-child(6) {
        top: 85%;
        opacity: 0.5;
        transform: translate(18%, -50%) scale(0.64);

        & ~ li {
          top: 100%;
          opacity: 0;
        }
      }
    }
  }
  &.shake {
    li:nth-child(4) img {
      animation: image-shake 1s ease-in-out 0.8s infinite both;
    }
  }
}

@keyframes image-shake {
  50% {
    transform: translateX(-1%);
  }
}
</style>