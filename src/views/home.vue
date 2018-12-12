<template>
  <div class="home-wrap">
    <!-- banner -->
    <my-swipe :bannerArr="bannerArr" :bannerH="bannerH"></my-swipe>
    <!-- nav -->
    <grid-wrap :itemNumX="itemNumX" :itemHeight="itemHeight" class="nav">
      <grid-item v-for="item in navArr" :key="item.id">
        <router-link :to="item.path">
          <img :src="item.url">
          <h4>{{item.title}}</h4>
        </router-link>
      </grid-item>
    </grid-wrap>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      bannerArr: [//模拟拿到的数据
        require("@/assets/img/banner01.jpg"),
        require("@/assets/img/banner02.jpg"),
        require("@/assets/img/banner03.jpg"),
        require("@/assets/img/banner04.jpg")
      ],
      bannerH: 200,//设置banner高度
      itemNumX:2,//控制gird一行显示多少个item
      itemHeight:80,//控制item的高度
      navArr:[
        {id:1,title:'今日赛事',url:require("@/assets/img/nav/todayGame.png"),path:'/todayGame'},
        {id:2,title:'球队排名',url:require("@/assets/img/nav/rank.png"),path:'/rank'},
        {id:3,title:'今日热点',url:require("@/assets/img/nav/news.png"),path:'/news'},
        {id:4,title:'超级球星',url:require("@/assets/img/nav/star.png"),path:'/star'},
        {id:5,title:'购物中心',url:require("@/assets/img/nav/shop.png"),path:'/classify'},
        {id:6,title:'精彩集锦',url:require("@/assets/img/nav/vip.png"),path:'/videos'},
        ]
    };
  }
};
</script>
<style lang="less" scoped>
.nav{
  a{
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-decoration: none;
    img{
      width: 80px;
      height: 80px;
    }
    h4{
      color:black;
    }
  }
}
</style>

