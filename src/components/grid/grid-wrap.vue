<template>
  <div class="grid-wrap" ref="gridWrap">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "grid-wrap",
  props: {
    itemNumX: {
      //设置一行多少个item
      type: Number,
      default: 2
    },
    itemHeight: {
      //设置元素高度
      type: Number,
      default: 50
    }
  },
  mounted() {
    this.$nextTick(() => {
      for (var i = 0; i < this.$refs.gridWrap.children.length; i++) {
        this.$refs.gridWrap.children[i].style.width =
          (100 - this.itemNumX) / this.itemNumX + "%";
        this.$refs.gridWrap.children[i].style.height = this.itemHeight + "px";
      }
    });
  }
};
</script>
<style lang="less" scoped>
.grid-wrap {
  width: 100%;
  display: -webkit-box;
  display: flex;
  -webkit-box-lines: multiple;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>