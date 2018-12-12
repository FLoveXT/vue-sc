<template>
  <div class="rank-wrap">
    <grid-wrap :itemNumX="itemNumX" :itemHeight="itemHeight" class="teamData" v-for="(item,k) in teamRank" :key="k">
      <grid-item class="row">
        <p>东部排名</p>
        <p>胜</p>
        <p>负</p>
        <p>胜场差</p>
        <p>胜率</p>
      </grid-item>
      <grid-item v-for="(item,index) in item" :key="index" class="row team">
        <div class="teamInfo">
          <span>{{(index+1 >= 10 ? index+1:`0${index+1}`)}}</span>
          <img :src="item.logo" alt="">
          <p>{{item.team}}</p>
        </div>
        <p>{{item.win}}</p>
        <p>{{item.lose}}</p>
        <p>{{item.diff}}</p>
        <p>{{item.prob}}</p>
      </grid-item>
    </grid-wrap>
  </div>
</template>

<script>
export default {
  name: "rank",
  data() {
    return {
      teamRank: {},
      itemNumX: 1,
      itemHeight: 40
    };
  },
  created() {
    this.$axios.get("/rank").then(res => {
      this.teamRank = res.data.rank;
    });
  }
};
</script>
<style lang="less" scoped>
.rank-wrap {
  .row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    &:nth-of-type(1) {
      background-color: #ec6a86;
      color: #fff;
      p {
        &:nth-of-type(1) {
          width: 120px;
        }
      }
    }
    .teamInfo {
      width: 100px;
      display: flex;
      justify-content: flex-start;
    }
  }
}
</style>
