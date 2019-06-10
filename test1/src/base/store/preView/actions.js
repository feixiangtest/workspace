import * as types from './type'
import * as statusCode from '@/base/utils/status_const'

export const actions = {
  [types.GET_PREVIEW_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/wapIndex/loadPriviewTest',
        Requirement: param
      }).then(function (res) {
        if (!res) return resolve()
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.GET_PREVIEW_MUTATION, res)
          resolve(res)
        } else if (res.status === statusCode.statusConst.ISLOGIN) {
          window.layer.msgWarn(res.msg, function () {
            window.indexMain.closeLtWindow() // 关闭当前彩票窗口
          })
        } else {
          reject(res)
        }
      })
    })
}
