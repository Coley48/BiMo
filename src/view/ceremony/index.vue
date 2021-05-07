<template>
  <section class="ceremony">
    <!-- ceremony-封面 -->
    <transition name="section">
      <div class="sec-1" v-show="isCoverShow">
        <div class="info" :class="{ show: isInfoShow }">
          <h3>{{ infoList[infoIndex].name }}</h3>
          <p>{{ infoList[infoIndex].intro }}</p>
        </div>

        <div class="cube">
          <div
            v-for="(cer, key) in cube"
            :key="key"
            :class="key"
            :data-content="cer.name"
            data-toggle="popover"
            @mouseover="showInfo(cer.index)"
            @mouseleave="isInfoShow = false"
            @click="enterVideo(cer.index)"
          >
            <video
              preload="metadata"
              muted
              loop
              autoplay
              x5-video-player-type="h5"
              playsinline="true"
              webkit-playsinline="true"
              x-webkit-airplay="true"
              x5-video-orientation="portraint"
              x5-video-player-fullscreen="true"
            >
              <source :src="cer.videoSrc" />
            </video>
          </div>
        </div>
      </div>
    </transition>

    <!-- ceremony-core -->
    <transition>
      <div class="sec-2" v-show="!isCoverShow">
        <transition-group name="slide-toggle">
          <div class="slide" v-show="slideIndex === 0" :key="0">
            <div class="main-wrap">
              <!-- left-part -->
              <list-group
                class="left-part text-center"
                :class="{ active: isListActive }"
                title="仪式环节"
                :callback="listHandler"
                :list="segmentTextList"
                :index="listIndex"
                @click="isListActive = false"
                @active="skipVideo"
              >
                <handle-bar
                  class="bar-rotate"
                  :class="{ active: isListActive }"
                  @toggle="isListActive = !isListActive"
                  @toggle.once="closeListTips"
                >
                  <div
                    class="right-center animated"
                    data-toggle="tips"
                    data-content="点击查看仪式主要环节"
                    :class="listTipsState"
                  ></div>
                </handle-bar>
              </list-group>

              <!-- center-part -->
              <div class="center-part">
                <!-- back button -->
                <transition>
                  <div
                    class="trigger left-bottom animated"
                    data-toggle="tips"
                    data-content="点击返回仪式导航页"
                    :class="backCeremonyTopTipsState"
                    @click="backTop"
                    @click.once="closeBackTopTips"
                    v-show="!isSliderActive"
                  >
                    <img
                      src="../../assets/img/icon/cube.png"
                      alt=""
                      gable="dragfalse"
                    />
                  </div>
                </transition>

                <video-player
                  :options="videoOptions"
                  :callback="videoHandler"
                />
              </div>

              <!-- right-part -->
              <div
                class="right-part left-center animated"
                data-toggle="tips"
                data-content="点击浮动元素了解更多"
                :class="[{ active: isSliderActive }, factorTipsState]"
              >
                <!-- toggle button -->
                <div
                  class="trigger left-top animated"
                  data-toggle="tips"
                  data-content="点击查看仪式关键元素"
                  :class="[{ shake: isTriggerShake }, sliderTipsState]"
                  @click="toggleSlider"
                  @click.once="closeSliderTips"
                >
                  <img
                    src="../../assets/img/icon/explore.png"
                    alt=""
                    draggable="false"
                  />
                </div>

                <image-slider
                  :list="element[index]"
                  :class="{ shake: isFactorShake }"
                  :callback="sliderHandler"
                  @display="showMore"
                ></image-slider>
              </div>
            </div>
          </div>

          <div class="slide" v-show="slideIndex === 1" :key="1">
            <div class="factor-wrap">
              <div class="back-to-video">
                <handle-bar
                  class="bar-shake"
                  @toggle="backVideo"
                  @click.native.once="closeBackVideoTips"
                >
                  <div
                    class="right-center animated"
                    data-toggle="tips"
                    :class="backVideoTipsState"
                    data-content="点击返回视频"
                  ></div>
                </handle-bar>
              </div>

              <div class="card-wrap">
                <div
                  class="card top-right animated"
                  data-toggle="tips"
                  data-content="点击关键元素查看更多信息"
                  :class="[{ active: isCardActive }, cardTipsState]"
                >
                  <img
                    class="origin"
                    :src="currentElement.origin"
                    alt=""
                    draggable="false"
                  />
                  <img
                    class="factor"
                    :src="currentElement.factor"
                    :style="currentElement.style"
                    alt=""
                    draggable="false"
                    @click="isCardActive = true"
                    @click.once="closeCardTips"
                  />

                  <div class="card-back" @click="isCardActive = false">
                    <img
                      class="paint"
                      :src="currentElement.paint"
                      alt=""
                      draggable="false"
                    />
                    <div class="text-content">
                      <h3 class="name">{{ currentElement.name }}</h3>
                      <p class="info">{{ currentElement.info }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </transition>
  </section>
</template>

<script>
import ListGroup from "@/component/list-group.vue";
import HandleBar from "@/component/handle-bar.vue";
import VideoPlayer from "@/component/video-player.vue";
import ImageSlider from "@/component/image-slider.vue";

export default {
  data() {
    this.$store.commit("setIndex", 2);
    return {
      index: 0,
      infoIndex: 0,
      slideIndex: 0,
      elementIndex: 0,
      listIndex: -1,
      isCoverShow: true,
      isInfoShow: false,
      isListActive: false,
      isSliderActive: false,
      isCardActive: false,
      isFactorShake: false,
      isTriggerShake: false,
      // tips
      backCeremonyTopTipsState:
        localStorage.getItem("backCeremonyTopTipsState") || "show",
      listTipsState: localStorage.getItem("listTipsState") || "show",
      sliderTipsState: localStorage.getItem("sliderTipsState") || "show",
      factorTipsState: localStorage.getItem("factorTipsState") || "hide",
      backVideoTipsState: localStorage.getItem("backVideoTipsState") || "show",
      cardTipsState: localStorage.getItem("cardTipsState") || "show",
      imageSlider: null,
      videoPlayer: null,
      videoOptions: {
        fill: true,
        controls: true,
        controlBar: { pictureInPictureToggle: false },
        sources: [
          {
            src: "./video/ceremony/purify-full.mp4",
            type: "video/mp4",
          },
        ],
      },
      videoList: [
        "./video/ceremony/purify-full.mp4",
        "./video/ceremony/bename-full.mp4",
        "./video/ceremony/pray-full.mp4",
      ],
      infoList: [
        {
          name: "驱秽仪式",
          intro:
            "一种常见仪式。毕摩举行该仪式，驱除对象身上的污秽、妖魔、鬼怪等不好的东西，以达到治愈对象身心病痛的效果。",
        },
        {
          name: "起名仪式",
          intro:
            "彝族人相信，世间存在勒支特匕（一种会吃掉小孩妖魔）。当小孩子降生，毕摩通过取名仪式，让勒支特匕远离孩子。仪式中，毕摩根据小孩和母亲的生辰八字，加之观察天象，结合彝族历法，为小孩取一个大名。父母可以再根据自己的喜好，为孩子取一个小名。",
        },
        {
          name: "祈福仪式",
          intro:
            "一种较为固定的家庭仪式，一般每年三次，较为隆重。第一次在春暖花开之时，第二次在七八月份，第三次在彝族新年前夕。家庭会根据经济条件，选择宰杀的牲畜。通常为羊、猪、鸡各一只。",
        },
      ],
      cube: {
        top: {
          index: 0,
          videoSrc: "/video/ceremony/purify-preview-1.mp4",
        },
        bottom: {
          index: 0,
          videoSrc: "/video/ceremony/purify-preview-2.mp4",
        },
        left: {
          index: 1,
          videoSrc: "/video/ceremony/bename-preview-1.mp4",
        },
        right: {
          index: 1,
          videoSrc: "/video/ceremony/bename-preview-2.mp4",
        },
        front: {
          index: 2,
          videoSrc: "/video/ceremony/pray-preview-1.mp4",
        },
        back: {
          index: 2,
          videoSrc: "/video/ceremony/pray-preview-2.mp4",
        },
      },
      segment: [
        [
          {
            text: "鸡蛋占卜",
            time: 45,
          },
          {
            text: "生烟",
            time: 177,
          },
          {
            text: "读经文",
            time: 231,
          },
          {
            text: "烧圆石",
            time: 291,
          },
          {
            text: "绕白绳",
            time: 298,
          },
          {
            text: "浇石头",
            time: 341,
          },
          {
            text: "跨圣枝",
            time: 346,
          },
        ],
        [
          {
            text: "生烟",
            time: 170,
          },
          {
            text: "牲畜绕头",
            time: 270,
          },
          {
            text: "宰杀牲畜",
            time: 311,
          },
          {
            text: "套绳子",
            time: 413,
          },
          {
            text: "制作护灵符",
            time: 500,
          },
          {
            text: "午饭",
            time: 569,
          },
          {
            text: "鸡蛋占卜",
            time: 595,
          },
          {
            text: "神枝绕头",
            time: 685,
          },
          {
            text: "妇女接过圣枝和水",
            time: 703,
          },
          {
            text: "起名",
            time: 765,
          },
          {
            text: "剪头发",
            time: 779,
          },
          {
            text: "喂孩子酒水",
            time: 820,
          },
          {
            text: "穿衣",
            time: 890,
          },
        ],
        [
          {
            text: "生烟",
            time: 106,
          },
          {
            text: "牲畜绕头",
            time: 198,
          },
          {
            text: "鸡血淋草偶",
            time: 240,
          },
          {
            text: "吹鸡",
            time: 274,
          },
          {
            text: "牲畜头朝门摆放",
            time: 301,
          },
          {
            text: "换魂仪式",
            time: 455,
          },
          {
            text: "拿草偶转圈",
            time: 497,
          },
          {
            text: "传递木板",
            time: 545,
          },
        ],
      ],
      element: [
        [
          {
            name: "鸡蛋占卜",
            origin: "/image/ceremony/purify/1-origin.png",
            factor: "/image/ceremony/purify/1-factor.png",
            paint: "/image/ceremony/purify/1-paint.png",
            info:
              "鸡蛋占卜所用鸡蛋必须是一公一母交配过后的土鸡蛋。\n毕摩会将鸡蛋打在盛有水的黑色碗中，可以看出人身上的疾病情况，是否有鬼附着。\n在彝族中，非正常死亡的人会变成鬼，如有上吊死的人，鬼魂在鸡蛋中会浮现出人形手里拿着绳子；如跳悬崖自杀者，在鸡蛋中会变成悬崖上站着一个“人”。\n可根据鸡蛋与毕摩位置，判断鬼的方位来源。",
            time: 45,
            style: {
              left: "35%",
              top: "33.7%",
              width: "54.5%",
              height: "63.32%",
            },
          },
          {
            name: "经书",
            origin: "/image/ceremony/purify/2-origin.png",
            factor: "/image/ceremony/purify/2-factor.png",
            paint: "/image/ceremony/purify/2-paint.png",
            info:
              "彝族毕摩的经书种类繁多，毕摩现存的经卷有28类，212种，数量达12452卷。\n从形式上，毕摩经书可以分为占卜、咒术、驱遣、祛秽、赔偿、禳解、调和、祈愿、祭祀、送灵、溯源等种类。",
            time: 110,
            style: {
              left: "64.9%",
              top: "68.3%",
              width: "31.68%",
              height: "29.25%",
            },
          },
          {
            name: "圣枝",
            origin: "/image/ceremony/purify/3-origin.png",
            factor: "/image/ceremony/purify/3-factor.png",
            paint: "/image/ceremony/purify/3-paint.png",
            info:
              "一共需要9双，18支；\n当毕摩咒完后，不好的鬼魂埋在土中，最后用圣枝锁在地下，不再出来。",
            time: 188,
            style: {
              left: "48%",
              top: "60.1%",
              width: "51.6%",
              height: "40%",
            },
          },
          {
            name: "鸡",
            origin: "/image/ceremony/purify/4-origin.png",
            factor: "/image/ceremony/purify/4-factor.png",
            paint: "/image/ceremony/purify/4-paint.png",
            info: "仪式时，毕摩拿着鸡往人的身上扇，把人身上的鬼魂扇出去。",
            time: 200,
            style: {
              left: "34.4%",
              top: "52%",
              width: "35.6%",
              height: "47.5%",
            },
          },
          {
            name: "泥团",
            origin: "/image/ceremony/purify/5-origin.png",
            factor: "/image/ceremony/purify/5-factor.png",
            paint: "/image/ceremony/purify/5-paint.png",
            info:
              "捏成3个人的形状，将荞麦花喂到三个泥人口中，将风湿病回归到泥人土中。\n土里挖一个洞，里面烧入牛羊的脂肪，将泥人埋入洞中。",
            time: 250,
            style: {
              left: "60.4%",
              top: "76%",
              width: "12.04%",
              height: "17.63%",
            },
          },
          {
            name: "白绳子",
            origin: "/image/ceremony/purify/6-origin.png",
            factor: "/image/ceremony/purify/6-factor.png",
            paint: "/image/ceremony/purify/6-paint.png",
            info: "用白绳子将孩子身体的病痛绑走。",
            time: 292,
            style: {
              left: "57.5%",
              top: "27.7%",
              width: "15%",
              height: "33%",
            },
          },
        ],
        [
          {
            name: "玉米和猪膀胱",
            origin: "/image/ceremony/bename/1-origin.png",
            factor: "/image/ceremony/bename/1-factor.png",
            paint: "/image/ceremony/bename/1-paint.png",
            info:
              "悬挂的玉米是要快速晾晒干。\n猪膀胱取自过年时杀的年猪，猪体型大，膀胱就大，代表这家人能杀这么大的猪，寓意财产富足。",
            time: 5,
            style: {
              left: "39.4%",
              top: "0",
              width: "20.94%",
              height: "34.72%",
            },
          },
          {
            name: "黑猪",
            origin: "/image/ceremony/bename/2-origin.png",
            factor: "/image/ceremony/bename/2-factor.png",
            paint: "/image/ceremony/bename/2-paint.png",
            info:
              "猪杀了后，把猪蹄和尾巴坚硬割下来，挂到门楣上，为了防止勒格特比来吃小孩，把不好的事物挡在外面。",
            time: 158,
            style: {
              left: "32.5%",
              top: "38.3%",
              width: "48.63%",
              height: "53.23%",
            },
          },
          {
            name: "圣枝",
            origin: "/image/ceremony/bename/3-origin.png",
            factor: "/image/ceremony/bename/3-factor.png",
            paint: "/image/ceremony/bename/3-paint.png",
            info:
              "共有两组。\n一组：一支有叉，一支无叉和两支有树叶的树枝；\n另一组：九支有叉，九支无叉",
            time: 204,
            style: {
              left: "10.1%",
              top: "11.2%",
              width: "68.18%",
              height: "88.80%",
            },
          },
          {
            name: "燃烧的木条",
            origin: "/image/ceremony/bename/4-origin.png",
            factor: "/image/ceremony/bename/4-factor.png",
            paint: "/image/ceremony/bename/4-paint.png",
            info:
              "毕摩用燃烧的木条，分别点猪尾部、身体、头部，后将木条扔出，寓意把不好的东西扔出去。",
            time: 335,
            style: {
              left: "23.7%",
              top: "29.5%",
              width: "53.8%",
              height: "44.3%",
            },
          },
          {
            name: "护灵符",
            origin: "/image/ceremony/bename/5-origin.png",
            factor: "/image/ceremony/bename/5-factor.png",
            paint: "/image/ceremony/bename/5-paint.png",
            info:
              "将鱼鳍、姜、蒜等放入并缝在一起，佩戴在小孩的脖子上。\n防止外人将不好东西带进家，防止小孩生病。",
            time: 499,
            style: {
              left: "35%",
              top: "1%",
              width: "22%",
              height: "99%",
            },
          },
          {
            name: "妇女和孩子",
            origin: "/image/ceremony/bename/6-origin.png",
            factor: "/image/ceremony/bename/6-factor.png",
            paint: "/image/ceremony/bename/6-paint.png",
            info:
              "相当于汉族办喜事酒席，街坊邻里一起庆祝。本族亲人一般随100元，邻居随20元。",
            time: 649,
            style: {
              left: "0",
              top: "10%",
              width: "100%",
              height: "89.65%",
            },
          },
          {
            name: "树枝和水",
            origin: "/image/ceremony/bename/7-origin.png",
            factor: "/image/ceremony/bename/7-factor.png",
            paint: "/image/ceremony/bename/7-paint.png",
            time: 700,
            info:
              "祈福本家人的孩子的父母、兄弟姐妹沾水后（男孩沾左手，女孩沾右手），把水倒在地下，为了祈福。",
            style: {
              left: "32.4%",
              top: "3.5%",
              width: "52.5%",
              height: "82%",
            },
          },
          {
            name: "啤酒",
            origin: "/image/ceremony/bename/8-origin.png",
            factor: "/image/ceremony/bename/8-factor.png",
            paint: "/image/ceremony/bename/8-paint.png",
            time: 734,
            info:
              "原来彝族人主要饮用苦荞和玉米酿制的酒，近些年，被现代啤酒所代替。\n瓶上刻有525标志，是主家与客人分酒的分割线。",
            style: {
              left: "37.2%",
              top: "45.9%",
              width: "18.12%",
              height: "42.14%",
            },
          },
          {
            name: "苦荞",
            origin: "/image/ceremony/bename/9-origin.png",
            factor: "/image/ceremony/bename/9-factor.png",
            paint: "/image/ceremony/bename/9-paint.png",
            info:
              "炒苦荞，彝族过去贫穷，无法负担杀牲畜，就用苦荞祭祀神灵，慢慢演变成祭祀环节中的一部分。",
            time: 851,
            style: {
              left: "7.7%",
              top: "18.6%",
              width: "63.33%",
              height: "72.59%",
            },
          },
        ],
        [
          {
            name: "鸡毛穿线",
            origin: "/image/ceremony/pray/1-origin.png",
            factor: "/image/ceremony/pray/1-factor.png",
            paint: "/image/ceremony/pray/1-paint.png",
            time: 98,
            info: "一般是两条线相交而成，代表两条鬼魂的路，有一条是麻绳组成。",
            style: {
              left: "8.5%",
              top: "0",
              width: "83.49%",
              height: "65.37%",
            },
          },
          {
            name: "草偶",
            origin: "/image/ceremony/pray/2-origin.png",
            factor: "/image/ceremony/pray/2-factor.png",
            paint: "/image/ceremony/pray/2-paint.png",
            time: 142,
            info:
              "用草做成狗或鸡等低级事物，如果发生诅咒，别人家将本家咒成狗或鸡等事物，仪式可反制，将污秽带走。",
            style: {
              left: "32.5%",
              top: "0",
              width: "48%",
              height: "100%",
            },
          },
          {
            name: "铜铃",
            origin: "/image/ceremony/pray/3-origin.png",
            factor: "/image/ceremony/pray/3-factor.png",
            paint: "/image/ceremony/pray/3-paint.png",
            time: 168,
            info:
              "毕摩摇响铜铃铛，告知天地神灵仪式开始。\n召唤受祈福者的灵魂，请求世间的美好事物汇聚。\n仪式中会重复多次。",
            style: {
              left: "35.8%",
              top: "63.5%",
              width: "7.94%",
              height: "13.65%",
            },
          },
          {
            name: "三种动物",
            origin: "/image/ceremony/pray/4-origin.png",
            factor: "/image/ceremony/pray/4-factor.png",
            paint: "/image/ceremony/pray/4-paint.png",
            time: 177,
            info:
              "祈福仪式宰杀标准不一。\n简单仪式为宰杀鸡，复杂仪式为宰杀鸡、猪、羊、山羊。\n仪式中，鸡为毕摩宰杀，猪羊为帮忙亲友宰杀。",
            style: {
              left: "48.7%",
              top: "50.1%",
              width: "33.2%",
              height: "50%",
            },
          },
          {
            name: "经书",
            origin: "/image/ceremony/pray/5-origin.png",
            factor: "/image/ceremony/pray/5-factor.png",
            paint: "/image/ceremony/pray/5-paint.png",
            time: 322,
            info:
              "不同的仪式，毕摩会用到不同的经书。\n祈福仪式口诵经文内容，让妖魔鬼怪和不好的事物远离这个家庭，保佑一家人都远离妖魔、疾病，粮食丰收，吉祥如意。",
            style: {
              left: "17.1%",
              top: "53.5%",
              width: "32.19%",
              height: "42.87%",
            },
          },
          {
            name: "鬼魂木板",
            origin: "/image/ceremony/pray/6-origin.png",
            factor: "/image/ceremony/pray/6-factor.png",
            paint: "/image/ceremony/pray/6-paint.png",
            time: 384,
            info:
              "在木板上画两个不同性别的鬼魂，使用经文、吐口水、放在脚下踩等方式诅咒它们。",
            style: {
              left: "47.9%",
              top: "15.6%",
              width: "24.58%",
              height: "37.41%",
            },
          },
          {
            name: "帽子",
            origin: "/image/ceremony/pray/7-origin.png",
            factor: "/image/ceremony/pray/7-factor.png",
            paint: "/image/ceremony/pray/7-paint.png",
            time: 464,
            info:
              "毕摩在这个环节将牲畜作为污秽的替代物，将它们赶出家门到鬼怪处。\n帽子在此过程中，可以保护毕摩不受“伤害”。",
            style: {
              left: "28.9%",
              top: "0",
              width: "46.20%",
              height: "42.87%",
            },
          },
          {
            name: "斯切",
            origin: "/image/ceremony/pray/8-origin.png",
            factor: "/image/ceremony/pray/8-factor.png",
            paint: "/image/ceremony/pray/8-paint.png",
            time: 600,
            info:
              "分为鸡斯切，猪斯切，羊斯切。\n人身上的疾病变成猪鸡羊等实物，将它送走。",
            style: {
              left: "38.5%",
              top: "35%",
              width: "30.16%",
              height: "39.44%",
            },
          },
          {
            name: "羊皮包裹",
            origin: "/image/ceremony/pray/9-origin.png",
            factor: "/image/ceremony/pray/9-factor.png",
            paint: "/image/ceremony/pray/9-paint.png",
            time: 730,
            info: "羊皮中包裹有羊、猪、鸡等动物内脏，用来祭祀毕摩的神魂。",
            style: {
              left: "10.2%",
              top: "20.4%",
              width: "24.69%",
              height: "34.72%",
            },
          },
        ],
      ],
    };
  },
  methods: {
    showInfo(i) {
      this.isInfoShow = true;
      this.infoIndex = i;
    },
    toggleSlider() {
      this.isSliderActive = !this.isSliderActive;
      this.isListActive = false;
    },
    backTop() {
      this.isCoverShow = true;
      this.isListActive = false;
      this.isSliderActive = false;
      this.player?.pause();
    },
    enterVideo(i) {
      if (this.index !== i) {
        this.index = i;
        this.listIndex = -1;
        this.player?.src(this.videoList[i]);
      }
      this.player?.play();
      this.isCoverShow = false;
      this.$store.commit("hideNavbar");
    },
    showMore(i) {
      this.slideIndex = 1;
      this.elementIndex = i;
      this.player?.pause();
      this.isFactorShake = false;
    },
    backVideo() {
      this.isCardActive = false;
      this.slideIndex = 0;
      this.player?.play();
    },
    skipVideo(i) {
      this.listIndex = i;
      this.player?.currentTime(this.segmentTimePoints[i]);
    },
    updateTime() {
      try {
        let t = Math.floor(this.player?.currentTime());
        let i = this.segmentTimePoints.indexOf(t);
        if (i != -1) {
          this.listIndex = i;
        }

        let j = this.elementTimePoints.indexOf(t);
        if (j != -1) {
          this.isFactorShake = true;
          this.isTriggerShake = true;
          setTimeout(() => {
            this.isTriggerShake = false;
          }, 3000);

          this.imageSlider.slide(
            j - this.imageSlider.children(":nth-child(4)").attr("data-index")
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    debounce(func, delay) {
      let timer;
      return function () {
        let context = this;
        let args = arguments;
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            func.apply(context, args);
          }, delay);
        }
      };
    },
    videoHandler(player) {
      this.player = player;
      this.player?.on("timeupdate", this.debounce(this.updateTime, 980));
    },
    listHandler() {},
    sliderHandler(slider) {
      this.imageSlider = slider;
    },
    // close tips
    closeBackTopTips() {
      this.backCeremonyTopTipsState = "hide";
      localStorage.setItem("backCeremonyTopTipsState", "hide");
    },
    closeSliderTips() {
      if (localStorage.getItem("factorTipsState") === null) {
        this.factorTipsState = "show";
      }
      localStorage.setItem("factorTipsState", "hide");
      this.sliderTipsState = "hide";
      localStorage.setItem("sliderTipsState", "hide");
    },
    closeListTips() {
      this.listTipsState = "hide";
      localStorage.setItem("listTipsState", "hide");
    },
    closeBackVideoTips() {
      this.backVideoTipsState = "hide";
      localStorage.setItem("backVideoTipsState", "hide");
    },
    closeCardTips() {
      this.cardTipsState = "hide";
      localStorage.setItem("cardTipsState", "hide");
    },
  },
  computed: {
    currentElement() {
      return this.element[this.index][this.elementIndex];
    },
    segmentTextList() {
      return this.segment[this.index].map((value) => value.text);
    },
    segmentTimePoints() {
      return this.segment[this.index].map((value) => value.time);
    },
    elementTimePoints() {
      return this.element[this.index].map((value) => value.time);
    },
  },
  components: {
    ListGroup,
    HandleBar,
    VideoPlayer,
    ImageSlider,
  },
  mounted() {
    let Win = $(window);
    let originY = Win.height() / 2;
    let originX = Win.width() / 2;
    if (Win.width() >= 1280) {
      let cubeWrap = $(".ceremony .sec-1");

      cubeWrap.on("mousemove", (e) => {
        cubeWrap.css(
          "perspective-origin",
          `${e.clientX - originX}px ${e.clientY - originY}px`
        );
      });
      cubeWrap.find(".cube").on("mouseover", (e) => {
        this.$store.commit("playClickAudio");
      });

      import("@/assets/js/jquery.mousewheel.min").then(() => {
        $(".card-back").on("mousewheel", (e) => e.stopPropagation());
      });
    }
  },
};
</script>

<style lang="less" scoped>
@cube-375: 8.75rem;
@cube-576: 8rem;
@cube-768: 10rem;
@cube-1024: 10.5rem;
@cube-1280: 9rem;
@cube-1440: 11rem;

.ceremony {
  .sec-1 {
    display: flex;
    justify-content: center;
    align-items: center;
    background: lightgray url("../../assets/img/ceremony/background.jpg") center
      no-repeat;
    background-size: cover;
    perspective: 2000px;
    perspective-origin: center;
    z-index: 50;

    .info {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      padding: 10% 2%;
      transition: opacity 0.5s ease-in-out;

      &.show {
        opacity: 1;
      }
      h3 {
        text-align: center;
      }
      p {
        text-indent: 2em;
      }
    }

    .cube {
      position: relative;
      width: @cube-375;
      height: @cube-375;
      transform-style: preserve-3d;
      animation: cube-spin 20s infinite linear;
      cursor: pointer;

      &:hover {
        animation-play-state: paused;
      }

      div {
        position: absolute;
        width: @cube-375;
        height: @cube-375;
        text-align: center;
        line-height: @cube-375;
        opacity: 0.8;
        overflow: hidden;
        border-radius: 2px;
        background-color: rgba(0, 0, 0, 0.5);
        /* transition: all 1s; */

        &:hover {
          opacity: 1;
        }
      }

      .back {
        transform: translateZ(-@cube-375 / 2) rotateY(180deg);
      }
      .right {
        transform: rotateY(-270deg) translateX(@cube-375 / 2);
        transform-origin: top right;
      }
      .left {
        transform: rotateY(270deg) translateX(-@cube-375 / 2);
        transform-origin: center left;
      }
      .top {
        transform: rotateX(-90deg) translateY(@cube-375 / 2) rotateZ(180deg);
        transform-origin: top center;
      }
      .bottom {
        transform: rotateX(90deg) translateY(@cube-375 / 2);
        transform-origin: bottom center;
      }
      .front {
        transform: translateZ(@cube-375 / 2);
      }

      video {
        height: 100%;
        width: auto;
        transform: translate(-25%, 0);

        &::-webkit-media-controls {
          display: none !important;
        }
      }
    }
  }

  .sec-2 {
    .slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .main-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .left-part {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        transform: translateX(-100%);

        .handle-bar {
          top: 50%;
          left: 100%;
        }

        &.active {
          transform: none !important;
          opacity: 1 !important;
        }
      }

      .center-part {
        height: 100%;
        width: 100%;

        .trigger {
          top: 0;
          right: 0;
          z-index: 40;
        }
      }

      .right-part {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 50%;
        transform: translate(100%, 200%);
        transition: all 0.5s ease-in-out;
        z-index: 20;

        .trigger {
          bottom: 105%;
          top: unset;
          right: 100%;
          z-index: 40;
          transition: all 0.3s linear;

          &.shake {
            animation: head-shake 0.8s ease-in-out 3 both;
          }
        }

        &.active {
          height: 100%;
          transform: none;

          .trigger {
            bottom: unset;
            top: 0;
            right: 20%;
          }
        }
      }
    }

    .factor-wrap {
      width: 100%;
      height: 100%;
      background: url("../../assets/img/ceremony/background-2.jpg") center
        no-repeat;
      background-size: cover;

      .back-to-video .handle-bar {
        top: 50%;
        left: 0;
        z-index: 10;
      }

      .card-wrap {
        position: relative;
        height: 100%;
        width: 100%;
        text-align: center;
        vertical-align: middle;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        .card {
          transform-style: preserve-3d;
          position: relative;
          width: 100%;
          height: auto;
          transform: none;
          transition: all 0.5s linear;
          // display: inline-block;

          .origin {
            width: 100%;
            height: auto;
            backface-visibility: hidden;
          }

          .factor {
            backface-visibility: hidden;
            position: absolute;
            animation: factor-blink 1.8s linear infinite both;
            cursor: pointer;
          }
          &.active {
            transform: rotateY(180deg) rotateZ(90deg);

            .card-back {
              opacity: 1;
            }
          }
        }

        .card-back {
          position: absolute;
          top: 50%;
          left: 0;
          width: 80%;
          height: auto;
          padding: 2rem 1.5rem;
          margin-left: 10%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-direction: column;
          background: url("../../assets/img/background.jpg") center no-repeat;
          background-size: cover;
          overflow: hidden;
          transform: translateY(-50%) rotateY(180deg) rotateZ(90deg);
          backface-visibility: hidden;
          opacity: 0;
          transition: all 0.5s linear;
          cursor: pointer;

          .paint {
            height: auto;
            width: 50%;
          }

          .text-content {
            height: 100%;
            color: #ebd8d1;
          }

          .name {
            padding-top: 1rem;
            margin: 0;
          }
          .info {
            margin: 0;
            text-align: left;
            white-space: pre-line;
          }
        }
      }
    }
  }
}

.slide-toggle-enter-active {
  animation: slide-in 0.5s ease both;
}
.slide-toggle-leave-active {
  animation: slide-out 0.5s ease both;
}

@keyframes cube-spin {
  from {
    transform: rotateY(0) rotateX(0) rotateZ(0);
  }
  to {
    transform: rotateY(360deg) rotateX(360deg) rotateZ(360deg);
  }
}

@keyframes factor-blink {
  40% {
    transform: scale(0.995);
  }
  50% {
    opacity: 0.6;
  }
  60% {
    transform: scale(1.005);
  }
}

@keyframes slide-in {
  from {
    transform: translate(100%, 0);
  }
  to {
    transform: translate(0, 0);
  }
}
@keyframes slide-out {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-100%, 0);
  }
}

