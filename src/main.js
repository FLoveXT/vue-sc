import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import Axios from "axios";
import "./mock";

//引入全局的组件
import scrollx from "@/components/scrollx.vue";
import myswipe from "@/components/swipe.vue";
import gridWrap from "@/components/grid/grid-wrap.vue";
import gridItem from "@/components/grid/grid-item.vue";
Vue.component(scrollx.name, scrollx);
Vue.component(myswipe.name, myswipe);
Vue.component(gridWrap.name, gridWrap);
Vue.component(gridItem.name, gridItem);
//引入mint-ui组件
import MintUI, { Toast } from "mint-ui";
Vue.use(MintUI);
import "mint-ui/lib/style.css";
//引入video自定义样式
import "@/assets/css/video.css";

//创建时间的全局过滤器
import Moment from "moment";
Moment.locale("zh-cn");
Vue.filter("relativeTime", time => {
  return Moment(Moment(time).format("l")).fromNow();
});

Vue.config.productionTip = false;

//引入axios 和配置

//配置公共url
Axios.defaults.baseURL = "http://sports.com";
// 配置请求拦截，显示loading图标
Axios.interceptors.request.use(config => {
  MintUI.Indicator.open({
    text: "小二正在上菜..."
  });
  return config;
});
//配置响应拦截，关闭loading图标
Axios.interceptors.response.use(response => {
  MintUI.Indicator.close();
  //模拟获取数据失败
  if (response.data.code === 0) {
    Toast({
      message: "数据获取失败,请检查网络"
    });
  } else {
    //模拟数据获取成功
    return response;
  }
});

Vue.prototype.$axios = Axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
