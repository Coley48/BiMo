<template>
  <section class="introduce">
    <div class="container">
      <h2 class="title">影像结构</h2>

      <list
        class="journey-wrap"
        :item="journey"
        @mouseenter.native="playAudio"
        @mouseover.native.once="counting"
      ></list>
      <list
        class="ceremony-wrap"
        :item="ceremony"
        @mouseenter.native="playAudio"
        @mouseover.native.once="counting"
      ></list>
      <box
        class="dictation-wrap"
        :item="dictation"
        @mouseenter.native="playAudio"
        @mouseover.native.once="counting"
      ></box>
      <box
        class="sakumap-wrap"
        :item="sakumap"
        @mouseenter.native="playAudio"
        @mouseover.native.once="counting"
      ></box>
    </div>

    <div class="bottom-slide-tips">
      <div
        class="right-top animated"
        data-toggle="tips"
        data-content="下滑开启探索之旅"
        :class="bottomTipsState"
      ></div>
    </div>
  </section>
</template>

<script>
import list from "./list";
import box from "./box";

export default {
  data() {
    this.$store.commit("setIndex", 0);
    return {
      counter: 0,
      bottomTipsState: localStorage.getItem("bottomTipsState"),
      journey: {
        images: [
          "/image/introduce/train.png",
          "/image/introduce/bus.png",
          "/image/introduce/car.png",
        ],
        title: "探索旅途",
        content:
          "本次探索路途分为三段，我将带领你从四川省会成都出发，一路前往大凉山方向。",
      },
      ceremony: {
        images: [
          "/image/introduce/purify.png",
          "/image/introduce/bename.png",
          "/image/introduce/pray.png",
        ],
        title: "毕摩仪式",
        content:
          "我们将跟随我的父亲一起，观看驱秽、新生儿起名、祈福三种仪式。影像中，你可以了解到仪式核心环节和关键要素。",
      },
      dictation: {
        image: "/image/introduce/dictation.png",
        title: "毕摩口述",
        content:
          "为什么彝族人民相信鬼神，认为自然界中的鬼神操纵影响着人们的生活？来听听毕摩的口述，你应该可以找到答案。",
      },
      sakumap: {
        image: "/image/introduce/sakumap.png",
        title: "洒库全景",
        content:
          "你想了解更多彝族人民日常生活的真实写照吗？这里为你准备了很多。",
      },
    };
  },
  computed: {},
  methods: {
    playAudio() {
      this.$store.commit("playClickAudio");
    },
    counting() {
      if (
        localStorage.getItem("bottomTipsState") === null &&
        ++this.counter >= 4
      ) {
        setTimeout(() => {
          this.bottomTipsState = "show";
        }, 2000);

        setTimeout(() => {
          this.bottomTipsState = "hide";
          localStorage.setItem("bottomTipsState", "hide");
        }, 1500);
      }
    },
  },
  components: {
    list,
    box,
  },
  mounted() {},
};
</script>

<style lang="less">
@color: #ebd8d1;

.introduce {
  width: 100%;
  height: 100%;

  .container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 10% 0;
    color: @color;

    .title {
      position: fixed;
      top: 50%;
      left: 12%;
      transform: translateY(-50%);
      writing-mode: vertical-rl;
      font-size: 2rem;
    }

    img {
      width: auto;
      height: 120px;
      cursor: grab;
      transition: all 0.5s ease-in-out;
    }

    ul,
    div {
      padding: 0;
      margin: 0;

      li {
        text-align: center;
        transition: all 0.8s ease-in-out;
      }

      &:hover {
        &::before {
          content: attr(data-title);
          position: absolute;
          top: 50%;
          right: 12%;
          font-size: 1.8rem;
          pointer-events: none;
          writing-mode: vertical-lr;
          transform: translateY(-50%);
          white-space: nowrap;
        }
        img {
          transform: scale3d(1.05, 1.05, 1.05);
        }
      }
    }
  }

  .journey-wrap li:first-child,
  .journey-wrap li:last-child,
  .ceremony-wrap li:first-child,
  .ceremony-wrap li:last-child {
    display: none;
  }
}

