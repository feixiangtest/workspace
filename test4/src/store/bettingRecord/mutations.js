import * as types from './type'

export const state = {
  bettingRecordList: [],
  totalList: []
}

export const mutations = {
  // 即时注单数据处理
  [types.BETTING_RECORD_INITDETAIL] (state, res) {
    state.bettingRecordList = res.data.unbalanceList || []
    state.totalList = res.data.total
    if (state.bettingRecordList && state.bettingRecordList.length) {
      for (var i = 0; i < state.bettingRecordList.length; i++) {
        // 如果1分彩上千位，截取最后四位期数
        if (state.bettingRecordList[i].period.length === 15) {
          state.bettingRecordList[i].periods = state.bettingRecordList[i].period
          state.bettingRecordList[i].period = state.bettingRecordList[i].period.substr(state.bettingRecordList[i].period.length - 4, state.bettingRecordList[i].period.length)
        } else {
          state.bettingRecordList[i].periods = state.bettingRecordList[i].period
          state.bettingRecordList[i].period = state.bettingRecordList[i].period.substr(state.bettingRecordList[i].period.length - 3, state.bettingRecordList[i].period.length)
        }
        // 处理时间
        state.bettingRecordList[i]['bettingTime2'] = state.bettingRecordList[i].bettingDateStr.substr(11, state.bettingRecordList[i].bettingDateStr.length)
        state.bettingRecordList[i]['bettingTime1'] = state.bettingRecordList[i].bettingDateStr.substr(5, 6)
      }
    }
  },
  [types.BETTING_RECORD_CANCEL_ACTION] (state, res) {
  }
}
