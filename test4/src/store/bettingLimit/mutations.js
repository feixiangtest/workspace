import * as types from './type'

export const state = {
  bettingLimitList: []
}

export const mutations = {
  // 即时注单数据处理
  [types.BETTING_LIMIT_INITDETAIL] (state, res) {
    state.bettingLimitList = res.data.result.detaiList
    // for (var i = 0; i < state.bettingLimitList.length; i++) {
    //   // 如果1分彩上千位，截取最后四位期数
    //   if (state.bettingLimitList[i].period.length === 15) {
    //     state.bettingLimitList[i].period = state.bettingLimitList[i].period.substr(state.bettingLimitList[i].period.length - 4, state.bettingLimitList[i].period.length)
    //   } else {
    //     state.bettingLimitList[i].period = state.bettingLimitList[i].period.substr(state.bettingLimitList[i].period.length - 3, state.bettingLimitList[i].period.length)
    //   }
    //   // 处理时间
    //   state.bettingLimitList[i]['bettingTime2'] = state.bettingLimitList[i].bettingDateStr.substr(11, state.bettingLimitList[i].bettingDateStr.length)
    //   state.bettingLimitList[i]['bettingTime1'] = state.bettingLimitList[i].bettingDateStr.substr(5, 6)
    // }
  }
}
