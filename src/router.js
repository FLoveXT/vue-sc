import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

Vue.use(Router);

if (localStorage.getItem("token")) {
  store.commit("setToken", localStorage.getItem("token"));
  store.commit("getUserName", localStorage.getItem("username"));
}

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/home.vue"),
    meta: { title: "haha" }
  },
  {
    path: "/classify",
    name: "classify",
    component: () =>
      import(/* webpackChunkName: "classify" */ "@/views/classify.vue")
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import(/* webpackChunkName: "cart" */ "@/views/cart.vue")
  },
  {
    path: "/my",
    name: "my",
    component: () => import(/* webpackChunkName: "my" */ "@/views/my.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/todayGame",
    name: "todayGame",
    component: () =>
      import(/* webpackChunkName: "todayGame" */ "@/views/today-game.vue")
  },
  {
    path: "/rank",
    name: "rank",
    component: () => import(/* webpackChunkName: "rank" */ "@/views/rank.vue")
  },
  {
    path: "/news",
    name: "news",
    component: () => import(/* webpackChunkName: "news" */ "@/views/news.vue")
  },
  {
    path: "/star",
    name: "star",
    component: () => import(/* webpackChunkName: "star" */ "@/views/star.vue")
  },
  {
    path: "/shop",
    name: "shop",
    component: () => import(/* webpackChunkName: "shop" */ "@/views/shop.vue")
  },
  {
    path: "/videos",
    name: "videos",
    component: () =>
      import(/* webpackChunkName: "videos" */ "@/views/videos.vue")
  },
  {
    path: "/todayGame/matchinfo",
    name: "matchInfo",
    component: () =>
      import(/* webpackChunkName: "matchInfo" */ "@/views/match-info.vue")
  },
  {
    path: "/news/newinfo",
    name: "newinfo",
    component: () =>
      import(/* webpackChunkName: "newinfo" */ "@/views/new-info.vue")
  },
  {
    path: "/videos/videoplay",
    name: "videoplay",
    component: () =>
      import(/* webpackChunkName: "videoplay" */ "@/views/videoplay.vue")
  },
  {
    path: "/productdetail",
    name: "prodetail",
    component: () =>
      import(/* webpackChunkName: "prodetail" */ "@/views/product-detail.vue")
  },
  {
    path: "/pay",
    name: "pay",
    component: () => import(/* webpackChunkName: "pay" */ "@/views/pay.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/login.vue")
  }
]

const router = new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes: routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth) && (!store.state.user.token)) {
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
})

export default router;
