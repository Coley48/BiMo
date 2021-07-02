<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="title">毕摩行</h3>
      <div class="sign-in" v-if="isLogin">
        <div class="fields">
          <div class="username">
            <input v-model="username" type="username" placeholder="username" />
          </div>
          <div class="password">
            <input v-model="password" type="password" placeholder="password" />
          </div>
        </div>
        <button class="sign-in-btn" @click="signIn">Sign in</button>
        <div class="link">
          <a href="#">Forgot password?</a> or
          <a href="#" @click="switchMethod">Sign up</a>
        </div>
      </div>
      <div class="sign-up" v-else>
        <div class="fields">
          <div class="username">
            <input v-model="username" type="text" placeholder="username" />
          </div>
          <div class="email">
            <input v-model="email" type="text" placeholder="email" />
          </div>
          <div class="password">
            <input v-model="password" type="password" placeholder="password" />
          </div>
          <div class="confirm">
            <input v-model="confirm" type="password" placeholder="confirm" />
          </div>
          <button class="sign-up-btn" @click="signUp">Sign up</button>
          <div class="link">
            <a href="#">Already have account?</a> Just
            <a href="#" @click="switchMethod">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
      username: "coley48",
      password: "123456",
      email: "@qq.com",
      confirm: "123456",
    };
  },
  computed: {},
  methods: {
    // 切换登录注册
    switchMethod() {
      this.isLogin = !this.isLogin;
    },
    // 登录
    signIn() {
      if (!this.couldSign()) {
        this.mAlert("请填写完成！");
      }
      let data = {
        username: this.username,
        password: this.password,
      };

      $.post("/api/signin", data, (res) => {
        console.log(res);
      });
    },
    // 注册
    signUp() {
      if (!this.couldSign()) {
        this.mAlert("未填写完整！");
        return;
      }
      if (this.password !== this.confirm) {
        this.mAlert("密码不一致！");
        return;
      }
      let reg =
        /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
      if (!reg.test(this.email)) {
        this.mAlert("请输入正确的邮箱！");
        return;
      }

      let data = {
        username: this.username,
        password: this.password,
        confirm: this.confirm,
        email: this.email,
      };

      $.post("/api/signup", data, (res) => {
        console.log(res);
      });
    },
    // 登录注册条件判定
    couldSign() {
      if (this.isLogin) {
        return this.username && this.password;
      }
      return this.username && this.password && this.email && this.confirm;
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  .wrapper {
    padding: 20px;
    border-radius: 0.5rem;
    border-radius: 20px;
    background: lightblue;

    .title {
      text-align: center;
      font-size: 28px;
      padding-top: 10px;
      letter-spacing: 0.5px;
    }
    .sub-title {
      text-align: center;
      font-size: 15px;
      padding-top: 7px;
      letter-spacing: 3px;
    }
  }

  .sign-in,
  .sign-up {
    .fields {
      width: 100%;
      padding: 20px 5px 5px 5px;

      input {
        outline: none;
        background: none;
        font-size: 18px;
        color: #555;
        padding: 8px;
        margin-bottom: 30px;
        border-radius: 25px;
        border: 1px solid #555;
      }

      svg {
        height: 22px;
        margin: 0 10px -3px 25px;
      }
    }

    .sign-in-btn,
    .sign-up-btn {
      outline: none;
      border: none;
      cursor: pointer;
      width: 100%;
      padding: 8px;
      border-radius: 30px;
      font-weight: 700;
      font-family: "Lato", sans-serif;
      color: #fff;
      text-align: center;
      background: #24cfaa;
      transition: 0.5s;

      &:hover {
        background: #2fdbb6;
      }
      &:active {
        background: #1da88a;
      }
    }
    .link {
      padding-top: 20px;
      text-align: center;

      a {
        text-decoration: none;
        color: #aaa;
        font-size: 15px;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
}
</style>