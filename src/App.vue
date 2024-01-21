<template>
  <div id="app">
    <div v-if="!isLogin" class="not-login">
      <div class="header-logo">海洋国际管理后台</div>
      <h2>请登录</h2>
      <div class="login-card">
        <div class="login-item">
          用户名：
          <el-input
            placeholder="请输入用户名"
            v-model="username"
            clearable
          ></el-input>
        </div>
        <div class="login-item">
          密码：
          <el-input
            placeholder="请输入密码"
            v-model="password"
            show-password
            clearable
          ></el-input>
        </div>
      </div>
      <el-button type="primary" round class="login-btn" @click="onLogin"
        >登录</el-button
      >
    </div>
    <div v-else style="height: 100%">
      <div class="header">
        <div class="header-logo">海洋国际管理后台</div>
        <div class="user">用户名:{{ adminName }}</div>
      </div>
      <div class="container">
        <div class="siderbar-aside">
          <el-menu :default-active="activeIndex" class="menu-vertical" router>
            <el-menu-item
              :index="menu.path"
              v-for="(menu, key) in menuList"
              :key="key"
            >
              <i :class="menu.icon"></i>
              <span slot="title">{{ menu.name }}</span>
            </el-menu-item>
          </el-menu>
        </div>
        <!-- 右侧内容区域 -->
        <div class="siderbar-main">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api/admin";
import { mixins } from "./lib/mixin";
export default {
  name: "App",
  mixins: [mixins],
  data() {
    return {
      isLogin: true,
      username: "",
      password: "",
      activeIndex: "/",
      adminName: "",
      menuList: [
        {
          name: "商家管理",
          path: "/",
          icon: "el-icon-menu",
        },
        {
          name: "商品管理",
          path: "/goods",
          icon: "el-icon-goods",
        },
        {
          name: "代理管理",
          path: "/agent",
          icon: "el-icon-bangzhu",
        },
        {
          name: "用户管理",
          path: "/user",
          icon: "el-icon-user",
        },
        {
          name: "订单管理",
          path: "/order",
          icon: "el-icon-document",
        },
      ],
    };
  },
  components: {},
  created() {
    this.getUserInfo().then(res => {
      if (res) {
        this.adminName = res.userName;
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  },
  methods: {
    onLogin() {
      if (this.username === "" || this.password === "")
        return this.$message.warning("请先登录");
      API.adminlogin({ userName: this.username, passWord: this.password }).then(
        res => {
          if (res) {
            this.$message.success("登录成功");
            this.isLogin = true;
            this.adminName = res.userName;
          } else {
            this.$message.error("登录失败");
          }
        }
      );
    },
    handleClose() {},
  },
};
</script>
<style lang="less" scoped>
.header-logo {
  font-weight: 700;
  font-family: DINAlternate-Bold;
  font-size: 30px;
  color: #221e6a;
}
.not-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  margin-top: 40px;
  .login-card {
    font-size: 20px;
    .login-item {
      margin-top: 20px;
    }
  }
  .login-btn {
    margin-top: 20px;
    width: 200px;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  cursor: pointer;
  box-shadow: 0 2px 6px 0 rgba(182, 195, 217, 0.26);
  height: 8%;
}
.container {
  display: flex;
  margin-top: 4px;
  height: 92%;
  .menu-vertical {
    height: 100%;
  }
  .siderbar-main {
    padding: 20px;
  }
}
</style>
