// 采用异步加载的模式，进入页面时加载当前组件
let transactionRecord = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/rightSideMenu/transactionRecord/transactionRecord.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/rightSideMenu/transactionRecord/transactionRecord.vue')
  } else {
    return import('./../components/rightSideMenu/transactionRecord/transactionRecord.vue')
  }
}

let historyRecord = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/rightSideMenu/transactionRecord/historyRecord.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/rightSideMenu/transactionRecord/historyRecord.vue')
  } else {
    return import('./../components/rightSideMenu/transactionRecord/historyRecord.vue')
  }
}

let currentRecordPage = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/rightSideMenu/transactionRecord/currentRecordPage.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/rightSideMenu/transactionRecord/currentRecordPage.vue')
  } else {
    return import('./../components/rightSideMenu/transactionRecord/currentRecordPage.vue')
  }
}

let sportsHistoryDetail = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/rightSideMenu/transactionRecord/sportsHistoryDetail.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/rightSideMenu/transactionRecord/sportsHistoryDetail.vue')
  } else {
    return import('./../components/rightSideMenu/transactionRecord/sportsHistoryDetail.vue')
  }
}

let thirdPlatformDetail = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/rightSideMenu/transactionRecord/thirdPlatformDetail.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/rightSideMenu/transactionRecord/thirdPlatformDetail.vue')
  } else {
    return import('./../components/rightSideMenu/transactionRecord/thirdPlatformDetail.vue')
  }
}

let lotteryBettingHistoryDetail = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/rightSideMenu/transactionRecord/lotteryBettingHistoryDetail.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/rightSideMenu/transactionRecord/lotteryBettingHistoryDetail.vue')
  } else {
    return import('./../components/rightSideMenu/transactionRecord/lotteryBettingHistoryDetail.vue')
  }
}

export default {
  transactionRecordRoutes: [
    {
      path: '/wap/transactionRecord',
      component: transactionRecord,
      name: 'transactionRecord'
    },
    {
      path: '/wap/transactionRecord/historyRecord',
      component: historyRecord,
      name: 'historyRecord'
    },
    {
      path: '/wap/transactionRecord/currentRecordPage',
      component: currentRecordPage,
      name: 'currentRecordPage'
    },
    {
      path: '/wap/transactionRecord/sportsHistoryDetail',
      component: sportsHistoryDetail,
      name: 'sportsHistoryDetail'
    },
    {
      path: '/wap/transactionRecord/thirdPlatformDetail',
      component: thirdPlatformDetail,
      name: 'thirdPlatformDetail'
    },
    {
      path: '/wap/transactionRecord/lotteryBettingHistoryDetail',
      component: lotteryBettingHistoryDetail,
      name: 'lotteryBettingHistoryDetail'
    }
  ]
}
