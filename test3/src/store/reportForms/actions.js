import * as types from './type'
import * as statusCode from '../../utils/status_const'

export const actions = {
  // 代理后台报表管理
  [types.REPORTSLISTAGENT]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/report/reportsListAgent', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  // 代理后台报表平台查询
  [types.GETPLATFORM]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/report/getPlatform', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {

        }
        resolve(res)
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    })

}
