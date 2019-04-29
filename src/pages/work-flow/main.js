import Vue from 'vue'
import App from './App.vue'
import router from './utils/premisson'
import store from './store'
import './assets/styles/reset.css'
import './icons'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

Vue.config.productionTip = false

// if (process.env.NODE_ENV === 'production') {
//   let VConsole = require('vconsole')
//   /* eslint-disable */
//   new VConsole()
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
