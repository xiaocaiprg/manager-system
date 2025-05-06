import Vue from "vue";
import Router from "vue-router";

import Points from "../pages/Points/index.vue";
import Order from "../pages/order/index.vue";
import Game from "../pages/Game/index.vue";
import User from "../pages/user/index.vue";
Vue.use(Router);
const routes = [
  { path: "/points", component: Points },
  { path: "/order", component: Order },
  { path: "/", component: Game },
  { path: "/user", component: User },
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new Router({
  routes, // (缩写) 相当于 routes: rosutes
  mode: "history",
  base: "/admin/",
});

export default router;
