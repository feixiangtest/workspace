import * as types from './type'

export const state = {
  transactionRecordTitle: '', // 交易记录头部title
  openRecordBox: 0, // 交易记录tab切换
  bettingRecordData: {}, // 交易记录接口返回数据
  currentRecordData: {}
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
