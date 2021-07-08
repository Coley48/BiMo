<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="title">毕摩行</h3>
      <div class="sign-in" v-if="isLogin">
        <div class="fields">
          <el-input
            type="text"
            v-model="username"
            autocomplete="off"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            clearable
          ></el-input>
          <el-input
            type="password"
            v-model="password"
            autocomplete="off"
            show-password
            minlength="8"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </div>
        <el-button class="sign-btn" :plain="true" type="info" @click="signIn"
          >Sign In</el-button
        >
        <div class="link">
          <a href="#">忘记密码？</a>或
          <a href="#" @click="switchMethod">注册</a>
        </div>
      </div>
      <div class="sign-up" v-else>
        <div class="fields">
          <el-input
            type="text"
            v-model="username"
            autocomplete="off"
            clearable
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          ></el-input>
          <el-input
            type="text"
            v-model="email"
            autocomplete="off"
            clearable
            placeholder="请输入邮箱"
            prefix-icon="el-icon-showMessage"
          ></el-input>
          <el-input
            type="password"
            v-model="password"
            autocomplete="off"
            show-password
            minlength="8"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
          <el-input
            type="password"
            v-model="confirm"
            autocomplete="off"
            show-password
            minlength="8"
            placeholder="请输入确认密码"
            prefix-icon="el-icon-check"
          ></el-input>
          <el-button class="sign-btn" type="info" @click="signUp"
            >Sign Up</el-button
          >
          <div class="link">
            <a href="#">已有账号？</a>直接
            <a href="#" @click="switchMethod">登录</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      isLogin: true,
      username: "admin",
      password: "123456",
      email: "",
      confirm: "",
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
        this.showMessage("warning", "请填写完整哦！");
        return;
      }
      let data = {
        username: this.username,
        password: this.password,
      };

      $.post("/api/sign/in", data, (res) => {
        if (res.code === 200) {
          this.showMessage("success", res.info);
          this.$store.commit("userLogin", res.data);
        } else {
          this.showMessage("error", res.info);
        }
        console.log(res);
      });
    },
    // 注册
    signUp() {
      if (!this.couldSign()) {
        this.showMessage("warning", "未填写完整！");
        return;
      }
      if (this.password !== this.confirm) {
        this.showMessage("warning", "密码不一致！");
        return;
      }
      let reg =
        /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
      if (!reg.test(this.email)) {
        this.showMessage("warning", "请输入正确的邮箱！");
        return;
      }

      let data = {
        username: this.username,
        password: this.password,
        confirm: this.confirm,
        email: this.email,
      };

      $.post("/api/sign/up", data, (res) => {
        if (res.code === 200) {
          this.showMessage("success", res.info);
        } else {
          this.showMessage("error", res.info);
        }
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
    padding: 20px 25px;
    border-radius: 0.75rem;
    background: whitesmoke;
    width: 300px;

    .title {
      text-align: center;
      font-size: 28px;
      padding-top: 5px;
      letter-spacing: 0.5px;
    }
  }

  .sign-in,
  .sign-up {
    .sign-btn {
      width: 100%;
      font-weight: 700;
      transition: 0.5s;
    }
    .link {
      padding-top: 20px;
      text-align: center;

      a {
        text-decoration: none;
        color: #aaa;
        font-size: 15px;
        transition: 0.5s;
        &:hover {
          color: turquoise;
        }
      }
    }

    .el-input {
      margin-bottom: 10px;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
}
</style>