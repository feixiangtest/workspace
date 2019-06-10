import * as types from './type'
// import * as statusCode from '../../utils/status_const'

export const state = {
  startUsing: '<span class="link-txt">启用</span>',
  blockUp: '<span class="warn-txt">停用</span>'
}

export const mutations = {
  // 子账号列表
  [types.SUBACCOUNTLIST_MUTATION] (state, res) {
    if (res.data) {
      for (let i = 0; i < res.data.length; i++) {
        // 判断状态是否等于0 ，0为启用 1为停用
        res.data[i].useStatus === 0 ? res.data[i].useStatus = state.startUsing : res.data[i].useStatus = state.blockUp
      }
      state.subAccountList = res.data
    }
  }
}
