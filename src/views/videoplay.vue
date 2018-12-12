<template>
  <div class="videoplay-wrap">
    <video-player class="video-player-box" ref="videoPlayer" :options="playerOptions" :playsinline="true">
    </video-player>
    <h1>湖人vs骑士第三节回放</h1>
  </div>
</template>

<script>
//引入视频播放器
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
export default {
  name: "videoplay",
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        autoplay: false,
        muted: false,
        loop: false,
        preload: "auto",
        language: "zh-CN",
        aspectRatio: "16:9",
        fluid: true,
        sources: [
          {
            type: "video/mp4",
            src: "" //url地址
          }
        ],
        poster: "", //你的封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  components: {
    videoPlayer
  },
  created() {
    // const videoId = this.$route.query.videoId;
    // //申请数据
    // this.$axios.post("/match/matchinfo", { videoId }).then(res => {
    // });
  }
};
</script>
