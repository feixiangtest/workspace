import * as types from './type'

export const state = {
  liveList: {}
}
export const mutations = {
  /** 真人视讯信息 */
  [types.INITLIVEDATALIST_MUTATION] (state, res) {
    if (res.data) {
      state.liveList = res.data
    }
  }
}
