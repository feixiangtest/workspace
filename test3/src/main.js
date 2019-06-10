import Vue from 'vue'
import App from './App.vue'
import routers from './router/index'
import VueRouter from 'vue-router'
import store from './store/index.js'
import indexMain from './plugins/indexMain'
import * as commonFilter from './filter/commonFilter'

// 从node+modules 中拆分 muse-ui 組件Drawer
import Drawer from './plugins/muse-ui/src/drawer/index.js'
import './plugins/ajax'
// 按需引入mint-ui部分组件
import Switch from 'mint-ui/lib/switch'

import './assets/less/app.less'
import './assets/less/layer/layer.less'
import 'mint-ui/lib/style.min.css'

Vue.component(Switch.name, Switch)

Vue.config.productionTip = false

// Vue.use(Mint)
Vue.use(Drawer)
Vue.use(VueRouter)
window.store = store
window.filter = commonFilter
// 归零 变量 头部添加按钮 添加需要运行的函数
window._addFn = {}
window.routerOjb = {}
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
indexMain()
// 初始化接口，判断是否跳转登录界面
window.store.dispatch('initData.action').then((res) => {
  new Vue({
    router: window.router,
    store: window.store,
    render: h => h(App)
  }).$mount('#app')
  // 未登录状态直接跳出
  if (res.data.isLogined === 0) {
    // window.router.push('/m/login')
  } else {
    // 如果已经是登录状态了并且是在登录页面直接跳转到首页
    if (location.href.indexOf('/m/login') > 0) {
      window.router.push('/m/index')
    }
  }
}).catch((res) => {
  new Vue({
    router: window.router,
    store: window.store,
    render: h => h(App)
  }).$mount('#app')
})
