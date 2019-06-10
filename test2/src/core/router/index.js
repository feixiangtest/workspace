import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/index'
import gameNotice from './gameNotice.js'
import lastestInfo from './lastestInfo.js'
import myAccount from './myAccount.js'
import personInfo from './personInfo.js'
import tradeRecord from './tradeRecord.js'
import bankTransaction from './bankTransaction.js'
import thirdPartyJump from '@s/components/thirdPartyJump/thirdPartyJump'
import payResult from '@/components/bankTransaction/onlinePayment/onlineDeposit/payResult'

Vue.use(Router)

let routerAll = [
  ...gameNotice,
  ...lastestInfo,
  ...myAccount,
  ...personInfo,
  ...tradeRecord,
  ...bankTransaction
]

routerAll.push({
  path: '/', // 重置路由
  redirect: '/center/myAccount/baseConsole'
})

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/thirdPartyJump',
      component: thirdPartyJump,
      name: 'thirdPartyJump'
    },
    {
      path: '/',
      name: 'index',
      component: index,
      children: routerAll
    },
    {
      path: '/center/payResult',
      component: payResult,
      name: 'payResult'
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 如何是第一次登陆只能跳转到修改登录密码页面，其它页面就行拦截
  if ((localStorage.getItem('setFirstPwd'))) {
    if (to.name === 'safeSet') {
      next()
    } else {
      window.layer.msgWarn('为了保障您的账户安全，首次登录时需要修改您的登录密码', function () {
      })
      return false
    }
  } else {
    next()
  }
})

// 刷新页面的时候，保证页面地址所对应的tab选中
router.afterEach((to, from) => {
  // router.app.$options.store.state.member.routerName = to.name // 第3层 url 的值
  router.l3 = to.name // 第3层 url 的值
  let path = to.path
  router.l2 = path.split('/')[2] // 第二层 url 的值
  //
})
export default router
