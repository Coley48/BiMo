<template>
  <div class="about">
    <div class="container">
      <div
        v-for="(item, index) in paragraph"
        :key="'div' + index"
        :class="{ textcenter: item.textCenter || false }"
      >
        <h3>
          {{ item.title }}
        </h3>
        <p v-for="(it, idx) in item.content" :key="index + '-' + idx">
          {{ it }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paragraph: [
        {
          title: "关于毕摩行",
          content: [
            "这是一个关于彝族毕摩文化的交互式纪录片。项目采用跨媒体文本形式，融合网页、影像、文本、音频等一系列独立要素，努力尝试新的编码方式，开拓民族志影像语言，项目历时3年创作而成。",
            "影像希望带领用户一起踏上旅途，到达彝族毕摩文化仪式的核心，传递新知的同时，进行民族文化深描，通过交互特性，消除信息传播的多义性和不确定性。这个项目和后续项目致力于探讨：纪录影像在客观记录时代的同时，如何努力建构虚拟社区空间，增强观众认同并触发行动。",
          ],
        },
        {
          title: "关于我们",
          content: [
            "制片人、导演：郑宇",
            "执行导演：李英杰",
            "交互设计：孔宇",
            "视觉设计：侯月驰",
            "文案组：郑宇 李英杰 孔宇",
            "文化顾问：立里机门 立里达哈 热几夫机 石则",
            "影像摄制组：李英杰 郑宇 梁辉 立里达哈 刘忠儡 李戬 王鑫 潘衡",
            "视觉效果组：郭佳琦 杨安梅 雷顺远 黄润 刘永",
            "字幕组：李英杰 雷顺远 刘永",
          ],
        },
        {
          title: "鸣谢",
          textCenter: true,
          content: [
            "立里机门、立里达哈一家",
            "彝文书法家：皮特伍且",
            "西华师范大学新闻传播学院",
          ],
        },
        {
          title: "联系我们",
          textCenter: true,
          content: ["电话：15328886853", "邮箱：zhengyu175@qq.com"],
        },
      ],
    };
  },
  methods: {},
  computed: {},
};
</script>

<style lang="less" scoped>
.about {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;

  .container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 2rem;
    overflow: scroll;
    background-color: lightgoldenrodyellow;
    background: url("../../assets/img/background.jpg") center no-repeat;
    background-size: cover;
    color: #ebd8d1;

    h3 {
      text-align: center;
      padding: 20px 0;
      margin-bottom: 0;
    }
    p {
      text-align: left;
      font-size: 1rem;
      margin-bottom: 0;
    }
    div:first-child p {
      text-indent: 2em;
    }

    .textcenter p {
      text-align: center;
    }
  }
}

@media only screen and (min-width: 768px) {
  .about {
    .container {
      width: 80%;
    }
  }
}

@media only screen and (min-width: 1024px) {
  .about {
    .container {
      width: 60%;
    }
  }
}

@media only screen and (min-width: 1280px) {
  .about {
    .container {
      width: 50%;
    }
  }
}

@media only screen and (min-width: 1440px) {
  .about {
    .container {
      max-width: 750px;
    }
  }
}
</style>