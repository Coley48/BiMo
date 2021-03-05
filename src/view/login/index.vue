<template>
  <div class="login" v-if="isShow">
    <div class="container">
      <h1>毕摩行</h1>
      <input type="text" v-model="username" />
      <input type="password" v-model="password" />
      <input type="button" @click="login" value="登录" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      username: "admin",
      password: "kk1100..",
    };
  },
  methods: {
    login() {
      if (this.username != "" && this.password != "") {
        $.post(
          "/api/login",
          JSON.stringify({
            username: this.encode(this.username),
            password: this.encode(this.password),
          }),
          (resp) => {
            console.log(resp);
            alert(resp.info);
            if (resp.code === 200) {
              this.$emit("callback", true);
              sessionStorage.setItem("adminName", this.username);
            }
          }
        );
      }
    },
    encode(str) {
      return btoa(encodeURIComponent(str));
    },
  },
};
</script>

<style lang="less" scoped>
@media only screen and (min-width: 1280px) {
  .login {
    background: lightgoldenrodyellow;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;

    .container {
      background: lightseagreen;
      width: 25rem;
      height: 25rem;
      padding: 4% 5% 5%;
      display: flex;
      justify-content: space-around;
      flex-direction: column;

      h1 {
        text-align: center;
      }

      input {
        border-radius: 0.5rem;
        border: none;
        padding: 0 5%;
      }
    }
  }
}
</style>