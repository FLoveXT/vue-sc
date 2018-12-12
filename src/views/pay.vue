<template>
  <div class="pay-wrap">
    <div class="postAddress">
      <p>收件人:Allen</p>
      <p>电话:12345678911</p>
      <p>收件地址:广东省深圳市梧桐山</p>
    </div>
    <keep-alive>
      <div v-if="$store.getters.getPayList.length !== 0">
        <div class="listTitle">订单列表</div>
        <grid-wrap
          :itemNumX="itemNumX"
          :itemHeight="itemHeight"
          class="gridWrap"
        >
          <grid-item
            v-for="(item,index) in $store.getters.getPayList"
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
          </grid-item>
        </grid-wrap>
        <div class="toPay">
          <div class="totalPay">需要支付:{{$store.getters.getSelectedPrice}}元</div>
          <div
            class="doPay"
            @click="doPay()"
          >去支付</div>
        </div>
      </div>
      <div
        v-else
        class="noPro"
      >
        <p>亲，您目前还没有要支付的产品</p>
        <mt-button
          size="large"
          type="primary"
          @click="toCart()"
        >去购物车选择商品</mt-button>
      </div>
    </keep-alive>

  </div>
</template>

<script>
import { MessageBox, Indicator } from "mint-ui";
export default {
  name: "pay",
  data() {
    return {
      itemNumX: 1,
      itemHeight: 80
    };
  },
  methods: {
    toCart() {
      this.$router.push({ name: "cart" });
    },
    doPay() {
      /**
       * 清空购物车中选择的产品
       * 清空支付列表中的产品
       * 支付成功后跳转到首页去
       */
      MessageBox.confirm(
        `确定支付${this.$store.getters.getSelectedPrice}元?`
      ).then(action => {
        this.$store.commit("emptyOrderList");
        this.$store.commit("emptyPayingList");
        Indicator.open({
          text: `支付成功,马上跳转到首页...`
        });
        setTimeout(() => {
          Indicator.close();
          this.$router.push({ name: "home" });
        }, 5000);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.pay-wrap {
  .postAddress {
    border: 1px solid #eee;
    text-align: left;
    margin-top: 10px;
    padding: 10px;
    p {
      font-size: 14px;
      line-height: 28px;
    }
  }
  .listTitle {
    text-align: left;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    margin-top: 20px;
  }
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
        width: 75%;
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
    }
  }
  .noPro {
    margin-top: 150px;
    p {
      font-weight: bold;
      line-height: 50px;
    }
  }
  .toPay {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 80px;
    display: flex;
    div {
      width: 50%;
      line-height: 80px;
    }
    .totalPay {
      background-color: pink;
    }
    .doPay {
      background-color: skyblue;
    }
  }
}
</style>
