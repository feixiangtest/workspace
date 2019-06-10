// 采用异步加载的模式，进入页面时加载当前组件
let promotionManage = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/teamManage/promotion/promotionManage.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/teamManage/promotion/promotionManage.vue')
  } else {
    return import('./../components/teamManage/promotion/promotionManage.vue')
  }
}

let promotionAdd = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/teamManage/promotion/promotionAdd.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/teamManage/promotion/promotionAdd.vue')
  } else {
    return import('./../components/teamManage/promotion/promotionAdd.vue')
  }
}
let promotionState = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/teamManage/promotion/promotionState.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/teamManage/promotion/promotionState.vue')
  } else {
    return import('./../components/teamManage/promotion/promotionState.vue')
  }
}
let manageCenter = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/teamManage/manageCenter/index.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/teamManage/manageCenter/index.vue')
  } else {
    return import('./../components/teamManage/manageCenter/index.vue')
  }
}
let teamReport = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/teamManage/manageCenter/teamReport.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/teamManage/manageCenter/teamReport.vue')
  } else {
    return import('./../components/teamManage/manageCenter/teamReport.vue')
  }
}
let nextReport = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/teamManage/manageCenter/nextReport.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/teamManage/manageCenter/nextReport.vue')
  } else {
    return import('./../components/teamManage/manageCenter/nextReport.vue')
  }
}
let teamList = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/teamManage/list/index.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/teamManage/list/index.vue')
  } else {
    return import('./../components/teamManage/list/index.vue')
  }
}
let rebateSet = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/teamManage/manageCenter/rebateSet.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/teamManage/list/rebateSet.vue')
  } else {
    return import('./../components/teamManage/list/rebateSet.vue')
  }
}
let manage = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/teamManage/manageCenter/manage.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/teamManage/manageCenter/manage.vue')
  } else {
    return import('./../components/teamManage/manageCenter/manage.vue')
  }
}
export default {
  teamManageRoutes: [
    {
      path: '/wap/teamManage/promotionManage',
      component: promotionManage,
      name: '/wap/teamManage/promotionManage'
    },
    {
      path: '/wap/teamManage/promotionAdd',
      component: promotionAdd,
      name: '/wap/teamManage/promotionAdd'
    },
    {
      path: '/wap/teamManage/promotionState',
      component: promotionState,
      name: '/wap/teamManage/promotionState'
    },
    {
      path: '/wap/teamManage/manageCenter',
      component: manageCenter,
      name: '/wap/teamManage/manageCenter'
    },
    // 团队报表
    {
      path: '/wap/teamManage/teamReport',
      component: teamReport,
      name: '/wap/teamManage/teamReport'
    },
    // 下级报表
    {
      path: '/wap/teamManage/nextReport',
      component: nextReport,
      name: '/wap/teamManage/nextReport'
    },
    {
      path: '/wap/teamManage/list',
      component: teamList,
      name: '/wap/teamManage/list'
    },
    // 推广管理
    {
      path: '/wap/teamManage/manage',
      component: manage,
      name: '/wap/teamManage/manage'
    },
    //
    {
      path: '/wap/teamManage/rebateSet',
      component: rebateSet,
      name: '/wap/teamManage/rebateSet'
    }
  ]
}
