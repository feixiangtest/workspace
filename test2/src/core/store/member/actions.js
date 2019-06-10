import * as types from './type'

let statusConst = window.common.statusConst

export const actions = {
  /**  */
  [types.GETEFFICACBETTING_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/account/effectBet', param, { type: 'POST' }).then((res) => {
        if (res.status === statusConst.SUCCESS) {
          commit(types.GETEFFICACBETTING_MUTATION, res)
          resolve(res)
        }
      })
    }),
  // 获取未读消息总条数 数据
  [types.H5MSGCOUNT]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/index/msgCount', param, {
        type: 'POST',
        hideLoading: true
      }).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          commit(types.H5MSGCOUNT_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg) // 请求失败
      })
    })
  }
}
