// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from '@/pages/index/App.vue'
import router from '@/router'
import store from '@/store/index.js'
import base from '@s/components/base'
import AddErr from '@s/components/err/index'
import * as commonFilter from '@s/filter/commonFilter'
import {vueErr} from '@s/utils/vueErr'
import '@/pages/index/main'
// -----------------------------------------------------------------------------------------
localStorage.place = 'site'
Vue.use(base)
Vue.use(AddErr)
window.router = router
window.store = store
// Vue.config.productionTip = false
window.store = store
window.commonFilter = commonFilter
// 注册 vue 组件 到全局
window._.each(window.__WEBPACK_ES6, (val) => {
  val(window, Vue)
})
/**
 * localStorage.queryIndex 如果存在不删除
 * @type {string} 排除干扰
 */
let queryIndex = ''
if (localStorage.queryIndex) {
  queryIndex = JSON.parse(localStorage.queryIndex)
  if (queryIndex.data && queryIndex.data.account) {

  } else {
    delete window.localStorage.queryIndex
  }
}
window.store.dispatch('initData.action')
/* 挂载app ********************************************************************************** */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
