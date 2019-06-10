import * as types from './type'

export const state = {
  onlineservice: {} // 在线客服对象
}
export const mutations = {
  /** 根据导航ID获取帮助中心文案 */
  [types.INITDATA_DETAIL] (state, res) {
    // localStorage.setItem('onlineservice', JSON.stringify(res.data))
    state.onlineservice = state.articleList.onlineservice // 在线客服
  },
  /**
   * 忘记密码
   * @param {*} state
   * @param {*} res
   */
  [types.FORGOT_PASSWORD_MUTATION] (state, res) {

  }
}
