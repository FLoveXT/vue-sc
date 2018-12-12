<template>
  <div class="my-wrap">
    <div class="my-content">
      <header class="header">
        <img src="../assets/img/avatar.jpg" />
        <div class="myInfo">
          <p>欢迎你! <span>{{$store.state.user.username}}</span></p>
        </div>
      </header>
      <section class="first">
        <ul>
          <li>
            <img
              src="@/assets/img/icon/pay.png"
              alt=""
            >
            <p>待付款</p>
          </li>
          <li>
            <img
              src="@/assets/img/icon/shipping.png"
              alt=""
            >
            <p>待收货</p>
          </li>
          <li>
            <img
              src="@/assets/img/icon/service.png"
              alt=""
            >
            <p>客服中心</p>
          </li>
        </ul>
        <div class="item myorder">
          <p>我的订单</p>
          <img
            src="@/assets/img/icon/arrow.png"
            alt=""
          >
        </div>
      </section>
      <section class="first">
        <div class="item myAddress">
          <p>我的地址</p>
          <img
            src="@/assets/img/icon/arrow.png"
            alt=""
          >
        </div>
        <div class="item">
          <p>我的收藏</p>
          <img
            src="@/assets/img/icon/arrow.png"
            alt=""
          >
        </div>
        <div class="item">
          <p>我的评价</p>
          <img
            src="@/assets/img/icon/arrow.png"
            alt=""
          >
        </div>
      </section>
      <section class="first">
        <div class="item">
          <p>我的客服</p>
          <img
            src="@/assets/img/icon/arrow.png"
            alt=""
          >
        </div>
        <div class="item">
          <p>退款申请</p>
          <img
            src="@/assets/img/icon/arrow.png"
            alt=""
          >
        </div>
        <div class="item">
          <p>账号设置</p>
          <img
            src="@/assets/img/icon/arrow.png"
            alt=""
          >
        </div>
      </section>
      <section class="first">
        <div class="item">
          <p>我的优惠券</p>
          <img
            src="@/assets/img/icon/arrow.png"
            alt=""
          >
        </div>
        <div
          class="item"
          @click="logout()"
        >
          <p>退出登录</p>
          <img
            src="@/assets/img/icon/arrow.png"
            alt=""
          >
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  name: "my",
  methods: {
    logout() {
      MessageBox.confirm("确定退出登录？").then(action => {
        this.$store.commit("logout");
        this.$router.replace("/");
      });
    }
  }
};
</script>
<style lang="less" scoped>
.my-wrap {
  background-color: #eee;
  .header {
    padding: 20px;
    background: #2bb;
    text-align: center;
    img {
      width: 70px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.7);
      vertical-align: middle;
    }
  }
  section {
    background-color: #fff;
    margin-bottom: 20px;
    &.first {
      ul {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        li {
          flex: 1;
          height: 60px;
          &:nth-of-type(2) {
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
          }
        }
        img {
          width: 20px;
          height: 20px;
          padding-top: 8px;
        }
      }
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        border-bottom: 1px solid #ccc;
        img {
          width: 25px;
          height: 25px;
        }
      }
    }
  }
}
</style>
