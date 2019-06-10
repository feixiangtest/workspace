import * as types from './type'
import * as statusCode from '../../utils/status_const'

export const actions = {
  // 返水查询初始化
  [types.QUERYREBATELINIT_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/rebate/h5RebateAgentSearchInit', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.QUERYREBATELINIT_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  // 根据时间获取返水事件
  [types.QUERYREBATEBYTIME_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/rebate/getEventByTime', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.QUERYREBATEBYTIME_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  // 返水查询操作
  [types.QUERYREBATE_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/rebate/rebateAgentSearch', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.QUERYREBATE_MUTATION, res)
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
