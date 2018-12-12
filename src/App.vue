<template>
  <div id="app">
    <!-- header -->
    <mt-header :title="headTitle" fixed>
      <span @click="goBack" slot="left" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <!-- content -->
    <router-view class="content"></router-view>
    <!-- 底部导航 -->
    <myTabbar :selected="selected" :icons="icons" :iconsSelected="iconsSelected"></myTabbar>
  </div>
</template>
<script>
import myTabbar from "@/components/tabbar.vue";
export default {
  components: {
    myTabbar
  },
  data() {
    return {
      selected: "home", //默认tabbar首页selected
      icons: [
        //模拟拿到的数据
        require("@/assets/img/icon/home.png"),
        require("@/assets/img/icon/classify.png"),
        require("@/assets/img/icon/cart.png"),
        require("@/assets/img/icon/my.png")
      ],
      iconsSelected: [
        //模拟拿到的数据
        require("@/assets/img/icon/home-selected.png"),
        require("@/assets/img/icon/classify-selected.png"),
        require("@/assets/img/icon/cart-selected.png"),
        require("@/assets/img/icon/my-selected.png")
      ],
      headTitle: "篮球小店",
      flag: false //用来开闭返回按钮
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  watch: {
    "$route.path": function(now, old) {
      switch (now) {
        case "/home":
          this.flag = false;
          this.headTitle = "篮球小店";
          break;
        case "/classify":
          this.flag = true;
          this.headTitle = "全部分类";
          break;
        case "/cart":
          this.flag = true;
          this.headTitle = "购物车";
          break;
        case "/my":
          this.flag = true;
          this.headTitle = "个人中心";
          break;
        case "/todayGame":
          this.flag = true;
          this.headTitle = "今日比赛";
          break;
        case "/rank":
          this.flag = true;
          this.headTitle = "球队排名";
          break;
        case "/news":
          this.flag = true;
          this.headTitle = "今日热点";
          break;
        case "/star":
          this.flag = true;
          this.headTitle = "超级球星";
          break;
        case "/shop":
          this.flag = true;
          this.headTitle = "购物中心";
          break;
        case "/videos":
          this.flag = true;
          this.headTitle = "精彩集锦";
          break;
        case "/todayGame/matchinfo":
          this.flag = true;
          this.headTitle = "比赛详情";
          break;
        case "/news/newinfo":
          this.flag = true;
          this.headTitle = "新闻详情";
          break;
        case "/videos/videoplay":
          this.flag = true;
          this.headTitle = "视频播放";
          break;
        case "/productdetail":
          this.flag = true;
          this.headTitle = "产品详情";
          break;
        case "/pay":
          this.flag = true;
          this.headTitle = "支付";
          break;
        case "/login":
          this.flag = true;
          this.headTitle = "登录";
          break;
      }
    }
  }
};
</script>

<style lang="less">
body{
  margin: 0;
  padding:0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  p,
  ul,
  li,
  h3,
  h1,
  h2 {
    margin: 0;
    padding: 0;
  }
  ul,
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: black;
  }
  input {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-appearance: none;
    outline: none;
    border: none;
  }
  .content {
    padding-top: 40px;
    padding-bottom: 55px;
  }
}
</style>
