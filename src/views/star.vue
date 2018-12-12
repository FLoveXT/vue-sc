<template>
  <div class="star-wrap">
    <scroll-x :data="msg" @getActiveValue="getActiveValue"></scroll-x>
    <div class="head">
      <p>球员</p>
      <p>球队</p>
      <p>数据</p>
    </div>
    <mt-tab-container v-model="active" class="container">
      <mt-tab-container-item v-for="(item,index) in playerData" :key="index" :id="`tab${index+1}`">
        <div v-for="(items,index) in item" :key="index">
          <grid-wrap :itemNumX="itemNumX" :itemHeight="itemHeight" v-for="(itemss,index) in items" :key="index" class="item-wrap">
            <grid-item class="row">
            <div class="left">
              <p class="rank">{{index+1}}</p>
              <img :src="itemss.avatar" alt="">
              <p class="name">{{itemss.name}}</p>
            </div>
            <div class="right">
              <p class="team">{{itemss.team}}</p>
              <p class="playData">{{itemss.points}}</p>
            </div>
          </grid-item>
          </grid-wrap>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  name: "star",
  data() {
    return {
      msg: [
        "得分",
        "篮板",
        "助攻",
        "抢断",
        "盖帽",
        "失误",
        "命中率",
        "上场时间"
      ],
      active: "tab1",
      itemNumX: 1,
      itemHeight: 40,
      playerData: []
    };
  },
  created() {
    this.$axios.get("/playerdata").then(res => {
      this.playerData = res.data.playerDataArr;
    });
  },
  methods: {
    /**
     * 从子组件获取每次点击后的active的值，好切换容器
     */
    getActiveValue(value) {
      this.active = value;
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
.star-wrap {
  overflow: hidden;
  padding: 0;
  .head {
    display: flex;
    justify-content: space-around;
    height: 30px;
    line-height: 30px;
    background-color: #26a2ff;
    position: fixed;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 0;
    p {
      &:nth-of-type(1) {
        width: 40%;
      }
    }
  }
  .container {
    position: absolute;
    top: 120px;
    right: 0;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: -1;
    -webkit-overflow-scrolling: touch;
    .item-wrap {
      margin: 0;
      padding: 0;
      justify-content: space-around;
    }
    .row {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      padding: 0;
      .one-px(#26a2ff);
      .left {
        width: 53%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        p {
          &:nth-of-type(1) {
            width: 20%;
          }
          &:nth-of-type(3) {
            width: 50%;
            overflow: hidden;
          }
        }
        img {
          width: 30px;
          height: 30px;
          padding-right: 10px;
        }
      }
      .right {
        width: 47%;
        display: flex;
        justify-content: space-around;
        .team {
          width: 50px;
        }
        .playData {
          width: 50px;
        }
      }
    }
  }
}
</style>
