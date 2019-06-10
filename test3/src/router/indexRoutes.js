// 采用异步加载的模式，进入页面时加载当前组件
let home = () => {
  return import('./../views/Home.vue')
}

export default {
  indexRoutes: [{
    path: '/m',
    component: home,
    name: 'home',
    children: [
      {
        path: 'index',
        component: () => import('./../components/home/main.vue'),
        name: 'index'
      },
      {
        path: '/m/cash',
        component: () => import('./../components/cashManagement/memberBalanceDeposit.vue'),
        name: 'cash'
      },
      {
        path: '/m/agentReturnOut',
        component: () => import('./../components/cashManagement/agentReturnOut.vue'),
        name: 'agentReturnOut'
      },
      {
        path: '/m/reportSearch',
        component: () => import('./../components/reportForms/reportSearch.vue'),
        name: 'reportSearch'
      },
      {
        path: '/m/platFormReport',
        component: () => import('./../components/reportForms/platFormReport.vue'),
        name: 'platFormReport'
      },
      {
        path: '/m/platformDetails',
        component: () => import('./../components/reportForms/platformDetails.vue'),
        name: 'platformDetails'
      },
      {
        path: '/m/betDetails',
        component: () => import('./../components/reportForms/betDetails.vue'),
        name: 'betDetails'
      },
      {
        path: '/m/userBetDetails',
        component: () => import('./../components/reportForms/userBetDetails.vue'),
        name: 'userBetDetails'
      },
      {
        path: '/m/childAccountList',
        component: () => import('./../components/childAccount/childAccountList.vue'),
        name: 'childAccountList'
      },
      {
        path: '/m/announcement',
        component: () => import('./../components/announcement/announcement.vue'),
        name: 'announcement'
      },
      {
        path: '/m/announceDetail',
        component: () => import('./../components/announcement/announceDetail.vue'),
        name: 'announceDetail'
      }
    ]
  },
  {
    path: '/m/login',
    component: () => import('./../views/login.vue'),
    name: 'login'
  }
  ]
}
