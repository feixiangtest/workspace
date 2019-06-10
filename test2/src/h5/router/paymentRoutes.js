// 采用异步加载的模式，进入页面时加载当前组件
export default {
  paymentRouter: [
    {
      path: '/wap/payResult',
      component: () => import('@s/components/payment/payResult.vue'),
      name: 'payResult'
    },
    {
      path: '/wap/payment',
      component: () => import('@/views/payment.vue'),
      name: 'payment',
      children: [
        {
          path: 'onlinePay',
          component: () => import('@/components/payment/onlineDeposit/onlineDeposit.vue'),
          name: 'onlinePay'
        },
        {
          path: 'offlinePay',
          component: () => import('@/components/payment/offlineDeposit/offlineDeposit.vue'),
          name: 'offlinePay'
        },
        {
          path: 'custDeposit',
          component: () => import('@/components/payment/custDeposit.vue'),
          name: 'custDeposit'
        }
        // {
        //   path: 'bankPay',
        //   component: () => import('@/components/payment/index.vue'),
        //   name: 'bankPay'
        // }
        // {
        //   path: '/wap/transactionRecord/lotteryBettingHistoryDetail',
        //   component: () => import('@/components/transactionRecord/lotteryBettingHistoryDetail.vue'),
        //   name: 'lotteryBettingHistoryDetail'
        // }
      ]
    }
  ]
}
