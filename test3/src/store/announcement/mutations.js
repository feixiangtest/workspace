import * as types from './type'
// import * as statusCode from '../../utils/status_const'

export const state = {
  noticeType: 4,
  announceDetail: {
    titile: '', // 标题
    time: '', // 时间
    content: '' // 内容
  },
  announceData: {} // 公告参数
}

export const mutations = {
  [types.GETNOTICELIST_MUTATION] (state, res) {
    if (res.data) {
      state.announceData = res.data
    }
  },
  [types.GETONENOTICELIST_MUTATION] (state, res) {
    if (res.data) {
    }
  }
}
