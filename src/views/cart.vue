<template>
  <div class="cart-wrap">
    <keep-alive>
      <div
        v-if="$store.getters.getOrderList.length !== 0"
        class="proList"
      >
        <grid-wrap
          :itemNumX="itemNumX"
          :itemHeight="itemHeight"
          class="gridWrap"
        >
          <grid-item
            v-for="(item,index) in $store.getters.getOrderList"
            :key="index"
            class="item"
          >
            <div class="showImg">
              <img
                v-lazy="item.proImg"
                class="proImg"
              >
            </div>
            <div class="info">
              <p class="title">{{item.title}}</p>
              <div>
                <p>款式:{{item.type}}</p>
                <p>颜色:{{item.color}}</p>
              </div>
              <p class="price">价格:{{item.price}}</p>
            </div>
            <div class="operation">
              <mt-switch
                v-model="item.isSelected"
                class="switchPro"
              ></mt-switch>
              <span
                class="del"
                @click="delPro(index)"
              >
                <img src="@/assets/img/icon/del.png">
              </span>
            </div>
          </grid-item>
        </grid-wrap>
      </div>
      <div
        v-else
        class="noPro"
      >
        <div v-if="$store.state.user.token">
          亲，您还没有选择任何商品！！！
        </div>
        <div v-else>
          <p>亲，您还没登录哦！！</p>
          <span
            @click="goLogin()"
            class="goLogin"
          >点击去登录</span>
        </div>
      </div>
    </keep-alive>
    <div class="payInfo">
      <div class="allPrice">
        <p>件数:{{$store.getters.getSelectedNum}}件</p>
        <p>金额:{{$store.getters.getSelectedPrice}}元</p>
      </div>
      <router-link
        class="shopping"
        :to="{name:'classify'}"
      >继续购物</router-link>
      <span
        class="toPay"
        @click="toPay()"
      >去结算</span>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  name: "cart",
  data() {
    return {
      itemNumX: 1,
      itemHeight: 80
    };
  },
  methods: {
    toPay() {
      if (!this.$store.state.user.token) {
        MessageBox.confirm("请先登录").then(action => {
          this.$router.replace('/login')
        });
      }else{
        this.$store.commit("addProToPay");
        this.$router.push({ name: "pay" });
      }
    },
    delPro(index) {
      MessageBox.confirm("确定删除此产品?").then(action => {
        this.$store.commit("delPro", index);
      });
    },
    goLogin() {
      this.$router.push("login");
    }
  }
};
</script>
<style lang="less" scoped>
.cart-wrap {
  .proList {
    .gridWrap {
      .item {
        display: flex;
        align-items: center;
        justify-content: space-around;
        .showImg {
          width: 25%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .proImg {
            width: 75px;
          }
        }
        .info {
          width: 50%;
          p {
            font-size: 14px;
            height: 20px;
            line-height: 20px;
            text-align: left;
          }
          .title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          div {
            display: flex;
            justify-content: space-between;
          }
        }
        .operation {
          width: 25%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          .del {
            img {
              width: 20px;
            }
          }
        }
      }
    }
  }
  .payInfo {
    display: flex;
    border: 1px solid #ccc;
    height: 80px;
    .allPrice {
      width: 25%;
      font-size: 14px;
      text-align: left;
      p {
        height: 40px;
        line-height: 40px;
      }
    }
    .shopping {
      width: 25%;
      line-height: 80px;
      background-color: #ff4e22;
    }
    .toPay {
      width: 50%;
      line-height: 80px;
      background-color: #999;
    }
  }
  .noPro {
    margin-top: 200px;
    margin-bottom: 200px;
    font-size: 30px;
    .goLogin {
      color: red;
      text-decoration-line: underline;
    }
  }
}
</style>
