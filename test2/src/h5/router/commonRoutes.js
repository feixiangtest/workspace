// 采用异步加载的模式，进入页面时加载当前组件
export default {
  commonRoutes: [
    {
      path: '/wap/common',
      component: () => import('@/views/commonCenter.vue'),
      name: 'common',
      children: [
        {
          path: 'creditConversion',
          component: () => import('@/components/creditConversion/creditConversion.vue'),
          name: 'creditConversion'
        },
        {
          path: 'fastCash',
          component: () => import('@/components/fastCash/fastCash.vue'),
          name: 'fastCash'
        },
        {
          path: 'cashPassword',
          component: () => import('@/components/fastCash/cashPassword.vue'),
          name: 'cashPassword'
        },
        {
          path: 'accountBalance',
          component: () => import('@/components/user/accountBalance.vue'),
          name: 'accountBalance'
        }
      ]
    }
  ]
}
