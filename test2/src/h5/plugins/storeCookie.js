import Vue from 'vue'
import App from './App.vue'
import * as types from '../store/home/type'

/**
 * 保存cookie 到浏览器
 */
export default function () {
  // window.store.dispatch(types.INITDATA_ACTION).then(res => {
  //   window._HOSTNAME = location.origin // 保存域名
  // }).then(res => {
    mountedApp()
  // })
}

/**
 * 挂载节点
 */
function mountedApp () {
  new Vue({
    router: window.router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
