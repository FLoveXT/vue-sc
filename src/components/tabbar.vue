<template>
  <mt-tabbar
    v-model="message"
    fixed
    v-show="flag"
  >
    <mt-tab-item id="home">
      <img
        slot="icon"
        :src="this.message === 'home'?this.iconsArrSelected[0]:this.iconsArr[0]"
      >
      首页
    </mt-tab-item>
    <mt-tab-item id="classify">
      <img
        slot="icon"
        :src="this.message === 'classify'?this.iconsArrSelected[1]:this.iconsArr[1]"
      >
      分类
    </mt-tab-item>
    <mt-tab-item id="cart">
      <keep-alive>
        <span
          class="cartNum"
          v-if="$store.getters.getOrderNum!==0"
        >{{$store.getters.getOrderNum}}</span>
      </keep-alive>
      <img
        slot="icon"
        :src="this.message === 'cart'?this.iconsArrSelected[2]:this.iconsArr[2]"
      >
      购物车
    </mt-tab-item>
    <mt-tab-item id="my">
      <img
        slot="icon"
        :src="this.message === 'my'?this.iconsArrSelected[3]:this.iconsArr[3]"
      >
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>
<script>
export default {
  name: "my-tabbar",
  data() {
    return {
      message: this.selected,
      iconsArr: this.icons,
      iconsArrSelected: this.iconsSelected,
      flag: true //控制显示tabbar
    };
  },
  props: {
    selected: String,
    icons: Array,
    iconsSelected: Array
  },
  methods: {
    goBack() {
      console.log(1);
    }
  },
  watch: {
    message: function(now, old) {
      switch (now) {
        case "home":
          this.$router.push("/home");
          break;
        case "classify":
          this.$router.push("/classify");
          break;
        case "cart":
          this.$router.push("/cart");
          break;
        case "my":
          this.$router.push("/my");
          break;
      }
    },
    "$route.path": function(now, old) {
      switch (now) {
        case "/home":
          this.flag = true;
          this.headTitle = "篮球小店";
          this.message = "home";
          break;
        case "/classify":
          this.flag = true;
          this.headTitle = "全部分类";
          this.message = "classify";
          break;
        case "/cart":
          this.flag = true;
          this.headTitle = "购物车";
          this.message = "cart";
          break;
        case "/my":
          this.flag = true;
          this.headTitle = "个人中心";
          this.message = "my";
          break;
        default:
          this.flag = false;
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.mint-tab-item {
  position: relative;
  span {
    position: absolute;
    top: 5px;
    right: 35%;
    width: 15px;
    height: 15px;
    line-height: 15px;
    background-color: red;
    border-radius: 50%;
  }
}
</style>

