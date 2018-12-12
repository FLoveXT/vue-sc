<template>
  <div class="cart-wrap">
    <div class="wrap">
      <div
      class="hahaha"
      ref="hahaha"
    >
      <ul>
        <li
          v-for="(item,index) in arr"
          :key="index"
          @click="selectItem(index,$event)"
        >{{item}}</li>
      </ul>
    </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "shop",
  data() {
    return {
      msg: "shop",
      y:"",
      arr: ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"]
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.shopscroll) {
        this.shopscroll = new BScroll(this.$refs.hahaha, {
          click: true,
          probeType:3
        });
        this.shopscroll.on('scroll',(pos)=>{
          this.y = Math.abs(Math.round(pos.y))
        })
      }else{
        this.shopscroll.refresh();
      }
    });
  },
  methods:{
    selectItem(index,ev){
      console.log(index)
      console.log(ev)
    }
  }
};
</script>
<style lang="less" scoped>
.wrap {
  display: flex;
  position: absolute;
  top: 40px;
  bottom: 40px;
  width: 100%;
  overflow: hidden;
  background: #fff;
}
.hahaha {
  width: 100%;
  li {
    width: 100%;
    height: 100px;
    text-align: center;
  }
}
</style>
