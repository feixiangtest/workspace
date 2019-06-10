// 采用异步加载的模式，进入页面时加载当前组件

export default {
  rebateRouters: {
    // 我的返水查询路由
    path: '/m',
    component: () => import('./../views/Home.vue'),
    name: 'rebates',
    children: [
      {
        path: 'rebatesProportion',
        component: () => import('./../components/rebatesProportion/rebatesProportion.vue'),
        name: 'rebatesProportion'
      },
      {
        path: 'queryRebates',
        component: () => import('./../components/rebatesProportion/queryRebates.vue'),
        name: 'queryRebates'
      }
    ]
  }
}
