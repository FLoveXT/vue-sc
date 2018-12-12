<template>
  <div
    class="todayGame-wrap"
    ref="tdGame"
  >
    <grid-wrap
      :itemNumX="itemNumX"
      :itemHeight="itemHeight"
      class="nav"
      v-for="(item,index) in matchs"
      :key="index"
    >
      <grid-item class="time">{{item.time}}</grid-item>
      <grid-item class="row">
        <p>主队</p>
        <p>比分</p>
        <p>客队</p>
      </grid-item>
      <grid-item
        v-for="item in item.matchs"
        :key="item.mid"
        class="row team"
      >
        <router-link
          :to="{path:'/todayGame/matchinfo',query:{mid:item.mid}}"
          class="row"
        >
          <div class="left">
            <img :src="item.leftLogo">
            <p>{{item.leftName}}</p>
          </div>
          <div class="status">
            <div class="quarter">第{{item.quarter}}节</div>
            <div class="goal">
              <p>{{item.leftGoal}}</p>
              <p>-</p>
              <p>{{item.rightGoal}}</p>
            </div>
          </div>
          <div class="right">
            <img :src="item.rightLogo">
            <p>{{item.rightName}}</p>
          </div>
        </router-link>
      </grid-item>
    </grid-wrap>
  </div>
</template>

<script>
export default {
  name: "todayGame",
  data() {
    return {
      itemNumX: 1,
      itemHeight: 50,
      matchs: []
    };
  },
  created() {
    this.$axios.get("/match").then(res => {
      this.matchs = res.data.data;
    });
  }
};
</script>
<style lang="less" scoped>
.todayGame-wrap {
  .time {
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
    align-items: center;
    a {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-decoration: none;
      color: #ec6a86;
    }
  }
  .team {
    img {
      width: 25px;
      height: 25px;
    }
    .goal {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
