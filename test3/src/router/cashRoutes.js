// 采用异步加载的模式，进入页面时加载当前组件

export default {
  cashRoutes: {
    // 现金流查询路由
    path: '/m/cash',
    component: () => import('./../views/Home.vue'),
    name: 'cash',
    children: [
      {
        path: 'queryCashStream',
        component: () => import('./../components/cashManagement/queryCashStream.vue'),
        name: 'queryCashStream'
      },
      {
        path: 'queryCashStreamResult',
        component: () => import('./../components/cashManagement/queryCashStreamResult.vue'),
        name: 'queryCashStreamResult'
      },
      {
        path: 'queryCashStreamDetail',
        component: () => import('./../components/cashManagement/queryCashStreamDetail.vue'),
        name: 'queryCashStreamDetail'
      },
      {
        path: '/m/queryAccount',
        component: () => import('./../components/cashManagement/queryAccount.vue'),
        name: 'queryAccount'
      }
    ]
  }
}
