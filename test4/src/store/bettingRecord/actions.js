import * as types from './type'
import * as statusCode from '../../utils/status_const'

export const actions = {
  // 查询后台，即时注单(查询半个月内未结算的) Ezreal
  [types.BETTING_RECORD_ACTION]: ({ commit }, params) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'common/getbettingRecord',
        Requirement: params
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.BETTING_RECORD_INITDETAIL, res)
          resolve(res)
        } else if (res.status === statusCode.statusConst.ISLOGIN) {
          window.layer.msgWarn(res.msg, function () {
            window.lotteryMain.closeLtWindow() // 关闭当前彩票窗口
          })
        } else {
          reject(res)
        }
      })
    }),
  [types.BETTING_RECORD_CANCEL_ACTION]: ({ commit }, params) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'common/cancelBettingOrder',
        Requirement: params
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          // commit(types.BET_RECORD_DETAIL_MUTATION, res)
          resolve(res)
        } else {
          resolve(res)
        }
      }, function (res) {
        reject(res)
      })
    })
}
