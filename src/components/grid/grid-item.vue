<template>
  <div class="gird-item" ref="gridItem">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "grid-item"
};
</script>
<style lang="less" scoped>
.gird-item {
  // width: 48%;
  // height: 50px;
  background-color: #ccc;
  margin-left: 0.5%;
  margin-right: 0.5%;
  margin-bottom: 5px;
}
</style>