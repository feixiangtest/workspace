import * as types from './type'

let statusConst = window.common.statusConst

export const actions = {

  /** 获取所有已经开放的第三方平台 */
  [types.GETPLATFORMLIST_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/bettingRecord/getPlatform', param, { type: 'POST', hideLoading: true}).then((res) => {
        if (res.status === statusConst.SUCCESS) {
          commit(types.GETPLATFORMLIST_MUTATION, res)
          resolve(res)
        } else {
          commit(types.GETPLATFORMLIST_MUTATION, res)
          reject(res)
        }
      })
    }),
  /** 获取指定平台注单记录 */
  [types.GETBETTINGRECORD_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/bettingRecord/getBettingRecord', param, { type: 'POST' }).then((res) => {
        if (res.status === statusConst.SUCCESS) {
          commit(types.GETBETTINGRECORD_MUTATION, res)
          resolve(res)
        } else {
          commit(types.GETBETTINGRECORD_MUTATION, res)
          // window.layer.msgWarn(res.msg, function () {})
        }
      })
    }),
  /** 获取往来记录 */
  [types.CURRENTRECORD_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/bettingRecord/currentRecord', param, { type: 'POST' }).then((res) => {
        if (res.status === statusConst.SUCCESS) {
          commit(types.CURRENTRECORD_MUTATION, res)
          resolve(res)
        } else {
          commit(types.CURRENTRECORD_MUTATION, res)
          reject(res)
        }
      })
    }),
  /* 获取时间 */
  [types.SWITCHDATETYPE]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/bettingRecord/switchDateType', param, {type: 'POST', hideLoading: true}).then((res) => {
        if (res.status === statusConst.SUCCESS) { // 返回数据成功
          commit(types.SWITCHDATETYPE, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg, function () {
          })
        }
      })
    })
}