@keyframes head-shake {
  0% {
    transform: translateX(0);
  }
  6.5% {
    transform: translateX(-10px) rotateY(-10deg);
  }
  18.5% {
    transform: translateX(9px) rotateY(8deg);
  }
  31.5% {
    transform: translateX(-8px) rotateY(-6deg);
  }
  43.5% {
    transform: translateX(6px) rotateY(4deg);
  }
  50% {
    transform: translateX(0);
  }
}

@media only screen and (min-width: 576px) {
  .ceremony {
    .sec-1 {
      .info {
        padding: 2% 10%;
      }

      .cube {
        width: @cube-576;
        height: @cube-576;

        div {
          width: @cube-576;
          height: @cube-576;
          line-height: @cube-576;
        }

        .back {
          transform: translateZ(-@cube-576 / 2) rotateY(180deg);
        }
        .right {
          transform: rotateY(-270deg) translateX(@cube-576 / 2);
        }
        .left {
          transform: rotateY(270deg) translateX(-@cube-576 / 2);
        }
        .top {
          transform: rotateX(-90deg) translateY(@cube-576 / 2) rotateZ(180deg);
        }
        .bottom {
          transform: rotateX(90deg) translateY(@cube-576 / 2);
        }
        .front {
          transform: translateZ(@cube-576 / 2);
        }
      }
    }

    .sec-2 {
      .main-wrap {
        .left-part {
          width: 40%;
        }

        .right-part {
          width: 40%;

          .trigger {
            bottom: 107%;
          }
        }
      }

      .factor-wrap {
        .card-wrap {
          .card {
            width: auto;
            height: 80%;
            margin: 0 auto;

            .origin {
              width: auto;
              height: 100%;
            }

            &.active {
              transform: rotateY(180deg);

              .card-back {
                opacity: 1;
              }
            }
          }

          .card-back {
            width: 100%;
            height: 100%;
            margin: 0;
            left: 50%;
            justify-content: space-between;
            flex-direction: row;
            transform: translate(-50%, -50%) rotateY(180deg);

            .paint {
              height: auto;
              width: 40%;
            }

            .text-content {
              height: 100%;
              overflow: scroll;
              padding-left: 2rem;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;

              .name {
                padding: 0 0 1rem;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) {
  .ceremony {
    .sec-1 {
      .info {
        padding: 5% 20%;
      }

      .cube {
        width: @cube-768;
        height: @cube-768;

        div {
          width: @cube-768;
          height: @cube-768;
          line-height: @cube-768;
        }

        .back {
          transform: translateZ(-@cube-768 / 2) rotateY(180deg);
        }
        .right {
          transform: rotateY(-270deg) translateX(@cube-768 / 2);
        }
        .left {
          transform: rotateY(270deg) translateX(-@cube-768 / 2);
        }
        .top {
          transform: rotateX(-90deg) translateY(@cube-768 / 2) rotateZ(180deg);
        }
        .bottom {
          transform: rotateX(90deg) translateY(@cube-768 / 2);
        }
        .front {
          transform: translateZ(@cube-768 / 2);
        }
      }
    }

    .sec-2 {
      .handle-bar {
        width: 4.25rem;
        height: 3rem;
        font-size: 150%;
      }

      .main-wrap {
        .right-part {
          width: 60%;

          .trigger {
            bottom: 104%;
          }
        }
      }

      .factor-wrap {
        .card-wrap {
          .card {
            width: 80%;
            height: auto;
            margin: 0 auto;

            .origin {
              width: 100%;
              height: auto;
            }
          }

          .card-back {
            .text-content {
              height: 100%;
              overflow: scroll;
              padding-left: 2.5rem;

              .name {
                font-size: 1.8rem;
              }

              .info {
                font-size: 1.2rem;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 1024px) {
  .ceremony {
    .sec-1 {
      .cube {
        width: @cube-1024;
        height: @cube-1024;

        div {
          width: @cube-1024;
          height: @cube-1024;
          line-height: @cube-1024;
        }

        .back {
          transform: translateZ(-@cube-1024 / 2) rotateY(180deg);
        }
        .right {
          transform: rotateY(-270deg) translateX(@cube-1024 / 2);
        }
        .left {
          transform: rotateY(270deg) translateX(-@cube-1024 / 2);
        }
        .top {
          transform: rotateX(-90deg) translateY(@cube-1024 / 2) rotateZ(180deg);
        }
        .bottom {
          transform: rotateX(90deg) translateY(@cube-1024 / 2);
        }
        .front {
          transform: translateZ(@cube-1024 / 2);
        }
      }
    }

    .sec-2 {
      .main-wrap {
        .left-part {
          width: 30%;
        }

        .right-part {
          width: 40%;
        }
      }

      .factor-wrap {
        .card-wrap {
          .card-back {
            padding: 2.5rem;

            .text-content {
              .info {
                font-size: 1.3rem;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 1280px) {
  .ceremony {
    .sec-1 {
      .info {
        top: 10%;
        width: 50%;
        padding: 0 10%;

        h3 {
          font-size: 1.4rem;
        }
        p {
          font-size: 1.1rem;
        }
      }
      .cube {
        width: @cube-1280;
        height: @cube-1280;

        div {
          width: @cube-1280;
          height: @cube-1280;
          line-height: @cube-1280;
        }

        .back {
          transform: translateZ(-@cube-1280 / 2) rotateY(180deg);
        }
        .right {
          transform: rotateY(-270deg) translateX(@cube-1280 / 2);
        }
        .left {
          transform: rotateY(270deg) translateX(-@cube-1280 / 2);
        }
        .top {
          transform: rotateX(-90deg) translateY(@cube-1280 / 2) rotateZ(180deg);
        }
        .bottom {
          transform: rotateX(90deg) translateY(@cube-1280 / 2);
        }
        .front {
          transform: translateZ(@cube-1280 / 2);
        }
      }
    }

    .sec-2 {
      .handle-bar {
        width: 3.75rem;
        height: 2.25rem;
        font-size: 125%;
      }

      .main-wrap {
        .left-part {
          width: 20%;
        }

        .right-part {
          width: 25%;

          &.active {
            .trigger {
              right: 12%;
              transform: translateY(-10%) scale(0.8);
            }
          }

          // tips
          &::before,
          &::after {
            top: 50%;
          }
        }
      }

      .factor-wrap {
        .card-wrap {
          .card {
            width: auto;
            height: 75%;

            .origin {
              width: auto;
              height: 100%;
            }
          }

          .card-back {
            .text-content {
              .name {
                padding: 1rem 0 0;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 1440px) {
  .ceremony {
    .sec-1 {
      .info {
        h3 {
          font-size: 1.8rem;
        }
        p {
          font-size: 1.4rem;
        }
      }

      .cube {
        width: @cube-1440;
        height: @cube-1440;

        div {
          width: @cube-1440;
          height: @cube-1440;
          line-height: @cube-1440;
        }

        .back {
          transform: translateZ(-@cube-1440 / 2) rotateY(180deg);
        }
        .right {
          transform: rotateY(-270deg) translateX(@cube-1440 / 2);
        }
        .left {
          transform: rotateY(270deg) translateX(-@cube-1440 / 2);
        }
        .top {
          transform: rotateX(-90deg) translateY(@cube-1440 / 2) rotateZ(180deg);
        }
        .bottom {
          transform: rotateX(90deg) translateY(@cube-1440 / 2);
        }
        .front {
          transform: translateZ(@cube-1440 / 2);
        }
      }
    }

    .sec-2 {
      .main-wrap {
        .left-part {
          width: 20%;
        }

        .right-part {
          width: 25%;
        }
      }

      .factor-wrap {
        .card-wrap {
          .card {
            width: auto;
            height: 70%;
            max-height: 1000px;

            .origin {
              width: auto;
              height: 100%;
            }

            .text-content {
              .name {
                font-size: 2.2rem;
              }
              .info {
                font-size: 1.7rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>