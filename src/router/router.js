import Vue from "vue";
import Router from "vue-router";

import Agent from "../pages/agent/index.vue";
import Goods from "../pages/goods/index.vue";
import Order from "../pages/order/index.vue";
import Merchant from "../pages/merchant/index.vue";
import User from "../pages/user/index.vue";
Vue.use(Router);
const routes = [
  { path: "/agent", component: Agent },
  { path: "/goods", component: Goods },
  { path: "/order", component: Order },
  { path: "/", component: Merchant },
  { path: "/user", component: User },
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new Router({
  routes, // (缩写) 相当于 routes: rosutes
  mode: "history",
});

export default router;
