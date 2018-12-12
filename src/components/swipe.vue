<template>
  <mt-swipe :auto="autoTime" :style="{'height':bannerH+'px'}">
    <mt-swipe-item v-for="item in bannerArr" :key="item.id">
      <img :src="item">
    </mt-swipe-item>
  </mt-swipe>
</template>
<script>
export default {
  name: "my-swipe",
  props: {
    autoTime: {
      type: Number,
      default: 3000
    },
    bannerArr: {
      type: Array,
      default: null
    },
    bannerH: {
      type: Number,
      default: 0
    }
  }
};
</script>
<style lang="less" scoped>
.mint-swipe {
  // height: 200px;
  .mint-swipe-item {
    text-align: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
