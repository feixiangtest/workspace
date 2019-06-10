// 采用异步加载的模式，进入页面时加载当前组件

export default {
  insideRoutes: [
    {
      path: '/wap',
      component: () => import('@/views/insidePage.vue'),
      name: 'inside',
      children: [
        // 注册页
        {
          path: 'register',
          component: () => import('@/components/register/register.vue'),
          name: 'register'
        },
        {
          path: 'agreement',
          component: () => import('@/components/register/agreement.vue'),
          name: 'agreement'
        },
        {
          path: 'regSuccess',
          component: () => import('@/components/register/regSuccess.vue'),
          name: 'regSuccess'
        },
        // 绑定银行卡
        {
          path: 'addCard',
          component: () => import('@/components/addCard/addCard.vue'),
          name: 'addCard'
        },
        {
          path: 'cardList',
          component: () => import('@/components/addCard/cardList.vue'),
          name: 'cardList'
        },
        // 个人设置
        {
          path: 'personSet',
          component: () => import('@/components/personSet/personSet.vue'),
          name: 'personSet'
        },
        {
          path: 'modifyPassWord',
          component: () => import('@/components/personSet/modifyPassWord.vue'),
          name: 'modifyPassWord'
        },
        // 消息记录
        {
          path: 'messageList',
          component: () => import('@/components/message/messageList.vue'),
          name: 'messageList'
        },
        // 往来记录
        // {
        //   path: 'bettingList',
        //   component: () => import('@/components/transactionRecord/bettingList.vue'),
        //   name: 'bettingList'
        // },
        // 交易记录
        {
          path: 'transactionRecord',
          component: () => import('@/components/transactionRecord/transactionRecord.vue'),
          name: 'transactionRecord'
        },
        {
          path: '/wap/historyRecord',
          component: () => import('@/components/transactionRecord/historyRecord.vue'),
          name: 'historyRecord'
        },
        // {
        //   path: '/wap/betDetail',
        //   component: () => import('@/components/transactionRecord/betDetail.vue'),
        //   name: 'betDetail'
        // },
        // {
        //   path: '/wap/betDetaildisplay',
        //   component: () => import('@/components/transactionRecord/betDetaildisplay.vue'),
        //   name: 'betDetaildisplay'
        // },
        // {
        //   path: '/wap/transactionRecord/currentRecordPage',
        //   component: () => import('@/components/transactionRecord/currentRecordPage.vue'),
        //   name: 'currentRecordPage'
        // },
        // {
        //   path: '/wap/transactionRecord/sportsHistoryDetail',
        //   component: () => import('@/components/transactionRecord/sportsHistoryDetail.vue'),
        //   name: 'sportsHistoryDetail'
        // },
        {
          path: '/wap/thirdPlatformDetail',
          component: () => import('@/components/transactionRecord/thirdPlatformDetail.vue'),
          name: 'thirdPlatformDetail'
        },
        // 忘记密码
        {
          path: 'forgetPwd',
          component: () => import('@/components/register/forgetPwd.vue'),
          name: 'forgetPwd'
        },
        // 游戏客户端
        {
          path: 'gameExplain',
          component: () => import('@/components/user/gameExplain.vue'),
          name: 'gameExplain'
        },
        // 往来记录-记录列表
        {
          path: 'correspondence',
          component: () => import('@/components/transactionRecord/correspondence.vue'),
          name: 'correspondence'
        }
        // {
        //   path: '/wap/transactionRecord/lotteryBettingHistoryDetail',
        //   component: () => import('@/components/transactionRecord/lotteryBettingHistoryDetail.vue'),
        //   name: 'lotteryBettingHistoryDetail'
        // }
      ]
    }

  ]
}
