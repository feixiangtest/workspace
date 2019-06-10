import Vue from 'vue'
import routes from './router'
import VueRouter from 'vue-router'
import store from './store'
import _fetch from './service/fetch'
import awarTypeResult from './service/awarTypeResult'
import layerExtend from './plugins/vueLayer'
import lotteryMain from './plugins/lotteryMain'// 彩票全局公共方法
import jsExtend from './plugins/jsExtend'
import Music from './assets/js/music'// 音效处理
import commonFilter from './filter/commonFilter'// 开奖过滤器
import MusicComponent from './components/music' // 音效处理
import storeCookie from './plugins/storeCookie'
import attachFastClick from 'fastclick' // iphone移动端click事件延迟300ms解决方案
import _each from 'lodash/each'
import _assignIn from 'lodash/assignIn'
import _indexOf from 'lodash/indexOf'
import _concat from 'lodash/concat'
import DatetimePicker from 'mint-ui/lib/datetime-picker' // 按需加载mint-ui的模块
import lsSave from './utils/lsSave.js'
// 从node+modules 中拆分 muse-ui 組件Drawer
import Drawer from './plugins/muse-ui/src/drawer/index.js'
Vue.use(Drawer)
Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  window.insertLogs({
    'err': err.message,
    'stack': err.stack,
    'info': info
  }, 'vueErrorHandler')
}
APPRun()
function loadConfig () {
  window._each = _each
  window._assignIn = _assignIn
  window._indexOf = _indexOf
  window._concat = _concat
  Vue.component(DatetimePicker.name, DatetimePicker)
  Vue.use(VueRouter)
  Vue.use(Music) // 音频播放函数
  Vue.use(MusicComponent) // 音频组件

  window.store = store
  window._fetch = _fetch
  window.filter = commonFilter

  layerExtend() // 扩充layer
  jsExtend()
  lotteryMain()// 注册彩票公共方法
  awarTypeResult()
  attachFastClick.attach(document.body)

  window.router = new VueRouter({
    routes: routes,
    mode: 'history'
  })
  // 预加载图片
  setTimeout(() => {
    var img = new Image()
    img.src = window.store.state.home.commonImgUrl + '/loaderc.gif'
  }, 3003)
}
function APPRun () {
  loadConfig()
  storeCookie()
  window.router.beforeEach((to, from, next) => {
    // 轉頁效果開始
    window.store.state.site.historyPath = from.path
    next()
    if (to.path === '/lottery/mmc/Bet' || to.path === '/lottery/mmsc/Bet') { // 秒秒彩连续开奖未结束之前阻止前进后退
      history.pushState(null, null, location.href)
      window.store.state.site.allowBack = false
    } else {
      window.store.state.site.allowBack = true
    }
  })
  console.log('LoadJsonp diaoyong ')
  setTimeout(() => {
    lsSave.LoadJsonp()
  }, 1002 * 6)
}

window.usableLS = function () {
  let aa = 1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(localStorage))).length
  let b = aa / (1024 * 1024 * 5) * 100
  return b
}

// 给所有input绑定click事件，解决APP嵌套H5时无法聚焦的问题
window.$(document).off('click.lth5').on('click.lth5', 'input, textarea', (event) => {
  event.target.focus()
})
