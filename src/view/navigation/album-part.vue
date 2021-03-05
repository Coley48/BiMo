<template>
  <div class="album">
    <div class="container">
      <div class="hint-text">
        {{ hintText }}
      </div>
      <div class="view" v-show="index !== -1" @click="index = -1">
        <img :src="imageList[index]" alt="" />
      </div>
      <div class="display">
        <ul class="firstGroup" id="firstGroup">
          <li v-for="(item, idx) in firstGroup" :key="'1st' + idx">
            <img :src="item" alt="" @click="index = idx" />
          </li>
        </ul>
        <ul class="secondGroup" id="secondGroup">
          <li
            v-for="(item, idx) in secondGroup"
            :key="'2nd' + idx"
            @click="index = next + idx"
          >
            <img :src="item" alt="" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      index: -1,
    };
  },
  methods: {},
  computed: {
    next() {
      return this.firstGroup.length;
    },
    ...mapState({
      hintText: (state) => state.navigation.album.hintText,
      imageList: (state) => state.navigation.album.imageList,
    }),
    half() {
      return Math.floor(this.imageList.length / 2);
    },
    firstGroup() {
      return this.imageList.slice(0, this.half);
    },
    secondGroup() {
      return this.imageList.slice(this.half);
    },
  },
  mounted() {
    let Win = $(window);
    if (Win.width() >= 1280) {
      let container = $(".album .container");
      let firstGroup = container.find("#firstGroup");
      let secondGroup = container.find("#secondGroup");
      let distance = 0;

      import("@/assets/js/jquery.mousewheel.min").then(() => {
        container.on("mousewheel", function (e) {
          distance += e.deltaY * e.deltaFactor;
          firstGroup.offset({ top: distance });
          secondGroup.offset({ top: -secondGroup.height() - distance });
        });
      });
    }
  },
};
</script>

<style lang="less" scoped>
.album {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;

  .container {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: scroll;

    .hint-text {
      position: fixed;
      bottom: 0;
      right: 0;
      color: white;
      writing-mode: vertical-lr;
      font-size: 1.5rem;
      padding: 0.5rem;
    }

    .view {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: inherit;
      z-index: 110;
      background: rgba(0, 0, 0, 0.5);

      img {
        height: auto;
        width: 100%;
        cursor: zoom-out;
      }
    }

    .display {
      ul {
        margin-bottom: 0.5rem;

        &:first-child {
          padding-top: 100vh;
        }
      }

      li {
        text-align: center;

        &:not(:last-child) {
          margin-bottom: 0.5rem;
        }
      }
      img {
        width: 12rem;
        height: auto;
        cursor: zoom-in;
      }
    }
  }
}

@media only screen and (min-width: 576px) {
  .album {
    .container {
      .view {
        img {
          height: 100%;
          width: auto;
        }
      }

      .display {
        img {
          width: 14rem;
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) {
  .album {
    .container {
      .view {
        img {
          height: auto;
          width: 100%;
        }
      }

      .display {
        img {
          width: 18rem;
        }
      }
    }
  }
}

@media only screen and (min-width: 1024px) {
  .album {
    .container {
      .view {
        img {
          height: 100%;
          width: auto;
        }
      }

      .display {
        ul {
          position: absolute;
          z-index: 100;
          margin: 0;
        }
        .firstGroup {
          top: 100%;
          left: 30%;
          transform: translate(-50%, 0);
        }
        .secondGroup {
          top: 100%;
          left: 70%;
          padding-top: 100vh;
          transform: translate(-50%, 0);
        }
      }
    }
  }
}

@media only screen and (min-width: 1280px) {
  .album {
    .container {
      width: 90%;
      margin: 0 auto;
      overflow: hidden;

      .view {
        img {
          height: 100%;
          width: auto;
        }
      }

      .display {
        img {
          width: 20rem;
        }

        .secondGroup {
          top: 0;
          padding-top: 0;
          transform: translate(-50%, -100%);
        }
      }
    }
  }
}

@media only screen and (min-width: 1440px) {
  .album {
    .container {
      width: 80%;
      max-width: 1200px;

      .display {
        img {
          width: 22rem;
        }
      }
    }
  }
}
</style>