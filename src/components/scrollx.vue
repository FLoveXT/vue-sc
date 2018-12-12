<template>
    <div class="tab" ref="tab">
      <div class="tab_content" ref="tabcontent">
        <div class="tab_item" v-for='(item,index) in data' :key="index" :id="`tab${index+1}`" ref="tabitem" @click="show(index)">{{item}}</div>
      </div>
    </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "scroll-x",
  data() {
    return {
      active:'tab1'
    };
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  created() {
    this.$nextTick(() => {
      this.InitTabScroll();
      this.$refs.tabitem[0].style.background = "#498bf8";
    });
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.InitTabScroll();
      });
    }
  },
  methods: {
    InitTabScroll() {
      let width = this.data.length * 70;
      this.$refs.tabcontent.style.width = width + "px";
      this.$nextTick(() => {
        if (!this.myscroll) {
          this.myscroll = new BScroll(this.$refs.tab, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: true,
            eventPassthrough: "vertical"
          });
        } else if (!this.$refs.tab) {
          return;
        } else {
          this.myscroll.refresh();
        }
      });
    },
    show(index) {
      for (var i = 0; i < this.data.length; i++) {
        this.$refs.tabitem[i].style.background = "grey";
      }
      this.$refs.tabitem[index].style.background = "#498bf8";
      //把子组件点击改变的active值传给父组件
      this.active = `tab${index + 1}`;
      this.$emit('getActiveValue',this.active)
    }
  }
};
</script>
<style lang="less" scoped>
  .tab {
    width: 100%;
    white-space: nowrap;
    height: 50px;
    overflow: hidden;
    background-color:grey;
    position: fixed;
    top:40px;
    left:0;
    right: 0;
    bottom: 0;
    .tab_content {
      text-align: center;
      height: 50px;
      .tab_item {
        width: 70px;
        height: 50px;
        display: inline-block;
        font-size: 12px;
        color: white;
        line-height: 50px;
      }
    }
  }
</style>
