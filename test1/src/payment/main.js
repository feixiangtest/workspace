import $ from 'jquery'
import Vue from 'vue'
import routes from './router'
import VueRouter from 'vue-router'
import store from '@/base/store'
import _fetch from '@/base/service/fetch'
import layerExtend from '@/base/plugins/vueLayer'
import indexMain from '@/base/plugins/indexMain'
import myNative from '@/base/plugins/myNative'
import storeCookie from '@/base/plugins/storeCookie'
import { _config } from '@/base/config/index'
import VueClipboard from 'vue-clipboard2' // 点击复制组件
import _each from 'lodash/each'
Vue.use(VueClipboard)
// 全部加载
window._frequency = ''
window.$ = $
window._config = _config
Vue.use(VueRouter)
window.store = store
window._fetch = _fetch
window.__DEBUG = null
window._each = _each
window.mountedRemoveDoms = []
layerExtend() // 扩充layer
myNative() // 与原生APP交互
indexMain()
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

storeCookie('payment')

window.router.beforeEach((to, from, next) => {
  next()
  window.MainApp && window.indexMain.mountedRemoveDoms()
  // 轉頁效果開始
})
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
