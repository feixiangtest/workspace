// 采用异步加载的模式，进入页面时加载当前组件
import thirdPartyJump from '@s/components/thirdPartyJump/thirdPartyJump'
let home = () => {
  return import('@/views/Home.vue')
}
export default {
  indexRoutes: [
    {
      path: '/wap',
      component: home,
      name: 'home',
      children: [
        {
          path: 'index',
          component: () => import('@/components/home/main.vue'),
          name: 'index'
        },
        {
          path: 'game',
          component: () => import('@/components/game/gameMain.vue'),
          name: 'game'
        },
        {
          path: 'promotion',
          component: () => import('@/components/promotion/promotion.vue'),
          name: 'promotion'
        },
        {
          path: 'basicsInfo',
          component: () => import('@/components/user/basicsInfo.vue'),
          name: 'basicsInfo'
        },
        {
          path: 'login',
          component: () => import('@/views/login.vue'),
          name: 'login'
        }
      ]
    },
    {
      path: 'thirdPartyJump',
      component: () => import('@s/components/thirdPartyJump/thirdPartyJump'),
      name: 'thirdPartyJump'
    }
  ]
}
