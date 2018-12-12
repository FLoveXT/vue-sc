<template>
  <div class="news-wrap" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul>
        <li v-for="item in news" :key="item.newId">
          <router-link :to="{path:'/news/newinfo',query:{newId:item.newId}}" class="toNewInfo">
            <div class="left">
              <h3>{{item.title}}</h3>
              <div class="info">
                <p>{{item.time|relativeTime}}</p>
                <p>{{item.comments}}评</p>
              </div>
            </div>
            <div class="right">
              <img :src="item.image">
            </div>
          </router-link>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
export default {
  name: "news",
  data() {
    return {
      news: [],
      scrollMode: "auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      allLoaded: false //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
    };
  },
  created() {
    this.requestNews();
  },
  methods: {
    requestNews() {
      this.$axios.get("/news").then(res => {
        //使用mock模拟的这个数据，每次重新的发送请求，获取的code不变？除非重新刷新页面
        if (res.data.code === 1) {
          //表示没有数据了，不能进行上拉了
          this.allLoaded = true;
        }else{
          this.news = [...res.data.news,...this.news];
        }
        this.$nextTick(() => {
          this.scrollMode = "touch";
        });
      });
    },
    loadTop() {
      this.requestNews();
      this.$refs.loadmore.onTopLoaded(); // 固定方法，查询完要调用一次，用于重新定位
    }
  }
};
</script>
<style lang="less" scoped>
.one-px(@color) {
  &::before {
    content: "";
    position: absolute;
    display: block;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: @color;
    @media (-webkit-device-pixel-ratio: 2) {
      transform: scaleY(0.5);
    }
    @media (-webkit-device-pixel-ratio: 3) {
      transform: scaleY(0.333333333);
    }
  }
}
.news-wrap {
  ul {
    li {
      .toNewInfo {
        display: flex;
        justify-content: space-between;
        height: 80px;
        overflow: hidden;
        padding: 5px 0;
        position: relative;
        .one-px(#ccc);
        .left {
          width: 60%;
          h3 {
            font-size: 16px;
            color: black;
            font-weight: 500;
            height: 60px;
            line-height: 30px;
            text-align: left;
          }
          .info {
            display: flex;
            font-size: 12px;
            color: gray;
            height: 20px;
            line-height: 20px;
            justify-content: space-between;
          }
        }
        .right {
          width: 30%;
          border-radius: 3px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
