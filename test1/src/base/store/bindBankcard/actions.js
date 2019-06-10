import * as types from './type'
import * as statusCode from '@/base/utils/status_const'

export const actions = {
  /* 获取银行卡列表 */
  [types.GET_BANKCARD]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/wapBank/getBankList',
        Requirement: {}
      }).then(function (res) {
        if (!res) return resolve()
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          resolve(res)
        } else if (res.status === statusCode.statusConst.ISLOGIN) {
          window.layer.msgWarn(res.msg, function () {
            window.indexMain.closeLtWindow() // 关闭当前彩票窗口
          })
        } else {
          console.info(res, 1)
          window.layer.msgWarn(res.msg)
          reject(res)
        }
      })
    }),
  /* 绑定银行卡接口 */
  [types.SAVE_BINDINFO]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/wapBank/saveMemberInfo',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) {
          commit(types.SAVE_BINDINFO, res)
        } else {
          window.layer.msgWarn(res.msg, function () {})
        }
        resolve(res)
      }, function (res) {
        reject(res)
      })
    })
}
