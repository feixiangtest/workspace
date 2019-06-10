import * as types from './type'

export const state = {
  openAwardListInBet: [], // 在投注页面右侧开奖结果
  changlongMap: {}, // 长龙数据
  luziMap: {}, // 路子数据
  oddsList: [],
  awardTen: [], // 开奖前十和开奖结果
  lotteryAwardTop10: [], // 前十期开奖结果处理 by karl
  lotteryAwardTitle: [], // 开奖前十期的处理
  awardTimes: 0, // 最新开奖结果请求次数
  timer2: null // 赛果前十期定时器
}

export const mutations = {
  /**
   *将后台获取到的彩票开奖结果放入到state中 vito
   * @param {*} state
   * @param {*} data
   */
  [types.AWARD_OPENAWARD_DETAIL] (state, res) {
    state.changlongMap = res.data.changlongMap
    let luziMap = res.data.luziMap
    for (let i in luziMap) { // 分离路子中的名称和期数
      luziMap[i].forEach(function (item, index) {
        item.forEach(function (obj, objIndex) {
          if (obj) {
            let arr = obj.split('-')
            obj = {'name': arr[0], 'period': arr[1]}
          } else {
            obj = {'name': '', 'period': ''}
          }
          item[objIndex] = obj
        })
      })
    }
    state.luziMap = luziMap
  },
  /**
   * 前10期开奖结果
   * @param {*} state
   * @param {*} data
   */
  [types.AWARD_OPENAWARD_LAST10_DETAIL] (state, res) {
    let awardList = res.data || []
    state.lotteryAwardTop10 = []// 初始化
    for (let i = 0; i < awardList.length; i++) {
      let award = {
        'numberSum': awardList[i].numberSum,
        'number': awardList[i].number.split(','),
        'period': awardList[i].period,
        'zodiacYear': awardList[i].zodiacYear
      }
      let ltId = Number(window.store.state.site.lotteryId)
      if (ltId === 100 || ltId === 101) {
        award['awardTime'] = awardList[i].awadTime
      }
      state.lotteryAwardTop10.push(award)
    }
    state.openAwardListInBet = awardList
  },
  [types.AWARD_LOTTERY_MUTATION_INITDETAIL] (state, res) {
    if (res.data.historyList.length !== 0) {
      state.historyListLen = res.data.historyList.length
    } else {
      state.historyListLen = 0
    }
    console.info(res.data.historyList)
  }
}
