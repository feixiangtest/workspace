// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import $ from 'jquery'
import Vue from 'vue'
import routes from './router'
import VueRouter from 'vue-router'
import 'babel-polyfill' // 兼容es6
import AddErr from '@/base/components/err/index'
import optCom from '@/base/components/opt/index'
import store from '@/base/store'
import _fetch from '@/base/service/fetch'
import layerExtend from '@/base/plugins/vueLayer'
import jsExtend from '@/base/plugins/jsExtend'
import indexMain from '@/base/plugins/indexMain'
import AlloyFinger from 'alloyfinger/alloy_finger'
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger_vue.js'
import storeCookie from '@/base/plugins/storeCookie'
// import attachFastClick from 'fastclick' // iphone移动端click事件延迟300ms解决方案

import DatetimePicker from 'mint-ui/lib/datetime-picker' // 按需加载mint-ui的模块
import { _config } from '@/base/config/index'
import * as commonFilter from '@/base/filter/commonFilter'
import _each from 'lodash/each'
import _assignIn from 'lodash/assignIn'
import VueClipboard from 'vue-clipboard2' // 点击复制组件
// 从node+modules 中拆分 muse-ui 組件Drawer
import Drawer from '@/base/plugins/muse-ui/src/drawer/index'
// import lsSave from './utils/lsSave.js'
// import preApp from './preApp.vue'

Vue.config.silent = false
Vue.use(VueClipboard)
Vue.use(Drawer)
// 全部加载
window._frequency = ''
window._each = _each
window._assignIn = _assignIn
window.$ = $
window.runSQ()
window.SHARE(window.$)
window._config = _config
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.use(AlloyFingerVue, {
  AlloyFinger
})
Vue.use(VueRouter)
Vue.use(AddErr)
Vue.use(optCom)
window.store = store
window._fetch = _fetch
window.__DEBUG = null
window.filter = commonFilter
window.mountedRemoveDoms = []
layerExtend() // 扩充layer
jsExtend()
indexMain()
// attachFastClick.attach(document.body)
window.router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (t, e, a) {
    return a || {
      x: 0,
      y: 0
    }
  }
})
/* var preload = new Vue({
  el: '#preApp',
  render: h => h(preApp)
}) */
storeCookie('app')

window.router.beforeEach((to, from, next) => {
  next()
  window.MainApp && window.indexMain.mountedRemoveDoms()
  // 轉頁效果開始
})

/* setTimeout(() => {
  lsSave.LoadJsonp()
}, 1000 * 6) */
// 阻止.footer元素滑动事件(防止uc低版本浏览器上拉该元素出现空白)
window.$(document).on('touchmove', '.footer', (event) => {
  event.preventDefault()
})
// 为所有的A标签加一个actived class
window.$(document).on('click', 'a', function () {
  window.$(this).addClass('actived')
  setTimeout(() => {
    window.$(this).removeClass('actived')
  }, 1000)
})
// 第三方调整 执行 _href函数 必须在window下执行不要移动
window._getResut = ''
window.get_href = function (a1, a2) {
  if (a1 === 'ag_fish') a1 = 'ag'
  if (a1 === '皇冠体育') a1 = 'ty'
  return window.indexMain._getResut = [a1, a2]
}

// 二维码 显示隐藏
window.$(document).on('click', 'a.icon-wechat', function () {
  window.$('div.wechat-qrcode').toggle()
})
