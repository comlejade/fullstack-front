import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import '@/util/veevalidate-i18n'
import Alert from '@/components/modules/alert'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

axios.defaults.baseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : ''

Vue.use(Alert)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
