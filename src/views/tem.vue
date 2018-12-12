<template>
  <div class="prodetail-wrap" ref="prodetailWrap">
   <div ref="haha" class="haha">
      <my-swipe :bannerArr="bannerArr" :bannerH="bannerH"></my-swipe>
    <div class="proInfo">
      <h3>{{details.title}}</h3>
      <p class="price">￥{{details.price}}</p>
      <div class="types">
        <p>选择款式</p>
        <ul>
          <li v-for="(item,index) in details.types" :key="index">{{item}}</li>
        </ul>
      </div>
      <div class="color">
        <p>选择颜色</p>
        <ul>
          <li v-for="(item,index) in details.color" :key="index">{{item}}</li>
        </ul>
      </div>
      <div class="infoImg">
        <p>产品详情</p>
        <ul>
          <li v-for="(item,index) in details.detail" :key="index">
            <img v-lazy="item.detailImg">
          </li>
        </ul>
      </div>
    </div>
   </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "prodetail",
  data() {
    return {
      bannerArr:[],
      details:[],
      bannerH:400
    };
  },
  created() {
    const proId = this.$route.query.proId;
    console.log(proId);
    this.$axios.post("/productdetails",{proId}).then(res=>{
      this.bannerArr = res.data.swiper;
      this.details = res.data.info;
      console.log(this.bannerArr)
      console.log(this.details)
    })
  },
  mounted() {
    this.$nextTick(()=>{
      if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.haha, {
            click: true
          });
        }
		})
  },
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
.haha{
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  .proInfo{
    h3{
      color: #333;
			font-size: 18px;
      line-height: 30px;
      text-align: left;
    }
    .price{
			font-size: 16px;
			color: #f63;
      font-weight: bold;
      text-align: left;
      position: relative;
      .one-px(#ccc);
    }
    .types,.color{
      position: relative;
      .one-px(#ccc);
      padding: 10px 0;
      p{
        font-weight: bold;
        text-align: left;
      }
      ul{
        display: flex;
        justify-content: space-around;
        li{
          border: 1px solid #ccc;
          &.active{
            color: #f63
          }
        }
      }
    }
    .infoImg{
      margin-top:10px;
      p{
        font-weight: bold;
        text-align: left;
        position: relative;
        border-bottom: 3px solid #ccc;
      }
       ul{
          li{
            img{
              width: 100%;
            }
          }
        }
    }
  }
}
</style>
