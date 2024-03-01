import Vue from 'vue'
import App from './App.vue'
import router from './routes';
Vue.config.productionTip = false

import chart from 'chart.js';
import chartkick from 'vue-chartkick';

Vue.use(chartkick.use(chart))
// Store
import store from './Store/index'

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
