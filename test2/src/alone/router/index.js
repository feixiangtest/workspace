import Vue from 'vue'
import Router from 'vue-router'
import App from '@/pages/index/App'
import help from '@/components/help'
import home from '@/components/help/home'
import question from '@/components/help/question'
import pay from '@/components/help/pay'
import search from '@/components/help/search'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/alone',
      component: App,
      children: [
        {
          path: '/alone/help',
          component: help,
          name: 'help',
          children: [
            {
              path: 'home',
              component: home,
              name: 'home'
            },
            {
              path: 'question/:id',
              component: question,
              name: 'question'
            },
            {
              path: 'pay/:id',
              component: pay,
              name: 'pay'
            },
            {
              path: 'search',
              component: search,
              name: 'search'
            }
          ]
        }
      ]
    },
    {
      path: '/*',
      redirect: '/alone/help/home'
    }
  ]
})

/**

  {
      path: '/forgetPassword',
      component: forgetPassword,
      name: 'forgetPassword'
  }

 */
