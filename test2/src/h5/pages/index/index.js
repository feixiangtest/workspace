import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import indexMain from '@/plugins/indexMain'
import '@/plugins/ajax.js'
import routers from '@/router/index'
import store from '@/store/index.js'
import Switch from 'mint-ui/lib/switch'
import AddErr from '@/plugins/err/index.js'
import regErr from '@/plugins/err/err.js'
import * as commonFilter from '@s/filter/commonFilter'
import base from '@s/components/base'
import * as cookieUtil from '@s/utils/cookieUtil'
// 按需引入css + mint-ui部分组件
import 'mint-ui/lib/style.min.css'
import '@/assets/less/app.less'

import VueClipboard from 'vue-clipboard2' // 点击复制组件
Vue.use(VueClipboard)
// 1 Vue 初始化 依赖--- debug vue--------------------------------------------------------------------------
Vue.config.productionTip = false
Vue.use(VueRouter)

/** Vue.use(base)
 *  * 依赖影响： pc  h5
 * 注意：非公用不要加，谨慎添加修改
 */
Vue.use(base)
Vue.use(AddErr)
Vue.use(regErr)
Vue.component(Switch.name, Switch)
// 全局 变量
window._topTask = {
  _todo : []
}
/**
 * 初始化全局数据
 * localStorage.queryIndex 如果存在不删除
 * @type {string} 排除干扰
 */
cookieUtil.delCookie('changeSkin')
let queryIndex = ''
if (localStorage.queryIndex) {
  queryIndex = JSON.parse(localStorage.queryIndex)
  if (queryIndex && queryIndex.data && queryIndex.data.account) {
  // 放过登陆
  } else {
    delete window.localStorage.queryIndex
  }
}
localStorage.availHeight = screen.availHeight
// -------Vue 挂载 变量--------------------------------------------------------------------
indexMain()
window.store = store
window.filter = commonFilter
window.router = new VueRouter({
  routes: routers,
  mode: 'history',
  scrollBehavior: function (t, e, a) {
    return a || {
      x: 0,
      y: 0
    }
  }
})
/* 挂载app  */
// window.store.state.h5Home.reqGetMaintainNotice = false // 不调用获取维护公告接口
// window.store.state.h5Home.reqMoneyConversation = false// 不调用额度转换接口
// 开启版本号功能
window.store.dispatch('initH5Data.action', {versionFun: true})

// 3 vue 初始化渲染------------------------------------------------------------------
setTimeout(() => {
  // 把初始化渲染放到 setTimeout 里
  new Vue({
    router: window.router,
    store: window.store,
    render: h => h(App)
  }).$mount('#appMain')
}, 0)

// 4. 延后执行 js
