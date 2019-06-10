import App from '../App'
import lotteryRouters from './lotteryRouters'
export default [{
  path: '/',
  component: App,
  children: [
    lotteryRouters.lotteryRouters,
    {
      path: '/lottery/mmc/Bet',
      component: resolve => {
        require.ensure(['components/lottery/mmcBet.vue'], () => {
          resolve(require('components/lottery/mmcBet.vue'))
        }, function onError (mod) { // 异步加载失败的回调
          window.layer.msgWarn('网络连接中断，请检查您的网络', function () {})
        })
      },
      name: 'mmcBet'
    },
    {
      path: '/lottery/mmsc/Bet',
      component: resolve => {
        require.ensure(['components/lottery/mmscBet.vue'], () => {
          resolve(require('components/lottery/mmscBet.vue'))
        }, function onError (mod) { // 异步加载失败的回调
          window.layer.msgWarn('网络连接中断，请检查您的网络', function () {})
        })
      },
      name: 'mmcBet'
    },
    {
      path: '/awardPage',
      component: resolve => {
        require.ensure(['components/lottery/rightSideMenu/awardPage'], () => {
          resolve(require('components/lottery/rightSideMenu/awardPage'))
        }, function onError (mod) { // 异步加载失败的回调
          window.layer.msgWarn('网络连接中断，请检查您的网络', function () {})
        })
      },
      name: 'awardPage'
    },
    {
      path: '/accountHistory',
      component: resolve => {
        require.ensure(['components/lottery/rightSideMenu/accountHistory'], () => {
          resolve(require('components/lottery/rightSideMenu/accountHistory'))
        }, function onError (mod) { // 异步加载失败的回调
          window.layer.msgWarn('网络连接中断，请检查您的网络', function () {})
        })
      },
      name: 'accountHistory'
    },
    {
      path: '/todayBettingRecord',
      component: resolve => {
        require.ensure(['components/lottery/rightSideMenu/todayBettingRecord'], () => {
          resolve(require('components/lottery/rightSideMenu/todayBettingRecord'))
        }, function onError (mod) { // 异步加载失败的回调
          window.layer.msgWarn('网络连接中断，请检查您的网络', function () {})
        })
      },
      name: 'todayBettingRecord'
    },
    {
      path: '/bettingLimit',
      component: resolve => {
        require.ensure(['components/lottery/rightSideMenu/bettingLimit'], () => {
          resolve(require('components/lottery/rightSideMenu/bettingLimit'))
        }, function onError (mod) { // 异步加载失败的回调
          window.layer.msgWarn('网络连接中断，请检查您的网络', function () {})
        })
      },
      name: 'bettingLimit'
    },
    {
      path: '/detailReport',
      component: resolve => {
        require.ensure(['components/lottery/rightSideMenu/detailReport.vue'], () => {
          resolve(require('components/lottery/rightSideMenu/detailReport.vue'))
        }, function onError (mod) { // 异步加载失败的回调
          window.layer.msgWarn('网络连接中断，请检查您的网络', function () {})
        })
      },
      name: 'detailReport'
    },
    {
      path: '/gameRule',
      component: resolve => {
        require.ensure(['components/lottery/rightSideMenu/gameRule.vue'], () => {
          resolve(require('components/lottery/rightSideMenu/gameRule.vue'))
        }, function onError (mod) { // 异步加载失败的回调
          console.info(mod, '游戏规则 返回') // 错误信息 需要修改下
          window.layer.msgWarn('网络连接中断，请检查您的网络', function () {})
        })
      },
      name: 'gameRule'
    },
    {
      path: '/yocouma',
      component: resolve => {
        require.ensure(['components/lottery/rightSideMenu/yocouma.vue'], () => {
          resolve(require('components/lottery/rightSideMenu/yocouma.vue'))
        }, function onError (mod) { // 异步加载失败的回调
          window.layer.msgWarn('网络连接中断，请检查您的网络', function () {})
        })
      },
      name: 'yocouma'
    }, {
      path: '/home',
      component: resolve => {
        require.ensure(['pages/home.vue'], () => {
          resolve(require('pages/home.vue'))
        }, function onError (mod) { // 异步加载失败的回调
          window.layer.msgWarn('网络连接中断，请检查您的网络', function () {})
        })
      },
      name: 'home'
    }, {
      path: '/safeguard',
      component: resolve => {
        require.ensure(['pages/safeguard.vue'], () => {
          resolve(require('pages/safeguard.vue'))
        }, function onError (mod) { // 异步加载失败的回调
          window.layer.msgWarn('网络连接中断，请检查您的网络', function () {})
        })
      },
      name: 'safeguard'
    },
    {
      path: '/*',
      redirect: '/home'
    }
  ]
}]
