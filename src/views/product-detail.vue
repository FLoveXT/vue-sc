<template>
  <div class="cart-wrap">
    <div class="wrap">
      <div
        class="proCon"
        ref="proCon"
      >
        <ul>
          <li class="banner">
            <my-swipe
              :bannerArr="bannerArr"
              :bannerH="bannerH"
            ></my-swipe>
          </li>
          <li class="proInfo">
            <h3>{{details.title}}</h3>
            <p class="price">￥{{priceList[typeActive]}}</p>
          </li>
          <li class="types">
            <p>选择款式</p>
            <ul>
              <li
                v-for="(item,index) in details.types"
                :key="index"
                :class="index == typeActive?'active':''"
                @click="chooseType(index)"
              >{{item}}</li>
            </ul>
          </li>
          <li class="color">
            <p>选择颜色</p>
            <ul>
              <li
                v-for="(item,index) in details.color"
                :key="index"
                :class="index == colorActive?'active':''"
                @click="chooseColor(index)"
              >{{item}}</li>
            </ul>
          </li>
          <li class="infoImg">
            <p>产品详情</p>
            <ul>
              <li
                v-for="(item,index) in details.detail"
                :key="index"
              >
                <img v-lazy="item.detailImg">
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="foot">
      <div class="left">
        <router-link
          :to="{name:'home'}"
          class="goHome"
        >
          <img
            src="@/assets/img/icon/home.png"
            alt=""
          >
        </router-link>
        <router-link
          :to="{name:'cart'}"
          class="goCart"
        >
          <img
            src="@/assets/img/icon/cart.png"
            alt=""
          >
          <keep-alive>
            <span
              class="orderNum"
              v-if="$store.getters.getOrderNum!==0"
            >{{$store.getters.getOrderNum}}</span>
          </keep-alive>
        </router-link>
      </div>
      <div
        class="joinCart"
        @click="joinCart()"
      >
        加入购物车
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { MessageBox } from "mint-ui";
export default {
  name: "shop",
  data() {
    return {
      bannerArr: [],
      details: [],
      priceList: ["0"],
      bannerH: 400,
      typeActive: 0,
      colorActive: 0,
      proId: ""
    };
  },
  created() {
    this.proId = this.$route.query.proId;
    this.$axios.post("/productdetails", { proId: this.proId }).then(res => {
      this.bannerArr = res.data.swiper;
      this.details = res.data.info;
      this.priceList = res.data.info.price;
    });
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.proScroll) {
        this.proScroll = new BScroll(this.$refs.proCon, {
          click: true
        });
      } else {
        this.proScroll.refresh();
      }
    });
  },
  methods: {
    chooseType(index) {
      this.typeActive = index;
    },
    chooseColor(index) {
      this.colorActive = index;
    },
    joinCart() {
      if (!this.$store.state.user.token) {
        MessageBox.confirm("亲,请先登录哦").then(action => {
          this.$router.push("/login");
        });
      } else {
        MessageBox.confirm(
          `商品名称:<span>${this.details.title}</span></br>` +
            `商品价格:${this.priceList[this.typeActive]}</br>` +
            `商品规格:${this.details.types[this.typeActive]}</br>` +
            `商品颜色:${this.details.color[this.colorActive]}`
        ).then(action => {
          const proObj = {
            //商品参数
            proId: this.proId,
            title: this.details.title,
            proImg: this.bannerArr[0],
            price: this.priceList[this.typeActive],
            type: this.details.types[this.typeActive],
            color: this.details.color[this.colorActive],
            isSelected: true
          };
          this.$store.commit("addPro", proObj);
        });
      }
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
.wrap {
  display: flex;
  position: absolute;
  top: 40px;
  bottom: 50px;
  left: 0;
  right: 0;
  width: 100%;
  overflow: hidden;
  background: #fff;
}
.proCon {
  width: 100%;
  li {
    width: 100%;
    height: auto;
  }
  .proInfo {
    h3 {
      color: #333;
      font-size: 18px;
      line-height: 30px;
      text-align: left;
    }
    .price {
      font-size: 16px;
      color: #f63;
      font-weight: bold;
      text-align: left;
      position: relative;
      .one-px(#ccc);
    }
  }
  .types,
  .color {
    position: relative;
    .one-px(#ccc);
    padding: 10px 0;
    p {
      font-weight: bold;
      text-align: left;
      line-height: 30px;
    }
    ul {
      display: flex;
      justify-content: space-around;
      li {
        width: auto;
        border: 1px solid #ccc;
        line-height: 25px;
        border-radius: 5px;
      }
      li {
        &.active {
          color: #f63;
        }
      }
    }
  }
  .infoImg {
    p {
      font-weight: bold;
      text-align: left;
      line-height: 30px;
    }
    img {
      width: 100%;
    }
  }
}
.foot {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  border-top: 1px solid #999;
  .left {
    width: 50%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    a {
      width: 50%;
      img {
        width: 30px;
        vertical-align: middle;
      }
      &.goHome {
        border-right: 1px solid #999;
      }
      &.goCart {
        position: relative;
        .orderNum {
          position: absolute;
          top: 10px;
          right: 28px;
          width: 15px;
          height: 15px;
          line-height: 15px;
          font-size: 12px;
          color: #fff;
          background-color: red;
          border-radius: 50%;
        }
      }
    }
  }
  .joinCart {
    width: 50%;
    background-color: #f63;
    color: #fff;
  }
}
</style>
