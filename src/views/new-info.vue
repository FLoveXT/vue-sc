<template>
  <div class="newInfo-wrap" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <h1>库里格林缺阵致球队攻防崩塌，阿杜单核带不动球队</h1>
    <p class="time">2018-11-20</p>
    <div class="content-container">
      <div class="contents" ref="contents">
        <div class="article">
          <p>昨天，湖人在客场109-105击败骑士，再次回到家乡的勒布朗-詹姆斯感谢球迷为他欢呼，他说和8年前重返克利夫兰相比，他现在已经大为不同。</p>
          <p><img src="@/assets/img/banner01.jpg" alt=""></p>
          <p>这场比赛，詹姆斯拼尽全力，砍下32分14个篮板7次助攻，率队在最后逆转了骑士，获得了胜利。“最后时刻就是想做出拦截，阻击对手，站到罚球线上，我们很好地执行了这些，获得了胜利。”詹姆斯很满意能够在家乡获得胜利，他也说自己尽量控制情绪打好球，“我的事情就是要站到球场上，这是主要的事情，我要在攻防两端执行好。”</p>
          <p><img src="@/assets/img/banner02.jpg" alt=""></p>
          <p>昨天，湖人在客场109-105击败骑士，再次回到家乡的勒布朗-詹姆斯感谢球迷为他欢呼，他说和8年前重返克利夫兰相比，他现在已经大为不同。</p>
          <p><img src="@/assets/img/banner03.jpg" alt=""></p>
          <p>昨天，湖人在客场109-105击败骑士，再次回到家乡的勒布朗-詹姆斯感谢球迷为他欢呼，他说和8年前重返克利夫兰相比，他现在已经大为不同。</p>
        </div>
        <div class="fuzzy" v-show="isFuzzy"></div>
      </div>
      <div class="check-all">
        <mt-button type="primary" @click="addMore()" v-show="needBtn">加载更多</mt-button>
      </div>
    </div>
    <div class="comment-container">
      <div class="post-comment">
        <mt-field placeholder="登录后评论" type="textarea" rows="4" class="commentArea" v-model="commentContent"></mt-field>
        <mt-button type="primary" class="postBtn" @click="postComment()">提交评论</mt-button>
      </div>
      <div class="comment-list">
        <h2>热门评论</h2>
        <grid-wrap :itemNumX="itemNumX" :itemHeight="itemHeight" class="teamData">
          <grid-item class="row" v-for="(item,index) in comments" :key="index">
            <div class="avatar">
              <img :src="item.avatar" alt="">
            </div>
            <div class="comment-main">
              <div class="top">
                <div class="nick">{{item.nick}}</div>
                <div class="comment-info">
                  <div class="tiem">{{item.time}}</div>
                  <div class="comment-num">{{item.commentNum}}评</div>
                  <div class="like">{{item.likeNum}}赞</div>
                </div>
              </div>
              <div class="comment-content">
                {{item.content}}
              </div>
            </div>
          </grid-item>
        </grid-wrap>
        <mt-button type="primary" class="comment-more" @click="commentMore()">更多评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  name: "newinfo",
  data() {
    return {
      comments: [],
      scrollMode: "auto",
      isFuzzy: true, //用来控制白色模糊部分的显示
      needBtn: true, //用来控制按钮显示
      itemNumX: 1,
      itemHeight: 80,
      newId: "",
      commentContent:""
    };
  },
  created() {
    this.newId = this.$route.query.newId;
    this.requestComments(this.newId)
  },
  methods: {
    addMore() {
      /**
       * 点击加载更多，
       * button消失，白色模糊消失，contents的max-height变为继承
       */
      this.$refs.contents.style.maxHeight = "inherit";
      this.$refs.contents.style.overflowY = "inherit";
      this.isFuzzy = false;
      this.needBtn = false;
    },
    commentMore() {
      /**
       * 点击加载更多评论
       */
      this.requestComments(this.newId)
    },
    requestComments(newId) {//发送请求
      this.$axios.post("/usercomment", { newId: newId }).then(res => {
        // this.comments = res.data.comments.concat(this.comments);
        this.comments = [...res.data.comments,...this.comments];
      });
    },
    /**
     * 点击发送评论，
     * 先要判断用户是否登录，没登录就跳转到登录界面
     * 判断用户是否输入值，无则点击没反应
     * 有则，获取用户id，和内容发送到后台并更新页面
     */
    postComment(){
      if (!this.$store.state.user.token) {
        MessageBox.confirm("亲,请先登录哦").then(action => {
          this.$router.push("/login");
        });
      } else {
        if(!this.commentContent){
        return;
      }
        let msgObj = {
          avatar: "http://dummyimage.com/30x30/png",
          nick: this.$store.state.user.username,
          time: new Date(),
          commentNum:0,
          likeNum:0,
          content: this.commentContent
        };
        this.comments.unshift(msgObj);
      }
      this.commentContent = "";
    }
  }
};
</script>
<style lang="less">
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
.newInfo-wrap {
  overflow-x: hidden;
  h1 {
    text-align: left;
  }
  .time {
    text-align: left;
    position: relative;
    line-height: 30px;
    .one-px(#ccc);
  }
  .content-container {
    .contents {
      max-height: 600px;
      overflow: hidden;
      position: relative;
      .article {
        img {
          width: 100%;
        }
      }
      .fuzzy {
        position: absolute;
        bottom: 0;
        height: 150px;
        width: 100%;
        background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0), #fff);
      }
    }
  }
  .comment-container {
    .post-comment {
      .commentArea {
        border: 1px solid #ccc;
        border-radius: 5px;
        margin: 10px 0;
      }
      .postBtn {
        width: 100%;
      }
    }
    .comment-list {
      h2 {
        text-align: left;
        position: relative;
        line-height: 50px;
        .one-px(#ccc);
      }
      .row {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        width: 100%;
        .avatar {
          width: 10%;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }
        .comment-main {
          width: 90%;
          display: flex;
          flex-direction: column;
          .top {
            .nick {
              text-align: left;
            }
            .comment-info {
              display: flex;
              justify-content: space-between;
              .tiem {
                width: 70%;
                text-align: left;
              }
            }
          }
          .comment-content {
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
      .comment-more {
        width: 100%;
      }
    }
  }
}
</style>

