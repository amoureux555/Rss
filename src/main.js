import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// 饿了么ui组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 自定义指令
import "@/utils/directives";

// 项目适配
import '@/utils/rem'

// ...

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
