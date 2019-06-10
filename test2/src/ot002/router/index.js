import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import index from '@/components/index'
import live from '@/components/live'
import promotion from '@/components/promotion'
import vip from '@/components/others/vip'
import wenan from '@/components/wenan'
import complain from '@/components/others/complain'
import agreement from '@/components/others/agreement'
import register from '@/components/others/register'
import thirdPartyJump from '@s/components/thirdPartyJump/thirdPartyJump'

import advice from '@s/components/doc/advice'

// import contact from '@s/components/doc/contact'

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
          path: 'complain',
          component: complain,
          name: 'complain'
        },
        {
          path: 'agreement',
          component: agreement,
          name: 'agreement'
        },
        {
          path: 'vip',
          component: vip,
          name: 'vip'
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
