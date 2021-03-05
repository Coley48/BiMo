<template>
  <div class="account">
    <div class="manage-group">
      <h2>密码管理</h2>
      <div class="content">
        <input type="password" v-model="password" />
        <input type="password" v-model="confirm" />
        <input type="button" value="修改密码" @click="updatePassword" />
      </div>
    </div>
    <div class="manage-group">
      <h2>登录管理</h2>
      <input type="button" value="注销登录" @click="logout" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      password: "12345678",
      confirm: "12345678",
    };
  },
  computed: {
    ...mapState(["isAdminLogin"]),
  },
  methods: {
    encode(str) {
      return btoa(encodeURIComponent(str));
    },
    updatePassword() {
      // this.password.trim();
      // this.confirm.trim();
      if (this.password !== "" && this.password === this.confirm) {
        $.post(
          "/api/update?password",
          JSON.stringify({
            username: this.encode(sessionStorage.getItem("adminName")),
            password: this.encode(this.password),
          }),
          (resp) => {
            console.log(resp);
            if (resp.code === 200) {
              this.$emit("logout");
              this.$store.commit("adminLogout");
            }
          }
        );
      }
    },
    logout() {
      if (confirm("是否退出登录？")) {
        this.$emit("logout");
        // return;
        $.get("/api/login", (resp) => {
          console.log(resp);
          // 更改登录状态标志
          if (resp.code === 200) {
            this.$store.commit("adminLogout");
          }
        });
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.account {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  input {
    border-radius: 0.75rem;
    margin-bottom: 0.5rem;
    display: block;

    &[type="password"] {
      padding: 0 0.5rem;
      &:invalid {
        border: 1.5px solid tomato;

        & + input[type="button"] {
          pointer-events: none;
          cursor: not-allowed;
        }
      }
    }

    &[type="button"] {
      border: 1.5px solid gray;
      padding: 0 0.5rem;
    }
  }
}
</style>