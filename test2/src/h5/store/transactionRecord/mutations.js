import * as types from './type'

export const state = {
  transactionRecordTitle: '', // 交易记录头部title
  openRecordBox: 0, // 交易记录tab切换
  bettingRecordData: {}, // 交易记录接口返回数据
  currentRecordData: {},
  saveTransData: {}, // 缓存的投注记录筛选条件
  saveHistoryData: {}, // 缓存往来记录筛选条件
  showDetail: false // 是否展示往来记录详情
}
export const mutations = {
  [types.BETTING_RECORD_MUTATION] (state, res) {
    state.bettingRecordData = {}
    state.bettingRecordData = res.data
  },
  [types.CURRENT_RECORD_MUTATION] (state, res) {
    state.currentRecordData = {}
    state.currentRecordData = res.data
  }
}
