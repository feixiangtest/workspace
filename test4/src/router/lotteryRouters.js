let lottery = () => {
  return import('../pages/lottery.vue')
}

export default {
  lotteryRouters: {
    path: '/lottery/:code',
    component: lottery,
    name: 'lottery'
  }
}
