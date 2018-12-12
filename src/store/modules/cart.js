import Vue from "vue";

const state = {
  orderList: [], //用户购物车已存在的商品
  payingList: [] //用户选择付钱的商品
};

const mutations = {
  addPro(state, pro) {
    state.orderList.unshift(pro);
  },
  addProToPay(state) {
    state.payingList = state.orderList.filter(item => item.isSelected === true);
  },
  delPro(state, index) { //删除指定产品
    state.orderList.splice(index, 1);
  },
  emptyOrderList(state) { //清空购物车中选择的产品
    state.orderList = state.orderList.filter(item => item.isSelected !== true);
  },
  emptyPayingList(state) { //清空支付列表中的产品
    state.payingList = [];
  }
};

const getters = {
  getOrderNum(state) { //返回购物车中产品的数目
    return state.orderList.length;
  },
  getOrderList(state) { //返回用户购物车的产品
    return state.orderList;
  },
  getSelectedNum(state) { //返回选择的商品总件数
    return state.orderList.filter(item => item.isSelected === true).length;
  },
  getSelectedPrice(state) { //返回选择的商品总价格
    return state.orderList.reduce((pre, cur) => {
      return (pre += cur.isSelected === true ? parseInt(cur.price) : 0);
    }, 0);
  },
  getPayList(state) { //返回支付页面的产品
    return state.payingList;
  }
};

export default {
  state,
  mutations,
  getters
};
