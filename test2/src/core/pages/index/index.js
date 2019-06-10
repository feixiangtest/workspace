// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '../../router'
import 'element-ui/lib/theme-chalk/index.css'
import './main'
import '@s/assets/alone/memberAll.less'
// import '/resource/share/RESOURCE_VERSION/css/videoStyle.css'
import store from '../../store'
import VueClipboard from 'vue-clipboard2' // 点击复制组件
import base from '@s/components/base'
import AddErr from '@s/components/err/index'
import * as commonFilter from '@s/filter/commonFilter'

// 其他的组件
Vue.use(base)
Vue.use(VueClipboard)
Vue.use(AddErr)
window.store = store
window.router = router
Vue.config.productionTip = false
localStorage.place = 'center'
window.common.loginStatus = ''
window.commonFilter = commonFilter
/**
 * 金额显示两位
 */
Vue.filter('moneyFilter', function (money) {
  if (money !== null && money !== undefined && !isNaN(money)) {
    return Number(money).toFixed(2)
  } else {
    return 0
  }
})

try {
  window.common.loginStatus = JSON.parse(localStorage.getItem('userInfo')).account
} catch (e) {
  console.log(e)
}

// 初始化全局数据
window.store.dispatch('initData.action').then(res => {
/* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })

  setTimeout(() => {
  // 设置颜色 晚一点
    setColor()
  }, 0)
})
function setColor () {
  let a = ''
  if (localStorage.queryIndex) {
    a = JSON.parse(localStorage.queryIndex)
  }
  if (a && a.data && a.data.station) {
    var b = a.data.station.color

    if (b === 'blue') {
      window.$('html').attr('class', 'color-blue')
    } else {
      window.$('html').attr('class', 'color-green')
    }
  }
}
