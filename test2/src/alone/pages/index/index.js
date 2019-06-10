// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from '../../router'
import store from '../../store'
/* end 左侧菜单栏插件 */
//  help css 使用 会员中心的. 如果有单独另外单独写
import 'element-ui/lib/theme-chalk/index.css'
import './main'
import '@s/assets/alone/memberAll.less'
// 忘记密码 样式单独链接
import '@s/assets/less/forgetPassWord.less'
import base from '@s/components/base'
Vue.use(base)
Vue.config.productionTip = false
window.router = router
window.store = store
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store
})
// 初始化全局数据
window.store.dispatch('initData.action')
// UC OT-3128 页面开始闪烁
router.afterEach((to, from) => {
  let vuebug = window.$('<div class="vueBug"> </div>')
  window.$('#app').append(vuebug)
  window.$('#memberHea').append(vuebug)
  window.$('.helpConBox > div > div').append(vuebug)
  window.$('.helpConBox > div > div > div').append(vuebug)
  setTimeout(function () {
    window.$('.vueBug').remove()
  }, 0)
})
