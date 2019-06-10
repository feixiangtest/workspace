import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import index from '@/components/index'
import live from '@/components/live'
import promotion from '@/components/promotion'
import wenan from '@/components/wenan/index'
import register from '@/components/others/register'
import thirdPartyJump from '@s/components/thirdPartyJump/thirdPartyJump'

import advice from '@s/components/doc/advice'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: 'home',
          component: home,
          name: 'home'
        },

        {
          path: 'live',
          component: live,
          name: 'live'
        },
        {
          path: 'promotion',
          component: promotion,
          name: 'promotion'
        },

        {
          path: 'advice',
          component: advice,
          name: 'advice'
        },
        {
          path: 'wenan',
          component: wenan,
          name: 'wenan'
        },
        {
          path: 'register',
          component: register,
          name: 'register'
        }
      ]
    },
    {
      path: '/thirdPartyJump',
      name: 'thirdPartyJump',
      component: thirdPartyJump
    },
    {
      path: '/*',
      redirect: '/home'
    }
  ]
})
