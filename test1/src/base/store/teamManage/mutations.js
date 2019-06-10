import * as types from './type'

export const state = {
  linkList: {},
  rebateList: {},
  rebateSetting: {}
}
export const mutations = {
  [types.GET_PROMO_MUTATION] (state, res) {
    res = res.data
    if (res.linkList) {
      state.linkList = res.linkList
    }
    if (res.rebateList) {
      state.rebateList = res.rebateList
    }
    if (res.rebateSetting) {
      state.rebateSetting = res.rebateSetting
    }
  },
  [types.CURRENT_RECORD_MUTATION] (state, res) {
    state.currentRecordData = {}
    state.currentRecordData = res.data
  }
}
