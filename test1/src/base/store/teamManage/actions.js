import * as types from './type'
import * as statusCode from '../../utils/status_const'

export const actions = {
  /**
   * 查询接口
   */
  [types.GET_PROMO_ACTION]: ({commit}, param) =>
  new Promise((resolve, reject) => {
    window._fetch({
      Action: 'api/wap/team/getPromotionLink',
      Requirement: param
    }).then(function (res) {
      if (!res) return resolve()
      if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
        resolve(res)
        commit(types.GET_PROMO_MUTATION, res)
      } else {
        window.layer.msgWarn(res.msg)
        resolve(res)
      }
    }, function (res) {
      reject(res)
    })
  }),
  /**
   * 往来记录
   */
  [types.CURRENT_RECORD_ACTION]: ({commit}, param) =>
  new Promise((resolve, reject) => {
    window._fetch({
      Action: 'api/wap/member/currentRecord',
      Requirement: param
    }).then(function (res) {
      if (!res) return resolve()
      if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
        resolve(res)
        commit(types.CURRENT_RECORD_MUTATION, res)
      } else if (res.status === statusCode.statusConst.ISLOGIN) {
        window.layer.msgWarn(res.msg, function () {
          window.indexMain.closeLtWindow() // 关闭当前窗口
        })
      } else {
        window.layer.msgWarn(res.msg)
        resolve(res)
      }
    }, function (res) {
      reject(res)
    })
  })
}
