<template>
  <div class="matchInfo-wrap">
    <video-player
      class="video-player-box"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
    >
    </video-player>
    <div class="info">
      <div class="tab">
        <div
          v-for="(item,index) in tabItems"
          :key="index"
          ref="tab"
          @click="tab(index)"
        >{{item}}</div>
        <div
          class="tab-line"
          ref="tabRedLine"
        ></div>
      </div>
      <mt-tab-container
        v-model="active"
        class="tab-container"
      >
        <mt-tab-container-item id="tab1">
          <mt-cell
            v-for="(item,index) in situation"
            title="直播员："
            :key="index"
          >
            {{item.content}}({{item.leftTime}})
          </mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item
          id="tab2"
          ref="tab2"
        >
          <div
            v-for="(item,index) in chatRoom"
            :key="index"
            class="tab2-item"
          >
            <div class="user">
              <div>
                <img :src="item.avatar">
                <p>{{item.username}}</p>
              </div>
              <span>{{item.time}}</span>
            </div>
            <div class="comment">
              {{item.comment}}
            </div>
          </div>
          <div class="sendMsg">
            <input
              type="text"
              placeholder="我来说两句:"
              class="inputContent"
              v-model="commentMsg"
            >
            <mt-button
              size="small"
              type="primary"
              class="sendCommentMsg"
              @click="sendCommentMsg"
            >发送</mt-button>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab3">
          <grid-wrap
            :itemNumX="itemNumX"
            :itemHeight="itemHeight"
            class="teamData"
            v-for="(item,index) in temData"
            :key="index"
          >
            <grid-item class="teamName">{{index}}队</grid-item>
            <grid-item class="row">
              <p>球员</p>
              <p>时间</p>
              <p>得分</p>
              <p>篮板</p>
              <p>助攻</p>
            </grid-item>
            <grid-item
              v-for="(item,index) in item"
              :key="index"
              class="row team"
            >
              <p>{{item.player}}</p>
              <p>{{item.playTime}}</p>
              <p>{{item.score}}</p>
              <p>{{item.rebound}}</p>
              <p>{{item.Assists}}</p>
            </grid-item>
          </grid-wrap>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
//引入视频播放器
import "video.js/dist/video-js.css";
import { MessageBox } from "mint-ui";
import { videoPlayer } from "vue-video-player";
export default {
  name: "matchInfo",
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
      },
      active: "tab1",
      tabItems: ["赛况", "大家聊", "数据"],
      temRef: "tab1",
      situation: [],
      homeData: [],
      guestData: [],
      chatRoom: [],
      itemNumX: 1,
      itemHeight: 40,
      temData: {},
      commentMsg: ""
    };
  },
  components: {
    videoPlayer
  },
  created() {
    const mid = this.$route.query.mid;
    //申请数据
    this.$axios.post("/match/matchinfo", { mid }).then(res => {
      this.situation = res.data.situation.item;
      this.temData = res.data.data;
      this.homeData = res.data.data.guest;
      this.guestData = res.data.data.home;
      this.chatRoom = res.data.chatRoom.users;
    });
  },
  mounted() {
    //对红色滑块的left和width初始化
    this.$refs.tabRedLine.style.width = this.$refs.tab[0].offsetWidth + "px";
    this.$refs.tabRedLine.style.left = this.$refs.tab[0].offsetLeft + "px";
  },
  methods: {
    /**
     * 点击tab栏目，小红left和width动态设置
     * 切换tab-container
     */
    tab(index) {
      this.active = `tab${index + 1}`;
      this.$refs.tabRedLine.style.transition = "all 0.3s ease-in";
      this.$refs.tabRedLine.style.left =
        this.$refs.tab[index].offsetLeft + "px";
      this.$refs.tabRedLine.style.width =
        this.$refs.tab[index].offsetWidth + "px";
    },
    /**
     * 点击发送消息按钮，
     * 先要判断用户是否登录，登录后可操作，没登录，跳转到登录页面
     * 消息为空，点击无效
     * 这里模拟发送给后台，更新数据
     */
    sendCommentMsg() {
      if (!this.$store.state.user.token) {
        MessageBox.confirm("亲,请先登录哦").then(action => {
          this.$router.push("/login");
        });
      } else {
        if (!this.commentMsg) {
          return; //为空
        }
        let msgObj = {
          avatar: "http://dummyimage.com/30x30/png",
          username: this.$store.state.user.username,
          time: new Date(),
          comment: this.commentMsg
        };
        this.chatRoom.push(msgObj);
      }
        this.commentMsg = "";
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
.matchInfo-wrap {
  video-player {
    position: fixed;
    top: 40px;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .info {
    .tab {
      width: 100%;
      display: flex;
      justify-content: space-around;
      height: 40px;
      line-height: 40px;
      position: fixed;
      top: 250px;
      right: 0;
      bottom: 0;
      left: 0;
      .one-px(#ccc);
      .tab-line {
        position: absolute;
        bottom: 0px;
        height: 5px;
        background-color: red;
      }
    }
    .tab-container {
      position: absolute;
      top: 290px;
      right: 0;
      bottom: 0;
      left: 0;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 10px;
      padding-bottom: 30px;
      .tab2-item {
        display: flex;
        flex-direction: column;
      }
      .user {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        img,
        p,
        span {
          display: inline-block;
        }
      }
      .comment {
        width: 100%;
        height: 40px;
      }
      .sendMsg {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        .inputContent {
          width: 80%;
          height: 100%;
          padding-left: 10px;
        }
        .sendCommentMsg {
          width: 20%;
        }
      }
    }
    .teamData {
      .teamName {
        background-color: #ec6a86;
        margin-bottom: 0;
        text-align: left;
        line-height: 50px;
        padding-left: 5px;
        color: #fff;
      }
      .row {
        display: flex;
        justify-content: space-around;
        text-align: center;
        line-height: 40px;
        p {
          &:nth-of-type(1) {
            width: 20%;
          }
        }
      }
    }
  }
}
</style>
