import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import api from "./plugins/axios";

Vue.prototype.$http = api;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