@media only screen and (min-width: 576px) {
  .introduce {
    .container {
      flex-direction: row;
      width: 90%;
      margin: 0 auto;

      .title {
        top: 12%;
        left: 12%;
        writing-mode: initial;
        font-size: 1.75rem;
      }

      img {
        height: 100px;
      }

      ul {
        position: relative;

        &:hover {
          &::before {
            top: unset;
            right: unset;
            bottom: 120%;
            left: 50%;
            font-size: 1.5rem;
            writing-mode: initial;
            pointer-events: none;
            transform: translateX(-50%);
          }
          &::after {
            content: attr(data-content);
            position: absolute;
            top: 120%;
            left: 0;
            width: 50vw;
            font-size: 1.1rem;
            pointer-events: none;
          }
        }
      }

      div {
        position: relative;

        &:hover {
          &::before {
            top: unset;
            right: unset;
            bottom: 120%;
            left: 0;
            font-size: 1.5rem;
            width: 100%;
            text-align: center;
            writing-mode: initial;
            pointer-events: none;
            transform: none;
          }
          &::after {
            content: attr(data-content);
            position: absolute;
            top: 120%;
            right: 0;
            font-size: 1.1rem;
            width: 50vw;
            pointer-events: none;
          }
          img {
            transform: scale(1.05);
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) {
  .introduce {
    .container {
      .title {
        font-size: 2rem;
      }

      img {
        height: 120px;
      }

      ul {
        &:hover {
          &::before {
            left: 100%;
            font-size: 1.6rem;
            transform: none;
          }
          &::after {
            left: 100%;
            font-size: 1.2rem;
            width: 45vw;
          }
        }
      }

      div {
        &:hover {
          &::before {
            font-size: 1.6rem;
          }
          &::after {
            font-size: 1.2rem;
            width: 45vw;
          }
        }
      }

      .journey-wrap li:first-child,
      .journey-wrap li:last-child,
      .ceremony-wrap li:first-child,
      .ceremony-wrap li:last-child {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
      }
      .journey-wrap:hover li:first-child,
      .ceremony-wrap:hover li:first-child {
        transform: translateY(-90%) scale(0.8);
      }
      .journey-wrap:hover li:last-child,
      .ceremony-wrap:hover li:last-child {
        transform: translateY(90%) scale(0.8);
      }
      .journey-wrap:hover li:nth-child(2),
      .ceremony-wrap:hover li:nth-child(2) {
        transform: scale(0.8);
      }
    }
  }
}

@media only screen and (min-width: 1024px) {
  .introduce {
    .container {
      width: 84%;

      img {
        height: 140px;
      }

      ul {
        &:hover {
          &::after {
            width: 40vw;
          }
        }
      }

      div {
        &:hover {
          &::after {
            width: 40vw;
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 1280px) {
  .introduce {
    .container {
      width: 70%;
      ul {
        &:hover {
          &::before {
            font-size: 1.7rem;
          }
          &::after {
            font-size: 1.3rem;
          }
        }
      }

      div {
        &:hover {
          &::before {
            font-size: 1.7rem;
          }
          &::after {
            font-size: 1.3rem;
          }
        }
      }
    }

    .bottom-slide-tips {
      position: absolute;
      bottom: 0;
      left: 50%;
    }
  }
}

@media only screen and (min-width: 1440px) {
  .introduce {
    .container {
      width: 64%;
      max-width: 1000px;

      .title {
        font-size: 2.8rem;
      }

      img {
        height: 160px;
      }

      ul,
      div {
        &:hover {
          &::before {
            bottom: 135%;
            font-size: 1.8rem;
          }
          &::after {
            top: 135%;
            font-size: 1.4rem;
          }
        }
      }

      .journey-wrap:hover li:first-child,
      .ceremony-wrap:hover li:first-child {
        transform: translateY(-100%) scale(0.8);
      }
      .journey-wrap:hover li:last-child,
      .ceremony-wrap:hover li:last-child {
        transform: translateY(100%) scale(0.8);
      }
    }
  }
}
</style>