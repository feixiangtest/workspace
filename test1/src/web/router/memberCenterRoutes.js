// 采用异步加载的模式，进入页面时加载当前组件
let onlineDraw = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/memberCenter/onlineDraw.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/memberCenter/onlineDraw.vue')
  } else {
    return import('./../components/memberCenter/onlineDraw.vue')
  }
}

let myAccount = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/memberCenter/index.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/memberCenter/index.vue')
  } else {
    return import('./../components/memberCenter/index.vue')
  }
}

let moneyConversion = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/memberCenter/amounts/moneyConversion.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/memberCenter/amounts/moneyConversion.vue')
  } else {
    return import('./../components/memberCenter/amounts/moneyConversion.vue')
  }
}

let completeAccount = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/memberCenter/completeAccount/index.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/memberCenter/completeAccount/index.vue')
  } else {
    return import('./../components/memberCenter/completeAccount/index.vue')
  }
}

let message = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/memberCenter/message/index.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/memberCenter/message/index.vue')
  } else {
    return import('./../components/memberCenter/message/index.vue')
  }
}

let gameNotice = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/memberCenter/message/gameNotice.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/memberCenter/message/gameNotice.vue')
  } else {
    return import('./../components/memberCenter/message/gameNotice.vue')
  }
}

let accountInfo = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/memberCenter/account/info.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/memberCenter/account/info.vue')
  } else {
    return import('./../components/memberCenter/account/info.vue')
  }
}

let modifyPassword = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/memberCenter/account/modifyPassword.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/memberCenter/account/modifyPassword.vue')
  } else {
    return import('./../components/memberCenter/account/modifyPassword.vue')
  }
}

let platformMoney = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/memberCenter/amounts/platformMoney.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/memberCenter/amounts/platformMoney.vue')
  } else {
    return import('./../components/memberCenter/amounts/platformMoney.vue')
  }
}

let bindBankcard = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/memberCenter/account/bindBankcard.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/memberCenter/account/bindBankcard.vue')
  } else {
    return import('./../components/memberCenter/account/bindBankcard.vue')
  }
}

let gameClient = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/memberCenter/gameClient/index.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/memberCenter/gameClient/index.vue')
  } else {
    return import('./../components/memberCenter/gameClient/index.vue')
  }
}

export default {
  memberCenterRoutes: [
    {
      path: '/wap/memberCenter/onlineDraw',
      component: onlineDraw,
      name: '/wap/memberCenter/onlineDraw'
    },
    {
      path: '/wap/memberCenter/index',
      component: myAccount,
      name: '/wap/memberCenter/index'
    },
    {
      path: '/wap/memberCenter/moneyConversion',
      component: moneyConversion,
      name: '/wap/memberCenter/moneyConversion'
    },
    {
      path: '/wap/memberCenter/completeAccount',
      component: completeAccount,
      name: '/wap/memberCenter/completeAccount'
    },
    {
      path: '/wap/memberCenter/message',
      component: message,
      name: '/wap/memberCenter/message'
    },
    {
      path: '/wap/memberCenter/accountInfo',
      component: accountInfo,
      name: '/wap/memberCenter/accountInfo'
    },
    {
      path: '/wap/memberCenter/modifyPassword',
      component: modifyPassword,
      name: '/wap/memberCenter/modifyPassword'
    },
    {
      path: '/wap/memberCenter/platformMoney',
      component: platformMoney,
      name: '/wap/memberCenter/platformMoney'
    },
    {
      path: '/wap/memberCenter/gameNotice',
      component: gameNotice,
      name: '/wap/memberCenter/gameNotice'
    },
    {
      path: '/wap/memberCenter/bindBankcard',
      component: bindBankcard,
      name: '/wap/memberCenter/bindBankcard'
    },
    {
      path: '/wap/memberCenter/gameClient',
      component: gameClient,
      name: '/wap/memberCenter/gameClient'
    }
  ]
}
