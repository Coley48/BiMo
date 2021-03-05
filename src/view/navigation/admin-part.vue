<template>
  <div class="admin">
    <div class="container">
      <ul class="bread">
        <li :class="{ active: index === 0 }" @click="index = 0">数据更新</li>
        <li :class="{ active: index === 1 }" @click="index = 1">账号管理</li>
      </ul>

      <!-- components -->
      <div class="content">
        <transition name="section">
          <keep-alive>
            <component :is="currentPart" @logout="$emit('close')"></component>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      list: ["config", "account"],
    };
  },
  computed: {
    currentPart() {
      return this.list[this.index];
    },
  },
  components: {
    Config: () => import("@/view/navigation/admin/config.vue"),
    Account: () => import("@/view/navigation/admin/account.vue"),
  },
};
</script>

<style lang="less" scoped>
.admin {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;

  .container {
    width: 60%;
    height: 100%;
    margin: 0 auto;
    background: lightcyan;
    position: relative;
    padding: 3rem 3rem 0;

    ul.bread {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding-left: 3rem;
      display: flex;
      justify-content: start;

      li {
        padding: 0.5rem;
        cursor: pointer;

        &.active {
          // color: tomato;
          // border-bottom: 0.2rem solid black;
          text-decoration: 2px wavy underline lightblue;
        }
      }
    }

    .content {
      position: relative;
      height: 100%;
      width: 100%;
      overflow: scroll;
    }
  }
}
</style>