import * as types from './type'

export const actions = {
  /** 获取真人视讯信息 **/
  [types.INITLIVEDATALIST_ACTION]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/index/getLiveList', param, { type: 'POST' }).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          commit(types.INITLIVEDATALIST_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    })
  }
}
