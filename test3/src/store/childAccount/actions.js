import * as types from './type'
import * as statusCode from '../../utils/status_const'

export const actions = {
  /** 子账号管理-子账号列表 */
  [types.SUBACCOUNTLIST_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/subAccount/subAccountList', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.SUBACCOUNTLIST_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  /** 子账号管理-修改子账号状态 */
  [types.CHANGEUSESTATUS]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/account/changeUseStatus', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
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
