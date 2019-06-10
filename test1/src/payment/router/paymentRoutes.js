// 采用异步加载的模式，进入页面时加载当前组件
let payment = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/payment/index.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/payment/index.vue')
  } else {
    return import('./../components/payment/index.vue')
  }
}

let bankPage = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/payment/offlineDeposit/bankPage.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/payment/offlineDeposit/bankPage.vue')
  } else {
    return import('./../components/payment/offlineDeposit/bankPage.vue')
  }
}

let onlinePay = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/payment/onlineDeposit/onlinePay.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/payment/onlineDeposit/onlinePay.vue')
  } else {
    return import('./../components/payment/onlineDeposit/onlinePay.vue')
  }
}

let payResult = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/payment/onlineDeposit/payResult.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/payment/onlineDeposit/payResult.vue')
  } else {
    return import('./../components/payment/onlineDeposit/payResult.vue')
  }
}

export default {
  paymentRouter: [{
    path: '/pyt/payResult',
    component: payResult,
    name: 'payResult'
  }, {
    path: '/pyt/payment',
    component: payment,
    name: 'payment',
    children: [
      {
        path: 'bankPay',
        component: bankPage,
        name: 'bankPay'
      },
      {
        path: 'onlinePay',
        component: onlinePay,
        name: 'onlinePay'
      }
    ]
  }]

}
