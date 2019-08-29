import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

/* 过滤器filter */
Vue.filter("weekFilter", val => {
  let znWeek = "";
  switch (val) {
    case 1:
      znWeek = "一";
      break;
    case 2:
      znWeek = "二";
      break;
    case 3:
      znWeek = "三";
      break;
    case 4:
      znWeek = "四";
      break;
    case 5:
      znWeek = "五";
      break;
    case 6:
      znWeek = "六";
      break;
    case 7:
      znWeek = "日";
      break;
  }
  return znWeek;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
