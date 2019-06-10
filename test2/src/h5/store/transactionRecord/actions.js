import * as types from './type'
window.common.statusConst = {
  'SUCCESS': '0', // 数据返回成功
  'FAILURE': '1', // 返回失败
  'VERSION': '9', // 版本号一致
  'ISLOGIN': '5', // 未登录或者IP不一致
  'COMPLETEACCOUNT': '2' // 微信帐号完善资料状态，当返回这个值时必须完善资料后才可跳转其他
}
let statusConst = window.common.statusConst
export const actions = {
  /** 获取所有已经开放的第三方平台 */
  [types.GETPLATFORM_RECORD_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/bettingRecord/getPlatform', param, { type: 'POST', hideLoading: true }).then((res) => {
        if (res.status === statusConst.SUCCESS) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    }),
  /** 获取指定平台注单记录 */
  [types.GET_BETTING_RECORD_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/bettingRecord/getBettingRecord', param, { type: 'POST' }).then((res) => {
        if (res.status === statusConst.SUCCESS) {
          resolve(res)
        } else {
          window.layer.msgWarn(res.msg, function () {})
        }
      })
    }),
  /** 获取往来记录 */
  [types.CURRENT_RECORD_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/bettingRecord/currentRecord', param, { type: 'POST' }).then((res) => {
        if (res.status === statusConst.SUCCESS) {
          resolve(res)
          commit(types.CURRENT_RECORD_MUTATION, res)
        } else {
          reject(res)
        }
      })
    }),
  /* 获取时间 */
  [types.SWITCH_DATE_TYPE_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/bettingRecord/switchDateType', param, {type: 'POST', hideLoading: true}).then((res) => {
        if (res.status === statusConst.SUCCESS) { // 返回数据成功
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg, function () {
          })
        }
      })
    })
}
