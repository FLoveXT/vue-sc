<template>
  <div class="video-wrap">
    <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore">
      <grid-wrap class="video-content">
        <grid-item class="row" v-for="(item,index) in videoData" :key="index">
          <router-link :to="{path:'/videos/videoplay',query:{videoId:item.videoId}}">
          <div class="top">
            <img :src="item.videoImg" alt="">
            <p class="durationTime">{{item.duration}}</p>
          </div>
          <div class="title">
            <h2>湖人vs骑士第三节集锦{{item.title}}</h2>
          </div>
          <div class="info">
            <p>腾讯视频</p>
            <p>{{item.subTime|relativeTime}}</p>
          </div>
          </router-link>
        </grid-item>
      </grid-wrap>
    </mt-loadmore>
  </div>
</template>

<script>
export default {
  name: "videos",
  data() {
    return {
      videoData: [],
      allLoaded: false
    };
  },
  created() {
    this.reqVideoData();
  },
  methods: {
    loadTop(){
      this.reqVideoData();
      this.$refs.loadmore.onTopLoaded(); // 固定方法，查询完要调用一次，用于重新定位
    },
    reqVideoData() {
      this.$axios.get("/videodata").then(res => {
        this.videoData = res.data.videodata.concat(this.videoData);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.video-wrap {
  .video-content {
    -webkit-overflow-scrolling:touch;
    .row {
      background-color: #fff;
      width: 49%;
      height: 180px;
      .top {
        height: 100px;
        background-color: red;
        position: relative;
        img {
          width: 100%;
          height: 100px;
        }
        .durationTime {
          position: absolute;
          right: 10px;
          bottom: 5px;
          font-size: 12px;
          width: 25%;
          line-height: 20px;
          height: 20px;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 20px;
        }
      }
      .title {
        h2 {
          font-size: 16px;
          line-height: 25px;
          text-align: left;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #999;
        font-size: 14px;
        margin-top: 10px;
      }
    }
  }
}
</style>

